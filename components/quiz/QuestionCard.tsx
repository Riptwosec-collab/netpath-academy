import type { QuizQuestion } from "@/data/quizzes";
import QuizOption from "./QuizOption";

const diffColor: Record<string, string> = {
  Easy:   "border-[#22c55e]/25 bg-[#22c55e]/8 text-[#22c55e]/80",
  Medium: "border-[#facc15]/25 bg-[#facc15]/8 text-[#facc15]/80",
  Hard:   "border-[#ef4444]/25 bg-[#ef4444]/8 text-[#ef4444]/80",
};

interface QuestionCardProps {
  question:        QuizQuestion;
  selectedAnswer:  string | null;
  showExplanation: boolean;
  onSelect:        (answer: string) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  onSelect,
}: QuestionCardProps) {
  const answered = showExplanation;

  function getOptionState(opt: string) {
    if (!answered) {
      return selectedAnswer === opt ? "selected" : "default";
    }
    if (opt === question.correctAnswer) return "correct";
    if (opt === selectedAnswer && opt !== question.correctAnswer) return "incorrect";
    return "default";
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      {/* Question area */}
      <div className="p-5 md:p-6 border-b border-white/[0.05]">
        <div className="flex items-start gap-3">
          {/* Type badge */}
          <span className="flex-shrink-0 text-[9px] font-mono font-medium px-2 py-0.5 rounded-md
                           border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 text-[#8b5cf6]/70 mt-0.5">
            {question.type === "true-false" ? "T/F" : "MCQ"}
          </span>
          <p className="text-sm md:text-base font-medium text-white/90 leading-[1.75]">
            {question.question}
          </p>
        </div>
        {/* Difficulty */}
        <div className="mt-3 flex">
          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${diffColor[question.difficulty] ?? ""}`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="p-5 md:p-6 flex flex-col gap-2.5">
        {question.options.map((opt, i) => (
          <QuizOption
            key={opt}
            label={opt}
            index={i}
            state={getOptionState(opt)}
            disabled={answered}
            onSelect={() => onSelect(opt)}
          />
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mx-5 mb-5 md:mx-6 md:mb-6 rounded-xl border p-4 text-sm leading-[1.75]
                         ${selectedAnswer === question.correctAnswer
                           ? "border-[#22c55e]/25 bg-[#22c55e]/[0.05] text-[#22c55e]/80"
                           : "border-[#ef4444]/25 bg-[#ef4444]/[0.05] text-[#ef4444]/80"}`}>
          <p className="font-semibold mb-1 text-[11px] uppercase tracking-wide opacity-70">
            {selectedAnswer === question.correctAnswer ? "✓ ถูกต้อง!" : "✗ ผิด — คำตอบที่ถูกต้อง:"}
          </p>
          {selectedAnswer !== question.correctAnswer && (
            <p className="font-medium mb-2 text-white/70">{question.correctAnswer}</p>
          )}
          <p className="opacity-90">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
