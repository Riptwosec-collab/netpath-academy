import type { Lesson, ContentSection } from "@/data/courses";

export default function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-4">
      {/* Objectives */}
      {lesson.objectives && lesson.objectives.length > 0 && (
        <div className="rounded-2xl border border-[#38bdf8]/[0.12] bg-[#38bdf8]/[0.03] p-5 md:p-6">
          <h2 className="text-sm font-semibold text-[#38bdf8]/80 flex items-center gap-2 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            วัตถุประสงค์
          </h2>
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[10px] font-bold text-[#38bdf8]/70 mt-0.5">
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content sections */}
      {lesson.content && lesson.content.length > 0 && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6 space-y-6">
          <h2 className="text-sm font-semibold text-white/60 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            เนื้อหา
          </h2>
          {lesson.content.map((section, i) => {
            if (typeof section === "string") {
              return (
                <div key={i} className={i > 0 ? "pt-6 border-t border-white/[0.05]" : ""}>
                  <p className="text-sm text-white/55 leading-[1.8]">{section}</p>
                </div>
              );
            }
            const sec = section as ContentSection;
            return (
              <div key={i} className={i > 0 ? "pt-6 border-t border-white/[0.05]" : ""}>
                <h3 className="text-base font-semibold text-white/85 mb-2">{sec.heading}</h3>
                <p className="text-sm text-white/55 leading-[1.8]">{sec.body}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Diagram */}
      {lesson.diagramText && (
        <div className="rounded-2xl border border-[#8b5cf6]/[0.12] bg-[#8b5cf6]/[0.03] p-5">
          <h2 className="text-sm font-semibold text-[#8b5cf6]/70 flex items-center gap-2 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Diagram
          </h2>
          <div className="overflow-x-auto scrollbar-none">
            <p className="text-sm font-mono text-[#8b5cf6]/70 whitespace-nowrap py-2 px-3 bg-[#8b5cf6]/[0.05] rounded-xl border border-[#8b5cf6]/[0.08]">
              {lesson.diagramText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
