"use client";

import { useState, useMemo } from "react";
import { labs, labStats, labCategories, getLabById } from "@/data/labs";
import LabCard       from "@/components/labs/LabCard";
import LabHeader     from "@/components/labs/LabHeader";
import LabTopology   from "@/components/labs/LabTopology";
import LabIpTable    from "@/components/labs/LabIpTable";
import LabTaskList   from "@/components/labs/LabTaskList";
import LabHintBox    from "@/components/labs/LabHintBox";
import LabTroubleshooting from "@/components/labs/LabTroubleshooting";
import LabSolution   from "@/components/labs/LabSolution";
import SlideDrawer   from "@/components/ui/SlideDrawer";
import type { LabLevel, LabStatus } from "@/data/labs";

const LEVELS:   (LabLevel  | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
const STATUSES: (LabStatus | "All")[] = ["All", "not-started", "in-progress", "completed"];

const statusLabel: Record<string, string> = {
  "All":         "ทั้งหมด",
  "not-started": "ยังไม่เริ่ม",
  "in-progress": "กำลังทำ",
  "completed":   "เสร็จแล้ว",
};

export default function LabsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [level,    setLevel]    = useState<LabLevel | "All">("All");
  const [status,   setStatus]   = useState<LabStatus | "All">("All");

  /* ── Drawer state ───────────────────────────────────────────── */
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLab = activeId ? getLabById(activeId) : null;

  const filtered = useMemo(() => {
    return labs.filter((lab) => {
      const q = search.toLowerCase();
      const matchSearch   = !q || lab.title.toLowerCase().includes(q) || lab.category.toLowerCase().includes(q);
      const matchCategory = category === "All" || lab.category === category;
      const matchLevel    = level    === "All" || lab.level    === level;
      const matchStatus   = status   === "All" || lab.status   === status;
      return matchSearch && matchCategory && matchLevel && matchStatus;
    });
  }, [search, category, level, status]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setStatus("All");
  };

  const hasFilter = search || category !== "All" || level !== "All" || status !== "All";

  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto space-y-6">

      {/* ── Stat banner ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Labs ทั้งหมด",   value: labStats.total,        color: "#38bdf8" },
          { label: "Beginner",        value: labStats.beginner,     color: "#22c55e" },
          { label: "Intermediate",    value: labStats.intermediate, color: "#facc15" },
          { label: "เสร็จแล้ว",       value: labStats.completed,    color: "#8b5cf6" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03]"
            style={{ borderColor: `${s.color}20` }}
          >
            <span className="text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[10px] text-white/35">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filters ───────────────────────────────────────── */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none"
               fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหา Lab..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                       text-sm text-white/70 placeholder:text-white/20
                       focus:outline-none focus:border-[#38bdf8]/40 focus:bg-white/[0.06] transition-all"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {["All", ...labCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                category === cat
                  ? "bg-[#38bdf8]/15 border-[#38bdf8]/40 text-[#38bdf8]"
                  : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Level */}
          {LEVELS.map((lv) => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                level === lv
                  ? "bg-[#8b5cf6]/15 border-[#8b5cf6]/40 text-[#8b5cf6]"
                  : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {lv}
            </button>
          ))}

          <div className="w-px bg-white/[0.07] self-stretch mx-1" />

          {/* Status */}
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                status === st
                  ? "bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e]"
                  : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {statusLabel[st]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results header ────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/35">
          แสดง <span className="text-white/60 font-medium">{filtered.length}</span> Lab
          {filtered.length !== labs.length && (
            <span className="text-white/20"> จากทั้งหมด {labs.length}</span>
          )}
        </p>
        {hasFilter && (
          <button
            onClick={clearFilters}
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            ล้างตัวกรอง ✕
          </button>
        )}
      </div>

      {/* ── Lab grid ──────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} onClick={() => setActiveId(lab.id)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
            <svg className="w-7 h-7 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/30 font-medium">ไม่พบ Lab ที่ตรงกับเงื่อนไข</p>
            <p className="text-xs text-white/15 mt-1">ลองเปลี่ยนตัวกรองหรือล้างการค้นหา</p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      )}
      {/* ── Lab Detail Drawer ─────────────────────────────── */}
      <SlideDrawer
        open={!!activeLab}
        onClose={() => setActiveId(null)}
        title={activeLab?.title}
        size="xl"
      >
        {activeLab && (
          <div className="p-5 space-y-5">
            <LabHeader lab={activeLab} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LabTopology lab={activeLab} />
              <LabIpTable  lab={activeLab} />
            </div>
            <LabTaskList lab={activeLab} />
            <LabHintBox  lab={activeLab} />
            <LabTroubleshooting lab={activeLab} />
            <LabSolution lab={activeLab} />
          </div>
        )}
      </SlideDrawer>
    </div>
  );
}
