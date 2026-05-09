'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GiftScores, QuizPhase, UserInfo, AIResults, Question } from '@/types/quiz';
import { initialScores } from '@/lib/scoring';
import EmailCapture from '@/components/EmailCapture';
import QuizScreen from '@/components/QuizScreen';
import FreeResults from '@/components/FreeResults';
import PaidQuestions from '@/components/PaidQuestions';
import AiResults from '@/components/AiResults';
import PaymentGate from '@/components/PaymentGate';
import Logo from '@/components/Logo';

function QuizApp() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<QuizPhase>('email-capture');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [freeScores, setFreeScores] = useState<GiftScores>(initialScores());
  const [paidScores, setPaidScores] = useState<GiftScores>(initialScores());
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [paidQuestions, setPaidQuestions] = useState<Question[]>([]);
  const [isLoadingPaidQuestions, setIsLoadingPaidQuestions] = useState(false);
  const [isPaidUpfront, setIsPaidUpfront] = useState(false);
  const [pendingScores, setPendingScores] = useState<GiftScores | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const fireFbq = (event: string, params?: object) => {
    try {
      if (typeof window !== 'undefined' && (window as { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as { fbq?: (...a: unknown[]) => void }).fbq?.('track', event, params);
      }
    } catch { /* silent */ }
  };

  // ── FLOW B: paid upfront from /start (paid=true) ──────────────────────────
  useEffect(() => {
    const paid = searchParams.get('paid');
    if (paid !== 'true' && sessionStorage.getItem('quiz_paid') !== 'true') return;

    setIsPaidUpfront(true);
    fireFbq('Purchase', { value: 9.99, currency: 'USD' });

    try {
      const state = JSON.parse(sessionStorage.getItem('quiz_state') || '{}');
      const info = state.userInfo || { firstName: 'Friend', email: '' };
      setUserInfo(info);
      if (info.email) {
        fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: info.email, firstName: info.firstName, source: 'quiz-paid-upfront' }),
        }).catch(console.error);
      }
    } catch { /* silent */ }

    setPhase('screening');
  }, [searchParams]);

  // ── FLOW C: returning after Stripe redirect (payment=success) ─────────────
  useEffect(() => {
    if (searchParams.get('payment') !== 'success') return;

    fireFbq('Purchase', { value: 9.99, currency: 'USD' });

    try {
      const state = JSON.parse(sessionStorage.getItem('quiz_state') || '{}');
      if (state.userInfo) setUserInfo(state.userInfo);
      if (state.freeScores) setFreeScores(state.freeScores);

      if (state.paidQuestions?.length > 0) {
        setPaidQuestions(state.paidQuestions);
        setPhase('paid-questions');
      } else if (state.freeScores) {
        setIsPaidUpfront(true);
        setPendingScores(state.freeScores);
        setPhase('pre-paid');
      } else {
        // No state at all — restart as paid upfront
        setIsPaidUpfront(true);
        setUserInfo({ firstName: 'Friend', email: '' });
        setPhase('screening');
      }
    } catch {
      setIsPaidUpfront(true);
      setUserInfo({ firstName: 'Friend', email: '' });
      setPhase('screening');
    }
  }, [searchParams]);

  // ── FLOW A: free quiz ──────────────────────────────────────────────────────

  const handleEmailSubmit = (info: UserInfo) => {
    fireFbq('Lead');
    setUserInfo(info);
    fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: info.email, firstName: info.firstName, source: 'quiz-email-capture' }),
    }).catch(console.error);
    setPhase('screening');
  };

  const handleScreeningComplete = async (scores: GiftScores) => {
    setFreeScores(scores);
    if (isPaidUpfront) {
      setPendingScores(scores);
      setPhase('pre-paid');
    } else {
      setPhase('free-results');
      const email = userInfo?.email;
      if (email) {
        fetch('/api/send-free-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName: userInfo?.firstName, scores }),
        }).catch(console.error);
        fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName: userInfo?.firstName, source: 'quiz-free-results', scores }),
        }).catch(console.error);
      }
    }
  };

  // Upgrade at Q40 — load questions and go to payment
  const handleUnlockPaid = async () => {
    setIsLoadingPaidQuestions(true);
    try {
      const res = await fetch('/api/select-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: freeScores }),
      });
      const questions = (await res.json()).questions || [];
      setPaidQuestions(questions);
      try {
        sessionStorage.setItem('quiz_state', JSON.stringify({ freeScores, userInfo, paidQuestions: questions }));
      } catch { /* silent */ }
    } catch { /* silent */ } finally {
      setIsLoadingPaidQuestions(false);
    }
    setPhase('payment');
  };

  // After payment gate succeeds (mid-quiz upgrade)
  const handlePaymentSuccess = () => {
    fireFbq('Purchase', { value: 9.99, currency: 'USD' });
    setPhase('pre-paid');
  };

  // Magic modal → load paid questions and go
  const handleUnlockFromModal = async () => {
    setIsLoadingPaidQuestions(true);
    try {
      const scores = pendingScores || freeScores;
      let questions = paidQuestions;
      if (!questions.length) {
        const res = await fetch('/api/select-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scores }),
        });
        questions = (await res.json()).questions || [];
        setPaidQuestions(questions);
      }
      setPhase('paid-questions');
    } catch { /* silent */ } finally {
      setIsLoadingPaidQuestions(false);
    }
  };

  const handlePaidComplete = async (scores: GiftScores) => {
    setPaidScores(scores);
    setPhase('ai-results');
    try {
      const res = await fetch('/api/generate-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userInfo?.firstName, freeScores, paidScores: scores }),
      });
      const data = await res.json();
      setAiResults(data.results);
      const email = userInfo?.email || pendingEmail;
      if (data.results && email) {
        fetch('/api/email-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName: userInfo?.firstName, results: data.results, freeScores, paidScores: scores, source: 'quiz' }),
        }).catch(console.error);
      }
    } catch { /* silent */ }
  };

  return (
    <main className="min-h-screen bg-[#0d1220]">
      <div className="max-w-2xl mx-auto px-4 py-2">
        <Logo />

        {phase === 'email-capture' && (
          <EmailCapture onSubmit={handleEmailSubmit} />
        )}

        {phase === 'screening' && (
          <QuizScreen onComplete={handleScreeningComplete} />
        )}

        {phase === 'free-results' && (
          <FreeResults
            scores={freeScores}
            firstName={userInfo?.firstName || ''}
            onUnlock={handleUnlockPaid}
          />
        )}

        {phase === 'payment' && (
          <PaymentGate
            onSuccess={handlePaymentSuccess}
            isLoadingQuestions={isLoadingPaidQuestions}
            firstName={userInfo?.firstName || ''}
          />
        )}

        {phase === 'pre-paid' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="relative bg-[#0d1220] border border-[#34C6F4]/40 rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl">
              <div className="text-5xl">✨</div>
              <h2 className="text-2xl font-bold text-white leading-snug">This is where the magic happens.</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                The rest of the questions will be personally and uniquely generated for you based on your previous answers.
              </p>
              <button
                onClick={handleUnlockFromModal}
                disabled={isLoadingPaidQuestions}
                className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] disabled:opacity-60 text-[#0d1220] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200"
              >
                {isLoadingPaidQuestions ? 'Preparing your questions...' : "Let's Go →"}
              </button>
            </div>
          </div>
        )}

        {phase === 'paid-questions' && paidQuestions.length > 0 && (
          <PaidQuestions questions={paidQuestions} onComplete={handlePaidComplete} />
        )}

        {phase === 'ai-results' && (
          <AiResults
            results={aiResults}
            firstName={userInfo?.firstName || ''}
            email={userInfo?.email || ''}
            freeScores={freeScores}
            paidScores={paidScores}
            emailSent={!!(userInfo?.email)}
            onEmailSubmit={async (email) => {
              if (aiResults) {
                fetch('/api/email-results', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, firstName: userInfo?.firstName, results: aiResults, freeScores, paidScores, source: 'quiz' }),
                }).catch(console.error);
              } else {
                setPendingEmail(email);
              }
            }}
          />
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d1220] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    }>
      <QuizApp />
    </Suspense>
  );
}
