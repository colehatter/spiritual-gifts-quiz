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
  const topGift = getTopGifts(scores, 1)[0] as GiftName;
  const { description, scripture } = giftDescriptions[topGift];
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `I just discovered my spiritual gift is ${topGift}! Find yours at findyourgifts.ai`;
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

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

      {/* Share Button */}
      <div className="pt-2">
        <button
          onClick={handleShare}
          className="w-full border border-white/20 text-white/70 font-semibold py-3 px-6 rounded-xl hover:border-white/40 hover:text-white transition-all flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {/* Continue Button */}
      <div className="pt-2">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 animate-pulse-glow"
        >
          Continue the Test →
        </button>
      </div>

      {/* Magic Moment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          {/* Modal */}
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