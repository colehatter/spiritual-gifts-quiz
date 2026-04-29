import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const { code, paymentIntentId } = await req.json();
  if (!code || !paymentIntentId) {
    return NextResponse.json({ error: 'Missing code or paymentIntentId' }, { status: 400 });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-03-25.dahlia' });

    // Look up the promo code
    const promoCodes = await stripe.promotionCodes.list({ code: code.toUpperCase(), active: true, limit: 1 });
    if (!promoCodes.data.length) {
      return NextResponse.json({ valid: false, error: 'Invalid promo code' });
    }

    const promoCode = promoCodes.data[0];
    const coupon = (promoCode as unknown as { coupon: { percent_off?: number; amount_off?: number } }).coupon;

    // Calculate discount
    let discountAmount = 0;
    let isFree = false;
    if (coupon.percent_off === 100) {
      isFree = true;
      discountAmount = 999;
    } else if (coupon.percent_off) {
      discountAmount = Math.round(999 * (coupon.percent_off / 100));
    } else if (coupon.amount_off) {
      discountAmount = coupon.amount_off;
    }

    const newAmount = Math.max(0, 999 - discountAmount);

    if (isFree) {
      // For 100% off — cancel the payment intent and return free flag
      await stripe.paymentIntents.cancel(paymentIntentId);
      return NextResponse.json({ valid: true, isFree: true, newAmount: 0, percentOff: 100 });
    }

    // Update the payment intent with the new amount
    await stripe.paymentIntents.update(paymentIntentId, { amount: newAmount });
    return NextResponse.json({
      valid: true,
      isFree: false,
      newAmount,
      percentOff: coupon.percent_off || 0,
      discountAmount,
    });
  } catch (error) {
    console.error('Promo code error:', error);
    return NextResponse.json({ error: 'Failed to apply promo code' }, { status: 500 });
  }
}
