// ─── Shared / Global Types ─────────────────────────────────────────────────

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type RoadmapStatus = "locked" | "in-progress" | "completed";

export type NavigationItem = {
  title: string;
  href:  string;
  icon:  string; // lucide-react icon name
};

export type Feature = {
  id:          string;
  title:       string;
  description: string;
  icon:        string; // lucide-react icon name
  color:       string; // Tailwind color class
};

export type RoadmapLevel = {
  level:       number;
  title:       string;
  description: string;
  skills:      string[];
  status:      RoadmapStatus;
  objectives?: string[];
};

export type StatItem = {
  id:          string;
  title:       string;
  value:       string;
  description: string;
  icon?:       string;
  color?:      string;
};

export type LearningPathStep = {
  label:       string;
  description: string;
  color:       string;
};
