"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 import {
  Form,
  FormControl,
   FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getSignedURL } from "@/actions/urlactions";
import { addProduct } from "@/actions/addProduct";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  latestPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid price." }),
  oldPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid price." }),
     
  

  stock: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid stock." }),
    
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  mainImage: z
    .any()
    .refine((files) => files?.length == 1, "Main image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .png and .webp files are accepted."
    ),
   
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      latestPrice: "",
      oldPrice: "",
      description: "",
      stock: "", // Added stock
      mainImage: null, // Added mainImage (to avoid undefined)
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      let mainImageURL = '';
      if (values.mainImage && values.mainImage.length > 0) {
       const signedURLResult = await getSignedURL();

        if (signedURLResult.failure !== undefined) {
          console.error(signedURLResult.failure);
          return;
        }

        if (signedURLResult.success) {
          const { urlSigned } = signedURLResult.success;

          console.log({ urlSigned });

          const file = values.mainImage[0];
          await fetch(urlSigned, {
            method: "PUT",
            headers: {
              "Content-Type": file.type, // Set the appropriate content type
            },
            body: file, // Send the file as the body
          });
          mainImageURL = urlSigned.split('?')[0];
        }
      }

      const productData = {
        name: values.name,
        category: values.category,
        latestPrice: parseFloat(values.latestPrice),
        oldPrice:parseFloat(values.oldPrice),
        description: values.description,
        mainImage: mainImageURL,
        stock: parseInt(values.stock), // Use countInStock instead of stock
      };
      
      console.log(productData)
       const result = await addProduct(productData);
       
       if (result.success) {
        form.reset();
         console.log("Product added successfully!");
       } else {
         throw new Error();
       }


















    } catch (e) {
      console.log({ errroe: e });
    }
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="min-w-[50%]    mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Row 1: Product Name and Category */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Latest Price and Old Price */}
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="latestPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latest Price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oldPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Price </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           
            </div>

            {/* Row 3: Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row 4: Product Image */}
            <FormField
              control={form.control}
              name="mainImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleMainImageChange(e);
                        }}
                        {...rest}
                        className="flex-1"
                      />
                    </FormControl>
                    {mainImagePreview && (
                      <div className="max-w-[80px] max-h-[80px] ">
                        <Image
                          src={mainImagePreview || "/placeholder.svg"}
                          alt="Main Preview"
                          className="rounded-md w-full h-full object-cover"
                          width={80}
                          height={80}
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

             
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}
