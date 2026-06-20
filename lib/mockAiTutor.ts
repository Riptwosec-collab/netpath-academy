import type { AiMode } from "@/data/aiPrompts";

// ─────────────────────────────────────────────────────────────────
// Future Phase:
// Replace getMockAiResponse() with a real API route:
//   app/api/ai-tutor/route.ts
// Call OpenAI API from server side ONLY.
// Never expose OPENAI_API_KEY to the client.
//
// Example server route:
//   import OpenAI from "openai";
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{ role: "user", content: prompt }],
//   });
// ─────────────────────────────────────────────────────────────────

export type AiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode?: AiMode;
  createdAt: string;
};

export function getMockAiResponse(input: string, mode: AiMode): string {
  const lower = input.toLowerCase();

  /* ── EXPLAIN ──────────────────────────────────────────────── */
  if (mode === "explain") {
    if (lower.includes("ospf")) {
      return `## OSPF (Open Shortest Path First)

OSPF เป็น Link-State Routing Protocol ที่ใช้ในเครือข่ายขนาดใหญ่ทำงานบน Layer 3

### หลักการทำงาน
1. Router แต่ละตัวส่ง **LSA (Link-State Advertisement)** ให้ Neighbor ทราบ
2. Router สร้าง **LSDB (Link-State Database)** รวบรวมข้อมูลทั้ง Network
3. คำนวณเส้นทางด้วย **Dijkstra Algorithm** เลือก Path ที่มี Cost ต่ำสุด

### Packet Types
| Type | ชื่อ | หน้าที่ |
|------|------|---------|
| 1 | Hello | หา Neighbor |
| 2 | DBD | แลก Database Summary |
| 3 | LSR | ขอ LSA เพิ่ม |
| 4 | LSU | ส่ง LSA |
| 5 | LSAck | ยืนยันรับ |

### คำสั่งบน Cisco
\`\`\`
router ospf 1
 network 192.168.1.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/1

show ip ospf neighbor
show ip ospf database
show ip route ospf
\`\`\`

### จุดที่มักผิดพลาด
- **Hello/Dead Timer** ไม่ตรงกัน → Neighbor ไม่ขึ้น
- **Area ID** ไม่ตรงกัน → ไม่ Exchange LSA
- **MTU Mismatch** → Stuck ที่ State Exstart/Exchange
- **Network Type** ไม่ตรงกัน เช่น Point-to-Point vs Broadcast`;
    }

    if (lower.includes("bgp")) {
      return `## BGP (Border Gateway Protocol)

BGP เป็น Routing Protocol ระดับ Internet ใช้แลกเปลี่ยน Routing Information ระหว่าง **AS (Autonomous System)**

### ประเภท BGP
- **iBGP** — ภายใน AS เดียวกัน
- **eBGP** — ระหว่าง AS ต่างกัน (ค่า AD = 20)

### AS Path Attribute
\`\`\`
AS 100 → AS 200 → AS 300
เส้นทางที่ผ่าน AS น้อยที่สุดจะถูกเลือก
\`\`\`

### คำสั่งบน Cisco
\`\`\`
router bgp 100
 neighbor 10.0.0.2 remote-as 200
 network 192.168.1.0 mask 255.255.255.0

show bgp summary
show bgp neighbors
show ip route bgp
\`\`\`

### BGP Best Path Selection (ลำดับ)
1. Weight (Cisco proprietary, local)
2. Local Preference (iBGP)
3. Locally Originated
4. AS Path Length (สั้นกว่า = ดีกว่า)
5. Origin (IGP > EGP > Incomplete)
6. MED
7. eBGP > iBGP
8. IGP Metric to Next-Hop`;
    }

    if (lower.includes("spanning") || lower.includes("stp")) {
      return `## Spanning Tree Protocol (STP / RSTP)

STP ป้องกัน **Layer 2 Loop** ใน Network ที่มีหลาย Switch โดยปิด Port บางส่วน

### Port Roles
| Role | หน้าที่ |
|------|---------|
| Root Port | Port ที่ใกล้ Root Bridge ที่สุด |
| Designated Port | Port ที่ Forward Traffic ใน Segment |
| Blocked Port | Port ที่ปิดเพื่อป้องกัน Loop |

### Port States (STP ดั้งเดิม)
Blocking → Listening → Learning → Forwarding → Disabled

### RSTP Improvements
- Converge เร็วกว่า (ไม่ต้องรอ 30-50 วินาที)
- Port Roles เพิ่ม Alternate และ Backup
- Proposal/Agreement Mechanism

### คำสั่ง
\`\`\`
show spanning-tree
show spanning-tree vlan 10
show spanning-tree detail
spanning-tree mode rapid-pvst
spanning-tree portfast (สำหรับ Access Port)
spanning-tree bpduguard enable
\`\`\`

### Best Practices
- กำหนด Root Bridge ให้ชัดเจน (priority 4096)
- เปิด PortFast + BPDU Guard สำหรับ Access Port
- เปิด Root Guard บน Uplink Port`;
    }

    if (lower.includes("vlan")) {
      return `## VLAN (Virtual LAN)

VLAN แบ่ง Network ออกเป็น Broadcast Domain ย่อย ๆ บน Switch เดียวกัน

### Access Port vs Trunk Port
- **Access Port** — เชื่อมต่อ End Device, ส่ง Traffic VLAN เดียว
- **Trunk Port** — เชื่อมต่อ Switch-to-Switch หรือ Switch-to-Router, ส่งหลาย VLAN ด้วย 802.1Q Tag

### Config ตัวอย่าง
\`\`\`
! สร้าง VLAN
vlan 10
 name HR
vlan 20
 name IT

! Access Port
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

! Trunk Port
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 1

! ตรวจสอบ
show vlan brief
show interfaces trunk
show interfaces GigabitEthernet0/1 switchport
\`\`\`

### Native VLAN
- VLAN ที่ส่ง Traffic ผ่าน Trunk โดยไม่มี Tag
- ค่าเริ่มต้นคือ VLAN 1
- ควรเปลี่ยนเพื่อความปลอดภัย`;
    }

    return `## สรุปหัวข้อ Network

### แนวคิดหลัก
Network Engineering ครอบคลุมการออกแบบ, ติดตั้ง, และดูแลระบบเครือข่ายคอมพิวเตอร์

### OSI Model (7 Layer)
| Layer | ชื่อ | Protocol |
|-------|------|----------|
| 7 | Application | HTTP, DNS, FTP |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP, OSPF, BGP |
| 2 | Data Link | Ethernet, VLAN |
| 1 | Physical | สาย, Wi-Fi |

### คำสั่งพื้นฐานที่ควรรู้
\`\`\`bash
# Windows
ipconfig /all
ping 8.8.8.8
tracert 8.8.8.8
nslookup google.com

# Cisco
show ip interface brief
show version
show running-config
show interfaces status
\`\`\`

### จุดที่มักสับสน
- IP Address กับ MAC Address ต่างกันอย่างไร
- Layer 2 กับ Layer 3 Switch ต่างกันอย่างไร
- Static Route กับ Dynamic Routing ต่างกันอย่างไร

ถามหัวข้อที่ต้องการได้เลยครับ เช่น OSPF, BGP, VLAN, Firewall, Subnetting`;
  }

  /* ── CONFIG ───────────────────────────────────────────────── */
  if (mode === "config") {
    return `## ผลวิเคราะห์ Config

### ✅ สิ่งที่ถูกต้อง
- Interface ถูก Assign VLAN ครบถ้วน
- Trunk Port มีการกำหนด Allowed VLAN

### ⚠️ สิ่งที่ควรตรวจสอบ
1. **Native VLAN** — ควรเปลี่ยนจาก VLAN 1 เป็น VLAN อื่นเพื่อความปลอดภัย
2. **BPDU Guard** — ควรเปิดบน Access Port ทุก Port
3. **PortFast** — ควรเปิดบน Access Port เพื่อลด Convergence Time
4. **Unused Port** — ควรปิด Interface ที่ไม่ใช้งาน

### 🔧 คำแนะนำ
\`\`\`
! เพิ่ม Security บน Access Port
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
 shutdown  ! ถ้าไม่ใช้งาน

! เปลี่ยน Native VLAN
interface GigabitEthernet0/24
 switchport trunk native vlan 999

! ตรวจสอบ
show interfaces trunk
show spanning-tree
show interfaces status
\`\`\`

### 📋 คำสั่งตรวจสอบเพิ่มเติม
\`\`\`
show ip interface brief
show vlan brief
show running-config interface
show interfaces counters errors
\`\`\``;
  }

  /* ── LOG ──────────────────────────────────────────────────── */
  if (mode === "log") {
    if (lower.includes("macflap") || lower.includes("mac flap") || lower.includes("flapping")) {
      return `## วิเคราะห์ MAC Flapping Log

### อาการที่พบ
MAC Address ของ Host กระโดดไปมาระหว่างหลาย Port อย่างต่อเนื่อง

### สาเหตุที่เป็นไปได้ (เรียงจากบ่อยสุด)
1. **Layer 2 Loop** — มีเส้นทาง Loop ใน Network ที่ STP ไม่ได้ Block
2. **Hub หรือ Unmanaged Switch** — อุปกรณ์ที่ไม่รองรับ STP ต่อพ่วงอยู่
3. **NIC Teaming/Bonding** — การ Config LACP/Port-Channel ผิดพลาด
4. **VM Migration** — Virtual Machine ย้าย Host แบบ Live Migration
5. **สายเส้นที่ 2 เสียบผิด Port**

### ขั้นตอนวิเคราะห์
\`\`\`
! ดู Port ที่ MAC กระโดด
show mac address-table | include <mac-address>

! ตรวจ STP
show spanning-tree
show spanning-tree detail | include ieee|from|occurr|is execut

! ตรวจ Interface Error
show interfaces GigabitEthernet1/0/1 counters errors
show interfaces GigabitEthernet1/0/2 counters errors

! ดู CDP เพื่อหาอุปกรณ์ที่ต่ออยู่
show cdp neighbors detail
\`\`\`

### แนวทางแก้ไข
1. ตรวจสอบว่ามี Loop หรือไม่ด้วย \`show spanning-tree\`
2. ถ้าพบ Hub หรือ Unmanaged Switch ให้เปลี่ยนเป็น Managed Switch
3. ตรวจ Port-Channel Config ให้ถูกต้อง
4. เปิด **BPDU Guard** บน Access Port ที่ต่อ End Device`;
    }

    if (lower.includes("ospf")) {
      return `## วิเคราะห์ OSPF Neighbor Down

### อาการ
OSPF Neighbor ล่ม — Dead Timer หมดอายุ ไม่ได้รับ Hello Packet

### สาเหตุที่เป็นไปได้
1. **Interface Down** — Physical หรือ Logical Interface ล่ม
2. **Hello/Dead Timer Mismatch** — Timer ไม่ตรงกันระหว่าง Neighbor
3. **MTU Mismatch** — MTU ต่างกัน ทำให้ Exchange DBD ล้มเหลว
4. **Authentication ผิด** — Password OSPF ไม่ตรงกัน
5. **ACL Block** — Firewall หรือ ACL Block Multicast 224.0.0.5

### ขั้นตอนตรวจสอบ
\`\`\`
! ตรวจ Neighbor State
show ip ospf neighbor

! ตรวจ Interface
show ip ospf interface brief
show interfaces GigabitEthernet0/0

! ตรวจ Timer
show ip ospf interface GigabitEthernet0/0 | include Hello|Dead

! ตรวจ MTU
show interfaces | include MTU

! Debug (ระวัง Production)
debug ip ospf hello
debug ip ospf adj
\`\`\`

### แนวทางแก้ไข
1. ตรวจสอบ Interface ทั้งสองฝั่งให้ Up/Up
2. ตรวจ Timer: \`ip ospf hello-interval\` และ \`ip ospf dead-interval\`
3. ปรับ MTU: \`ip ospf mtu-ignore\` หรือแก้ MTU ให้ตรงกัน
4. ตรวจ Authentication ให้ตรงกัน`;
    }

    return `## วิเคราะห์ Log

### อาการที่ตรวจพบ
Log บ่งชี้ถึงความผิดปกติใน Network Infrastructure

### สาเหตุที่เป็นไปได้
1. **Layer 2 Issue** — MAC Flapping, STP Topology Change
2. **Layer 3 Issue** — Routing Neighbor Down, Route Flapping
3. **Interface Issue** — Port Up/Down บ่อย, CRC Error
4. **Service Issue** — DHCP, DNS, Authentication ล้มเหลว

### คำสั่งตรวจสอบ
\`\`\`
show logging
show logging | include ERROR|WARN|DOWN
show interfaces | include down|error|reset
show mac address-table
show spanning-tree
show ip route
show ip ospf neighbor
show ip bgp summary
\`\`\`

### แนะนำ
วางข้อความ Log จริงมาให้ AI วิเคราะห์ได้เลย เช่น:
- \`%MACFLAP-4-MOVE\` — MAC Flapping
- \`%OSPF-5-ADJCHG\` — OSPF Neighbor Change
- \`%DHCPD-4-PING_CONFLICT\` — DHCP Conflict
- \`%LINEPROTO-5-UPDOWN\` — Interface Up/Down`;
  }

  /* ── LAB ──────────────────────────────────────────────────── */
  if (mode === "lab") {
    if (lower.includes("ospf")) {
      return `## Lab: OSPF Multi-Area (Intermediate)

### Scenario
บริษัทมี 3 Site เชื่อมกันด้วย Router ต้องการใช้ OSPF Multi-Area เพื่อลด LSA Flooding

### Topology
\`\`\`
[R1-Area0]---[R2-ABR]---[R3-Area1]
              |
           [R4-Area2]
\`\`\`

### IP Address Table
| Device | Interface | IP Address | Area |
|--------|-----------|------------|------|
| R1 | Gi0/0 | 10.0.12.1/30 | 0 |
| R2 | Gi0/0 | 10.0.12.2/30 | 0 |
| R2 | Gi0/1 | 10.0.23.1/30 | 1 |
| R2 | Gi0/2 | 10.0.24.1/30 | 2 |
| R3 | Gi0/0 | 10.0.23.2/30 | 1 |
| R4 | Gi0/0 | 10.0.24.2/30 | 2 |

### Tasks
1. Config OSPF บน R1, R2, R3, R4
2. กำหนด R2 เป็น ABR (Area Border Router)
3. ตรวจสอบ OSPF Neighbor Relationship
4. ตรวจสอบ Routing Table บนทุก Router
5. ทดสอบ Ping ระหว่าง R1 ไป R3 และ R4

### Config ตัวอย่าง (R2 - ABR)
\`\`\`
router ospf 1
 network 10.0.12.0 0.0.0.3 area 0
 network 10.0.23.0 0.0.0.3 area 1
 network 10.0.24.0 0.0.0.3 area 2
\`\`\`

### Verification Commands
\`\`\`
show ip ospf neighbor
show ip ospf database
show ip route ospf
show ip ospf border-routers
\`\`\`

### Expected Result
- R2 แสดง Neighbor ทั้ง R1, R3, R4
- Routing Table ทุก Router มีเส้นทางไปหากันครบ
- Ping ผ่านระหว่างทุก Router`;
    }

    return `## Lab: VLAN + Trunk (Beginner)

### Scenario
บริษัทมี 2 แผนกคือ HR (VLAN 10) และ IT (VLAN 20) ต้องการแยก Network และเชื่อมผ่าน Trunk

### Topology
\`\`\`
[PC-HR]---[SW1]---Trunk---[SW2]---[PC-IT]
            |                       |
         Gi0/1                   Gi0/2
         VLAN10                  VLAN20
\`\`\`

### IP Address Table
| Device | VLAN | IP Address | Gateway |
|--------|------|------------|---------|
| PC-HR | 10 | 192.168.10.10/24 | 192.168.10.1 |
| PC-IT | 20 | 192.168.20.10/24 | 192.168.20.1 |

### Tasks
1. สร้าง VLAN 10 (HR) และ VLAN 20 (IT) บนทั้ง SW1 และ SW2
2. Config Gi0/1 ของ SW1 เป็น Access Port VLAN 10
3. Config Gi0/2 ของ SW2 เป็น Access Port VLAN 20
4. Config Trunk Port ระหว่าง SW1 และ SW2
5. ทดสอบ Ping ระหว่าง PC ใน VLAN เดียวกัน

### Config SW1
\`\`\`
vlan 10
 name HR
vlan 20
 name IT

interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
\`\`\`

### Verification
\`\`\`
show vlan brief
show interfaces trunk
show mac address-table
\`\`\`

### Expected Result
- PC-HR Ping PC ใน VLAN 10 ได้
- PC-HR Ping PC ใน VLAN 20 **ไม่ได้** (ต้องผ่าน L3)
- \`show vlan brief\` แสดง VLAN 10, 20 และ Port ถูกต้อง`;
  }

  /* ── QUIZ ─────────────────────────────────────────────────── */
  if (mode === "quiz") {
    return `## Quiz: Network Fundamentals

**ข้อ 1.** Switch ทำงานหลักที่ OSI Layer ใด?
- A. Layer 1 (Physical)
- B. Layer 2 (Data Link)
- C. Layer 3 (Network)
- D. Layer 4 (Transport)

**เฉลย: B** — Switch ใช้ MAC Address ในการส่ง Frame ภายใน LAN (Layer 2)

---

**ข้อ 2.** คำสั่งใดใช้ดู IP Address และ Gateway บนเครื่อง Windows?
- A. \`ipconfig /all\`
- B. \`ifconfig -a\`
- C. \`ip addr show\`
- D. \`netstat -r\`

**เฉลย: A** — \`ipconfig /all\` แสดง IP, Subnet Mask, Gateway, DNS และ MAC Address

---

**ข้อ 3.** /24 Subnet Mask คือ?
- A. 255.0.0.0
- B. 255.255.0.0
- C. 255.255.255.0
- D. 255.255.255.128

**เฉลย: C** — /24 = 255.255.255.0 มี Host ได้ 254 เครื่อง

---

**ข้อ 4.** Port ใดที่ HTTPS ใช้?
- A. 80
- B. 21
- C. 22
- D. 443

**เฉลย: D** — HTTPS ใช้ Port 443, HTTP ใช้ Port 80

---

**ข้อ 5.** Protocol ใดทำให้ Router แลกเปลี่ยน Route ได้อัตโนมัติ?
- A. DHCP
- B. DNS
- C. OSPF
- D. SNMP

**เฉลย: C** — OSPF เป็น Dynamic Routing Protocol ที่ Router แลก Route กันอัตโนมัติ

---

**ข้อ 6.** VLAN ช่วยแก้ปัญหาใด?
- A. เพิ่มความเร็ว Internet
- B. แบ่ง Broadcast Domain
- C. เพิ่ม Bandwidth
- D. ป้องกัน Virus

**เฉลย: B** — VLAN แบ่ง Broadcast Domain ทำให้ Traffic ไม่รบกวนกัน

---

**ข้อ 7.** MAC Flapping เกิดจากอะไร?
- A. CPU ของ Router ทำงานหนัก
- B. Loop ใน Layer 2 Network
- C. DNS ใช้งานไม่ได้
- D. Bandwidth เกิน

**เฉลย: B** — MAC Flapping มักเกิดจาก Layer 2 Loop ที่ STP ไม่ได้ Block`;
  }

  /* ── RCA ──────────────────────────────────────────────────── */
  if (mode === "rca") {
    return `## Root Cause Analysis (RCA) Draft

---

### INCIDENT TITLE
${lower.includes("internet") ? "Internet ใช้งานไม่ได้ทั้งสาขา" : lower.includes("vlan") ? "VLAN Outage — ผู้ใช้ใน VLAN 20 ใช้งานไม่ได้" : "Network Incident — [ระบุชื่อ Incident]"}

### IMPACT
- **ผู้ใช้ที่ได้รับผลกระทบ**: ประมาณ 200 คน / ทั้งแผนก [ระบุแผนก]
- **ระบบที่ได้รับผลกระทบ**: Internet, Cloud Service, Internal System
- **ระยะเวลา**: เริ่ม 09:00 — แก้ไขสำเร็จ 09:45 (รวม 45 นาที)
- **ความรุนแรง**: High / Critical

### TIMELINE
| เวลา | เหตุการณ์ |
|------|----------|
| 09:00 | ผู้ใช้แจ้งปัญหา Internet ใช้งานไม่ได้ |
| 09:05 | Team ตรวจสอบ Monitoring — พบ Alert |
| 09:10 | ตรวจสอบ Gateway และ Firewall |
| 09:20 | พบ Default Route หายไปจาก Routing Table |
| 09:25 | วิเคราะห์สาเหตุ — Config Change ก่อนหน้า |
| 09:35 | แก้ไข Default Route |
| 09:45 | ทดสอบและยืนยัน — ระบบกลับมาปกติ |

### ROOT CAUSE
Default Route บน Firewall ถูกเปลี่ยนระหว่าง Maintenance Change เมื่อคืน โดยไม่มีการ Post-Check หลัง Change ส่งผลให้ Traffic ออก Internet ไม่ได้ตั้งแต่เช้า

### CONTRIBUTING FACTORS
- ไม่มี Change Review Process ที่รัดกุม
- ไม่มี Automated Monitoring ตรวจ Default Route
- Post-Check Checklist ไม่ครอบคลุม

### RESOLUTION
1. แก้ไข Default Route บน Firewall ให้ชี้ไป Internet Gateway ที่ถูกต้อง
2. ยืนยัน Ping และเปิดเว็บได้จากทุก VLAN
3. ตรวจสอบ Monitoring แสดงค่าปกติ

### PREVENTION ACTIONS
- [ ] เพิ่ม Change Review Board สำหรับ Network Change
- [ ] สร้าง Automated Check — แจ้งเตือนทันทีเมื่อ Default Route หาย
- [ ] Backup Config ก่อน Change ทุกครั้ง
- [ ] Post-Check Checklist ต้องรวม Routing Table Verification
- [ ] ทดสอบ Internet Connectivity หลัง Change ทุกครั้ง
- [ ] จัด Training Change Management ให้ Team`;
  }

  return `ขออภัย ไม่สามารถประมวลผลคำขอได้ในขณะนี้ กรุณาลองใหม่อีกครั้งหรือเลือก Mode ที่ต้องการ`;
}
