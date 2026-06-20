import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id:          "roadmap",
    title:       "Structured Roadmap",
    description: "10-Level Roadmap จาก Network Beginner ถึง Network Architect พร้อม skill checklist และ objectives ที่ชัดเจน",
    icon:        "Map",
    color:       "cyan",
  },
  {
    id:          "labs",
    title:       "Hands-on Labs",
    description: "Lab จำลองสถานการณ์จริง Cisco IOS, VLAN, Routing, Firewall, Wireless พร้อม command guide และ expected output",
    icon:        "FlaskConical",
    color:       "violet",
  },
  {
    id:          "quiz",
    title:       "Quiz System",
    description: "Quiz ตรวจสอบความรู้ทุก Level พร้อม scoring, pass/fail และ explanation ทุกข้อ",
    icon:        "Brain",
    color:       "emerald",
  },
  {
    id:          "troubleshooting",
    title:       "Troubleshooting Guide",
    description: "คู่มือแก้ปัญหา Network จริง ตั้งแต่ Internet ไม่ได้ถึง OSPF/BGP issue พร้อม step-by-step",
    icon:        "Wrench",
    color:       "amber",
  },
  {
    id:          "ai-tutor",
    title:       "AI Network Tutor",
    description: "AI สำหรับถาม-ตอบ Network โดยเฉพาะ 10 Modes: อธิบาย, Config, Log Analysis, Lab, Quiz, RCA และอื่นๆ",
    icon:        "Bot",
    color:       "violet",
  },
  {
    id:          "portfolio",
    title:       "Portfolio Builder",
    description: "สร้าง Portfolio สาย Network: Config ที่เคยทำ, Project, Lab Report, RCA Analysis สำหรับสมัครงาน",
    icon:        "FolderKanban",
    color:       "cyan",
  },
  {
    id:          "tools",
    title:       "Network Tools",
    description: "Subnet Calculator, VLAN Planner, Config Generator, Command Generator, Packet Flow Viewer ใช้งานได้เลย",
    icon:        "Network",
    color:       "emerald",
  },
  {
    id:          "senior-path",
    title:       "Senior Engineer Path",
    description: "Level 9-10 ออกแบบ Network ระดับ Enterprise, Cloud Network, SD-WAN, Network Automation ด้วย Python",
    icon:        "Trophy",
    color:       "amber",
  },
];
