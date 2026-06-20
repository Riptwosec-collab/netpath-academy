export type NetworkTool = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  href: string;
  icon: string; // SVG path
  color: string;
};

export const tools: NetworkTool[] = [
  {
    id: "diagram",
    title: "Network Diagram Viewer",
    description: "ดูตัวอย่าง Network Topology และ Packet Flow แบบ Interactive",
    category: "Design",
    difficulty: "Beginner",
    href: "/tools/diagram",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "#38bdf8",
  },
  {
    id: "subnet-calculator",
    title: "Subnet Calculator",
    description: "คำนวณ Network Address, Broadcast, Usable IP, Wildcard Mask",
    category: "IP Planning",
    difficulty: "Beginner",
    href: "/tools/subnet-calculator",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    color: "#22c55e",
  },
  {
    id: "vlan-planner",
    title: "VLAN Planner",
    description: "วางแผน VLAN, กำหนด Subnet, Gateway และ Generate Config",
    category: "Design",
    difficulty: "Beginner",
    href: "/tools/vlan-planner",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    color: "#8b5cf6",
  },
  {
    id: "command-generator",
    title: "Command Generator",
    description: "เลือกหมวดและอาการ แล้วรับคำสั่งที่ใช้ตรวจสอบ Network",
    category: "Troubleshooting",
    difficulty: "Beginner",
    href: "/tools/command-generator",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "#f97316",
  },
  {
    id: "config-generator",
    title: "Config Template Generator",
    description: "เลือก Template แล้วกรอก Field รับ Cisco Config ที่พร้อมใช้",
    category: "Configuration",
    difficulty: "Intermediate",
    href: "/tools/config-generator",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "#facc15",
  },
  {
    id: "packet-flow",
    title: "Packet Flow Viewer",
    description: "ดู Flow ของ Packet จาก PC ไป Internet ทีละ Step",
    category: "Learning",
    difficulty: "Beginner",
    href: "/tools/diagram",
    icon: "M13 5l7 7-7 7M5 5l7 7-7 7",
    color: "#ef4444",
  },
];
