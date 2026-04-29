'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Logo from '@/components/Logo';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ onSuccess, clientSecret }: { onSuccess: () => void; clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [discountLabel, setDiscountLabel] = useState<string | null>(null);

  const paymentIntentId = clientSecret.split('_secret_')[0];

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError(null);
    try {
      const res = await fetch('/api/apply-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim(), paymentIntentId }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoApplied(true);
        if (data.isFree) { setIsFree(true); setDiscountLabel('100% off — Free!'); }
        else { setDiscountLabel(`${data.percentOff}% off applied`); }
      } else {
        setPromoError(data.error || 'Invalid promo code');
      }
    } catch { setPromoError('Failed to apply. Try again.'); }
    finally { setPromoLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (isFree) { onSuccess(); return; }
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });
    if (result.error) {
      setError(result.error.message || 'Payment failed. Please try again.');
      setLoading(false);
    } else if (result.paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {!promoApplied ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Promo code"
            className="flex-1 bg-[#0d1220] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#34C6F4] text-sm"
          />
          <button type="button" onClick={applyPromo} disabled={promoLoading || !promoCode.trim()}
            className="px-4 py-3 rounded-xl border border-[#34C6F4] text-[#34C6F4] font-semibold text-sm disabled:opacity-40 hover:bg-[#34C6F4]/10 transition-all">
            {promoLoading ? '...' : 'Apply'}
          </button>
        </div>
      ) : (
        <p className="text-green-400 text-sm font-medium">✓ {discountLabel}</p>
      )}
      {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
      {!isFree && <PaymentElement options={{ layout: 'tabs' }} />}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={(!isFree && !stripe) || loading}
        className="w-full font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #1a4e8a, #34C6F4)', color: '#ffffff' }}>
        {loading ? 'Processing...' : isFree ? 'Unlock Full Access — Free' : 'Unlock Full Access — $9.99'}
      </button>
      <p className="text-center text-white/30 text-xs">Secure payment · No subscription</p>
    </form>
  );
}

function StartPageContent() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => { if (data.clientSecret) setClientSecret(data.clientSecret); });
  }, []);

  const handlePaidSuccess = () => {
    sessionStorage.setItem('quiz_paid', 'true');
    router.push('/quiz?paid=true');
  };

  const freeBullets = [
    '40 questions, takes 10 minutes',
    'Discover your #1 spiritual gift',
    'Instant free results',
  ];

  const paidBullets = [
    'Everything in the free quiz',
    'AI-selected deep-dive questions based on your answers',
    'Personalized narrative — 350+ words written for you',
    'Your full gift combination, ranked',
    'Shadow side analysis — how your gift gets misused',
    'How to surrender your gift back to God',
    '30-day activation plan, week by week',
    'Scripture tied to your specific gifts',
  ];

  return (
    <main className="min-h-screen bg-[#0d1220]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Logo />
        <div className="text-center mb-10 mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Choose how you want to start</h1>
          <p className="text-white/60 text-lg">Free gets you started. $9.99 gets you everything.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* FREE COLUMN */}
          <div className="bg-[#1a2035] rounded-2xl p-6 border border-white/10">
            <div className="mb-5">
              <span className="text-sm font-bold tracking-widest text-white/50 uppercase">Free</span>
              <p className="text-4xl font-extrabold text-white mt-1">$0</p>
            </div>
            <ul className="space-y-3 mb-8">
              {freeBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white/80 text-sm">
                  <span className="text-white/40 mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push('/quiz')}
              className="w-full border border-white/20 text-white/70 font-semibold py-3 px-6 rounded-xl hover:border-white/40 hover:text-white transition-all"
            >
              Start Free Quiz →
            </button>
          </div>

          {/* PAID COLUMN */}
          <div className="bg-[#1a2035] rounded-2xl p-6 border-2 border-[#34C6F4]" style={{ boxShadow: '0 0 30px rgba(52,198,244,0.15)' }}>
            <div className="mb-5">
              <span className="text-sm font-bold tracking-widest text-[#34C6F4] uppercase">Full Access</span>
              <p className="text-4xl font-extrabold text-white mt-1">$9.99</p>
              <p className="text-white/50 text-sm mt-1">One-time · Instant access</p>
            </div>
            <ul className="space-y-3 mb-6">
              {paidBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white/90 text-sm">
                  <span className="text-[#34C6F4] mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {!showPayment ? (
              <button
                onClick={() => setShowPayment(true)}
                className="w-full font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #1a4e8a, #34C6F4)', color: '#ffffff', boxShadow: '0 0 20px rgba(52,198,244,0.3)' }}
              >
                Get Full Access — $9.99
              </button>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'night',
                    variables: { colorPrimary: '#34C6F4', colorBackground: '#1a2035', borderRadius: '12px' },
                  },
                }}
              >
                <CheckoutForm onSuccess={handlePaidSuccess} clientSecret={clientSecret} />
              </Elements>
            ) : (
              <p className="text-white/40 text-sm text-center py-4">Loading payment options...</p>
            )}
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          No sign-up required · Takes 10 minutes · Results powered by AI
        </p>
      </div>
    </main>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d1220] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}
