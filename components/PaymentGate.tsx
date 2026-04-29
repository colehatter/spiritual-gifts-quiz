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

function CheckoutForm({ onSuccess, firstName }: { onSuccess: () => void; firstName?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: firstName || '',
          },
        },
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
      <PaymentElement
        options={{
          layout: 'tabs',
          defaultValues: {
            billingDetails: { name: firstName || '' },
          },
        }}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] disabled:opacity-60 text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200"
      >
        {loading ? 'Processing...' : 'Unlock My Results — $9.99'}
      </button>
      <p className="text-center text-white/30 text-xs">Secure payment powered by Stripe</p>
    </form>
  );
}

export default function PaymentGate({ onSuccess, isLoadingQuestions, firstName }: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setFetchError(true);
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

      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#34C6F4',
                colorBackground: '#1a2035',
                borderRadius: '12px',
              },
            },
          }}
        >
          <CheckoutForm onSuccess={onSuccess} firstName={firstName} />
        </Elements>
      ) : !fetchError ? (
        <div className="text-center text-white/40 py-4">Loading payment options...</div>
      ) : null}
    </div>
  );
}
