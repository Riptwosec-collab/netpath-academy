import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

const levelColor: Record<string, string> = {
  Beginner:     "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
  Intermediate: "border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15]",
  Advanced:     "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]",
};

const categoryColor: Record<string, string> = {
  Foundation: "border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#38bdf8]/80",
  Switching:  "border-[#8b5cf6]/25 bg-[#8b5cf6]/10 text-[#8b5cf6]/80",
  Routing:    "border-[#f97316]/25 bg-[#f97316]/10 text-[#f97316]/80",
  Security:   "border-[#ef4444]/25 bg-[#ef4444]/10 text-[#ef4444]/80",
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const lvColor  = levelColor[quiz.level]    ?? "border-white/20 bg-white/5 text-white/60";
  const catColor = categoryColor[quiz.category] ?? "border-white/20 bg-white/5 text-white/60";

  return (
    <Link
      href={`/quiz/${quiz.id}`}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03]
                 hover:border-[#38bdf8]/30 hover:bg-white/[0.05]
                 transition-all duration-200 overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#38bdf8]/40 via-[#8b5cf6]/40 to-transparent" />

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-[#38bdf8]/[0.04] to-[#8b5cf6]/[0.04] pointer-events-none" />

      <div className="flex flex-col gap-3 p-5 relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${catColor}`}>
            {quiz.category}
          </span>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${lvColor}`}>
            {quiz.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white/90 leading-snug group-hover:text-white transition-colors">
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/40 leading-[1.7] line-clamp-2">{quiz.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/30 mt-auto pt-1">
          {/* Questions */}
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {quiz.questions.length} ข้อ
          </span>
          {/* Duration */}
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {quiz.duration}
          </span>
          {/* Passing score */}
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ผ่าน {quiz.passingScore}%
          </span>
        </div>

        {/* CTA */}
        <div className="mt-1 flex items-center justify-between">
          {quiz.relatedCourseId && (
            <span className="text-[10px] text-white/20 truncate max-w-[60%]">
              Related: {quiz.relatedCourseId.replace(/-/g, " ")}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-[11px] font-medium text-[#38bdf8]/70
                           group-hover:text-[#38bdf8] transition-colors">
            Start Quiz
            <svg className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform"
                 fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
