import Link from "next/link";
import type { Lesson } from "@/data/courses";

export default function LessonNavigation({
  lesson,
  courseId,
}: {
  lesson:   Lesson;
  courseId: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Back to course */}
      <Link
        href={`/courses/${courseId}`}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] text-white/35
                   hover:border-white/20 hover:text-white/60 text-xs font-medium transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        กลับไปหน้า Course
      </Link>

      <div className="flex items-center gap-3 sm:ml-auto">
        {/* Previous lesson */}
        {lesson.prevLessonId ? (
          <Link
            href={`/courses/${courseId}/lessons/${lesson.prevLessonId}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                       border border-white/[0.08] text-white/50 hover:border-[#38bdf8]/30 hover:text-[#38bdf8]/80
                       text-xs font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            บทก่อนหน้า
          </Link>
        ) : (
          <div className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/[0.04] text-white/15 text-xs font-medium cursor-default text-center">
            บทก่อนหน้า
          </div>
        )}

        {/* Next lesson */}
        {lesson.nextLessonId ? (
          <Link
            href={`/courses/${courseId}/lessons/${lesson.nextLessonId}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                       bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8] font-medium text-xs
                       hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all"
          >
            บทถัดไป
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                          bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e]/70 font-medium text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            จบ Module นี้แล้ว!
          </div>
        )}
      </div>
    </div>
  );
}
