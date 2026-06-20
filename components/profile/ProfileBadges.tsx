type BadgeEntry = {
  id: string;
  earnedAt: Date;
  badge: { id: string; title: string; description: string; icon: string; xpReward: number };
};

export default function ProfileBadges({ badges }: { badges: BadgeEntry[] }) {
  if (badges.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center">
        <p className="text-sm text-white/25">ยังไม่มี Badge</p>
        <p className="text-xs text-white/15 mt-1">ทำ Lab, Quiz และ Course เพื่อรับ Badge แรก</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-xs font-semibold text-white/50 mb-4">Badges ({badges.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map(({ id, earnedAt, badge }) => (
          <div key={id}
            className="rounded-xl border border-[#38bdf8]/15 bg-[#38bdf8]/[0.04] p-3 flex flex-col items-center gap-1.5 text-center">
            <span className="text-2xl">{badge.icon}</span>
            <p className="text-[10px] font-semibold text-white/75">{badge.title}</p>
            <p className="text-[9px] text-white/30 leading-tight">{badge.description}</p>
            <span className="text-[9px] text-[#38bdf8]/50 font-mono">+{badge.xpReward} XP</span>
            <span className="text-[8px] text-white/15">
              {new Date(earnedAt).toLocaleDateString("th-TH")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
