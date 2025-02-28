"use server";

import db from "@/lib/db/db";

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}
