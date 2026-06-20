// ─── Translation dictionary ───────────────────────────────────────
// Flat key-value with nested namespaces via dot notation helper

export type Lang = "en" | "th";

const en = {
  // ── Navigation ──────────────────────────────────────────────────
  "nav.dashboard":       "Dashboard",
  "nav.roadmap":         "Roadmap",
  "nav.courses":         "Courses",
  "nav.labs":            "Labs",
  "nav.quiz":            "Quiz",
  "nav.troubleshooting": "Troubleshooting",
  "nav.aiTutor":         "AI Tutor",
  "nav.progress":        "Progress",
  "nav.portfolio":       "Portfolio",
  "nav.tools":           "Tools",
  "nav.settings":        "Settings",

  // ── Common ──────────────────────────────────────────────────────
  "common.loading":       "Loading...",
  "common.empty":         "Nothing here yet.",
  "common.back":          "Back",
  "common.continue":      "Continue",
  "common.start":         "Start",
  "common.viewAll":       "View All",
  "common.learnMore":     "Learn More",
  "common.completed":     "Completed",
  "common.inProgress":    "In Progress",
  "common.locked":        "Locked",
  "common.beginner":      "Beginner",
  "common.intermediate":  "Intermediate",
  "common.advanced":      "Advanced",
  "common.expert":        "Expert",
  "common.passed":        "Passed",
  "common.failed":        "Failed",
  "common.score":         "Score",
  "common.duration":      "Duration",
  "common.level":         "Level",
  "common.skills":        "Skills",
  "common.objectives":    "Objectives",
  "common.category":      "Category",
  "common.search":        "Search...",
  "common.filter":        "Filter",
  "common.all":           "All",
  "common.min":           "min",
  "common.xp":            "XP",
  "common.nextLesson":    "Next Lesson",

  // ── Home ────────────────────────────────────────────────────────
  "home.badge":        "Network Engineer Roadmap",
  "home.title":        "Start Your Path to Network Engineer",
  "home.subtitle":     "Learn networking systematically — from IP basics, VLAN, Routing, Firewall, Wireless, Monitoring, Automation to Senior-level Network Design.",
  "home.ctaStart":     "Start Learning",
  "home.ctaRoadmap":   "View Roadmap",
  "home.statsLessons": "Lessons",
  "home.statsLabs":    "Labs",
  "home.statsLevels":  "Levels",
  "home.features":     "Everything You Need",
  "home.featuresSub":  "Complete learning platform in one place — Roadmap, Labs, AI Tutor to Portfolio.",
  "home.path":         "Learning Path",
  "home.pathSub":      "Step by step from Beginner to Network Architect.",
  "home.roadmapTitle": "10 Levels to Master",
  "home.roadmapSub":   "Covering all skills every Network Engineer must know.",
  "home.ctaTitle":     "Start Learning — Free",
  "home.ctaBody":      "Clear roadmap, real labs, AI Tutor ready to help — reach Network Engineer faster than you think.",
  "home.ctaBtn":       "Start Now",
  "home.ctaAi":        "Try AI Tutor",

  // ── Dashboard ───────────────────────────────────────────────────
  "dash.welcome":        "Welcome back,",
  "dash.subtitle":       "You are now at level",
  "dash.continueLbl":    "Continue from VLAN & Trunk or do a recommended lab to level up.",
  "dash.continueLearning":"Continue Learning",
  "dash.askAi":          "Ask AI Tutor",
  "dash.allCourses":     "All Courses →",
  "dash.allLabs":        "All Labs →",
  "dash.allQuizzes":     "All Quizzes →",
  "dash.allBadges":      "All Badges →",
  "dash.learningProgress":"Learning Progress",
  "dash.weeklyGoal":     "Weekly Goal",
  "dash.roadmapProgress":"Roadmap Progress",
  "dash.recentAchieve":  "Recent Achievements",
  "dash.quizScores":     "Latest Quiz Scores",
  "dash.skillLevel":     "Skill Level Path",
  "dash.aiPreview":      "AI Network Tutor",
  "dash.recommended":    "Recommended Labs",

  // ── Roadmap ─────────────────────────────────────────────────────
  "roadmap.title":       "Network Engineer Roadmap",
  "roadmap.subtitle":    "10-level structured learning path from beginner to Network Architect.",
  "roadmap.filter.all":  "All Levels",
  "roadmap.filter.done": "Completed",
  "roadmap.filter.wip":  "In Progress",
  "roadmap.filter.lock": "Locked",
  "roadmap.skills":      "Key Skills",
  "roadmap.objectives":  "Objectives",
  "roadmap.viewCourses": "View Courses",
  "roadmap.startLab":    "Start Lab",
  "roadmap.empty":       "No levels match this filter.",

  // ── Courses ─────────────────────────────────────────────────────
  "courses.title":       "Courses",
  "courses.subtitle":    "Structured courses from fundamentals to advanced networking.",
  "courses.search":      "Search courses...",
  "courses.lessons":     "lessons",
  "courses.modules":     "modules",
  "courses.enroll":      "Start Course",
  "courses.continue":    "Continue",
  "courses.empty":       "No courses found.",

  // ── Labs ────────────────────────────────────────────────────────
  "labs.title":          "Hands-on Labs",
  "labs.subtitle":       "Practice real network scenarios with step-by-step guidance.",
  "labs.start":          "Start Lab",
  "labs.objectives":     "Lab Objectives",
  "labs.empty":          "No labs found.",

  // ── Quiz ────────────────────────────────────────────────────────
  "quiz.title":          "Quiz Center",
  "quiz.subtitle":       "Test your knowledge with quizzes for every level.",
  "quiz.questions":      "questions",
  "quiz.timeLimit":      "Time Limit",
  "quiz.passing":        "Passing Score",
  "quiz.takeQuiz":       "Take Quiz",
  "quiz.empty":          "No quizzes found.",

  // ── Troubleshooting ─────────────────────────────────────────────
  "trouble.title":       "Troubleshooting Guides",
  "trouble.subtitle":    "Step-by-step guides for common network problems.",
  "trouble.search":      "Search guides...",
  "trouble.symptoms":    "Symptoms",
  "trouble.steps":       "Steps",
  "trouble.readGuide":   "Read Guide",
  "trouble.empty":       "No guides found.",

  // ── AI Tutor ────────────────────────────────────────────────────
  "ai.title":            "AI Network Tutor",
  "ai.subtitle":         "Ask anything about networking — explain, config, lab, troubleshoot.",
  "ai.placeholder":      "Ask about networking...",
  "ai.send":             "Send",
  "ai.modes":            "Modes",
  "ai.mockNote":         "AI Tutor is in demo mode. Connect OpenAI API for real responses.",

  // ── Progress ────────────────────────────────────────────────────
  "progress.title":      "My Progress",
  "progress.subtitle":   "Track your learning journey and achievements.",
  "progress.xp":         "Total XP",
  "progress.streak":     "Day Streak",
  "progress.badges":     "Badges",
  "progress.completed":  "Courses Completed",

  // ── Settings ────────────────────────────────────────────────────
  "settings.language":   "Language",
  "settings.theme":      "Theme",
  "settings.langEn":     "English",
  "settings.langTh":     "Thai",
} as const;

const th: Record<keyof typeof en, string> = {
  // ── Navigation ──────────────────────────────────────────────────
  "nav.dashboard":       "แดชบอร์ด",
  "nav.roadmap":         "โรดแมป",
  "nav.courses":         "คอร์สเรียน",
  "nav.labs":            "แลป",
  "nav.quiz":            "ควิซ",
  "nav.troubleshooting": "แก้ปัญหา",
  "nav.aiTutor":         "AI ติวเตอร์",
  "nav.progress":        "ความก้าวหน้า",
  "nav.portfolio":       "พอร์ตโฟลิโอ",
  "nav.tools":           "เครื่องมือ",
  "nav.settings":        "ตั้งค่า",

  // ── Common ──────────────────────────────────────────────────────
  "common.loading":       "กำลังโหลด...",
  "common.empty":         "ยังไม่มีข้อมูล",
  "common.back":          "กลับ",
  "common.continue":      "เรียนต่อ",
  "common.start":         "เริ่ม",
  "common.viewAll":       "ดูทั้งหมด",
  "common.learnMore":     "เรียนรู้เพิ่ม",
  "common.completed":     "เสร็จแล้ว",
  "common.inProgress":    "กำลังเรียน",
  "common.locked":        "ล็อก",
  "common.beginner":      "เริ่มต้น",
  "common.intermediate":  "ระดับกลาง",
  "common.advanced":      "ขั้นสูง",
  "common.expert":        "ผู้เชี่ยวชาญ",
  "common.passed":        "ผ่าน",
  "common.failed":        "ไม่ผ่าน",
  "common.score":         "คะแนน",
  "common.duration":      "ระยะเวลา",
  "common.level":         "ระดับ",
  "common.skills":        "ทักษะ",
  "common.objectives":    "วัตถุประสงค์",
  "common.category":      "หมวดหมู่",
  "common.search":        "ค้นหา...",
  "common.filter":        "กรอง",
  "common.all":           "ทั้งหมด",
  "common.min":           "นาที",
  "common.xp":            "คะแนนประสบการณ์",
  "common.nextLesson":    "บทเรียนถัดไป",

  // ── Home ────────────────────────────────────────────────────────
  "home.badge":        "เส้นทาง Network Engineer",
  "home.title":        "เริ่มเส้นทางสู่ Network Engineer",
  "home.subtitle":     "เรียน Network แบบเป็นระบบ ตั้งแต่พื้นฐาน IP, VLAN, Routing, Firewall, Wireless, Monitoring, Automation จนถึง Network Design ระดับ Senior",
  "home.ctaStart":     "เริ่มเรียนเลย",
  "home.ctaRoadmap":   "ดู Roadmap",
  "home.statsLessons": "บทเรียน",
  "home.statsLabs":    "แลป",
  "home.statsLevels":  "ระดับ",
  "home.features":     "ทุกอย่างในที่เดียว",
  "home.featuresSub":  "แพลตฟอร์มเรียนรู้ครบวงจร ตั้งแต่ Roadmap, Lab, AI Tutor จนถึง Portfolio",
  "home.path":         "เส้นทางการเรียนรู้",
  "home.pathSub":      "ก้าวทีละขั้นจาก Beginner ไปถึง Network Architect",
  "home.roadmapTitle": "10 ระดับสู่ความเชี่ยวชาญ",
  "home.roadmapSub":   "ครอบคลุมทุกทักษะที่ Network Engineer ต้องรู้",
  "home.ctaTitle":     "เริ่มเรียนได้เลย — ฟรี",
  "home.ctaBody":      "Roadmap ชัดเจน, Lab จริง, AI Tutor พร้อมช่วย — ก้าวสู่ Network Engineer ได้เร็วกว่าที่คิด",
  "home.ctaBtn":       "เริ่มเรียนเลย",
  "home.ctaAi":        "ลอง AI Tutor",

  // ── Dashboard ───────────────────────────────────────────────────
  "dash.welcome":         "ยินดีต้อนรับกลับ,",
  "dash.subtitle":        "ตอนนี้คุณอยู่ระดับ",
  "dash.continueLbl":     "เรียนต่อจาก VLAN & Trunk หรือทำ Lab ที่แนะนำเพื่ออัปสกิล",
  "dash.continueLearning":"เรียนต่อ",
  "dash.askAi":           "ถาม AI Tutor",
  "dash.allCourses":      "ดูคอร์สทั้งหมด →",
  "dash.allLabs":         "ดูแลปทั้งหมด →",
  "dash.allQuizzes":      "ดูควิซทั้งหมด →",
  "dash.allBadges":       "ดูแบดจ์ทั้งหมด →",
  "dash.learningProgress":"ความก้าวหน้าการเรียน",
  "dash.weeklyGoal":      "เป้าหมายรายสัปดาห์",
  "dash.roadmapProgress": "ความก้าวหน้า Roadmap",
  "dash.recentAchieve":   "ความสำเร็จล่าสุด",
  "dash.quizScores":      "คะแนนควิซล่าสุด",
  "dash.skillLevel":      "เส้นทางระดับทักษะ",
  "dash.aiPreview":       "AI Network Tutor",
  "dash.recommended":     "แลปที่แนะนำ",

  // ── Roadmap ─────────────────────────────────────────────────────
  "roadmap.title":       "Roadmap Network Engineer",
  "roadmap.subtitle":    "เส้นทางการเรียน 10 ระดับ จากมือใหม่สู่ Network Architect",
  "roadmap.filter.all":  "ทุกระดับ",
  "roadmap.filter.done": "เสร็จแล้ว",
  "roadmap.filter.wip":  "กำลังเรียน",
  "roadmap.filter.lock": "ล็อก",
  "roadmap.skills":      "ทักษะหลัก",
  "roadmap.objectives":  "วัตถุประสงค์",
  "roadmap.viewCourses": "ดูคอร์ส",
  "roadmap.startLab":    "เริ่ม Lab",
  "roadmap.empty":       "ไม่มีระดับที่ตรงกับตัวกรองนี้",

  // ── Courses ─────────────────────────────────────────────────────
  "courses.title":       "คอร์สเรียน",
  "courses.subtitle":    "คอร์สมีโครงสร้างชัดเจน ตั้งแต่พื้นฐานถึงขั้นสูง",
  "courses.search":      "ค้นหาคอร์ส...",
  "courses.lessons":     "บทเรียน",
  "courses.modules":     "โมดูล",
  "courses.enroll":      "เริ่มเรียน",
  "courses.continue":    "เรียนต่อ",
  "courses.empty":       "ไม่พบคอร์สที่ค้นหา",

  // ── Labs ────────────────────────────────────────────────────────
  "labs.title":          "Hands-on Labs",
  "labs.subtitle":       "ฝึกแก้ปัญหา Network จริงพร้อมขั้นตอนแนะนำทีละขั้น",
  "labs.start":          "เริ่ม Lab",
  "labs.objectives":     "วัตถุประสงค์ Lab",
  "labs.empty":          "ไม่พบ Lab ที่ค้นหา",

  // ── Quiz ────────────────────────────────────────────────────────
  "quiz.title":          "ศูนย์ทดสอบความรู้",
  "quiz.subtitle":       "ทดสอบความรู้ด้วย Quiz ทุกระดับ",
  "quiz.questions":      "ข้อ",
  "quiz.timeLimit":      "เวลาทำ",
  "quiz.passing":        "คะแนนผ่าน",
  "quiz.takeQuiz":       "ทำควิซ",
  "quiz.empty":          "ไม่พบควิซ",

  // ── Troubleshooting ─────────────────────────────────────────────
  "trouble.title":       "คู่มือแก้ปัญหา Network",
  "trouble.subtitle":    "ขั้นตอนแก้ปัญหา Network ที่พบบ่อย พร้อม checklist",
  "trouble.search":      "ค้นหาปัญหา...",
  "trouble.symptoms":    "อาการ",
  "trouble.steps":       "ขั้นตอน",
  "trouble.readGuide":   "อ่านคู่มือ",
  "trouble.empty":       "ไม่พบคู่มือที่ค้นหา",

  // ── AI Tutor ────────────────────────────────────────────────────
  "ai.title":            "AI Network Tutor",
  "ai.subtitle":         "ถามอะไรก็ได้เกี่ยวกับ Network — อธิบาย, Config, Lab, แก้ปัญหา",
  "ai.placeholder":      "ถามเกี่ยวกับ Network...",
  "ai.send":             "ส่ง",
  "ai.modes":            "โหมด",
  "ai.mockNote":         "AI Tutor อยู่ในโหมดเดโม เชื่อม OpenAI API เพื่อรับคำตอบจริง",

  // ── Progress ────────────────────────────────────────────────────
  "progress.title":      "ความก้าวหน้าของฉัน",
  "progress.subtitle":   "ติดตามเส้นทางการเรียนรู้และความสำเร็จ",
  "progress.xp":         "คะแนนรวม (XP)",
  "progress.streak":     "วันติดต่อกัน",
  "progress.badges":     "แบดจ์",
  "progress.completed":  "คอร์สที่เรียนจบ",

  // ── Settings ────────────────────────────────────────────────────
  "settings.language":   "ภาษา",
  "settings.theme":      "ธีม",
  "settings.langEn":     "อังกฤษ",
  "settings.langTh":     "ไทย",
};

export type TranslationKey = keyof typeof en;
export const translations: Record<Lang, Record<TranslationKey, string>> = { en, th };

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}
