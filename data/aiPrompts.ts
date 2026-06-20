export type AiMode = "explain" | "config" | "log" | "lab" | "quiz" | "rca";

export type AiPromptSuggestion = {
  id: string;
  title: string;
  description: string;
  mode: AiMode;
  prompt: string;
};

export const aiModes: {
  id: AiMode;
  label: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    id: "explain",
    label: "Explain Topic",
    description: "อธิบายหัวข้อ Network แบบเข้าใจง่าย",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    color: "#38bdf8",
  },
  {
    id: "config",
    label: "Analyze Config",
    description: "ตรวจ Config Cisco / Firewall / Network Device",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    color: "#8b5cf6",
  },
  {
    id: "log",
    label: "Analyze Log",
    description: "วิเคราะห์ Log เช่น MAC Flapping, OSPF Down, DHCP Error",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "#f97316",
  },
  {
    id: "lab",
    label: "Generate Lab",
    description: "สร้างโจทย์ Lab สำหรับฝึก Network",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    color: "#22c55e",
  },
  {
    id: "quiz",
    label: "Generate Quiz",
    description: "สร้างคำถาม Quiz จากหัวข้อที่เลือก",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "#facc15",
  },
  {
    id: "rca",
    label: "RCA Helper",
    description: "ช่วยเขียน Root Cause Analysis หลังเกิด Incident",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "#ef4444",
  },
];

export const aiPromptSuggestions: AiPromptSuggestion[] = [
  {
    id: "explain-ospf",
    title: "อธิบาย OSPF",
    description: "ให้ AI อธิบาย OSPF แบบเข้าใจง่ายพร้อมตัวอย่าง",
    mode: "explain",
    prompt: "อธิบาย OSPF แบบเข้าใจง่าย พร้อมตัวอย่างใช้งานจริง และคำสั่งที่เกี่ยวข้องบน Cisco",
  },
  {
    id: "explain-bgp",
    title: "อธิบาย BGP",
    description: "ให้ AI อธิบาย BGP และ AS Path พร้อมตัวอย่าง",
    mode: "explain",
    prompt: "อธิบาย BGP และการทำงานของ AS Path แบบเข้าใจง่าย พร้อม Use Case จริง",
  },
  {
    id: "explain-spanning-tree",
    title: "อธิบาย Spanning Tree",
    description: "STP, RSTP, Port Roles คืออะไร",
    mode: "explain",
    prompt: "อธิบาย Spanning Tree Protocol (STP และ RSTP) แบบเข้าใจง่าย พร้อม Port Roles และตัวอย่างปัญหาที่พบบ่อย",
  },
  {
    id: "explain-vlan",
    title: "อธิบาย VLAN & Trunk",
    description: "VLAN, Access Port, Trunk Port คืออะไร",
    mode: "explain",
    prompt: "อธิบาย VLAN, Access Port และ Trunk Port แบบเข้าใจง่าย พร้อม Config ตัวอย่างบน Cisco Switch",
  },
  {
    id: "analyze-mac-flap",
    title: "วิเคราะห์ MAC Flapping",
    description: "ให้ AI ช่วยวิเคราะห์ Log MAC Flapping",
    mode: "log",
    prompt: "ช่วยวิเคราะห์ MAC Flapping log นี้ และบอกสาเหตุที่เป็นไปได้พร้อมแนวทางแก้ไข:\n%MACFLAP-4-MOVE: Host 0012.3456.abcd in vlan 10 is flapping between port Gi1/0/1 and port Gi1/0/2",
  },
  {
    id: "analyze-ospf-down",
    title: "วิเคราะห์ OSPF Neighbor Down",
    description: "ให้ AI วิเคราะห์ log OSPF neighbor ล่ม",
    mode: "log",
    prompt: "ช่วยวิเคราะห์ log OSPF Neighbor Down นี้ บอกสาเหตุและขั้นตอนแก้ไข:\n%OSPF-5-ADJCHG: Process 1, Nbr 10.0.0.2 on GigabitEthernet0/0 from FULL to DOWN, Neighbor Down: Dead timer expired",
  },
  {
    id: "analyze-dhcp-error",
    title: "วิเคราะห์ DHCP Error",
    description: "ให้ AI วิเคราะห์ปัญหา DHCP ไม่แจก IP",
    mode: "log",
    prompt: "ช่วยวิเคราะห์ปัญหา DHCP ไม่แจก IP จาก log นี้:\n%DHCPD-4-PING_CONFLICT: DHCP address conflict: server pinged 192.168.1.100",
  },
  {
    id: "config-cisco-switch",
    title: "ตรวจ Cisco Switch Config",
    description: "ให้ AI ตรวจ Config Switch Cisco",
    mode: "config",
    prompt:
      "ช่วยตรวจ Config Cisco Switch นี้ว่ามีอะไรผิดปกติหรือไม่ และแนะนำ Best Practice:\ninterface GigabitEthernet0/1\n switchport mode access\n switchport access vlan 10\ninterface GigabitEthernet0/2\n switchport mode trunk\n switchport trunk allowed vlan 10,20",
  },
  {
    id: "generate-vlan-lab",
    title: "สร้าง VLAN Lab",
    description: "ให้ AI สร้าง Lab ฝึก VLAN และ Trunk",
    mode: "lab",
    prompt:
      "สร้าง Lab ฝึก VLAN และ Trunk พร้อมโจทย์, Topology, IP Table และ Task ระดับ Beginner",
  },
  {
    id: "generate-ospf-lab",
    title: "สร้าง OSPF Lab",
    description: "ให้ AI สร้าง Lab ฝึก OSPF Multi-Area",
    mode: "lab",
    prompt:
      "สร้าง Lab ฝึก OSPF Multi-Area พร้อม Topology, IP Table, Task และ Expected Output ระดับ Intermediate",
  },
  {
    id: "generate-subnet-quiz",
    title: "สร้าง Quiz Subnetting",
    description: "ให้ AI สร้าง Quiz เรื่อง Subnetting 10 ข้อ",
    mode: "quiz",
    prompt: "สร้าง Quiz เรื่อง Subnetting 10 ข้อ พร้อมเฉลยและคำอธิบายแต่ละข้อ",
  },
  {
    id: "generate-ospf-quiz",
    title: "สร้าง Quiz OSPF",
    description: "ให้ AI สร้าง Quiz เรื่อง OSPF 5 ข้อ",
    mode: "quiz",
    prompt: "สร้าง Quiz เรื่อง OSPF 5 ข้อ ระดับ Intermediate พร้อมเฉลยและคำอธิบาย",
  },
  {
    id: "rca-internet-down",
    title: "RCA: Internet ล่ม",
    description: "ให้ AI ช่วยเขียน RCA กรณี Internet ล่ม",
    mode: "rca",
    prompt: "ช่วยเขียน RCA กรณี Internet ใช้งานไม่ได้ทั้งสาขา ผลกระทบ: พนักงาน 200 คน, ระยะเวลา 45 นาที",
  },
  {
    id: "rca-vlan-outage",
    title: "RCA: VLAN Outage",
    description: "ให้ AI ช่วยเขียน RCA กรณี VLAN ใช้งานไม่ได้",
    mode: "rca",
    prompt: "ช่วยเขียน RCA กรณี VLAN 20 ของแผนก Finance ใช้งานไม่ได้ เป็นเวลา 1 ชั่วโมง",
  },
];

export const aiMockHistory = [
  { id: "h1", title: "อธิบาย OSPF", mode: "explain" as AiMode, time: "10 นาทีที่แล้ว" },
  { id: "h2", title: "วิเคราะห์ MAC Flapping Log", mode: "log" as AiMode, time: "1 ชั่วโมงที่แล้ว" },
  { id: "h3", title: "สร้าง VLAN Lab", mode: "lab" as AiMode, time: "วานนี้" },
  { id: "h4", title: "Quiz Subnetting 10 ข้อ", mode: "quiz" as AiMode, time: "2 วันที่แล้ว" },
  { id: "h5", title: "RCA Internet Down", mode: "rca" as AiMode, time: "3 วันที่แล้ว" },
  { id: "h6", title: "ตรวจ Cisco Switch Config", mode: "config" as AiMode, time: "1 สัปดาห์ที่แล้ว" },
];
