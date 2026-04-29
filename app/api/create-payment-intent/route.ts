import { NextResponse } from 'next/server';

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-03-25.dahlia' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: 'Spiritual Gifts Full Assessment',
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('PaymentIntent error:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
