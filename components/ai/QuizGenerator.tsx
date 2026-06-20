"use client";
import { useState } from "react";

const TOPICS = ["Subnetting", "OSPF", "BGP", "VLAN", "STP", "Firewall", "DNS", "DHCP", "Network Fundamentals", "Routing Protocols"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const COUNTS = [5, 10, 15, 20];

export default function QuizGenerator({
  onGenerate,
}: {
  onGenerate: (prompt: string) => void;
}) {
  const [topic, setTopic]   = useState(TOPICS[0]);
  const [level, setLevel]   = useState(LEVELS[0]);
  const [count, setCount]   = useState(10);

  const handleSubmit = () => {
    onGenerate(`สร้าง Quiz เรื่อง ${topic} จำนวน ${count} ข้อ ระดับ ${level}\nรูปแบบ: Multiple Choice (A B C D)\nต้องมีเฉลยและคำอธิบายแต่ละข้อ`);
  };

  return (
    <div className="rounded-2xl border border-[#facc15]/15 bg-[#facc15]/[0.03] p-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-[#facc15]/80 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Quiz Generator
      </h3>
      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">หัวข้อ Quiz</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2
                       text-xs text-white/70 focus:outline-none focus:border-[#facc15]/40 transition-all"
          >
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">จำนวนข้อ</label>
          <div className="flex gap-2">
            {COUNTS.map((n) => (
              <button key={n} onClick={() => setCount(n)}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  count === n
                    ? "bg-[#facc15]/15 border-[#facc15]/40 text-[#facc15]"
                    : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20"
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] text-white/30 mb-1 block">ระดับ</label>
          <div className="flex gap-2">
            {LEVELS.map((l) => (
              <button key={l} onClick={() => setLevel(l)}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  level === l
                    ? "bg-[#facc15]/15 border-[#facc15]/40 text-[#facc15]"
                    : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20"
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-xl bg-[#facc15]/10 border border-[#facc15]/35 text-[#facc15]
                     text-xs font-medium hover:bg-[#facc15]/18 transition-all mt-1">
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
