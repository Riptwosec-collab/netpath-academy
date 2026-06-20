import Link from "next/link";
import { Lock, CheckCircle2, CircleDot, ArrowRight } from "lucide-react";
import type { RoadmapLevel, RoadmapStatus } from "@/types";

// Mock preview data (10 levels)
const levels: Pick<RoadmapLevel, "level" | "title" | "description" | "skills" | "status">[] = [
  { level: 1,  title: "Network Foundation",      description: "OSI, TCP/IP, IP, Subnetting, Gateway, DNS, DHCP",       skills: ["OSI Model", "TCP/IP", "IP Address", "Subnetting", "DNS", "DHCP"],        status: "completed"  },
  { level: 2,  title: "Switching",               description: "VLAN, Trunk, STP, EtherChannel, Port Security",          skills: ["VLAN", "Trunk Port", "STP", "RSTP", "EtherChannel"],                    status: "in-progress"},
  { level: 3,  title: "Routing",                 description: "Static Route, OSPF, EIGRP, BGP พื้นฐาน, Route Policy",  skills: ["Static Route", "OSPF", "EIGRP", "BGP", "Route Policy"],                  status: "locked"     },
  { level: 4,  title: "Network Services",         description: "DHCP Server, NAT/PAT, ACL, NTP, Syslog, SNMP",          skills: ["DHCP Server", "NAT/PAT", "ACL", "NTP", "SNMP"],                         status: "locked"     },
  { level: 5,  title: "Network Security",         description: "Firewall, VPN, IDS/IPS, 802.1X, RADIUS",               skills: ["Firewall", "VPN Site-to-Site", "IPSec", "802.1X", "RADIUS"],             status: "locked"     },
  { level: 6,  title: "Wireless Network",         description: "WiFi Standards, WLC, SSID, Roaming, Security",          skills: ["802.11ac", "WLC", "SSID", "Roaming", "WPA3"],                           status: "locked"     },
  { level: 7,  title: "Monitoring & Operations",  description: "SNMP, NetFlow, Syslog, Zabbix, Grafana, SLA",           skills: ["SNMP", "NetFlow", "Syslog", "Zabbix", "Grafana"],                       status: "locked"     },
  { level: 8,  title: "Network Automation",       description: "Python, Netmiko, NAPALM, Ansible, REST API",            skills: ["Python", "Netmiko", "NAPALM", "Ansible", "REST API"],                   status: "locked"     },
  { level: 9,  title: "Cloud & Modern Network",   description: "AWS VPC, Azure Vnet, SD-WAN, SASE, Zero Trust",         skills: ["AWS VPC", "Azure VNet", "SD-WAN", "SASE", "Zero Trust"],                status: "locked"     },
  { level: 10, title: "Senior Network Engineer",  description: "Enterprise Design, High Availability, Business Continuity", skills: ["Enterprise Design", "HA", "MPLS", "BGP Advanced", "Tech Lead"],     status: "locked"     },
];

const statusConfig: Record<RoadmapStatus, { icon: React.ReactNode; badge: string; bg: string; border: string }> = {
  completed:   { icon: <CheckCircle2 size={14} className="text-emerald-400" />, badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",   bg: "bg-emerald-500/5",  border: "border-emerald-500/20" },
  "in-progress":{ icon: <CircleDot   size={14} className="text-cyan-400"    />, badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",           bg: "bg-cyan-500/5",     border: "border-cyan-500/20"    },
  locked:      { icon: <Lock         size={14} className="text-white/20"    />, badge: "bg-white/5 text-white/30 border-white/10",                  bg: "bg-white/[0.02]",   border: "border-white/[0.06]"   },
};

function LevelCard({ item }: { item: (typeof levels)[0] }) {
  const cfg = statusConfig[item.status];
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-4 flex gap-3`}>
      {/* Level number */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl border ${cfg.border} flex items-center justify-center`}>
        <span className={`text-sm font-bold ${item.status === "locked" ? "text-white/20" : item.status === "completed" ? "text-emerald-400" : "text-cyan-400"}`}>
          {item.level}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm font-semibold truncate ${item.status === "locked" ? "text-white/30" : "text-white/85"}`}>
            {item.title}
          </h3>
          <span className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${cfg.badge}`}>
            {cfg.icon}
            {item.status === "completed" ? "Done" : item.status === "in-progress" ? "Active" : "Locked"}
          </span>
        </div>
        <p className={`text-xs ${item.status === "locked" ? "text-white/20" : "text-white/35"} mb-2 leading-relaxed`}>
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.skills.slice(0, 3).map((s) => (
            <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded border ${item.status === "locked" ? "border-white/[0.06] text-white/15" : "border-white/10 text-white/30"}`}>
              {s}
            </span>
          ))}
          {item.skills.length > 3 && (
            <span className="text-[10px] text-white/20">+{item.skills.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPreview() {
  return (
    <section className="py-16 bg-white/[0.01]">
      <div className="page-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Roadmap</p>
            <h2 className="text-3xl font-bold text-white">10 Levels to Master</h2>
            <p className="text-white/40 mt-2 text-sm">ครอบคลุมทุกทักษะที่ Network Engineer ต้องรู้</p>
          </div>
          <Link
            href="/roadmap"
            className="hidden sm:flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            View Full Roadmap
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {levels.map((item) => (
            <LevelCard key={item.level} item={item} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium"
          >
            View Full Roadmap <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
