"use client";

export default function RetryButton({ onRetry }: { onRetry: () => void }) {
  return (
    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                 bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium
                 hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Retry Quiz
    </button>
  );
}
