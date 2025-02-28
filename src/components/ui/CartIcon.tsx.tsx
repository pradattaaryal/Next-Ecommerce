"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Button size="icon" variant="ghost" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItemCount}
        </span>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  );
}
