"use client";
import { useState } from "react";

type FlowStep = {
  step: number;
  device: string;
  action: string;
  detail: string;
  color: string;
  icon: string; // SVG path
};

const FLOWS: Record<string, { label: string; steps: FlowStep[] }> = {
  "pc-to-internet": {
    label: "PC → Internet",
    steps: [
      { step:1, device:"PC",      action:"Generate Packet",       detail:"App สร้าง HTTP Request ไป 8.8.8.8:80 → TCP SYN",                    color:"#38bdf8", icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      { step:2, device:"PC NIC",  action:"ARP for Gateway",       detail:"ไม่รู้ MAC ของ GW 192.168.1.1 → ส่ง ARP Request broadcast",        color:"#38bdf8", icon:"M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
      { step:3, device:"Switch",  action:"Forward ARP",           detail:"Flood ARP ออกทุก Port ยกเว้น Port ที่รับมา",                       color:"#8b5cf6", icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
      { step:4, device:"Router",  action:"ARP Reply + Route",     detail:"R1 ตอบ ARP Reply ด้วย MAC ของตัวเอง แล้วดู Routing Table",        color:"#22c55e", icon:"M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14v-4H7l5-8 5 8h-4v4h-2z" },
      { step:5, device:"Router",  action:"NAT / Forward",         detail:"R1 ทำ NAT แปลง Src IP เป็น Public IP แล้วส่งออก WAN Port",       color:"#22c55e", icon:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
      { step:6, device:"Firewall","action":"ACL Check",            detail:"FW ตรวจสอบ ACL Policy — Permit TCP dst:80 → Allow",              color:"#f97316", icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
      { step:7, device:"Internet","action":"Packet Delivered",     detail:"Packet ถึง Destination Server 8.8.8.8 บน Port 80",               color:"#facc15", icon:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    ],
  },
  "vlan-to-vlan": {
    label: "VLAN 10 → VLAN 20",
    steps: [
      { step:1, device:"PC (V10)","action":"Packet to GW",         detail:"PC ใน VLAN 10 ส่ง Packet ไป 192.168.20.x → Dest อยู่คนละ Subnet → ส่งไป Default GW",  color:"#38bdf8", icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      { step:2, device:"Switch",  action:"Tag VLAN 10",            detail:"SW Access Port Untag → เข้า Trunk เพิ่ม 802.1Q Tag VLAN 10",                              color:"#8b5cf6", icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
      { step:3, device:"Router",  action:"Receive Sub-int Gi0/0.10","detail":"R1 รับ Packet บน Sub-interface .10 ทำ Inter-VLAN Routing ดู Route ไป 192.168.20.0/24",  color:"#22c55e", icon:"M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14v-4H7l5-8 5 8h-4v4h-2z" },
      { step:4, device:"Router",  action:"Forward via Gi0/0.20",   detail:"ส่ง Packet ออก Sub-interface .20 ใส่ Tag VLAN 20 กลับไป Trunk",                           color:"#22c55e", icon:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
      { step:5, device:"Switch",  action:"Untag → Access Port",    detail:"SW รับ Trunk Frame VLAN 20 → Strip Tag → ส่งออก Access Port ปลายทาง",                     color:"#8b5cf6", icon:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
      { step:6, device:"PC (V20)","action":"Receive Packet",        detail:"PC ใน VLAN 20 รับ Packet สำเร็จ",                                                          color:"#facc15", icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    ],
  },
};

export default function PacketFlowViewer() {
  const [flow, setFlow]   = useState<string>("pc-to-internet");
  const [active, setActive] = useState<number | null>(null);

  const { steps } = FLOWS[flow];

  return (
    <div className="space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(FLOWS).map(([key, f]) => (
          <button key={key} onClick={() => { setFlow(key); setActive(null); }}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              flow === key
                ? "bg-[#ef4444]/15 border-[#ef4444]/40 text-[#ef4444]"
                : "bg-white/[0.03] border-white/[0.08] text-white/35 hover:border-white/20"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2">
        {steps.map((s) => {
          const isActive = active === s.step;
          return (
            <button key={s.step} onClick={() => setActive(isActive ? null : s.step)}
              className={`text-left rounded-xl border px-4 py-3 transition-all ${
                isActive ? "border-opacity-50 bg-opacity-10" : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
              style={isActive ? { borderColor: s.color, backgroundColor: `${s.color}08` } : {}}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                     style={{ backgroundColor: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}>
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold" style={{ color: `${s.color}80` }}>{s.device}</span>
                    <span className="text-xs font-medium text-white/70">{s.action}</span>
                  </div>
                  {isActive && <p className="text-xs text-white/40 mt-1 leading-relaxed">{s.detail}</p>}
                </div>
                <svg className={`w-4 h-4 text-white/20 flex-shrink-0 transition-transform ${isActive ? "rotate-90" : ""}`}
                     fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-white/20">คลิก Step เพื่อดูรายละเอียด</p>
    </div>
  );
}
