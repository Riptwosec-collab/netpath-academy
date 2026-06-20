import { notFound }             from "next/navigation";
import { getCourseById, courses, getTotalLessons, getCompletedLessons } from "@/data/courses";
import CourseHeader              from "@/components/courses/CourseHeader";
import ModuleList                from "@/components/courses/ModuleList";
import RelatedLabs               from "@/components/courses/RelatedLabs";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);
  return {
    title:       course ? `${course.title} | NetPath Academy` : "Course Not Found",
    description: course?.description,
  };
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);
  if (!course) notFound();

  const total = getTotalLessons(course);
  const done  = getCompletedLessons(course);

  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-5">
      {/* Hero header */}
      <CourseHeader course={course} />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Module",          value: course.modules.length, color: "#8b5cf6" },
          { label: "บทเรียนทั้งหมด",  value: total,                color: "#38bdf8" },
          { label: "เรียนจบแล้ว",      value: done,                color: "#22c55e" },
          { label: "ความคืบหน้า",      value: `${course.progress}%`, color: "#facc15" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03]">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-white/35 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* About this course */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          เกี่ยวกับ Course นี้
        </h2>
        <p className="text-sm text-white/55 leading-[1.8]">{course.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-xs text-white/40">เหมาะสำหรับ: <span className="text-white/60">{course.roleTarget}</span></p>
        </div>
      </div>

      {/* Module list */}
      <ModuleList course={course} />

      {/* Related labs */}
      <RelatedLabs relatedLabIds={course.relatedLabs} />
    </div>
  );
}
