"use client";

import { useState, useCallback } from "react";
import { Calculator, Copy, Check, AlertCircle } from "lucide-react";

/* ── Subnet math ────────────────────────────────────────────────── */
function cidrToMask(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
}
function ipToNum(ip: string): number {
  return ip.split(".").reduce((acc, oct) => ((acc << 8) | parseInt(oct, 10)) >>> 0, 0) >>> 0;
}
function numToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}
function numToBin(n: number, groups = true): string {
  const bits = n.toString(2).padStart(32, "0");
  if (!groups) return bits;
  return [bits.slice(0,8), bits.slice(8,16), bits.slice(16,24), bits.slice(24)].join(".");
}
function maskToPrefix(mask: number): number {
  let count = 0, m = mask;
  while (m) { count += m & 1; m >>>= 1; }
  return count;
}
function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every(p => /^\d+$/.test(p) && parseInt(p) >= 0 && parseInt(p) <= 255);
}

interface SubnetResult {
  networkAddr:   string;
  broadcastAddr: string;
  firstHost:     string;
  lastHost:      string;
  subnetMask:    string;
  wildcardMask:  string;
  totalHosts:    number;
  usableHosts:   number;
  ipClass:       string;
  prefix:        number;
  ipBin:         string;
  maskBin:       string;
  networkBin:    string;
  broadcastBin:  string;
  isPrivate:     boolean;
  privateRange:  string;
}

function calcSubnet(ip: string, prefix: number): SubnetResult | null {
  if (!isValidIp(ip) || prefix < 0 || prefix > 32) return null;
  const mask      = cidrToMask(prefix);
  const ipNum     = ipToNum(ip);
  const netNum    = (ipNum & mask) >>> 0;
  const bcastNum  = (netNum | (~mask >>> 0)) >>> 0;
  const wild      = (~mask >>> 0) >>> 0;
  const totalH    = Math.pow(2, 32 - prefix);
  const usableH   = prefix >= 31 ? totalH : Math.max(0, totalH - 2);
  const first     = prefix === 32 ? numToIp(netNum) : numToIp(netNum + 1);
  const last      = prefix >= 31 ? numToIp(bcastNum) : numToIp(bcastNum - 1);

  const oct1 = (netNum >>> 24) & 0xff;
  let cls = "Public";
  if (oct1 >= 1 && oct1 <= 126)  cls = "A";
  else if (oct1 === 127)          cls = "Loopback";
  else if (oct1 >= 128 && oct1 <= 191) cls = "B";
  else if (oct1 >= 192 && oct1 <= 223) cls = "C";
  else if (oct1 >= 224 && oct1 <= 239) cls = "D (Multicast)";
  else cls = "E (Reserved)";

  // Private ranges
  let isPrivate = false; let privateRange = "";
  if (ipNum >= ipToNum("10.0.0.0") && ipNum <= ipToNum("10.255.255.255"))
    { isPrivate = true; privateRange = "RFC1918 Class A (10.0.0.0/8)"; }
  else if (ipNum >= ipToNum("172.16.0.0") && ipNum <= ipToNum("172.31.255.255"))
    { isPrivate = true; privateRange = "RFC1918 Class B (172.16.0.0/12)"; }
  else if (ipNum >= ipToNum("192.168.0.0") && ipNum <= ipToNum("192.168.255.255"))
    { isPrivate = true; privateRange = "RFC1918 Class C (192.168.0.0/16)"; }

  return {
    networkAddr: numToIp(netNum), broadcastAddr: numToIp(bcastNum),
    firstHost: first, lastHost: last,
    subnetMask: numToIp(mask), wildcardMask: numToIp(wild),
    totalHosts: totalH, usableHosts: usableH,
    ipClass: cls, prefix,
    ipBin:        numToBin(ipNum),
    maskBin:      numToBin(mask),
    networkBin:   numToBin(netNum),
    broadcastBin: numToBin(bcastNum),
    isPrivate, privateRange,
  };
}

/* ── Copy helper ────────────────────────────────────────────────── */
function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10">
      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} className="text-white/40" />}
    </button>
  );
}

/* ── Row ────────────────────────────────────────────────────────── */
function Row({ label, value, mono = false, highlight = false }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className={`group flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${highlight ? "bg-cyan-500/8 border border-cyan-500/20" : "hover:bg-white/[0.03]"}`}>
      <span className="text-xs text-white/40 w-36 flex-shrink-0">{label}</span>
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className={`text-xs ${highlight ? "text-cyan-300 font-semibold" : "text-white/75"} ${mono ? "font-mono" : ""}`}>{value}</span>
        <CopyBtn value={value} />
      </div>
    </div>
  );
}

/* ── Binary row ─────────────────────────────────────────────────── */
function BinRow({ label, value, prefix }: { label: string; value: string; prefix?: number }) {
  const octets = value.split(".");
  return (
    <div className="flex flex-col gap-1 py-2 px-3">
      <span className="text-[10px] text-white/35">{label}</span>
      <div className="flex gap-0.5 font-mono text-[11px] flex-wrap">
        {octets.map((oct, oi) => (
          <span key={oi} className="flex">
            {oct.split("").map((bit, bi) => {
              const absPos = oi * 9 + bi; // position with dots
              const bitPos = oi * 8 + bi;
              return (
                <span key={bi} className={
                  prefix !== undefined
                    ? bitPos < prefix ? "text-cyan-400" : "text-white/30"
                    : "text-white/60"
                }>{bit}</span>
              );
            })}
            {oi < 3 && <span className="text-white/20">.</span>}
          </span>
        ))}
        {prefix !== undefined && (
          <span className="ml-2 text-[10px] text-white/30">/{prefix} network bits highlighted</span>
        )}
      </div>
    </div>
  );
}

/* ── VLSM table: subnets list ───────────────────────────────────── */
function SubnetList({ networkAddr, prefix }: { networkAddr: string; prefix: number }) {
  const count = Math.min(8, Math.pow(2, Math.max(0, prefix <= 24 ? 1 : 0)));
  if (prefix > 28 || prefix < 8) return null;
  const subnets: string[] = [];
  const netNum = ipToNum(networkAddr);
  const mask   = cidrToMask(prefix + 1);
  const block  = Math.pow(2, 31 - prefix);
  for (let i = 0; i < Math.min(8, Math.pow(2, 1)); i++) {
    subnets.push(numToIp((netNum + i * block) >>> 0));
  }
  if (subnets.length === 0) return null;
  return (
    <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">
        /{prefix + 1} subnets (split current /{prefix})
      </p>
      <div className="grid grid-cols-2 gap-1">
        {subnets.map((s, i) => (
          <div key={i} className="font-mono text-xs text-white/60 px-2 py-1 rounded bg-white/[0.03]">
            {s}/{prefix + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function SubnetCalculator({ defaultIp = "192.168.1.0", defaultPrefix = 24 }: {
  defaultIp?: string;
  defaultPrefix?: number;
}) {
  const [ip,     setIp]     = useState(defaultIp);
  const [prefix, setPrefix] = useState(defaultPrefix);
  const [showBin,setShowBin]= useState(false);

  const result = calcSubnet(ip, prefix);
  const error  = ip.length > 0 && !isValidIp(ip) ? "IP address ไม่ถูกต้อง" : null;

  /* quick presets */
  const PRESETS = [
    { label: "192.168.1.0/24", ip: "192.168.1.0", prefix: 24 },
    { label: "10.0.0.0/8",     ip: "10.0.0.0",     prefix: 8  },
    { label: "172.16.0.0/12",  ip: "172.16.0.0",   prefix: 12 },
    { label: "203.0.113.0/25", ip: "203.0.113.0",  prefix: 25 },
    { label: "10.10.10.0/30",  ip: "10.10.10.0",   prefix: 30 },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] bg-gradient-to-r from-cyan-500/[0.06] to-violet-500/[0.04]">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
          <Calculator size={14} className="text-cyan-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-white/80">Subnet Calculator</p>
          <p className="text-[10px] text-white/35">คำนวณ Network, Broadcast, Host range ทันที</p>
        </div>
        <button
          onClick={() => setShowBin(b => !b)}
          className={`ml-auto text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
            showBin ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400" : "bg-white/[0.04] border-white/[0.08] text-white/35 hover:text-white/60"
          }`}
        >
          {showBin ? "Hide Binary" : "Show Binary"}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="text-[10px] text-white/35 mb-1 block">IP Address</label>
            <input
              value={ip}
              onChange={e => setIp(e.target.value)}
              placeholder="192.168.1.0"
              className={`w-full bg-white/[0.04] border rounded-lg px-3 py-2 text-sm font-mono text-white/80
                         focus:outline-none transition-all ${
                           error ? "border-red-500/50 focus:border-red-500/70" : "border-white/[0.08] focus:border-cyan-500/40"
                         }`}
            />
            {error && <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {error}</p>}
          </div>
          <div className="w-32">
            <label className="text-[10px] text-white/35 mb-1 block">Prefix / {prefix}</label>
            <input
              type="range" min={1} max={32} value={prefix}
              onChange={e => setPrefix(Number(e.target.value))}
              className="w-full mt-3 accent-cyan-500"
            />
          </div>
          <div className="w-20">
            <label className="text-[10px] text-white/35 mb-1 block">CIDR</label>
            <input
              type="number" min={1} max={32} value={prefix}
              onChange={e => setPrefix(Math.min(32, Math.max(1, Number(e.target.value))))}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-cyan-500/40"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => { setIp(p.ip); setPrefix(p.prefix); }}
              className="text-[10px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-white/70 hover:border-cyan-500/30 font-mono transition-all">
              {p.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-1">
            <Row label="Network Address"   value={`${result.networkAddr}/${result.prefix}`}   mono highlight />
            <Row label="Broadcast"          value={result.broadcastAddr}                        mono />
            <Row label="First Usable Host"  value={result.firstHost}                            mono />
            <Row label="Last Usable Host"   value={result.lastHost}                             mono />
            <Row label="Subnet Mask"        value={result.subnetMask}                           mono />
            <Row label="Wildcard Mask"      value={result.wildcardMask}                         mono />
            <Row label="Total Hosts"        value={result.totalHosts.toLocaleString()}           />
            <Row label="Usable Hosts"       value={result.usableHosts.toLocaleString()}  highlight />
            <Row label="IP Class"           value={result.ipClass}                               />
            <Row label="Address Type"       value={result.isPrivate ? `Private — ${result.privateRange}` : "Public"} />

            {/* Binary section */}
            {showBin && (
              <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
                <BinRow label="IP Address"    value={result.ipBin}        prefix={result.prefix} />
                <BinRow label="Subnet Mask"   value={result.maskBin}      prefix={result.prefix} />
                <BinRow label="Network Addr"  value={result.networkBin}   prefix={result.prefix} />
                <BinRow label="Broadcast"     value={result.broadcastBin} />
              </div>
            )}

            {/* Visual host bar */}
            <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/35">Address space</span>
                <span className="text-[10px] font-mono text-white/40">{result.totalHosts.toLocaleString()} total</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden gap-px">
                <div className="bg-cyan-500/60 flex items-center justify-center" style={{ width: "calc(1px * 1)" }} title="Network" />
                <div className="bg-violet-500/40 flex-1" title="Usable hosts" />
                <div className="bg-rose-500/40" style={{ width: "2px" }} title="Broadcast" />
              </div>
              <div className="flex justify-between mt-1 text-[9px] text-white/25">
                <span>Network ({result.networkAddr})</span>
                <span>{result.usableHosts.toLocaleString()} usable</span>
                <span>Broadcast ({result.broadcastAddr})</span>
              </div>
            </div>

            <SubnetList networkAddr={result.networkAddr} prefix={result.prefix} />
          </div>
        )}
      </div>
    </div>
  );
}
