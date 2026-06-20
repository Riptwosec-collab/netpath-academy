import type { NavigationItem } from "@/types";

export const navigationItems: NavigationItem[] = [
  { title: "Dashboard",       href: "/dashboard",       icon: "LayoutDashboard" },
  { title: "Roadmap",         href: "/roadmap",         icon: "Map" },
  { title: "Courses",         href: "/courses",         icon: "BookOpen" },
  { title: "Labs",            href: "/labs",            icon: "FlaskConical" },
  { title: "Quiz",            href: "/quiz",            icon: "Brain" },
  { title: "Troubleshooting", href: "/troubleshooting", icon: "Wrench" },
  { title: "AI Tutor",        href: "/ai-tutor",        icon: "Bot" },
  { title: "Progress",        href: "/progress",        icon: "Trophy" },
  { title: "Portfolio",       href: "/portfolio",       icon: "FolderKanban" },
  { title: "Tools",           href: "/tools",           icon: "Network" },
  { title: "Settings",        href: "/settings",        icon: "Settings" },
];
