import { NextResponse } from 'next/server';
import Stripe from 'stripe';
 
// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, customerEmail } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.Product.name,
          images: item.Product.images ? [item.Product.images] : [],
        },
        unit_amount: Math.round(item.Product.listPrice * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: 999, // $9.99
      },
      quantity: 1,
    });

    // Create a Checkout Session
 
// Create a Checkout Session with optional email
// eslint-disable-next-line react-hooks/exhaustive-deps
const sessionConfig: any = {
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    automatic_tax: {
        enabled: false,
      },
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'], // Add countries you ship to
    },
    metadata: {
      cartItems: JSON.stringify(cartItems.map((item: any) => ({
        id: item.Product.id,
        quantity: item.quantity,
      }))),
    },
  };
  
  // Only add the customer_email if it's a valid email
  if (customerEmail && customerEmail.trim() !== '') {
    sessionConfig.customer_email = customerEmail;
  }
  
  const session = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error  },
      { status: 500 }
    );
  }
}