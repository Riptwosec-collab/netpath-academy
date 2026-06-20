export type BadgeStatus = "earned" | "locked" | "in-progress";

export type UserBadge = {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG path d=""
  status: BadgeStatus;
  xpReward: number;
  progress?: number; // 0-100 for in-progress
  earnedAt?: string;
  color: string;
};

export type CourseProgress = {
  id: string;
  title: string;
  category: string;
  completedLessons: number;
  totalLessons: number;
  progress: number; // 0-100
  lastActivity?: string;
};

export type LabProgress = {
  id: string;
  title: string;
  category: string;
  status: "completed" | "in-progress" | "not-started";
  xp: number;
  completedAt?: string;
};

export type QuizScore = {
  id: string;
  title: string;
  score: number;
  passingScore: number;
  totalQuestions: number;
  status: "passed" | "failed";
  completedAt: string;
};

export type AchievementEvent = {
  id: string;
  title: string;
  description: string;
  type: "badge" | "level" | "course" | "lab" | "quiz" | "streak";
  xpGained: number;
  date: string;
  color: string;
};

export const SKILL_PATH = [
  { level: 1,  title: "Network Beginner",           minXp: 0,    maxXp: 500   },
  { level: 2,  title: "Helpdesk Network Ready",      minXp: 500,  maxXp: 1200  },
  { level: 3,  title: "Junior Network Engineer",     minXp: 1200, maxXp: 3000  },
  { level: 4,  title: "Network Engineer",            minXp: 3000, maxXp: 6000  },
  { level: 5,  title: "Advanced Network Engineer",   minXp: 6000, maxXp: 10000 },
  { level: 6,  title: "Senior Network Engineer",     minXp: 10000,maxXp: 16000 },
  { level: 7,  title: "Network Architect",           minXp: 16000,maxXp: 25000 },
];

export const userProgress = {
  name: "Network Learner",
  currentXp: 2450,
  level: 3,
  skillLevel: "Junior Network Engineer",
  completedCourses: 4,
  totalCourses: 8,
  completedLabs: 9,
  totalLabs: 30,
  completedQuizzes: 11,
  totalQuizzes: 25,
  learningStreak: 7,
  longestStreak: 14,
  totalBadges: 5,
  weeklyGoal: {
    targetXp: 500,
    currentXp: 320,
    targetLabs: 3,
    completedLabs: 2,
    targetLessons: 10,
    completedLessons: 7,
    daysLeft: 3,
  },
  joinedAt: "Jan 2025",
};

export const badges: UserBadge[] = [
  {
    id: "subnet-master",
    title: "Subnet Master",
    description: "คำนวณ Subnet ได้คะแนนสูงกว่า 90% ใน Quiz Subnetting",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    status: "earned",
    xpReward: 150,
    earnedAt: "15 Jan 2025",
    color: "#38bdf8",
  },
  {
    id: "vlan-builder",
    title: "VLAN Builder",
    description: "ทำ Lab VLAN + Trunk สำเร็จ",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    status: "earned",
    xpReward: 200,
    earnedAt: "22 Jan 2025",
    color: "#8b5cf6",
  },
  {
    id: "ospf-beginner",
    title: "OSPF Beginner",
    description: "ผ่าน Quiz OSPF และทำ Lab OSPF Single Area สำเร็จ",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    status: "earned",
    xpReward: 250,
    earnedAt: "5 Feb 2025",
    color: "#22c55e",
  },
  {
    id: "troubleshooting-hero",
    title: "Troubleshooting Hero",
    description: "อ่าน Troubleshooting Guide ครบ 5 หัวข้อ",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    status: "earned",
    xpReward: 180,
    earnedAt: "12 Feb 2025",
    color: "#f97316",
  },
  {
    id: "quiz-warrior",
    title: "Quiz Warrior",
    description: "ทำ Quiz ผ่านครบ 10 รายการ",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    status: "earned",
    xpReward: 200,
    earnedAt: "20 Feb 2025",
    color: "#facc15",
  },
  {
    id: "lab-finisher",
    title: "Lab Finisher",
    description: "ทำ Lab ผ่านครบ 15 รายการ",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    status: "in-progress",
    xpReward: 300,
    progress: 60,
    color: "#38bdf8",
  },
  {
    id: "command-collector",
    title: "Command Collector",
    description: "เรียนรู้คำสั่ง Network ครบ 50 คำสั่ง",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    status: "in-progress",
    xpReward: 250,
    progress: 40,
    color: "#8b5cf6",
  },
  {
    id: "ai-tutor-explorer",
    title: "AI Tutor Explorer",
    description: "ใช้งาน AI Tutor ครบ 6 โหมด",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    status: "in-progress",
    xpReward: 200,
    progress: 33,
    color: "#38bdf8",
  },
  {
    id: "senior-ready",
    title: "Senior Ready",
    description: "ผ่าน Lab ระดับ Advanced ครบ 10 รายการ",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    status: "locked",
    xpReward: 500,
    color: "#facc15",
  },
  {
    id: "network-architect-path",
    title: "Network Architect Path",
    description: "ถึง Level 7 Network Architect",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    status: "locked",
    xpReward: 1000,
    color: "#8b5cf6",
  },
];

export const courseProgressData: CourseProgress[] = [
  { id: "network-fundamentals",   title: "Network Fundamentals",       category: "Networking", completedLessons: 12, totalLessons: 12, progress: 100, lastActivity: "15 Jan" },
  { id: "switching-fundamentals", title: "Switching Fundamentals",     category: "Switching",  completedLessons: 8,  totalLessons: 10, progress: 80,  lastActivity: "22 Jan" },
  { id: "routing-fundamentals",   title: "Routing & Switching",        category: "Routing",    completedLessons: 6,  totalLessons: 12, progress: 50,  lastActivity: "5 Feb"  },
  { id: "network-security-basics", title: "Network Security Basics",    category: "Security",   completedLessons: 10, totalLessons: 10, progress: 100, lastActivity: "12 Feb" },
  { id: "ospf-deep-dive",         title: "OSPF Deep Dive",             category: "Routing",    completedLessons: 3,  totalLessons: 8,  progress: 37,  lastActivity: "20 Feb" },
  { id: "bgp-essentials",         title: "BGP Essentials",             category: "Routing",    completedLessons: 0,  totalLessons: 10, progress: 0,   lastActivity: undefined},
];

export const labProgressData: LabProgress[] = [
  { id: "basic-ip-connectivity",   title: "Basic IP Connectivity",     category: "Connectivity", status: "completed",   xp: 100, completedAt: "10 Jan" },
  { id: "vlan-trunking",           title: "VLAN & Trunking Setup",     category: "Switching",    status: "completed",   xp: 150, completedAt: "15 Jan" },
  { id: "dhcp-configuration",      title: "DHCP Configuration",        category: "Services",     status: "completed",   xp: 120, completedAt: "20 Jan" },
  { id: "ospf-single-area",        title: "OSPF Single Area",          category: "Routing",      status: "completed",   xp: 200, completedAt: "28 Jan" },
  { id: "firewall-acl",            title: "Firewall ACL Policy",       category: "Security",     status: "completed",   xp: 180, completedAt: "5 Feb"  },
  { id: "nat-configuration",       title: "NAT Configuration",         category: "Routing",      status: "completed",   xp: 150, completedAt: "12 Feb" },
  { id: "bgp-basic-setup",         title: "BGP Basic Setup",           category: "Routing",      status: "completed",   xp: 220, completedAt: "18 Feb" },
  { id: "network-monitoring",      title: "Network Monitoring Setup",  category: "Monitoring",   status: "completed",   xp: 180, completedAt: "24 Feb" },
  { id: "vpn-site-to-site",        title: "VPN Site-to-Site",          category: "Security",     status: "completed",   xp: 200, completedAt: "1 Mar"  },
  { id: "ospf-multi-area",         title: "OSPF Multi-Area",           category: "Routing",      status: "in-progress", xp: 300              },
  { id: "bgp-route-policy",        title: "BGP Route Policy",          category: "Routing",      status: "not-started", xp: 280              },
  { id: "mpls-basic",              title: "MPLS Basic",                category: "Advanced",     status: "not-started", xp: 350              },
];

export const quizScoreData: QuizScore[] = [
  { id: "network-fundamentals-quiz", title: "Network Fundamentals Quiz", score: 8,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "12 Jan" },
  { id: "osi-model-quiz",            title: "OSI Model Quiz",            score: 7,  passingScore: 6, totalQuestions: 8,  status: "passed",  completedAt: "14 Jan" },
  { id: "ip-subnetting-quiz",        title: "IP Subnetting Quiz",        score: 9,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "18 Jan" },
  { id: "vlan-trunk-quiz",           title: "VLAN & Trunk Quiz",         score: 6,  passingScore: 7, totalQuestions: 10, status: "failed",  completedAt: "23 Jan" },
  { id: "vlan-trunk-quiz-2",         title: "VLAN & Trunk Quiz (Retry)", score: 8,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "25 Jan" },
  { id: "routing-basics-quiz",       title: "Routing Basics Quiz",       score: 7,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "2 Feb"  },
  { id: "ospf-basics-quiz",          title: "OSPF Basics Quiz",          score: 6,  passingScore: 7, totalQuestions: 8,  status: "failed",  completedAt: "8 Feb"  },
  { id: "firewall-acl-quiz",         title: "Firewall & ACL Quiz",       score: 8,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "15 Feb" },
  { id: "network-troubleshoot-quiz", title: "Troubleshooting Quiz",      score: 9,  passingScore: 7, totalQuestions: 10, status: "passed",  completedAt: "22 Feb" },
];

export const achievementEvents: AchievementEvent[] = [
  { id: "a1", title: "ระดับ 3 — Junior Network Engineer",  description: "สะสม XP ถึง 1,200 XP", type: "level",   xpGained: 0,   date: "5 Feb 2025",  color: "#38bdf8" },
  { id: "a2", title: "Badge: OSPF Beginner",              description: "ผ่าน Lab OSPF Single Area", type: "badge",  xpGained: 250, date: "5 Feb 2025",  color: "#22c55e" },
  { id: "a3", title: "Badge: Troubleshooting Hero",       description: "อ่าน Guide ครบ 5 หัวข้อ", type: "badge",  xpGained: 180, date: "12 Feb 2025", color: "#f97316" },
  { id: "a4", title: "Firewall ACL Quiz — Passed",        description: "คะแนน 8/10",              type: "quiz",   xpGained: 80,  date: "15 Feb 2025", color: "#facc15" },
  { id: "a5", title: "Lab: Firewall ACL Policy — Done",  description: "ทำ Lab สำเร็จ",            type: "lab",    xpGained: 180, date: "5 Feb 2025",  color: "#8b5cf6" },
  { id: "a6", title: "Badge: Quiz Warrior",               description: "ทำ Quiz ผ่านครบ 10 รายการ",type: "badge",  xpGained: 200, date: "20 Feb 2025", color: "#facc15" },
  { id: "a7", title: "Streak 7 วัน",                     description: "เรียนต่อเนื่อง 7 วัน",    type: "streak", xpGained: 100, date: "26 Feb 2025", color: "#f97316" },
  { id: "a8", title: "Lab: VPN Site-to-Site — Done",     description: "ทำ Lab สำเร็จ",            type: "lab",    xpGained: 200, date: "1 Mar 2025",  color: "#8b5cf6" },
];
