import { userProgress } from "@/data/progress";

function GoalBar({ label, current, target, color }: { label: string; current: number; target: number; color: string }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-1">
        <span className="text-white/40">{label}</span>
        <span style={{ color }}>{current}/{target}</span>
      </div>
      <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function WeeklyGoal() {
  const { weeklyGoal } = userProgress;
  const overallPct = Math.round(
    ((weeklyGoal.currentXp / weeklyGoal.targetXp) + (weeklyGoal.completedLabs / weeklyGoal.targetLabs) + (weeklyGoal.completedLessons / weeklyGoal.targetLessons)) / 3 * 100
  );

  return (
    <div className="rounded-2xl border border-[#38bdf8]/15 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-white/50 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-[#38bdf8]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          เป้าหมายสัปดาห์นี้
        </h2>
        <span className="text-[10px] text-white/25">เหลือ {weeklyGoal.daysLeft} วัน</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        {/* Ring */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="28" cy="28" r="22" fill="none" stroke="#38bdf8" strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - overallPct / 100)}`}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(56,189,248,0.4))" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-[#38bdf8]">{overallPct}%</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <GoalBar label="XP"      current={weeklyGoal.currentXp}        target={weeklyGoal.targetXp}        color="#38bdf8" />
          <GoalBar label="Labs"    current={weeklyGoal.completedLabs}     target={weeklyGoal.targetLabs}      color="#8b5cf6" />
          <GoalBar label="Lessons" current={weeklyGoal.completedLessons}  target={weeklyGoal.targetLessons}   color="#22c55e" />
        </div>
      </div>
    </div>
  );
}
