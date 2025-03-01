"use client"; // Corrected to lowercase "client"

import Image from "next/image";
import Link from "next/link";
 import d from "@/images/d.png"; // Default static image
 import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/actions/getProduct";
import { Button } from "./ui/button";
 //import ProductGridSkeleton from "@/components/skeleton/productGridSkeleton";
 import ProductGridSkeleton from "@/components/skeleton/ProductGridSkeleton";

// Default static image
const DEFAULT_IMAGE = d;

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

export default function ProductGrid({
  featured = false,
}: {
  featured?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true); // Set loading to true before fetching
        console.log("Loading state before fetch:", loading); // Check loading state before fetch
        const data = await fetchAllProducts(page, pageSize);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setloading(false); // Set loading to false once data is fetched or an error occurs
        console.log("Loading state after fetch:", loading); // Check loading state after fetch
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  

  const displayProducts = featured ? products.slice(0, 3) : products;
// In your render function
 if (loading) {
  return <ProductGridSkeleton   />;
} 

  return (
    <div className="max-h-[95vh] h-full flex flex-col  ">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-2 hover:scale-105 border-black hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:border-white dark:shadow-white transition-transform duration-300 ease-in-out"
            >
              <Link href={`/product/${product.id}`}>
                <CardContent className="p-0    ">
                  {" "}
                  {/* Clip the image */}
                  <Image
                    src={product.images || DEFAULT_IMAGE}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform" /* Use object-cover */
                  />
                </CardContent>

                <CardFooter className="p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination section */}
      <div className="  border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Showing 1 to {products.length} of {products.length} products
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              variant="outline"
              className="border-slate-800 hover:bg-slate-800"
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              variant="outline"
              className="border-slate-800 hover:bg-slate-800"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
