// ─── Types ───────────────────────────────────────────────────────

export type DashboardStat = {
  id:          string;
  title:       string;
  value:       string;
  description: string;
  icon:        string;      // lucide-react icon name
  color:       "cyan" | "violet" | "emerald" | "amber" | "rose";
  trend?:      string;
  positive?:   boolean;
};

export type ContinueCourse = {
  id:         string;
  title:      string;
  category:   string;
  progress:   number;
  nextLesson: string;
  href:       string;
  color:      "cyan" | "violet" | "emerald" | "amber";
};

export type RecommendedLab = {
  id:       string;
  title:    string;
  category: string;
  level:    "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  href:     string;
};

export type QuizScore = {
  id:           string;
  title:        string;
  score:        number;
  passingScore: number;
  status:       "passed" | "failed";
};

export type Achievement = {
  id:          string;
  title:       string;
  description: string;
  icon:        string;   // lucide-react icon name
  color:       string;   // tailwind color e.g. "cyan"
  earnedAt:    string;
};

export type RoadmapProgressItem = {
  level:    number;
  title:    string;
  progress: number;
  status:   "completed" | "in-progress" | "locked";
};

export type WeeklyGoalData = {
  targetXp:          number;
  currentXp:         number;
  targetLabs:        number;
  completedLabs:     number;
  targetLessons:     number;
  completedLessons:  number;
};

export type UserDashboard = {
  name:        string;
  skillLevel:  string;
  xp:          number;
  nextLevelXp: number;
  level:       number;
  streak:      number;
  weeklyGoal:  WeeklyGoalData;
};

// ─── Mock Data ───────────────────────────────────────────────────

export const dashboardStats: DashboardStat[] = [
  {
    id:          "progress",
    title:       "Total Progress",
    value:       "42%",
    description: "Overall learning completion",
    icon:        "Target",
    color:       "cyan",
    trend:       "+8% this week",
    positive:    true,
  },
  {
    id:          "lessons",
    title:       "Lessons Completed",
    value:       "38 / 120",
    description: "Course lessons finished",
    icon:        "BookOpen",
    color:       "violet",
    trend:       "+5 lessons",
    positive:    true,
  },
  {
    id:          "labs",
    title:       "Labs Completed",
    value:       "12 / 50",
    description: "Hands-on network labs",
    icon:        "FlaskConical",
    color:       "emerald",
    trend:       "+2 labs",
    positive:    true,
  },
  {
    id:          "quiz",
    title:       "Quiz Average",
    value:       "84%",
    description: "Average quiz score",
    icon:        "Brain",
    color:       "amber",
    trend:       "+6%",
    positive:    true,
  },
];

export const currentLearning: ContinueCourse[] = [
  {
    id:         "vlan-trunk",
    title:      "VLAN & Trunk",
    category:   "Switching",
    progress:   65,
    nextLesson: "Native VLAN and Allowed VLAN",
    href:       "/courses/vlan-trunk",
    color:      "cyan",
  },
  {
    id:         "ospf-basics",
    title:      "OSPF Basics",
    category:   "Routing",
    progress:   35,
    nextLesson: "OSPF Neighbor States",
    href:       "/courses/ospf-basics",
    color:      "violet",
  },
];

export const recommendedLabs: RecommendedLab[] = [
  {
    id:       "inter-vlan-routing",
    title:    "Inter-VLAN Routing Lab",
    category: "Switching",
    level:    "Intermediate",
    duration: "45 min",
    href:     "/labs/inter-vlan-routing",
  },
  {
    id:       "dhcp-troubleshooting",
    title:    "DHCP Troubleshooting Lab",
    category: "Network Services",
    level:    "Beginner",
    duration: "30 min",
    href:     "/labs/dhcp-troubleshooting",
  },
  {
    id:       "ospf-single-area",
    title:    "OSPF Single Area Lab",
    category: "Routing",
    level:    "Intermediate",
    duration: "50 min",
    href:     "/labs/ospf-single-area",
  },
];

export const latestQuizScores: QuizScore[] = [
  {
    id:           "network-fundamentals",
    title:        "Network Fundamentals Quiz",
    score:        90,
    passingScore: 70,
    status:       "passed",
  },
  {
    id:           "osi-model",
    title:        "OSI Model Quiz",
    score:        80,
    passingScore: 70,
    status:       "passed",
  },
  {
    id:           "subnetting",
    title:        "Subnetting Quiz",
    score:        65,
    passingScore: 70,
    status:       "failed",
  },
];

export const recentAchievements: Achievement[] = [
  {
    id:          "subnet-master",
    title:       "Subnet Master",
    description: "Completed IP Address & Subnetting path",
    icon:        "Network",
    color:       "cyan",
    earnedAt:    "Today",
  },
  {
    id:          "vlan-builder",
    title:       "VLAN Builder",
    description: "Finished your first VLAN lab",
    icon:        "Layers",
    color:       "violet",
    earnedAt:    "Yesterday",
  },
  {
    id:          "quiz-warrior",
    title:       "Quiz Warrior",
    description: "Passed 10 quizzes in a row",
    icon:        "Trophy",
    color:       "amber",
    earnedAt:    "3 days ago",
  },
];

export const roadmapProgress: RoadmapProgressItem[] = [
  { level: 1, title: "Network Foundation", progress: 100, status: "completed"   },
  { level: 2, title: "Switching",          progress: 65,  status: "in-progress" },
  { level: 3, title: "Routing",            progress: 35,  status: "in-progress" },
  { level: 4, title: "Network Services",   progress: 10,  status: "in-progress" },
  { level: 5, title: "Network Security",   progress: 0,   status: "locked"      },
  { level: 6, title: "Wireless Network",   progress: 0,   status: "locked"      },
];

export const userDashboard: UserDashboard = {
  name:        "Network Learner",
  skillLevel:  "Junior Network Engineer",
  xp:          2450,
  nextLevelXp: 3000,
  level:       5,
  streak:      7,
  weeklyGoal: {
    targetXp:         500,
    currentXp:        320,
    targetLabs:       3,
    completedLabs:    2,
    targetLessons:    8,
    completedLessons: 5,
  },
};

export const skillLevelPath = [
  "Network Beginner",
  "Helpdesk Network Ready",
  "Junior Network Engineer",
  "Network Engineer",
  "Advanced Network Engineer",
  "Senior Network Engineer",
  "Network Architect",
] as const;

export const aiTutorPrompts = [
  "อธิบาย OSPF แบบเข้าใจง่าย",
  "วิเคราะห์ MAC Flapping log ให้หน่อย",
  "ช่วยสร้าง Lab VLAN + Trunk ให้หน่อย",
  "อธิบาย STP และวิธีแก้ปัญหา Loop",
];
