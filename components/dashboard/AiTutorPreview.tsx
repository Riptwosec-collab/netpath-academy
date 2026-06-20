import Link from "next/link";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

const PROMPTS = [
  "อธิบาย OSPF แบบเข้าใจง่าย",
  "วิเคราะห์ MAC Flapping log ให้หน่อย",
  "ช่วยสร้าง Lab VLAN + Trunk",
  "อธิบาย STP และวิธีแก้ปัญหา Loop",
];

export default function AiTutorPreview({ prompts = PROMPTS }: { prompts?: string[] }) {
  return (
    <div className="relative rounded-2xl border border-violet-500/20 bg-white/[0.03] backdrop-blur-xl p-5 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-[50px]" aria-hidden />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
          <Bot size={17} className="text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white/85">AI Network Tutor</p>
          <p className="text-[10px] text-violet-400/70">10 specialized modes</p>
        </div>
        <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-semibold">Online</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-white/40 mb-4 leading-relaxed">
        ถามอะไรก็ได้เกี่ยวกับ Network — อธิบายคอนเซ็ปต์, วิเคราะห์ Config, สร้าง Lab, แก้ปัญหา
      </p>

      {/* Example prompts */}
      <div className="flex flex-col gap-2 mb-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest flex items-center gap-1">
          <Sparkles size={10} /> ตัวอย่างคำถาม
        </p>
        {prompts.map((p) => (
          <Link
            key={p}
            href={`/ai-tutor?q=${encodeURIComponent(p)}`}
            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-white/[0.06] text-xs text-white/50 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-500/5 transition-all group"
          >
            <span className="truncate">{p}</span>
            <ArrowRight size={11} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/ai-tutor"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/40 text-violet-400 text-sm font-semibold hover:bg-violet-500/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
      >
        <Bot size={15} />
        Open AI Tutor
      </Link>
    </div>
  );
}
