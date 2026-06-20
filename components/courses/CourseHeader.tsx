import Link from "next/link";
import type { Course } from "@/data/courses";
import { getTotalLessons, getCompletedLessons } from "@/data/courses";

const levelColor: Record<string, string> = {
  Beginner:     "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25",
  Intermediate: "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/25",
  Advanced:     "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/25",
};
const categoryColor: Record<string, string> = {
  Foundation: "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/25",
  Switching:  "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25",
  Routing:    "text-[#facc15] bg-[#facc15]/10 border-[#facc15]/25",
  Security:   "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/25",
  Automation: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/25",
};

export default function CourseHeader({ course }: { course: Course }) {
  const lvlCls = levelColor[course.level]       ?? "text-white/50 bg-white/5 border-white/10";
  const catCls = categoryColor[course.category] ?? "text-white/50 bg-white/5 border-white/10";
  const total  = getTotalLessons(course);
  const done   = getCompletedLessons(course);
  const pct    = course.progress;

  /* First lesson for CTA */
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] p-6 md:p-8">
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#38bdf8]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />

      {/* Back */}
      <Link href="/courses"
        className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors mb-5 group relative z-10">
        <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        กลับไปรายการ Courses
      </Link>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${catCls}`}>{course.category}</span>
        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${lvlCls}`}>{course.level}</span>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08] text-white/30">⏱ {course.duration}</span>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08] text-white/30">{total} Lessons</span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-3xl font-bold text-white/95 mb-3 relative z-10">{course.title}</h1>
      <p className="text-sm text-white/50 leading-relaxed max-w-2xl mb-5 relative z-10">{course.description}</p>

      {/* Role target */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <svg className="w-4 h-4 text-[#38bdf8]/50 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-sm text-white/45">เหมาะสำหรับ: <span className="text-[#38bdf8]/80 font-medium">{course.roleTarget}</span></span>
      </div>

      {/* Progress + CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
        {pct > 0 && (
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <div className="flex justify-between text-xs text-white/35 mb-1.5">
              <span>ความคืบหน้า</span>
              <span className="font-mono">{done}/{total} บทเรียน ({pct}%)</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] transition-all duration-500"
                   style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
        {firstLesson && (
          <Link
            href={`/courses/${course.id}/lessons/${firstLesson.id}`}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                       bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8]
                       hover:bg-[#38bdf8]/25 hover:border-[#38bdf8]/60 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pct > 0 ? "ต่อการเรียน" : "เริ่มเรียน"}
          </Link>
        )}
      </div>
    </div>
  );
}
