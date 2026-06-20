export interface CareerStep {
  role: string;
  description: string;
  salary?: string;
  yearsExp?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  steps: CareerStep[];
  requiredSkills: string[];
  targetCerts: string[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "support-to-network",
    title: "IT Support → Network Engineer",
    description: "เส้นทางสำหรับคนที่เริ่มจาก IT Support หรือ Helpdesk",
    steps: [
      { role: "IT Support / Helpdesk", description: "รับแจ้งปัญหา ติดตั้ง PC ดูแล LAN เบื้องต้น", yearsExp: "0-2 ปี" },
      { role: "Network Technician", description: "เดินสาย rack อุปกรณ์ ดูแล switch พื้นฐาน", yearsExp: "1-3 ปี" },
      { role: "Junior Network Engineer", description: "ดูแล VLAN, switch, router พื้นฐาน แก้ปัญหา L2/L3", yearsExp: "2-4 ปี" },
      { role: "Network Engineer", description: "ออกแบบ manage network องค์กร firewall VPN", yearsExp: "4-7 ปี" },
    ],
    requiredSkills: ["IP Address", "Subnetting", "VLAN", "Switch", "Router", "Firewall Basic", "Wi-Fi Basic", "Monitoring", "Troubleshooting"],
    targetCerts: ["CompTIA Network+", "CCNA"],
  },
  {
    id: "network-to-senior",
    title: "Network Engineer → Senior Network Engineer",
    description: "เส้นทางสำหรับ Network Engineer ที่ต้องการขึ้นระดับ Senior",
    steps: [
      { role: "Network Engineer", description: "ดูแล network องค์กร ออกแบบ implement change", yearsExp: "3-6 ปี" },
      { role: "Senior Network Engineer", description: "ออกแบบ network ซับซ้อน lead team troubleshoot ยากๆ", yearsExp: "6-10 ปี" },
      { role: "Network Lead / Team Lead", description: "บริหาร team วางแผน project vendor management", yearsExp: "8-12 ปี" },
      { role: "Network Architect", description: "ออกแบบ architecture ระดับ enterprise ทำ roadmap", yearsExp: "10+ ปี" },
    ],
    requiredSkills: ["OSPF Advanced", "BGP Advanced", "Firewall Design", "VPN Design", "SD-WAN", "Cloud Networking", "Automation", "RCA", "Change Management", "Project Planning"],
    targetCerts: ["CCNP Enterprise", "CCIE", "AWS/Azure Networking"],
  },
  {
    id: "network-to-security",
    title: "Network Engineer → Network Security",
    description: "เส้นทางสำหรับคนที่อยากเชี่ยวชาญด้าน Security",
    steps: [
      { role: "Network Engineer", description: "พื้นฐาน network แข็งแกร่ง", yearsExp: "3-5 ปี" },
      { role: "Network Security Engineer", description: "ดูแล Firewall, VPN, IPS/IDS, NAC", yearsExp: "5-8 ปี" },
      { role: "Security Architect", description: "ออกแบบ security architecture zero trust", yearsExp: "8+ ปี" },
    ],
    requiredSkills: ["Firewall Policy", "VPN", "ACL", "802.1X", "Zero Trust", "SIEM", "SOC"],
    targetCerts: ["Security+", "Fortinet NSE", "Palo Alto PCNSE", "CISSP"],
  },
  {
    id: "network-to-cloud",
    title: "Network Engineer → Cloud Network",
    description: "เส้นทางสำหรับคนที่อยากไปสาย Cloud Networking",
    steps: [
      { role: "Network Engineer", description: "พื้นฐาน network + เริ่มเรียน Cloud", yearsExp: "3-5 ปี" },
      { role: "Cloud Network Engineer", description: "AWS/Azure VPC, VPN Gateway, Direct Connect", yearsExp: "5-7 ปี" },
      { role: "Cloud Architect", description: "ออกแบบ hybrid cloud network SD-WAN SASE", yearsExp: "7+ ปี" },
    ],
    requiredSkills: ["AWS VPC", "Azure VNet", "SD-WAN", "SASE", "ZTNA", "Terraform"],
    targetCerts: ["AWS Solutions Architect", "Azure Network Engineer", "AWS Advanced Networking"],
  },
];

export const skillLevels = [
  "Network Beginner",
  "Helpdesk Network Ready",
  "Junior Network Engineer",
  "Network Engineer",
  "Advanced Network Engineer",
  "Senior Network Engineer",
  "Network Architect",
];
