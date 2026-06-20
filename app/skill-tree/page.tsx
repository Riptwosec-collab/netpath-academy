"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle2, Circle, ChevronRight } from "lucide-react";

interface Skill {
  id:        string;
  label:     string;
  level:     number;    // column (1=far left)
  row:       number;    // row within column
  unlocked:  boolean;
  requires?: string[];
  href?:     string;
  color:     string;
}

const SKILLS: Skill[] = [
  /* Level 1 — Foundation */
  { id: "osi",      label: "OSI Model",          level: 1, row: 1, unlocked: true,  color: "cyan",    href: "/courses/network-fundamentals" },
  { id: "ip",       label: "IP Addressing",       level: 1, row: 2, unlocked: true,  color: "cyan",    href: "/courses/network-fundamentals" },
  { id: "subnet",   label: "Subnetting",          level: 1, row: 3, unlocked: true,  color: "cyan",    href: "/courses/network-fundamentals" },

  /* Level 2 — Routing & Switching basics */
  { id: "vlan",     label: "VLANs",               level: 2, row: 1, unlocked: true,  color: "blue",    requires: ["osi"],    href: "/labs/vlan-intervlan" },
  { id: "stp",      label: "STP",                 level: 2, row: 2, unlocked: true,  color: "blue",    requires: ["vlan"],   href: "/courses/network-fundamentals" },
  { id: "static",   label: "Static Routing",      level: 2, row: 3, unlocked: true,  color: "blue",    requires: ["ip"],     href: "/labs/basic-ip" },
  { id: "acl",      label: "ACL",                 level: 2, row: 4, unlocked: true,  color: "blue",    requires: ["ip"],     href: "/labs/acl-filtering" },

  /* Level 3 — IGP */
  { id: "ospf",     label: "OSPF",                level: 3, row: 1, unlocked: true,  color: "violet",  requires: ["static"], href: "/labs/ospf-single-area" },
  { id: "eigrp",    label: "EIGRP",               level: 3, row: 2, unlocked: false, color: "violet",  requires: ["static"] },
  { id: "nat",      label: "NAT / PAT",           level: 3, row: 3, unlocked: false, color: "violet",  requires: ["acl"] },
  { id: "vpn",      label: "VPN Basics",          level: 3, row: 4, unlocked: false, color: "violet",  requires: ["acl"] },

  /* Level 4 — Advanced */
  { id: "bgp",      label: "BGP",                 level: 4, row: 1, unlocked: false, color: "amber",   requires: ["ospf"],   href: "/labs/bgp-ebgp-config" },
  { id: "mpls",     label: "MPLS",                level: 4, row: 2, unlocked: false, color: "amber",   requires: ["ospf"] },
  { id: "ipv6",     label: "IPv6",                level: 4, row: 3, unlocked: false, color: "amber",   requires: ["ip"],     href: "/labs/ipv6-ospfv3-lab" },
  { id: "qos",      label: "QoS",                 level: 4, row: 4, unlocked: false, color: "amber",   requires: ["ospf"] },

  /* Level 5 — Expert */
  { id: "sdwan",    label: "SD-WAN",              level: 5, row: 1, unlocked: false, color: "rose",    requires: ["bgp","mpls"] },
  { id: "auto",     label: "Automation",          level: 5, row: 2, unlocked: false, color: "rose",    requires: ["bgp"],    href: "/labs/python-netmiko-lab" },
  { id: "sdn",      label: "SDN",                 level: 5, row: 3, unlocked: false, color: "rose",    requires: ["mpls"] },
  { id: "security", label: "Advanced Security",   level: 5, row: 4, unlocked: false, color: "rose",    requires: ["vpn"] },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/25",   text: "text-cyan-400",   dot: "bg-cyan-400" },
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/25",   text: "text-blue-400",   dot: "bg-blue-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-400", dot: "bg-violet-400" },
  amber:  { bg: "bg-amber-500/10",  border: "border-amber-500/25",  text: "text-amber-400",  dot: "bg-amber-400" },
  rose:   { bg: "bg-rose-500/10",   border: "border-rose-500/25",   text: "text-rose-400",   dot: "bg-rose-400" },
};

const levelLabels = ["", "Foundation", "Networking", "IGP Routing", "Advanced", "Expert"];

export default function SkillTreePage() {
  const [done, setDone] = useState<Set<string>>(new Set(["osi","ip","subnet","vlan","stp","static","acl","ospf"]));
  const levels = Array.from(new Set(SKILLS.map(s => s.level))).sort();

  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white/90">🌳 Skill Tree</h1>
        <p className="text-xs text-white/35 mt-0.5">ติดตาม skill ที่ unlock ได้ — กด skill เพื่อ toggle</p>
      </div>

      <div className="flex gap-3 text-[11px] text-white/30">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Available</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/20" /> Locked</span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {levels.map(lvl => (
            <div key={lvl} className="flex flex-col gap-4 w-40">
              <div className="text-center text-[10px] text-white/20 uppercase tracking-widest font-bold border-b border-white/[0.05] pb-2">
                {levelLabels[lvl]}
              </div>
              {SKILLS.filter(s => s.level === lvl).sort((a,b) => a.row - b.row).map(skill => {
                const isDone      = done.has(skill.id);
                const isUnlocked  = skill.unlocked || (skill.requires ?? []).every(r => done.has(r));
                const c           = colorMap[skill.color];
                const Wrapper     = skill.href && isUnlocked ? Link : "div";

                return (
                  <div key={skill.id} className="relative">
                    <Wrapper
                      href={skill.href ?? "#"}
                      onClick={() => { if (isUnlocked) setDone(d => { const n = new Set(d); if (n.has(skill.id)) n.delete(skill.id); else n.add(skill.id); return n; }); }}
                      className={cn(
                        "flex flex-col gap-1.5 p-3 rounded-xl border text-center cursor-pointer transition-all",
                        isDone   ? "border-emerald-500/30 bg-emerald-500/[0.07]" :
                        isUnlocked ? cn(c.border, c.bg, "hover:scale-105") :
                        "border-white/[0.05] bg-white/[0.02] opacity-40 cursor-not-allowed",
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {isDone        ? <CheckCircle2 size={12} className="text-emerald-400" /> :
                         isUnlocked    ? <Circle size={12} className={c.text} /> :
                                         <Lock size={12} className="text-white/20" />}
                        <span className={cn("text-xs font-semibold", isDone ? "text-emerald-400" : isUnlocked ? c.text : "text-white/20")}>
                          {skill.label}
                        </span>
                      </div>
                      {skill.href && isUnlocked && (
                        <div className="flex items-center justify-center gap-0.5 text-[9px] text-white/25">
                          Practice <ChevronRight size={8} />
                        </div>
                      )}
                    </Wrapper>
                    {/* Connector line to next level */}
                    {skill.requires && (
                      <div className="absolute top-1/2 -left-6 w-6 h-px bg-white/[0.08]" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Skills Unlocked", value: `${done.size}/${SKILLS.length}`, color: "text-cyan-400" },
          { label: "Current Level",   value: levelLabels[Math.max(...SKILLS.filter(s => done.has(s.id)).map(s => s.level), 1)], color: "text-violet-400" },
          { label: "Next Skill",      value: SKILLS.find(s => !done.has(s.id) && (s.requires ?? []).every(r => done.has(r)))?.label ?? "Expert!", color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] py-3 px-2">
            <div className={cn("text-sm font-bold", s.color)}>{s.value}</div>
            <div className="text-[10px] text-white/25 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
