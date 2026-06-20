import type { StatItem } from "@/types";

export const siteStats: StatItem[] = [
  {
    id:          "lessons",
    title:       "Lessons",
    value:       "120+",
    description: "บทเรียนครอบคลุมทุก Topic",
    icon:        "BookOpen",
    color:       "cyan",
  },
  {
    id:          "labs",
    title:       "Hands-on Labs",
    value:       "50+",
    description: "Lab จำลองสถานการณ์จริง",
    icon:        "FlaskConical",
    color:       "violet",
  },
  {
    id:          "quizzes",
    title:       "Quiz Sets",
    value:       "25+",
    description: "Quiz ตรวจสอบความรู้ทุก Level",
    icon:        "Brain",
    color:       "emerald",
  },
  {
    id:          "levels",
    title:       "Roadmap Levels",
    value:       "10",
    description: "ตั้งแต่ Beginner จนถึง Architect",
    icon:        "Map",
    color:       "amber",
  },
];
