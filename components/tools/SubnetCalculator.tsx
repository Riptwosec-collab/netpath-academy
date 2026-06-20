"use client";
import { useState } from "react";
import { calculateSubnet, validateIpv4, type SubnetResult } from "@/lib/networkCalculations";

export default function SubnetCalculator() {
  const [ip,    setIp]    = useState("192.168.10.0");
  const [cidr,  setCidr]  = useState("24");
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error,  setError]  = useState("");

  const handleCalc = () => {
    setError("");
    const cidrNum = parseInt(cidr, 10);
    if (!validateIpv4(ip)) { setError("IP Address ไม่ถูกต้อง (ตัวอย่าง: 192.168.1.0)"); return; }
    if (isNaN(cidrNum) || cidrNum < 1 || cidrNum > 32) { setError("CIDR ต้องอยู่ระหว่าง 1-32"); return; }
    try {
      setResult(calculateSubnet(ip, cidrNum));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    }
  };

  const rows = result ? [
    { label: "Network Address",   value: result.networkAddress,   color: "#38bdf8" },
    { label: "Broadcast Address", value: result.broadcastAddress, color: "#ef4444" },
    { label: "Subnet Mask",       value: result.subnetMask,       color: "#8b5cf6" },
    { label: "Wildcard Mask",     value: result.wildcardMask,     color: "#f97316" },
    { label: "First Usable IP",   value: result.firstUsableIp,    color: "#22c55e" },
    { label: "Last Usable IP",    value: result.lastUsableIp,     color: "#22c55e" },
    { label: "Total Hosts",       value: result.totalHosts.toLocaleString(), color: "#facc15" },
    { label: "Usable Hosts",      value: result.usableHosts.toLocaleString(), color: "#facc15" },
  ] : [];

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-[10px] text-white/30 mb-1.5 block">IP Address</label>
          <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.10.0"
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.09] px-4 py-2.5
                       text-sm text-white/80 font-mono placeholder:text-white/20
                       focus:outline-none focus:border-[#22c55e]/40 transition-all" />
        </div>
        <div className="sm:w-32">
          <label className="text-[10px] text-white/30 mb-1.5 block">CIDR / Prefix</label>
          <div className="flex items-center gap-1">
            <span className="text-sm text-white/30">/</span>
            <input value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="24"
              className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.09] px-4 py-2.5
                         text-sm text-white/80 font-mono placeholder:text-white/20
                         focus:outline-none focus:border-[#22c55e]/40 transition-all" />
          </div>
        </div>
        <div className="sm:self-end">
          <button onClick={handleCalc}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/40
                       text-sm font-semibold text-[#22c55e] hover:bg-[#22c55e]/25 transition-all">
            Calculate
          </button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl border border-[#ef4444]/25 bg-[#ef4444]/[0.08] text-xs text-[#ef4444]/80">
          ⚠ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
            <span className="text-xs font-semibold text-white/50">
              {result.networkAddress}/{result.cidr}
            </span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between px-5 py-2.5">
                <span className="text-xs text-white/35">{r.label}</span>
                <span className="text-sm font-mono font-semibold" style={{ color: r.color }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
