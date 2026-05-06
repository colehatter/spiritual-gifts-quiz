'use client';

import { GiftScores, GiftName } from '@/types/quiz';

interface Props {
  scores: GiftScores;
  topGifts: GiftName[];
}

export default function GiftChart({ scores, topGifts }: Props) {
  const sorted = (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1]);

  const maxScore = sorted[0]?.[1] || 1;

  return (
    <div className="bg-[#1a2035] rounded-2xl p-6">
      <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-5">
        Your Full Gift Profile
      </h2>
      <div className="space-y-3">
        {sorted.map(([gift, score], i) => {
          const isTop3 = topGifts.includes(gift);
          const pct = Math.round((score / maxScore) * 100);
          return (
            <div key={gift} className="flex items-center gap-3">
              {/* Rank number */}
              <div className={`w-5 text-right text-xs font-bold shrink-0 ${isTop3 ? 'text-[#34C6F4]' : 'text-white/20'}`}>
                {i + 1}
              </div>
              {/* Gift name */}
              <div className={`w-28 text-sm font-medium shrink-0 ${isTop3 ? 'text-white' : 'text-white/35'}`}>
                {gift}
              </div>
              {/* Bar */}
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: isTop3
                      ? 'linear-gradient(90deg, #1a6fa8, #34C6F4)'
                      : 'rgba(255,255,255,0.12)',
                  }}
                />
              </div>
              {/* Score */}
              <div className={`w-8 text-right text-xs font-semibold shrink-0 ${isTop3 ? 'text-[#34C6F4]' : 'text-white/20'}`}>
                {score}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-white/25 text-xs mt-4 text-center">3Nails.ai — findyourgifts.ai</p>
    </div>
  );
}
