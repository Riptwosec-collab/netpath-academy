"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Search } from "lucide-react";
import {
  troubleshootingGuides,
  guideStats,
  guideCategories,
} from "@/data/troubleshooting";
import TroubleshootingCard from "@/components/troubleshooting/TroubleshootingCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TroubleshootingSeverity, TroubleshootingLevel } from "@/data/troubleshooting";

const SEVERITIES: (TroubleshootingSeverity | "All")[] = ["All", "Critical", "High", "Medium", "Low"];
const LEVELS:     (TroubleshootingLevel    | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

const severityColor: Record<string, string> = {
  Critical: "text-rose-400   border-rose-500/40   bg-rose-500/10",
  High:     "text-orange-400 border-orange-500/40 bg-orange-500/10",
  Medium:   "text-amber-400  border-amber-500/40  bg-amber-500/10",
  Low:      "text-cyan-400   border-cyan-500/40   bg-cyan-500/10",
};
const severityDot: Record<string, string> = {
  Critical: "bg-rose-400",
  High:     "bg-orange-400",
  Medium:   "bg-amber-400",
  Low:      "bg-cyan-400",
};

export default function TroubleshootingPage() {
  const { t, lang } = useLanguage();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [severity, setSeverity] = useState<TroubleshootingSeverity | "All">("All");
  const [level,    setLevel]    = useState<TroubleshootingLevel    | "All">("All");

  const filtered = useMemo(() => {
    return troubleshootingGuides.filter((g) => {
      const q = search.toLowerCase();
      const matchSearch   = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
      const matchCategory = category === "All" || g.category === category;
      const matchSeverity = severity === "All" || g.severity === severity;
      const matchLevel    = level    === "All" || g.level    === level;
      return matchSearch && matchCategory && matchSeverity && matchLevel;
    });
  }, [search, category, severity, level]);

  const clearFilters = () => { setSearch(""); setCategory("All"); setSeverity("All"); setLevel("All"); };
  const hasFilter = search || category !== "All" || severity !== "All" || level !== "All";

  const levelLabel = (lv: TroubleshootingLevel | "All") => {
    if (lv === "All") return t("common.all");
    const map: Record<TroubleshootingLevel, "common.beginner" | "common.intermediate" | "common.advanced"> = {
      Beginner:     "common.beginner",
      Intermediate: "common.intermediate",
      Advanced:     "common.advanced",
    };
    return t(map[lv]);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl px-6 py-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-rose-500/7 blur-[70px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-violet-500/5 blur-[60px]" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-400/20 bg-orange-500/5 text-orange-400 text-[11px] font-bold mb-3">
              <AlertTriangle size={12} /> Network Troubleshooting
            </div>
            <h1 className="text-2xl font-bold text-white">{t("trouble.title")}</h1>
            <p className="text-sm text-white/40 mt-1 max-w-lg">{t("trouble.subtitle")}</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{guideStats.total}</p>
              <p className="text-[10px] text-white/30">{lang === "th" ? "ทั้งหมด" : "Total"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-rose-400">{guideStats.critical}</p>
              <p className="text-[10px] text-white/30">Critical</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">{guideStats.high}</p>
              <p className="text-[10px] text-white/30">High</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <Search size={14} className="text-white/30 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("trouble.search")}
          className="bg-transparent outline-none text-sm text-white/70 placeholder:text-white/25 flex-1"
        />
      </div>

      {/* ── Category filter ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {["All", ...guideCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              category === cat
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {cat === "All" ? t("common.all") : cat}
          </button>
        ))}
      </div>

      {/* ── Severity filter ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {SEVERITIES.map((sv) => (
          <button
            key={sv}
            onClick={() => setSeverity(sv)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              severity === sv
                ? (sv === "All"
                    ? "bg-white/[0.08] border-white/20 text-white/70"
                    : severityColor[sv])
                : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {sv !== "All" && (
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${severityDot[sv] ?? ""}`} />
            )}
            {sv === "All" ? t("common.all") : sv}
          </button>
        ))}
      </div>

      {/* ── Level filter ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevel(lv)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              level === lv
                ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {levelLabel(lv)}
          </button>
        ))}
      </div>

      {/* ── Results ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/35">
          {lang === "th" ? "แสดง" : "Showing"}{" "}
          <span className="text-white/60 font-medium">{filtered.length}</span>{" "}
          {lang === "th" ? "คู่มือ" : "guides"}
          {filtered.length !== troubleshootingGuides.length && (
            <span className="text-white/20 ml-1">
              {lang === "th" ? `จาก ${troubleshootingGuides.length}` : `of ${troubleshootingGuides.length}`}
            </span>
          )}
        </p>
        {hasFilter && (
          <button onClick={clearFilters} className="text-xs text-white/25 hover:text-white/50 transition-colors">
            {lang === "th" ? "ล้างตัวกรอง ✕" : "Clear filters ✕"}
          </button>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((guide) => (
            <TroubleshootingCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-20">
          <AlertTriangle size={28} className="text-white/15" />
          <p className="text-sm text-white/30">{t("trouble.empty")}</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl border border-white/[0.08] text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
          >
            {lang === "th" ? "ล้างตัวกรองทั้งหมด" : "Clear all filters"}
          </button>
        </div>
      )}
    </div>
  );
}
