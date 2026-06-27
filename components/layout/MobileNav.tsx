"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, BookOpen, FlaskConical, Bot, Menu, X,
  Map, Brain, Wrench, Trophy, FolderKanban, Network, Settings,
  Home, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Bottom tab items ─────────────────────────────────────────────
const TABS: { href: string; tKey: string; Icon: LucideIcon; isMenu?: boolean }[] = [
  { href: "/dashboard",  tKey: "nav.dashboard", Icon: Home },
  { href: "/courses",    tKey: "nav.courses",   Icon: BookOpen },
  { href: "/labs",       tKey: "nav.labs",      Icon: FlaskConical },
  { href: "/ai-tutor",   tKey: "nav.aiTutor",   Icon: Bot },
  { href: "#menu",       tKey: "common.more",   Icon: Menu, isMenu: true },
];

// ─── Drawer items ─────────────────────────────────────────────────
const DRAWER: { href: string; tKey: string; Icon: LucideIcon }[] = [
  { href: "/roadmap",         tKey: "nav.roadmap",         Icon: Map },
  { href: "/quiz",            tKey: "nav.quiz",            Icon: Brain },
  { href: "/troubleshooting", tKey: "nav.troubleshooting", Icon: Wrench },
  { href: "/progress",        tKey: "nav.progress",        Icon: Trophy },
  { href: "/portfolio",       tKey: "nav.portfolio",       Icon: FolderKanban },
  { href: "/tools",           tKey: "nav.tools",           Icon: Network },
  { href: "/settings",        tKey: "nav.settings",        Icon: Settings },
];

export default function MobileNav() {
  const pathname      = usePathname();
  const { t }         = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

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
          {TABS.map(({ href, tKey, Icon, isMenu }) => {
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
                  {t(tKey)}
                </span>
              </div>
            );

            if (isMenu) {
              return (
                <button
                  key="menu"
                  onClick={() => setOpen((v) => !v)}
                  aria-label={t("common.more")}
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
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
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
              aria-label={t("common.close")}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>

            {/* Home shortcut */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              <Home size={15} />
              {t("nav.dashboard")}
            </Link>

            <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-3 px-1">
              {t("sidebar.tools")}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {DRAWER.map(({ href, tKey, Icon }) => {
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
                    {t(tKey)}
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
