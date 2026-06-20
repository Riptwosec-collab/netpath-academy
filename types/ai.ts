export type AiMode =
  | "explain"
  | "config"
  | "log"
  | "lab"
  | "quiz"
  | "rca"
  | "summary"
  | "troubleshooting"
  | "commands"
  | "portfolio";

export type AiChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode?: AiMode;
  createdAt: string;
};

export type AiTutorRequest = {
  mode: AiMode;
  message: string;
  context?: string;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
};

export type AiTutorResponse = {
  content: string;
  mode: AiMode;
};

export const AI_MODES: AiMode[] = [
  "explain", "config", "log", "lab", "quiz",
  "rca", "summary", "troubleshooting", "commands", "portfolio",
];
