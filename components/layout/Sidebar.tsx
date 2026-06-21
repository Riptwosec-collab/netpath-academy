"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getTotalXp, getStreak, touchStreak } from "@/lib/progress";
import {
  LayoutDashboard, Map, BookOpen, FlaskConical, Brain,
  Wrench, Bot, Trophy, FolderKanban, Network, Settings,
  Wifi, GraduationCap, Layers, Terminal, Award,
  ChevronDown, ChevronRight, Cpu, Shield, Antenna,
  HardDrive, Server, Zap, Radio, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────
interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
  collapsible?: boolean;
}

// ─── Navigation structure ─────────────────────────────────────────
const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard",   Icon: LayoutDashboard },
      { href: "/roadmap",   label: "Roadmap",     Icon: Map },
    ],
  },
  {
    label: "Foundation",
    collapsible: true,
    items: [
      { href: "/foundation",                    label: "Foundation Home",     Icon: BookOpen },
      { href: "/foundation/network-fundamentals", label: "Network Fundamentals", Icon: Network },
      { href: "/foundation/osi-tcpip",          label: "OSI / TCP-IP",        Icon: Layers },
      { href: "/foundation/ip-subnetting",      label: "IP / Subnetting",     Icon: Terminal },
      { href: "/foundation/switching",          label: "Switching",           Icon: HardDrive },
      { href: "/foundation/routing",            label: "Routing",             Icon: Map },
      { href: "/foundation/firewall-vpn",       label: "Firewall / VPN",      Icon: Shield },
      { href: "/foundation/wireless-basic",     label: "Wireless Basic",      Icon: Wifi },
      { href: "/foundation/monitoring-basic",   label: "Monitoring Basic",    Icon: Cpu },
      { href: "/foundation/troubleshooting-basic", label: "Troubleshooting",  Icon: Wrench },
      { href: "/foundation/documentation",      label: "Documentation",       Icon: FolderKanban },
    ],
  },
  {
    label: "Advanced Tracks",
    collapsible: true,
    items: [
      { href: "/advanced",                           label: "Advanced Home",         Icon: Award },
      { href: "/advanced/network-automation",       label: "Network Automation 🐍", Icon: Terminal },
      { href: "/advanced/ai-infrastructure",        label: "AI Infrastructure",     Icon: Cpu },
      { href: "/advanced/cloud-ai-ops",             label: "Cloud Native & AI Ops", Icon: Server },
      { href: "/advanced/wireless-mobile",          label: "Wireless & Mobile",     Icon: Radio },
      { href: "/advanced/security",                 label: "Modern Security",       Icon: Shield },
      { href: "/advanced/hardware-infrastructure",  label: "Network Hardware",      Icon: HardDrive },
    ],
  },
  {
    label: "Hardware",
    collapsible: true,
    items: [
      { href: "/hardware",                      label: "Hardware Home",         Icon: Server },
      { href: "/hardware/cabling",              label: "Cabling & Connectors",  Icon: Zap },
      { href: "/hardware/switching",            label: "Switch Hardware",       Icon: HardDrive },
      { href: "/hardware/routing",              label: "Router Hardware",       Icon: Map },
      { href: "/hardware/security",             label: "Firewall Appliances",   Icon: Shield },
      { href: "/hardware/wireless",             label: "Wireless Hardware",     Icon: Wifi },
      { href: "/hardware/datacenter",           label: "Data Center HW",        Icon: Server },
      { href: "/hardware/ai-gpu",               label: "AI/GPU Hardware",       Icon: Cpu },
      { href: "/hardware/monitoring",           label: "Monitoring / TAP",      Icon: Antenna },
      { href: "/hardware/power-rack-cooling",   label: "Power / Rack / Cooling",Icon: Zap },
      { href: "/hardware/isp-wan-edge",         label: "ISP / WAN / Edge",      Icon: Network },
      { href: "/hardware/voice-iot-ot",         label: "Voice / IoT / OT",      Icon: Radio },
    ],
  },
  {
    label: "Learning Tools",
    items: [
      { href: "/search",          label: "Search Lessons",  Icon: Network },
      { href: "/labs",            label: "Labs",            Icon: FlaskConical },
      { href: "/quiz",            label: "Quiz",            Icon: Brain },
      { href: "/exam",            label: "Exam Center",     Icon: GraduationCap },
      { href: "/flashcards",      label: "Flashcards",      Icon: Layers },
      { href: "/troubleshooting", label: "Troubleshooting", Icon: Wrench },
      { href: "/commands",        label: "Cheat Sheets",    Icon: Terminal },
      { href: "/ai-tutor",        label: "AI Tutor",        Icon: Bot },
      { href: "/tools",           label: "Tools",           Icon: Network },
    ],
  },
  {
    label: "Progress",
    items: [
      { href: "/progress",     label: "Progress",        Icon: Trophy },
      { href: "/portfolio",    label: "Portfolio",       Icon: FolderKanban },
      { href: "/skill-tree",   label: "Skill Tree",      Icon: Award },
      { href: "/career",       label: "Career Paths",    Icon: Map },
      { href: "/certifications", label: "Certifications",Icon: GraduationCap },
    ],
  },
];

// ─── Single nav link ──────────────────────────────────────────────
function NavLink({
  href, label, Icon, active, indent = false,
}: {
  href: string; label: string; Icon: LucideIcon; active: boolean; indent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-2.5 rounded-lg transition-all duration-150 group",
        indent ? "pl-6 pr-3 py-[6px] text-[12px]" : "px-3 py-[7px] text-[13px]",
        "font-medium",
        active
          ? "text-cyan-400 bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.18)]"
          : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400 rounded-full" />
      )}
      <Icon
        size={indent ? 13 : 15}
        className={active ? "text-cyan-400" : "text-white/35 group-hover:text-white/60"}
      />
      {label}
    </Link>
  );
}

// ─── Collapsible Group ────────────────────────────────────────────
function CollapsibleGroup({
  group, pathname,
}: {
  group: NavGroup; pathname: string;
}) {
  const isActive = group.items.some(i => pathname.startsWith(i.href) && i.href !== "/dashboard");
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-1 rounded-lg",
          "text-[10px] font-bold uppercase tracking-[0.15em] transition-colors",
          open ? "text-white/60" : "text-white/25 hover:text-white/40",
        )}
      >
        {group.label}
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
      </button>

      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5">
          {group.items.map(({ href, label, Icon }, i) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={pathname === href || (href !== "/foundation" && href !== "/advanced" && href !== "/hardware" && pathname.startsWith(href))}
              indent={i > 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();
  const [xp,     setXp]     = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    touchStreak();
    setXp(getTotalXp());
    setStreak(getStreak());
  }, []);

  const level  = xp < 500 ? "Intern" : xp < 1500 ? "Junior" : xp < 3000 ? "Mid-level" : "Senior";
  const barPct = Math.min(100, (xp % 1000) / 10);

  return (
    <aside className="hidden md:flex w-60 min-h-screen flex-col flex-shrink-0 bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.07] py-5 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          <Wifi size={16} className="text-white" />
        </div>
        <div className="leading-none">
          <p className="text-sm font-bold text-white">NetPath</p>
          <p className="text-[11px] font-semibold text-cyan-400 tracking-wide">ACADEMY</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-none pr-0.5">
        {navGroups.map((group) =>
          group.collapsible ? (
            <CollapsibleGroup key={group.label} group={group} pathname={pathname} />
          ) : (
            <div key={group.label}>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] px-3 mb-1.5">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map(({ href, label, Icon }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    active={pathname === href}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </nav>

      {/* XP bar */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col gap-1.5">
        <div className="mx-1 px-3 py-3 rounded-xl bg-gradient-to-br from-cyan-500/8 to-violet-500/8 border border-white/[0.07]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-white/35 uppercase tracking-wider">Skill Level</p>
            {streak > 0 && (
              <span className="text-[10px] text-orange-400 font-semibold">🔥 {streak}d</span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-white/70">{level}</p>
          <p className="text-[10px] text-white/30">{xp.toLocaleString()} XP</p>
          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
