"use client";

import { useState } from "react";
import type { TroubleshootingCommand } from "@/data/troubleshooting";

const platformBadge: Record<string, string> = {
  Windows:  "border-[#38bdf8]/25 bg-[#38bdf8]/8 text-[#38bdf8]/70",
  Linux:    "border-[#22c55e]/25 bg-[#22c55e]/8 text-[#22c55e]/70",
  Cisco:    "border-[#8b5cf6]/25 bg-[#8b5cf6]/8 text-[#8b5cf6]/70",
  Firewall: "border-[#f97316]/25 bg-[#f97316]/8 text-[#f97316]/70",
  General:  "border-white/15 bg-white/5 text-white/40",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button onClick={handleCopy}
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-all
                  ${copied
                    ? "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]"
                    : "border-white/10 bg-white/[0.03] text-white/25 hover:text-white/50 hover:border-white/20"}`}>
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export default function CommandChecklist({ commands }: { commands: TroubleshootingCommand[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#8b5cf6]/80 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        คำสั่งที่ใช้ (Command Checklist)
      </h2>

      <div className="flex flex-col gap-3">
        {commands.map((cmd, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 font-medium">{cmd.title}</span>
                <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${platformBadge[cmd.platform] ?? platformBadge.General}`}>
                  {cmd.platform}
                </span>
              </div>
              <CopyButton text={cmd.command} />
            </div>
            {/* Command */}
            <div className="px-4 py-3 bg-[#080d1a]">
              <code className="text-xs font-mono text-[#22c55e]/90 whitespace-pre-wrap break-all">{cmd.command}</code>
            </div>
            {/* Description */}
            <div className="px-4 py-2">
              <p className="text-[11px] text-white/30 leading-[1.6]">{cmd.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
