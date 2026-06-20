type LabSub = { id: string; status: string; completedAt: Date | null; lab: { title: string; category: string } };
type QuizSc = { id: string; score: number; passed: boolean; createdAt: Date; quiz: { title: string; passingScore: number } };

type Props = {
  labSubmissions: LabSub[];
  quizScores:     QuizSc[];
};

const statusColor = { COMPLETED: "#22c55e", IN_PROGRESS: "#facc15", NOT_STARTED: "#64748b" };
const statusLabel = { COMPLETED: "สำเร็จ", IN_PROGRESS: "กำลังทำ", NOT_STARTED: "ยังไม่เริ่ม" };

export default function ProfileProgress({ labSubmissions, quizScores }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Labs */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="text-xs font-semibold text-white/50 mb-3">Lab Progress ({labSubmissions.length})</h2>
        {labSubmissions.length === 0 ? (
          <p className="text-xs text-white/25 py-4 text-center">ยังไม่มี Lab ที่ทำ</p>
        ) : (
          <div className="space-y-2">
            {labSubmissions.slice(0, 8).map((s) => {
              const color = statusColor[s.status as keyof typeof statusColor] ?? "#64748b";
              return (
                <div key={s.id} className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/65 truncate">{s.lab.title}</p>
                    <p className="text-[9px] text-white/25">{s.lab.category}</p>
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                    {statusLabel[s.status as keyof typeof statusLabel] ?? s.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quizzes */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="text-xs font-semibold text-white/50 mb-3">Quiz Scores ({quizScores.length})</h2>
        {quizScores.length === 0 ? (
          <p className="text-xs text-white/25 py-4 text-center">ยังไม่มี Quiz ที่ทำ</p>
        ) : (
          <div className="space-y-2">
            {quizScores.slice(0, 8).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/65 truncate">{s.quiz.title}</p>
                  <p className="text-[9px] text-white/25">Passing: {s.quiz.passingScore}%</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-sm font-mono font-bold" style={{ color: s.passed ? "#22c55e" : "#ef4444" }}>
                    {s.score}%
                  </span>
                  <span className="text-[9px]">{s.passed ? "✓" : "✗"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
