"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface LessonRecord {
  id:          string;   // lesson slug or unique id
  track:       string;   // "foundation" | "advanced" | "hardware" | "automation"
  xp:          number;
  completedAt: string;   // ISO date string
}

export interface ProgressData {
  completedLessons: LessonRecord[];
  totalXp:          number;
  streak:           number;
  longestStreak:    number;
  lastActiveDate:   string | null;   // "YYYY-MM-DD"
}

const STORAGE_KEY = "netpath_progress";

// ─── Default state ────────────────────────────────────────────────────────────
const DEFAULT_PROGRESS: ProgressData = {
  completedLessons: [],
  totalXp:          0,
  streak:           0,
  longestStreak:    0,
  lastActiveDate:   null,
};

// ─── Read / Write helpers ─────────────────────────────────────────────────────
export function getProgress(): ProgressData {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } as ProgressData;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded — ignore */ }
}

// ─── Core API ────────────────────────────────────────────────────────────────
export function getCompletedLessons(): LessonRecord[] {
  return getProgress().completedLessons;
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().completedLessons.some((l) => l.id === lessonId);
}

export function markLessonComplete(lesson: {
  id: string; track: string; xp: number;
}): ProgressData {
  const data = getProgress();
  // Idempotent: don't double-count
  if (data.completedLessons.some((l) => l.id === lesson.id)) return data;

  const today = todayStr();
  const updated: ProgressData = {
    ...data,
    completedLessons: [
      ...data.completedLessons,
      { id: lesson.id, track: lesson.track, xp: lesson.xp, completedAt: new Date().toISOString() },
    ],
    totalXp: data.totalXp + lesson.xp,
    ...computeStreak(data, today),
  };
  saveProgress(updated);
  return updated;
}

export function getTotalXp(): number {
  return getProgress().totalXp;
}

/** Returns count of completed lessons for a specific track */
export function getTrackProgress(track: string): { done: number; xpEarned: number } {
  const lessons = getProgress().completedLessons.filter((l) => l.track === track);
  return { done: lessons.length, xpEarned: lessons.reduce((s, l) => s + l.xp, 0) };
}

// ─── Streak helpers ───────────────────────────────────────────────────────────
function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function daysBetween(a: string, b: string): number {
  const msA = new Date(a).getTime();
  const msB = new Date(b).getTime();
  return Math.round(Math.abs(msB - msA) / 86400000);
}

function computeStreak(data: ProgressData, today: string): Pick<ProgressData, "streak" | "longestStreak" | "lastActiveDate"> {
  const last = data.lastActiveDate;
  let streak = data.streak;

  if (!last) {
    streak = 1;
  } else if (last === today) {
    // Already recorded today — no change
  } else if (daysBetween(last, today) === 1) {
    streak = streak + 1;
  } else {
    // Broke streak
    streak = 1;
  }

  return {
    streak,
    longestStreak: Math.max(data.longestStreak, streak),
    lastActiveDate: today,
  };
}

/** Call this once on app load / page visit to keep streak alive */
export function touchStreak(): void {
  const data = getProgress();
  const today = todayStr();
  if (data.lastActiveDate === today) return; // already touched today
  const updated = { ...data, ...computeStreak(data, today) };
  saveProgress(updated);
}

export function getStreak(): number {
  return getProgress().streak;
}

/** Reset all progress (for testing / settings) */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
