/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ received: true });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as any });

    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
      return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const email = session.customer_details?.email;
      const name = session.customer_details?.name;
      console.log('Payment successful:', session.id, email);

      // Tag contact as paid in HubSpot
      if (email) {
        const hubspotToken = process.env.HUBSPOT_TOKEN;
        if (hubspotToken) {
          try {
            // Search for existing contact
            const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${hubspotToken}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
                properties: ['email'],
                limit: 1,
              }),
            });
            const searchData = await searchRes.json();
            const props = {
              email,
              firstname: name?.split(' ')[0] || '',
              lastname: name?.split(' ').slice(1).join(' ') || '',
              spiritual_gifts_paid: 'true',
              lead_source: 'spiritual-gifts-paid',
            };
            if (searchData.results?.length > 0) {
              await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${searchData.results[0].id}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${hubspotToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ properties: props }),
              });
            } else {
              await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${hubspotToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ properties: props }),
              });
            }
          } catch (e) {
            console.error('HubSpot webhook update error:', e);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
