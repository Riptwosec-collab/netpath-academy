import type { Lesson } from "@/data/courses";

export default function LessonSummary({ lesson }: { lesson: Lesson }) {
  if (!lesson.summary) return null;
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#38bdf8]/[0.04] to-[#8b5cf6]/[0.04] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        สรุปบทเรียน
      </h2>
      <p className="text-sm text-white/60 leading-[1.8]">{lesson.summary}</p>
    </div>
  );
}
