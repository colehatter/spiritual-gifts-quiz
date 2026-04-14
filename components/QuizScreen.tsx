'use client';

import { useState } from 'react';
import { Question, GiftScores, GiftName } from '@/types/quiz';
import { initialScores, getPoints, getGiftFromAnswer } from '@/lib/scoring';
import MotivationalModal from './MotivationalModal';
import questionsData from '@/data/questions.json';

const MOTIVATIONAL_MESSAGES: Record<number, string> = {
  10: 'You are a quarter of the way through. Every answer is helping us build a picture unique to you.',
  20: 'Halfway. You are doing great. Most people stop here. Not you.',
  30: 'Almost there. The insights ahead are worth it.',
};

interface Props {
  onComplete: (scores: GiftScores) => void;
}

export default function QuizScreen({ onComplete }: Props) {
  const questions = (questionsData as { screening_questions: Question[] }).screening_questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPct = ((currentIndex) / totalQuestions) * 100;

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    const prevAnswer = newAnswers[currentIndex];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);

    // Recalculate scores
    const newScores = initialScores();
    newAnswers.forEach((ans, i) => {
      if (ans !== null) {
        const q = questions[i];
        const gift = getGiftFromAnswer(q, ans);
        const pts = getPoints(q.format, ans);
        newScores[gift] = (newScores[gift] || 0) + pts;
      }
    });
    // Move to next after short delay
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      const motMsg = MOTIVATIONAL_MESSAGES[nextIdx];
      if (motMsg && prevAnswer === null) {
        setPendingIndex(nextIdx);
        setModalMessage(motMsg);
        setShowModal(true);
      } else {
        goToQuestion(nextIdx);
      }
    } else {
      // Last question: wait a moment then complete
      setTimeout(() => {
        onComplete(newScores);
      }, 400);
    }
  };

  const goToQuestion = (idx: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setAnimating(false);
    }, 200);
  };

  const handleModalDismiss = () => {
    setShowModal(false);
    if (pendingIndex !== null) {
      goToQuestion(pendingIndex);
      setPendingIndex(null);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  const isFormatD = currentQuestion.format === 'D';
  const optionsABC = !isFormatD
    ? (currentQuestion.options as { text: string; gift: GiftName }[])
    : null;
  const optionsD = isFormatD
    ? ['Sounds just like me', 'Somewhat like me', 'Not really me']
    : null;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white/50">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progressPct)}% complete</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div
        className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="bg-[#1a2035] rounded-2xl p-6 sm:p-8 animate-fade-in">
          <p className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-6">
            {currentQuestion.question}
          </p>

          {/* Format D */}
          {isFormatD && optionsD && (
            <div className="space-y-3">
              {optionsD.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`answer-card w-full text-left px-5 py-4 rounded-xl text-white font-medium transition-all ${
                    answers[currentIndex] === i ? 'selected' : ''
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Format A/B/C */}
          {!isFormatD && optionsABC && (
            <div className="space-y-3">
              {optionsABC.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`answer-card w-full text-left px-5 py-4 rounded-xl text-white/90 transition-all ${
                    answers[currentIndex] === i ? 'selected' : ''
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Change previous answer
        </button>
      )}

      {showModal && (
        <MotivationalModal message={modalMessage} onDismiss={handleModalDismiss} />
      )}
    </div>
  );
}
