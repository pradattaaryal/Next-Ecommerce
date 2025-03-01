"use client";
import { Suspense, useEffect, useState } from "react"
import { Star } from "lucide-react"

import AddToCart from "@/components/add-to-cart"
import ImageGallery from "@/components/image-gallery"
import ProductReviews from "@/components/product-reviews"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/actions/getProductById"
import { useParams } from "next/navigation"
import ProductPageSkeleton from "@/components/skeleton/ProductPageSkeleton";
 
 
export type Product = {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  category: string; // Category of the product
  images: string; // URL or path to the product image
  description: string | null; // Optional description of the product
  price: number; // Current price of the product
  listPrice: number; // Original list price of the product
  countInStock: number; // Number of items available in stock
  colors: string[]; // Array of available colors for the product
  avgRating: number; // Average rating of the product
  numReviews: number; // Number of reviews for the product
  numSales: number; // Number of times the product has been sold
  isPublished: boolean; // Whether the product is published
  createdAt: Date; // Date when the product was created
  updatedAt: Date; // Date when the product was last updated
};
export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const productId = String(id); // Ensure it's a string
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        console.log(data); // Debugging
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,productId]);
  if (!product) return (<ProductPageSkeleton/>);

  return (
    
    <div className="container mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <ImageGallery images={product.images} />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center ">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.numReviews) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.numReviews} ({product.numReviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price}</div>

          <AddToCart Product={product} />

          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 space-y-4">
              <div className="whitespace-pre-line text-muted-foreground">{product.description}</div>
            </TabsContent>
            
          </Tabs>
        </div>
      </div>

      <Separator className="my-12" />

      <Suspense fallback={<div>Loading reviews...</div>}>
        <ProductReviews productId={product.id} />
      </Suspense>
    </div>
  )
}

