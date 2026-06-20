import { courseProgressData } from "@/data/progress";
import Link from "next/link";

export default function CourseProgressList() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/[0.06]">
        <h2 className="text-xs font-semibold text-white/50">Course Progress</h2>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {courseProgressData.map((c) => (
          <div key={c.id} className="px-5 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-medium text-white/70 truncate">{c.title}</p>
                {c.progress === 100 && (
                  <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#22c55e]">
                    ✓ Done
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.progress}%`,
                      backgroundColor: c.progress === 100 ? "#22c55e" : "#38bdf8",
                    }}
                  />
                </div>
                <span className="text-[10px] text-white/25 flex-shrink-0">
                  {c.completedLessons}/{c.totalLessons}
                </span>
              </div>
            </div>
            <Link href={`/courses/${c.id}`}
              className="flex-shrink-0 text-[10px] text-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors">
              เปิด →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
