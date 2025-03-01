 "use server";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEYY!,
      secretAccessKey: process.env.AWS_SECERATE_KEY!,
    },
  })
export async function deleteProduct(productId: string) {
  try {
  
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    
    const imageUrl = product.images;

    
    if (imageUrl) {
      const url = imageUrl;
      const key = url.split("/").slice(-1)[0]; // Remove the leading slash

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!, // Replace with your S3 bucket name
        Key: key,
      };

      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }

    // Step 4: Delete the product from the database
    await prisma.product.delete({
      where: { id: productId },
    });
    revalidatePath("/")
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}