"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, FlaskConical, Bot, Menu, X,
  Map, Brain, Wrench, Trophy, FolderKanban, Network, Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Bottom tab items ─────────────────────────────────────────────
const TABS: { href: string; label: string; Icon: LucideIcon; isMenu?: boolean }[] = [
  { href: "/dashboard", label: "Home",    Icon: LayoutDashboard },
  { href: "/courses",   label: "Courses", Icon: BookOpen },
  { href: "/labs",      label: "Labs",    Icon: FlaskConical },
  { href: "/ai-tutor",  label: "AI",      Icon: Bot },
  { href: "#menu",      label: "More",    Icon: Menu, isMenu: true },
];

// ─── Drawer items ─────────────────────────────────────────────────
const DRAWER: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/roadmap",         label: "Roadmap",         Icon: Map },
  { href: "/quiz",            label: "Quiz",            Icon: Brain },
  { href: "/troubleshooting", label: "Troubleshooting", Icon: Wrench },
  { href: "/progress",        label: "Progress",        Icon: Trophy },
  { href: "/portfolio",       label: "Portfolio",       Icon: FolderKanban },
  { href: "/tools",           label: "Tools",           Icon: Network },
  { href: "/settings",        label: "Settings",        Icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Bottom tab bar ─────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#070d1e]/95 backdrop-blur-xl border-t border-white/[0.06]"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around items-end py-2 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
          {TABS.map(({ href, label, Icon, isMenu }) => {
            const active = !isMenu && (pathname === href || pathname.startsWith(href + "/"));
            const isOpenMenu = isMenu && open;

            const content = (
              <div className="flex flex-col items-center gap-0.5 py-1">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                  (active || isOpenMenu) ? "bg-cyan-500/20" : "hover:bg-white/[0.04]",
                )}>
                  <Icon
                    size={18}
                    className={(active || isOpenMenu) ? "text-cyan-400" : "text-white/30"}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  (active || isOpenMenu) ? "text-cyan-400" : "text-white/25",
                )}>
                  {label}
                </span>
              </div>
            );

            if (isMenu) {
              return (
                <button
                  key="menu"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Open navigation menu"
                  aria-expanded={open}
                  className="flex-1"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={href} href={href} className="flex-1">
                {content}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Slide drawer ───────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation drawer">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#070d1e] border-t border-white/[0.07] rounded-t-2xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            {/* Handle */}
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5" />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>

            <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-4 px-1">
              All Features
            </p>

            <div className="grid grid-cols-2 gap-2">
              {DRAWER.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
                        : "border border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]",
                    )}
                  >
                    <Icon size={15} className={active ? "text-cyan-400" : "text-white/30"} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
