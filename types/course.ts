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

export interface LessonSection {
  title: string;
  body: string;                  // prose explanation (\n\n = paragraph break)
  code?: string;                 // optional code/config block
  language?: string;             // "bash" | "python" | "yaml" | "text" | "cisco"
  table?: { header: string[]; rows: string[][] };
  tip?: string;                  // highlighted tip
  warning?: string;              // highlighted warning
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
  duration: string;
  xp: number;
  description: string;
  objectives: string[];
  prerequisites: string[];
  concepts: string[];
  sections?: LessonSection[];   // rich educational content sections
  architecture?: string;
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
  order: number;
  interactiveTools?: Array<"subnet-calculator" | "osi-explorer" | "cli-simulator">;
  miniQuiz?: Array<{
    q: string;
    options: string[];
    answer: number;
    explain: string;
  }>;
}

// ─── Track definition ────────────────────────────────────────────
export interface TrackInfo {
  id: CourseTrack;
  title: string;
  titleTh: string;
  description: string;
  icon: string;
  color: string;
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
  description?: string;
  icon: string;
  color?: string;
  order?: number;
  lessons: Lesson[];
}
