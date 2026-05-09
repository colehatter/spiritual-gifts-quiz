'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  onSuccess: () => void;
  isLoadingQuestions: boolean;
  firstName?: string;
}

function CheckoutForm({ onSuccess, firstName, paymentIntentId }: {
  onSuccess: () => void;
  firstName?: string;
  clientSecret?: string;
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountLabel, setDiscountLabel] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [total, setTotal] = useState(9.99);

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
        if (data.isFree) {
          setIsFree(true);
          setTotal(0);
          setDiscountLabel('100% off — Free!');
        } else {
          setTotal(data.newAmount / 100);
          setDiscountLabel(`${data.percentOff}% off applied`);
        }
      } else {
        setPromoError(data.error || 'Invalid promo code');
      }
    } catch {
      setPromoError('Failed to apply. Try again.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isFree) {
      onSuccess();
      return;
    }

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: { billing_details: { name: firstName || '' } },
      },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed. Please try again.');
      setLoading(false);
    } else if (result.paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Promo code */}
      {!promoApplied ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Promo code"
            className="flex-1 bg-[#0d1220] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#34C6F4] text-sm"
          />
          <button
            type="button"
            onClick={applyPromo}
            disabled={promoLoading || !promoCode.trim()}
            className="px-4 py-3 rounded-xl border border-[#34C6F4] text-[#34C6F4] font-semibold text-sm disabled:opacity-40 hover:bg-[#34C6F4]/10 transition-all"
          >
            {promoLoading ? '...' : 'Apply'}
          </button>
        </div>
      ) : (
        <p className="text-green-400 text-sm font-medium">✓ {discountLabel}</p>
      )}
      {promoError && <p className="text-red-400 text-xs">{promoError}</p>}

      {/* Card fields — hidden if free */}
      {!isFree && (
        <PaymentElement options={{ layout: 'tabs', defaultValues: { billingDetails: { name: firstName || '' } } }} />
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={(!isFree && !stripe) || loading}
        className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] disabled:opacity-60 text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200"
      >
        {loading ? 'Processing...' : 'Unlock Everything →'}
      </button>
      <p className="text-center text-white/30 text-xs">Secure payment powered by Stripe</p>
    </form>
  );
}

export default function PaymentGate({ onSuccess, isLoadingQuestions, firstName }: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.clientSecret.split('_secret_')[0]);
        } else {
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true));
  }, []);

  return (
    <div className="animate-fade-in py-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Unlock Your Full Results</h2>
        <p className="text-white/60 text-sm">
          {isLoadingQuestions ? 'Preparing your personalized questions...' : 'Your adaptive questions are ready.'}
        </p>
      </div>

      <div className="bg-[#1a2035] rounded-2xl p-5 space-y-3">
        {[
          'Questions selected specifically for your answers',
          'AI-generated personalized narrative, 350+ words',
          'Your gift combination and how they work together',
          'Your shadow side and what to watch for',
          'A 30-day action plan written for you',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="text-[#34C6F4] mt-0.5">✓</span>
            <span className="text-white/80 text-sm">{item}</span>
          </div>
        ))}
      </div>

      {fetchError && (
        <p className="text-red-400 text-sm text-center">Unable to load payment. Please refresh and try again.</p>
      )}

      {clientSecret && paymentIntentId ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'night', variables: { colorPrimary: '#34C6F4', colorBackground: '#1a2035', borderRadius: '12px' } },
          }}
        >
          <CheckoutForm onSuccess={onSuccess} firstName={firstName} clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
        </Elements>
      ) : !fetchError ? (
        <div className="text-center text-white/40 py-4">Loading payment options...</div>
      ) : null}
    </div>
  );
}
