import type { Lesson } from "@/data/courses";

export default function CommonMistakes({ lesson }: { lesson: Lesson }) {
  if (!lesson.commonMistakes || lesson.commonMistakes.length === 0) return null;
  return (
    <div className="rounded-2xl border border-[#facc15]/[0.12] bg-[#facc15]/[0.02] p-5 md:p-6">
      <h2 className="text-sm font-semibold text-[#facc15]/80 flex items-center gap-2 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        ข้อผิดพลาดที่พบบ่อย
      </h2>
      <div className="space-y-2.5">
        {lesson.commonMistakes.map((mistake, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#facc15]/[0.04] border border-[#facc15]/[0.08]">
            <svg className="w-4 h-4 text-[#facc15]/50 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm text-white/55 leading-relaxed">{mistake}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
