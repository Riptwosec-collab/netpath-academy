"use client";
import { useState } from "react";

const TOPICS = ["VLAN & Trunk", "OSPF", "BGP", "DHCP", "DNS", "Firewall ACL", "Subnetting", "STP", "LACP / Port-Channel", "NAT"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function LabGenerator({
  onGenerate,
}: {
  onGenerate: (prompt: string) => void;
}) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState(LEVELS[0]);

  const handleSubmit = () => {
    onGenerate(`สร้าง Lab ฝึก ${topic} ระดับ ${level} พร้อม:\n- Scenario\n- Topology\n- IP Address Table\n- Tasks ทีละขั้น\n- Config ตัวอย่าง\n- Expected Result\n- Verification Commands`);
  };

  return (
    <div className="rounded-2xl border border-[#22c55e]/15 bg-[#22c55e]/[0.03] p-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-[#22c55e]/80 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Lab Generator
      </h3>
      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">หัวข้อ Lab</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                       text-xs text-white/70 focus:outline-none focus:border-[#22c55e]/40 transition-all"
          >
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">ระดับ</label>
          <div className="flex gap-2">
            {LEVELS.map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  level === l
                    ? "bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e]"
                    : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20"
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-xl bg-[#22c55e]/12 border border-[#22c55e]/35 text-[#22c55e]
                     text-xs font-medium hover:bg-[#22c55e]/20 transition-all mt-1">
          Generate Lab
        </button>
      </div>
    </div>
  );
}
