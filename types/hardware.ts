import type { CourseLevel, TroubleshootingEntry, QuizQuestion, InterviewQuestion, LessonSection } from "./course";

export type HardwareCategory =
  | "cabling"
  | "switching"
  | "routing"
  | "security"
  | "wireless"
  | "datacenter"
  | "ai-gpu"
  | "monitoring"
  | "power-rack-cooling"
  | "isp-wan-edge"
  | "voice-iot-ot";

export interface HardwareComponent {
  name: string;
  description: string;
}

export interface HardwareLab {
  title: string;
  estimatedMinutes?: number;
  steps: string[];
  verification?: string[];
}

export interface HardwareLesson {
  id: string;
  slug: string;
  title: string;
  titleTh: string;
  category: HardwareCategory;
  level: CourseLevel;
  duration: string;
  xp: number;
  description: string;

  deviceRole: string;
  osiLayer: string[];
  commonPorts: string[];
  commonSpeeds: string[];
  useCases: string[];

  components: HardwareComponent[];

  howItWorks: string[];
  selectionGuide: string[];
  installationGuide: string[];
  configurationConcept: string[];

  troubleshooting: TroubleshootingEntry[];
  checklist: string[];
  labs: HardwareLab[];
  quiz: QuizQuestion[];
  interviewQuestions: InterviewQuestion[];

  tags: string[];
  order: number;

  // optional rich-content fields
  sections?: LessonSection[];
  mermaidDiagram?: string;
}

export interface HardwareCategoryInfo {
  id: HardwareCategory;
  title: string;
  titleTh: string;
  icon: string;
  description: string;
  color: string;
  lessons: HardwareLesson[];
  order: number;
}
