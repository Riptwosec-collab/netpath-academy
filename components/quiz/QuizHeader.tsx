import type { Quiz } from "@/data/quizzes";

const levelColor: Record<string, string> = {
  Beginner:     "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
  Intermediate: "border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15]",
  Advanced:     "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]",
};

export default function QuizHeader({ quiz }: { quiz: Quiz }) {
  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden p-5 md:p-6">
      {/* Ambient blobs */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#8b5cf6]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#38bdf8]/80">
            {quiz.category}
          </span>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${levelColor[quiz.level] ?? ""}`}>
            {quiz.level}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white/95">{quiz.title}</h1>
        <p className="text-sm text-white/50 leading-[1.75] max-w-2xl">{quiz.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-1 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#38bdf8]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {quiz.questions.length} คำถาม
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#8b5cf6]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {quiz.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#22c55e]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เกณฑ์ผ่าน {quiz.passingScore}%
          </span>
        </div>
      </div>
    </div>
  );
}
