"use client";
import { aiPromptSuggestions, aiModes } from "@/data/aiPrompts";
import type { AiMode } from "@/data/aiPrompts";

export default function AiSuggestionCards({
  mode,
  onSelect,
}: {
  mode: AiMode;
  onSelect: (prompt: string) => void;
}) {
  const filtered = aiPromptSuggestions.filter((s) => s.mode === mode);
  const modeConfig = aiModes.find((m) => m.id === mode);

  if (filtered.length === 0) {
    return (
      <p className="text-xs text-white/20 italic px-1">No suggestions for this mode</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.prompt)}
          className="group text-left px-3 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03]
                     hover:border-current hover:bg-current/5 transition-all max-w-xs"
          style={{ ["--tw-ring-color" as string]: modeConfig?.color }}
        >
          <p className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
            {s.title}
          </p>
          <p className="text-[10px] text-white/30 mt-0.5 leading-snug">{s.description}</p>
        </button>
      ))}
    </div>
  );
}
