"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, BookOpen, FlaskConical, Brain,
  Wrench, Bot, Trophy, FolderKanban, Network, Settings,
  Wifi, GraduationCap, Layers, Terminal, Award, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav Items ──────────────────────────────────────────────────
const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
      { href: "/roadmap",   label: "Roadmap",   Icon: Map },
    ],
  },
  {
    label: "Learn",
    items: [
      { href: "/courses",         label: "Courses",         Icon: BookOpen },
      { href: "/labs",            label: "Labs",            Icon: FlaskConical },
      { href: "/quiz",            label: "Quiz",            Icon: Brain },
      { href: "/exam",            label: "Exam Center",     Icon: GraduationCap },
      { href: "/troubleshooting", label: "Troubleshooting", Icon: Wrench },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/flashcards",    label: "Flashcards",    Icon: Layers   },
      { href: "/commands",      label: "Commands",      Icon: Terminal  },
      { href: "/skill-tree",    label: "Skill Tree",    Icon: Award     },
      { href: "/certifications",label: "Certifications",Icon: GraduationCap },
    ],
  },
  {
    label: "Tools & AI",
    items: [
      { href: "/ai-tutor", label: "AI Tutor", Icon: Bot },
      { href: "/tools",    label: "Tools",    Icon: Network },
    ],
  },
  {
    label: "Progress",
    items: [
      { href: "/progress",  label: "Progress",  Icon: Trophy },
      { href: "/portfolio", label: "Portfolio", Icon: FolderKanban },
    ],
  },
];

// ─── Single nav link ─────────────────────────────────────────────
function NavLink({
  href,
  label,
  Icon,
  active,
}: {
  href:   string;
  label:  string;
  Icon:   LucideIcon;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-2.5 px-3 py-[7px] rounded-lg",
        "text-[13px] font-medium transition-all duration-150 group",
        active
          ? "text-cyan-400 bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.18)]"
          : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400 rounded-full" />
      )}
      <Icon
        size={15}
        className={active ? "text-cyan-400" : "text-white/35 group-hover:text-white/60"}
      />
      {label}
    </Link>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 min-h-screen flex-col flex-shrink-0 bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.07] py-5 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-7">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          <Wifi size={16} className="text-white" />
        </div>
        <div className="leading-none">
          <p className="text-sm font-bold text-white">NetPath</p>
          <p className="text-[11px] font-semibold text-cyan-400 tracking-wide">ACADEMY</p>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex flex-col gap-5 flex-1 overflow-y-auto scrollbar-none">
        {navGroups.map((group) => (
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
        ))}
      </nav>

      {/* XP bar */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col gap-1.5">
        <div className="mx-1 px-3 py-3 rounded-xl bg-gradient-to-br from-cyan-500/8 to-violet-500/8 border border-white/[0.07]">
          <p className="text-[10px] text-white/35 mb-1 uppercase tracking-wider">Skill Level</p>
          <p className="text-xs font-bold text-cyan-400">Junior Network Engineer</p>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              style={{ width: "42%" }}
            />
          </div>
          <p className="text-[10px] text-white/25 mt-1.5">420 / 1000 XP</p>
        </div>

        <NavLink
          href="/settings"
          label="Settings"
          Icon={Settings}
        />
      </div>
    </aside>
  );
}
