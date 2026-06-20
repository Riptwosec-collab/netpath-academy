export const APP_NAME = "NetPath Academy";
export const APP_DESCRIPTION =
  "เว็บเรียนรู้เส้นทางสู่ Network Engineer และ Senior Network Engineer";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const skillLevels = [
  "Network Beginner",
  "Helpdesk Network Ready",
  "Junior Network Engineer",
  "Network Engineer",
  "Advanced Network Engineer",
  "Senior Network Engineer",
  "Network Architect",
] as const;

export type SkillLevel = (typeof skillLevels)[number];

export const XP_PER_LEVEL = 1000;

export const LEVEL_COLORS: Record<string, string> = {
  "Network Beginner":           "#94a3b8",
  "Helpdesk Network Ready":     "#38bdf8",
  "Junior Network Engineer":    "#38bdf8",
  "Network Engineer":           "#8b5cf6",
  "Advanced Network Engineer":  "#8b5cf6",
  "Senior Network Engineer":    "#facc15",
  "Network Architect":          "#ef4444",
};

export const THEME = {
  bg:        "#050816",
  primary:   "#38bdf8", // cyan-400
  secondary: "#8b5cf6", // violet-400
  success:   "#22c55e", // emerald
  warning:   "#facc15", // amber
  danger:    "#ef4444", // rose
  orange:    "#f97316",
} as const;
