"use client";

import { useState, useMemo } from "react";
import { Brain } from "lucide-react";
import { quizzes, quizStats, quizCategories, getQuizById } from "@/data/quizzes";
import QuizCard    from "@/components/quiz/QuizCard";
import QuizHeader  from "@/components/quiz/QuizHeader";
import QuizRunner  from "@/components/quiz/QuizRunner";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { QuizLevel } from "@/data/quizzes";

const LEVELS: (QuizLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function QuizPage() {
  const { t, lang } = useLanguage();

  /* ── Filter state ───────────────────────────────────────────── */
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [level,    setLevel]    = useState<QuizLevel | "All">("All");

  /* ── Drawer state ───────────────────────────────────────────── */
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeQuiz = activeId ? getQuizById(activeId) : null;

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const ql = search.toLowerCase();
      const matchSearch   = !ql || q.title.toLowerCase().includes(ql) || q.description.toLowerCase().includes(ql);
      const matchCategory = category === "All" || q.category === category;
      const matchLevel    = level    === "All" || q.level    === level;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, category, level]);

  const clearFilters = () => { setSearch(""); setCategory("All"); setLevel("All"); };
  const hasFilter = search || category !== "All" || level !== "All";

  const levelLabel = (lv: QuizLevel | "All") => {
    if (lv === "All") return t("common.all");
    const map: Record<QuizLevel, string> = {
      Beginner:     t("common.beginner"),
      Intermediate: t("common.intermediate"),
      Advanced:     t("common.advanced"),
    };
    return map[lv];
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl px-6 py-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-violet-500/8 blur-[70px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/6 blur-[60px]" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
              <Brain size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400/70 mb-0.5">Network Quiz</p>
              <h1 className="text-2xl font-bold text-white">{lang === "th" ? "ศูนย์ทดสอบความรู้" : "Quiz Center"}</h1>
              <p className="text-sm text-white/40 mt-0.5">{lang === "th" ? "ทดสอบความรู้ด้วย Quiz ทุกระดับ" : "Test your knowledge at every level"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: lang === "th" ? "ทั้งหมด" : "Total",    value: quizStats.total,        color: "#8b5cf6" },
              { label: lang === "th" ? "เริ่มต้น" : "Beginner", value: quizStats.beginner,     color: "#22c55e" },
              { label: lang === "th" ? "ระดับกลาง" : "Mid",     value: quizStats.intermediate, color: "#facc15" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] text-white/30">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search ──────────────────────────────────────────────── */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === "th" ? "ค้นหา Quiz..." : "Search quizzes..."}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5
                     text-sm text-white/80 placeholder:text-white/25
                     focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] transition-all"
        />
      </div>

      {/* ── Category filter ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {["All", ...quizCategories].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                category === cat
                  ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                  : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
              }`}>
              {cat === "All" ? t("common.all") : cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:ml-auto">
          {LEVELS.map((lv) => (
            <button key={lv} onClick={() => setLevel(lv)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                level === lv
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                  : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
              }`}>
              {levelLabel(lv)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count + clear ───────────────────────────────── */}
      <div className="flex items-center gap-4">
        <p className="text-[12px] text-white/35">
          {lang === "th" ? `แสดง ${filtered.length} Quiz` : `Showing ${filtered.length} quizzes`}
        </p>
        {hasFilter && (
          <button onClick={clearFilters}
            className="text-[11px] text-violet-400/60 hover:text-violet-400 transition-colors">
            {lang === "th" ? "ล้างตัวกรอง" : "Clear filters"}
          </button>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-white/20 text-sm">
          {lang === "th" ? "ไม่พบ Quiz ที่ตรงกัน" : "No quizzes found"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onClick={() => setActiveId(quiz.id)} />
          ))}
        </div>
      )}

      {/* ── Slide Drawer ────────────────────────────────────────── */}
      <SlideDrawer
        open={!!activeQuiz}
        onClose={() => setActiveId(null)}
        title={activeQuiz?.title}
        size="lg"
      >
        {activeQuiz && (
          <div className="p-5 space-y-5">
            <QuizHeader quiz={activeQuiz} />
            <QuizRunner quiz={activeQuiz} onBack={() => setActiveId(null)} />
          </div>
        )}
      </SlideDrawer>
    </div>
  );
}
