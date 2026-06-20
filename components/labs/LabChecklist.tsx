"use client";
import { useState } from "react";

export default function LabChecklist({ tasks }: { tasks: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(tasks.map(() => false));
  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => idx === i ? !v : v));
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task, i) => (
        <button key={i} onClick={() => toggle(i)} className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${checked[i] ? "border-[#22c55e]/40 bg-[#22c55e]/5 text-[#22c55e]" : "border-white/10 bg-white/5 text-gray-300"}`}>
          <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs flex-shrink-0 ${checked[i] ? "border-[#22c55e] bg-[#22c55e]" : "border-gray-500"}`}>
            {checked[i] ? "✓" : ""}
          </span>
          <span className="text-sm">{task}</span>
        </button>
      ))}
    </div>
  );
}
