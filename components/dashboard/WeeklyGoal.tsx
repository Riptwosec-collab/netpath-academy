import { Target, Zap, FlaskConical, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeeklyGoalData } from "@/data/dashboard";

type GoalRowProps = {
  icon:      React.ReactNode;
  label:     string;
  current:   number;
  target:    number;
  color:     string;   // hex
  bgColor:   string;
};

function GoalRow({ icon, label, current, target, color, bgColor }: GoalRowProps) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const done = current >= target;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", bgColor)}>
            {icon}
          </div>
          <span className="text-[12px] text-white/60">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/35">{current}/{target}</span>
          {done && <span className="text-[10px] font-bold text-emerald-400">✓</span>}
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: done ? "#22c55e" : color }}
        />
      </div>
    </div>
  );
}

export default function WeeklyGoal({ goal }: { goal: WeeklyGoalData }) {
  const totalCurrent = goal.currentXp + goal.completedLabs * 100 + goal.completedLessons * 30;
  const totalTarget  = goal.targetXp  + goal.targetLabs  * 100 + goal.targetLessons  * 30;
  const overallPct   = Math.min(100, Math.round((totalCurrent / totalTarget) * 100));

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={15} className="text-cyan-400" />
          <h2 className="text-sm font-bold text-white/80">Weekly Goal</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-[11px] font-bold text-cyan-400">{overallPct}%</span>
          <span className="text-[10px] text-white/30">done</span>
        </div>
      </div>

      {/* Overall ring (simple progress) */}
      <div className="mb-5">
        <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-[10px] text-white/25 mt-1.5">Overall weekly progress</p>
      </div>

      {/* Goal rows */}
      <div className="flex flex-col gap-4">
        <GoalRow
          icon={<Zap size={12} className="text-amber-400" />}
          label="XP Earned"
          current={goal.currentXp}
          target={goal.targetXp}
          color="#f59e0b"
          bgColor="bg-amber-500/10"
        />
        <GoalRow
          icon={<FlaskConical size={12} className="text-violet-400" />}
          label="Labs Completed"
          current={goal.completedLabs}
          target={goal.targetLabs}
          color="#8b5cf6"
          bgColor="bg-violet-500/10"
        />
        <GoalRow
          icon={<BookOpen size={12} className="text-cyan-400" />}
          label="Lessons Done"
          current={goal.completedLessons}
          target={goal.targetLessons}
          color="#38bdf8"
          bgColor="bg-cyan-500/10"
        />
      </div>
    </div>
  );
}
