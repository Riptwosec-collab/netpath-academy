import Link from "next/link";
import { CheckCircle2, CircleDot, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { skillLevelPath } from "@/data/dashboard";

type Props = {
  currentLevel: string;
  xp:           number;
  nextLevelXp:  number;
};

const levelColors: Record<number, { active: string; done: string }> = {
  0: { active: "text-slate-300  border-slate-400/30  bg-slate-400/8",  done: "text-slate-300  bg-slate-400/10" },
  1: { active: "text-cyan-400   border-cyan-400/30   bg-cyan-500/8",   done: "text-cyan-400   bg-cyan-500/10"  },
  2: { active: "text-cyan-400   border-cyan-400/30   bg-cyan-500/8",   done: "text-cyan-400   bg-cyan-500/10"  },
  3: { active: "text-violet-400 border-violet-400/30 bg-violet-500/8", done: "text-violet-400 bg-violet-500/10"},
  4: { active: "text-violet-400 border-violet-400/30 bg-violet-500/8", done: "text-violet-400 bg-violet-500/10"},
  5: { active: "text-amber-400  border-amber-400/30  bg-amber-500/8",  done: "text-amber-400  bg-amber-500/10" },
  6: { active: "text-rose-400   border-rose-400/30   bg-rose-500/8",   done: "text-rose-400   bg-rose-500/10"  },
};

export default function SkillLevelPanel({ currentLevel, xp, nextLevelXp }: Props) {
  const currentIndex = skillLevelPath.findIndex((l) => l === currentLevel);
  const xpPct = Math.round((xp / nextLevelXp) * 100);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white/80">Skill Level Path</h2>
        <Link href="/roadmap" className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          View Roadmap →
        </Link>
      </div>

      {/* Level list */}
      <div className="flex flex-col gap-1.5 mb-5">
        {skillLevelPath.map((level, i) => {
          const isDone    = i < currentIndex;
          const isActive  = i === currentIndex;
          const isLocked  = i > currentIndex;
          const c = levelColors[i] ?? levelColors[1];

          return (
            <div
              key={level}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all",
                isActive
                  ? `border ${c.active}`
                  : isDone
                    ? "border-transparent bg-white/[0.02]"
                    : "border-transparent opacity-40",
              )}
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {isDone   && <CheckCircle2 size={14} className="text-emerald-400" />}
                {isActive && <CircleDot    size={14} className={c.active.split(" ")[0]} />}
                {isLocked && <Lock         size={14} className="text-white/20" />}
              </div>

              <span className={cn(
                "text-[13px] font-medium flex-1",
                isDone   ? "text-white/40 line-through" : "",
                isActive ? c.active.split(" ")[0] : "",
                isLocked ? "text-white/20" : "",
              )}>
                {level}
              </span>

              {isActive && (
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                  c.active,
                )}>
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* XP to next level */}
      {currentIndex < skillLevelPath.length - 1 && (
        <div className="pt-3 border-t border-white/[0.06]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-white/35">Next: {skillLevelPath[currentIndex + 1]}</span>
            <span className="text-[11px] font-semibold text-cyan-400">{xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_6px_rgba(56,189,248,0.4)]"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <p className="text-[10px] text-white/20 mt-1">{xpPct}% to next level</p>
        </div>
      )}
    </div>
  );
}
