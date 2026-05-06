'use client';

import { useState } from 'react';
import { AIResults, GiftScores, GiftName } from '@/types/quiz';
import { getTopGifts } from '@/lib/scoring';
import GiftChart from './GiftChart';

interface Props {
  results: AIResults | null;
  firstName: string;
  email: string;
  freeScores?: GiftScores;
  paidScores?: GiftScores;
  emailSent?: boolean;
}

function mergeScores(a?: GiftScores, b?: GiftScores): GiftScores {
  const empty: GiftScores = { Administration: 0, Teaching: 0, Encouragement: 0, Giving: 0, Leadership: 0, Mercy: 0, Service: 0, Evangelism: 0, Shepherding: 0, Faith: 0, Hospitality: 0 };
  const base = { ...empty, ...(a || {}) };
  if (!b) return base;
  for (const key of Object.keys(b) as GiftName[]) {
    base[key] = (base[key] || 0) + (b[key] || 0);
  }
  return base;
}

export default function AiResults({ results, firstName, email, freeScores, paidScores, emailSent }: Props) {
  const [copied, setCopied] = useState(false);

  const combinedScores = mergeScores(freeScores, paidScores);
  const topGifts = getTopGifts(combinedScores, 3) as GiftName[];

  const handleShare = async () => {
    const shareText = `I just discovered my top spiritual gifts are ${topGifts.slice(0, 2).join(' and ')}! Find yours at findyourgifts.ai`;
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: 'https://findyourgifts.ai' });
      } catch { /* silent */ }
    } else {
      navigator.clipboard.writeText('https://findyourgifts.ai').then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!results) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#34C6F4]/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#34C6F4] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Building your personalized results</h2>
        <p className="text-white/50">Our AI is analyzing your answers. This takes about 15-30 seconds.</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up space-y-8 pb-16">

      {/* Header */}
      <div className="text-center">
        <p className="text-[#34C6F4] text-sm font-semibold tracking-widest uppercase mb-3">
          Your Personalized Profile
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {firstName ? `${firstName}'s` : 'Your'} Spiritual Gifts Report
        </h1>
        {email && (emailSent !== false) && (
          <p className="text-white/40 text-sm mt-2 flex items-center justify-center gap-1">
            <svg className="w-4 h-4 text-[#34C6F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Your PDF results have been emailed to {email}
          </p>
        )}
      </div>

      {/* Gift Chart */}
      {freeScores && (
        <GiftChart scores={combinedScores} topGifts={topGifts} />
      )}

      {/* Narrative */}
      <div className="bg-[#1a2035] rounded-2xl p-6 sm:p-8">
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">Your Story</h2>
        <p className="text-white/85 leading-relaxed whitespace-pre-wrap">{results.narrative}</p>
      </div>

      {/* Top Gifts */}
      <div>
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">Your Gifts at Work</h2>
        <div className="space-y-4">
          {results.topGifts.map((gift, i) => (
            <div key={gift.name} className="bg-[#1a2035] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#34C6F4]/20 flex items-center justify-center text-sm font-bold text-[#34C6F4]">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold">{gift.name}</h3>
              </div>
              <p className="text-white/75 leading-relaxed">{gift.description}</p>
            </div>
          ))}
        </div>
        {results.giftSynergy && (
          <div className="mt-4 bg-[#34C6F4]/10 border border-[#34C6F4]/20 rounded-xl p-4">
            <p className="text-white/80 leading-relaxed italic">{results.giftSynergy}</p>
          </div>
        )}
      </div>

      {/* Shadow Side */}
      <div className="bg-[#1a2035] rounded-2xl p-6">
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-3">Your Shadow Side</h2>
        <p className="text-white/80 leading-relaxed">{results.shadowSide}</p>
      </div>

      {/* Scriptures */}
      {results.scriptures && results.scriptures.length > 0 && (
        <div>
          <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">Scriptures for Your Profile</h2>
          <div className="space-y-3">
            {results.scriptures.map((s, i) => (
              <div key={i} className="bg-[#1a2035] rounded-xl p-4">
                <p className="text-[#34C6F4] font-semibold text-sm mb-1">{s.reference}</p>
                <p className="text-white/70 italic">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 30-Day Action Plan */}
      {results.actionPlan && results.actionPlan.length > 0 && (
        <div>
          <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">Your 30-Day Action Plan</h2>
          <div className="space-y-4">
            {results.actionPlan.map((week) => (
              <div key={week.week} className="bg-[#1a2035] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#34C6F4]/20 text-[#34C6F4] text-xs font-bold px-3 py-1 rounded-full">
                    Week {week.week}
                  </div>
                  <h3 className="font-bold text-white">{week.theme}</h3>
                </div>
                <ul className="space-y-2">
                  {week.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="text-[#34C6F4] mt-0.5 shrink-0">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Button */}
      <div className="pt-2">
        <button
          onClick={handleShare}
          className="w-full border border-white/20 text-white/70 font-semibold py-3 px-6 rounded-xl hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {copied ? 'Link Copied!' : 'Share This Quiz'}
        </button>
      </div>

    </div>
  );
}
