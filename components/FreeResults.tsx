'use client';

import { GiftScores, GiftName } from '@/types/quiz';
import { getTopGifts } from '@/lib/scoring';
import { giftDescriptions } from '@/lib/giftDescriptions';

interface Props {
  scores: GiftScores;
  firstName: string;
  onUnlock: () => void;
}

export default function FreeResults({ scores, firstName, onUnlock }: Props) {
  const topGift = getTopGifts(scores, 1)[0] as GiftName;
  const { description, scripture } = giftDescriptions[topGift];

  return (
    <div className="animate-slide-up space-y-8">
      {/* Top Gift Section */}
      <div className="text-center">
        <p className="text-[#34C6F4] text-sm font-semibold tracking-widest uppercase mb-3">
          Your Results Are In
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {firstName ? `${firstName}, your` : 'Your'} top gift is
        </h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#34C6F4] mb-8">
          {topGift}
        </h2>
      </div>

      {/* Gift Description Card */}
      <div className="bg-[#1a2035] rounded-2xl p-6 sm:p-8 border border-[#34C6F4]/20">
        <p className="text-white/90 text-lg leading-relaxed mb-5">{description}</p>
        <div className="border-t border-white/10 pt-4">
          <p className="text-[#34C6F4]/80 text-sm italic">{scripture}</p>
        </div>
      </div>

      {/* Upsell Section */}
      <div className="bg-[#141928] rounded-2xl p-6 sm:p-8 border border-white/5 space-y-5">
        <p className="text-white text-xl font-bold">
          But here&apos;s what we haven&apos;t told you yet.
        </p>
        <p className="text-white/70 leading-relaxed">
          Your answers reveal more than just your top gift. The way you answered across all 40
          questions points to a specific combination of gifts, a shadow side you may not be aware
          of, and a pattern of how you are wired to serve.
        </p>
        <p className="text-white/70 leading-relaxed">
          For $9.99, the next 30 questions will be selected specifically based on how{' '}
          <span className="text-white font-medium">YOU</span> answered, using AI to narrow down
          exactly where your gifts are strongest. Then you will get a personalized analysis and a
          30-day action plan written specifically for you, not a template.
        </p>

        <button
          onClick={onUnlock}
          className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 animate-pulse-glow"
        >
          Unlock My Full Results, $9.99
        </button>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { icon: '🎯', label: 'AI-selected questions' },
            { icon: '✍️', label: 'Personal narrative' },
            { icon: '📅', label: '30-day action plan' },
          ].map(({ icon, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-white/50 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
