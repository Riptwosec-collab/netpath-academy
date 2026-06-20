import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format duration string */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/** Calculate overall progress from modules */
export function calcProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/** Get color by skill level index */
export function getSkillLevelColor(level: string): string {
  const map: Record<string, string> = {
    "Network Beginner": "#94a3b8",
    "Helpdesk Network Ready": "#38bdf8",
    "Junior Network Engineer": "#38bdf8",
    "Network Engineer": "#8b5cf6",
    "Advanced Network Engineer": "#8b5cf6",
    "Senior Network Engineer": "#facc15",
    "Network Architect": "#ef4444",
  };
  return map[level] ?? "#94a3b8";
}

/** Truncate text */
export function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
