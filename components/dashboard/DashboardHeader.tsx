import Link from "next/link";
import { Zap, Flame, ArrowRight, Bot } from "lucide-react";
import type { UserDashboard } from "@/data/dashboard";

export default function DashboardHeader({ user }: { user: UserDashboard }) {
  const xpPct = Math.round((user.xp / user.nextLevelXp) * 100);

  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl overflow-hidden px-6 py-6">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/8 blur-[80px]" />
        <div className="absolute -bottom-10 right-10 w-48 h-48 rounded-full bg-violet-500/8 blur-[60px]" />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: welcome */}
        <div className="flex-1">
          {/* Streak pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 mb-3">
            <Flame size={12} className="text-amber-400" />
            <span className="text-[11px] font-bold text-amber-400">{user.streak} Day Streak</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {user.name}
            </span>
          </h1>
          <p className="text-sm text-white/45 max-w-lg">
            ตอนนี้คุณอยู่ระดับ{" "}
            <span className="text-cyan-400 font-medium">{user.skillLevel}</span>
            {" "}— เรียนต่อจาก VLAN &amp; Trunk หรือทำ Lab ที่แนะนำเพื่ออัปสกิลต่อ
          </p>

          {/* XP bar */}
          <div className="mt-4 max-w-xs">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-white/35">XP Progress · Level {user.level}</span>
              <span className="text-[11px] font-semibold text-cyan-400">
                {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-2 bg-white/[0.07] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-700"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="text-[10px] text-white/25 mt-1">{xpPct}% to next level</p>
          </div>
        </div>

        {/* Right: badges + CTAs */}
        <div className="flex flex-col items-start md:items-end gap-3">
          {/* XP badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Zap size={13} className="text-cyan-400" />
              <span className="text-sm font-bold text-cyan-400">{user.xp.toLocaleString()} XP</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <span className="text-sm font-bold text-violet-400">Lv.{user.level}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/courses"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            >
              Continue Learning
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/ai-tutor"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/30 text-violet-400 text-sm font-semibold hover:border-violet-400/50 hover:bg-violet-500/8 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
            >
              <Bot size={14} />
              Ask AI Tutor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
