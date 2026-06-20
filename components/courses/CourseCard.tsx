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

export default function CourseCard({ course }: { course: Course }) {
  const lvlCls = levelColor[course.level]       ?? "text-white/50 bg-white/5 border-white/10";
  const catCls = categoryColor[course.category] ?? "text-white/50 bg-white/5 border-white/10";
  const total  = getTotalLessons(course);
  const done   = getCompletedLessons(course);
  const pct    = course.progress;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group relative flex flex-col gap-3 p-5 rounded-xl
                 bg-white/[0.03] border border-white/[0.07]
                 hover:border-[#38bdf8]/30 hover:bg-white/[0.05]
                 transition-all duration-200"
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-[#38bdf8]/[0.03] to-[#8b5cf6]/[0.03] pointer-events-none" />

      <div className="flex items-center justify-between gap-2 relative z-10">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${catCls}`}>{course.category}</span>
        <span className="text-[10px] font-mono text-white/25">{course.duration}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">{course.title}</h3>
        <p className="text-xs text-white/35 mt-1.5 leading-relaxed line-clamp-2">{course.description}</p>
      </div>

      <div className="flex items-center gap-1.5 relative z-10">
        <svg className="w-3 h-3 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px] text-white/30 truncate">{course.roleTarget}</span>
      </div>

      <div className="flex items-center gap-3 relative z-10 text-[10px] text-white/25 font-mono">
        <span>{course.modules.length} Module</span>
        <span className="text-white/10">·</span>
        <span>{total} Lessons</span>
        {done > 0 && (<><span className="text-white/10">·</span><span className="text-[#22c55e]/60">{done} เสร็จ</span></>)}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1.5">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${lvlCls}`}>{course.level}</span>
          {pct > 0 && <span className="text-[10px] text-white/35 font-mono">{pct}%</span>}
        </div>
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          {pct > 0 && (
            <div className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6]" style={{ width: `${pct}%` }} />
          )}
        </div>
      </div>

      <div className="relative z-10 pt-1 border-t border-white/[0.05]">
        <span className="flex items-center gap-1.5 text-xs text-[#38bdf8]/60 group-hover:text-[#38bdf8] transition-colors font-medium">
          {pct > 0 ? "ต่อการเรียน" : "เริ่มเรียน"}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {pct > 0 && pct < 100 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6]" />
      )}
      {pct === 100 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-[#22c55e] to-[#38bdf8]" />
      )}
    </Link>
  );
}
