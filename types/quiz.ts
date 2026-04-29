export type GiftName =
  | 'Administration'
  | 'Teaching'
  | 'Encouragement'
  | 'Giving'
  | 'Leadership'
  | 'Mercy'
  | 'Service'
  | 'Evangelism'
  | 'Shepherding'
  | 'Faith'
  | 'Hospitality';

export type QuestionFormat = 'A' | 'B' | 'C' | 'D';

export interface OptionWithGift {
  text: string;
  gift: GiftName;
}

export interface Question {
  id: string;
  format: QuestionFormat;
  question: string;
  options: OptionWithGift[] | string[];
  gift?: GiftName;
  level?: number;
}

export interface ScreeningQuestion extends Question {
  format: 'A' | 'B' | 'C' | 'D';
  options: OptionWithGift[] | string[];
}

export interface GiftScores {
  Administration: number;
  Teaching: number;
  Encouragement: number;
  Giving: number;
  Leadership: number;
  Mercy: number;
  Service: number;
  Evangelism: number;
  Shepherding: number;
  Faith: number;
  Hospitality: number;
}

export interface UserInfo {
  firstName: string;
  email: string;
}

export type QuizPhase =
  | 'start'
  | 'email-capture'
  | 'screening'
  | 'free-results'
  | 'payment'
  | 'paid-questions'
  | 'ai-results';

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  gift: GiftName;
  points: number;
}

export interface AIResults {
  narrative: string;
  topGifts: {
    name: GiftName;
    description: string;
  }[];
  giftSynergy: string;
  shadowSide: string;
  scriptures: {
    reference: string;
    text: string;
  }[];
  actionPlan: {
    week: number;
    theme: string;
    actions: string[];
  }[];
}
