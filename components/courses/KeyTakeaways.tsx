import type { Lesson } from "@/data/courses";

export default function KeyTakeaways({ lesson }: { lesson: Lesson }) {
  if (!lesson.keyTakeaways || lesson.keyTakeaways.length === 0) return null;
  return (
    <div className="rounded-2xl border border-[#22c55e]/[0.12] bg-[#22c55e]/[0.02] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-[#22c55e]/80 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Key Takeaways — สิ่งสำคัญที่ต้องจำ
      </h2>
      <div className="space-y-2">
        {lesson.keyTakeaways.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#22c55e]/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-white/60 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
