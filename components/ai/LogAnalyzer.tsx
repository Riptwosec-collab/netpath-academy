"use client";
import { useState } from "react";

const PLACEHOLDER = `ตัวอย่าง Log:
%MACFLAP-4-MOVE: Host 0012.3456.abcd in vlan 10 is flapping between port Gi1/0/1 and port Gi1/0/2
%OSPF-5-ADJCHG: Process 1, Nbr 10.0.0.2 on GigabitEthernet0/0 from FULL to DOWN
%DHCPD-4-PING_CONFLICT: DHCP address conflict: server pinged 192.168.1.100`;

export default function LogAnalyzer({
  onAnalyze,
}: {
  onAnalyze: (log: string) => void;
}) {
  const [log, setLog] = useState("");

  const handleSubmit = () => {
    if (!log.trim()) return;
    onAnalyze(`ช่วยวิเคราะห์ Log นี้: บอกสาเหตุที่เป็นไปได้, ระดับความรุนแรง และขั้นตอนแก้ไข:\n\n\`\`\`\n${log}\n\`\`\``);
    setLog("");
  };

  return (
    <div className="rounded-2xl border border-[#f97316]/15 bg-[#f97316]/[0.03] p-4">
      <h3 className="flex items-center gap-2 text-xs font-semibold text-[#f97316]/80 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Log Analyzer
      </h3>
      <textarea
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={6}
        className="w-full rounded-xl bg-[#080d1a] border border-white/[0.07] px-3 py-2.5
                   text-xs text-[#f97316]/60 font-mono placeholder:text-white/15
                   focus:outline-none focus:border-[#f97316]/40 resize-y transition-all"
      />
      <button
        onClick={handleSubmit}
        disabled={!log.trim()}
        className="mt-2 w-full py-2 rounded-xl bg-[#f97316]/12 border border-[#f97316]/35 text-[#f97316]
                   text-xs font-medium hover:bg-[#f97316]/20 transition-all
                   disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Analyze Log
      </button>
    </div>
  );
}
