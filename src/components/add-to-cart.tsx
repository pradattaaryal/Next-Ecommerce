"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { product } from "@/types/product";

interface AddToCartProps {
  Product: product;
}

export default function AddToCart({ Product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
 
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (!Product || !Product.id) {
      console.error("Invalid Product:", Product);
      return;
    }
    
    // Create a plain object version of the product
    // This ensures we don't pass non-serializable values to Redux
    const serializedProduct = {
      ...Product,
      createdAt: typeof Product.createdAt === 'object' ? 
        (Product.createdAt as Date).toISOString() : Product.createdAt,
      updatedAt: typeof Product.updatedAt === 'object' ? 
        (Product.updatedAt as Date).toISOString() : Product.updatedAt
    };
    
    console.log("Adding Product to cart:", serializedProduct.id);
    
    dispatch(addToCart({ 
      Product: serializedProduct, 
      quantity 
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
          }
          className="w-20 text-center"
        />
        <Button variant="outline" size="icon" onClick={increaseQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}