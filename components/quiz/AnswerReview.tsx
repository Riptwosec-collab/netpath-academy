import type { QuizQuestion } from "@/data/quizzes";

interface AnswerReviewProps {
  questions:       QuizQuestion[];
  selectedAnswers: (string | null)[];
  onBack:          () => void;
}

export default function AnswerReview({ questions, selectedAnswers, onBack }: AnswerReviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white/80">เฉลยทุกข้อ</h2>
        <button onClick={onBack}
          className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          กลับหน้าผล
        </button>
      </div>

      {questions.map((q, idx) => {
        const chosen  = selectedAnswers[idx];
        const correct = q.correctAnswer;
        const isRight = chosen === correct;

        return (
          <div key={q.id}
               className={`rounded-2xl border overflow-hidden ${
                 isRight
                   ? "border-[#22c55e]/20 bg-[#22c55e]/[0.03]"
                   : "border-[#ef4444]/20 bg-[#ef4444]/[0.03]"
               }`}>
            {/* Header */}
            <div className={`flex items-center gap-2 px-4 py-2.5 border-b text-xs font-medium
                             ${isRight
                               ? "border-[#22c55e]/15 bg-[#22c55e]/[0.05] text-[#22c55e]/80"
                               : "border-[#ef4444]/15 bg-[#ef4444]/[0.05] text-[#ef4444]/80"}`}>
              {isRight ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              ข้อที่ {idx + 1} — {isRight ? "ถูก" : "ผิด"}
            </div>

            <div className="p-4 flex flex-col gap-3">
              {/* Question */}
              <p className="text-sm text-white/80 leading-[1.75]">{q.question}</p>

              {/* Answer comparison */}
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                  <p className="text-white/30 mb-1 text-[10px] uppercase tracking-wide">คำตอบของคุณ</p>
                  <p className={`font-medium ${isRight ? "text-[#22c55e]/90" : "text-[#ef4444]/80"}`}>
                    {chosen ?? <span className="text-white/20 italic">ไม่ได้ตอบ</span>}
                  </p>
                </div>
                <div className="rounded-lg border border-[#22c55e]/15 bg-[#22c55e]/[0.05] p-3">
                  <p className="text-[#22c55e]/40 mb-1 text-[10px] uppercase tracking-wide">คำตอบที่ถูกต้อง</p>
                  <p className="font-medium text-[#22c55e]/90">{correct}</p>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-xs text-white/40 leading-[1.75] border-t border-white/[0.05] pt-3">
                <span className="text-white/20 font-medium">คำอธิบาย: </span>
                {q.explanation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
