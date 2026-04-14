'use client';

import { useState } from 'react';
import { UserInfo } from '@/types/quiz';

interface Props {
  onSubmit: (info: UserInfo) => void;
}

export default function EmailCapture({ onSubmit }: Props) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Enter a valid email address';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({ firstName: firstName.trim(), email: email.trim() });
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          Discover Your{' '}
          <span className="text-[#34C6F4]">Spiritual Gifts</span>
        </h1>
        <p className="text-white/60 text-lg">
          Takes about 5 minutes. Your results are personal to you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1a2035] rounded-2xl p-6 sm:p-8 space-y-5"
        noValidate
      >
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: undefined })); }}
            placeholder="Your first name"
            className="w-full bg-[#0d1220] border border-white/10 focus:border-[#34C6F4] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            placeholder="you@example.com"
            className="w-full bg-[#0d1220] border border-white/10 focus:border-[#34C6F4] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold text-lg py-4 rounded-xl transition-all duration-200 mt-2"
        >
          Discover My Gifts
        </button>

        <p className="text-white/30 text-xs text-center">
          We respect your privacy. No spam, ever.
        </p>
      </form>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        {['11 spiritual gifts assessed', '5 min to complete', 'Personalized results'].map(
          (item) => (
            <div key={item} className="bg-[#1a2035] rounded-xl p-4">
              <p className="text-white/60 text-xs">{item}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
