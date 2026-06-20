"use client";

import Link from "next/link";
import { CheckCircle2, CircleDot, Lock, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import type { RoadmapLevel } from "@/data/roadmap";

// ─── Color map ────────────────────────────────────────────────────
const colorMap = {
  cyan:    { border: "border-cyan-500/25",    bg: "bg-cyan-500/8",     text: "text-cyan-400",    skill: "border-cyan-500/20 text-cyan-400/70",    bar: "#38bdf8" },
  violet:  { border: "border-violet-500/25",  bg: "bg-violet-500/8",   text: "text-violet-400",  skill: "border-violet-500/20 text-violet-400/70", bar: "#8b5cf6" },
  emerald: { border: "border-emerald-500/25", bg: "bg-emerald-500/8",  text: "text-emerald-400", skill: "border-emerald-500/20 text-emerald-400/70",bar: "#22c55e" },
  amber:   { border: "border-amber-500/25",   bg: "bg-amber-500/8",    text: "text-amber-400",   skill: "border-amber-500/20 text-amber-400/70",   bar: "#f59e0b" },
  rose:    { border: "border-rose-500/25",    bg: "bg-rose-500/8",     text: "text-rose-400",    skill: "border-rose-500/20 text-rose-400/70",     bar: "#ef4444" },
};

const lockStyle = {
  border: "border-white/[0.07]", bg: "bg-white/[0.02]", text: "text-white/25",
  skill: "border-white/[0.07] text-white/20", bar: "#ffffff22",
};

const StatusIcon = ({ status }: { status: RoadmapLevel["status"] }) => {
  if (status === "completed")   return <CheckCircle2 size={16} className="text-emerald-400" />;
  if (status === "in-progress") return <CircleDot    size={16} className="text-cyan-400"    />;
  return <Lock size={14} className="text-white/25" />;
};

export default function LevelCard({ item, progress = 0 }: { item: RoadmapLevel; progress?: number }) {
  const [open, setOpen] = useState(item.status === "in-progress");
  const { lang, t } = useLanguage();
  const isLocked = item.status === "locked";
  const c = isLocked ? lockStyle : colorMap[item.color];

  const title       = lang === "th" ? item.titleTh       : item.title;
  const description = lang === "th" ? item.description   : item.descriptionEn;
  const objectives  = lang === "th" ? item.objectives     : item.objectivesEn;

  const statusLabel =
    item.status === "completed"   ? t("common.completed")  :
    item.status === "in-progress" ? t("common.inProgress") :
    t("common.locked");

  return (
    <div className={cn(
      "rounded-2xl border bg-white/[0.03] backdrop-blur-xl overflow-hidden",
      "transition-all duration-300",
      isLocked ? "opacity-60" : "hover:-translate-y-0.5",
      c.border,
    )}>
      {/* Card header — always visible */}
      <button
        onClick={() => !isLocked && setOpen((v) => !v)}
        disabled={isLocked}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        {/* Level number */}
        <div className={cn(
          "flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center text-lg font-bold",
          c.bg, c.border, c.text,
        )}>
          {item.level}
        </div>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={cn("text-base font-semibold", isLocked ? "text-white/30" : "text-white/90")}>
              {title}
            </span>
            <span className={cn(
              "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
              item.status === "completed"   ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
              item.status === "in-progress" ? "text-cyan-400    bg-cyan-500/10    border-cyan-500/20"    :
              "text-white/25 bg-white/[0.03] border-white/[0.08]",
            )}>
              <StatusIcon status={item.status} />
              {statusLabel}
            </span>
          </div>
          <p className={cn("text-xs leading-relaxed", isLocked ? "text-white/20" : "text-white/40")}>
            {description}
          </p>
        </div>

        {/* Expand chevron */}
        {!isLocked && (
          <div className="flex-shrink-0 text-white/20">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </button>

      {/* Progress bar (always shown, subtle) */}
      {!isLocked && (
        <div className="px-5 pb-0">
          <div className="w-full h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, backgroundColor: c.bar }}
            />
          </div>
          {progress > 0 && (
            <p className="text-[10px] mt-1 mb-2" style={{ color: c.bar }}>{progress}% {t("common.completed")}</p>
          )}
        </div>
      )}

      {/* Expanded content */}
      {open && !isLocked && (
        <div className="px-5 pb-5 pt-3 border-t border-white/[0.05]">
          {/* Skills */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-2">
              {t("roadmap.skills")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className={cn("text-[10px] px-2 py-0.5 rounded-full border", c.skill)}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-2">
              {t("roadmap.objectives")}
            </p>
            <ul className="flex flex-col gap-1.5">
              {objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/45">
                  <span className={cn("mt-1 w-1 h-1 rounded-full flex-shrink-0", c.text.replace("text-", "bg-"))} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/courses"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                c.bg, c.border, c.text,
              )}
            >
              {t("roadmap.viewCourses")} <ArrowRight size={12} />
            </Link>
            <Link
              href="/labs"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 transition-all"
            >
              {t("roadmap.startLab")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
