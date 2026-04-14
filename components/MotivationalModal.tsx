'use client';

interface Props {
  message: string;
  onDismiss: () => void;
}

export default function MotivationalModal({ message, onDismiss }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-backdrop"
      onClick={onDismiss}
    >
      <div
        className="bg-[#1a2035] border border-[#34C6F4]/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-[#34C6F4]/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#34C6F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
        <p className="text-white text-lg font-medium leading-relaxed mb-6">{message}</p>
        <button
          onClick={onDismiss}
          className="bg-[#34C6F4] hover:bg-[#5ed8ff] text-[#0d1220] font-bold px-8 py-3 rounded-xl transition-all duration-200"
        >
          Keep Going
        </button>
      </div>
    </div>
  );
}
