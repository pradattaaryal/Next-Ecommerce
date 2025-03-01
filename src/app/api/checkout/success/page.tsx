"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionId) {
      router.push('/');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/checkout/order?session_id=${sessionId}`);
        const data = await response.json();

        if (data.error) {
          console.error('Error fetching order details:', data.error);
          return;
        }

        setOrderDetails(data);
        // Clear the cart after successful checkout
        dispatch(clearCart());
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId, router, dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          
          {orderDetails && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <p className="text-sm">Order ID: {orderDetails.id}</p>
                <p className="text-sm">Amount: ${(orderDetails.amount_total / 100).toFixed(2)}</p>
                <p className="text-sm">Status: {orderDetails.status}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/account/orders">View My Orders</Link>
            </Button>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}