"use client";
import { useState } from "react";
import { portfolioItems as initial, typeLabel, typeColor } from "@/data/portfolio";
import type { PortfolioItem, PortfolioType } from "@/data/portfolio";
import PortfolioOverview from "@/components/portfolio/PortfolioOverview";
import PortfolioCard     from "@/components/portfolio/PortfolioCard";
import SkillShowcase     from "@/components/portfolio/SkillShowcase";
import PortfolioPreview  from "@/components/portfolio/PortfolioPreview";
import AddPortfolioForm  from "@/components/portfolio/AddPortfolioForm";
import ProjectTimeline   from "@/components/portfolio/ProjectTimeline";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>(initial);
  const [filter, setFilter] = useState<PortfolioType | "all">("all");

  const filtered = filter === "all" ? items : items.filter((p) => p.type === filter);
  const typeOptions: (PortfolioType | "all")[] = ["all","lab-summary","rca-report","config","automation-script","design","monitoring","network-diagram"];

  const handleAdd = (form: { title:string; type:PortfolioType; category:string; level:"Beginner"|"Intermediate"|"Advanced"; description:string; skills:string; tools:string; summary:string }) => {
    const newItem: PortfolioItem = {
      id: `custom-${Date.now()}`,
      title: form.title,
      type: form.type,
      category: form.category || "General",
      level: form.level,
      description: form.description,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      tools:  form.tools.split(",").map((s) => s.trim()).filter(Boolean),
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      summary: form.summary,
    };
    setItems((p) => [newItem, ...p]);
  };

  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto space-y-6">

      {/* Hero */}
      <div className="relative rounded-2xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.03] overflow-hidden p-5 md:p-6">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8b5cf6]/6 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-white/95 mb-1">Network Portfolio</h1>
          <p className="text-sm text-white/40 max-w-lg">
            เก็บผลงาน Lab, RCA Report, Config และ Script สำหรับโชว์ทักษะในการสมัครงาน Network Engineer
          </p>
        </div>
      </div>

      {/* Stats */}
      <PortfolioOverview />

      {/* Skills */}
      <SkillShowcase />

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {typeOptions.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              filter === t
                ? "bg-[#38bdf8]/15 border-[#38bdf8]/40 text-[#38bdf8]"
                : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/60"
            }`}>
            {t === "all" ? "All" : typeLabel[t]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-white/25">ไม่มี Portfolio ประเภทนี้</p>
            <button onClick={() => setFilter("all")} className="text-xs text-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors">
              ดูทั้งหมด
            </button>
          </div>
        )}
      </div>

      {/* Add form */}
      <AddPortfolioForm onAdd={handleAdd} />

      {/* Preview + Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PortfolioPreview />
        <ProjectTimeline />
      </div>
    </div>
  );
}
