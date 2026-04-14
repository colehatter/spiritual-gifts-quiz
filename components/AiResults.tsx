'use client';

import { useState } from 'react';
import { AIResults } from '@/types/quiz';

interface Props {
  results: AIResults | null;
  firstName: string;
  email: string;
  freeScores?: unknown;
  paidScores?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AiResults({ results, firstName, email, freeScores: _freeScores, paidScores: _paidScores }: Props) {
  const [waitlistEmail, setWaitlistEmail] = useState(email);
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  const handlePrint = () => window.print();

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to waitlist API
    setWaitlistJoined(true);
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
        <p className="text-white/50">
          Our AI is analyzing your answers. This takes about 15-30 seconds.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up space-y-8 pb-16">
      {/* Header */}
      <div className="text-center print-section">
        <p className="text-[#34C6F4] text-sm font-semibold tracking-widest uppercase mb-3">
          Your Personalized Profile
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {firstName ? `${firstName}'s` : 'Your'} Spiritual Gifts Report
        </h1>
        <button
          onClick={handlePrint}
          className="no-print mt-4 inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Save / Print
        </button>
      </div>

      {/* Narrative */}
      <div className="bg-[#1a2035] rounded-2xl p-6 sm:p-8 print-section">
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">
          Your Story
        </h2>
        <p className="text-white/85 leading-relaxed whitespace-pre-wrap">{results.narrative}</p>
      </div>

      {/* Top Gifts */}
      <div className="print-section">
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">
          Your Gifts at Work
        </h2>
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
      <div className="bg-[#1a2035] rounded-2xl p-6 print-section">
        <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-3">
          Your Shadow Side
        </h2>
        <p className="text-white/80 leading-relaxed">{results.shadowSide}</p>
      </div>

      {/* Scriptures */}
      {results.scriptures && results.scriptures.length > 0 && (
        <div className="print-section">
          <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">
            Scriptures for Your Profile
          </h2>
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
        <div className="print-section">
          <h2 className="text-[#34C6F4] font-semibold text-sm uppercase tracking-wider mb-4">
            Your 30-Day Action Plan
          </h2>
          <div className="space-y-4">
            {results.actionPlan.map((week) => (
              <div key={week.week} className="bg-[#1a2035] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#34C6F4]/20 text-[#34C6F4] text-xs font-bold px-3 py-1 rounded-full">
                    Week {week.week}
                  </div>
                  <h3 className="font-semibold text-white">{week.theme}</h3>
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

      {/* Eden Waitlist */}
      {!waitlistJoined ? (
        <div className="no-print bg-gradient-to-br from-[#1a2035] to-[#141928] rounded-2xl p-6 border border-[#34C6F4]/20">
          <h3 className="text-xl font-bold mb-2">Be first in line for Eden</h3>
          <p className="text-white/60 text-sm mb-4">
            Eden is 3Nails.ai&apos;s spiritual growth platform, built around your gifts. Join the early access waitlist.
          </p>
          <form onSubmit={handleWaitlist} className="flex gap-3">
            <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-[#0d1220] border border-white/10 focus:border-[#34C6F4] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      ) : (
        <div className="no-print bg-[#34C6F4]/10 border border-[#34C6F4]/30 rounded-2xl p-6 text-center">
          <p className="text-[#34C6F4] font-semibold">You are on the list. We will be in touch.</p>
        </div>
      )}
    </div>
  );
}
