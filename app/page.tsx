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

  // Handle Stripe redirect back
  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      // Restore state from sessionStorage if available
      try {
        const saved = sessionStorage.getItem('quiz_state');
        if (saved) {
          const state = JSON.parse(saved);
          if (state.freeScores) setFreeScores(state.freeScores);
          if (state.userInfo) setUserInfo(state.userInfo);
          if (state.paidQuestions?.length > 0) {
            setPaidQuestions(state.paidQuestions);
            setPhase('paid-questions');
          }
        }
      } catch (e) {
        console.error('State restore failed', e);
      }
    }
  }, [searchParams]);

  const fireLeadEvent = () => {
    try {
      if (typeof window !== 'undefined' && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead');
      }
    } catch { /* silent */ }
  };

  const handleEmailSubmit = (info: UserInfo) => {
    fireLeadEvent();
    setUserInfo(info);
    setPhase('screening');
  };

  const handleScreeningComplete = (scores: GiftScores) => {
    setFreeScores(scores);
    setPhase('free-results');
  };

  const handleUnlockPaid = async () => {
    setIsLoadingPaidQuestions(true);
    try {
      const res = await fetch('/api/select-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: freeScores }),
      });
      const data = await res.json();
      const questions = data.questions || [];
      setPaidQuestions(questions);

      // Save state for after Stripe redirect
      try {
        sessionStorage.setItem(
          'quiz_state',
          JSON.stringify({ freeScores, userInfo, paidQuestions: questions })
        );
      } catch {}
    } catch (e) {
      console.error('Failed to load paid questions', e);
    } finally {
      setIsLoadingPaidQuestions(false);
    }
    setPhase('paid-questions');
  };

  const handlePaymentSuccess = () => {
    setPhase('paid-questions');
  };

  const handlePaidComplete = async (scores: GiftScores) => {
    setPaidScores(scores);
    setPhase('ai-results');
    try {
      const res = await fetch('/api/generate-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userInfo?.firstName,
          freeScores,
          paidScores: scores,
        }),
      });
      const data = await res.json();
      setAiResults(data.results);
    } catch (e) {
      console.error('Failed to generate results', e);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d1220]">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Logo />
        {phase === 'start' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">Discover Your Spiritual Gifts</h1>
              <p className="text-white/60 text-lg max-w-md mx-auto">40 questions. 5 minutes. Personalized results based on how you are actually wired.</p>
            </div>
            <button
              onClick={() => { fireLeadEvent(); setUserInfo({ firstName: 'Friend', email: '' }); setPhase('screening'); }}
              className="px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1a4e8a, #34C6F4)', boxShadow: '0 0 30px rgba(52,198,244,0.3)' }}
            >
              Start the Quiz →
            </button>
            <p className="text-white/30 text-sm">Preview mode, no email required</p>
          </div>
        )}
        {phase === 'email-capture' && (
          <EmailCapture onSubmit={handleEmailSubmit} />
        )}
        {phase === 'screening' && (
          <QuizScreen
            onComplete={handleScreeningComplete}
          />
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
          />
        )}
        {phase === 'paid-questions' && paidQuestions.length > 0 && (
          <PaidQuestions
            questions={paidQuestions}
            onComplete={handlePaidComplete}
          />
        )}
        {phase === 'ai-results' && (
          <AiResults
            results={aiResults}
            firstName={userInfo?.firstName || ''}
            email={userInfo?.email || ''}
            freeScores={freeScores}
            paidScores={paidScores}
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
