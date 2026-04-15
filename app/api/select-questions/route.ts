import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/data/questions.json';
import { GiftScores, GiftName, Question } from '@/types/quiz';

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export async function POST(req: NextRequest) {
  try {
    const { scores } = (await req.json()) as { scores: GiftScores };

    // --- Step 1: Rank all gifts by score ---
    const ranked = (Object.entries(scores) as [GiftName, number][])
      .sort((a, b) => b[1] - a[1]);

    const topGifts = ranked.slice(0, 4).map(([gift]) => gift);

    // --- Step 2: Detect confusion zones (top gifts within 15% of each other) ---
    const confusionPairs: [GiftName, GiftName][] = [];
    for (let i = 0; i < Math.min(ranked.length - 1, 3); i++) {
      const scoreA = ranked[i][1];
      const scoreB = ranked[i + 1][1];
      // Avoid division by zero; if both are 0 they're equally confused
      const threshold = scoreA === 0 ? 0 : scoreA * 0.85;
      if (scoreB >= threshold) {
        confusionPairs.push([ranked[i][0], ranked[i + 1][0]]);
      }
    }

    // --- Step 3: Load deep bank ---
    type DeepBankEntry = { level_1: Question[]; level_2?: Question[]; level_3?: Question[] };
    const deepBank = (
      questionsData as unknown as { deep_bank: Record<string, DeepBankEntry> }
    ).deep_bank;

    // Track used IDs to avoid duplicates
    const usedIds = new Set<string>();

    const getFromLevels = (
      giftName: string,
      n: number,
      levels: ('level_1' | 'level_2' | 'level_3')[] = ['level_2', 'level_3']
    ): Question[] => {
      const bank = deepBank[giftName];
      if (!bank) return [];
      const pool: Question[] = [];
      for (const level of levels) {
        const qs = bank[level] ?? [];
        pool.push(...qs.filter((q) => !usedIds.has(q.id)));
      }
      const picked = pickN(pool, n);
      picked.forEach((q) => usedIds.add(q.id));
      return picked;
    };

    // --- Step 4: Allocate questions per budget ---
    // #1 gift: 8 questions (L2 + L3)
    // #2 gift: 6 questions (L2 + L3)
    // #3 gift: 5 questions (L2 + L3)
    // #4 gift: 4 questions (L2 only)
    // confusion zones: 5 questions (extra L2/L3 from confused pairs)
    // Total: 28

    const selected: Question[] = [];

    if (topGifts[0]) selected.push(...getFromLevels(topGifts[0], 8, ['level_2', 'level_3']));
    if (topGifts[1]) selected.push(...getFromLevels(topGifts[1], 6, ['level_2', 'level_3']));
    if (topGifts[2]) selected.push(...getFromLevels(topGifts[2], 5, ['level_2', 'level_3']));
    if (topGifts[3]) selected.push(...getFromLevels(topGifts[3], 4, ['level_2']));

    // Confusion zone questions: pull additional coverage from confused gift pairs
    // Budget: 5 questions total across all pairs
    if (confusionPairs.length > 0) {
      const perPair = Math.ceil(5 / confusionPairs.length);
      for (const [giftA, giftB] of confusionPairs) {
        const half = Math.ceil(perPair / 2);
        // Pull from whichever gift hasn't been exhausted, preferring L3 (deepest differentiation)
        selected.push(...getFromLevels(giftA, half, ['level_3', 'level_2']));
        selected.push(...getFromLevels(giftB, perPair - half, ['level_3', 'level_2']));
        if (selected.length >= 28) break;
      }
    }

    // --- Step 5: Pad to 28 if budget didn't fill (e.g. sparse question bank) ---
    if (selected.length < 28) {
      for (const [giftName] of ranked) {
        if (selected.length >= 28) break;
        selected.push(...getFromLevels(giftName, 28 - selected.length, ['level_2', 'level_3', 'level_1']));
      }
    }

    // Final shuffle so questions don't appear gift-by-gift
    const finalQuestions = shuffle(selected).slice(0, 28);

    return NextResponse.json({
      questions: finalQuestions,
      debug: {
        topGifts,
        confusionPairs,
        totalSelected: finalQuestions.length,
      },
    });
  } catch (error) {
    console.error('select-questions error:', error);
    return NextResponse.json({ questions: [] }, { status: 500 });
  }
}
