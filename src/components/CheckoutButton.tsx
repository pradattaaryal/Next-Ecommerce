"use client";

import { useState } from 'react';
 import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
 
// Make sure to add your publishable key to .env.local
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
 
export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
   const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          customerEmail: '', // You might want to get this from the user
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Error creating checkout session:', error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="w-full" 
      onClick={handleCheckout} 
      disabled={isLoading || cartItems.length === 0}
    >
      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
    </Button>
  );
}