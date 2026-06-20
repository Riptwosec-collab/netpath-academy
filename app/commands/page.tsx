"use client";
import { useState } from "react";
import { Copy, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const COMMANDS = [
  { cat: "Interface",  cmd: "show ip interface brief",          desc: "แสดง IP + Status ทุก interface" },
  { cat: "Interface",  cmd: "show interfaces gi0/0",            desc: "รายละเอียด interface เดียว (errors, bandwidth)" },
  { cat: "Interface",  cmd: "interface GigabitEthernet0/0",     desc: "เข้า interface config mode" },
  { cat: "Interface",  cmd: "ip address 192.168.1.1 255.255.255.0", desc: "กำหนด IP address" },
  { cat: "Interface",  cmd: "no shutdown",                      desc: "เปิด interface (ค่า default = shutdown)" },
  { cat: "Interface",  cmd: "shutdown",                         desc: "ปิด interface" },
  { cat: "Interface",  cmd: "description Link to Core",         desc: "ใส่ description บน interface" },
  { cat: "Routing",    cmd: "show ip route",                    desc: "แสดง Routing Table ทั้งหมด" },
  { cat: "Routing",    cmd: "show ip route ospf",               desc: "แสดงเฉพาะ OSPF routes" },
  { cat: "Routing",    cmd: "show ip route bgp",                desc: "แสดงเฉพาะ BGP routes" },
  { cat: "Routing",    cmd: "ip route 0.0.0.0 0.0.0.0 10.0.0.1", desc: "Default route ไปยัง next-hop" },
  { cat: "OSPF",       cmd: "router ospf 1",                   desc: "เปิด OSPF process 1" },
  { cat: "OSPF",       cmd: "router-id 1.1.1.1",               desc: "กำหนด Router ID" },
  { cat: "OSPF",       cmd: "network 10.0.0.0 0.255.255.255 area 0", desc: "Advertise network เข้า OSPF area 0" },
  { cat: "OSPF",       cmd: "show ip ospf neighbor",           desc: "ตรวจสอบ OSPF Neighbor (ต้องเห็น FULL)" },
  { cat: "OSPF",       cmd: "show ip ospf",                    desc: "แสดง OSPF process info + Area" },
  { cat: "BGP",        cmd: "router bgp 65001",                desc: "เปิด BGP process AS 65001" },
  { cat: "BGP",        cmd: "neighbor 10.0.0.2 remote-as 65002", desc: "เพิ่ม BGP neighbor" },
  { cat: "BGP",        cmd: "network 172.16.0.0 mask 255.255.255.0", desc: "Advertise prefix เข้า BGP" },
  { cat: "BGP",        cmd: "show bgp summary",                desc: "ดู BGP neighbor status + prefix count" },
  { cat: "BGP",        cmd: "show ip bgp",                     desc: "ดู BGP RIB ทั้งหมด" },
  { cat: "VLAN",       cmd: "vlan 10",                         desc: "สร้าง VLAN 10" },
  { cat: "VLAN",       cmd: "name Sales",                      desc: "ตั้งชื่อ VLAN" },
  { cat: "VLAN",       cmd: "show vlan brief",                 desc: "ดู VLAN ทั้งหมดและ ports" },
  { cat: "VLAN",       cmd: "switchport mode trunk",           desc: "ตั้ง port เป็น trunk" },
  { cat: "VLAN",       cmd: "switchport mode access",          desc: "ตั้ง port เป็น access" },
  { cat: "VLAN",       cmd: "switchport access vlan 10",       desc: "Assign port เข้า VLAN 10" },
  { cat: "VLAN",       cmd: "show interfaces trunk",           desc: "ดู trunk ports และ allowed VLANs" },
  { cat: "ACL",        cmd: "ip access-list extended BLOCK_WEB", desc: "สร้าง Named Extended ACL" },
  { cat: "ACL",        cmd: "permit tcp 192.168.1.0 0.0.0.255 any eq 80", desc: "อนุญาต HTTP จาก subnet" },
  { cat: "ACL",        cmd: "deny ip any any log",             desc: "Deny ทุก traffic (พร้อม log)" },
  { cat: "ACL",        cmd: "ip access-group 100 in",         desc: "Apply ACL 100 บน interface inbound" },
  { cat: "ACL",        cmd: "show access-lists",               desc: "ดู ACL ทั้งหมดและ match counters" },
  { cat: "Security",   cmd: "enable secret cisco123",          desc: "ตั้ง Enable password (encrypted)" },
  { cat: "Security",   cmd: "service password-encryption",     desc: "Encrypt passwords ใน config" },
  { cat: "Security",   cmd: "username admin privilege 15 secret cisco", desc: "สร้าง local user" },
  { cat: "Security",   cmd: "line vty 0 4",                   desc: "เข้า VTY line config" },
  { cat: "Security",   cmd: "login local",                     desc: "ใช้ local database สำหรับ SSH/Telnet login" },
  { cat: "Security",   cmd: "transport input ssh",             desc: "อนุญาตเฉพาะ SSH (ปิด Telnet)" },
  { cat: "Debug",      cmd: "debug ip ospf events",            desc: "Debug OSPF events (ปิดด้วย undebug all)" },
  { cat: "Debug",      cmd: "debug ip bgp updates",            desc: "Debug BGP update messages" },
  { cat: "Debug",      cmd: "debug ip packet",                 desc: "Debug IP packets (ระวัง: CPU intensive)" },
  { cat: "Debug",      cmd: "undebug all",                     desc: "ปิด debug ทั้งหมด" },
  { cat: "Save",       cmd: "copy running-config startup-config", desc: "บันทึก config (หรือ: write)" },
  { cat: "Save",       cmd: "show running-config",             desc: "ดู config ปัจจุบัน" },
  { cat: "Save",       cmd: "show startup-config",             desc: "ดู config ที่ boot ขึ้นมา" },
  { cat: "Save",       cmd: "erase startup-config",            desc: "ลบ startup config (factory reset)" },
];

const categories = Array.from(new Set(COMMANDS.map(c => c.cat)));

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-white/30 hover:text-cyan-400">
      {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CommandsPage() {
  const [search, setSearch]   = useState("");
  const [active, setActive]   = useState("All");

  const filtered = COMMANDS.filter(c => {
    const matchCat = active === "All" || c.cat === active;
    const matchQ   = !search || c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const grouped = categories.reduce((acc, cat) => {
    const items = filtered.filter(c => c.cat === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {} as Record<string, typeof COMMANDS>);

  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white/90">📋 Command Reference</h1>
        <p className="text-xs text-white/35 mt-0.5">Cisco IOS commands พร้อมคำอธิบาย — hover เพื่อ copy</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาคำสั่ง..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm text-white/70 placeholder:text-white/20 outline-none focus:border-cyan-500/30" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all border",
              active === cat ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" : "bg-white/[0.03] text-white/30 border-white/[0.07] hover:border-white/20 hover:text-white/55")}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, cmds]) => (
          <div key={cat}>
            <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-2">{cat}</h2>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {cmds.map((c, i) => (
                <div key={i} className={cn("group flex items-center gap-4 px-4 py-2.5 hover:bg-white/[0.03] transition-colors", i > 0 && "border-t border-white/[0.04]")}>
                  <code className="text-[13px] font-mono text-cyan-300/80 flex-shrink-0 min-w-0 truncate max-w-xs">{c.cmd}</code>
                  <span className="text-xs text-white/35 flex-1">{c.desc}</span>
                  <CopyBtn text={c.cmd} />
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-white/25 py-10">ไม่พบคำสั่งที่ตรงกัน</p>
        )}
      </div>
    </div>
  );
}
