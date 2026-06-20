import { userProgress } from "@/data/progress";

export default function ProgressOverview() {
  const stats = [
    {
      label: "Courses Completed",
      value: `${userProgress.completedCourses}/${userProgress.totalCourses}`,
      pct: Math.round((userProgress.completedCourses / userProgress.totalCourses) * 100),
      color: "#38bdf8",
    },
    {
      label: "Labs Completed",
      value: `${userProgress.completedLabs}/${userProgress.totalLabs}`,
      pct: Math.round((userProgress.completedLabs / userProgress.totalLabs) * 100),
      color: "#8b5cf6",
    },
    {
      label: "Quizzes Passed",
      value: `${userProgress.completedQuizzes}/${userProgress.totalQuizzes}`,
      pct: Math.round((userProgress.completedQuizzes / userProgress.totalQuizzes) * 100),
      color: "#22c55e",
    },
    {
      label: "Badges Earned",
      value: `${userProgress.totalBadges}/10`,
      pct: Math.round((userProgress.totalBadges / 10) * 100),
      color: "#facc15",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
          style={{ borderColor: `${s.color}20` }}
        >
          <p className="text-xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</p>
          <p className="text-[10px] text-white/35 mb-2">{s.label}</p>
          <div className="w-full h-1 bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${s.pct}%`, backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}60` }}
            />
          </div>
          <p className="text-[10px] text-white/25 mt-1">{s.pct}%</p>
        </div>
      ))}
    </div>
  );
}
