// components/ProductsPage.tsx
"use client";

import {
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
 import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import ProductForm from "@/components/add-productform";
import { fetchAllProducts } from "@/actions/getProduct";
import { deleteProduct } from "@/actions/deleteProduct";
import DraggablePopup from "@/components/function/DraggablePopup";
// types/product.ts
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

// If you have an OrderItem

export default function ProductsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllProducts(page, pageSize);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const getStatus = (countInStock: number): string => {
    if (countInStock > 10) return "In Stock";
    if (countInStock > 0) return "Low Stock";
    return "Out of Stock";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-5 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Badge className="bg-slate-800 text-white">
              {products.length} products
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hover:bg-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="hover:bg-slate-200" onClick={handleOpenPopup}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            {showPopup && (
              <DraggablePopup onClose={handleClosePopup}>
                <ProductForm />
              </DraggablePopup>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                className="w-full shadow-none appearance-none pl-8 border-slate-800 placeholder:text-slate-500"
                placeholder="Search products..."
                type="search"
              />
            </div>
            <Button
              variant="outline"
              className="border-slate-800 hover:bg-slate-800"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-40 border-slate-800">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-slate-800">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 border-slate-800">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="border-slate-800">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="border rounded-lg border-slate-800">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="border-slate-800">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images || "/placeholder.svg"}
                        alt={product.name}
                        className="rounded-lg object-cover"
                        width={48}
                        height={48}
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        getStatus(product.countInStock) === "In Stock"
                          ? "bg-green-500/20 text-green-500"
                          : getStatus(product.countInStock) === "Low Stock"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                      }
                    >
                      {getStatus(product.countInStock)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell className="text-right">
                    {product.countInStock}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-slate-800"
                      >
                        <DropdownMenuItem className="focus:bg-slate-900">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-800" />
                        <DropdownMenuItem
                          className="text-red-500 focus:bg-slate-900"
                          onClick={async () => {
                            const result = await deleteProduct(product.id); // Pass product.id to deleteProduct
                            if (result.success) {
                              alert("Product deleted successfully!");

                              const data = await fetchAllProducts();
                              setProducts(data.products);
                            } else {
                              alert("Failed to delete product.");
                            }
                          }}
                        >
                          {" "}
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
