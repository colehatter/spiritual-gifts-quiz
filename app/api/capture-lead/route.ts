import { NextRequest, NextResponse } from 'next/server';
import { GiftName, GiftScores } from '@/types/quiz';

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN || '';

function getTopGifts(scores: GiftScores, n: number): GiftName[] {
  return (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([g]) => g);
}

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source, scores } = await req.json();
    if (!email) return NextResponse.json({ success: false, error: 'Missing email' });

    const props: Record<string, string> = {
      email,
      firstname: firstName || '',
      lead_source: source || 'quiz',
      hs_lead_status: 'NEW',
    };

    if (scores) {
      const topGifts = getTopGifts(scores, 3);
      props.spiritual_gifts_top3 = topGifts.join(', ');
      props.spiritual_gifts_top1 = topGifts[0] || '';
    }

    // Search for existing contact
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['email'],
        limit: 1,
      }),
    });
    const searchData = await searchRes.json();

    if (searchData.results?.length > 0) {
      // Update existing
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${searchData.results[0].id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: props }),
      });
    } else {
      // Create new
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: props }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('capture-lead error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
