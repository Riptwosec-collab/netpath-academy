"use client";

import { useState, useMemo } from "react";
import { Map, CheckCircle2, CircleDot, Lock, Search } from "lucide-react";
import LevelCard from "@/components/roadmap/LevelCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { roadmap } from "@/data/roadmap";
import type { LevelStatus } from "@/data/roadmap";

// Mock progress per level
const progressMap: Record<number, number> = {
  1: 100, 2: 65, 3: 35, 4: 10, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
};

type Filter = "all" | LevelStatus;

export default function RoadmapPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => roadmap.filter((item) => {
    const matchFilter = filter === "all" || item.status === filter;
    const q = search.toLowerCase();
    const title = (lang === "th" ? item.titleTh : item.title).toLowerCase();
    const matchSearch = !q || title.includes(q) || item.skills.some((s) => s.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  }), [filter, search, lang]);

  const counts = {
    all:          roadmap.length,
    completed:    roadmap.filter((l) => l.status === "completed").length,
    "in-progress":roadmap.filter((l) => l.status === "in-progress").length,
    locked:       roadmap.filter((l) => l.status === "locked").length,
  };

  const filters: { key: Filter; label: () => string; icon: React.ReactNode }[] = [
    { key: "all",          label: () => t("roadmap.filter.all"),  icon: <Map         size={13} /> },
    { key: "completed",    label: () => t("roadmap.filter.done"), icon: <CheckCircle2 size={13} className="text-emerald-400" /> },
    { key: "in-progress",  label: () => t("roadmap.filter.wip"),  icon: <CircleDot   size={13} className="text-cyan-400"    /> },
    { key: "locked",       label: () => t("roadmap.filter.lock"), icon: <Lock        size={13} className="text-white/30"    /> },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl px-6 py-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-violet-500/8 blur-[80px]" />
          <div className="absolute -bottom-10 right-10 w-44 h-44 rounded-full bg-cyan-500/8 blur-[60px]" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/20 bg-violet-500/5 text-violet-400 text-[11px] font-bold mb-3">
              <Map size={12} /> Network Engineer Roadmap
            </div>
            <h1 className="text-2xl font-bold text-white">{t("roadmap.title")}</h1>
            <p className="text-sm text-white/40 mt-1 max-w-lg">{t("roadmap.subtitle")}</p>
          </div>
          {/* Level summary */}
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{counts.completed}</p>
              <p className="text-[10px] text-white/30">{t("common.completed")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{counts["in-progress"]}</p>
              <p className="text-[10px] text-white/30">{t("common.inProgress")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white/30">{counts.locked}</p>
              <p className="text-[10px] text-white/30">{t("common.locked")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters + Search ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${
                filter === key
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                  : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {icon} {label()}
              <span className="text-[10px] opacity-60 ml-0.5">({counts[key] ?? 0})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/30 text-xs w-full sm:w-48">
          <Search size={13} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "th" ? "ค้นหา level / skill..." : "Search levels / skills..."}
            className="bg-transparent outline-none text-white/70 placeholder:text-white/25 flex-1 min-w-0"
          />
        </div>
      </div>

      {/* ── Level cards ────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">{t("roadmap.empty")}</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <LevelCard key={item.level} item={item} progress={progressMap[item.level] ?? 0} />
          ))}
        </div>
      )}
    </div>
  );
}
