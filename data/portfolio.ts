export type PortfolioType =
  | "lab-summary"
  | "network-diagram"
  | "config"
  | "rca-report"
  | "automation-script"
  | "monitoring"
  | "design";

export type PortfolioItem = {
  id: string;
  title: string;
  type: PortfolioType;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  skills: string[];
  tools: string[];
  createdAt: string;
  summary: string;
  problem?: string;
  solution?: string;
  result?: string;
  configExample?: string;
  rca?: {
    impact: string;
    rootCause: string;
    resolution: string;
    prevention: string[];
  };
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "inter-vlan-routing",
    title: "Inter-VLAN Routing Lab Summary",
    type: "lab-summary",
    category: "Switching / Routing",
    level: "Beginner",
    description: "สรุปการทำ Lab Inter-VLAN Routing ด้วย Router-on-a-Stick บน Cisco IOS",
    skills: ["VLAN", "Trunk", "Router-on-a-Stick", "Sub-interface"],
    tools: ["Cisco IOS", "Packet Tracer", "GNS3"],
    createdAt: "Jan 2025",
    summary:
      "ออกแบบและ Config ระบบ Inter-VLAN Routing สำหรับบริษัทที่มี 3 แผนก (HR, IT, Finance) โดยใช้ Trunk Link ระหว่าง Switch กับ Router และตั้ง Sub-interface ให้แต่ละ VLAN",
    problem:
      "PC ใน VLAN ต่างกันไม่สามารถสื่อสารกันได้ ต้องการแยก Broadcast Domain แต่ยังคงให้ Traffic ข้าม VLAN ได้ผ่าน Router",
    solution:
      "ใช้ Router-on-a-Stick: ตั้ง Trunk Port บน Switch เชื่อม Router, สร้าง Sub-interface บน Router 1 ต่อ 1 VLAN, กำหนด IP เป็น Default Gateway แต่ละ VLAN",
    result:
      "PC ข้าม VLAN Ping กันได้สำเร็จ, Broadcast แยกอิสระ, สามารถ Apply ACL ระหว่าง VLAN ได้",
    configExample: `! SW1 — Trunk Port
interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30

! R1 — Sub-interfaces
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0

interface GigabitEthernet0/0.30
 encapsulation dot1Q 30
 ip address 192.168.30.1 255.255.255.0`,
  },
  {
    id: "ospf-single-area",
    title: "OSPF Single Area Lab",
    type: "lab-summary",
    category: "Routing",
    level: "Intermediate",
    description: "ออกแบบและ Config OSPF Area 0 สำหรับเครือข่ายที่มี 4 Router",
    skills: ["OSPF", "Area 0", "LSA", "DR/BDR Election"],
    tools: ["Cisco IOS", "GNS3", "EVE-NG"],
    createdAt: "Feb 2025",
    summary:
      "Config OSPF บน 4 Router เชื่อมกันในรูปแบบ Hub-and-Spoke, ตรวจสอบ Neighbor Relationship, LSDB และ Routing Table",
    problem:
      "ต้องการให้ Router ทั้ง 4 ตัวแลกเปลี่ยน Route อัตโนมัติและ Failover ได้เมื่อเส้นทางล่ม",
    solution:
      "Config OSPF Process 1 บนทุก Router, ใช้ Network Statement กำหนด Interface ที่เข้าร่วม OSPF, Verify ด้วย show ip ospf neighbor",
    result:
      "OSPF Neighbor Full Adjacency บนทุก Link, Routing Table สมบูรณ์, ทดสอบ Failover สำเร็จภายใน Dead Timer",
    configExample: `router ospf 1
 network 10.0.0.0 0.0.0.3 area 0
 network 10.0.1.0 0.0.0.3 area 0
 network 192.168.1.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/1

! Verify
show ip ospf neighbor
show ip ospf database
show ip route ospf`,
  },
  {
    id: "dhcp-troubleshooting",
    title: "DHCP Troubleshooting Case",
    type: "rca-report",
    category: "Services",
    level: "Intermediate",
    description: "Case Study การแก้ปัญหา DHCP ไม่แจก IP ให้ผู้ใช้ในแผนก HR",
    skills: ["DHCP", "IP Helper-Address", "DHCP Scope", "Troubleshooting"],
    tools: ["Cisco IOS", "Windows Server", "Wireshark"],
    createdAt: "Feb 2025",
    summary:
      "วิเคราะห์และแก้ปัญหา DHCP ไม่แจก IP ให้ PC ในแผนก HR หลังย้าย Switch ใหม่ พบว่า IP Helper-Address หายไป",
    problem:
      "PC ในแผนก HR ได้รับ IP 169.254.x.x แทนที่จะได้จาก DHCP Server, ปัญหาเกิดขึ้นหลังย้าย Rack Switch",
    solution:
      "ตรวจสอบ show ip interface และพบ ip helper-address หายไปจาก Interface VLAN 10 หลังเปลี่ยน Running-Config, เพิ่ม ip helper-address กลับ",
    result:
      "PC ทั้งแผนกได้รับ IP ถูกต้อง, เพิ่ม Config ลง Startup-Config เพื่อป้องกัน",
    rca: {
      impact: "PC 50 เครื่องในแผนก HR ไม่ได้รับ IP, ทำงานไม่ได้ 30 นาที",
      rootCause: "ip helper-address หายไปจาก Interface VLAN 10 หลังเปลี่ยน Switch และ Restore Config ไม่ครบ",
      resolution: "เพิ่ม ip helper-address 10.0.0.10 บน Interface VLAN 10 ทุก Switch Layer 3",
      prevention: [
        "Backup Running-Config ก่อน Change ทุกครั้ง",
        "มี Post-Check Checklist รวม ip helper-address",
        "สร้าง Config Template สำหรับ Interface VLAN",
        "Monitor DHCP Lease Count ให้แจ้งเตือนเมื่อลดลงผิดปกติ",
      ],
    },
  },
  {
    id: "internet-down-rca",
    title: "Internet Down RCA Report",
    type: "rca-report",
    category: "Connectivity",
    level: "Intermediate",
    description: "Root Cause Analysis กรณี Internet ใช้งานไม่ได้ทั้งสาขา 45 นาที",
    skills: ["RCA", "Incident Management", "Routing", "Firewall", "ISP"],
    tools: ["Cisco ASA", "Zabbix", "Wireshark", "Excel"],
    createdAt: "Mar 2025",
    summary:
      "เขียน RCA ฉบับสมบูรณ์หลังเกิด Internet Outage 45 นาที สาเหตุจาก Default Route บน Firewall ถูกเปลี่ยนระหว่าง Change Window",
    problem:
      "Internet ใช้งานไม่ได้ทั้งสาขา 200+ คน ไม่สามารถเข้า Cloud Service และ Internet ได้ตั้งแต่ 09:00",
    solution:
      "Rollback Default Route บน Cisco ASA ให้ชี้ IP Gateway ของ ISP ที่ถูกต้อง และทดสอบ Connectivity ก่อนปิด Incident",
    result:
      "Internet กลับมาภายใน 10 นาทีหลังแก้ไข, เพิ่ม Monitoring แจ้งเตือน Default Route Change",
    rca: {
      impact: "พนักงาน 200+ คน ไม่สามารถใช้ Internet และ Cloud Service ได้ 45 นาที สูญเสียผลผลิตประมาณ 150 man-hours",
      rootCause: "Default Route บน Cisco ASA ถูกเปลี่ยนระหว่าง Change Window เมื่อคืน โดยไม่มี Post-Check และไม่ถูก Detect จนถึงเช้า",
      resolution: "แก้ไข Default Route ให้ชี้ ip route 0.0.0.0 0.0.0.0 [ISP_Gateway] และยืนยัน Connectivity สำเร็จ",
      prevention: [
        "เพิ่ม Automated Test หลัง Change: Ping 8.8.8.8 และ Trace Route",
        "เพิ่ม Alert ใน Zabbix เมื่อ Default Route เปลี่ยน",
        "ทบทวน Change Review Process ให้ต้องมี Post-Check",
        "ทดสอบ Rollback Plan ก่อน Change ทุกครั้ง",
      ],
    },
  },
  {
    id: "firewall-acl-design",
    title: "Firewall ACL Policy Design",
    type: "config",
    category: "Security",
    level: "Intermediate",
    description: "ออกแบบ ACL Policy บน Cisco ASA สำหรับควบคุม Traffic ระหว่าง Zone",
    skills: ["Firewall", "ACL", "Security Zone", "NAT", "Cisco ASA"],
    tools: ["Cisco ASA", "ASDM", "Wireshark"],
    createdAt: "Mar 2025",
    summary:
      "ออกแบบ Security Policy สำหรับบริษัทขนาดกลาง แบ่งเป็น Inside, DMZ และ Outside Zone พร้อม ACL สำหรับแต่ละ Flow",
    problem:
      "บริษัทต้องการให้ Web Server ใน DMZ เข้าถึงได้จาก Internet แต่ห้าม Internet เข้าถึง Internal Network โดยตรง",
    solution:
      "ออกแบบ 3-Zone Architecture และ Config ACL บน Cisco ASA ควบคุม Traffic ตาม Policy",
    result:
      "Web Server เข้าถึงได้จาก Internet บน Port 80/443 เท่านั้น, Internal Network ปลอดภัยจาก Internet",
    configExample: `! Cisco ASA — ACL Policy
access-list OUTSIDE_IN extended permit tcp any host 203.0.113.10 eq 80
access-list OUTSIDE_IN extended permit tcp any host 203.0.113.10 eq 443
access-list OUTSIDE_IN extended deny ip any any log

access-list DMZ_IN extended permit tcp 10.0.2.0 255.255.255.0 any eq 443
access-list DMZ_IN extended deny ip any 10.0.1.0 255.255.255.0
access-list DMZ_IN extended permit ip any any

! NAT
nat (inside,outside) dynamic interface
nat (dmz,outside) static 203.0.113.10

! Apply to Interface
access-group OUTSIDE_IN in interface outside
access-group DMZ_IN in interface dmz`,
  },
  {
    id: "network-monitoring",
    title: "Network Monitoring Dashboard",
    type: "monitoring",
    category: "Monitoring",
    level: "Intermediate",
    description: "ออกแบบและติดตั้ง Monitoring Dashboard สำหรับ Network Infrastructure",
    skills: ["Monitoring", "SNMP", "Zabbix", "Grafana", "Alerting"],
    tools: ["Zabbix", "Grafana", "SNMP", "Python"],
    createdAt: "Apr 2025",
    summary:
      "ออกแบบระบบ Monitoring ครอบคลุม Interface Up/Down, Bandwidth Utilization, BGP Neighbor State, OSPF Adjacency และ Device Health",
    problem:
      "ทีมไม่มี Visibility ใน Network — ไม่รู้ว่า Link Down หรือ Bandwidth เกินจนกว่าผู้ใช้จะแจ้ง",
    solution:
      "ติดตั้ง Zabbix SNMP Monitoring บนทุก Router/Switch, สร้าง Grafana Dashboard และ Alert ผ่าน LINE Notify",
    result:
      "ลดเวลา MTTR จาก 45 นาทีเหลือ 8 นาที เนื่องจาก Alert แจ้งก่อนผู้ใช้โทรมา",
  },
  {
    id: "python-config-backup",
    title: "Python Config Backup Script",
    type: "automation-script",
    category: "Automation",
    level: "Intermediate",
    description: "Python Script สำหรับ Auto Backup Running-Config จาก Cisco Router/Switch ทุกวัน",
    skills: ["Python", "Netmiko", "Paramiko", "Automation", "Cisco IOS"],
    tools: ["Python 3.x", "Netmiko", "Git", "Cron"],
    createdAt: "Apr 2025",
    summary:
      "เขียน Python Script ใช้ Netmiko SSH เข้าหา Cisco Device ทั้งหมด, ดึง show running-config และบันทึกลงไฟล์รายวัน พร้อม Git Version Control",
    problem:
      "ทีมไม่มี Backup Config ที่สม่ำเสมอ บางครั้ง Config หายหลัง Reload และไม่มีใครทำ Backup",
    solution:
      "เขียน Python Script + Netmiko SSH เข้า Device ทุกตัว, ดึง running-config และบันทึกพร้อม Timestamp, Run ด้วย Cron ทุกคืน",
    result:
      "ระบบ Backup ทำงานอัตโนมัติทุกคืน 02:00, Config ทุกวันถูกเก็บไว้ใน Git สามารถ Diff ดูการเปลี่ยนแปลงได้",
    configExample: `import netmiko
import datetime
import os

devices = [
    {"device_type": "cisco_ios", "host": "192.168.1.1", "username": "admin", "password": "secret"},
    {"device_type": "cisco_ios", "host": "192.168.1.2", "username": "admin", "password": "secret"},
]

def backup_config(device):
    conn = netmiko.ConnectHandler(**device)
    hostname = conn.find_prompt().replace("#", "").strip()
    config = conn.send_command("show running-config")
    conn.disconnect()

    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    filename = f"backups/{hostname}_{date_str}.cfg"
    os.makedirs("backups", exist_ok=True)
    with open(filename, "w") as f:
        f.write(config)
    print(f"✓ Backed up: {hostname}")

for device in devices:
    backup_config(device)`,
  },
  {
    id: "branch-network-design",
    title: "Branch Network Design",
    type: "design",
    category: "Network Design",
    level: "Advanced",
    description: "ออกแบบ Network Infrastructure สำหรับสาขาใหม่ขนาด 100 คน",
    skills: ["Network Design", "VLAN", "OSPF", "Firewall", "Wi-Fi", "SD-WAN"],
    tools: ["Cisco Catalyst", "Cisco ASA", "Cisco AP", "Visio", "draw.io"],
    createdAt: "May 2025",
    summary:
      "ออกแบบ Network ครบวงจรสำหรับสาขาใหม่: Layer 2 / Layer 3 Design, IP Addressing, Routing, Security Zone, Wi-Fi Coverage และ WAN Connectivity",
    problem:
      "สาขาใหม่ต้องการ Network ที่ปลอดภัย แยก VLAN ได้ เชื่อมกับ HQ และ Internet ได้พร้อมกัน รองรับ Wi-Fi และ IP Phone",
    solution:
      "ออกแบบ 3-Tier Architecture: Access Layer (Switch), Distribution Layer (L3 Switch), Core/WAN Layer (Router + Firewall) พร้อม VLAN แยกตามแผนก",
    result:
      "Network Design ผ่าน Review และนำไปใช้งานจริง รองรับ 100 User พร้อม Redundancy และ Security Policy ครบถ้วน",
  },
];

export const portfolioStats = {
  total:           portfolioItems.length,
  labSummaries:    portfolioItems.filter((p) => p.type === "lab-summary").length,
  rcaReports:      portfolioItems.filter((p) => p.type === "rca-report").length,
  automationScripts: portfolioItems.filter((p) => p.type === "automation-script").length,
  networkDesigns:  portfolioItems.filter((p) => p.type === "design").length,
  configs:         portfolioItems.filter((p) => p.type === "config").length,
};

export const allSkills = Array.from(
  new Set(portfolioItems.flatMap((p) => p.skills))
).sort();

export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.id === id);
}

export const typeLabel: Record<PortfolioType, string> = {
  "lab-summary":        "Lab Summary",
  "network-diagram":    "Network Diagram",
  "config":             "Config Example",
  "rca-report":         "RCA Report",
  "automation-script":  "Automation Script",
  "monitoring":         "Monitoring",
  "design":             "Network Design",
};

export const typeColor: Record<PortfolioType, string> = {
  "lab-summary":        "#38bdf8",
  "network-diagram":    "#8b5cf6",
  "config":             "#22c55e",
  "rca-report":         "#ef4444",
  "automation-script":  "#f97316",
  "monitoring":         "#facc15",
  "design":             "#8b5cf6",
};
