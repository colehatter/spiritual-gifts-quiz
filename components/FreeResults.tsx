'use client';

import { useState } from 'react';
import { GiftScores, GiftName } from '@/types/quiz';
import { getTopGifts } from '@/lib/scoring';
import { giftDescriptions } from '@/lib/giftDescriptions';

interface Props {
  scores: GiftScores;
  firstName: string;
  onUnlock: () => void;
}

export default function FreeResults({ scores, firstName, onUnlock }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const topGift = getTopGifts(scores, 1)[0] as GiftName;
  const { description, scripture } = giftDescriptions[topGift];

  const handleShare = async () => {
    const shareText = `I just discovered my spiritual gift is ${topGift}! Find yours at findyourgifts.ai`;
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); } catch {}
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="animate-slide-up space-y-6">

      {/* Header */}
      <div className="text-center">
        <p className="text-[#34C6F4] text-sm font-semibold tracking-widest uppercase mb-3">
          Your Results Are In
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {firstName ? `${firstName}, your` : 'Your'} top gift is
        </h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#34C6F4] mb-2">
          {topGift}
        </h2>
        <p className="text-white/40 text-sm">Based on your first 40 answers</p>
      </div>

      {/* Gift Description Card */}
      <div className="bg-[#1a2035] rounded-2xl p-6 sm:p-8 border border-[#34C6F4]/20 space-y-4">
        <p className="text-white/90 text-lg leading-relaxed">{description}</p>
        <div className="border-t border-white/10 pt-4">
          <p className="text-[#34C6F4]/80 text-sm italic">{scripture}</p>
        </div>
      </div>

      {/* What this means for you */}
      <div className="bg-[#111827] rounded-2xl p-6 border border-white/10 space-y-3">
        <h3 className="text-white font-bold text-lg">What this means for you</h3>
        <p className="text-white/70 leading-relaxed text-base">
          Your gift of <span className="text-[#34C6F4] font-semibold">{topGift}</span> is not just a personality trait — it is how God specifically designed you to contribute to His kingdom. The things that feel natural to you often feel impossible to others. The way you show up, the energy you bring, the instincts you follow — they are not random. They are intentional.
        </p>
        <p className="text-white/70 leading-relaxed text-base">
          But this is just the surface. Your screening answers point to a specific pattern that goes deeper than one gift. The next phase of the quiz uses those answers to generate questions built uniquely for you — and the results reveal not just your top gift, but how your full gift profile works together, where you are most likely to thrive, and what has been holding you back.
        </p>
      </div>

      {/* Upsell Section */}
      <div className="bg-gradient-to-br from-[#0d1f3c] to-[#0d1220] rounded-2xl p-6 sm:p-8 border border-[#34C6F4]/40 space-y-5">
        <div className="text-center">
          <span className="inline-block bg-[#34C6F4]/10 text-[#34C6F4] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            Unlock Your Full Profile
          </span>
          <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug">
            Your top gift is just the beginning.
          </h3>
        </div>

        <div className="space-y-3">
          {[
            { icon: '🎯', text: 'Your complete gift ranking — all 11 gifts scored and ranked for you' },
            { icon: '🤝', text: 'How your gifts work together — the unique combination that makes you, you' },
            { icon: '⚡', text: 'Your shadow side — what trips people with your gift up (and how to avoid it)' },
            { icon: '📖', text: 'Scriptures selected specifically for your gift profile' },
            { icon: '📅', text: 'A personalized 30-day activation plan — week by week, step by step' },
            { icon: '✉️', text: 'Your full results emailed to you to keep forever' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{icon}</span>
              <p className="text-white/80 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 text-center space-y-1">
          <p className="text-white/40 text-xs line-through">Valued at $47</p>
          <p className="text-white text-2xl font-extrabold">$9.99 <span className="text-white/50 text-base font-normal">one time</span></p>
          <p className="text-white/40 text-xs">No subscription. No account required.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 animate-pulse-glow"
        >
          Get My Full Results — $9.99 →
        </button>

        <p className="text-center text-white/30 text-xs">
          The questions in phase 2 are generated using your specific answers. Nobody else gets the same quiz.
        </p>
      </div>

      {/* Share Button */}
      <div>
        <button
          onClick={handleShare}
          className="w-full border border-white/20 text-white/60 font-semibold py-3 px-6 rounded-xl hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {copied ? 'Copied!' : 'Share my result'}
        </button>
      </div>

      {/* Magic Moment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#0d1220] border border-[#34C6F4]/40 rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl">
            <div className="text-5xl">✨</div>
            <h2 className="text-2xl font-bold text-white leading-snug">
              This is where the magic happens.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              The rest of the questions will be personally and uniquely generated for you based on your previous answers.
            </p>
            <button
              onClick={() => { setShowModal(false); onUnlock(); }}
              className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200"
            >
              Let&apos;s Go →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
