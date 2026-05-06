'use client';

import { useState, Suspense } from 'react';
import { GiftScores, QuizPhase, UserInfo, AIResults, Question } from '@/types/quiz';
import { initialScores } from '@/lib/scoring';
import QuizScreen from '@/components/QuizScreen';
import FreeResults from '@/components/FreeResults';
import PaidQuestions from '@/components/PaidQuestions';
import AiResults from '@/components/AiResults';
import Logo from '@/components/Logo';

function FriendsQuizApp() {
  const [phase, setPhase] = useState<QuizPhase>('start');
  const [firstName, setFirstName] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [freeScores, setFreeScores] = useState<GiftScores>(initialScores());
  const [paidScores, setPaidScores] = useState<GiftScores>(initialScores());
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [paidQuestions, setPaidQuestions] = useState<Question[]>([]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const name = firstName.trim() || 'Friend';
    setUserInfo({ firstName: name, email: '' });
    setPhase('screening');
  };

  const handleScreeningComplete = (scores: GiftScores) => {
    setFreeScores(scores);
    setPhase('free-results');
  };

  const handleUnlockPaid = async () => {
    // No paywall — go straight to paid questions
    try {
      const res = await fetch('/api/select-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: freeScores }),
      });
      const data = await res.json();
      const questions = data.questions || [];
      setPaidQuestions(questions);
      setPhase('paid-questions');
    } catch (e) {
      console.error('Failed to load paid questions', e);
      setPhase('paid-questions');
    }
  };

  const [friendEmail, setFriendEmail] = useState('');
  const [friendEmailSent, setFriendEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleFriendEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendEmail || !aiResults) return;
    setSendingEmail(true);
    try {
      await fetch('/api/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: friendEmail,
          firstName: userInfo?.firstName,
          results: aiResults,
          freeScores,
          paidScores,
          source: 'friend-quiz',
        }),
      });
      setFriendEmailSent(true);
    } catch (e) {
      console.error('Email send failed', e);
    }
    setSendingEmail(false);
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
      <div className="max-w-2xl mx-auto px-4 py-2">
        <Logo />
        {phase === 'start' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">Discover Your Spiritual Gifts</h1>
              <p className="text-white/60 text-lg max-w-md mx-auto">40 questions. About 10 minutes. Personalized AI results based on how you are actually wired.</p>
            </div>
            <form onSubmit={handleStart} className="flex flex-col items-center gap-4 w-full max-w-sm">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="w-full bg-[#1a2035] border border-white/10 focus:border-[#34C6F4] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors text-center text-lg"
              />
              <button
                type="submit"
                className="w-full px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1a4e8a, #34C6F4)', boxShadow: '0 0 30px rgba(52,198,244,0.3)' }}
              >
                Start the Quiz →
              </button>
            </form>
          </div>
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
        {phase === 'paid-questions' && paidQuestions.length > 0 && (
          <PaidQuestions
            questions={paidQuestions}
            onComplete={handlePaidComplete}
          />
        )}
        {phase === 'ai-results' && (
          <div>
            <AiResults
              results={aiResults}
              firstName={userInfo?.firstName || ''}
              email=''
              freeScores={freeScores}
              paidScores={paidScores}
              emailSent={false}
            />
            {/* Optional PDF email capture */}
            {!friendEmailSent ? (
              <div className="mt-6 bg-[#1a2035] rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-1">Want a PDF copy?</h3>
                <p className="text-white/50 text-sm mb-4">Enter your email and we&apos;ll send your full results.</p>
                <form onSubmit={handleFriendEmailSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-[#0d1220] border border-white/10 focus:border-[#34C6F4] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    disabled={sendingEmail}
                    className="bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap disabled:opacity-50"
                  >
                    {sendingEmail ? 'Sending...' : 'Send PDF'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-6 bg-[#34C6F4]/10 border border-[#34C6F4]/30 rounded-2xl p-5 text-center">
                <p className="text-[#34C6F4] font-semibold">Your results have been emailed. Check your inbox.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function FriendsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d1220] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    }>
      <FriendsQuizApp />
    </Suspense>
  );
}
