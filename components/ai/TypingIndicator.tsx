export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* AI avatar */}
      <div className="w-7 h-7 rounded-lg flex-shrink-0 bg-gradient-to-br from-[#38bdf8]/20 to-[#8b5cf6]/20
                      border border-[#38bdf8]/25 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm
                      bg-white/[0.04] border border-white/[0.08]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-bounce [animation-delay:300ms]" />
        <span className="ml-1 text-xs text-white/25">AI กำลังคิด...</span>
      </div>
    </div>
  );
}
