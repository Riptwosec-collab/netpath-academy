"use client";

import { useState } from "react";

const LAYERS = [
  {
    num: 7, name: "Application", nameTh: "แอปพลิเคชัน",
    pdu: "Data", color: "violet",
    protocols: ["HTTP/HTTPS","FTP","SMTP","DNS","DHCP","SSH","Telnet","SNMP"],
    devices: ["PC","Server","Firewall (L7)"],
    function: "บริการที่ผู้ใช้โต้ตอบโดยตรง — web browser, email client, file transfer",
    encapsulation: "Application Data",
    example: "เมื่อคุณพิมพ์ URL ใน browser → HTTP GET request เกิดที่ Layer 7",
    mnemonic: "All",
  },
  {
    num: 6, name: "Presentation", nameTh: "พรีเซนเตชัน",
    pdu: "Data", color: "fuchsia",
    protocols: ["SSL/TLS","JPEG","MPEG","ASCII","EBCDIC","GIF","PNG"],
    devices: ["Application gateway"],
    function: "แปลงรูปแบบข้อมูล, เข้ารหัส/ถอดรหัส, บีบอัดข้อมูล",
    encapsulation: "Formatted / Encrypted Data",
    example: "HTTPS ใช้ TLS ที่ Layer 6 เพื่อเข้ารหัสข้อมูลก่อนส่ง",
    mnemonic: "People",
  },
  {
    num: 5, name: "Session", nameTh: "เซสชัน",
    pdu: "Data", color: "pink",
    protocols: ["NetBIOS","PPTP","RPC","SIP","H.323"],
    devices: ["PC","Server"],
    function: "สร้าง รักษา และยุติ session ระหว่าง application — จัดการ dialog control",
    encapsulation: "Session Data",
    example: "Video call บน Teams ใช้ SIP/H.323 ที่ Layer 5 เพื่อจัดการ call session",
    mnemonic: "Seem",
  },
  {
    num: 4, name: "Transport", nameTh: "ทรานสปอร์ต",
    pdu: "Segment (TCP) / Datagram (UDP)", color: "blue",
    protocols: ["TCP","UDP","SCTP","QUIC"],
    devices: ["Firewall (stateful)","Load balancer"],
    function: "ส่งข้อมูลแบบ end-to-end, จัดการ port, flow control, error recovery (TCP)",
    encapsulation: "TCP/UDP Header + Data",
    example: "TCP Handshake (SYN→SYN-ACK→ACK) เกิดที่ Layer 4 ก่อนส่ง HTTP",
    mnemonic: "To",
  },
  {
    num: 3, name: "Network", nameTh: "เน็ตเวิร์ก",
    pdu: "Packet", color: "cyan",
    protocols: ["IPv4","IPv6","ICMP","OSPF","BGP","RIP","EIGRP"],
    devices: ["Router","L3 Switch","Firewall"],
    function: "กำหนด logical address (IP), routing ข้ามเครือข่าย, path selection",
    encapsulation: "IP Header (src/dst IP) + Segment",
    example: "Router ดู destination IP แล้วเลือก path ที่ดีที่สุดผ่าน routing table",
    mnemonic: "Need",
  },
  {
    num: 2, name: "Data Link", nameTh: "ดาต้าลิงก์",
    pdu: "Frame", color: "green",
    protocols: ["Ethernet","Wi-Fi (802.11)","PPP","HDLC","STP","VLANs (802.1Q)","ARP"],
    devices: ["Switch","Bridge","WAP","NIC"],
    function: "ส่งข้อมูลระหว่าง node ที่อยู่ติดกัน, MAC address, error detection (CRC)",
    encapsulation: "Ethernet Header (src/dst MAC) + Packet + FCS",
    example: "Switch อ่าน destination MAC จาก frame header เพื่อ forward ไปยัง port ที่ถูกต้อง",
    mnemonic: "Data",
  },
  {
    num: 1, name: "Physical", nameTh: "ฟิสิคัล",
    pdu: "Bit", color: "amber",
    protocols: ["Ethernet (cable)","Wi-Fi","Fiber","Bluetooth","USB","DSL"],
    devices: ["Hub","Repeater","Cable","NIC","Modem"],
    function: "แปลง bit เป็น signal ไฟฟ้า/แสง/คลื่นวิทยุ — voltage, timing, cable specs",
    encapsulation: "Bits (0/1)",
    example: "Cat6 cable ส่ง electrical signal 10Gbps, fiber ส่งด้วยแสง, Wi-Fi ส่งคลื่นวิทยุ",
    mnemonic: "Please",
  },
] as const;

const COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  violet: { bg: "bg-violet-500/10",  border: "border-violet-500/30",  text: "text-violet-300",  dot: "bg-violet-500" },
  fuchsia:{ bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-300", dot: "bg-fuchsia-500" },
  pink:   { bg: "bg-pink-500/10",    border: "border-pink-500/30",    text: "text-pink-300",    dot: "bg-pink-500" },
  blue:   { bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-300",    dot: "bg-blue-500" },
  cyan:   { bg: "bg-cyan-500/10",    border: "border-cyan-500/30",    text: "text-cyan-300",    dot: "bg-cyan-500" },
  green:  { bg: "bg-green-500/10",   border: "border-green-500/30",   text: "text-green-300",   dot: "bg-green-500" },
  amber:  { bg: "bg-amber-500/10",   border: "border-amber-500/30",   text: "text-amber-300",   dot: "bg-amber-500" },
};

export default function OsiExplorer() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [mode, setMode] = useState<"layers" | "encap">("layers");

  const active = LAYERS.find(l => l.num === activeLayer);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-gradient-to-r from-violet-500/[0.06] to-cyan-500/[0.04]">
        <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-sm">🌐</div>
        <div>
          <p className="text-xs font-bold text-white/80">OSI Model Explorer</p>
          <p className="text-[10px] text-white/35">คลิก layer เพื่อดู protocol, device และตัวอย่าง</p>
        </div>
        <div className="ml-auto flex gap-1">
          {(["layers","encap"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${mode===m ? "bg-violet-500/15 border-violet-500/30 text-violet-300" : "bg-white/[0.04] border-white/[0.07] text-white/35 hover:text-white/60"}`}>
              {m === "layers" ? "Layers" : "Encapsulation"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col lg:flex-row gap-4">
        {/* Layer stack */}
        <div className="flex flex-col gap-1 lg:w-52 flex-shrink-0">
          <p className="text-[10px] text-white/30 mb-1 font-semibold uppercase tracking-wider">
            Mnemonic: "All People Seem To Need Data Please"
          </p>
          {LAYERS.map(layer => {
            const c = COLORS[layer.color];
            const isActive = activeLayer === layer.num;
            return (
              <button key={layer.num} onClick={() => setActiveLayer(isActive ? null : layer.num)}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition-all ${
                  isActive ? `${c.bg} ${c.border}` : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.10]"
                }`}>
                <span className={`text-[10px] font-bold w-3 ${isActive ? c.text : "text-white/25"}`}>{layer.num}</span>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                <div className="min-w-0">
                  <p className={`text-xs font-semibold truncate ${isActive ? c.text : "text-white/60"}`}>{layer.name}</p>
                  <p className="text-[9px] text-white/25 truncate">{layer.pdu}</p>
                </div>
                <span className="ml-auto text-[9px] text-white/20 font-mono">{layer.mnemonic}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0">
          {mode === "layers" && !active && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="text-3xl mb-3">🌐</div>
              <p className="text-sm text-white/40">คลิก layer ด้านซ้ายเพื่อดูรายละเอียด</p>
              <p className="text-xs text-white/20 mt-1">OSI มี 7 layers — แต่ละ layer มีหน้าที่เฉพาะ</p>
            </div>
          )}

          {mode === "layers" && active && (() => {
            const c = COLORS[active.color];
            return (
              <div className={`rounded-xl border ${c.border} ${c.bg} p-4 space-y-3 h-full`}>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-black ${c.text}`}>L{active.num}</span>
                  <div>
                    <p className={`text-sm font-bold ${c.text}`}>{active.name} Layer</p>
                    <p className="text-[10px] text-white/35">{active.nameTh} · PDU: {active.pdu}</p>
                  </div>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{active.function}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                    <p className="text-[10px] font-semibold text-white/40 mb-2 uppercase tracking-wider">Protocols</p>
                    <div className="flex flex-wrap gap-1">
                      {active.protocols.map(p => (
                        <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded border ${c.border} ${c.bg} ${c.text} font-mono`}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                    <p className="text-[10px] font-semibold text-white/40 mb-2 uppercase tracking-wider">Devices</p>
                    <div className="flex flex-wrap gap-1">
                      {active.devices.map(d => (
                        <span key={d} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-white/50">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-black/20 border border-white/[0.06] p-3">
                  <p className="text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Encapsulation</p>
                  <p className="text-xs font-mono text-white/55">{active.encapsulation}</p>
                </div>

                <div className={`rounded-lg ${c.bg} border ${c.border} p-3`}>
                  <p className="text-[10px] font-semibold text-white/40 mb-1 uppercase tracking-wider">💡 ตัวอย่าง</p>
                  <p className="text-xs text-white/65 leading-relaxed">{active.example}</p>
                </div>
              </div>
            );
          })()}

          {mode === "encap" && (
            <div className="space-y-2">
              <p className="text-[10px] text-white/35 mb-3">กระบวนการ Encapsulation เมื่อส่ง HTTP request</p>
              {LAYERS.map((layer, i) => {
                const c = COLORS[layer.color];
                const headers = LAYERS.slice(i).map(l => l.name.slice(0,3).toUpperCase()).reverse();
                return (
                  <div key={layer.num} className={`rounded-lg border ${c.border} ${c.bg} p-2.5`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold ${c.text}`}>L{layer.num} {layer.name}</span>
                      <span className="text-[9px] text-white/30">adds {layer.pdu}</span>
                    </div>
                    <div className="flex items-center gap-0.5 flex-wrap">
                      {LAYERS.slice(i).map((hl, hi) => {
                        const hc = COLORS[hl.color];
                        const isNew = hi === 0;
                        return (
                          <span key={hl.num} className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${isNew ? `${hc.bg} ${hc.border} ${hc.text} font-bold` : "bg-white/[0.03] border-white/[0.05] text-white/30"}`}>
                            {hl.name.slice(0,3)}
                          </span>
                        );
                      })}
                      <span className="text-[9px] text-white/20 ml-1 font-mono">DATA</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
