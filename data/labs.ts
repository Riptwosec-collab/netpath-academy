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
