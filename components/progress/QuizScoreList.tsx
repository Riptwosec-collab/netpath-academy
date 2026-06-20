import { quizScoreData } from "@/data/progress";
import Link from "next/link";

export default function QuizScoreList() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
        <h2 className="text-xs font-semibold text-white/50">Quiz Scores</h2>
        <span className="text-[10px] text-white/25">
          {quizScoreData.filter((q) => q.status === "passed").length}/{quizScoreData.length} Passed
        </span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {quizScoreData.map((q) => {
          const pct = Math.round((q.score / q.totalQuestions) * 100);
          return (
            <div key={q.id} className="px-5 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/65 truncate">{q.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 max-w-[100px] h-1 bg-white/[0.07] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: q.status === "passed" ? "#22c55e" : "#ef4444",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-white/30">{q.score}/{q.totalQuestions}</span>
                  <span className="text-[9px] text-white/20">{q.completedAt}</span>
                </div>
              </div>
              <span className={`flex-shrink-0 text-[9px] px-2 py-0.5 rounded-full font-medium ${
                q.status === "passed"
                  ? "bg-[#22c55e]/15 text-[#22c55e]"
                  : "bg-[#ef4444]/15 text-[#ef4444]"
              }`}>
                {q.status === "passed" ? "✓ Passed" : "✗ Failed"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 border-t border-white/[0.05]">
        <Link href="/quiz" className="text-[10px] text-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors">
          ทำ Quiz เพิ่มเติม →
        </Link>
      </div>
    </div>
  );
}
