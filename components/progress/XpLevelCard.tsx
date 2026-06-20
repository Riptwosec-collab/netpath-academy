import { userProgress, SKILL_PATH } from "@/data/progress";

export default function XpLevelCard() {
  const current = SKILL_PATH.find((s) => s.level === userProgress.level) ?? SKILL_PATH[0];
  const next    = SKILL_PATH.find((s) => s.level === userProgress.level + 1);
  const xpInLevel = userProgress.currentXp - current.minXp;
  const xpNeeded  = current.maxXp - current.minXp;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  const remaining = current.maxXp - userProgress.currentXp;

  return (
    <div className="relative rounded-2xl border border-[#38bdf8]/20 bg-[#38bdf8]/[0.04] overflow-hidden p-5">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Level {userProgress.level}</p>
            <p className="text-base font-bold text-white/90">{userProgress.skillLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#38bdf8]">{userProgress.currentXp.toLocaleString()}</p>
            <p className="text-[10px] text-white/30">XP สะสม</p>
          </div>
        </div>

        {/* XP bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
            <span>{current.minXp.toLocaleString()} XP</span>
            <span>{current.maxXp.toLocaleString()} XP</span>
          </div>
          <div className="w-full h-2.5 bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] transition-all"
              style={{ width: `${pct}%`, boxShadow: "0 0 8px rgba(56,189,248,0.5)" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#38bdf8]/70 font-medium">{pct}% ของ Level นี้</span>
            <span className="text-[10px] text-white/25">อีก {remaining.toLocaleString()} XP</span>
          </div>
        </div>

        {next && (
          <p className="text-[10px] text-white/25">
            Level ถัดไป: <span className="text-white/45">{next.title}</span>
          </p>
        )}
      </div>
    </div>
  );
}
