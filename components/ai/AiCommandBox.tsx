"use client";
import { useState } from "react";

const suggestions = [
  "อธิบาย OSPF แบบเข้าใจง่าย",
  "ช่วยวิเคราะห์ MAC Flapping log นี้",
  "สร้าง Lab VLAN + OSPF",
  "สรุป BGP Local Preference กับ MED",
];

export default function AiCommandBox() {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 rounded-full border border-[#8b5cf6]/40 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors">
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ถามอะไรก็ได้เกี่ยวกับ Network..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#38bdf8]/50"
        />
        <button className="px-4 py-3 bg-[#38bdf8] text-[#050816] font-semibold rounded-lg text-sm hover:opacity-90">
          Send
        </button>
      </div>
    </div>
  );
}
