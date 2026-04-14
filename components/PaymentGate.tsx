'use client';

import { useState } from 'react';

interface Props {
  onSuccess: () => void;
  isLoadingQuestions: boolean;
}

export default function PaymentGate({ onSuccess, isLoadingQuestions }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      
      if (data.testMode || !data.url) {
        // Test mode: bypass payment
        await new Promise((r) => setTimeout(r, 800));
        onSuccess();
      } else {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error('Checkout error', e);
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in text-center py-10">
      <div className="w-16 h-16 rounded-full bg-[#34C6F4]/20 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-[#34C6F4]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-3">Unlock Your Full Results</h2>
      <p className="text-white/60 mb-8">
        {isLoadingQuestions
          ? 'Preparing your personalized questions...'
          : 'Your adaptive questions are ready.'}
      </p>

      <div className="bg-[#1a2035] rounded-2xl p-6 mb-8 text-left space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-[#34C6F4] mt-0.5">✓</span>
          <span className="text-white/80">Questions selected specifically for your answers</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[#34C6F4] mt-0.5">✓</span>
          <span className="text-white/80">AI-generated personalized narrative, 350+ words</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[#34C6F4] mt-0.5">✓</span>
          <span className="text-white/80">Your gift combination and how they work together</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[#34C6F4] mt-0.5">✓</span>
          <span className="text-white/80">Your shadow side and what to watch for</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[#34C6F4] mt-0.5">✓</span>
          <span className="text-white/80">A 30-day action plan written for you</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || isLoadingQuestions}
        className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] disabled:opacity-60 text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 animate-pulse-glow"
      >
        {loading ? 'Redirecting to checkout...' : 'Pay $9.99 and Unlock My Results'}
      </button>
      <p className="text-white/40 text-sm mt-3">Secure checkout powered by Stripe</p>
    </div>
  );
}
