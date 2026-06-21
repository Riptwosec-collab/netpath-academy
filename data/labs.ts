/* ─── Types ─────────────────────────────────────────────────────── */
export type LabLevel  = "Beginner" | "Intermediate" | "Advanced";
export type LabStatus = "not-started" | "in-progress" | "completed";

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
}

export interface Lab {
  id:              string;
  title:           string;
  category:        string;
  level:           LabLevel;
  duration:        string;
  status:          LabStatus;
  description:     string;
  scenario:        string;
  objective:       string;
  devices:         string[];
  topology:        TopologyLink[];
  ipTable:         IpEntry[];
  tasks:           string[];
  hints:           string[];
  expectedResult:  string;
  troubleshooting: string[];
  solution:        string;
  roadmapLevel:    number;
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
