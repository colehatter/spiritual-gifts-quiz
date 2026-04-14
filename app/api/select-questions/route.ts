import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import questionsData from '@/data/questions.json';
import { GiftScores, GiftName, Question } from '@/types/quiz';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { scores } = (await req.json()) as { scores: GiftScores };

    // Get top 4 gifts
    const ranked = (Object.entries(scores) as [GiftName, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([gift, score]) => ({ gift, score }));

    const topGiftNames = ranked.map((r) => r.gift);

    // Gather all deep bank questions for top gifts at levels 2 and 3
    const deepBank = (questionsData as unknown as { deep_bank: Record<string, { level_1: Question[]; level_2?: Question[]; level_3?: Question[] }> }).deep_bank;

    const candidateQuestions: Question[] = [];

    for (const giftName of topGiftNames) {
      const bank = deepBank[giftName];
      if (bank) {
        if (bank.level_2) candidateQuestions.push(...bank.level_2);
        if (bank.level_3) candidateQuestions.push(...bank.level_3);
        // Also include some level 1 for differentiation
        if (bank.level_1) candidateQuestions.push(...bank.level_1.slice(0, 2));
      }
    }

    // Use Claude to select the best 28 questions
    const prompt = `You are helping select adaptive quiz questions for a spiritual gifts assessment.

The user's top gifts from the screening are:
${ranked.map((r) => `- ${r.gift}: ${r.score} points`).join('\n')}

Here are candidate questions from the deep bank:
${JSON.stringify(candidateQuestions.map((q) => ({ id: q.id, gift: q.gift, question: q.question, format: q.format })), null, 2)}

Select exactly 28 question IDs that will best differentiate between the top gifts and reveal the user's true gift profile. 
Focus on questions that:
1. Distinguish between their top 3-4 gifts
2. Go deeper on their highest-scoring gift
3. Check for hidden secondary gifts
4. Mix formats (D and A/B/C) for variety

Return ONLY a JSON array of question IDs like: ["D-ADM-L2-1", "D-ENC-L3-2", ...]`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = (message.content[0] as { text: string }).text;

    // Parse the IDs
    const match = responseText.match(/\[[\s\S]*\]/);
    let selectedIds: string[] = [];
    if (match) {
      selectedIds = JSON.parse(match[0]);
    }

    // Map IDs back to full questions
    const idToQuestion = new Map<string, Question>(
      candidateQuestions.map((q) => [q.id, q])
    );

    let selected = selectedIds
      .map((id) => idToQuestion.get(id))
      .filter(Boolean) as Question[];

    // Fallback: if AI fails, just take first 28 candidates
    if (selected.length < 10) {
      selected = candidateQuestions.slice(0, 28);
    }

    return NextResponse.json({ questions: selected.slice(0, 30) });
  } catch (error) {
    console.error('select-questions error:', error);
    // Fallback: return first 28 deep bank questions for top gift
    return NextResponse.json({ questions: [] }, { status: 500 });
  }
}
