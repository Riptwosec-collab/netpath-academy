"use client";
import { useState } from "react";

const PLACEHOLDER = `! ตัวอย่าง Cisco Switch Config
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10
!
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 1`;

export default function ConfigAnalyzer({
  onAnalyze,
}: {
  onAnalyze: (config: string) => void;
}) {
  const [config, setConfig] = useState("");

  const handleSubmit = () => {
    if (!config.trim()) return;
    onAnalyze(`ช่วยตรวจสอบ Config นี้ว่ามีปัญหา, ข้อผิดพลาด หรือสิ่งที่ควรปรับปรุงอะไรบ้าง พร้อมคำแนะนำ:\n\n\`\`\`\n${config}\n\`\`\``);
    setConfig("");
  };

  return (
    <div className="rounded-2xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.03] p-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-[#8b5cf6]/80 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Config Analyzer
      </h3>
      <textarea
        value={config}
        onChange={(e) => setConfig(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={6}
        className="w-full rounded-xl bg-[#080d1a] border border-white/[0.07] px-3 py-2.5
                   text-xs text-[#38bdf8]/70 font-mono placeholder:text-white/15
                   focus:outline-none focus:border-[#8b5cf6]/40 resize-y transition-all"
      />
      <button
        onClick={handleSubmit}
        disabled={!config.trim()}
        className="mt-2 w-full py-2 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/35 text-[#8b5cf6]
                   text-xs font-medium hover:bg-[#8b5cf6]/25 transition-all
                   disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Analyze Config
      </button>
    </div>
  );
}
