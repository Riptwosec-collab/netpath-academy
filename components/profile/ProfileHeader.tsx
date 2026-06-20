import type { UserRole } from "@prisma/client";

type Props = {
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  xp: number;
  level: number;
  skillLevel: string;
  createdAt: string;
};

const SKILL_PATH = [
  { level: 1, title: "Network Beginner",          minXp: 0,     maxXp: 500   },
  { level: 2, title: "Helpdesk Network Ready",    minXp: 500,   maxXp: 1200  },
  { level: 3, title: "Junior Network Engineer",   minXp: 1200,  maxXp: 3000  },
  { level: 4, title: "Network Engineer",          minXp: 3000,  maxXp: 6000  },
  { level: 5, title: "Advanced Network Engineer", minXp: 6000,  maxXp: 10000 },
  { level: 6, title: "Senior Network Engineer",   minXp: 10000, maxXp: 16000 },
  { level: 7, title: "Network Architect",         minXp: 16000, maxXp: 25000 },
];

export default function ProfileHeader({ name, email, image, role, xp, level, skillLevel, createdAt }: Props) {
  const current = SKILL_PATH.find((s) => s.level === level) ?? SKILL_PATH[0];
  const pct = Math.min(100, Math.round(((xp - current.minXp) / (current.maxXp - current.minXp)) * 100));
  const initials = (name ?? email).slice(0, 2).toUpperCase();

  return (
    <div className="relative rounded-2xl border border-[#38bdf8]/15 bg-[#38bdf8]/[0.03] overflow-hidden p-5 md:p-6">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#38bdf8]/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#8b5cf6]/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Avatar */}
        {image ? (
          <img src={image} alt={name ?? "User"} className="w-14 h-14 rounded-full border-2 border-cyan-500/40" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/60 to-violet-500/60 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
            {initials}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-lg font-bold text-white/95">{name ?? "Anonymous"}</h1>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
              role === "ADMIN"
                ? "text-amber-400 border-amber-400/35 bg-amber-400/10"
                : "text-cyan-400/70 border-cyan-400/25 bg-cyan-400/08"
            }`}>
              {role}
            </span>
          </div>
          <p className="text-xs text-white/40">{email}</p>
          <p className="text-xs text-white/25 mt-0.5">สมาชิกตั้งแต่ {new Date(createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "long" })}</p>

          {/* XP bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#38bdf8]/70 font-semibold">Lv.{level} — {skillLevel}</span>
              <span className="text-[10px] text-white/30 font-mono">{xp.toLocaleString()} XP</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
                   style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[9px] text-white/20">{current.minXp.toLocaleString()}</span>
              <span className="text-[9px] text-white/20">{current.maxXp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
