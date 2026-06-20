import Link from "next/link";
import { CheckCircle, XCircle, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizScore } from "@/data/dashboard";

function ScoreRow({ quiz }: { quiz: QuizScore }) {
  const passed = quiz.status === "passed";
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/[0.05] last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
          passed ? "bg-emerald-500/10" : "bg-rose-500/10",
        )}>
          {passed
            ? <CheckCircle size={14} className="text-emerald-400" />
            : <XCircle    size={14} className="text-rose-400"    />}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-white/75 truncate">{quiz.title}</p>
          <p className="text-[10px] text-white/30 mt-0.5">
            Passing: {quiz.passingScore}%
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 text-right">
        <p className={cn("text-sm font-bold", passed ? "text-emerald-400" : "text-rose-400")}>
          {quiz.score}%
        </p>
        <p className={cn("text-[10px] font-semibold", passed ? "text-emerald-400/60" : "text-rose-400/60")}>
          {passed ? "Passed" : "Failed"}
        </p>
      </div>
    </div>
  );
}

export default function LatestQuizScores({ scores }: { scores: QuizScore[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain size={15} className="text-emerald-400" />
          <h2 className="text-sm font-bold text-white/80">Latest Quiz Scores</h2>
        </div>
        <Link href="/quiz" className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
          All Quizzes →
        </Link>
      </div>

      {scores.length === 0 ? (
        <p className="text-sm text-white/30 py-4 text-center">No quiz scores yet.</p>
      ) : (
        <div>
          {scores.map((s) => <ScoreRow key={s.id} quiz={s} />)}
        </div>
      )}
    </div>
  );
}
