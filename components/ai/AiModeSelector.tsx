"use client";
import { aiModes } from "@/data/aiPrompts";
import type { AiMode } from "@/data/aiPrompts";

export default function AiModeSelector({
  mode,
  onChange,
}: {
  mode: AiMode;
  onChange: (m: AiMode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {aiModes.map((m) => {
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            title={m.description}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              active
                ? "border-current text-current bg-current/10"
                : "border-white/[0.08] text-white/35 bg-white/[0.03] hover:border-white/20 hover:text-white/60"
            }`}
            style={active ? { color: m.color, borderColor: `${m.color}40`, backgroundColor: `${m.color}12` } : {}}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              style={active ? { color: m.color } : {}}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
            </svg>
            <span className="hidden sm:inline">{m.label}</span>
            <span className="sm:hidden">{m.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
