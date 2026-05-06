import { GiftScores, GiftName, Question } from '@/types/quiz';

export const initialScores = (): GiftScores => ({
  Administration: 0,
  Teaching: 0,
  Encouragement: 0,
  Giving: 0,
  Leadership: 0,
  Mercy: 0,
  Service: 0,
  Evangelism: 0,
  Shepherding: 0,
  Faith: 0,
  Hospitality: 0,
});

// Points: Likert = 3/1/0, A/B/C gift-mapped = always 3
// isLikert is passed from the caller based on option type detection
export function getPoints(format: string, selectedIndex: number, isLikert = false): number {
  if (isLikert) {
    return selectedIndex === 0 ? 3 : selectedIndex === 1 ? 1 : 0;
  }
  return 3;
}

export function getGiftFromAnswer(question: Question, selectedIndex: number): GiftName {
  const firstOpt = (question.options as unknown[])[0];
  if (typeof firstOpt === 'string') {
    // Likert question — award points to primary gift
    return question.gift as GiftName;
  }
  const options = question.options as { text: string; gift: GiftName }[];
  return options[selectedIndex].gift;
}

export function getTopGifts(scores: GiftScores, count = 3): GiftName[] {
  return (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([gift]) => gift);
}

export function mergeScores(base: GiftScores, additional: GiftScores): GiftScores {
  const result = { ...base };
  for (const key of Object.keys(additional) as GiftName[]) {
    result[key] = (result[key] || 0) + (additional[key] || 0);
  }
  return result;
}
