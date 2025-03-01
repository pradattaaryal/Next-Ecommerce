"use server";

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export async function addProduct(productData: {
  name: string;
  category: string;
  latestPrice: number;
  oldPrice: number ;
  description: string;
  mainImage: string;
  stock: number; // Use stock instead of countInStock
}) {
  try {
    await db.product.create({
      data: {
        name: productData.name,
        category: productData.category,
        price: productData.latestPrice,
        listPrice: productData.oldPrice,
        description: productData.description,
        images: productData.mainImage, // Map mainImage
         countInStock: productData.stock, // Map stock
      },
    });

    // Revalidate cache to show new data
    revalidatePath("/products");

    return { success: true, message: "Product added successfully!" };
  } catch (error:unknown) {
    return { success: false, message: error  };
  }
}
