import type { UserBadge } from "@/data/progress";

export default function BadgeCard({ badge }: { badge: UserBadge }) {
  const isEarned = badge.status === "earned";
  const isInProgress = badge.status === "in-progress";
  const isLocked = badge.status === "locked";

  return (
    <div className={`relative rounded-2xl border p-4 flex flex-col items-center text-center gap-2 transition-all ${
      isEarned
        ? "border-current bg-current/5 shadow-[0_0_12px_currentColor/10]"
        : isInProgress
        ? "border-white/[0.08] bg-white/[0.03]"
        : "border-white/[0.05] bg-white/[0.02] opacity-50"
    }`}
    style={isEarned || isInProgress ? { borderColor: `${badge.color}30`, backgroundColor: `${badge.color}06` } : {}}>

      {/* Earned glow */}
      {isEarned && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 20px ${badge.color}15` }} />
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
        isEarned ? "" : "opacity-40"
      }`}
      style={{ borderColor: `${badge.color}30`, backgroundColor: `${badge.color}15` }}>
        <svg className="w-6 h-6" style={{ color: isEarned ? badge.color : "#ffffff40" }}
             fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
        </svg>
      </div>

      {/* Status */}
      <div>
        {isEarned && (
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${badge.color}20`, color: badge.color }}>
            ✓ Earned
          </span>
        )}
        {isInProgress && (
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.07] text-white/40">
            In Progress
          </span>
        )}
        {isLocked && (
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] text-white/20">
            🔒 Locked
          </span>
        )}
      </div>

      <p className={`text-xs font-semibold ${isEarned ? "text-white/85" : isInProgress ? "text-white/50" : "text-white/20"}`}>
        {badge.title}
      </p>
      <p className="text-[10px] text-white/25 leading-snug line-clamp-2">{badge.description}</p>

      {/* In-progress bar */}
      {isInProgress && badge.progress !== undefined && (
        <div className="w-full mt-1">
          <div className="w-full h-1 bg-white/[0.07] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all"
              style={{ width: `${badge.progress}%`, backgroundColor: badge.color }} />
          </div>
          <p className="text-[9px] text-white/20 mt-0.5">{badge.progress}%</p>
        </div>
      )}

      {/* XP reward */}
      <p className="text-[10px]" style={{ color: `${badge.color}70` }}>+{badge.xpReward} XP</p>

      {isEarned && badge.earnedAt && (
        <p className="text-[9px] text-white/15">{badge.earnedAt}</p>
      )}
    </div>
  );
}
