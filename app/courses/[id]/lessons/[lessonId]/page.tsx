import { notFound }         from "next/navigation";
import Link                  from "next/link";
import { getLessonById, courses, getCourseById } from "@/data/courses";
import LessonContent         from "@/components/courses/LessonContent";
import CommandExample        from "@/components/courses/CommandExample";
import CommonMistakes        from "@/components/courses/CommonMistakes";
import KeyTakeaways          from "@/components/courses/KeyTakeaways";
import LessonSummary         from "@/components/courses/LessonSummary";
import LessonNavigation      from "@/components/courses/LessonNavigation";
import RelatedLabs           from "@/components/courses/RelatedLabs";
import MarkCompleteButton    from "@/components/courses/MarkCompleteButton";

/* ── Static params ───────────────────────────────────────────────── */
export function generateStaticParams() {
  const params: { id: string; lessonId: string }[] = [];
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        params.push({ id: course.id, lessonId: lesson.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  const result = getLessonById(params.id, params.lessonId);
  return {
    title:       result ? `${result.lesson.title} | ${result.course.title}` : "Lesson Not Found",
    description: result?.lesson.summary,
  };
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function LessonDetailPage({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  const result = getLessonById(params.id, params.lessonId);
  if (!result) notFound();

  const { lesson, course } = result;

  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-5">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/30 flex-wrap">
        <Link href="/courses" className="hover:text-white/60 transition-colors">Courses</Link>
        <svg className="w-3 h-3 text-white/15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/courses/${course.id}`} className="hover:text-white/60 transition-colors">{course.title}</Link>
        <svg className="w-3 h-3 text-white/15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-white/50 truncate max-w-[200px]">{lesson.title}</span>
      </div>

      {/* Lesson header */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] p-5 md:p-6">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#38bdf8]/5 blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center gap-2 mb-3 relative z-10">
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#38bdf8]/80">
            {course.category}
          </span>
          <span className="text-[10px] font-mono text-white/25 px-2.5 py-1 rounded-full border border-white/[0.07]">
            ⏱ {lesson.duration}
          </span>
          {lesson.status === "completed" && (
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 text-[#22c55e]/80">
              ✓ เรียนจบแล้ว
            </span>
          )}
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white/95 relative z-10">{lesson.title}</h1>
      </div>

      {/* Main content */}
      <LessonContent lesson={lesson} />

      {/* Commands */}
      <CommandExample lesson={lesson} />

      {/* Common mistakes */}
      <CommonMistakes lesson={lesson} />

      {/* Key takeaways */}
      <KeyTakeaways lesson={lesson} />

      {/* Summary */}
      <LessonSummary lesson={lesson} />

      {/* Related labs */}
      {course.relatedLabs.length > 0 && (
        <RelatedLabs relatedLabIds={course.relatedLabs} />
      )}

      {/* Mark complete */}
      <MarkCompleteButton lessonId={lesson.id} />

      {/* Navigation */}
      <LessonNavigation lesson={lesson} courseId={course.id} />
    </div>
  );
}
