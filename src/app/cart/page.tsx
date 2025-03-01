"use client"

 import Image from "next/image"
import Link from "next/link"
import { MinusIcon, PlusIcon, ShoppingBag, Trash2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
 import {   removeFromCart ,updateQuantity} from "@/store/cartSlice";
import CheckoutButton from "@/components/CheckoutButton"

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const updateQuantityy = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
    } else {
      dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
    }
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.Product.listPrice * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="h-8 w-8" />
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.Product.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.Product.images || "/placeholder.svg"}
                          alt={item.Product.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium text-lg">{item.Product.name}</h3>
                        <p className="text-muted-foreground">Unit Price: ${item.Product.listPrice.toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantityy(item.Product.id, item.quantity - 1)}
                            >
                              <MinusIcon className="h-4 w-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantityy(item.Product.id, item.quantity + 1)}
                            >
                              <PlusIcon className="h-4 w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeItem(item.Product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                      <div className="font-semibold text-right">${(item.Product.listPrice * item.quantity).toFixed(2)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="outline" asChild className="gap-2">
                <Link href="/browse">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
              <CheckoutButton />              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
