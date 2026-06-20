"use client";
import { useState } from "react";

type CommandEntry = { label: string; cmd: string; desc: string };
type CategoryData = { label: string; color: string; symptoms: { label: string; commands: CommandEntry[] }[] };

const DB: Record<string, CategoryData> = {
  connectivity: {
    label: "Connectivity",
    color: "#38bdf8",
    symptoms: [
      { label: "Ping ไม่ได้",
        commands: [
          { label: "Ping Gateway", cmd: "ping 192.168.1.1", desc: "ทดสอบ connectivity ถึง Default Gateway" },
          { label: "Ping Loopback", cmd: "ping 127.0.0.1", desc: "ทดสอบว่า TCP/IP Stack ทำงาน" },
          { label: "Show IP Interface Brief", cmd: "show ip interface brief", desc: "ดูสถานะ Interface ทั้งหมด" },
          { label: "Show Interface", cmd: "show interface GigabitEthernet0/0", desc: "ดู Error Counter และ Status" },
          { label: "Traceroute", cmd: "traceroute 8.8.8.8", desc: "ดู Path ที่ Packet ผ่าน" },
        ]},
      { label: "Interface Down",
        commands: [
          { label: "Show Interface Status", cmd: "show interface status", desc: "ดูสถานะ Port ทั้งหมดบน Switch" },
          { label: "Show Errors", cmd: "show interface GigabitEthernet0/1 counters errors", desc: "ดู Error บน Interface" },
          { label: "CDP Neighbor", cmd: "show cdp neighbors detail", desc: "ดูว่าเชื่อมต่อ Device อะไร" },
          { label: "No Shutdown", cmd: "interface Gi0/1\n no shutdown", desc: "เปิด Interface ที่ Shutdown อยู่" },
        ]},
    ]},
  routing: {
    label: "Routing",
    color: "#8b5cf6",
    symptoms: [
      { label: "Routing ไม่ถูก",
        commands: [
          { label: "Show IP Route", cmd: "show ip route", desc: "ดู Routing Table ทั้งหมด" },
          { label: "Show IP Route Summary", cmd: "show ip route summary", desc: "ดู Summary ของ Route แต่ละ Protocol" },
          { label: "Ping Source", cmd: "ping 10.0.0.1 source 192.168.1.1", desc: "Ping โดยกำหนด Source Interface" },
          { label: "Show IP Protocols", cmd: "show ip protocols", desc: "ดู Routing Protocol ที่ทำงานอยู่" },
        ]},
      { label: "OSPF ไม่ขึ้น Neighbor",
        commands: [
          { label: "OSPF Neighbor", cmd: "show ip ospf neighbor", desc: "ดู OSPF Adjacency State" },
          { label: "OSPF Database", cmd: "show ip ospf database", desc: "ดู LSDB" },
          { label: "OSPF Interface", cmd: "show ip ospf interface brief", desc: "ดู Interface ที่เข้าร่วม OSPF" },
          { label: "Debug OSPF Hello", cmd: "debug ip ospf hello", desc: "Monitor OSPF Hello Packet" },
        ]},
    ]},
  switching: {
    label: "Switching",
    color: "#22c55e",
    symptoms: [
      { label: "VLAN ไม่ผ่าน",
        commands: [
          { label: "Show VLAN Brief", cmd: "show vlan brief", desc: "ดู VLAN ที่มีอยู่ทั้งหมด" },
          { label: "Show Interface Trunk", cmd: "show interfaces trunk", desc: "ดู Trunk Link และ VLAN Allowed" },
          { label: "Show Interface Switchport", cmd: "show interface Gi0/1 switchport", desc: "ดู Mode Access/Trunk" },
          { label: "Show MAC Table", cmd: "show mac address-table", desc: "ดู MAC Address Table" },
        ]},
      { label: "STP Loop",
        commands: [
          { label: "Show STP", cmd: "show spanning-tree", desc: "ดู STP State ทุก VLAN" },
          { label: "Show STP Brief", cmd: "show spanning-tree brief", desc: "ดู Root Bridge และ Port State" },
          { label: "Show STP VLAN", cmd: "show spanning-tree vlan 10", desc: "ดู STP ใน VLAN เฉพาะ" },
          { label: "Debug STP", cmd: "debug spanning-tree events", desc: "Monitor STP Event" },
        ]},
    ]},
  security: {
    label: "Security",
    color: "#f97316",
    symptoms: [
      { label: "ACL Block Traffic",
        commands: [
          { label: "Show ACL", cmd: "show ip access-lists", desc: "ดู ACL ทั้งหมดและ Hit Count" },
          { label: "Show Interface ACL", cmd: "show ip interface Gi0/1", desc: "ดูว่า ACL Applied บน Interface ไหน" },
          { label: "Show Run ACL", cmd: "show running-config | section ip access-list", desc: "ดู ACL Config ทั้งหมด" },
          { label: "Clear ACL Counters", cmd: "clear ip access-list counters", desc: "Reset Hit Counter ทั้งหมด" },
        ]},
    ]},
};

export default function CommandGenerator() {
  const [category, setCategory] = useState<string>("connectivity");
  const [symptom,  setSymptom]  = useState<string>("");
  const [copied,   setCopied]   = useState<string>("");

  const cat = DB[category];
  const syms = cat?.symptoms ?? [];
  const commands = syms.find((s) => s.label === symptom)?.commands ?? [];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(cmd);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Category picker */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(DB).map(([key, c]) => (
          <button key={key} onClick={() => { setCategory(key); setSymptom(""); }}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              category === key
                ? "border-opacity-60 text-white/90"
                : "bg-white/[0.03] border-white/[0.08] text-white/35 hover:border-white/20"
            }`}
            style={category === key ? { borderColor: c.color, backgroundColor: `${c.color}15`, color: c.color } : {}}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Symptom picker */}
      <div>
        <p className="text-[10px] text-white/30 mb-2">เลือกอาการ</p>
        <div className="flex flex-wrap gap-2">
          {syms.map((s) => (
            <button key={s.label} onClick={() => setSymptom(s.label)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                symptom === s.label
                  ? "border-white/25 bg-white/[0.08] text-white/90"
                  : "border-white/[0.07] bg-white/[0.03] text-white/35 hover:border-white/20"
              }`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Commands */}
      {commands.length > 0 && (
        <div className="space-y-2">
          {commands.map((c) => (
            <div key={c.cmd} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/30 mb-1">{c.label}</p>
                  <pre className="text-sm font-mono text-[#38bdf8]/80 whitespace-pre-wrap break-all">{c.cmd}</pre>
                  <p className="text-[11px] text-white/35 mt-1.5">{c.desc}</p>
                </div>
                <button onClick={() => handleCopy(c.cmd)}
                  className="flex-shrink-0 text-[10px] px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/25 hover:text-white/60 hover:border-white/20 transition-all">
                  {copied === c.cmd ? <span className="text-[#22c55e]">✓</span> : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {symptom === "" && (
        <p className="text-center text-xs text-white/20 py-6">เลือกหมวดและอาการด้านบนเพื่อดูคำสั่ง</p>
      )}
    </div>
  );
}
