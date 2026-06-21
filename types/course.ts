// ─── Shared Enums ────────────────────────────────────────────────
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type CourseTrack =
  | "foundation"
  | "ai-infrastructure"
  | "cloud-ai-ops"
  | "wireless-mobile"
  | "security"
  | "hardware-infrastructure";

export type DifficultyColor = "green" | "yellow" | "orange" | "red";

// ─── Sub-types ───────────────────────────────────────────────────
export interface LessonCommand {
  command: string;
  description: string;
}

export interface YamlExample {
  title: string;
  code: string;
  description: string;
}

export interface LessonLab {
  title: string;
  level: CourseLevel;
  estimatedMinutes?: number;
  steps: string[];
  verification?: string[];
}

export interface TroubleshootingEntry {
  symptom: string;
  possibleCause: string;
  check: string;
  fix: string;
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

export interface InterviewQuestion {
  level: "Junior" | "Mid" | "Senior";
  question: string;
  answerGuide: string;
}

export interface PortfolioTask {
  title: string;
  description: string;
  deliverables: string[];
}

// ─── Main Lesson type ────────────────────────────────────────────
export interface Lesson {
  id: string;
  slug: string;
  title: string;
  titleTh: string;
  track: CourseTrack;
  category: string;
  level: CourseLevel;
  duration: string;         // e.g. "45 min"
  xp: number;
  description: string;
  objectives: string[];
  prerequisites: string[];
  concepts: string[];
  architecture?: string;    // text description of architecture
  mermaidDiagram?: string;
  trafficFlow?: string[];
  commands?: LessonCommand[];
  yamlExamples?: YamlExample[];
  labs: LessonLab[];
  troubleshooting: TroubleshootingEntry[];
  quiz: QuizQuestion[];
  interviewQuestions: InterviewQuestion[];
  portfolioTask?: PortfolioTask;
  tags: string[];
  order: number;            // sort order within category/track
}

// ─── Track definition ────────────────────────────────────────────
export interface TrackInfo {
  id: CourseTrack;
  title: string;
  titleTh: string;
  description: string;
  icon: string;
  color: string;            // Tailwind color key e.g. "cyan"
  lessons: Lesson[];
  totalXp: number;
  estimatedHours: number;
  targetCert?: string;
  prereqTrack?: CourseTrack;
  portfolioTask?: PortfolioTask;
}

// ─── Foundation category ─────────────────────────────────────────
export interface FoundationCategory {
  id: string;
  title: string;
  titleTh: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  order: number;
}
