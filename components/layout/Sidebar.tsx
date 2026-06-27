"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getTotalXp, getStreak, touchStreak } from "@/lib/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, Map, BookOpen, FlaskConical, Brain,
  Wrench, Bot, Trophy, FolderKanban, Network, Settings,
  Wifi, GraduationCap, Layers, Terminal, Award,
  ChevronDown, ChevronRight, Cpu, Shield, Antenna,
  HardDrive, Server, Zap, Radio, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href:  string;
  tKey:  string;       // i18n key
  Icon:  LucideIcon;
}

interface NavGroup {
  tKey:        string; // i18n key for group label
  items:       NavItem[];
  collapsible?: boolean;
}

// Static structure — labels resolved via t() at render time
const NAV_GROUPS: NavGroup[] = [
  {
    tKey: "sidebar.overview",
    items: [
      { href: "/dashboard", tKey: "nav.dashboard", Icon: LayoutDashboard },
      { href: "/roadmap",   tKey: "nav.roadmap",   Icon: Map },
    ],
  },
  {
    tKey: "sidebar.foundation",
    collapsible: true,
    items: [
      { href: "/foundation",                         tKey: "nav.foundationHome",       Icon: BookOpen },
      { href: "/foundation/network-fundamentals",    tKey: "nav.networkFundamentals",  Icon: Network },
      { href: "/foundation/osi-tcpip",               tKey: "nav.osiTcpip",             Icon: Layers },
      { href: "/foundation/ip-subnetting",           tKey: "nav.ipSubnetting",         Icon: Terminal },
      { href: "/foundation/switching",               tKey: "nav.switching",            Icon: HardDrive },
      { href: "/foundation/routing",                 tKey: "nav.routing",              Icon: Map },
      { href: "/foundation/firewall-vpn",            tKey: "nav.firewallVpn",          Icon: Shield },
      { href: "/foundation/wireless-basic",          tKey: "nav.wirelessBasic",        Icon: Wifi },
      { href: "/foundation/monitoring-basic",        tKey: "nav.monitoringBasic",      Icon: Cpu },
      { href: "/foundation/troubleshooting-basic",   tKey: "nav.troubleshootingBasic", Icon: Wrench },
      { href: "/foundation/documentation",           tKey: "nav.documentation",        Icon: FolderKanban },
    ],
  },
  {
    tKey: "sidebar.advanced",
    collapsible: true,
    items: [
      { href: "/advanced",                          tKey: "nav.advancedHome",             Icon: Award },
      { href: "/advanced/network-automation",       tKey: "nav.networkAutoItem",          Icon: Terminal },
      { href: "/advanced/ai-infrastructure",        tKey: "nav.aiInfrastructure",         Icon: Cpu },
      { href: "/advanced/cloud-ai-ops",             tKey: "nav.cloudAiOps",              Icon: Server },
      { href: "/advanced/wireless-mobile",          tKey: "nav.wirelessMobile",           Icon: Radio },
      { href: "/advanced/security",                 tKey: "nav.securityTrack",            Icon: Shield },
      { href: "/advanced/hardware-infrastructure",  tKey: "nav.hardwareInfrastructure",   Icon: HardDrive },
    ],
  },
  {
    tKey: "sidebar.hardware",
    collapsible: true,
    items: [
      { href: "/hardware",                     tKey: "nav.hardwareHome",       Icon: Server },
      { href: "/hardware/cabling",             tKey: "nav.cabling",            Icon: Zap },
      { href: "/hardware/switching",           tKey: "nav.switchHardware",     Icon: HardDrive },
      { href: "/hardware/routing",             tKey: "nav.routerHardware",     Icon: Map },
      { href: "/hardware/security",            tKey: "nav.firewallAppliances", Icon: Shield },
      { href: "/hardware/wireless",            tKey: "nav.wirelessHardware",   Icon: Wifi },
      { href: "/hardware/datacenter",          tKey: "nav.datacenterHw",       Icon: Server },
      { href: "/hardware/ai-gpu",              tKey: "nav.aiGpuHardware",      Icon: Cpu },
      { href: "/hardware/monitoring",          tKey: "nav.monitoringTap",      Icon: Antenna },
      { href: "/hardware/power-rack-cooling",  tKey: "nav.powerRackCooling",   Icon: Zap },
      { href: "/hardware/isp-wan-edge",        tKey: "nav.ispWanEdge",         Icon: Network },
      { href: "/hardware/voice-iot-ot",        tKey: "nav.voiceIotOt",         Icon: Radio },
    ],
  },
  {
    tKey: "sidebar.tools",
    items: [
      { href: "/search",          tKey: "nav.searchLessons",    Icon: Network },
      { href: "/labs",            tKey: "nav.labs",             Icon: FlaskConical },
      { href: "/quiz",            tKey: "nav.quiz",             Icon: Brain },
      { href: "/exam",            tKey: "nav.examCenter",       Icon: GraduationCap },
      { href: "/flashcards",      tKey: "nav.flashcards",       Icon: Layers },
      { href: "/troubleshooting", tKey: "nav.troubleshooting",  Icon: Wrench },
      { href: "/commands",        tKey: "nav.cheatSheets",      Icon: Terminal },
      { href: "/ai-tutor",        tKey: "nav.aiTutor",          Icon: Bot },
      { href: "/tools",           tKey: "nav.tools",            Icon: Network },
    ],
  },
  {
    tKey: "sidebar.account",
    items: [
      { href: "/progress",      tKey: "nav.progress",      Icon: Trophy },
      { href: "/portfolio",     tKey: "nav.portfolio",     Icon: FolderKanban },
      { href: "/skill-tree",    tKey: "nav.skillTree",     Icon: Award },
      { href: "/career",        tKey: "nav.career",        Icon: Map },
      { href: "/certifications",tKey: "nav.certifications",Icon: GraduationCap },
      { href: "/settings",      tKey: "nav.settings",      Icon: Settings },
    ],
  },
];

// ─── Single nav link ───────────────────────────────────────────────
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

// ─── Collapsible Group ─────────────────────────────────────────────
function CollapsibleGroup({
  group, pathname, t,
}: {
  group: NavGroup; pathname: string; t: (key: string) => string;
}) {
  const isActive = group.items.some(
    i => pathname.startsWith(i.href) && i.href !== "/dashboard",
  );
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
        {t(group.tKey)}
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
      </button>

      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5">
          {group.items.map(({ href, tKey, Icon }, i) => (
            <NavLink
              key={href}
              href={href}
              label={t(tKey)}
              Icon={Icon}
              active={
                pathname === href ||
                (i > 0 && !["foundation","advanced","hardware"].includes(href.replace("/","")) && pathname.startsWith(href))
              }
              indent={i > 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname          = usePathname();
  const { t }             = useLanguage();
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
        {NAV_GROUPS.map((group) =>
          group.collapsible ? (
            <CollapsibleGroup key={group.tKey} group={group} pathname={pathname} t={t} />
          ) : (
            <div key={group.tKey}>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] px-3 mb-1.5">
                {t(group.tKey)}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map(({ href, tKey, Icon }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={t(tKey)}
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
            <p className="text-[10px] text-white/35 uppercase tracking-wider">{t("common.level")}</p>
            {streak > 0 && (
              <span className="text-[10px] text-orange-400 font-semibold">🔥 {streak}{t("common.min").charAt(0)}</span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-white/70">{level}</p>
          <p className="text-[10px] text-white/30">{xp.toLocaleString()} {t("common.xp")}</p>
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
