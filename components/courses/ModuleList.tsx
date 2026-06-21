import Link from "next/link";
import type { Course, Lesson } from "@/data/courses";

const statusIcon: Record<string, string> = {
  completed:    "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  "in-progress":"M13 10V3L4 14h7v7l9-11h-7z",
  "not-started":"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  locked:       "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
};
const statusColor: Record<string, string> = {
  completed:    "text-[#22c55e]",
  "in-progress":"text-[#38bdf8]",
  "not-started":"text-white/25",
  locked:       "text-white/15",
};
const statusLabel: Record<string, string> = {
  completed:    "เสร็จแล้ว",
  "in-progress":"กำลังเรียน",
  "not-started":"ยังไม่เริ่ม",
  locked:       "ล็อก",
};
const typeIcon: Record<string, string> = {
  lesson: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  lab:    "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  quiz:   "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

function LessonRow({ lesson, courseId, index }: { lesson: Lesson; courseId: string; index: number }) {
  const stColor = statusColor[lesson.status ?? "locked"] ?? "text-white/15";
  const stIcon  = statusIcon[lesson.status  ?? "locked"] ?? statusIcon.locked;
  const stLabel = statusLabel[lesson.status ?? "locked"] ?? "ล็อก";
  const tyIcon  = typeIcon[lesson.type ?? "lesson"] ?? typeIcon.lesson;
  const isLocked = (lesson.status ?? "not-started") === "locked";

  const rowClass = `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 ${
    isLocked
      ? "border-white/[0.04] bg-white/[0.01] opacity-50 cursor-default"
      : lesson.status === "completed"
        ? "border-[#22c55e]/[0.12] bg-[#22c55e]/[0.03] hover:border-[#22c55e]/25 hover:bg-[#22c55e]/[0.06]"
        : lesson.status === "in-progress"
          ? "border-[#38bdf8]/[0.15] bg-[#38bdf8]/[0.04] hover:border-[#38bdf8]/30"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
  }`;

  const inner = (
    <div className={rowClass}>
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono text-white/20 border border-white/[0.08]">
        {index}
      </span>
      <svg className={`w-4 h-4 flex-shrink-0 ${isLocked ? "text-white/10" : "text-white/30"}`}
           fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d={tyIcon} />
      </svg>
      <span className={`flex-1 text-sm leading-snug ${isLocked ? "text-white/20" : "text-white/70"}`}>
        {lesson.title}
      </span>
      <span className={`text-[10px] font-mono flex-shrink-0 ${isLocked ? "text-white/15" : "text-white/30"}`}>
        {lesson.duration}
      </span>
      <span className={`flex items-center gap-1 text-[10px] font-medium flex-shrink-0 ${stColor}`}>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={stIcon} />
        </svg>
        <span className="hidden sm:block">{stLabel}</span>
      </span>
    </div>
  );

  if (isLocked) return <div>{inner}</div>;
  return <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>{inner}</Link>;
}

export default function ModuleList({ course }: { course: Course }) {
  let globalIdx = 0;
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        เนื้อหาบทเรียน
      </h2>
      {course.modules.map((mod) => (
        <div key={mod.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-white/80">{mod.title}</h3>
            <p className="text-xs text-white/35 mt-0.5">{mod.description}</p>
            <p className="text-[10px] text-white/20 font-mono mt-1">{mod.lessons.length} บทเรียน</p>
          </div>
          <div className="p-3 space-y-1.5">
            {mod.lessons.map((lesson) => {
              globalIdx++;
              return <LessonRow key={lesson.id} lesson={lesson} courseId={course.id} index={globalIdx} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
