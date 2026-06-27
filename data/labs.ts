/* ─── Types ─────────────────────────────────────────────────────── */
export type LabLevel  = "Beginner" | "Intermediate" | "Advanced";
export type LabStatus = "not-started" | "in-progress" | "completed" | "available";

export interface IpEntry {
  device:    string;
  interface: string;
  ip:        string;
  subnet:    string;
  gateway:   string;
  vlan?:     string;
  notes?:    string;
}

export interface TopologyLink {
  from: string;
  to:   string;
  port?: string;
  label?: string;
  bandwidth?: string;
  devices?: string[];
}

export interface Lab {
  id:              string;
  title:           string;
  category:        string;
  level:           LabLevel;
  duration:        string;
  status:          LabStatus;
  description:     string;
  scenario?:       string;
  objective?:      string;
  devices?:        string[];
  topology:        TopologyLink[] | {
    devices?:      { name: string; type: string; ip?: string }[];
    links?:        TopologyLink[];
    connections?:  { from: string; to: string; label?: string; bandwidth?: string }[];
  };
  ipTable:         IpEntry[];
  tasks:           string[];
  hints:           string[];
  expectedResult:  string;
  troubleshooting: string[];
  solution:        string;
  roadmapLevel:    number;
  technology?:     string;
  points?:         number;
}

/* ─── Mock Data ─────────────────────────────────────────────────── */
export const labs: Lab[] = [
  /* ══════════════════════════════════════════════════════════
   * 1. Basic IP Connectivity Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "basic-ip",
    title:       "Basic IP Connectivity Lab",
    category:    "Foundation",
    level:       "Beginner",
    duration:    "30 min",
    status:      "in-progress",
    description: "ฝึกตั้งค่า IP Address บน Router และ PC แล้วทดสอบ Ping เพื่อเข้าใจพื้นฐาน Layer 3 Connectivity",
    scenario:
      "ฝ่าย IT ต้องการเชื่อมต่อ PC 2 เครื่องผ่าน Router เครื่องเดียว โดยให้ PC แต่ละเครื่องอยู่คนละ Network และสามารถ Ping หากันได้ผ่าน Router",
    objective:
      "ตั้งค่า IP Address บน Router และ PC แล้วทดสอบให้ PC1 สามารถ Ping PC2 ข้าม Network ได้",
    devices: ["R1", "PC1", "PC2"],
    topology: [
      { from: "PC1",   to: "R1", port: "Fa0/0 ↔ NIC" },
      { from: "PC2",   to: "R1", port: "Fa0/1 ↔ NIC" },
    ],
    ipTable: [
      { device: "R1",  interface: "Fa0/0", ip: "192.168.1.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "R1",  interface: "Fa0/1", ip: "192.168.2.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "PC1", interface: "NIC",   ip: "192.168.1.10", subnet: "255.255.255.0", gateway: "192.168.1.1" },
      { device: "PC2", interface: "NIC",   ip: "192.168.2.10", subnet: "255.255.255.0", gateway: "192.168.2.1" },
    ],
    tasks: [
      "ตั้ง IP 192.168.1.1/24 บน R1 Fa0/0 และ no shutdown",
      "ตั้ง IP 192.168.2.1/24 บน R1 Fa0/1 และ no shutdown",
      "ตั้ง IP 192.168.1.10/24 + Gateway 192.168.1.1 บน PC1",
      "ตั้ง IP 192.168.2.10/24 + Gateway 192.168.2.1 บน PC2",
      "Ping จาก PC1 ไป 192.168.2.10 (PC2)",
      "ตรวจสอบ Routing Table บน R1 ด้วย show ip route",
    ],
    hints: [
      "ลืม no shutdown บน interface จะทำให้ interface ยัง down อยู่",
      "ตรวจสอบ interface ด้วย show ip interface brief",
      "ถ้า Ping ไม่ผ่านให้เช็ก Default Gateway บน PC ก่อน",
    ],
    expectedResult:
      "PC1 สามารถ Ping 192.168.2.10 ได้ และ show ip route บน R1 แสดง Connected routes ทั้ง 2 Network",
    troubleshooting: [
      "เช็ก interface status: show ip interface brief — ต้องเป็น up/up",
      "เช็ก IP ถูกต้องด้วย show running-config",
      "เช็ก Default Gateway บน PC ว่าชี้ไป Router IP ถูกต้อง",
      "เช็ก Routing Table: show ip route — ต้องมี C (Connected) ทั้ง 2 network",
      "ลอง Ping จาก Router ไป PC ก่อน เพื่อตัดปัญหา PC",
    ],
    solution: `! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

interface FastEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown

interface FastEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 no shutdown

end
write memory

! Verify
show ip interface brief
show ip route`,
    roadmapLevel: 1,
  },

  /* ══════════════════════════════════════════════════════════
   * 2. VLAN Configuration Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "vlan-config",
    title:       "VLAN Configuration Lab",
    category:    "Switching",
    level:       "Beginner",
    duration:    "40 min",
    status:      "not-started",
    description: "ฝึกสร้าง VLAN และกำหนด Access Port บน Cisco Switch เพื่อแยก traffic ระหว่างแผนก",
    scenario:
      "บริษัทมี 2 แผนก คือ HR และ IT ต้องการแยก Network ด้วย VLAN เพื่อป้องกัน Broadcast ข้ามแผนก โดยยังใช้ Switch เดียวกัน",
    objective:
      "สร้าง VLAN 10 (HR) และ VLAN 20 (IT) บน Switch กำหนด Access Port และทดสอบว่า PC ใน VLAN เดียวกัน Ping กันได้ แต่ข้าม VLAN ไม่ได้",
    devices: ["SW1", "PC-HR1", "PC-HR2", "PC-IT1", "PC-IT2"],
    topology: [
      { from: "PC-HR1", to: "SW1", port: "Fa0/1 (VLAN 10)" },
      { from: "PC-HR2", to: "SW1", port: "Fa0/2 (VLAN 10)" },
      { from: "PC-IT1", to: "SW1", port: "Fa0/3 (VLAN 20)" },
      { from: "PC-IT2", to: "SW1", port: "Fa0/4 (VLAN 20)" },
    ],
    ipTable: [
      { device: "PC-HR1", interface: "NIC", ip: "192.168.10.10", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-HR2", interface: "NIC", ip: "192.168.10.11", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-IT1", interface: "NIC", ip: "192.168.20.10", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
      { device: "PC-IT2", interface: "NIC", ip: "192.168.20.11", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
    ],
    tasks: [
      "สร้าง VLAN 10 ชื่อ HR บน SW1",
      "สร้าง VLAN 20 ชื่อ IT บน SW1",
      "ตั้ง Fa0/1 และ Fa0/2 เป็น Access Port VLAN 10",
      "ตั้ง Fa0/3 และ Fa0/4 เป็น Access Port VLAN 20",
      "ทดสอบ Ping PC-HR1 → PC-HR2 (ต้องผ่าน)",
      "ทดสอบ Ping PC-HR1 → PC-IT1 (ต้องไม่ผ่าน)",
      "ตรวจสอบ VLAN ด้วย show vlan brief",
    ],
    hints: [
      "VLAN ต้องสร้างก่อนถึงจะ assign port ได้",
      "ตรวจสอบด้วย show vlan brief ว่า port อยู่ใน VLAN ถูกต้อง",
      "PC ข้าม VLAN ไม่ได้ เพราะไม่มี Router ช่วย Route",
    ],
    expectedResult:
      "PC-HR1 Ping PC-HR2 ได้, PC-HR1 Ping PC-IT1 ไม่ได้ และ show vlan brief แสดง VLAN 10, 20 พร้อม port membership ถูกต้อง",
    troubleshooting: [
      "show vlan brief — ตรวจว่า VLAN มีอยู่และ port อยู่ใน VLAN ถูกต้อง",
      "show interfaces Fa0/1 switchport — ตรวจ mode และ access vlan",
      "ถ้า Ping ข้าม VLAN ได้ แสดงว่า port อาจยังอยู่ใน VLAN 1 (default)",
      "ตรวจ IP บน PC ว่าอยู่ใน subnet เดียวกับ VLAN",
    ],
    solution: `! ═══════════════════════════════
! SW1 Configuration
! ═══════════════════════════════
enable
configure terminal

! สร้าง VLAN
vlan 10
 name HR
vlan 20
 name IT

! Access Port สำหรับ HR
interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10
interface FastEthernet0/2
 switchport mode access
 switchport access vlan 10

! Access Port สำหรับ IT
interface FastEthernet0/3
 switchport mode access
 switchport access vlan 20
interface FastEthernet0/4
 switchport mode access
 switchport access vlan 20

end
write memory

! Verify
show vlan brief
show interfaces FastEthernet0/1 switchport`,
    roadmapLevel: 2,
  },

  /* ══════════════════════════════════════════════════════════
   * 3. Trunk Port Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "trunk-port",
    title:       "Trunk Port Lab",
    category:    "Switching",
    level:       "Beginner",
    duration:    "35 min",
    status:      "not-started",
    description: "ฝึกตั้งค่า Trunk Port ระหว่าง Switch 2 ตัว เพื่อให้ VLAN เดียวกัน Ping กันข้าม Switch ได้",
    scenario:
      "บริษัทมี Switch 2 ตัวอยู่คนละชั้น PC ของ VLAN 10 และ VLAN 20 กระจายอยู่ใน Switch ทั้ง 2 ตัว ต้องการให้ PC ใน VLAN เดียวกันสื่อสารกันได้ข้าม Switch",
    objective:
      "ตั้งค่า Trunk Port ระหว่าง SW1 และ SW2 ให้ VLAN 10 และ 20 ผ่านได้ และทดสอบ Ping ข้าม Switch ภายใน VLAN เดียวกัน",
    devices: ["SW1", "SW2", "PC-HR1", "PC-HR2", "PC-IT1", "PC-IT2"],
    topology: [
      { from: "PC-HR1", to: "SW1", port: "Fa0/1 (VLAN 10)" },
      { from: "PC-IT1", to: "SW1", port: "Fa0/2 (VLAN 20)" },
      { from: "SW1",    to: "SW2", port: "Gi0/1 ↔ Gi0/1 (Trunk)" },
      { from: "PC-HR2", to: "SW2", port: "Fa0/1 (VLAN 10)" },
      { from: "PC-IT2", to: "SW2", port: "Fa0/2 (VLAN 20)" },
    ],
    ipTable: [
      { device: "PC-HR1", interface: "NIC", ip: "192.168.10.10", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-HR2", interface: "NIC", ip: "192.168.10.11", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-IT1", interface: "NIC", ip: "192.168.20.10", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
      { device: "PC-IT2", interface: "NIC", ip: "192.168.20.11", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
    ],
    tasks: [
      "สร้าง VLAN 10, 20 บน SW1 และ SW2",
      "ตั้ง Access Port บน SW1 และ SW2 ตามแผนผัง",
      "ตั้ง Gi0/1 บน SW1 เป็น Trunk Port",
      "ตั้ง Gi0/1 บน SW2 เป็น Trunk Port",
      "ตรวจสอบ Trunk ด้วย show interfaces trunk",
      "ทดสอบ Ping PC-HR1 → PC-HR2 ข้าม Switch (ต้องผ่าน)",
      "ทดสอบ Ping PC-HR1 → PC-IT1 (ต้องไม่ผ่าน)",
    ],
    hints: [
      "Trunk Port ต้องตั้งทั้ง 2 ฝั่ง (SW1 และ SW2)",
      "ใช้ switchport mode trunk บน interface ที่เชื่อมระหว่าง Switch",
      "ตรวจด้วย show interfaces trunk ว่า VLAN ผ่าน Trunk ได้",
      "Native VLAN ต้องตรงกันทั้ง 2 ฝั่ง ไม่งั้น CDP จะ Warning",
    ],
    expectedResult:
      "PC-HR1 Ping PC-HR2 (คนละ Switch) ได้, show interfaces trunk แสดง VLANs allowed 10, 20",
    troubleshooting: [
      "show interfaces trunk — ตรวจ Trunk mode และ VLANs allowed",
      "ถ้าไม่มี Trunk แสดงว่า port ยังเป็น Access mode",
      "ตรวจ Native VLAN ทั้ง 2 ฝั่งต้องตรงกัน",
      "ตรวจ VLAN ถูกสร้างบนทั้ง 2 Switch",
    ],
    solution: `! ═══════════════════════════════
! SW1 Configuration
! ═══════════════════════════════
enable
configure terminal

vlan 10
 name HR
vlan 20
 name IT

interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10

interface FastEthernet0/2
 switchport mode access
 switchport access vlan 20

interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20

end

! ═══════════════════════════════
! SW2 Configuration (เหมือน SW1)
! ═══════════════════════════════
enable
configure terminal

vlan 10
 name HR
vlan 20
 name IT

interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10

interface FastEthernet0/2
 switchport mode access
 switchport access vlan 20

interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20

end
write memory

! Verify
show interfaces trunk
show vlan brief`,
    roadmapLevel: 2,
  },

  /* ══════════════════════════════════════════════════════════
   * 4. Inter-VLAN Routing Lab  (detailed reference lab)
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "inter-vlan-routing",
    title:       "Inter-VLAN Routing Lab",
    category:    "Switching",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "not-started",
    description: "ฝึกตั้งค่า VLAN และ Router-on-a-stick เพื่อให้หลาย VLAN สื่อสารกันได้",
    scenario:
      "บริษัทมี 3 แผนก ได้แก่ HR, IT และ Finance โดยแต่ละแผนกอยู่คนละ VLAN ต้องการให้ทุก VLAN สื่อสารกันได้ผ่าน Router",
    objective:
      "ทำให้ VLAN 10, VLAN 20 และ VLAN 30 สามารถ Ping ข้ามกันได้ด้วยเทคนิค Router-on-a-stick",
    devices: ["R1", "SW1", "PC-HR", "PC-IT", "PC-FIN"],
    topology: [
      { from: "PC-HR",  to: "SW1", port: "Fa0/1 (VLAN 10)" },
      { from: "PC-IT",  to: "SW1", port: "Fa0/2 (VLAN 20)" },
      { from: "PC-FIN", to: "SW1", port: "Fa0/3 (VLAN 30)" },
      { from: "SW1",    to: "R1",  port: "Gi0/1 ↔ Gi0/0 (Trunk)" },
    ],
    ipTable: [
      { device: "R1 (Sub .10)",  interface: "Gi0/0.10", ip: "192.168.10.1", subnet: "255.255.255.0", gateway: "-",           vlan: "10" },
      { device: "R1 (Sub .20)",  interface: "Gi0/0.20", ip: "192.168.20.1", subnet: "255.255.255.0", gateway: "-",           vlan: "20" },
      { device: "R1 (Sub .30)",  interface: "Gi0/0.30", ip: "192.168.30.1", subnet: "255.255.255.0", gateway: "-",           vlan: "30" },
      { device: "PC-HR",         interface: "NIC",       ip: "192.168.10.10", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-IT",         interface: "NIC",       ip: "192.168.20.10", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
      { device: "PC-FIN",        interface: "NIC",       ip: "192.168.30.10", subnet: "255.255.255.0", gateway: "192.168.30.1", vlan: "30" },
    ],
    tasks: [
      "สร้าง VLAN 10 (HR), 20 (IT), 30 (FINANCE) บน SW1",
      "ตั้ง Access Port: Fa0/1→VLAN10, Fa0/2→VLAN20, Fa0/3→VLAN30",
      "ตั้ง Trunk Port Gi0/1 บน SW1 (ไปหา Router)",
      "เปิด Physical Interface Gi0/0 บน R1 (no shutdown, ไม่ต้องตั้ง IP)",
      "สร้าง Sub-interface Gi0/0.10 พร้อม encapsulation dot1Q 10",
      "สร้าง Sub-interface Gi0/0.20 พร้อม encapsulation dot1Q 20",
      "สร้าง Sub-interface Gi0/0.30 พร้อม encapsulation dot1Q 30",
      "ตั้ง IP Gateway บน PC แต่ละเครื่อง",
      "ทดสอบ Ping ข้าม VLAN ทุก Combination",
    ],
    hints: [
      "ตรวจสอบ VLAN ด้วยคำสั่ง: show vlan brief",
      "ตรวจสอบ Trunk ด้วยคำสั่ง: show interfaces trunk",
      "Router-on-a-stick ต้องใช้ encapsulation dot1Q <vlan-id> บน Sub-interface",
      "Physical interface (Gi0/0) ต้อง no shutdown แต่ไม่ต้องตั้ง IP",
      "ตรวจ Sub-interface: show ip interface brief | include Gi0/0",
    ],
    expectedResult:
      "PC-HR, PC-IT และ PC-FIN ต้องสามารถ Ping ข้าม VLAN กันได้ทั้ง 6 Combination (3×2 ทิศทาง)",
    troubleshooting: [
      "เช็กว่า VLAN ถูกสร้างบน Switch: show vlan brief",
      "เช็กว่า Port อยู่ VLAN ถูกต้อง: show interfaces Fa0/x switchport",
      "เช็กว่า Trunk อนุญาต VLAN 10, 20, 30: show interfaces trunk",
      "เช็ก Sub-interface บน Router: show ip interface brief",
      "เช็กว่ามี encapsulation dot1Q บน Sub-interface ทุกตัว",
      "เช็ก Default Gateway ของ PC ชี้ไป Sub-interface IP ถูกต้อง",
      "ลอง Ping จาก Router ไป PC ก่อน: ping 192.168.10.10 source Gi0/0.10",
    ],
    solution: `! ═══════════════════════════════
! SW1 Configuration
! ═══════════════════════════════
enable
configure terminal

vlan 10
 name HR
vlan 20
 name IT
vlan 30
 name FINANCE

interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10

interface FastEthernet0/2
 switchport mode access
 switchport access vlan 20

interface FastEthernet0/3
 switchport mode access
 switchport access vlan 30

interface GigabitEthernet0/1
 switchport mode trunk

end
write memory

! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

interface GigabitEthernet0/0
 no shutdown

interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0

interface GigabitEthernet0/0.30
 encapsulation dot1Q 30
 ip address 192.168.30.1 255.255.255.0

end
write memory

! Verify
show vlan brief
show interfaces trunk
show ip interface brief
show ip route`,
    roadmapLevel: 2,
  },

  /* ══════════════════════════════════════════════════════════
   * 5. OSPF Single Area Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "ospf-single-area",
    title:       "OSPF Single Area Lab",
    category:    "Routing",
    level:       "Intermediate",
    duration:    "60 min",
    status:      "not-started",
    description: "ฝึกตั้งค่า OSPF Area 0 ระหว่าง 3 Router เพื่อให้ทุก Network Reachable กัน",
    scenario:
      "บริษัทมีสำนักงาน 3 แห่ง แต่ละแห่งมี Router 1 ตัวเชื่อมกันเป็น Chain ต้องการให้ PC ทุกสำนักงาน Ping หากันได้โดยใช้ Dynamic Routing Protocol OSPF",
    objective:
      "ตั้งค่า OSPF Area 0 บน R1, R2, R3 ให้ Neighbor ขึ้นและ Route ทุก Network เข้าสู่ Routing Table",
    devices: ["R1", "R2", "R3", "PC-A", "PC-B", "PC-C"],
    topology: [
      { from: "PC-A", to: "R1", port: "Fa0/0 (LAN)" },
      { from: "R1",   to: "R2", port: "Gi0/1 ↔ Gi0/0 (WAN)" },
      { from: "R2",   to: "R3", port: "Gi0/1 ↔ Gi0/0 (WAN)" },
      { from: "PC-B", to: "R2", port: "Fa0/0 (LAN)" },
      { from: "PC-C", to: "R3", port: "Fa0/0 (LAN)" },
    ],
    ipTable: [
      { device: "R1",   interface: "Fa0/0",  ip: "10.1.1.1",  subnet: "255.255.255.0",   gateway: "-" },
      { device: "R1",   interface: "Gi0/1",  ip: "10.12.0.1", subnet: "255.255.255.252",  gateway: "-" },
      { device: "R2",   interface: "Gi0/0",  ip: "10.12.0.2", subnet: "255.255.255.252",  gateway: "-" },
      { device: "R2",   interface: "Fa0/0",  ip: "10.2.2.1",  subnet: "255.255.255.0",   gateway: "-" },
      { device: "R2",   interface: "Gi0/1",  ip: "10.23.0.1", subnet: "255.255.255.252",  gateway: "-" },
      { device: "R3",   interface: "Gi0/0",  ip: "10.23.0.2", subnet: "255.255.255.252",  gateway: "-" },
      { device: "R3",   interface: "Fa0/0",  ip: "10.3.3.1",  subnet: "255.255.255.0",   gateway: "-" },
      { device: "PC-A", interface: "NIC",    ip: "10.1.1.10", subnet: "255.255.255.0",   gateway: "10.1.1.1" },
      { device: "PC-B", interface: "NIC",    ip: "10.2.2.10", subnet: "255.255.255.0",   gateway: "10.2.2.1" },
      { device: "PC-C", interface: "NIC",    ip: "10.3.3.10", subnet: "255.255.255.0",   gateway: "10.3.3.1" },
    ],
    tasks: [
      "ตั้ง IP บนทุก Interface ของ R1, R2, R3 ตาม IP Table",
      "Enable OSPF Process 1 บน R1",
      "ประกาศทุก Network ของ R1 ใน Area 0",
      "Enable OSPF Process 1 บน R2 และประกาศทุก Network",
      "Enable OSPF Process 1 บน R3 และประกาศทุก Network",
      "ตรวจ OSPF Neighbor: show ip ospf neighbor",
      "ตรวจ Routing Table: show ip route ospf",
      "ทดสอบ Ping PC-A → PC-B และ PC-A → PC-C",
    ],
    hints: [
      "OSPF Process ID (1) ไม่จำเป็นต้องตรงกันระหว่าง Router",
      "Wildcard mask เป็น inverse ของ Subnet mask เช่น /24 = 0.0.0.255",
      "WAN link /30 wildcard = 0.0.0.3",
      "ตรวจ Neighbor ขึ้นหรือไม่: show ip ospf neighbor",
      "ถ้า Neighbor ไม่ขึ้น ตรวจ Hello/Dead timer และ Area ID ต้องตรงกัน",
    ],
    expectedResult:
      "show ip ospf neighbor แสดง Full adjacency ระหว่าง R1-R2 และ R2-R3, show ip route แสดง O routes ครบทุก Network, PC-A Ping PC-C ได้",
    troubleshooting: [
      "show ip ospf neighbor — ตรวจว่า Neighbor ขึ้นเป็น FULL หรือไม่",
      "ถ้า Neighbor ไม่ขึ้น ตรวจ IP interface ต้องอยู่ subnet เดียวกัน",
      "ตรวจ Area ID ต้องตรงกันทั้ง 2 Router",
      "ตรวจ network statement ถูกต้องครบทุก interface",
      "show ip route — ถ้าไม่มี O route ตรวจ OSPF process อีกครั้ง",
      "ตรวจ Interface ไม่ถูก Passive: show ip ospf interface brief",
    ],
    solution: `! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

interface FastEthernet0/0
 ip address 10.1.1.1 255.255.255.0
 no shutdown

interface GigabitEthernet0/1
 ip address 10.12.0.1 255.255.255.252
 no shutdown

router ospf 1
 network 10.1.1.0 0.0.0.255 area 0
 network 10.12.0.0 0.0.0.3 area 0

end

! ═══════════════════════════════
! R2 Configuration
! ═══════════════════════════════
enable
configure terminal

interface GigabitEthernet0/0
 ip address 10.12.0.2 255.255.255.252
 no shutdown

interface FastEthernet0/0
 ip address 10.2.2.1 255.255.255.0
 no shutdown

interface GigabitEthernet0/1
 ip address 10.23.0.1 255.255.255.252
 no shutdown

router ospf 1
 network 10.12.0.0 0.0.0.3 area 0
 network 10.2.2.0 0.0.0.255 area 0
 network 10.23.0.0 0.0.0.3 area 0

end

! ═══════════════════════════════
! R3 Configuration
! ═══════════════════════════════
enable
configure terminal

interface GigabitEthernet0/0
 ip address 10.23.0.2 255.255.255.252
 no shutdown

interface FastEthernet0/0
 ip address 10.3.3.1 255.255.255.0
 no shutdown

router ospf 1
 network 10.23.0.0 0.0.0.3 area 0
 network 10.3.3.0 0.0.0.255 area 0

end
write memory

! Verify
show ip ospf neighbor
show ip route ospf
show ip ospf interface brief`,
    roadmapLevel: 3,
  },

  /* ══════════════════════════════════════════════════════════
   * 6. DHCP Troubleshooting Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "dhcp-troubleshoot",
    title:       "DHCP Troubleshooting Lab",
    category:    "Network Services",
    level:       "Beginner",
    duration:    "40 min",
    status:      "not-started",
    description: "ฝึกตั้งค่า DHCP Server บน Cisco Router และ Troubleshoot ปัญหา DHCP แจก IP ไม่ได้",
    scenario:
      "ฝ่าย IT รายงานว่า PC ในออฟฟิศไม่ได้รับ IP Address อัตโนมัติ ต้องตรวจสอบและแก้ไข DHCP Server ที่ตั้งค่าไว้บน Router ให้ทำงานได้ถูกต้อง",
    objective:
      "ตั้งค่า DHCP Pool บน Router และทดสอบให้ PC รับ IP อัตโนมัติได้พร้อม Gateway และ DNS ที่ถูกต้อง",
    devices: ["R1", "PC1", "PC2", "PC3"],
    topology: [
      { from: "PC1", to: "R1", port: "Fa0/0 (LAN)" },
      { from: "PC2", to: "R1", port: "Fa0/0 (LAN)" },
      { from: "PC3", to: "R1", port: "Fa0/0 (LAN)" },
    ],
    ipTable: [
      { device: "R1",  interface: "Fa0/0",      ip: "192.168.1.1",   subnet: "255.255.255.0", gateway: "-" },
      { device: "PC1", interface: "NIC (DHCP)",  ip: "192.168.1.10+", subnet: "255.255.255.0", gateway: "192.168.1.1" },
      { device: "PC2", interface: "NIC (DHCP)",  ip: "192.168.1.11+", subnet: "255.255.255.0", gateway: "192.168.1.1" },
      { device: "PC3", interface: "NIC (DHCP)",  ip: "192.168.1.12+", subnet: "255.255.255.0", gateway: "192.168.1.1" },
    ],
    tasks: [
      "ตั้ง IP 192.168.1.1/24 บน R1 Fa0/0",
      "สร้าง DHCP Pool ชื่อ LAN_POOL",
      "กำหนด Network 192.168.1.0/24",
      "กำหนด Default Gateway 192.168.1.1",
      "กำหนด DNS Server 8.8.8.8",
      "Exclude IP 192.168.1.1 ถึง 192.168.1.9 จาก DHCP",
      "ตั้ง PC เป็น DHCP และตรวจสอบ IP ที่ได้รับ",
      "ตรวจ DHCP Binding: show ip dhcp binding",
    ],
    hints: [
      "ต้อง exclude IP ของ Router ก่อน สร้าง Pool ไม่งั้น Router อาจแจก IP ตัวเองไปให้ PC",
      "ip dhcp excluded-address ต้องทำก่อน ip dhcp pool",
      "ตรวจ DHCP Binding ด้วย: show ip dhcp binding",
      "ถ้า PC ไม่ได้ IP ตรวจว่า interface Fa0/0 เป็น up/up",
    ],
    expectedResult:
      "PC แต่ละเครื่องได้รับ IP ใน range 192.168.1.10-254 พร้อม Gateway 192.168.1.1 และ DNS 8.8.8.8 โดยอัตโนมัติ",
    troubleshooting: [
      "show ip dhcp binding — ตรวจว่ามี lease หรือไม่",
      "show ip dhcp pool — ตรวจ pool configuration",
      "ถ้าไม่มี lease ตรวจว่า interface R1 เป็น up/up",
      "ตรวจว่าไม่ได้ excluded address ทั้งหมด",
      "debug ip dhcp server events — ดู DHCP event แบบ real-time",
      "ตรวจ PC ว่าตั้งเป็น DHCP mode",
    ],
    solution: `! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

! ตั้ง IP บน Interface
interface FastEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown

! Exclude IP ที่ไม่ต้องการแจก
ip dhcp excluded-address 192.168.1.1 192.168.1.9

! สร้าง DHCP Pool
ip dhcp pool LAN_POOL
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 1

end
write memory

! Verify
show ip dhcp pool
show ip dhcp binding
show ip dhcp conflict`,
    roadmapLevel: 4,
  },

  /* ══════════════════════════════════════════════════════════
   * 7. NAT Basic Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "nat-basic",
    title:       "NAT Basic Lab",
    category:    "Network Services",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "not-started",
    description: "ฝึกตั้งค่า NAT Overload (PAT) บน Router เพื่อให้ PC ใน LAN สามารถออก Internet ด้วย IP เดียว",
    scenario:
      "บริษัทได้รับ Public IP จาก ISP หนึ่งเดียว (203.0.113.1) แต่มี PC ใน LAN หลายเครื่อง ต้องการให้ทุกเครื่องออก Internet ได้โดยใช้ NAT Overload (PAT)",
    objective:
      "ตั้งค่า NAT Overload บน R1 ให้ PC ใน Network 192.168.1.0/24 สามารถ Ping ออกไปหา ISP Router ได้ผ่าน Public IP",
    devices: ["R1", "ISP-R", "PC1", "PC2"],
    topology: [
      { from: "PC1",   to: "R1",    port: "Fa0/0 (Inside)" },
      { from: "PC2",   to: "R1",    port: "Fa0/0 (Inside)" },
      { from: "R1",    to: "ISP-R", port: "Gi0/1 (Outside) ↔ Gi0/0" },
    ],
    ipTable: [
      { device: "R1 (Inside)",  interface: "Fa0/0", ip: "192.168.1.1",  subnet: "255.255.255.0",   gateway: "-" },
      { device: "R1 (Outside)", interface: "Gi0/1", ip: "203.0.113.1",  subnet: "255.255.255.252",  gateway: "203.0.113.2" },
      { device: "ISP-R",        interface: "Gi0/0", ip: "203.0.113.2",  subnet: "255.255.255.252",  gateway: "-" },
      { device: "PC1",          interface: "NIC",   ip: "192.168.1.10", subnet: "255.255.255.0",   gateway: "192.168.1.1" },
      { device: "PC2",          interface: "NIC",   ip: "192.168.1.11", subnet: "255.255.255.0",   gateway: "192.168.1.1" },
    ],
    tasks: [
      "ตั้ง IP บน R1 Fa0/0 (Inside) และ Gi0/1 (Outside)",
      "ตั้ง Default Route ไปหา ISP: ip route 0.0.0.0 0.0.0.0 203.0.113.2",
      "สร้าง ACL อนุญาต LAN Network 192.168.1.0/24",
      "ตั้ง NAT Overload ใช้ ACL กับ Interface Outside",
      "กำหนด ip nat inside บน Fa0/0",
      "กำหนด ip nat outside บน Gi0/1",
      "ทดสอบ Ping จาก PC1 ไป 203.0.113.2 (ISP)",
      "ตรวจ NAT Translation: show ip nat translations",
    ],
    hints: [
      "ต้องกำหนด ip nat inside และ ip nat outside บน interface ที่ถูกต้อง",
      "ACL สำหรับ NAT ใช้ Standard ACL (permit network)",
      "NAT Overload ใช้คำสั่ง: ip nat inside source list <acl> interface <outside> overload",
      "ตรวจ Translation: show ip nat translations",
    ],
    expectedResult:
      "PC1 และ PC2 สามารถ Ping 203.0.113.2 ได้ และ show ip nat translations แสดง PAT entries ของ PC ทั้ง 2 เครื่อง",
    troubleshooting: [
      "show ip nat translations — ตรวจว่ามี NAT entry หรือไม่",
      "show ip nat statistics — ตรวจจำนวน translation",
      "ตรวจว่า ip nat inside/outside ถูกกำหนดบน interface ที่ถูกต้อง",
      "ตรวจ ACL ว่า permit network ถูก subnet",
      "ตรวจ Default Route ด้วย show ip route 0.0.0.0",
      "debug ip nat — ดู NAT process แบบ real-time",
    ],
    solution: `! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

! Interfaces
interface FastEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 ip nat inside
 no shutdown

interface GigabitEthernet0/1
 ip address 203.0.113.1 255.255.255.252
 ip nat outside
 no shutdown

! Default Route ไป ISP
ip route 0.0.0.0 0.0.0.0 203.0.113.2

! ACL สำหรับ NAT
ip access-list standard NAT_ACL
 permit 192.168.1.0 0.0.0.255

! NAT Overload (PAT)
ip nat inside source list NAT_ACL interface GigabitEthernet0/1 overload

end
write memory

! Verify
show ip nat translations
show ip nat statistics
show ip route`,
    roadmapLevel: 4,
  },

  /* ══════════════════════════════════════════════════════════
   * 8. ACL Basic Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "acl-basic",
    title:       "ACL Basic Lab",
    category:    "Security",
    level:       "Intermediate",
    duration:    "50 min",
    status:      "not-started",
    description: "ฝึกสร้าง Extended ACL เพื่อควบคุม Traffic ระหว่าง Network ให้ได้ตาม Security Policy",
    scenario:
      "ฝ่าย Security กำหนด Policy ว่า PC ใน Network HR (192.168.10.0/24) ไม่สามารถเข้าถึง Server Finance (192.168.30.10) ได้ แต่ PC ใน IT (192.168.20.0/24) เข้าได้ปกติ",
    objective:
      "สร้าง Extended ACL บล็อก HR ไม่ให้เข้า Finance Server แต่ IT เข้าได้ และ HR ยังเข้า Network อื่นได้ปกติ",
    devices: ["R1", "PC-HR", "PC-IT", "Server-FIN"],
    topology: [
      { from: "PC-HR",      to: "R1", port: "Gi0/0 (VLAN 10)" },
      { from: "PC-IT",      to: "R1", port: "Gi0/1 (VLAN 20)" },
      { from: "Server-FIN", to: "R1", port: "Gi0/2 (VLAN 30)" },
    ],
    ipTable: [
      { device: "R1",         interface: "Gi0/0", ip: "192.168.10.1",  subnet: "255.255.255.0", gateway: "-",            vlan: "10" },
      { device: "R1",         interface: "Gi0/1", ip: "192.168.20.1",  subnet: "255.255.255.0", gateway: "-",            vlan: "20" },
      { device: "R1",         interface: "Gi0/2", ip: "192.168.30.1",  subnet: "255.255.255.0", gateway: "-",            vlan: "30" },
      { device: "PC-HR",      interface: "NIC",   ip: "192.168.10.10", subnet: "255.255.255.0", gateway: "192.168.10.1", vlan: "10" },
      { device: "PC-IT",      interface: "NIC",   ip: "192.168.20.10", subnet: "255.255.255.0", gateway: "192.168.20.1", vlan: "20" },
      { device: "Server-FIN", interface: "NIC",   ip: "192.168.30.10", subnet: "255.255.255.0", gateway: "192.168.30.1", vlan: "30" },
    ],
    tasks: [
      "ตั้ง IP บนทุก Interface ของ R1",
      "สร้าง Extended ACL ชื่อ BLOCK_HR_TO_FIN",
      "เพิ่ม rule: deny ip 192.168.10.0/24 host 192.168.30.10",
      "เพิ่ม rule: permit ip any any (อนุญาต traffic อื่นทั้งหมด)",
      "Apply ACL inbound บน Gi0/0 (interface ของ HR)",
      "ทดสอบ: PC-HR Ping Server-FIN (ต้องไม่ผ่าน)",
      "ทดสอบ: PC-IT Ping Server-FIN (ต้องผ่าน)",
      "ทดสอบ: PC-HR Ping 192.168.20.10 (ต้องผ่าน)",
      "ตรวจ ACL Hit Count: show ip access-lists",
    ],
    hints: [
      "Extended ACL ต้อง Apply ให้ใกล้ Source มากที่สุด (inbound ที่ HR interface)",
      "ACL อ่านจากบนลงล่าง หยุดที่ rule แรกที่ match",
      "ต้องมี permit ip any any ท้ายสุด ไม่งั้น deny ทุก traffic",
      "ตรวจ ACL: show ip access-lists — ดู hit count แต่ละ rule",
      "Extended ACL ควร Apply inbound ให้ใกล้ Source",
    ],
    expectedResult:
      "PC-HR Ping Server-FIN ไม่ได้ (deny), PC-IT Ping Server-FIN ได้ (permit), PC-HR Ping PC-IT ได้ (permit any any)",
    troubleshooting: [
      "show ip access-lists — ตรวจ hit count ว่า rule ไหน match",
      "show ip interface Gi0/0 — ตรวจว่า ACL ถูก apply ถูก direction",
      "ถ้า PC-IT ก็ไม่ได้ แสดงว่า ACL อาจ apply ผิด interface",
      "ถ้า PC-HR ยัง Ping FIN ได้ ตรวจว่า apply inbound ถูกต้อง",
      "ตรวจลำดับ ACL — deny ต้องอยู่ก่อน permit any any",
    ],
    solution: `! ═══════════════════════════════
! R1 Configuration
! ═══════════════════════════════
enable
configure terminal

! Interfaces
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 no shutdown

interface GigabitEthernet0/1
 ip address 192.168.20.1 255.255.255.0
 no shutdown

interface GigabitEthernet0/2
 ip address 192.168.30.1 255.255.255.0
 no shutdown

! Extended ACL
ip access-list extended BLOCK_HR_TO_FIN
 deny   ip 192.168.10.0 0.0.0.255 host 192.168.30.10
 permit ip any any

! Apply inbound บน HR Interface
interface GigabitEthernet0/0
 ip access-group BLOCK_HR_TO_FIN in

end
write memory

! Verify
show ip access-lists
show ip interface GigabitEthernet0/0`,
    roadmapLevel: 5,
  },

  /* ══════════════════════════════════════════════════════════
   * 9. BGP eBGP Configuration Lab
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "bgp-ebgp-config",
    title:       "BGP eBGP Configuration Lab",
    category:    "Routing",
    level:       "Advanced",
    duration:    "60 min",
    status:      "not-started",
    description: "ฝึก Config eBGP ระหว่าง 2 AS, ส่ง Network Prefix และตรวจสอบ BGP Table",
    scenario:    "ฝ่าย IT ต้องการเชื่อมต่อ 2 บริษัทผ่าน eBGP เพื่อแลกเปลี่ยน Route และทดสอบ BGP Failover",
    objective: "Configure eBGP ระหว่าง AS65001 และ AS65002 แล้วตรวจสอบ BGP Table ว่า Routes ถูก Advertise",
    devices: ["R1(AS65001)", "R2(AS65002)"],
    topology: [
      { from: "R1", to: "R2", port: "Gi0/0 ↔ Gi0/0 (10.0.12.0/30)" },
    ],
    ipTable: [
      { device: "R1", interface: "Gi0/0", ip: "10.0.12.1", subnet: "/30", gateway: "—" },
      { device: "R1", interface: "Lo0",   ip: "172.16.1.1", subnet: "/24", gateway: "—" },
      { device: "R2", interface: "Gi0/0", ip: "10.0.12.2", subnet: "/30", gateway: "—" },
      { device: "R2", interface: "Lo0",   ip: "172.16.2.1", subnet: "/24", gateway: "—" },
    ],
    tasks: [
      "Config eBGP บน R1: AS 65001, Neighbor 10.0.12.2 remote-as 65002",
      "Config eBGP บน R2: AS 65002, Neighbor 10.0.12.1 remote-as 65001",
      "Advertise 172.16.1.0/24 จาก R1 และ 172.16.2.0/24 จาก R2",
      "ตรวจสอบ BGP Session ว่า Established: show bgp summary",
      "ตรวจสอบ BGP Table: show ip bgp",
    ],
    hints: [
      "BGP ต้องการ TCP reachability ก่อน — ตรวจสอบ ping ระหว่าง 10.0.12.1 และ 10.0.12.2",
      "neighbor <ip> remote-as ต้องตรงกับ AS ของอีกฝั่ง",
      "network command ต้อง exact match กับ prefix ใน routing table",
    ],
    expectedResult: "BGP Session Established, ทั้ง 2 router เห็น Route ของอีกฝั่งใน BGP Table",
    troubleshooting: [
      "State Active: ตรวจสอบ IP connectivity ระหว่าง neighbor",
      "State Idle: ตรวจสอบ remote-as ว่าถูกต้อง",
      "Prefix ไม่ขึ้น: ตรวจสอบว่า network command match กับ route ใน RIB",
    ],
    solution: `! R1
router bgp 65001
 bgp router-id 1.1.1.1
 neighbor 10.0.12.2 remote-as 65002
 network 172.16.1.0 mask 255.255.255.0

! R2
router bgp 65002
 bgp router-id 2.2.2.2
 neighbor 10.0.12.1 remote-as 65001
 network 172.16.2.0 mask 255.255.255.0`,
    roadmapLevel: 4,
  },


  /* ── HSRP / VRRP ────────────────────────────────────────────── */
  {
    id:          "hsrp-vrrp-lab",
    title:       "HSRP & VRRP – Gateway Redundancy",
    category:    "Switching",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "not-started",
    description: "ตั้งค่า HSRP บน R1/R2 เพื่อให้มี Redundant Default Gateway สำหรับ PC ใน Network",
    scenario:    "ต้องการความเสถียร: หาก Router ตัวหนึ่งล่ม PC ในเครือข่ายยังคงใช้งาน Internet ได้ผ่าน Router สำรอง",
    objective:   "ตั้งค่า HSRP group 1 ให้ R1 เป็น Active (priority 110), R2 เป็น Standby, Virtual IP 192.168.1.1",
    devices:     ["R1", "R2", "SW1", "PC1"],
    topology: [
      { from: "R1",  to: "SW1", port: "Gi0/0" },
      { from: "R2",  to: "SW1", port: "Gi0/0" },
      { from: "PC1", to: "SW1", port: "Fa0/1" },
    ],
    ipTable: [
      { device: "R1",  interface: "GigabitEthernet0/0", ip: "192.168.1.2", subnet: "255.255.255.0", gateway: "-",           notes: "HSRP Active" },
      { device: "R2",  interface: "GigabitEthernet0/0", ip: "192.168.1.3", subnet: "255.255.255.0", gateway: "-",           notes: "HSRP Standby" },
      { device: "VIP", interface: "Virtual IP",         ip: "192.168.1.1", subnet: "-",             gateway: "-",           notes: "Default GW สำหรับ PC" },
      { device: "PC1", interface: "NIC",                ip: "192.168.1.10",subnet: "255.255.255.0", gateway: "192.168.1.1", notes: "ใช้ Virtual IP เป็น GW" },
    ],
    tasks: [
      "ตั้ง IP 192.168.1.2/24 บน R1 Gi0/0",
      "ตั้ง HSRP group 1, Virtual IP 192.168.1.1 บน R1",
      "ตั้ง Priority 110 + preempt บน R1",
      "ตั้ง IP 192.168.1.3/24 + HSRP group 1 บน R2 (priority default 100)",
      "ตรวจสอบ show standby brief บน R1 — ต้องเห็น Active",
      "ทดสอบ ping 192.168.1.1 จาก PC1",
    ],
    hints: [
      "HSRP group number ต้องตรงกันทั้ง 2 router",
      "preempt ทำให้ R1 กลับมาเป็น Active เมื่อ recover",
      "ค่า priority default คือ 100",
    ],
    expectedResult: "R1 เป็น Active state, PC1 ping 192.168.1.1 ได้, เมื่อปิด R1 PC ยัง ping ได้ผ่าน R2",
    troubleshooting: [
      "ไม่เห็น neighbor: ตรวจ multicast บน interface",
      "ทั้งคู่เป็น Active: ตรวจ priority และ group number",
      "Virtual IP ไม่ตอบ: ตรวจด้วย show standby brief",
    ],
    solution: `! R1
interface GigabitEthernet0/0
 ip address 192.168.1.2 255.255.255.0
 standby 1 ip 192.168.1.1
 standby 1 priority 110
 standby 1 preempt
 no shutdown

! R2
interface GigabitEthernet0/0
 ip address 192.168.1.3 255.255.255.0
 standby 1 ip 192.168.1.1
 standby 1 preempt
 no shutdown`,
    roadmapLevel: 3,
  },

  /* ── EIGRP Basic ────────────────────────────────────────────── */
  {
    id:          "eigrp-basic-lab",
    title:       "EIGRP – Enhanced Interior Gateway Routing",
    category:    "Routing",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "not-started",
    description: "ตั้งค่า EIGRP AS 100 บน 3 Router แบบ Hub-and-Spoke ให้ทุก subnet เห็นกัน",
    scenario:    "สำนักงาน 3 สาขาต้องการ dynamic routing เพื่อให้แลกเปลี่ยน route กันอัตโนมัติ",
    objective:   "ตั้งค่า EIGRP AS 100 บน R1/R2/R3 ให้ R1 เห็น 10.3.3.0/24 และ R3 เห็น 10.1.1.0/24",
    devices:     ["R1", "R2", "R3"],
    topology: [
      { from: "R1", to: "R2", port: "10.12.0.0/30" },
      { from: "R2", to: "R3", port: "10.23.0.0/30" },
    ],
    ipTable: [
      { device: "R1", interface: "GigabitEthernet0/0", ip: "10.12.0.1", subnet: "255.255.255.252", gateway: "-", notes: "to R2" },
      { device: "R1", interface: "Loopback0",          ip: "10.1.1.1",  subnet: "255.255.255.0",   gateway: "-", notes: "LAN stub" },
      { device: "R2", interface: "GigabitEthernet0/0", ip: "10.12.0.2", subnet: "255.255.255.252", gateway: "-", notes: "to R1" },
      { device: "R2", interface: "GigabitEthernet0/1", ip: "10.23.0.1", subnet: "255.255.255.252", gateway: "-", notes: "to R3" },
      { device: "R3", interface: "GigabitEthernet0/0", ip: "10.23.0.2", subnet: "255.255.255.252", gateway: "-", notes: "to R2" },
      { device: "R3", interface: "Loopback0",          ip: "10.3.3.1",  subnet: "255.255.255.0",   gateway: "-", notes: "LAN stub" },
    ],
    tasks: [
      "เปิด EIGRP AS 100 บน R1: router eigrp 100",
      "ประกาศ network 10.12.0.0/30 และ 10.1.1.0/24 บน R1",
      "ตั้งค่า EIGRP บน R2 ประกาศทั้ง 2 link",
      "ตั้งค่า EIGRP บน R3 ประกาศ link + Loopback",
      "ปิด auto-summary ทุก router",
      "ตรวจสอบ show ip eigrp neighbors และ show ip route eigrp",
    ],
    hints: [
      "EIGRP AS number ต้องตรงกันทุก router",
      "wildcard mask = inverse ของ subnet mask",
      "no auto-summary จำเป็นสำหรับ classless routing",
    ],
    expectedResult: "R1 เห็น D 10.3.3.0/24 ใน routing table, R3 เห็น D 10.1.1.0/24",
    troubleshooting: [
      "Neighbor ไม่ขึ้น: ตรวจ AS number และ K-values ต้องตรงกัน",
      "Route ไม่ขึ้น: ตรวจ network statement ครอบคลุม interface",
      "Stuck in Active: ตรวจ physical connectivity",
    ],
    solution: `! R1
router eigrp 100
 network 10.12.0.0 0.0.0.3
 network 10.1.1.0 0.0.0.255
 no auto-summary

! R2
router eigrp 100
 network 10.12.0.0 0.0.0.3
 network 10.23.0.0 0.0.0.3
 no auto-summary

! R3
router eigrp 100
 network 10.23.0.0 0.0.0.3
 network 10.3.3.0 0.0.0.255
 no auto-summary`,
    roadmapLevel: 3,
  },

  /* ── STP Tuning ─────────────────────────────────────────────── */
  {
    id:          "stp-tuning-lab",
    title:       "STP Tuning – PortFast, BPDU Guard & Root Guard",
    category:    "Switching",
    level:       "Intermediate",
    duration:    "40 min",
    status:      "not-started",
    description: "ตั้งค่า Spanning Tree ให้เหมาะสม: เลือก Root Bridge, เปิด PortFast, BPDU Guard และ Root Guard",
    scenario:    "ปัญหา: PC ใช้เวลานาน (30+ วินาที) กว่าจะ connect ได้หลัง boot เพราะ STP ต้องผ่าน Listening/Learning",
    objective:   "กำหนด SW1 เป็น Root Bridge และเปิด PortFast + BPDU Guard บน access port เพื่อลด boot time",
    devices:     ["SW1", "SW2", "SW3", "PC1"],
    topology: [
      { from: "SW1", to: "SW2", port: "Trunk Gi0/0" },
      { from: "SW1", to: "SW3", port: "Trunk Gi0/1" },
      { from: "SW2", to: "SW3", port: "Trunk Gi0/2" },
      { from: "SW3", to: "PC1", port: "Access Fa0/1" },
    ],
    ipTable: [
      { device: "SW1", interface: "VLAN1 SVI", ip: "192.168.1.1", subnet: "255.255.255.0", gateway: "-", notes: "Root Bridge priority 4096" },
      { device: "SW2", interface: "VLAN1 SVI", ip: "192.168.1.2", subnet: "255.255.255.0", gateway: "-", notes: "Default priority 32768" },
      { device: "SW3", interface: "VLAN1 SVI", ip: "192.168.1.3", subnet: "255.255.255.0", gateway: "-", notes: "Default priority 32768" },
    ],
    tasks: [
      "ลด priority ของ SW1 เป็น 4096 เพื่อเป็น Root Bridge",
      "ตรวจสอบ SW1 เป็น Root Bridge ด้วย show spanning-tree",
      "เปิด PortFast บน SW3 Fa0/1 (access port ต่อ PC)",
      "เปิด BPDU Guard บน SW3 Fa0/1",
      "ตั้ง Root Guard บน SW1 port ที่ต่อ downstream switch",
    ],
    hints: [
      "ลด priority ให้ต่ำที่สุดใน network เพื่อเป็น Root",
      "PortFast ห้ามใช้กับ trunk port",
      "BPDU Guard จะ err-disable port ถ้าได้รับ BPDU",
    ],
    expectedResult: "SW1 เป็น Root Bridge, PC1 เชื่อมต่อเร็วขึ้น, BPDU Guard ปกป้อง access port",
    troubleshooting: [
      "Root Bridge ผิด: ตรวจ priority ด้วย show spanning-tree",
      "Port err-disabled: BPDU Guard ทำงาน ตรวจว่ามี Switch ต่ออยู่",
      "PortFast ไม่ช่วย: ตรวจว่า port เป็น access mode",
    ],
    solution: `! SW1 – เป็น Root Bridge
spanning-tree vlan 1 priority 4096

! SW3 – PortFast + BPDU Guard บน port ต่อ PC
interface FastEthernet0/1
 spanning-tree portfast
 spanning-tree bpduguard enable

! SW1 – Root Guard บน port ต่อ downstream
interface GigabitEthernet0/0
 spanning-tree guard root`,
    roadmapLevel: 2,
  },

  /* ── NAT PAT Advanced ───────────────────────────────────────── */
  {
    id:          "nat-pat-advanced",
    title:       "NAT PAT – Dynamic NAT & Overload",
    category:    "Routing",
    level:       "Intermediate",
    duration:    "40 min",
    status:      "not-started",
    description: "ตั้งค่า Static NAT สำหรับ Server และ PAT (overload) สำหรับ internal client ทั้งหมด",
    scenario:    "บริษัทมี Public IP จำกัด ต้องการให้ internal host ทุกเครื่องออก Internet ผ่าน IP เดียว",
    objective:   "ตั้ง Static NAT map Server 192.168.1.100 → 203.0.113.5 และ PAT สำหรับ 192.168.1.0/24",
    devices:     ["R1", "ISP", "Server", "PC1"],
    topology: [
      { from: "R1", to: "ISP",    port: "Gi0/1 – outside" },
      { from: "R1", to: "Server", port: "Gi0/0 – inside" },
      { from: "R1", to: "PC1",    port: "Gi0/0 – inside" },
    ],
    ipTable: [
      { device: "R1",     interface: "GigabitEthernet0/0", ip: "192.168.1.1",   subnet: "255.255.255.0",   gateway: "-",           notes: "inside" },
      { device: "R1",     interface: "GigabitEthernet0/1", ip: "203.0.113.1",   subnet: "255.255.255.252", gateway: "-",           notes: "outside" },
      { device: "Server", interface: "NIC",                ip: "192.168.1.100", subnet: "255.255.255.0",   gateway: "192.168.1.1", notes: "Static NAT" },
      { device: "PC1",    interface: "NIC",                ip: "192.168.1.10",  subnet: "255.255.255.0",   gateway: "192.168.1.1", notes: "PAT" },
    ],
    tasks: [
      "กำหนด ip nat inside บน Gi0/0",
      "กำหนด ip nat outside บน Gi0/1",
      "ตั้ง Static NAT: 192.168.1.100 → 203.0.113.5",
      "สร้าง ACL INSIDE-HOSTS ครอบคลุม 192.168.1.0/24",
      "ตั้ง PAT overload ใช้ outside interface",
      "ตรวจสอบ show ip nat translations",
    ],
    hints: [
      "ต้องกำหนด inside/outside บน interface ก่อนเสมอ",
      "Static NAT ไม่ต้องการ ACL",
      "PAT overload ใช้ interface keyword แทน pool เพื่อประหยัด IP",
    ],
    expectedResult: "PC1 ping 8.8.8.8 ได้, show ip nat translations แสดง PAT entry พร้อม port",
    troubleshooting: [
      "NAT ไม่ทำงาน: ตรวจ ip nat inside/outside บน interface",
      "Static NAT ไม่ตอบ: ตรวจ default route ออก internet",
      "PAT ไม่ทำงาน: ตรวจ ACL match กับ traffic จริง",
    ],
    solution: `! R1
interface GigabitEthernet0/0
 ip nat inside

interface GigabitEthernet0/1
 ip nat outside

ip nat inside source static 192.168.1.100 203.0.113.5

ip access-list standard INSIDE-HOSTS
 permit 192.168.1.0 0.0.0.255

ip nat inside source list INSIDE-HOSTS interface GigabitEthernet0/1 overload`,
    roadmapLevel: 3,
  },

  /* ── MPLS LDP ───────────────────────────────────────────────── */
  {
    id:          "mpls-ldp-lab",
    title:       "MPLS LDP – Label Distribution Protocol",
    category:    "Advanced",
    level:       "Advanced",
    duration:    "50 min",
    status:      "not-started",
    description: "เปิดใช้ MPLS บน backbone router ตั้งค่า LDP และตรวจสอบ label forwarding table",
    scenario:    "ISP ต้องการ upgrade network ใช้ MPLS เพื่อรองรับ L3VPN และ Traffic Engineering",
    objective:   "เปิด MPLS + LDP บน PE1-P1-P2-PE2 ให้เกิด label forwarding สำหรับทุก prefix",
    devices:     ["PE1", "P1", "P2", "PE2"],
    topology: [
      { from: "PE1", to: "P1",  port: "10.0.12.0/30" },
      { from: "P1",  to: "P2",  port: "10.0.13.0/30" },
      { from: "P2",  to: "PE2", port: "10.0.23.0/30" },
    ],
    ipTable: [
      { device: "PE1", interface: "Gi0/0", ip: "10.0.12.1", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
      { device: "P1",  interface: "Gi0/0", ip: "10.0.12.2", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
      { device: "P1",  interface: "Gi0/1", ip: "10.0.13.1", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
      { device: "P2",  interface: "Gi0/0", ip: "10.0.13.2", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
      { device: "P2",  interface: "Gi0/1", ip: "10.0.23.1", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
      { device: "PE2", interface: "Gi0/0", ip: "10.0.23.2", subnet: "255.255.255.252", gateway: "-", notes: "MPLS enabled" },
    ],
    tasks: [
      "ตั้งค่า OSPF ให้ทุก router เห็นกันก่อน",
      "กำหนด mpls label protocol ldp ทุก router",
      "กำหนด mpls ldp router-id Loopback0 force",
      "เปิด mpls ip บน interface ทุก link",
      "ตรวจสอบ show mpls ldp neighbor",
      "ตรวจสอบ show mpls forwarding-table",
    ],
    hints: [
      "ต้องมี IGP route ก่อน MPLS ถึงจะสร้าง label ได้",
      "LDP ใช้ port UDP/TCP 646",
      "PHP (Penultimate Hop Popping) เกิดขึ้นอัตโนมัติ",
    ],
    expectedResult: "show mpls ldp neighbor แสดง State: Oper, show mpls forwarding-table มี label ทุก prefix",
    troubleshooting: [
      "LDP neighbor ไม่ขึ้น: ตรวจ mpls ip บน interface ทั้ง 2 ฝั่ง",
      "Label ไม่มี: ตรวจ IGP route มีใน routing table ก่อน",
      "Traffic ไม่ถูก label: ตรวจ CEF ด้วย show ip cef",
    ],
    solution: `! ทุก router (ตัวอย่าง P1)
router ospf 1
 network 10.0.0.0 0.255.255.255 area 0

mpls label protocol ldp
mpls ldp router-id Loopback0 force

interface GigabitEthernet0/0
 mpls ip

interface GigabitEthernet0/1
 mpls ip`,
    roadmapLevel: 5,
  },
  {
    id: "gre-tunnel-lab",
    title: "GRE Tunnel & Point-to-Point VPN",
    description: "สร้าง GRE tunnel ข้าม WAN เชื่อม site สองแห่งและ route traffic ผ่าน tunnel",
    level: "Intermediate",
    duration: "50 min",
    category: "WAN",
    status: "available",
    technology: "GRE",
    points: 180,
    topology: {
      devices: [
        { name: "HQ", type: "router", ip: "203.0.113.1" },
        { name: "BRANCH", type: "router", ip: "198.51.100.1" },
        { name: "ISP", type: "router", ip: "" },
      ],
      connections: [
        { from: "HQ", to: "ISP", bandwidth: "100 Mbps" },
        { from: "ISP", to: "BRANCH", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "HQ", interface: "Gi0/0", ip: "203.0.113.1", subnet: "/30", gateway: "" },
      { device: "HQ", interface: "Tunnel0", ip: "10.100.0.1", subnet: "/30", gateway: "" },
      { device: "BRANCH", interface: "Gi0/0", ip: "198.51.100.1", subnet: "/30", gateway: "" },
      { device: "BRANCH", interface: "Tunnel0", ip: "10.100.0.2", subnet: "/30", gateway: "" },
    ],
    tasks: [
      "สร้าง interface Tunnel0 บน HQ และ BRANCH",
      "กำหนด tunnel source และ tunnel destination (public IP)",
      "assign IP บน tunnel interface ทั้งสองฝั่ง",
      "เพิ่ม static route ชี้ LAN ฝั่งตรงข้ามผ่าน tunnel",
      "ทดสอบ ping ข้าม tunnel",
      "ตรวจสอบ show interfaces Tunnel0",
    ],
    hints: [
      "tunnel source ใช้ public interface IP หรือ interface name ก็ได้",
      "GRE overhead ประมาณ 24 bytes — ควรปรับ MTU",
      "tunnel keepalive ช่วยตรวจ tunnel ล่มได้",
    ],
    expectedResult: "ping 10.100.0.2 source 10.100.0.1 สำเร็จ, show interfaces Tunnel0 แสดง Line protocol is up",
    troubleshooting: [
      "Tunnel down: ตรวจ route ไป tunnel destination มีใน routing table",
      "Ping ไม่ผ่าน: ตรวจ ACL บน ISP ว่า block GRE (protocol 47) หรือไม่",
      "Routing loop: ตรวจ recursive route ไป tunnel destination",
    ],
    solution: `interface Tunnel0
 ip address 10.100.0.1 255.255.255.252
 tunnel source GigabitEthernet0/0
 tunnel destination 198.51.100.1
 tunnel keepalive 10 3

ip route 192.168.2.0 255.255.255.0 10.100.0.2`,
    roadmapLevel: 3,
  },
  {
    id: "ospf-multiarea-lab",
    title: "OSPF Multi-Area Design",
    description: "ออกแบบและกำหนดค่า OSPF หลาย Area รวมถึง ABR, stub area และ route summarization",
    level: "Advanced",
    duration: "70 min",
    category: "Routing",
    status: "available",
    technology: "OSPF",
    points: 220,
    topology: {
      devices: [
        { name: "ABR1", type: "router", ip: "10.0.0.1" },
        { name: "ABR2", type: "router", ip: "10.0.0.2" },
        { name: "R_Area1", type: "router", ip: "10.1.1.1" },
        { name: "R_Area2", type: "router", ip: "10.2.1.1" },
        { name: "ASBR", type: "router", ip: "10.0.0.3" },
      ],
      connections: [
        { from: "ABR1", to: "ABR2", bandwidth: "1 Gbps" },
        { from: "ABR1", to: "R_Area1", bandwidth: "100 Mbps" },
        { from: "ABR2", to: "R_Area2", bandwidth: "100 Mbps" },
        { from: "ABR2", to: "ASBR", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "ABR1", interface: "Lo0", ip: "1.1.1.1", subnet: "/32", gateway: "" },
      { device: "ABR2", interface: "Lo0", ip: "2.2.2.2", subnet: "/32", gateway: "" },
      { device: "R_Area1", interface: "Lo0", ip: "3.3.3.3", subnet: "/32", gateway: "" },
      { device: "R_Area2", interface: "Lo0", ip: "4.4.4.4", subnet: "/32", gateway: "" },
    ],
    tasks: [
      "กำหนด OSPF Area 0 ระหว่าง ABR1 และ ABR2",
      "กำหนด Area 1 ระหว่าง ABR1 และ R_Area1",
      "กำหนด Area 2 เป็น Stub Area ระหว่าง ABR2 และ R_Area2",
      "กำหนด route summarization บน ABR",
      "Redistribute connected บน ASBR เป็น External Type 2",
      "ตรวจสอบ show ip ospf database",
    ],
    hints: [
      "Stub area ไม่รับ Type 5 LSA — ประหยัด memory บน spoke router",
      "Summary ทำบน ABR ด้วย area X range",
      "ASBR ต้องอยู่ใน non-stub area",
    ],
    expectedResult: "ทุก router มี route ครบ, R_Area2 เห็นเฉพาะ default route จาก ABR2, show ip ospf database summary มี LSA Type 3",
    troubleshooting: [
      "Neighbor ไม่ขึ้น: ตรวจ area number ตรงกัน, hello/dead timer, subnet",
      "ไม่มี route external ใน stub: stub area ไม่รับ Type 5 — ปกติ",
      "Summary ไม่ปรากฏ: ตรวจ area range บน ABR ตรง network จริง",
    ],
    solution: `router ospf 1
 router-id 1.1.1.1
 area 1 range 10.1.0.0 255.255.0.0
 network 10.0.0.0 0.0.0.255 area 0
 network 10.1.0.0 0.0.255.255 area 1

! ABR2
router ospf 1
 area 2 stub
 area 2 range 10.2.0.0 255.255.0.0
 network 10.0.0.0 0.0.0.255 area 0
 network 10.2.0.0 0.0.255.255 area 2`,
    roadmapLevel: 4,
  },
  {
    id: "route-redistribution-lab",
    title: "Route Redistribution (OSPF ↔ EIGRP)",
    description: "ทำ mutual redistribution ระหว่าง OSPF และ EIGRP พร้อมป้องกัน routing loop ด้วย route tagging",
    level: "Advanced",
    duration: "65 min",
    category: "Routing",
    status: "available",
    technology: "OSPF/EIGRP",
    points: 230,
    topology: {
      devices: [
        { name: "ASBR", type: "router", ip: "10.0.0.1" },
        { name: "OSPF_R1", type: "router", ip: "10.10.1.1" },
        { name: "EIGRP_R1", type: "router", ip: "10.20.1.1" },
      ],
      connections: [
        { from: "ASBR", to: "OSPF_R1", bandwidth: "100 Mbps" },
        { from: "ASBR", to: "EIGRP_R1", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "ASBR", interface: "Gi0/0", ip: "10.10.0.1", subnet: "/24", gateway: "" },
      { device: "ASBR", interface: "Gi0/1", ip: "10.20.0.1", subnet: "/24", gateway: "" },
      { device: "OSPF_R1", interface: "Gi0/0", ip: "10.10.0.2", subnet: "/24", gateway: "10.10.0.1" },
      { device: "EIGRP_R1", interface: "Gi0/0", ip: "10.20.0.2", subnet: "/24", gateway: "10.20.0.1" },
    ],
    tasks: [
      "กำหนด OSPF บน ASBR ฝั่ง OSPF_R1",
      "กำหนด EIGRP บน ASBR ฝั่ง EIGRP_R1",
      "Redistribute EIGRP เข้า OSPF พร้อม metric",
      "Redistribute OSPF เข้า EIGRP พร้อม metric",
      "ใช้ route-map + tag ป้องกัน routing loop",
      "ทดสอบ ping ข้ามโปรโตคอล",
    ],
    hints: [
      "tag route ที่ redistribute เพื่อ deny กลับเมื่อ re-redistribute",
      "OSPF redistribute ต้องใส่ subnets keyword",
      "EIGRP metric ต้องใส่ 5 ค่า: BW delay reliability load MTU",
    ],
    expectedResult: "OSPF_R1 เห็น network ของ EIGRP เป็น E2, EIGRP_R1 เห็น network ของ OSPF เป็น EX, ping ข้ามฝั่งสำเร็จ",
    troubleshooting: [
      "Route ไม่ปรากฏ: ตรวจ redistribute subnets (OSPF) และ metric (EIGRP)",
      "Routing loop: ตรวจ tag และ route-map deny",
      "EIGRP metric ผิด: ต้องใส่ครบ 5 ค่า",
    ],
    solution: `route-map OSPF_TO_EIGRP permit 10
 match tag 100
 set tag 200

route-map EIGRP_TO_OSPF permit 10
 match tag 200
 set tag 100

router ospf 1
 redistribute eigrp 1 subnets route-map EIGRP_TO_OSPF

router eigrp 1
 redistribute ospf 1 metric 10000 100 255 1 1500 route-map OSPF_TO_EIGRP`,
    roadmapLevel: 5,
  },
  {
    id: "ntp-syslog-lab",
    title: "NTP Synchronization & Syslog Centralization",
    description: "กำหนดค่า NTP hierarchy และส่ง syslog ไปยัง central server พร้อม logging level",
    level: "Beginner",
    duration: "30 min",
    category: "Management",
    status: "available",
    technology: "NTP/Syslog",
    points: 100,
    topology: {
      devices: [
        { name: "NTP_SERVER", type: "router", ip: "10.0.0.1" },
        { name: "SYSLOG_SRV", type: "server", ip: "10.0.0.10" },
        { name: "SW1", type: "switch", ip: "10.0.0.2" },
        { name: "R1", type: "router", ip: "10.0.0.3" },
      ],
      connections: [
        { from: "NTP_SERVER", to: "SW1", bandwidth: "1 Gbps" },
        { from: "SYSLOG_SRV", to: "SW1", bandwidth: "1 Gbps" },
        { from: "R1", to: "SW1", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "NTP_SERVER", interface: "Gi0/0", ip: "10.0.0.1", subnet: "/24", gateway: "" },
      { device: "SW1", interface: "Vlan1", ip: "10.0.0.2", subnet: "/24", gateway: "10.0.0.1" },
      { device: "R1", interface: "Gi0/0", ip: "10.0.0.3", subnet: "/24", gateway: "10.0.0.1" },
    ],
    tasks: [
      "กำหนด NTP_SERVER เป็น NTP master stratum 2",
      "กำหนด R1 และ SW1 sync NTP จาก NTP_SERVER",
      "ตรวจสอบ show ntp status และ show ntp associations",
      "กำหนด logging host ชี้ไป SYSLOG_SRV",
      "กำหนด logging level informational",
      "ทดสอบด้วย debug ip routing และดู syslog",
    ],
    hints: [
      "ntp master X กำหนดให้ router เป็น authoritative source",
      "logging trap เลือก severity ของ syslog ที่ส่ง",
      "service timestamps log datetime msec เพิ่ม timestamp",
    ],
    expectedResult: "show ntp status แสดง Clock is synchronized, syslog server ได้รับ log จาก R1 และ SW1",
    troubleshooting: [
      "NTP ไม่ sync: ตรวจ connectivity ถึง NTP server, ตรวจ ntp server คำสั่ง",
      "Syslog ไม่ถึง server: ตรวจ IP ถูก, UDP 514 ไม่ถูก block",
      "Timestamp ผิด: ตรวจ timezone ด้วย clock timezone",
    ],
    solution: `! NTP_SERVER
ntp master 2

! R1 และ SW1
ntp server 10.0.0.1
service timestamps log datetime msec
logging host 10.0.0.10
logging trap informational
logging on`,
    roadmapLevel: 2,
  },
  {
    id: "dhcp-server-lab",
    title: "DHCP Server & Relay Agent",
    description: "กำหนดค่า DHCP server บน router, สร้าง scope หลาย VLAN และตั้ง relay agent สำหรับ subnet ต่างฝั่ง",
    level: "Beginner",
    duration: "35 min",
    category: "Network Services",
    status: "available",
    technology: "DHCP",
    points: 110,
    topology: {
      devices: [
        { name: "DHCP_SRV", type: "router", ip: "10.0.0.1" },
        { name: "RELAY_R", type: "router", ip: "10.1.0.1" },
        { name: "PC1", type: "pc", ip: "DHCP" },
        { name: "PC2", type: "pc", ip: "DHCP" },
      ],
      connections: [
        { from: "DHCP_SRV", to: "RELAY_R", bandwidth: "1 Gbps" },
        { from: "RELAY_R", to: "PC1", bandwidth: "100 Mbps" },
        { from: "RELAY_R", to: "PC2", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "DHCP_SRV", interface: "Gi0/0", ip: "10.0.0.1", subnet: "/24", gateway: "" },
      { device: "RELAY_R", interface: "Gi0/0", ip: "10.0.0.2", subnet: "/24", gateway: "" },
      { device: "RELAY_R", interface: "Gi0/1", ip: "192.168.10.1", subnet: "/24", gateway: "" },
      { device: "RELAY_R", interface: "Gi0/2", ip: "192.168.20.1", subnet: "/24", gateway: "" },
    ],
    tasks: [
      "สร้าง DHCP pool สำหรับ 192.168.10.0/24 บน DHCP_SRV",
      "สร้าง DHCP pool สำหรับ 192.168.20.0/24 บน DHCP_SRV",
      "กำหนด ip helper-address บน RELAY_R interface Gi0/1 และ Gi0/2",
      "exclude IP ที่ไม่ต้องการให้ assign",
      "ทดสอบ PC1, PC2 ได้รับ IP จาก pool ที่ถูกต้อง",
      "ตรวจสอบ show ip dhcp binding",
    ],
    hints: [
      "ip helper-address ส่ง broadcast DHCP ข้าม subnet ไปหา server",
      "ip dhcp excluded-address กำหนดก่อน pool",
      "default-router ต้องตรงกับ gateway ของ subnet นั้น",
    ],
    expectedResult: "PC1 ได้ IP ใน 192.168.10.x, PC2 ได้ IP ใน 192.168.20.x, show ip dhcp binding แสดง lease ทั้งคู่",
    troubleshooting: [
      "Client ไม่ได้ IP: ตรวจ ip helper-address บน interface ที่ถูก",
      "ได้ IP pool ผิด: ตรวจ network statement ใน pool ตรงกับ subnet",
      "IP ซ้ำ: เพิ่ม excluded-address สำหรับ static IP ในวง",
    ],
    solution: `! DHCP_SRV
ip dhcp excluded-address 192.168.10.1 192.168.10.10
ip dhcp excluded-address 192.168.20.1 192.168.20.10

ip dhcp pool VLAN10
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8
 lease 1

ip dhcp pool VLAN20
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1
 dns-server 8.8.8.8
 lease 1

! RELAY_R
interface GigabitEthernet0/1
 ip helper-address 10.0.0.1

interface GigabitEthernet0/2
 ip helper-address 10.0.0.1`,
    roadmapLevel: 2,
  },

  {
    id: "acl-advanced-lab",
    title: "Extended ACL & Named ACL",
    description: "สร้าง ACL กรอง traffic ตาม source/destination IP, port, protocol พร้อม apply inbound/outbound",
    level: "Intermediate",
    duration: "45 min",
    category: "Security",
    status: "available",
    technology: "ACL",
    points: 160,
    topology: {
      devices: [
        { name: "R1", type: "router", ip: "10.0.0.1" },
        { name: "PC_SALES", type: "pc", ip: "192.168.10.10" },
        { name: "PC_HR", type: "pc", ip: "192.168.20.10" },
        { name: "SERVER_WEB", type: "server", ip: "10.1.1.100" },
        { name: "SERVER_DB", type: "server", ip: "10.1.1.200" },
      ],
      connections: [
        { from: "PC_SALES", to: "R1", bandwidth: "100 Mbps" },
        { from: "PC_HR", to: "R1", bandwidth: "100 Mbps" },
        { from: "R1", to: "SERVER_WEB", bandwidth: "1 Gbps" },
        { from: "R1", to: "SERVER_DB", bandwidth: "1 Gbps" },
      ],
    },
    ipTable: [
      { device: "R1", interface: "Gi0/0", ip: "192.168.10.1", subnet: "/24", gateway: "" },
      { device: "R1", interface: "Gi0/1", ip: "192.168.20.1", subnet: "/24", gateway: "" },
      { device: "R1", interface: "Gi0/2", ip: "10.1.1.1", subnet: "/24", gateway: "" },
      { device: "PC_SALES", interface: "eth0", ip: "192.168.10.10", subnet: "/24", gateway: "192.168.10.1" },
      { device: "PC_HR", interface: "eth0", ip: "192.168.20.10", subnet: "/24", gateway: "192.168.20.1" },
    ],
    tasks: [
      "อนุญาต SALES เข้า WEB server port 80/443 เท่านั้น",
      "อนุญาต HR เข้า WEB และ DB server ได้ทุก port",
      "Block ทุก traffic อื่นไปยัง SERVER_DB",
      "Apply ACL บน interface ที่เหมาะสม (inbound/outbound)",
      "ทดสอบด้วย telnet/ping จาก PC แต่ละเครื่อง",
      "ตรวจสอบ show ip access-lists",
    ],
    hints: [
      "Extended ACL ควร apply ใกล้ source ที่สุด",
      "ACL implicit deny any ที่ท้าย — ต้อง permit traffic ที่ต้องการก่อน",
      "ใช้ named ACL เพื่อ insert rule โดยไม่ต้อง rewrite ทั้งหมด",
    ],
    expectedResult: "SALES ping WEB สำเร็จ, SALES ping DB ไม่ได้, HR เข้าได้ทั้ง WEB และ DB, show ip access-lists มี match count",
    troubleshooting: [
      "ACL block ทุก traffic: ตรวจ permit statement มาก่อน deny",
      "ACL ไม่ทำงาน: ตรวจ apply ถูก interface และ direction",
      "Cannot insert rule: ใช้ named ACL และ ip access-list extended NAME",
    ],
    solution: `ip access-list extended SALES_POLICY
 permit tcp 192.168.10.0 0.0.0.255 host 10.1.1.100 eq 80
 permit tcp 192.168.10.0 0.0.0.255 host 10.1.1.100 eq 443
 deny ip 192.168.10.0 0.0.0.255 any

ip access-list extended HR_POLICY
 permit ip 192.168.20.0 0.0.0.255 10.1.1.0 0.0.0.255

interface GigabitEthernet0/0
 ip access-group SALES_POLICY in

interface GigabitEthernet0/1
 ip access-group HR_POLICY in`,
    roadmapLevel: 3,
  },
  {
    id: "bgp-basic-lab",
    title: "eBGP Peering & Prefix Advertisement",
    description: "กำหนดค่า eBGP ระหว่าง 2 AS, advertise prefix, กำหนด AS Path และ Local Preference",
    level: "Advanced",
    duration: "60 min",
    category: "Routing",
    status: "available",
    technology: "BGP",
    points: 210,
    topology: {
      devices: [
        { name: "AS100_R1", type: "router", ip: "1.1.1.1" },
        { name: "AS200_R1", type: "router", ip: "2.2.2.2" },
        { name: "AS300_R1", type: "router", ip: "3.3.3.3" },
      ],
      connections: [
        { from: "AS100_R1", to: "AS200_R1", bandwidth: "1 Gbps" },
        { from: "AS200_R1", to: "AS300_R1", bandwidth: "1 Gbps" },
      ],
    },
    ipTable: [
      { device: "AS100_R1", interface: "Gi0/0", ip: "10.12.0.1", subnet: "/30", gateway: "" },
      { device: "AS200_R1", interface: "Gi0/0", ip: "10.12.0.2", subnet: "/30", gateway: "" },
      { device: "AS200_R1", interface: "Gi0/1", ip: "10.23.0.1", subnet: "/30", gateway: "" },
      { device: "AS300_R1", interface: "Gi0/0", ip: "10.23.0.2", subnet: "/30", gateway: "" },
    ],
    tasks: [
      "กำหนด eBGP peer ระหว่าง AS100-AS200 และ AS200-AS300",
      "Advertise loopback prefix ของแต่ละ AS เข้า BGP",
      "ตรวจสอบ show bgp ipv4 unicast summary",
      "ปรับ Local Preference บน AS200 เพื่อเลือก exit",
      "ใช้ route-map กรอง prefix ที่รับจาก AS100",
      "ตรวจสอบ AS Path ด้วย show bgp ipv4 unicast",
    ],
    hints: [
      "eBGP neighbor ต้อง directly connected หรือ ebgp-multihop",
      "network statement ใน BGP ต้องมี exact match ใน routing table",
      "Local Preference ส่งผ่าน iBGP เท่านั้น",
    ],
    expectedResult: "BGP summary แสดง State = Established, prefix ของทุก AS ปรากฏใน routing table, AS Path ถูกต้อง",
    troubleshooting: [
      "Neighbor ไม่ขึ้น: ตรวจ remote-as ถูก, connectivity ถึง neighbor IP",
      "Prefix ไม่ปรากฏ: ตรวจ network statement ตรงกับ route ใน table",
      "Route ไม่ install: ตรวจ next-hop reachability",
    ],
    solution: `router bgp 100
 bgp router-id 1.1.1.1
 neighbor 10.12.0.2 remote-as 200
 network 1.1.1.0 mask 255.255.255.0

router bgp 200
 bgp router-id 2.2.2.2
 neighbor 10.12.0.1 remote-as 100
 neighbor 10.23.0.2 remote-as 300
 network 2.2.2.0 mask 255.255.255.0`,
    roadmapLevel: 5,
  },
  {
    id: "ipv6-tunnel-lab",
    title: "IPv6 Tunneling (6in4)",
    description: "สร้าง IPv6-over-IPv4 tunnel เชื่อม IPv6 island ข้าม IPv4-only network",
    level: "Advanced",
    duration: "55 min",
    category: "IPv6",
    status: "available",
    technology: "IPv6",
    points: 200,
    topology: {
      devices: [
        { name: "R_SITE_A", type: "router", ip: "203.0.113.1" },
        { name: "R_SITE_B", type: "router", ip: "198.51.100.1" },
        { name: "IPV4_CORE", type: "router", ip: "172.16.0.1" },
      ],
      connections: [
        { from: "R_SITE_A", to: "IPV4_CORE", bandwidth: "100 Mbps" },
        { from: "IPV4_CORE", to: "R_SITE_B", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "R_SITE_A", interface: "Gi0/0", ip: "203.0.113.1", subnet: "/30", gateway: "" },
      { device: "R_SITE_A", interface: "Tunnel0", ip: "2001:db8:1::1", subnet: "/64", gateway: "", notes: "IPv6" },
      { device: "R_SITE_B", interface: "Gi0/0", ip: "198.51.100.1", subnet: "/30", gateway: "" },
      { device: "R_SITE_B", interface: "Tunnel0", ip: "2001:db8:1::2", subnet: "/64", gateway: "", notes: "IPv6" },
    ],
    tasks: [
      "สร้าง Tunnel0 mode ipv6ip บน R_SITE_A และ R_SITE_B",
      "กำหนด tunnel source (IPv4) และ tunnel destination",
      "assign IPv6 address บน tunnel interface",
      "กำหนด IPv6 static route ชี้ผ่าน tunnel",
      "ทดสอบ ping IPv6 ข้าม tunnel",
      "ตรวจสอบ show interfaces Tunnel0",
    ],
    hints: [
      "tunnel mode ipv6ip สำหรับ manual 6in4 tunnel",
      "IPv6 routing ต้องเปิด ipv6 unicast-routing ก่อน",
      "tunnel source ใช้ IPv4 interface ที่มี public IP",
    ],
    expectedResult: "ping ipv6 2001:db8:1::2 สำเร็จ, show interfaces Tunnel0 แสดง up/up",
    troubleshooting: [
      "Tunnel down: ตรวจ IPv4 connectivity ระหว่าง tunnel source/destination",
      "Ping ไม่ผ่าน: ตรวจ ipv6 unicast-routing เปิดอยู่",
      "Route ไม่มี: ตรวจ ipv6 route statement ชี้ tunnel interface",
    ],
    solution: `ipv6 unicast-routing

interface Tunnel0
 ipv6 address 2001:db8:1::1/64
 tunnel source GigabitEthernet0/0
 tunnel destination 198.51.100.1
 tunnel mode ipv6ip

ipv6 route 2001:db8:2::/48 Tunnel0`,
    roadmapLevel: 4,
  },
  {
    id: "qos-policing-lab",
    title: "QoS Traffic Policing & Shaping",
    description: "กำหนดค่า MQC สำหรับ classify, police และ shape traffic ตาม policy",
    level: "Advanced",
    duration: "60 min",
    category: "QoS",
    status: "available",
    technology: "QoS",
    points: 215,
    topology: {
      devices: [
        { name: "CE_R1", type: "router", ip: "10.0.0.1" },
        { name: "PE_R1", type: "router", ip: "10.0.0.2" },
        { name: "PC_VIDEO", type: "pc", ip: "192.168.1.10" },
        { name: "PC_DATA", type: "pc", ip: "192.168.2.10" },
      ],
      connections: [
        { from: "CE_R1", to: "PE_R1", bandwidth: "10 Mbps" },
        { from: "PC_VIDEO", to: "CE_R1", bandwidth: "100 Mbps" },
        { from: "PC_DATA", to: "CE_R1", bandwidth: "100 Mbps" },
      ],
    },
    ipTable: [
      { device: "CE_R1", interface: "Gi0/0", ip: "192.168.1.1", subnet: "/24", gateway: "" },
      { device: "CE_R1", interface: "Gi0/1", ip: "192.168.2.1", subnet: "/24", gateway: "" },
      { device: "CE_R1", interface: "Gi0/2", ip: "10.0.0.1", subnet: "/30", gateway: "" },
    ],
    tasks: [
      "สร้าง class-map จำแนก video traffic (DSCP EF) และ data traffic",
      "สร้าง policy-map กำหนด bandwidth guarantee สำหรับ video 4 Mbps",
      "Police data traffic ไม่เกิน 5 Mbps",
      "Shape outbound traffic บน WAN interface 10 Mbps",
      "Apply service-policy บน interface",
      "ตรวจสอบ show policy-map interface",
    ],
    hints: [
      "MQC: class-map → policy-map → service-policy",
      "priority ใน policy-map ให้ LLQ (Low Latency Queuing)",
      "police: conform-action transmit, exceed-action drop",
    ],
    expectedResult: "show policy-map interface แสดง class stats, video ได้รับ priority queue, data ถูก police",
    troubleshooting: [
      "Policy ไม่ match: ตรวจ class-map match conditions และ DSCP marking",
      "Bandwidth ไม่พอ: ตรวจผลรวม bandwidth ไม่เกิน interface bandwidth",
      "Shaping ไม่ทำงาน: ตรวจ shape average ค่าเป็น bps",
    ],
    solution: `class-map match-any VIDEO_CLASS
 match dscp ef

policy-map WAN_POLICY
 class VIDEO_CLASS
  priority 4000
 class class-default
  shape average 10000000

interface GigabitEthernet0/2
 service-policy output WAN_POLICY`,
    roadmapLevel: 5,
  },
  {
    id: "ppp-authentication-lab",
    title: "PPP Authentication (PAP & CHAP)",
    description: "กำหนดค่า PPP encapsulation บน serial link พร้อม CHAP authentication",
    level: "Intermediate",
    duration: "40 min",
    category: "WAN",
    status: "available",
    technology: "PPP",
    points: 145,
    topology: {
      devices: [
        { name: "HQ_R", type: "router", ip: "10.0.0.1" },
        { name: "BRANCH_R", type: "router", ip: "10.0.0.2" },
      ],
      connections: [
        { from: "HQ_R", to: "BRANCH_R", bandwidth: "2 Mbps" },
      ],
    },
    ipTable: [
      { device: "HQ_R", interface: "Serial0/0", ip: "10.0.0.1", subnet: "/30", gateway: "" },
      { device: "BRANCH_R", interface: "Serial0/0", ip: "10.0.0.2", subnet: "/30", gateway: "" },
    ],
    tasks: [
      "กำหนด encapsulation ppp บน Serial interface ทั้งสองฝั่ง",
      "สร้าง username/password สำหรับ CHAP authentication",
      "กำหนด ppp authentication chap บน interface",
      "ทดสอบ ping ผ่าน PPP link",
      "เพิ่ม PAP authentication เป็น fallback",
      "ตรวจสอบ show interfaces Serial0/0",
    ],
    hints: [
      "CHAP username ต้องตรงกับ hostname ของ router ฝั่งตรงข้าม",
      "CHAP ปลอดภัยกว่า PAP เพราะ hash password ด้วย MD5",
      "ppp authentication chap pap ลอง CHAP ก่อน PAP",
    ],
    expectedResult: "show interfaces Serial0/0 แสดง LCP Open, CHAP Open, ping 10.0.0.2 สำเร็จ",
    troubleshooting: [
      "Authentication failed: ตรวจ username ตรงกับ hostname อีกฝั่ง",
      "LCP ไม่ Open: ตรวจ encapsulation ppp ทั้งสองฝั่ง",
      "Link down: ตรวจ clock rate บน DCE end",
    ],
    solution: `! HQ_R
username BRANCH_R password cisco123
interface Serial0/0
 ip address 10.0.0.1 255.255.255.252
 encapsulation ppp
 ppp authentication chap

! BRANCH_R
username HQ_R password cisco123
interface Serial0/0
 ip address 10.0.0.2 255.255.255.252
 encapsulation ppp
 ppp authentication chap`,
    roadmapLevel: 3,
  },
  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 1: OSPF + Python Automation
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-ospf-automation",
    title:       "OSPF + Netmiko Automation",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "90 min",
    status:      "available",
    description: "Deploy OSPF บน 4 Routers ด้วยมือ แล้ว Automate ด้วย Python + Netmiko — ดู Config Deploy เร็วขึ้น 10x",
    scenario:    "Network Engineer ต้องเพิ่ม 4 Routers เข้า OSPF Area 0 โดย Push Config ให้ทุกตัวพร้อมกัน แทนที่จะ Config ทีละตัว",
    objective:   "ทำให้ทุก Router exchange OSPF Routes แล้วเขียน Python Script deploy config อัตโนมัติ",
    devices: ["R1", "R2", "R3", "R4", "Python-Host"],
    topology: [
      { from: "R1", to: "R2", port: "Gi0/0 ↔ Gi0/0" },
      { from: "R2", to: "R3", port: "Gi0/1 ↔ Gi0/0" },
      { from: "R3", to: "R4", port: "Gi0/1 ↔ Gi0/0" },
      { from: "R4", to: "R1", port: "Gi0/1 ↔ Gi0/1" },
    ],
    ipTable: [
      { device: "R1", interface: "Gi0/0", ip: "10.0.12.1", subnet: "255.255.255.0", gateway: "-" },
      { device: "R2", interface: "Gi0/0", ip: "10.0.12.2", subnet: "255.255.255.0", gateway: "-" },
      { device: "R2", interface: "Gi0/1", ip: "10.0.23.2", subnet: "255.255.255.0", gateway: "-" },
      { device: "R3", interface: "Gi0/1", ip: "10.0.23.3", subnet: "255.255.255.0", gateway: "-" },
    ],
    tasks: [
      "Phase 1 — Manual: Config IP + OSPF Area 0 บนทุก Router",
      "verify: show ip ospf neighbor — ทุกตัวเป็น FULL",
      "Phase 2 — Automation: ติดตั้ง netmiko (pip install netmiko)",
      "เขียน devices.yaml: list ของ Router IP + credentials",
      "เขียน ospf_deploy.py: loop ผ่านทุก device, push config",
      "รัน Script และ verify ผลลัพธ์เหมือน Manual",
      "Bonus: เขียน ospf_verify.py ดึง show ip ospf neighbor แล้ว parse",
    ],
    hints: [
      "ใช้ send_config_set() ส่ง list of commands ไปยัง Router",
      "ThreadPoolExecutor ทำให้ push ทุก Router พร้อมกัน",
      "ใช้ ConnectHandler(device_type='cisco_ios', host=...) สำหรับ IOS",
    ],
    expectedResult: "OSPF Full Mesh บน 4 Routers, Python Script ที่ Deploy config ได้ใน < 30 วิ",
    troubleshooting: [
      "Netmiko connection timeout: ตรวจ SSH enable + credentials",
      "OSPF ไม่ขึ้น: ตรวจ network statement ครอบ interface IP",
      "Script error: ตรวจ indentation ใน send_config_set list",
    ],
    solution: `# ospf_deploy.py
from netmiko import ConnectHandler
from concurrent.futures import ThreadPoolExecutor

devices = [
    {"host": "10.0.0.1", "username": "cisco", "password": "cisco", "device_type": "cisco_ios"},
    {"host": "10.0.0.2", "username": "cisco", "password": "cisco", "device_type": "cisco_ios"},
]

ospf_config = [
    "router ospf 1",
    "router-id {rid}",
    "network 10.0.0.0 0.255.255.255 area 0",
]

def deploy(device):
    with ConnectHandler(**device) as net:
        output = net.send_config_set(ospf_config)
        print(f"{device['host']}: {output}")

with ThreadPoolExecutor(max_workers=4) as pool:
    pool.map(deploy, devices)`,
    roadmapLevel: 4,
  },

  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 2: VLAN + Security Hardening
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-vlan-security",
    title:       "VLAN Segmentation + Security Hardening",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "75 min",
    status:      "available",
    description: "สร้าง VLAN Segmentation แล้วใส่ ACL + Port Security ป้องกัน Lateral Movement ระหว่าง VLAN",
    scenario:    "บริษัทถูก Audit พบว่า HR VLAN และ Finance VLAN สื่อสารกันได้โดยไม่มี Control — ต้อง Segment และใส่ ACL ป้องกัน",
    objective:   "แยก VLANs ด้วย Inter-VLAN Routing แล้วใส่ ACL บล็อก Cross-VLAN ที่ไม่ได้รับอนุญาต + Port Security",
    devices: ["Core-SW", "Access-SW1", "Access-SW2", "PC-HR", "PC-Finance", "PC-IT"],
    topology: [
      { from: "Core-SW",    to: "Access-SW1", port: "Trunk" },
      { from: "Core-SW",    to: "Access-SW2", port: "Trunk" },
      { from: "Access-SW1", to: "PC-HR",      port: "VLAN 10" },
      { from: "Access-SW1", to: "PC-Finance", port: "VLAN 20" },
      { from: "Access-SW2", to: "PC-IT",      port: "VLAN 99" },
    ],
    ipTable: [
      { device: "Core-SW SVI", interface: "VLAN 10",  ip: "10.10.10.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "Core-SW SVI", interface: "VLAN 20",  ip: "10.20.20.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "Core-SW SVI", interface: "VLAN 99",  ip: "10.99.99.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "PC-HR",       interface: "NIC",       ip: "10.10.10.10", subnet: "255.255.255.0", gateway: "10.10.10.1" },
    ],
    tasks: [
      "สร้าง VLANs 10 (HR), 20 (Finance), 99 (IT) บน Core-SW",
      "สร้าง SVI + Inter-VLAN Routing บน Core-SW",
      "Config Trunk Port ระหว่าง Switches",
      "Config Access Ports บน Access-SW",
      "ทดสอบ: PC-HR ping PC-Finance ผ่านได้ (ก่อน ACL)",
      "สร้าง Extended ACL: Deny HR→Finance, Deny Finance→HR, Permit IT→All",
      "Apply ACL บน SVI VLAN 10 (inbound) และ VLAN 20 (inbound)",
      "Enable Port Security บน Access Ports: max 1 MAC, violation shutdown",
      "ทดสอบ: PC-HR ping PC-Finance ต้องไม่ผ่าน; IT ping ทุกที่ผ่าน",
    ],
    hints: [
      "ACL ต้อง Apply บน SVI Interface (ไม่ใช่ Physical Port)",
      "ip access-group ACL_NAME in บน SVI ของ Source VLAN",
      "Port Security: switchport port-security maximum 1 + violation shutdown",
    ],
    expectedResult: "HR ไม่สามารถ ping Finance ได้ / Finance ไม่สามารถ ping HR / IT เข้าถึงได้ทุก VLAN",
    troubleshooting: [
      "ACL ไม่ทำงาน: ตรวจ apply direction ถูก Interface",
      "Inter-VLAN ไม่ Route: ตรวจ ip routing enable + SVI up/up",
      "Port Security err-disable: show interfaces status + recover",
    ],
    solution: `! Core-SW
vlan 10
 name HR
vlan 20
 name Finance
vlan 99
 name IT

interface vlan 10
 ip address 10.10.10.1 255.255.255.0
 ip access-group ACL_HR in
 no shutdown

ip access-list extended ACL_HR
 deny ip 10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255
 permit ip any any

! Port Security (Access-SW)
interface fa0/1
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 1
 switchport port-security violation shutdown`,
    roadmapLevel: 3,
  },

  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 3: BGP + Route Policy
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-bgp-policy",
    title:       "BGP Multi-homed + Route Policy",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "90 min",
    status:      "available",
    description: "Dual-homed ไป 2 ISP ด้วย eBGP + ใช้ AS-PATH Prepend และ Local Preference ควบคุม Inbound/Outbound Traffic",
    scenario:    "บริษัทมี 2 ISP (Primary 1Gbps, Secondary 500Mbps) ต้องการ Outbound ผ่าน Primary, Inbound ผ่าน Primary เช่นกัน แต่ Failover อัตโนมัติ",
    objective:   "Config eBGP Dual-homed พร้อม Policy ควบคุม Traffic Path",
    devices: ["CE-Router", "ISP1-Router", "ISP2-Router"],
    topology: [
      { from: "CE-Router", to: "ISP1-Router", port: "Gi0/0 ↔ Gi0/0 (AS 65001 ↔ AS 100)" },
      { from: "CE-Router", to: "ISP2-Router", port: "Gi0/1 ↔ Gi0/0 (AS 65001 ↔ AS 200)" },
    ],
    ipTable: [
      { device: "CE-Router", interface: "Gi0/0", ip: "203.0.113.2",  subnet: "255.255.255.252", gateway: "-" },
      { device: "CE-Router", interface: "Gi0/1", ip: "198.51.100.2", subnet: "255.255.255.252", gateway: "-" },
      { device: "ISP1",      interface: "Gi0/0", ip: "203.0.113.1",  subnet: "255.255.255.252", gateway: "-" },
      { device: "ISP2",      interface: "Gi0/0", ip: "198.51.100.1", subnet: "255.255.255.252", gateway: "-" },
    ],
    tasks: [
      "Config eBGP: CE ↔ ISP1 (AS 100), CE ↔ ISP2 (AS 200)",
      "Advertise 192.0.2.0/24 (Company Prefix) ไปทั้ง 2 ISP",
      "ตรวจ: show ip bgp summary — ทั้งสอง Peer เป็น Established",
      "Outbound Policy: Local Preference 200 สำหรับ Route จาก ISP1 (Primary)",
      "Inbound Policy: AS-PATH Prepend บน ISP2 Outbound — เพิ่ม AS ซ้ำ 3 ครั้ง",
      "ทดสอบ Failover: Shutdown ISP1 Link — Traffic ต้องย้ายไป ISP2",
      "Verify: show ip bgp — Best Path เปลี่ยนไป ISP2",
    ],
    hints: [
      "Local Preference สูงชนะ — ใช้กับ Routes รับเข้ามาจาก ISP",
      "AS-PATH Prepend: set as-path prepend 65001 65001 65001 ใน Route-Map",
      "ip bgp-community new-format สำหรับ Community Display",
    ],
    expectedResult: "Primary ISP ใช้งาน Outbound+Inbound; ถ้า Primary Down Failover ไป Secondary อัตโนมัติ < 30 วิ",
    troubleshooting: [
      "BGP ไม่ Establish: ตรวจ AS Number ถูกต้อง, neighbor IP Reachable",
      "Route ไม่ถูก Advertise: ตรวจ network statement หรือ redistribute",
      "Policy ไม่ทำงาน: ตรวจ route-map apply บน neighbor ถูกทิศทาง",
    ],
    solution: `! CE-Router BGP Configuration
router bgp 65001
 bgp router-id 1.1.1.1
 neighbor 203.0.113.1 remote-as 100
 neighbor 203.0.113.1 route-map SET_LOCPREF_HIGH in
 neighbor 198.51.100.1 remote-as 200
 neighbor 198.51.100.1 route-map PREPEND_OUT out
 network 192.0.2.0 mask 255.255.255.0

route-map SET_LOCPREF_HIGH permit 10
 set local-preference 200

route-map PREPEND_OUT permit 10
 set as-path prepend 65001 65001 65001`,
    roadmapLevel: 4,
  },

  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 4: Full Network Deploy (Capstone)
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-full-deploy",
    title:       "Capstone: Full Enterprise Network Deploy",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "120 min",
    status:      "available",
    description: "Deploy Enterprise Network ทั้งระบบ: VLAN + STP + OSPF + BGP + NAT + ACL + DHCP ใน Lab เดียว",
    scenario:    "สร้าง Network ให้ SME 200 พนักงาน มี 3 Department VLAN, ISP Connection, DHCP, ACL Security และ Internet Access",
    objective:   "ทดสอบความสามารถรวมทุก Foundation Skills ในการ Deploy Network จริง",
    devices: ["Core-SW", "Access-SW", "Edge-Router", "ISP-Router", "PC x4", "Server"],
    topology: [
      { from: "Edge-Router", to: "ISP-Router",  port: "WAN Gi0/0" },
      { from: "Edge-Router", to: "Core-SW",     port: "Trunk Gi0/1" },
      { from: "Core-SW",     to: "Access-SW",   port: "Trunk" },
      { from: "Access-SW",   to: "PCs",         port: "Access VLAN 10/20/30" },
    ],
    ipTable: [
      { device: "Edge-Router WAN", interface: "Gi0/0",  ip: "203.0.113.2",  subnet: "255.255.255.252", gateway: "203.0.113.1" },
      { device: "Core-SW SVI 10",  interface: "VLAN10",  ip: "10.10.10.1",   subnet: "255.255.255.0",   gateway: "-" },
      { device: "Core-SW SVI 20",  interface: "VLAN20",  ip: "10.20.20.1",   subnet: "255.255.255.0",   gateway: "-" },
      { device: "Core-SW SVI 30",  interface: "VLAN30",  ip: "10.30.30.1",   subnet: "255.255.255.0",   gateway: "-" },
    ],
    tasks: [
      "Phase 1 — Layer 2: สร้าง VLANs 10/20/30, Trunk, STP Root",
      "Phase 2 — Layer 3: SVI + Inter-VLAN Routing, DHCP Pools",
      "Phase 3 — WAN: eBGP หรือ Static Default Route ไป ISP",
      "Phase 4 — NAT: PAT บน Edge Router สำหรับ Internet Access",
      "Phase 5 — Security: ACL บล็อก VLAN 10 ไม่ให้เข้า VLAN 20",
      "Phase 6 — Verify: ทุก PC Ping Internet (8.8.8.8), ตรวจ ACL, ตรวจ DHCP",
      "Bonus: Deploy Config ด้วย Ansible Playbook",
    ],
    hints: [
      "ทำทีละ Phase อย่ากระโดด",
      "Verify ทุก Phase ก่อนไป Phase ถัดไป",
      "ip routing ต้อง Enable บน Layer 3 Switch",
    ],
    expectedResult: "ทุก PC ได้ IP จาก DHCP, Ping Internet ได้, ACL ทำงาน, STP Root ถูก Switch",
    troubleshooting: [
      "Internet ไม่ได้: ตรวจ NAT, Default Route, ISP Reachability",
      "DHCP ไม่แจก: ตรวจ ip helper-address บน SVI",
      "Inter-VLAN ไม่ Route: ตรวจ ip routing + SVI up",
    ],
    solution: `! ── Edge Router ──
interface gi0/0
 ip address 203.0.113.2 255.255.255.252
 ip nat outside
 no shutdown

interface gi0/1
 no ip address
 no shutdown

ip route 0.0.0.0 0.0.0.0 203.0.113.1

ip nat inside source list NAT_ACL interface gi0/0 overload
ip access-list standard NAT_ACL
 permit 10.0.0.0 0.255.255.255

! ── Core-SW (Layer 3) ──
ip routing
vlan 10
vlan 20
vlan 30

interface vlan 10
 ip address 10.10.10.1 255.255.255.0
 ip helper-address 10.10.10.1
 no shutdown

ip dhcp pool VLAN10
 network 10.10.10.0 255.255.255.0
 default-router 10.10.10.1
 dns-server 8.8.8.8`,
    roadmapLevel: 5,
  },

  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 5: IPv6 + DHCPv6
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-ipv6-dhcpv6",
    title:       "IPv6 Dual-Stack + DHCPv6",
    category:    "Cross-Track",
    level:       "Intermediate",
    duration:    "60 min",
    status:      "available",
    description: "Deploy Dual-Stack Network ทั้ง IPv4 และ IPv6 พร้อมกัน — SLAAC สำหรับ Client + Stateful DHCPv6 สำหรับ Servers",
    scenario:    "บริษัทเตรียม IPv6 Migration — ต้องให้ทั้ง IPv4 และ IPv6 ทำงานพร้อมกัน Client ใช้ SLAAC, Server ใช้ DHCPv6 Stateful",
    objective:   "Config Dual-Stack บน Router + Switch + ทดสอบ Connectivity ทั้งสอง Protocol Stack",
    devices: ["R1", "SW1", "PC1", "PC2", "Server1"],
    topology: [
      { from: "R1",  to: "SW1",     port: "Gi0/0 — LAN Segment" },
      { from: "SW1", to: "PC1",     port: "Access Port" },
      { from: "SW1", to: "PC2",     port: "Access Port" },
      { from: "SW1", to: "Server1", port: "Access Port" },
    ],
    ipTable: [
      { device: "R1",     interface: "Gi0/0", ip: "192.168.1.1 / 2001:db8:1::1", subnet: "/24 + /64", gateway: "-" },
      { device: "PC1",    interface: "NIC",   ip: "DHCP / SLAAC",                subnet: "/24 + /64", gateway: "R1" },
      { device: "Server1",interface: "NIC",   ip: "192.168.1.10 / DHCPv6-Static", subnet: "/24 + /64", gateway: "R1" },
    ],
    tasks: [
      "Enable ipv6 unicast-routing บน R1",
      "Assign IPv4 + IPv6 Address บน R1 Gi0/0",
      "Config IPv4 DHCP Pool บน R1",
      "Config DHCPv6 Stateful Pool สำหรับ Server1",
      "Config DHCPv6 Stateless + SLAAC สำหรับ PC1/PC2",
      "ทดสอบ: PC1 ping PC2 ด้วย IPv4 และ IPv6",
      "ทดสอบ: PC1 ping R1 Link-local (FE80::1)",
      "show ipv6 neighbors — ดู NDP Cache",
    ],
    hints: [
      "ipv6 nd other-config-flag สำหรับ Stateless DHCPv6",
      "ipv6 nd managed-config-flag สำหรับ Stateful DHCPv6",
      "Link-local Address สร้างอัตโนมัติเมื่อ IPv6 enable บน Interface",
    ],
    expectedResult: "PC Dual-Stack ได้ทั้ง IPv4 และ IPv6 Address, ping ผ่านทั้งสองโปรโตคอล",
    troubleshooting: [
      "SLAAC ไม่ได้ IPv6: ตรวจ ipv6 unicast-routing + RA ไม่ถูก suppress",
      "DHCPv6 ไม่แจก: ตรวจ ipv6 dhcp pool + interface กำหนด pool",
      "ping6 ไม่ผ่าน: ตรวจ Firewall ไม่บล็อก ICMPv6",
    ],
    solution: `! R1 Dual-Stack Configuration
ipv6 unicast-routing

interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 ipv6 address 2001:db8:1::1/64
 ipv6 address FE80::1 link-local
 ipv6 nd managed-config-flag
 ipv6 dhcp server DHCPv6_POOL
 no shutdown

ipv6 dhcp pool DHCPv6_POOL
 address prefix 2001:db8:1::/64
 dns-server 2001:4860:4860::8888
 domain-name lab.local

! IPv4 DHCP
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8`,
    roadmapLevel: 3,
  },

  /* ══════════════════════════════════════════════════════════
   * CROSS-TRACK LAB 6: QoS + Network Monitoring
   * ══════════════════════════════════════════════════════════ */
  {
    id:          "cross-qos-monitoring",
    title:       "QoS + SNMP/Syslog Monitoring",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "75 min",
    status:      "available",
    description: "Config QoS สำหรับ Voice Priority แล้ว Monitor ด้วย SNMP + Syslog — เห็น QoS Drops และ Interface Stats แบบ Real-time",
    scenario:    "NOC ต้องการเห็น QoS Statistics แบบ Real-time: Voice Drops, Interface Utilization และ Alerts ผ่าน Syslog เมื่อ Queue Drop",
    objective:   "Config LLQ QoS + ส่ง SNMP Traps และ Syslog ไปยัง Monitoring Server",
    devices: ["WAN-Router", "LAN-Switch", "Monitoring-Server", "IP-Phone", "PC"],
    topology: [
      { from: "WAN-Router",      to: "ISP",               port: "WAN Gi0/0" },
      { from: "WAN-Router",      to: "LAN-Switch",        port: "LAN Gi0/1" },
      { from: "LAN-Switch",      to: "IP-Phone",          port: "Voice VLAN 50" },
      { from: "LAN-Switch",      to: "PC",                port: "Data VLAN 10" },
      { from: "LAN-Switch",      to: "Monitoring-Server", port: "Mgmt VLAN 99" },
    ],
    ipTable: [
      { device: "WAN-Router", interface: "Gi0/0", ip: "203.0.113.2",  subnet: "255.255.255.252", gateway: "-" },
      { device: "WAN-Router", interface: "Gi0/1", ip: "10.10.0.1",    subnet: "255.255.255.0",   gateway: "-" },
      { device: "Mon-Server", interface: "NIC",   ip: "10.99.99.10",  subnet: "255.255.255.0",   gateway: "10.99.99.1" },
    ],
    tasks: [
      "Phase 1 — QoS: สร้าง Class-Map สำหรับ Voice (DSCP EF) + Data",
      "สร้าง Policy-Map: Voice LLQ 2Mbps + Data CBWFQ 8Mbps",
      "Apply Service-Policy บน WAN Interface (Outbound)",
      "Phase 2 — SNMP: Config SNMP v2c + Community string",
      "กำหนด snmp-server host 10.99.99.10 traps",
      "Enable SNMP Traps: interface, QoS drops",
      "Phase 3 — Syslog: logging host 10.99.99.10",
      "logging trap informational",
      "Verify: show policy-map interface, show snmp, show logging",
    ],
    hints: [
      "class-map match-any VOICE; match dscp ef",
      "snmp-server community PUBLIC ro สำหรับ Read-only",
      "logging buffered 16384 สำหรับ Local Buffer",
    ],
    expectedResult: "QoS Policy Active บน WAN Interface, SNMP Traps ส่งไป Monitoring Server, Syslog Stream เข้า Server",
    troubleshooting: [
      "QoS ไม่ทำงาน: ตรวจ service-policy apply ถูก direction",
      "SNMP ไม่ตอบ: ตรวจ Community String + ACL ที่อาจบล็อก UDP 161",
      "Syslog ไม่มา: ตรวจ logging host IP ถูก + UDP 514 ไม่ถูกบล็อก",
    ],
    solution: `! QoS Configuration
class-map match-any VOICE
 match dscp ef
class-map match-any VIDEO
 match dscp af41

policy-map WAN_QOS
 class VOICE
  priority 2000
 class VIDEO
  bandwidth 4000
 class class-default
  fair-queue

interface gi0/0
 service-policy output WAN_QOS

! SNMP
snmp-server community PUBLIC ro
snmp-server host 10.99.99.10 traps PUBLIC
snmp-server enable traps interface
snmp-server enable traps config

! Syslog
logging host 10.99.99.10
logging trap informational
logging buffered 16384`,
    roadmapLevel: 4,
  },
  {
    id:          "cross-wireless-security",
    title:       "Wireless Security + 802.1X + RADIUS",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "75 min",
    status:      "available",
    description: "WPA3 Enterprise + 802.1X EAP-TLS + FreeRADIUS + VLAN assignment — Wireless Security ระดับ Enterprise",
    scenario:    "บริษัท upgrade จาก WPA2-PSK เป็น WPA3 Enterprise พร้อม 802.1X สำหรับ 300 users — staff VLAN 10, contractors VLAN 20, guests VLAN 99",
    objective:   "Deploy WPA3 Enterprise 802.1X ด้วย RADIUS VLAN assignment + test roaming security",
    devices: ["WLC-1", "AP-01", "RADIUS-Server", "SW-1", "PC-Staff", "PC-Guest"],
    topology: [
      { from: "AP-01", to: "WLC-1", port: "CAPWAP UDP 5246/5247" },
      { from: "WLC-1", to: "SW-1", port: "Trunk VLAN 10/20/99" },
      { from: "SW-1", to: "RADIUS-Server", port: "UDP 1812/1813" },
    ],
    ipTable: [
      { device: "WLC-1",       interface: "Management",   ip: "10.0.0.1",   subnet: "255.255.255.0", gateway: "10.0.0.254" },
      { device: "RADIUS-SRV",  interface: "eth0",         ip: "10.0.0.20",  subnet: "255.255.255.0", gateway: "10.0.0.254" },
      { device: "Staff VLAN",  interface: "VLAN 10",      ip: "10.10.10.0", subnet: "255.255.255.0", gateway: "10.10.10.1" },
      { device: "Guest VLAN",  interface: "VLAN 99",      ip: "10.99.99.0", subnet: "255.255.255.0", gateway: "10.99.99.1" },
    ],
    tasks: [
      "Configure FreeRADIUS: clients.conf เพิ่ม WLC-1 (secret=RadiusSecret123); users file: staff01 → Tunnel-Private-Group-Id=10, contractor01 → VLAN 20",
      "WLC GUI: WLANs → Create 'CorpNet' → Security: WPA3 Enterprise → 802.1X → RADIUS 10.0.0.20:1812",
      "WLC: Controller → Interfaces → สร้าง staff-vlan10 (VLAN 10), contractor-vlan20 (VLAN 20), guest-vlan99 (VLAN 99)",
      "Enable 'Allow AAA Override' บน WLAN CorpNet — จำเป็นสำหรับ dynamic VLAN assignment",
      "ทดสอบ: connect PC-Staff ด้วย staff01 credentials → ตรวจว่าได้ IP จาก 10.10.10.0/24",
      "ตรวจสอบ: show client detail <mac> บน WLC — ดู SSID, VLAN, Authentication ถูกต้อง",
    ],
    hints: [
      "Allow AAA Override ต้อง enable — ถ้าไม่เปิด VLAN assignment จาก RADIUS จะไม่ทำงาน",
      "RADIUS secret ต้องตรงกันทั้ง WLC และ FreeRADIUS clients.conf",
      "debug aaa all บน WLC + tail -f /var/log/freeradius/radius.log สำหรับ troubleshoot",
    ],
    expectedResult: "Client staff01 ได้ IP จาก VLAN 10 (10.10.10.x); contractor01 ได้ VLAN 20 — verified ด้วย show client detail",
    troubleshooting: [
      "Authentication rejected: ตรวจ RADIUS secret ทั้ง 2 ฝั่ง, ตรวจ certificate validity, ดู /var/log/freeradius/radius.log",
      "VLAN assignment ไม่ทำงาน: เปิด Allow AAA Override บน WLC WLAN settings, ตรวจ Tunnel attributes ใน RADIUS user",
      "AP ไม่ join WLC: ตรวจ CAPWAP reachability (UDP 5246), ตรวจ AP mode = LWAPP, ตรวจ WLC IP config",
    ],
    solution: `! FreeRADIUS /etc/freeradius/3.0/users
staff01 Cleartext-Password := "Pass@123"
        Tunnel-Type = VLAN,
        Tunnel-Medium-Type = IEEE-802,
        Tunnel-Private-Group-Id = 10
! WLC verify
show wlan summary
show client detail <mac>`,
    roadmapLevel: 4,
  },

  {
    id:          "cross-mpls-l3vpn",
    title:       "MPLS L3VPN — PE-CE Routing + VRF",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "90 min",
    status:      "available",
    description: "MPLS L3VPN ด้วย BGP VPNv4, VRF, RD/RT — simulate service provider ที่แยก customer traffic",
    scenario:    "ISP ให้บริการ L3VPN สำหรับ 2 customers ผ่าน MPLS backbone — แต่ละ customer ต้องการ private routing ไม่ปนกัน",
    objective:   "Configure MPLS LDP + BGP VPNv4 ระหว่าง PE routers + VRF แยก CustomerA/B",
    devices: ["PE1", "P1", "PE2", "CE-A1", "CE-A2", "CE-B1"],
    topology: [
      { from: "CE-A1", to: "PE1", port: "eBGP 65001" },
      { from: "PE1", to: "P1", port: "MPLS LDP" },
      { from: "P1", to: "PE2", port: "MPLS LDP" },
      { from: "PE2", to: "CE-A2", port: "eBGP 65001" },
    ],
    ipTable: [
      { device: "PE1 Lo0", interface: "Loopback0", ip: "1.1.1.1", subnet: "255.255.255.255", gateway: "-" },
      { device: "P1 Lo0",  interface: "Loopback0", ip: "2.2.2.2", subnet: "255.255.255.255", gateway: "-" },
      { device: "PE2 Lo0", interface: "Loopback0", ip: "3.3.3.3", subnet: "255.255.255.255", gateway: "-" },
      { device: "PE1-P1",  interface: "Gi0/1",     ip: "10.12.0.1", subnet: "255.255.255.252", gateway: "-" },
      { device: "CE-A1",   interface: "Gi0/0",     ip: "172.16.1.1", subnet: "255.255.255.252", gateway: "172.16.1.2" },
    ],
    tasks: [
      "Enable OSPF + MPLS LDP บน PE1, P1, PE2: router ospf 1 + mpls ldp autoconfig — verify: show mpls ldp neighbor",
      "สร้าง VRF CustomerA บน PE1 + PE2: ip vrf CustomerA, rd 100:1, route-target export/import 100:1",
      "Assign VRF ให้ PE-CE interface: interface Gi0/0 → ip vrf forwarding CustomerA → ip address",
      "Configure BGP VPNv4 iBGP ระหว่าง PE1-PE2: neighbor 3.3.3.3 + address-family vpnv4 + send-community extended",
      "Configure eBGP PE-CE: address-family ipv4 vrf CustomerA → neighbor CE remote-as 65001",
      "Verify: show bgp vpnv4 unicast all | show ip route vrf CustomerA | ping vrf CustomerA CE-A2",
    ],
    hints: [
      "LDP session ต้องขึ้นก่อน — show mpls ldp neighbor ต้องเห็น Operational",
      "RD ไม่จำเป็นต้องเหมือนกันระหว่าง PE; RT import/export ต้องตรงกันใน VPN เดียวกัน",
      "ip cef ต้อง enable (default บน IOS) — MPLS ต้องการ CEF",
    ],
    expectedResult: "CustomerA Site1 ping Site2 ผ่าน MPLS สำเร็จ; CustomerB ไม่เห็น routes ของ CustomerA (VRF isolation)",
    troubleshooting: [
      "MPLS labels ไม่ assign: ตรวจ ip cef enable, LDP neighbor up (show mpls ldp neighbor), MPLS enable บน interface",
      "VPNv4 routes ไม่ถ่ายทอด: ตรวจ send-community extended บน iBGP neighbors, ตรวจ RT import/export ตรงกัน",
      "ping vrf ล้มเหลว: ตรวจ route ใน VRF (show ip route vrf CustomerA), ตรวจ CE-PE eBGP session up",
    ],
    solution: `show mpls ldp neighbor
show mpls forwarding-table
show bgp vpnv4 unicast all
show ip route vrf CustomerA
ping vrf CustomerA 172.16.2.1 source 172.16.1.1`,
    roadmapLevel: 5,
  },

  {
    id:          "cross-ha-redundancy",
    title:       "High Availability — HSRP + BFD + NSF",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "80 min",
    status:      "available",
    description: "HSRP Active/Standby + BFD fast detection + NSF/GR — sub-second failover สำหรับ Data Center gateway",
    scenario:    "Data center ต้องการ failover < 1 วินาทีเมื่อ primary gateway ล้มเหลว — users ไม่รู้ตัว",
    objective:   "Deploy HSRP + BFD + track object + OSPF NSF เพื่อ achieve sub-second failover",
    devices: ["GW1-Primary", "GW2-Standby", "CORE-SW", "SERVER-01", "SERVER-02"],
    topology: [
      { from: "SERVER-01", to: "CORE-SW", port: "Gi0/1" },
      { from: "CORE-SW", to: "GW1-Primary", port: "Gi0/0 — HSRP Active" },
      { from: "CORE-SW", to: "GW2-Standby", port: "Gi0/0 — HSRP Standby" },
      { from: "GW1-Primary", to: "ISP", port: "WAN Gi0/1" },
      { from: "GW2-Standby", to: "ISP", port: "WAN Gi0/1" },
    ],
    ipTable: [
      { device: "GW1 LAN",  interface: "Gi0/0", ip: "10.0.1.1", subnet: "255.255.255.0", gateway: "-" },
      { device: "GW2 LAN",  interface: "Gi0/0", ip: "10.0.1.2", subnet: "255.255.255.0", gateway: "-" },
      { device: "HSRP VIP", interface: "Virtual", ip: "10.0.1.254", subnet: "255.255.255.0", gateway: "-" },
      { device: "GW1 WAN",  interface: "Gi0/1", ip: "203.0.113.1", subnet: "255.255.255.252", gateway: "203.0.113.2" },
    ],
    tasks: [
      "GW1 (Active): interface Gi0/0 → standby version 2 → standby 1 ip 10.0.1.254 → priority 110 → preempt delay minimum 30 → track 1 decrement 20",
      "GW2 (Standby): interface Gi0/0 → standby version 2 → standby 1 ip 10.0.1.254 → standby 1 preempt",
      "Track object บน GW1: track 1 interface GigabitEthernet0/1 line-protocol",
      "BFD บน GW1+GW2: interface Gi0/0 → bfd interval 100 min_rx 100 multiplier 3 → ip ospf bfd",
      "OSPF NSF: router ospf 1 → nsf cisco — ทำให้ OSPF restart ไม่ flush neighbor routes",
      "Test failover: ping 8.8.8.8 repeat 10000 บน SERVER → shutdown Gi0/1 บน GW1 → นับ packet drops",
    ],
    hints: [
      "BFD 100ms × 3 = 300ms detection — เร็วกว่า OSPF dead interval 40 วินาทีมาก",
      "preempt delay minimum 30 — ให้ GW1 รอ routing converge ก่อน preempt กลับ",
      "track decrement 20 → GW1 priority 110-20=90 < GW2 100 → GW2 กลาย active",
    ],
    expectedResult: "Failover < 1 วินาที (BFD 300ms + HSRP); ping loss < 3 packets; GW1 preempt กลับหลัง WAN recover",
    troubleshooting: [
      "HSRP ไม่ failover: ตรวจ track object (show track 1) ต้องเป็น Down เมื่อ interface shutdown",
      "BFD session ไม่ขึ้น: ตรวจ ip ospf bfd บน interface, bfd interval ทั้ง 2 ฝั่งตรงกัน",
      "HSRP ไม่ preempt กลับ: ตรวจ standby 1 preempt บน GW1, ตรวจ priority 110 > 100",
    ],
    solution: `show standby brief
show track 1
show bfd neighbors
show ip ospf neighbor
! Expected: Active→Standby ใน < 1 sec เมื่อ WAN ล้ม`,
    roadmapLevel: 4,
  },

  {
    id:          "cross-sdwan-terraform",
    title:       "SD-WAN + Terraform Infrastructure as Code",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "100 min",
    status:      "available",
    description: "Deploy Cisco SD-WAN policy บน vManage ด้วย Terraform provider + Ansible branch onboarding automation",
    scenario:    "บริษัท expand 10 branches/เดือน — automate WAN edge onboarding ด้วย IaC แทน manual CLI",
    objective:   "ใช้ Terraform cisco-sdwan provider สร้าง site policy + QoS policy + Ansible deploy edge config",
    devices: ["vManage", "vSmart", "vBond", "WAN-Edge-01", "WAN-Edge-02"],
    topology: [
      { from: "WAN-Edge-01", to: "vBond", port: "DTLS orchestration" },
      { from: "WAN-Edge-01", to: "vSmart", port: "OMP policy" },
      { from: "WAN-Edge-01", to: "vManage", port: "HTTPS mgmt" },
      { from: "vManage", to: "Terraform", port: "REST API" },
    ],
    ipTable: [
      { device: "vManage",   interface: "eth0",   ip: "198.18.0.1",  subnet: "255.255.255.0", gateway: "198.18.0.254" },
      { device: "vSmart",    interface: "eth0",   ip: "198.18.0.2",  subnet: "255.255.255.0", gateway: "198.18.0.254" },
      { device: "vBond",     interface: "eth0",   ip: "198.18.0.3",  subnet: "255.255.255.0", gateway: "198.18.0.254" },
      { device: "WAN-Edge LAN", interface: "Gi0/1", ip: "10.100.1.1", subnet: "255.255.255.0", gateway: "-" },
    ],
    tasks: [
      "Terraform provider setup: main.tf → provider sdwan { url=https://198.18.0.1, username, password } → terraform init",
      "สร้าง VPN Feature Template: resource sdwan_cisco_vpn_feature_template branch_vpn → device_types=[vedge-ISR-1100]",
      "สร้าง AAR Policy ด้วย Terraform: sdwan_application_aware_routing_policy → critical apps via MPLS preferred",
      "Ansible playbook onboard_branch.yml: ดึง XSRF token → POST /dataservice/template/device/config/attachfeature",
      "terraform plan && terraform apply → ตรวจสอบ policy ถูก push ไป WAN Edge",
      "Verify: show sdwan bfd sessions | show sdwan app-route stats | show sdwan policy from-vsmart",
    ],
    hints: [
      "Terraform state สำคัญมาก — ใช้ remote backend (S3) ไม่ใช่ local state",
      "vManage API ต้องการ XSRF token — ดึงจาก /dataservice/client/token หลัง login",
      "SD-WAN template hierarchy: Device Template = Feature Templates รวมกัน",
    ],
    expectedResult: "WAN Edge ขึ้น BFD sessions กับ vSmart, policy apply, critical apps route ผ่าน MPLS",
    troubleshooting: [
      "Terraform auth ล้มเหลว: ตรวจ vManage URL/certificate (insecure=true), ตรวจ username/password",
      "WAN Edge ไม่ขึ้น control connection: ตรวจ vBond reachability, ตรวจ serial number authorized ใน vManage",
      "Policy ไม่ apply: ตรวจ template attach status ใน vManage GUI → Configuration → Devices",
    ],
    solution: `terraform show
show sdwan bfd sessions
show sdwan control connections
show sdwan policy from-vsmart`,
    roadmapLevel: 5,
  },

  {
    id:          "cross-ipv6-ospfv3",
    title:       "OSPFv3 for IPv6 + Dual-Stack + DHCPv6",
    category:    "Cross-Track",
    level:       "Intermediate",
    duration:    "70 min",
    status:      "available",
    description: "OSPFv3 IPv6 multi-area routing + dual-stack + DHCPv6 stateful — migrate enterprise network สู่ IPv6",
    scenario:    "องค์กรต้องการ dual-stack: OSPFv2 สำหรับ IPv4 และ OSPFv3 สำหรับ IPv6 บน infrastructure เดิม + DHCPv6 clients",
    objective:   "Configure OSPFv3 IPv6 multi-area, redistribute ข้าม areas, deploy DHCPv6 stateful",
    devices: ["R1-Area0", "R2-ABR", "R3-Area1", "DHCPv6-SRV", "PC-Client"],
    topology: [
      { from: "R1-Area0", to: "R2-ABR", port: "OSPFv3 Area 0 — 2001:db8:12::/64" },
      { from: "R2-ABR", to: "R3-Area1", port: "OSPFv3 Area 1 — 2001:db8:23::/64" },
      { from: "R3-Area1", to: "PC-Client", port: "LAN 2001:db8:3::/64" },
    ],
    ipTable: [
      { device: "R1 Lo0",    interface: "Loopback0", ip: "2001:db8:1::1", subnet: "/128", gateway: "-" },
      { device: "R1-R2 Link", interface: "Gi0/0",   ip: "2001:db8:12::1", subnet: "/64", gateway: "-" },
      { device: "R2 Lo0",    interface: "Loopback0", ip: "2001:db8:2::1", subnet: "/128", gateway: "-" },
      { device: "R3 LAN",    interface: "Gi0/1",    ip: "2001:db8:3::1", subnet: "/64", gateway: "-" },
    ],
    tasks: [
      "Enable IPv6: ipv6 unicast-routing + ipv6 cef บนทุก router",
      "Configure OSPFv3: router ospfv3 1 → router-id 1.1.1.1 บน R1; interface Gi0/0 → ipv6 ospf 1 area 0",
      "R2 ABR: interface Gi0/0 → area 0; interface Gi0/1 → area 1 — verify: show ospfv3 neighbor",
      "DHCPv6 Pool บน R1: ipv6 dhcp pool CLIENTS → address prefix 2001:db8:3::/64 → dns-server 2001:db8::53",
      "Enable DHCPv6 บน R1 interface: ipv6 dhcp server CLIENTS → ipv6 nd managed-config-flag",
      "Verify: show ospfv3 neighbor | show ipv6 route ospf | show ipv6 dhcp binding | ping 2001:db8:2::1 source lo0",
    ],
    hints: [
      "OSPFv3 ต้องการ ipv6 unicast-routing ก่อน — ถ้าลืม neighbor จะไม่ขึ้น",
      "Router-ID ใน OSPFv3 เป็น 32-bit dotted decimal เหมือน OSPFv2 — ไม่ใช่ IPv6 address",
      "DHCPv6 M-bit = stateful (address); O-bit = stateless (DNS only); ใช้ managed-config-flag สำหรับ M-bit",
    ],
    expectedResult: "OSPFv3 neighbor ขึ้นทุก router, routes ถ่ายทอดข้าม areas, PC-Client ได้ IPv6 จาก DHCPv6 pool",
    troubleshooting: [
      "OSPFv3 neighbor ไม่ขึ้น: ตรวจ ipv6 unicast-routing enable, ipv6 ospf บน interface, area number ตรงกัน",
      "DHCPv6 client ไม่ได้ address: ตรวจ M-bit set (ipv6 nd managed-config-flag), ตรวจ DHCPv6 pool, debug ipv6 dhcp detail",
      "Routes ไม่ถ่ายทอดข้าม area: ตรวจ R2 เป็น ABR จริง (show ospfv3 border-routers), ตรวจ area ID ถูกต้อง",
    ],
    solution: `show ospfv3 1 neighbor
show ipv6 route ospf
show ipv6 dhcp binding
ping 2001:db8:3::1 source loopback0`,
    roadmapLevel: 3,
  },

  {
    id:          "cross-security-hardening",
    title:       "Security Hardening — AAA + CoPP + 802.1X",
    category:    "Cross-Track",
    level:       "Advanced",
    duration:    "85 min",
    status:      "available",
    description: "Enterprise security hardening: TACACS+ AAA, Control Plane Policing, 802.1X port authentication, SSH hardening",
    scenario:    "Security audit พบ: local auth บน devices, ไม่มี CoPP, switches เปิด open access — ต้องแก้ทั้งหมด",
    objective:   "Deploy TACACS+ AAA + CoPP + 802.1X + SSH hardening — enterprise security baseline ครบ",
    devices: ["TACACS-ISE", "CORE-SW", "ROUTER-1", "ACCESS-SW", "PC-IT", "PC-User"],
    topology: [
      { from: "ACCESS-SW", to: "CORE-SW", port: "Trunk 802.1Q" },
      { from: "CORE-SW", to: "ROUTER-1", port: "Gi0/0 uplink" },
      { from: "ROUTER-1", to: "TACACS-ISE", port: "UDP 49 TACACS+" },
      { from: "PC-IT", to: "ACCESS-SW", port: "802.1X port" },
    ],
    ipTable: [
      { device: "TACACS-ISE", interface: "eth0",   ip: "10.0.0.5",  subnet: "255.255.255.0", gateway: "10.0.0.254" },
      { device: "ROUTER-1",   interface: "Gi0/0",  ip: "10.0.0.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "CORE-SW",    interface: "VLAN1",  ip: "10.0.0.2",  subnet: "255.255.255.0", gateway: "10.0.0.254" },
      { device: "ACCESS-SW",  interface: "VLAN1",  ip: "10.0.0.3",  subnet: "255.255.255.0", gateway: "10.0.0.254" },
    ],
    tasks: [
      "TACACS+ AAA บน ROUTER + CORE-SW: aaa new-model → tacacs server ISE-TACACS (ip 10.0.0.5, key TacacsSecret123) → aaa authentication login default group tacacs+ local → aaa authorization commands 15 default group tacacs+ local",
      "SSH Hardening: crypto key generate rsa modulus 4096 → ip ssh version 2 → line vty 0 15 transport input ssh → exec-timeout 10 0 → access-class MGMT-ACL in → banner login",
      "CoPP Policy: class-map CRITICAL-CP (ospf, bgp) + MANAGEMENT-CP (ssh, snmp) + ICMP-CP → policy-map CoPP-POLICY ด้วย police rate ต่างๆ → control-plane service-policy input CoPP-POLICY",
      "802.1X บน ACCESS-SW: aaa authentication dot1x default group radius → dot1x system-auth-control → interface range Gi0/1-24 → authentication port-control auto → dot1x pae authenticator",
      "ทดสอบ TACACS+: test aaa group tacacs+ admin Pass@123 new-code → ต้องได้ PASS",
      "Verify CoPP: show policy-map control-plane → ตรวจ drops ในแต่ละ class",
    ],
    hints: [
      "local fallback (aaa ... group tacacs+ local) สำคัญมาก — ถ้า TACACS ล้มแล้วไม่มี fallback จะ lock ตัวเองออก",
      "CoPP class-default ควร police อย่างเข้มงวด — ป้องกัน unknown traffic flood CPU",
      "802.1X ต้องการ Supplicant บน client (Windows: Wired AutoConfig service)",
    ],
    expectedResult: "SSH login ผ่าน TACACS+ สำเร็จ + audit log บน ISE; CoPP active protect CPU; 802.1X blocks unauthorized ports",
    troubleshooting: [
      "TACACS+ authentication fail — locked out: Console เข้า device ใช้ local account, ตรวจ TACACS reachability, test aaa group tacacs+ USER PASS new-code",
      "CoPP drops legitimate traffic: show policy-map control-plane ดู drops, เพิ่ม rate ใน class ที่ถูก drop มากเกิน",
      "802.1X client ไม่ผ่าน: show authentication sessions interface Gi0/1, debug dot1x all, test aaa group radius USER PASS new-code",
    ],
    solution: `show aaa servers
show policy-map control-plane
show authentication sessions
test aaa group tacacs+ admin Pass@123 new-code`,
    roadmapLevel: 4,
  },

  /* ══════════════════════════════════════════════════════════
   * NEW LABS — AI, Cloud, Security, Automation, Hardware
   * ══════════════════════════════════════════════════════════ */

  /* ── 1. GPU Cluster RDMA/RoCE Lab ──────────────────────────── */
  {
    id:          "gpu-rdma-roce-lab",
    title:       "GPU Cluster RDMA/RoCE v2 Configuration Lab",
    category:    "AI Infrastructure",
    level:       "Advanced",
    duration:    "90 min",
    status:      "available",
    description: "ตั้งค่า RoCE v2 บน Data Center Switch สำหรับ GPU Cluster — เปิด PFC, ECN, Jumbo Frame เพื่อให้ได้ Lossless Network",
    scenario:    "ทีม AI Infrastructure ต้องการ deploy GPU Training Cluster 8 โหนด ใช้ A100 GPU + ConnectX-7 NIC บน Spine-Leaf Fabric 400G โดยต้องการ Lossless RDMA สำหรับ AllReduce operation",
    objective:   "Config PFC priority 3, ECN marking, Jumbo Frame 9216 และ verify RDMA traffic ผ่าน RoCE v2 ได้โดยไม่มี packet loss",
    devices:     ["Spine1 (Arista 7800)", "Leaf1 (Arista 7050CX3)", "Leaf2 (Arista 7050CX3)", "GPU-Node1", "GPU-Node2"],
    topology: {
      devices: [
        { name: "Spine1",    type: "switch", ip: "10.0.0.1" },
        { name: "Leaf1",     type: "switch", ip: "10.0.1.1" },
        { name: "Leaf2",     type: "switch", ip: "10.0.2.1" },
        { name: "GPU-Node1", type: "server", ip: "192.168.10.101" },
        { name: "GPU-Node2", type: "server", ip: "192.168.10.102" },
      ],
      links: [
        { from: "Spine1", to: "Leaf1",     port: "Et1/1 <-> Et49 (400G)" },
        { from: "Spine1", to: "Leaf2",     port: "Et1/2 <-> Et49 (400G)" },
        { from: "Leaf1",  to: "GPU-Node1", port: "Et1 <-> eth0 (100G)" },
        { from: "Leaf2",  to: "GPU-Node2", port: "Et1 <-> eth0 (100G)" },
      ],
    },
    ipTable: [
      { device: "Leaf1",     interface: "Et49",   ip: "10.0.1.2",       subnet: "255.255.255.252", gateway: "-" },
      { device: "Leaf1",     interface: "Vlan10",  ip: "192.168.10.1",   subnet: "255.255.255.0",   gateway: "-" },
      { device: "Leaf2",     interface: "Et49",   ip: "10.0.2.2",       subnet: "255.255.255.252", gateway: "-" },
      { device: "Leaf2",     interface: "Vlan10",  ip: "192.168.10.129", subnet: "255.255.255.0",   gateway: "-" },
      { device: "GPU-Node1", interface: "eth0",   ip: "192.168.10.101", subnet: "255.255.255.0",   gateway: "192.168.10.1" },
      { device: "GPU-Node2", interface: "eth0",   ip: "192.168.10.102", subnet: "255.255.255.0",   gateway: "192.168.10.129" },
    ],
    tasks: [
      "Enable Jumbo Frame MTU 9216 บนทุก interface ที่เชื่อม GPU: mtu 9216 ใต้ interface",
      "Config QoS map CoS 3 to DSCP 26 (AF31) สำหรับ RDMA traffic",
      "เปิด PFC Priority 3 บน Leaf switch: priority-flow-control mode on ใต้ interface",
      "Config ECN marking threshold 100KB/300KB บน queue 3",
      "ตั้ง Bandwidth guarantee queue 3 → 50% minimum ใน scheduler",
      "Enable RDMA/RoCE บน GPU-Node: rdma link add rxe0 type rxe; rdma dev set rxe0 netdev eth0",
      "ทดสอบ: ib_send_bw -d rxe0 (GPU-Node2 เป็น server, GPU-Node1 เป็น client)",
      "Verify ไม่มี PFC pause storm: show interfaces ethernet1 counters pfc",
    ],
    hints: [
      "PFC ต้องเปิดทั้ง switch side และ NIC side ถ้าเปิดแค่ข้างเดียวจะเกิด HOL blocking",
      "Jumbo Frame ต้อง match ทุก hop — ถ้า MTU mismatch จะได้ fragmentation ทำให้ RDMA latency สูง",
      "ECN threshold ตั้งต่ำเกินไปทำให้ mark มากเกิน GPU ลด rate แรง throughput ต่ำ",
      "ib_send_bw output ดู BW ได้ ถ้าได้ >90% line-rate ถือว่า config ถูกต้อง",
    ],
    expectedResult: "ib_send_bw แสดง bandwidth >= 90 Gb/s; show interfaces counters pfc ไม่มี storm; ping jumbo 9000 bytes ระหว่าง GPU nodes ได้",
    troubleshooting: [
      "PFC storm Leaf switch CPU spike: ตรวจ show interfaces Et1 counters pfc pause, ถ้า pause frame สูงมาก ให้ตรวจ NIC driver PFC config ของ server",
      "ib_send_bw ได้ bandwidth ต่ำมาก (<10 Gb/s): ตรวจ rdma link show ว่า state Active, ตรวจ MTU mismatch ด้วย ping -s 8972 -M do",
      "Jumbo ping fail: ip link set eth0 mtu 9000 บน server, ตรวจ switch interface mtu ต้องเป็น 9216",
    ],
    solution: `! Arista Leaf config
interface Ethernet1
   mtu 9216
   priority-flow-control mode on
   priority-flow-control priority 3 no-drop
!
! Linux GPU Node
ip link set eth0 mtu 9000
rdma link add rxe0 type rxe
rdma dev set rxe0 netdev eth0
! Server (ib_send_bw)
ib_send_bw -d rxe0
! Client
ib_send_bw -d rxe0 192.168.10.102`,
    roadmapLevel: 5,
    technology:  "AI Infrastructure",
    points:      250,
  },

  /* ── 2. Kubernetes Calico CNI Lab ───────────────────────────── */
  {
    id:          "k8s-calico-cni-lab",
    title:       "Kubernetes Calico CNI and NetworkPolicy Lab",
    category:    "Cloud Native",
    level:       "Advanced",
    duration:    "75 min",
    status:      "available",
    description: "Deploy Calico CNI บน Kubernetes cluster, สร้าง NetworkPolicy ที่ allow เฉพาะ specific Pod-to-Pod traffic และ deny ทุก traffic ที่ไม่ได้ระบุ",
    scenario:    "บริษัท FinTech ต้องการ deploy microservices บน Kubernetes โดย frontend Pod ต้อง reach backend ได้แต่ database ต้อง accessible เฉพาะ backend เท่านั้น",
    objective:   "ติดตั้ง Calico, สร้าง default-deny NetworkPolicy และ allow-specific policies แล้ว verify ด้วย kubectl exec",
    devices:     ["Master Node", "Worker Node 1", "Worker Node 2"],
    topology: {
      devices: [
        { name: "master",  type: "server", ip: "10.0.0.10" },
        { name: "worker1", type: "server", ip: "10.0.0.11" },
        { name: "worker2", type: "server", ip: "10.0.0.12" },
      ],
      links: [
        { from: "master",  to: "worker1", label: "Kubernetes API" },
        { from: "master",  to: "worker2", label: "Kubernetes API" },
      ],
    },
    ipTable: [
      { device: "master",   interface: "eth0",    ip: "10.0.0.10",   subnet: "255.255.255.0", gateway: "10.0.0.1" },
      { device: "worker1",  interface: "eth0",    ip: "10.0.0.11",   subnet: "255.255.255.0", gateway: "10.0.0.1" },
      { device: "worker2",  interface: "eth0",    ip: "10.0.0.12",   subnet: "255.255.255.0", gateway: "10.0.0.1" },
      { device: "Pod CIDR", interface: "virtual", ip: "192.168.0.0", subnet: "255.255.0.0",   gateway: "-", notes: "Calico Pod network" },
    ],
    tasks: [
      "ติดตั้ง Calico CNI: kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml",
      "Verify Calico pods running: kubectl get pods -n kube-system | grep calico",
      "Deploy 3 Pods: frontend (nginx), backend (httpd), database (mysql) ด้วย label tier=frontend/backend/database",
      "สร้าง default-deny-all NetworkPolicy ใน namespace default",
      "สร้าง NetworkPolicy allow frontend to backend port 80",
      "สร้าง NetworkPolicy allow backend to database port 3306",
      "ทดสอบ: kubectl exec frontend -- curl backend:80 ต้องสำเร็จ",
      "ทดสอบ: kubectl exec frontend -- curl database:3306 ต้องถูก block (timeout)",
    ],
    hints: [
      "NetworkPolicy podSelector: {} เลือก ALL pods ใน namespace ระวัง default-deny จะ block calico health check ด้วย",
      "ingress rule ต้องระบุ from.podSelector ให้ match label ที่ Pod มีจริง",
      "ใช้ kubectl exec <pod> -- nc -zv <target> <port> แทน curl ถ้า Pod ไม่มี curl",
      "calicoctl get networkpolicy -A ดู policy ทั้งหมดที่ Calico เห็น",
    ],
    expectedResult: "frontend curl backend สำเร็จ (200 OK); frontend curl database timeout (blocked); backend curl database สำเร็จ; kubectl get networkpolicy แสดง 3 policies",
    troubleshooting: [
      "Calico pod CrashLoopBackOff: ตรวจ kubectl logs -n kube-system calico-node-xxx มักเกิดจาก CALICO_IPV4POOL_CIDR ทับกับ Node CIDR",
      "NetworkPolicy ไม่ block traffic: ตรวจว่า Calico CNI ทำงานจริง flannel ไม่รองรับ NetworkPolicy",
      "Pod ไม่ได้ IP: kubectl describe pod xxx ดู Events ถ้า CNI plugin not found ต้องติดตั้ง Calico ใหม่",
    ],
    solution: `# default-deny-all
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
---
# allow frontend to backend
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
spec:
  podSelector:
    matchLabels:
      tier: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          tier: frontend
    ports:
    - port: 80`,
    roadmapLevel: 4,
    technology:  "Cloud Native",
    points:      200,
  },

  /* ── 3. Ansible Network Automation Lab ─────────────────────── */
  {
    id:          "ansible-network-lab",
    title:       "Ansible Network Automation Multi-device Config Push",
    category:    "Network Automation",
    level:       "Intermediate",
    duration:    "60 min",
    status:      "available",
    description: "ใช้ Ansible เพื่อ push configuration ไปยัง Router และ Switch หลายตัวพร้อมกัน รวมถึง backup config อัตโนมัติ",
    scenario:    "Network team มี Router 3 ตัวและ Switch 4 ตัว ต้องการ automate การ push NTP server config ทุกตัว และ backup running-config ทุกคืน",
    objective:   "เขียน Ansible playbook สำหรับ push NTP config และ backup running-config จาก Cisco IOS devices ทั้งหมด",
    devices:     ["Ansible Control Node", "R1 (192.168.1.1)", "R2 (192.168.1.2)", "R3 (192.168.1.3)", "SW1 (192.168.1.11)", "SW2 (192.168.1.12)"],
    topology: {
      devices: [
        { name: "Ansible Node", type: "server", ip: "192.168.1.100" },
        { name: "R1",           type: "router", ip: "192.168.1.1" },
        { name: "R2",           type: "router", ip: "192.168.1.2" },
        { name: "R3",           type: "router", ip: "192.168.1.3" },
        { name: "SW1",          type: "switch", ip: "192.168.1.11" },
        { name: "SW2",          type: "switch", ip: "192.168.1.12" },
      ],
      links: [
        { from: "Ansible Node", to: "R1",  label: "SSH mgmt" },
        { from: "Ansible Node", to: "SW1", label: "SSH mgmt" },
      ],
    },
    ipTable: [
      { device: "Ansible Node", interface: "eth0",  ip: "192.168.1.100", subnet: "255.255.255.0", gateway: "192.168.1.254" },
      { device: "R1",           interface: "Gi0/0", ip: "192.168.1.1",   subnet: "255.255.255.0", gateway: "-" },
      { device: "R2",           interface: "Gi0/0", ip: "192.168.1.2",   subnet: "255.255.255.0", gateway: "-" },
      { device: "R3",           interface: "Gi0/0", ip: "192.168.1.3",   subnet: "255.255.255.0", gateway: "-" },
      { device: "SW1",          interface: "Vlan1", ip: "192.168.1.11",  subnet: "255.255.255.0", gateway: "192.168.1.254" },
      { device: "SW2",          interface: "Vlan1", ip: "192.168.1.12",  subnet: "255.255.255.0", gateway: "192.168.1.254" },
    ],
    tasks: [
      "ติดตั้ง Ansible + collection: pip install ansible; ansible-galaxy collection install cisco.ios",
      "สร้าง inventory file hosts.ini แยก group routers และ switches",
      "สร้าง ansible.cfg กำหนด host_key_checking=False และ timeout=30",
      "เขียน playbook ntp_config.yml: push NTP server 1.1.1.1 และ 8.8.8.8 ไปทุก device",
      "เขียน playbook backup.yml: ดึง show running-config แล้วบันทึกไฟล์ <hostname>_<date>.txt",
      "รัน: ansible-playbook -i hosts.ini ntp_config.yml -v",
      "Verify: SSH เข้า R1 แล้วรัน show ntp associations",
      "สร้าง cron job รัน backup.yml ทุกวัน 02:00",
    ],
    hints: [
      "cisco.ios.ios_ntp_global module ใช้ config NTP บน IOS ได้โดยไม่ต้อง ios_command",
      "ansible_network_os: ios ต้องใส่ใน group_vars/routers.yml",
      "become: yes ไม่จำเป็นสำหรับ network devices ใช้ ansible_connection: network_cli",
      "register: output แล้ว debug: var=output.stdout_lines ดู output ระหว่าง test",
    ],
    expectedResult: "show ntp associations บน R1/R2/R3 แสดง 1.1.1.1 และ 8.8.8.8; backup files สร้างใน ./backups/; playbook PLAY RECAP: ok=X changed=Y failed=0",
    troubleshooting: [
      "Connection timeout: ตรวจ SSH เข้า device ได้มือหรือไม่, ตรวจ ansible_user/ansible_password ใน vars",
      "Module not found cisco.ios: รัน ansible-galaxy collection install cisco.ios --force",
      "Permission denied: ตรวจ enable password ใน ansible_become_password",
    ],
    solution: `# hosts.ini
[routers]
R1 ansible_host=192.168.1.1
R2 ansible_host=192.168.1.2
R3 ansible_host=192.168.1.3

[routers:vars]
ansible_network_os=ios
ansible_connection=network_cli
ansible_user=admin
ansible_password=Cisco123

# ntp_config.yml
- name: Push NTP config
  hosts: routers
  gather_facts: no
  tasks:
    - name: Set NTP servers
      cisco.ios.ios_config:
        lines:
          - ntp server 1.1.1.1
          - ntp server 8.8.8.8`,
    roadmapLevel: 3,
    technology:  "Automation",
    points:      175,
  },

  /* ── 4. Python Netmiko Bulk Config Lab ──────────────────────── */
  {
    id:          "netmiko-bulk-config-lab",
    title:       "Python Netmiko Bulk VLAN Provisioning Lab",
    category:    "Network Automation",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "available",
    description: "เขียน Python script ด้วย Netmiko เพื่อสร้าง VLAN 100-110 บน Access Switch 5 ตัวพร้อมกัน และ verify ผลลัพธ์โดยอัตโนมัติ",
    scenario:    "Network Engineer ต้องเพิ่ม VLAN ใหม่ 11 VLANs สำหรับ new office floor บน switch 5 ตัว ถ้า manual จะใช้เวลา 30 นาที + error-prone",
    objective:   "เขียน Python script ใช้ Netmiko สร้าง VLAN 100-110 พร้อม name บน Switch ทุกตัว แล้ว verify ด้วย show vlan brief",
    devices:     ["Python Workstation", "SW1-SW5 (192.168.0.11-15)"],
    topology: {
      devices: [
        { name: "Workstation", type: "server", ip: "192.168.0.100" },
        { name: "SW1",         type: "switch", ip: "192.168.0.11" },
        { name: "SW2",         type: "switch", ip: "192.168.0.12" },
        { name: "SW3",         type: "switch", ip: "192.168.0.13" },
        { name: "SW4",         type: "switch", ip: "192.168.0.14" },
        { name: "SW5",         type: "switch", ip: "192.168.0.15" },
      ],
      links: [
        { from: "Workstation", to: "SW1", label: "SSH mgmt" },
        { from: "SW1", to: "SW2", label: "Trunk" },
      ],
    },
    ipTable: [
      { device: "Workstation", interface: "eth0",  ip: "192.168.0.100", subnet: "255.255.255.0", gateway: "192.168.0.1" },
      { device: "SW1",         interface: "Vlan1", ip: "192.168.0.11",  subnet: "255.255.255.0", gateway: "192.168.0.1" },
      { device: "SW5",         interface: "Vlan1", ip: "192.168.0.15",  subnet: "255.255.255.0", gateway: "192.168.0.1" },
    ],
    tasks: [
      "pip install netmiko แล้วตรวจ version: python -c 'import netmiko; print(netmiko.__version__)'",
      "เขียน devices list ของ dict ที่มี host, username, password, device_type",
      "เขียน function create_vlans(net_connect) push VLAN 100-110 ด้วย send_config_set",
      "เขียน function verify_vlans(net_connect) รัน show vlan brief แล้ว return output",
      "ใช้ ThreadPoolExecutor(max_workers=5) เพื่อ connect ทุก switch พร้อมกัน",
      "บันทึก log ผลลัพธ์แต่ละ switch ลงไฟล์ results.txt",
      "รัน script และตรวจ results.txt",
      "SSH เข้า SW1 verify ด้วย show vlan brief ด้วยมือ",
    ],
    hints: [
      "send_config_set รับ list of commands สร้าง ['vlan 100', ' name FLOOR-100', ...] ด้วย list comprehension",
      "ConnectHandler() ต้อง .disconnect() เสมอ ใช้ with ConnectHandler(...) as net: จะ auto-close",
      "ThreadPoolExecutor ต้อง catch Exception แต่ละ thread แยกกัน ไม่งั้น error 1 switch จะ crash ทั้ง script",
      "device_type ของ Cisco IOS switch = 'cisco_ios'",
    ],
    expectedResult: "results.txt มี output ทุก switch แสดง VLAN 100-110 active; show vlan brief บน SW1 มี VLAN 100-110; script รันเสร็จใน <30 วินาที",
    troubleshooting: [
      "SSH Connection refused: ตรวจว่า device เปิด ip ssh version 2 และ line vty 0 4 transport input ssh",
      "Authentication failed: ตรวจ username/password ใน dict ลอง SSH มือก่อน",
      "send_config_set timeout: เพิ่ม conn_timeout=30 ใน ConnectHandler(), device_type บาง IOS ต้องใช้ global_delay_factor=2",
    ],
    solution: `from netmiko import ConnectHandler
from concurrent.futures import ThreadPoolExecutor

DEVICES = [
    {"host": "192.168.0.11", "username": "admin",
     "password": "Cisco123", "device_type": "cisco_ios"},
]

vlans = []
for i in range(100, 111):
    vlans += [f"vlan {i}", f" name FLOOR-{i}"]

def provision(device):
    with ConnectHandler(**device) as net:
        net.send_config_set(vlans)
        return (device["host"], net.send_command("show vlan brief"))

with ThreadPoolExecutor(max_workers=5) as ex:
    results = list(ex.map(provision, DEVICES))`,
    roadmapLevel: 3,
    technology:  "Automation",
    points:      150,
  },

  /* ── 5. Zero Trust ZTNA Lab ─────────────────────────────────── */
  {
    id:          "zero-trust-ztna-lab",
    title:       "Zero Trust Network Access (ZTNA) Implementation Lab",
    category:    "Security",
    level:       "Advanced",
    duration:    "75 min",
    status:      "available",
    description: "ออกแบบและ implement Zero Trust architecture micro-segmentation, identity-based access, และ continuous verification บน Cisco ISE",
    scenario:    "บริษัทพบว่า ransomware แพร่กระจายใน flat network ได้ง่าย ต้องการย้ายไปใช้ Zero Trust โดยแบ่ง segment ตาม role และ require MFA ทุก access",
    objective:   "Config SGT (Security Group Tags) บน ISE + Catalyst switch สำหรับ micro-segmentation, implement 802.1X + MFA policy",
    devices:     ["Cisco ISE 3.2", "Catalyst 9300", "Catalyst 9200", "AD Server", "Employee PC", "Contractor Laptop"],
    topology: {
      devices: [
        { name: "ISE",              type: "server", ip: "10.1.1.10" },
        { name: "AD",               type: "server", ip: "10.1.1.11" },
        { name: "Core-SW (C9300)",  type: "switch", ip: "10.1.1.1" },
        { name: "Access-SW (C9200)",type: "switch", ip: "10.1.1.2" },
        { name: "Employee-PC",      type: "server", ip: "10.10.10.X" },
        { name: "Contractor",       type: "server", ip: "10.20.20.X" },
      ],
      links: [
        { from: "ISE",       to: "Core-SW",    label: "RADIUS/TACACS+" },
        { from: "Core-SW",   to: "Access-SW",  label: "Trunk" },
        { from: "Access-SW", to: "Employee-PC",label: "802.1X" },
      ],
    },
    ipTable: [
      { device: "ISE",        interface: "eth0",   ip: "10.1.1.10",  subnet: "255.255.255.0", gateway: "10.1.1.254" },
      { device: "Core-SW",    interface: "Vlan10", ip: "10.1.1.1",   subnet: "255.255.255.0", gateway: "-" },
      { device: "Employee",   interface: "VLAN10", ip: "10.10.10.X", subnet: "255.255.255.0", gateway: "10.10.10.1", notes: "Dynamic VLAN via ISE" },
      { device: "Contractor", interface: "VLAN20", ip: "10.20.20.X", subnet: "255.255.255.0", gateway: "10.20.20.1", notes: "Limited access VLAN" },
    ],
    tasks: [
      "สร้าง SGT บน ISE: Employees (SGT 10), Contractors (SGT 20), Servers (SGT 30), IOT (SGT 40)",
      "สร้าง SGACL policy: Employees to Servers allow TCP 443,22; Contractors to Servers deny all",
      "Config RADIUS บน Core-SW: radius server ISE address 10.1.1.10 auth-port 1812",
      "เปิด TrustSec: cts credentials id Core-SW password Trust@123",
      "Config 802.1X บน Access-SW port ที่เชื่อม PC: dot1x pae authenticator",
      "สร้าง ISE Policy Set: condition AD:Group = Employees to permit VLAN 10 + SGT 10",
      "สร้าง Policy: condition AD:Group = Contractors to permit VLAN 20 + SGT 20",
      "ทดสอบ: plug Employee PC เข้า port, verify ได้ VLAN 10 ด้วย show authentication sessions",
    ],
    hints: [
      "SGT propagation ต้องการ MACsec หรือ SGT Exchange Protocol (SXP) ถ้า switch รุ่นเก่าไม่รองรับ inline tagging",
      "ใช้ ISE Live Logs ใน Operations > RADIUS > Live Logs เพื่อ debug 802.1X authentication real-time",
      "SGACL ต้องกำหนดทั้ง permit และ deny ชัดเจน ไม่มี implicit deny ถ้าไม่ได้ตั้ง",
      "download-acl option ใน ISE authorization profile ใช้ push dACL ไปยัง switch แทน SGT",
    ],
    expectedResult: "Employee PC ได้ VLAN 10 อัตโนมัติหลัง 802.1X สำเร็จ; Contractor ได้ VLAN 20; show cts role-based sgt-map แสดง SGT mapping; ping จาก Contractor ถึง Server ถูก deny",
    troubleshooting: [
      "802.1X auth fail: debug dot1x all บน switch, ตรวจ ISE Live Log ดู reason มักเกิดจาก certificate ไม่ match",
      "SGT ไม่ propagate: show cts interface Gi1/0/1 ดู propagation mode ต้องเป็น Trusted และ TrustSec enabled",
      "RADIUS timeout: ping ISE จาก switch ได้ไหม ตรวจ ISE service running",
    ],
    solution: `! Catalyst 9300 Core config
aaa new-model
radius server ISE
 address ipv4 10.1.1.10 auth-port 1812 acct-port 1813
 key Cisco123
!
cts credentials id Core-SW password Trust@123
cts role-based enforcement
!
! Access switch port
interface GigabitEthernet1/0/5
 switchport mode access
 dot1x pae authenticator
 authentication port-control auto
 mab`,
    roadmapLevel: 4,
    technology:  "Security",
    points:      225,
  },

  /* ── 6. SD-WAN Viptela Lab ──────────────────────────────────── */
  {
    id:          "sdwan-viptela-lab",
    title:       "Cisco SD-WAN (Viptela) Branch Deployment Lab",
    category:    "Advanced Networking",
    level:       "Advanced",
    duration:    "90 min",
    status:      "available",
    description: "Deploy Cisco SD-WAN vEdge router ที่ branch office onboard ด้วย Zero Touch Provisioning (ZTP) และ config Application-Aware Routing policy",
    scenario:    "บริษัทขยาย branch ใหม่ 3 แห่ง ต้องการ onboard vEdge router โดยอัตโนมัติผ่าน ZTP และตั้ง policy ส่ง video traffic ผ่าน MPLS และ data ทั่วไปผ่าน Internet",
    objective:   "Onboard vEdge บน vManage ผ่าน ZTP, สร้าง App-Aware Routing policy (SLA-based), verify TLOCs และ OMP routes",
    devices:     ["vManage", "vBond", "vSmart", "vEdge1 (HQ)", "vEdge2 (Branch)"],
    topology: {
      devices: [
        { name: "vManage", type: "server", ip: "192.168.100.10" },
        { name: "vBond",   type: "server", ip: "192.168.100.11" },
        { name: "vSmart",  type: "server", ip: "192.168.100.12" },
        { name: "vEdge1",  type: "router", ip: "10.0.0.1" },
        { name: "vEdge2",  type: "router", ip: "10.0.0.2" },
      ],
      links: [
        { from: "vManage", to: "vEdge1", label: "NETCONF/HTTPS" },
        { from: "vBond",   to: "vEdge2", label: "DTLS (auth)" },
        { from: "vEdge1",  to: "vEdge2", label: "IPsec BFD" },
      ],
    },
    ipTable: [
      { device: "vManage", interface: "eth0",  ip: "192.168.100.10", subnet: "255.255.255.0", gateway: "192.168.100.1" },
      { device: "vEdge1",  interface: "ge0/0", ip: "10.0.0.1",       subnet: "255.255.255.0", gateway: "10.0.0.254",   notes: "MPLS WAN" },
      { device: "vEdge1",  interface: "ge0/1", ip: "203.0.113.1",    subnet: "255.255.255.0", gateway: "203.0.113.254",notes: "Internet WAN" },
      { device: "vEdge2",  interface: "ge0/0", ip: "10.0.0.2",       subnet: "255.255.255.0", gateway: "10.0.0.254",   notes: "MPLS WAN" },
    ],
    tasks: [
      "Login vManage UI: add vEdge2 serial number และ chassis ID ใน Device List",
      "สร้าง Device Template สำหรับ Branch: อ้างอิง Feature Templates (System, VPN0, VPN512, BFD, OMP)",
      "Attach template ไปยัง vEdge2 ใส่ site-id=200, system-ip=10.0.200.1",
      "Boot vEdge2 ด้วย ZTP router จะ contact vBond อัตโนมัติ ใช้ wan-ip จาก DHCP",
      "Verify บน vManage: vEdge2 ต้องขึ้น status = reachable (green)",
      "สร้าง Application-Aware Routing Policy: Video (DSCP 46) MPLS preferred (SLA jitter<10ms); Data Internet",
      "Attach policy ไปยัง vSmart push ไปทุก vEdge",
      "ทดสอบ: show sdwan policy from-vsmart บน vEdge1",
    ],
    hints: [
      "TLOC = (system-ip, color, encap) vEdge ต้องมี TLOC ขึ้นบน vSmart ก่อน OMP route จะ propagate",
      "App-Aware Routing อ่านค่า BFD probe result ตรวจ show sdwan bfd sessions ว่า state = up",
      "vManage template attachment ต้องกด Attach Devices แล้วรอ config push 2-5 นาที",
      "show control connections บน vEdge ดู DTLS state กับ vBond",
    ],
    expectedResult: "vEdge2 ขึ้น status reachable บน vManage; show sdwan omp routes แสดง routes จาก vEdge1; video traffic ไปทาง MPLS; show sdwan policy from-vsmart แสดง policy active",
    troubleshooting: [
      "vEdge ไม่ขึ้น vManage: ตรวจ show control connections บน vEdge ดู DTLS state กับ vBond",
      "OMP peer ไม่ up: ตรวจ show sdwan omp peers ต้องมี vSmart เป็น peer state=established",
      "Policy ไม่ apply: ตรวจ show sdwan policy from-vsmart ถ้า empty แปลว่า policy ยังไม่ถูก push จาก vSmart",
    ],
    solution: `! Verify commands on vEdge
show control connections
show sdwan omp peers
show sdwan omp routes
show sdwan bfd sessions
show sdwan policy from-vsmart
show sdwan app-route stats`,
    roadmapLevel: 4,
    technology:  "SD-WAN",
    points:      225,
  },

  /* ── 7. eBPF/XDP Monitoring Lab ─────────────────────────────── */
  {
    id:          "ebpf-xdp-monitoring-lab",
    title:       "eBPF/XDP Network Traffic Monitoring Lab",
    category:    "Cloud Native",
    level:       "Advanced",
    duration:    "60 min",
    status:      "available",
    description: "เขียน eBPF program สำหรับ count และ drop specific traffic ที่ kernel level ด้วย XDP โดยไม่กระทบ performance",
    scenario:    "Platform team ต้องการ monitor จำนวน HTTP request per source IP แบบ real-time และสามารถ drop DDoS traffic ที่ kernel โดยไม่ผ่าน user-space",
    objective:   "เขียน eBPF/XDP program ด้วย Python BCC สำหรับ count packets per source IP แสดง top-10 talkers และ block IP ที่กำหนด",
    devices:     ["Linux Server (Ubuntu 22.04)", "Traffic Generator"],
    topology: {
      devices: [
        { name: "Monitor Server", type: "server", ip: "10.0.0.1" },
        { name: "Traffic Gen",    type: "server", ip: "10.0.0.2" },
      ],
      links: [{ from: "Monitor Server", to: "Traffic Gen", label: "eth0 1G" }],
    },
    ipTable: [
      { device: "Monitor Server", interface: "eth0", ip: "10.0.0.1", subnet: "255.255.255.0", gateway: "10.0.0.254" },
      { device: "Traffic Gen",    interface: "eth0", ip: "10.0.0.2", subnet: "255.255.255.0", gateway: "10.0.0.254" },
    ],
    tasks: [
      "ติดตั้ง BCC: apt install bpfcc-tools linux-headers-$(uname -r)",
      "ตรวจสอบ kernel support: uname -r ต้อง >= 4.18; ls /sys/fs/bpf/ ต้องมี directory",
      "เขียน eBPF C program นับ packet per src_ip ด้วย BPF_HASH",
      "ใช้ BCC b.attach_xdp('eth0', fn) attach โปรแกรมไปที่ NIC",
      "เพิ่ม logic: ถ้า src IP อยู่ใน blocklist return XDP_DROP; ถ้าไม่อยู่ return XDP_PASS และ increment counter",
      "แสดงผล top-10 source IP ทุก 2 วินาที sorted by packet count",
      "ทดสอบ: hping3 -S -p 80 --flood 10.0.0.1 จาก Traffic Gen",
      "Block IP: เพิ่มลง blocklist แล้ว verify ด้วย tcpdump ว่า traffic หาย",
    ],
    hints: [
      "XDP_DROP ใน eBPF จะ drop packet ก่อน kernel network stack รับ เร็วกว่า iptables มาก",
      "BPF_HASH(name, key_type, value_type, max_entries) key = __u32 src_ip, value = __u64 count",
      "bpf_ntohl() ต้องใช้แปลง IP จาก network byte order เพื่อ compare กับ blocklist",
      "attach_xdp ต้อง sudo หรือ CAP_NET_ADMIN รัน script ด้วย sudo",
    ],
    expectedResult: "Script แสดง real-time top-10 source IPs; hping3 flood IP ขึ้นอยู่ใน top; หลัง block tcpdump ไม่แสดง packet จาก IP นั้น; CPU usage ต่ำ (<5%) แม้ flood",
    troubleshooting: [
      "ImportError bcc: ต้องใช้ apt install bpfcc-tools ไม่ใช่ pip install bcc",
      "attach_xdp fail: ตรวจ driver support XDP ถ้าไม่รองรับ ใช้ mode=BPF.XDP_FLAGS_SKB_MODE (generic mode)",
      "Permission denied: รันด้วย sudo ตรวจ /proc/sys/kernel/unprivileged_bpf_disabled = 0",
    ],
    solution: `# Install: apt install bpfcc-tools linux-headers-$(uname -r)\n# Run: sudo python3 ebpf_monitor.py\n# See: https://github.com/iovisor/bcc/blob/master/examples/networking/xdp/xdp_drop_count.py\n# BPF_HASH(packet_count, u32, u64) -- key=src_ip, val=pkt_count\n# XDP_DROP to block, XDP_PASS to count\n# b.attach_xdp("eth0", fn, 0) -- attach to NIC`,

    roadmapLevel: 5,
    technology:  "Cloud Native",
    points:      250,
  },

  /* ── 8. Wi-Fi 7 Enterprise Deployment Lab ───────────────────── */
  {
    id:          "wifi7-enterprise-lab",
    title:       "Wi-Fi 7 (802.11be) Enterprise Deployment Lab",
    category:    "Wireless",
    level:       "Advanced",
    duration:    "60 min",
    status:      "available",
    description: "วางแผนและ config Wi-Fi 7 enterprise network สำหรับ office 500 users รองรับ 4K video conferencing และ AR/VR",
    scenario:    "สำนักงาน 3 ชั้น 500 users ต้องการ upgrade จาก Wi-Fi 5 เป็น Wi-Fi 7 โดยต้องรองรับ MLO, WPA3-Enterprise และ seamless roaming",
    objective:   "Design RF plan, config Cisco WLC 9800 สำหรับ Wi-Fi 7 AP, เปิด MLO, config WPA3-Enterprise + OWE transition, ทดสอบ throughput",
    devices:     ["Cisco Catalyst Center", "Cisco WLC 9800", "Cisco AP 9178 (Wi-Fi 7)", "Wi-Fi 7 Client"],
    topology: {
      devices: [
        { name: "Catalyst Center", type: "server",  ip: "10.1.0.10" },
        { name: "WLC 9800",        type: "switch",  ip: "10.1.0.1" },
        { name: "AP-Floor1",       type: "wireless",ip: "10.1.1.11" },
        { name: "AP-Floor2",       type: "wireless",ip: "10.1.1.12" },
        { name: "AP-Floor3",       type: "wireless",ip: "10.1.1.13" },
      ],
      links: [
        { from: "WLC 9800", to: "AP-Floor1", label: "CAPWAP / PoE++" },
        { from: "WLC 9800", to: "AP-Floor2", label: "CAPWAP / PoE++" },
      ],
    },
    ipTable: [
      { device: "WLC 9800",  interface: "Gi1",    ip: "10.1.0.1",   subnet: "255.255.255.0", gateway: "10.1.0.254" },
      { device: "AP-Floor1", interface: "eth0",   ip: "10.1.1.11",  subnet: "255.255.255.0", gateway: "10.1.1.254" },
      { device: "Corp SSID", interface: "VLAN10", ip: "10.10.0.X",  subnet: "255.255.0.0",   gateway: "10.10.0.1", notes: "Employee WLAN" },
      { device: "Guest SSID",interface: "VLAN20", ip: "172.16.0.X", subnet: "255.255.0.0",   gateway: "172.16.0.1",notes: "Guest WLAN" },
    ],
    tasks: [
      "RF Planning: กำหนด AP placement ให้ได้ RSSI >= -67dBm ทุก coverage area",
      "Config AP radio: เปิด 6GHz band (Wi-Fi 7), channel width 320MHz, TxPower 17dBm",
      "สร้าง WLAN Corp-WiFi7: Security WPA3-Enterprise, AKM suite SAE+FT-SAE, PMF required",
      "เปิด MLO บน WLAN: multi-link mode active, link steering 5GHz + 6GHz concurrent",
      "Config 802.1X: RADIUS server ISE 10.1.1.10, authentication EAP-TLS",
      "Config BSS Coloring: เปิด spatial reuse เพื่อลด co-channel interference",
      "สร้าง Guest WLAN: OWE Transition Mode (open + OWE), client isolation",
      "ทดสอบ: iperf3 -c 10.1.0.100 -t 30 -P 4 จาก Wi-Fi 7 laptop target > 2 Gbps",
    ],
    hints: [
      "MLO ต้องการ AP และ Client ที่รองรับ 802.11be ตรวจ client capabilities ด้วย show wireless client detail",
      "6GHz ใช้เฉพาะ WPA3/OWE เท่านั้น legacy WPA2 client จะเห็นแค่ 2.4/5GHz",
      "BSS Coloring color value 1-63 AP ข้างๆ ต้องใช้คนละ color เพื่อให้ spatial reuse ทำงาน",
      "FT (Fast Transition) roaming สำคัญสำหรับ VoIP ตรวจ roaming time < 50ms",
    ],
    expectedResult: "iperf3 ได้ >2 Gbps; show wireless client detail แสดง multi-link established; roaming between floors < 50ms; Guest client isolation active",
    troubleshooting: [
      "Client ไม่เชื่อม 6GHz: ตรวจ driver update ตรวจ country code ว่า 6GHz legal (Thailand ต้องตรวจ NBTC regulation)",
      "MLO ไม่ active: show wireless client detail ดู MLO status client อาจเป็น Wi-Fi 6 ที่ไม่รองรับ",
      "iperf3 throughput ต่ำ: ตรวจ channel utilization ใน show ap auto-rf ดู interference %",
    ],
    solution: `! Cisco WLC 9800 CLI
wlan Corp-WiFi7 10 Corp-WiFi7
 security wpa wpa3
 security wpa akm sae
 security wpa akm ft-sae
 security pmf mandatory
 no shutdown
!
ap dot11 6ghz shutdown no
ap dot11 6ghz channel width 320
ap dot11 6ghz txpower 17
!
wlan Corp-WiFi7 radio dot11 6ghz
wlan Corp-WiFi7 mlo`,
    roadmapLevel: 4,
    technology:  "Wireless",
    points:      200,
  },

  /* ── 9. Datacenter Cabling Lab ──────────────────────────────── */
  {
    id:          "datacenter-cabling-lab",
    title:       "Data Center Cabling Standards and Patch Panel Lab",
    category:    "Hardware",
    level:       "Intermediate",
    duration:    "45 min",
    status:      "available",
    description: "ฝึก terminate Cat6A จาก Patch Panel ไปยัง Switch, label ตาม ANSI/TIA-568-C.2 standard, test ด้วย cable tester",
    scenario:    "Data Center ใหม่ต้องการ cable horizontal distribution สำหรับ 24 ports ทุก cable ต้อง pass Permanent Link test และ label ถูกต้องตาม standard",
    objective:   "Terminate 24 Cat6A patch panel ports, label ตาม naming convention, ทดสอบด้วย Fluke DSX-8000 verify ผ่าน TIA Category 6A performance",
    devices:     ["24-port Cat6A Patch Panel", "Cisco Catalyst 9300", "Cat6A Cable Spool", "Fluke DSX-8000", "Punch-down Tool"],
    topology: {
      devices: [
        { name: "Patch Panel",    type: "switch", ip: "-" },
        { name: "Catalyst 9300", type: "switch", ip: "10.0.0.1" },
        { name: "Workstations",  type: "server", ip: "10.0.1.X" },
      ],
      links: [
        { from: "Workstation", to: "Patch Panel",   label: "Horizontal Cat6A (<=90m)" },
        { from: "Patch Panel", to: "Catalyst 9300", label: "Patch Cord Cat6A (<=5m)" },
      ],
    },
    ipTable: [
      { device: "Catalyst 9300",  interface: "Vlan1", ip: "10.0.0.1",  subnet: "255.255.255.0", gateway: "-" },
      { device: "Workstation-01", interface: "NIC",   ip: "10.0.1.1",  subnet: "255.255.255.0", gateway: "10.0.0.1" },
      { device: "Workstation-24", interface: "NIC",   ip: "10.0.1.24", subnet: "255.255.255.0", gateway: "10.0.0.1" },
    ],
    tasks: [
      "วัดและตัด Cat6A cable ตาม horizontal run แต่ละ run <= 90m",
      "Strip jacket 25mm, แยก pair และ untwist <= 13mm สำหรับ termination",
      "Punch-down แต่ละ pair ตาม T568B: W/O O W/G BL W/BL G W/BR BR",
      "Label patch panel port: format [Building]-[Floor]-[Room]-[Port] เช่น B1-F2-R01-P01",
      "ต่อ patch cord Cat6A จาก patch panel ไปยัง switch port ที่ตรงกัน",
      "รัน Permanent Link test ด้วย Fluke DSX-8000: test ต้องผ่าน TIA 568-C.2 Cat6A",
      "บันทึก test result ทุก port ลง report และ save ไฟล์ใน DSX-8000",
      "Verify connectivity: ping จาก Workstation-01 ถึง Workstation-24",
    ],
    hints: [
      "T568B: Thailand data center มักใช้ T568B สำคัญกว่าคือ consistent ทั้งสอง end",
      "Untwist มากเกินไปทำให้ NEXT (Near-End Crosstalk) fail maintain twist ให้ใกล้ termination",
      "Cat6A alien crosstalk ต้องการ cable bundle <= 24 cables ต่อ bundle และ maintain spacing",
      "Fluke DSX-8000 Autotest ทดสอบ insertion loss, NEXT, PS-NEXT, ELFEXT, Return Loss พร้อมกัน",
    ],
    expectedResult: "ทุก 24 ports ผ่าน TIA 568-C.2 Category 6A Permanent Link test (PASS); label ถูกต้องทุก port; ping ระหว่าง workstations สำเร็จ",
    troubleshooting: [
      "Permanent Link FAIL Insertion Loss: ตรวจ cable length ต้องไม่เกิน 90m รวม patch cord ตรวจ bend radius",
      "NEXT FAIL: ตรวจ untwist length <= 13mm ตรวจ punch-down pair ถูก position",
      "No link บน switch: ตรวจ LED switch port ตรวจ cable ต่อถูก port ลอง swap patch cord",
    ],
    solution: `T568B Wiring (left to right):
Pin 1: White/Orange
Pin 2: Orange
Pin 3: White/Green
Pin 4: Blue
Pin 5: White/Blue
Pin 6: Green
Pin 7: White/Brown
Pin 8: Brown

Naming: [BLDG]-[FLOOR]-[ROOM]-P[PORT#]
Example: DC1-F1-MDF-P01

Fluke DSX-8000: Main Menu > Autotest > Cat 6A Permanent Link`,
    roadmapLevel: 2,
    technology:  "Hardware",
    points:      125,
  },

  /* ── 10. Switch MLAG / VSS Stack Lab ───────────────────────── */
  {
    id:          "switch-mlag-stack-lab",
    title:       "Switch MLAG High-Availability Stacking Lab",
    category:    "Hardware",
    level:       "Intermediate",
    duration:    "60 min",
    status:      "available",
    description: "Config MLAG (Multi-Chassis Link Aggregation) บน Arista EOS Switch เพื่อให้ Server เชื่อม 2 switch ด้วย LACP bond พร้อมกัน Active-Active ไม่มี STP blocking",
    scenario:    "Server สำคัญในระบบต้องการ dual-homed connection แบบ Active-Active ไปยัง switch 2 ตัว ให้ switch ตัวใดตัวหนึ่ง fail ได้โดยไม่ interrupt traffic",
    objective:   "Config MLAG peer-link, PortChannel และ LACP บน Arista SW1+SW2, config server LACP bond0 เชื่อมทั้ง 2 switch verify failover ด้วยการ shutdown SW1",
    devices:     ["Arista EOS SW1 (7050CX3)", "Arista EOS SW2 (7050CX3)", "Linux Server (dual NIC)"],
    topology: {
      devices: [
        { name: "SW1",    type: "switch", ip: "10.0.0.1" },
        { name: "SW2",    type: "switch", ip: "10.0.0.2" },
        { name: "Server", type: "server", ip: "10.1.1.100" },
      ],
      links: [
        { from: "SW1",    to: "SW2",    label: "Peer-Link: Et47+Et48 (2x100G)" },
        { from: "SW1",    to: "Server", label: "Et1 -> eth0 (10G)" },
        { from: "SW2",    to: "Server", label: "Et1 -> eth1 (10G)" },
      ],
    },
    ipTable: [
      { device: "SW1",    interface: "Vlan1",   ip: "10.0.0.1",   subnet: "255.255.255.0", gateway: "-" },
      { device: "SW2",    interface: "Vlan1",   ip: "10.0.0.2",   subnet: "255.255.255.0", gateway: "-" },
      { device: "SW1",    interface: "Vlan4094",ip: "10.255.0.1", subnet: "255.255.255.0", gateway: "-", notes: "MLAG peer VLAN" },
      { device: "SW2",    interface: "Vlan4094",ip: "10.255.0.2", subnet: "255.255.255.0", gateway: "-", notes: "MLAG peer VLAN" },
      { device: "Server", interface: "bond0",   ip: "10.1.1.100", subnet: "255.255.255.0", gateway: "10.1.1.1", notes: "LACP bond (eth0+eth1)" },
    ],
    tasks: [
      "Config Peer-Link บน SW1+SW2: Port-Channel 1 ใช้ Et47+Et48 LACP mode active",
      "Config MLAG domain: mlag configuration -> domain-id MLAG-PAIR, peer-link Port-Channel1, local-interface Vlan4094",
      "กำหนด MLAG ID: Et1 เป็น MLAG 10 บน SW1 และ SW2 (port-channel 10)",
      "Config Linux Server: modprobe bonding, สร้าง bond0 ด้วย mode=4 (802.3ad LACP)",
      "เพิ่ม eth0 + eth1 เข้า bond0: ip link set eth0 master bond0; ip link set eth1 master bond0",
      "ตั้ง IP บน bond0: ip addr add 10.1.1.100/24 dev bond0",
      "Verify: show mlag บน SW1 ต้องแสดง state=active, peer=connected",
      "Failover test: shutdown SW1 ping จาก server ต้อง drop <= 1 packet แล้วกลับมา",
    ],
    hints: [
      "MLAG peer VLAN 4094 ต้อง dedicated ไม่ควรมี user traffic บน VLAN นี้",
      "MLAG ID ต้องเหมือนกันทั้ง 2 switch สำหรับ server-facing port ถ้าต่างกันจะเป็น independent LACP",
      "Linux bonding mode=4 (802.3ad) ต้องการ lacp_rate=fast เพื่อให้ failover เร็ว ค่า default slow = 30 วินาที",
      "show lacp neighbor บน switch ดูว่า server NIC ส่ง LACP PDU มาถูกต้องหรือไม่",
    ],
    expectedResult: "show mlag แสดง state=active peer=connected; show port-channel 10 detail แสดง 2 active member; ping failover <100ms เมื่อ shutdown SW1; cat /proc/net/bonding/bond0 แสดง Active Slave สลับไป eth1",
    troubleshooting: [
      "MLAG peer ไม่ขึ้น connected: ตรวจ peer-link PortChannel1 ว่า bundle ขึ้น ตรวจ Vlan4094 trunk ผ่าน peer-link",
      "Server bond ไม่ขึ้น LACP: ตรวจ show lacp neighbor บน switch ดูว่า PDU มาจาก server",
      "Failover ช้า >1 วินาที: ตรวจ lacp_rate บน server ต้องเป็น fast ตรวจ mlag timers บน switch",
    ],
    solution: `! SW1 config
vlan 4094
!
interface Port-Channel1
   description MLAG-Peer-Link
   switchport mode trunk
!
interface Ethernet47-48
   channel-group 1 mode active
!
mlag configuration
   domain-id MLAG-PAIR
   local-interface Vlan4094
   peer-address 10.255.0.2
   peer-link Port-Channel1
!
interface Port-Channel10
   mlag 10
!
interface Ethernet1
   channel-group 10 mode active
!
! Linux Server
modprobe bonding
ip link add bond0 type bond mode 4
ip link set eth0 master bond0
ip link set eth1 master bond0
ip addr add 10.1.1.100/24 dev bond0`,
    roadmapLevel: 3,
    technology:  "Hardware",
    points:      175,
  },


];

export const labCategories = Array.from(new Set(labs.map((l) => l.category)));

export const labStats = {
  total:        labs.length,
  beginner:     labs.filter(l => l.level === "Beginner").length,
  intermediate: labs.filter(l => l.level === "Intermediate").length,
  advanced:     labs.filter(l => l.level === "Advanced").length,
  completed:    labs.filter(l => l.status === "completed").length,
};


export function getLabById(id: string): Lab | undefined {
  return labs.find((l) => l.id === id);
}
