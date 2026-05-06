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

// All formats: selecting an option = 3 points for that option's mapped gift
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPoints(_format: string, _selectedIndex: number): number {
  return 3;
}

export function getGiftFromAnswer(question: Question, selectedIndex: number): GiftName {
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
