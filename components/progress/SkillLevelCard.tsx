import { userProgress, SKILL_PATH } from "@/data/progress";

export default function SkillLevelCard() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-xs font-semibold text-white/50 mb-4 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-[#8b5cf6]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        เส้นทาง Skill Level
      </h2>
      <div className="flex flex-col gap-2">
        {SKILL_PATH.map((step, i) => {
          const isActive   = step.level === userProgress.level;
          const isComplete = step.level < userProgress.level;
          const isLocked   = step.level > userProgress.level;
          return (
            <div key={step.level} className="flex items-center gap-3">
              {/* Connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                  isComplete ? "border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]"
                  : isActive  ? "border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                              : "border-white/[0.12] bg-white/[0.03] text-white/20"
                }`}>
                  {isComplete ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.level}
                </div>
                {i < SKILL_PATH.length - 1 && (
                  <div className={`w-0.5 h-4 mt-0.5 ${isComplete ? "bg-[#22c55e]/30" : "bg-white/[0.06]"}`} />
                )}
              </div>
              {/* Label */}
              <div className="flex-1 pb-2">
                <p className={`text-xs font-medium ${
                  isActive ? "text-[#38bdf8]" : isComplete ? "text-white/60" : "text-white/20"
                }`}>
                  {step.title}
                  {isActive && <span className="ml-2 text-[10px] bg-[#38bdf8]/15 text-[#38bdf8] px-1.5 py-0.5 rounded-full">ระดับปัจจุบัน</span>}
                </p>
                <p className="text-[10px] text-white/20">{step.minXp.toLocaleString()} – {step.maxXp.toLocaleString()} XP</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
