import type { Quiz } from "@/data/quizzes";

interface QuizResultProps {
  quiz:          Quiz;
  score:         number;        // number of correct answers
  selectedAnswers: (string | null)[];
  onRetry:       () => void;
  onReview:      () => void;
  onBack:        () => void;
}

export default function QuizResult({
  quiz,
  score,
  selectedAnswers,
  onRetry,
  onReview,
  onBack,
}: QuizResultProps) {
  const total   = quiz.questions.length;
  const pct     = Math.round((score / total) * 100);
  const passed  = pct >= quiz.passingScore;
  const wrong   = total - score;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Score circle */}
      <div className="relative flex flex-col items-center justify-center w-40 h-40">
        {/* SVG ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="80" cy="80" r="68" fill="none"
            stroke={passed ? "#22c55e" : "#ef4444"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 68}`}
            strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <span className={`text-4xl font-black ${passed ? "text-[#22c55e]" : "text-[#ef4444]"}`}>{pct}%</span>
        <span className="text-[10px] text-white/30 mt-0.5">คะแนน</span>
      </div>

      {/* Pass / Fail badge */}
      <div className={`px-6 py-2.5 rounded-full border font-semibold text-sm tracking-wide
                       ${passed
                         ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]"
                         : "border-[#ef4444]/40 bg-[#ef4444]/10 text-[#ef4444]"}`}>
        {passed ? "🎉 ผ่าน!" : "❌ ยังไม่ผ่าน"}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {[
          { label: "ถูก",  value: score, color: "#22c55e" },
          { label: "ผิด",  value: wrong, color: "#ef4444" },
          { label: "รวม",  value: total, color: "#38bdf8" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5 p-3 rounded-xl
                                        border border-white/[0.07] bg-white/[0.03]">
            <span className="text-xl font-bold" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[10px] text-white/30">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className={`w-full max-w-sm rounded-xl border p-4 text-sm text-center leading-[1.75]
                       ${passed
                         ? "border-[#22c55e]/20 bg-[#22c55e]/[0.05] text-[#22c55e]/70"
                         : "border-[#facc15]/20 bg-[#facc15]/[0.05] text-[#facc15]/70"}`}>
        {passed
          ? "ยอดเยี่ยม! คุณเข้าใจเนื้อหานี้เป็นอย่างดี พร้อมไปยังบทเรียนถัดไปแล้ว 🚀"
          : `คุณได้ ${pct}% (ต้องการ ${quiz.passingScore}%) แนะนำให้ทบทวนบทเรียนก่อนทำใหม่อีกครั้ง`}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button onClick={onReview}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                     border border-white/[0.10] bg-white/[0.04] text-white/60 text-sm font-medium
                     hover:border-white/20 hover:text-white/80 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          ดูเฉลย
        </button>
        <button onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                     bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-medium
                     hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry Quiz
        </button>
      </div>

      <button onClick={onBack}
        className="text-xs text-white/20 hover:text-white/50 transition-colors underline underline-offset-2">
        กลับไปรายการ Quiz
      </button>
    </div>
  );
}
