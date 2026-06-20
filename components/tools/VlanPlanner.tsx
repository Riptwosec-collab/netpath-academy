"use client";
import { useState } from "react";
import { calculateSubnet, validateIpv4 } from "@/lib/networkCalculations";

type VlanRow = {
  id: number;
  vlanId: string;
  name: string;
  subnet: string;
  cidr: string;
  gateway: string;
  description: string;
};

const INITIAL: VlanRow[] = [
  { id: 1, vlanId: "10", name: "Management", subnet: "192.168.10.0", cidr: "24", gateway: "192.168.10.1", description: "Management VLAN" },
  { id: 2, vlanId: "20", name: "Users",      subnet: "192.168.20.0", cidr: "24", gateway: "192.168.20.1", description: "User VLAN" },
  { id: 3, vlanId: "30", name: "Servers",    subnet: "192.168.30.0", cidr: "24", gateway: "192.168.30.1", description: "Server VLAN" },
];

const COLORS = ["#38bdf8","#8b5cf6","#22c55e","#f97316","#facc15","#ef4444"];

let _nextId = 4;
function nextId() { return _nextId++; }

export default function VlanPlanner() {
  const [vlans, setVlans] = useState<VlanRow[]>(INITIAL);
  const [showConfig, setShowConfig] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (id: number, field: keyof VlanRow, value: string) =>
    setVlans((p) => p.map((v) => v.id === id ? { ...v, [field]: value } : v));

  const addVlan = () => {
    const id = nextId();
    setVlans((p) => [...p, { id, vlanId: String(id * 10), name: "New VLAN", subnet: "192.168.0.0", cidr: "24", gateway: "192.168.0.1", description: "" }]);
  };

  const removeVlan = (id: number) => setVlans((p) => p.filter((v) => v.id !== id));

  const getUsableHosts = (v: VlanRow) => {
    if (!validateIpv4(v.subnet)) return "-";
    const cidrNum = parseInt(v.cidr, 10);
    if (isNaN(cidrNum) || cidrNum < 1 || cidrNum > 32) return "-";
    try { return calculateSubnet(v.subnet, cidrNum).usableHosts.toLocaleString(); } catch { return "-"; }
  };

  const generateConfig = () => {
    return vlans.map((v) => {
      const c = parseInt(v.cidr);
      let mask = "255.255.255.0";
      try { const r = calculateSubnet(v.subnet, c); mask = r.subnetMask; } catch {}
      return `! VLAN ${v.vlanId} — ${v.name}\nvlan ${v.vlanId}\n name ${v.name}\n!\ninterface Vlan${v.vlanId}\n description ${v.description || v.name}\n ip address ${v.gateway} ${mask}\n no shutdown`;
    }).join("\n!\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateConfig()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* VLAN Table */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <span className="text-xs font-semibold text-white/60">VLAN Table</span>
          <button onClick={addVlan}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#8b5cf6]/15 border border-[#8b5cf6]/35 text-[#8b5cf6] hover:bg-[#8b5cf6]/25 transition-all">
            + Add VLAN
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["","VLAN ID","Name","Subnet","CIDR","Gateway","Usable Hosts",""].map((h, i) => (
                  <th key={i} className="px-3 py-2.5 text-left text-[10px] text-white/25 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {vlans.map((v, i) => {
                const color = COLORS[i % COLORS.length];
                return (
                  <tr key={v.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="pl-3 pr-0 py-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    </td>
                    {(["vlanId","name","subnet","cidr","gateway"] as const).map((field) => (
                      <td key={field} className="px-2 py-1.5">
                        <input value={v[field]} onChange={(e) => update(v.id, field, e.target.value)}
                          className="w-full min-w-[60px] rounded-lg bg-white/[0.04] border border-white/[0.08] px-2 py-1
                                     text-xs text-white/70 font-mono focus:outline-none focus:border-[#8b5cf6]/40 transition-all" />
                      </td>
                    ))}
                    <td className="px-3 py-2 text-white/40 font-mono">{getUsableHosts(v)}</td>
                    <td className="px-3 py-2">
                      <button onClick={() => removeVlan(v.id)} className="text-[#ef4444]/30 hover:text-[#ef4444]/70 transition-colors text-xs">
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Config Output */}
      <button onClick={() => setShowConfig((p) => !p)}
        className="w-full py-2.5 rounded-xl border border-[#8b5cf6]/25 text-[#8b5cf6]/70 text-xs hover:border-[#8b5cf6]/40 hover:text-[#8b5cf6] transition-all">
        {showConfig ? "▲ ซ่อน" : "▼ Generate Cisco Config"}
      </button>

      {showConfig && (
        <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <span className="text-[10px] text-white/25 font-mono uppercase">VLAN Config</span>
            <button onClick={handleCopy} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
              {copied ? <span className="text-[#22c55e]">✓ Copied</span> : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs">
            <code className="text-[#38bdf8]/70 font-mono">{generateConfig()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
