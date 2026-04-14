export default function Logo() {
  return (
    <div className="flex items-center justify-center py-4 mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#34C6F4]/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#34C6F4]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-white/70 text-sm font-medium tracking-wide">3Nails.ai</span>
      </div>
    </div>
  );
}
