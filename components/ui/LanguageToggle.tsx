"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 p-0.5 rounded-lg bg-white/[0.05] border border-white/[0.08]",
        className,
      )}
      role="group"
      aria-label="Select language"
    >
      {(["th", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
            lang === l
              ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
              : "text-white/30 hover:text-white/60",
          )}
        >
          {l === "th" ? "TH" : "EN"}
        </button>
      ))}
    </div>
  );
}
