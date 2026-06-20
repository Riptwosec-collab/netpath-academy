import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContinueCourse } from "@/data/dashboard";

const colorMap = {
  cyan:    { border: "border-cyan-500/20",    bg: "bg-cyan-500/10",    text: "text-cyan-400",    bar: "#38bdf8" },
  violet:  { border: "border-violet-500/20",  bg: "bg-violet-500/10",  text: "text-violet-400",  bar: "#8b5cf6" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", bar: "#22c55e" },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/10",   text: "text-amber-400",   bar: "#f59e0b" },
};

function CourseCard({ course }: { course: ContinueCourse }) {
  const c = colorMap[course.color];
  return (
    <div className={cn(
      "rounded-xl border bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-all duration-200",
      c.border,
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", c.bg)}>
            <BookOpen size={16} className={c.text} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/85 leading-tight">{course.title}</p>
            <p className="text-[11px] text-white/35 mt-0.5">{course.category}</p>
          </div>
        </div>
        <span className={cn("text-xs font-bold flex-shrink-0", c.text)}>{course.progress}%</span>
      </div>

      <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${course.progress}%`, backgroundColor: c.bar }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-white/30 truncate">
          Next: <span className="text-white/50">{course.nextLesson}</span>
        </p>
        <Link
          href={course.href}
          className={cn(
            "flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0",
            "transition-all focus-visible:outline-none focus-visible:ring-2",
            c.bg, c.text,
          )}
        >
          Continue <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

export default function ContinueLearning({ courses }: { courses: ContinueCourse[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white/80">Continue Learning</h2>
        <Link href="/courses" className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          All Courses →
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-sm text-white/30 py-4 text-center">No courses in progress yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
