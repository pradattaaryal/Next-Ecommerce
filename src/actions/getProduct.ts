"use server";

import db from "@/lib/db/db";

export async function fetchAllProducts(page: number = 1, pageSize: number =2) {
  try {
    const skip = (page - 1) * pageSize;

    const [products, totalProducts] = await Promise.all([
      db.product.findMany({
        skip,
        take: pageSize,
      }),
      db.product.count(),
    ]);

    return {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
    };
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
  