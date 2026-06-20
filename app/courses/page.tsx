"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import { courses, courseStats, courseCategories } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CourseLevel } from "@/data/courses";

const LEVELS: (CourseLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

const levelColor: Record<CourseLevel | "All", string> = {
  All:          "border-white/[0.08] text-white/40",
  Beginner:     "border-emerald-500/40 text-emerald-400",
  Intermediate: "border-amber-500/40   text-amber-400",
  Advanced:     "border-rose-500/40    text-rose-400",
};

export default function CoursesPage() {
  const { t, lang } = useLanguage();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [level,    setLevel]    = useState<CourseLevel | "All">("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch   = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      const matchCategory = category === "All" || c.category === category;
      const matchLevel    = level    === "All" || c.level    === level;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, category, level]);

  const clearFilters = () => { setSearch(""); setCategory("All"); setLevel("All"); };
  const hasFilter = search || category !== "All" || level !== "All";

  const levelLabel = (lv: CourseLevel | "All") => {
    if (lv === "All") return t("common.all");
    const map: Record<CourseLevel, "common.beginner" | "common.intermediate" | "common.advanced"> = {
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
          <div className="absolute -top-16 right-10 w-44 h-44 rounded-full bg-cyan-500/8 blur-[70px]" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-500/5 text-cyan-400 text-[11px] font-bold mb-3">
              <BookOpen size={12} /> Network Courses
            </div>
            <h1 className="text-2xl font-bold text-white">{t("courses.title")}</h1>
            <p className="text-sm text-white/40 mt-1 max-w-lg">{t("courses.subtitle")}</p>
          </div>
          {/* Stats */}
          <div className="flex gap-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{courseStats.total}</p>
              <p className="text-[10px] text-white/30">{lang === "th" ? "คอร์สทั้งหมด" : "Courses"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{courseStats.beginner}</p>
              <p className="text-[10px] text-white/30">{t("common.beginner")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{courseStats.intermediate}</p>
              <p className="text-[10px] text-white/30">{t("common.intermediate")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/30 text-sm">
        <Search size={14} className="flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("courses.search")}
          className="bg-transparent outline-none text-white/70 placeholder:text-white/25 flex-1"
        />
      </div>

      {/* ── Category filter ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {["All", ...courseCategories].map((cat) => (
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

      {/* ── Level filter ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevel(lv)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              level === lv
                ? `bg-violet-500/15 border-violet-500/40 text-violet-400`
                : `border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60`
            }`}
          >
            {levelLabel(lv)}
          </button>
        ))}
      </div>

      {/* ── Results header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/35">
          {lang === "th"
            ? <>{lang === "th" ? "แสดง" : "Showing"} <span className="text-white/60 font-semibold">{filtered.length}</span> {lang === "th" ? "คอร์ส" : "courses"}</>
            : <>Showing <span className="text-white/60 font-semibold">{filtered.length}</span> courses</>
          }
          {filtered.length !== courses.length && (
            <span className="text-white/20 ml-1">
              {lang === "th" ? `จาก ${courses.length}` : `of ${courses.length}`}
            </span>
          )}
        </p>
        {hasFilter && (
          <button onClick={clearFilters} className="text-xs text-white/25 hover:text-white/50 transition-colors">
            {lang === "th" ? "ล้างตัวกรอง ✕" : "Clear filters ✕"}
          </button>
        )}
      </div>

      {/* ── Course grid ─────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
            <BookOpen size={24} className="text-white/15" />
          </div>
          <p className="text-sm text-white/30">{t("courses.empty")}</p>
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
