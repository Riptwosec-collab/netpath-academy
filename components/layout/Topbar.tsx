"use client";

import { Search, Bell, Zap } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface TopbarProps {
  title?:    string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { t } = useLanguage();
  const displayTitle = title ?? t("dashboard.welcome");

  return (
    <header className="h-14 flex-shrink-0 border-b border-white/[0.07] flex items-center gap-3 px-4 md:px-6 bg-[#050816]/70 backdrop-blur-xl">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-white/90 truncate">{displayTitle}</h1>
        {subtitle && (
          <p className="text-xs text-white/35 hidden sm:block">{subtitle}</p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-2.5">
        {/* Search (desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/30 text-xs w-40 cursor-pointer hover:border-white/20 transition-colors">
          <Search size={12} />
          <span>{t("common.search")}</span>
        </div>

        {/* Language Toggle */}
        <LanguageToggle />

        {/* XP badge */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          <Zap size={11} className="text-amber-400" />
          <span className="text-[10px] font-bold text-amber-400">420 {t("common.xp")}</span>
        </div>

        {/* Level badge */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
          <span className="text-[10px] font-bold text-violet-400">Lv.3</span>
        </div>

        {/* Notification bell */}
        <button
          aria-label={t("common.info")}
          className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.08] transition-all"
        >
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(56,189,248,0.8)]" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:border-cyan-400/70 transition-colors select-none">
            NL
          </div>
          <div className="hidden xl:block leading-none">
            <p className="text-xs font-semibold text-white/80">Network Learner</p>
            <p className="text-[10px] text-white/35 mt-0.5">Junior Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
