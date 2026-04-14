import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { GiftScores, GiftName, AIResults } from '@/types/quiz';

const client = new Anthropic();

function mergeScores(a: GiftScores, b: GiftScores): GiftScores {
  const result = { ...a };
  for (const key of Object.keys(b) as GiftName[]) {
    result[key] = (result[key] || 0) + (b[key] || 0);
  }
  return result;
}

function getTopGifts(scores: GiftScores, n: number): [GiftName, number][] {
  return (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

export async function POST(req: NextRequest) {
  try {
    const { name, freeScores, paidScores } = await req.json();
    const combined = mergeScores(freeScores, paidScores);
    const top3 = getTopGifts(combined, 3);
    const bottom3 = getTopGifts(combined, 11).slice(-3);

    const prompt = `You are a spiritual gifts analyst writing a deeply personalized report for ${name || 'this person'}.

Their combined gift scores are:
${(Object.entries(combined) as [GiftName, number][])
  .sort((a, b) => b[1] - a[1])
  .map(([gift, score]) => `${gift}: ${score}`)
  .join('\n')}

Top 3 gifts: ${top3.map(([g, s]) => `${g} (${s})`).join(', ')}
Notable low scores: ${bottom3.map(([g, s]) => `${g} (${s})`).join(', ')}

Write a deeply personalized spiritual gifts report. Do NOT use em dashes. Use commas instead of em dashes. Use a warm, accessible tone. No churchy jargon. Write as if speaking directly to this person.

Return a JSON object with exactly this structure:
{
  "narrative": "350-400 word personalized narrative about this specific person's gift profile, genuinely unique to their scores",
  "topGifts": [
    {"name": "GiftName", "description": "2-3 sentences about how this gift shows up for them specifically"},
    {"name": "GiftName", "description": "2-3 sentences"},
    {"name": "GiftName", "description": "2-3 sentences"}
  ],
  "giftSynergy": "2-3 sentences on how their top 2-3 gifts work together as a unique combination",
  "shadowSide": "2-3 sentences on the specific challenge this gift combination tends to create",
  "scriptures": [
    {"reference": "Book Chapter:Verse", "text": "The actual verse text"},
    {"reference": "Book Chapter:Verse", "text": "The actual verse text"},
    {"reference": "Book Chapter:Verse", "text": "The actual verse text"},
    {"reference": "Book Chapter:Verse", "text": "The actual verse text"}
  ],
  "actionPlan": [
    {"week": 1, "theme": "Theme name", "actions": ["action 1", "action 2", "action 3"]},
    {"week": 2, "theme": "Theme name", "actions": ["action 1", "action 2", "action 3"]},
    {"week": 3, "theme": "Theme name", "actions": ["action 1", "action 2", "action 3"]},
    {"week": 4, "theme": "Theme name", "actions": ["action 1", "action 2", "action 3"]}
  ]
}

Return ONLY the JSON object. No additional text.`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = (message.content[0] as { text: string }).text;

    // Parse JSON from response
    const match = responseText.match(/\{[\s\S]*\}/);
    let results: AIResults | null = null;
    if (match) {
      results = JSON.parse(match[0]);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('generate-results error:', error);
    return NextResponse.json({ results: null }, { status: 500 });
  }
}
