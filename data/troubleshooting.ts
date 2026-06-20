/* ─── Types ─────────────────────────────────────────────────────── */
export type TroubleshootingSeverity = "Low" | "Medium" | "High" | "Critical";
export type TroubleshootingLevel    = "Beginner" | "Intermediate" | "Advanced";
export type CommandPlatform         = "Windows" | "Linux" | "Cisco" | "Firewall" | "General";

export interface TroubleshootingCommand {
  title:       string;
  command:     string;
  platform:    CommandPlatform;
  description: string;
}

export interface TroubleshootingFlowStep {
  step:           number;
  title:          string;
  description:    string;
  checkCommand?:  string;
  expectedResult: string;
  ifFailed:       string;
}

export interface DecisionTreeNode {
  question: string;
  yes:      string;
  no:       string;
}

export interface RcaTemplate {
  incidentTitle: string;
  impact:        string;
  timeline:      string[];
  rootCause:     string;
  resolution:    string;
  prevention:    string[];
}

export interface TroubleshootingGuide {
  id:                  string;
  title:               string;
  category:            string;
  severity:            TroubleshootingSeverity;
  level:               TroubleshootingLevel;
  description:         string;
  symptoms:            string[];
  possibleCauses:      string[];
  flowSteps:           TroubleshootingFlowStep[];
  commands:            TroubleshootingCommand[];
  decisionTree:        DecisionTreeNode[];
  rootCauseExamples:   string[];
  fixActions:          string[];
  verificationSteps:   string[];
  escalation:          string[];
  rcaTemplate:         RcaTemplate;
  relatedLabs:         string[];
  relatedCourses:      string[];
}

/* ─── Data ──────────────────────────────────────────────────────── */
export const troubleshootingGuides: TroubleshootingGuide[] = [

  /* 1 ─ Internet ใช้งานไม่ได้ ────────────────────────────────────── */
  {
    id:          "internet-not-working",
    title:       "Internet ใช้งานไม่ได้",
    category:    "Connectivity",
    severity:    "High",
    level:       "Beginner",
    description: "Flow สำหรับไล่ปัญหาเมื่อผู้ใช้แจ้งว่า Internet ใช้งานไม่ได้ เช่น เปิดเว็บไม่ได้, เข้าเว็บช้า, ใช้งานระบบ Cloud ไม่ได้",
    symptoms: [
      "เปิดเว็บไซต์ไม่ได้",
      "Ping 8.8.8.8 ไม่ได้",
      "เปิดบางเว็บได้ บางเว็บไม่ได้",
      "เครื่องเดียวใช้งานไม่ได้ แต่คนอื่นใช้งานได้",
      "ทั้งแผนกใช้งาน Internet ไม่ได้",
    ],
    possibleCauses: [
      "เครื่องไม่ได้รับ IP Address",
      "Default Gateway ผิด",
      "DNS ใช้งานไม่ได้",
      "Switch Port Down",
      "VLAN ผิด",
      "DHCP Server มีปัญหา",
      "Firewall Block Traffic",
      "Internet Link Down",
      "Routing ผิด",
      "Proxy หรือ Security Agent มีปัญหา",
    ],
    flowSteps: [
      {
        step: 1, title: "ตรวจสอบ Scope ของปัญหา",
        description:    "เช็กก่อนว่าเป็นเครื่องเดียว หลายเครื่อง ทั้งแผนก หรือทั้ง Site",
        expectedResult: "รู้ขอบเขตของปัญหาเพื่อแยกว่าเป็น Client issue หรือ Network issue",
        ifFailed:       "สอบถามผู้ใช้เพิ่ม และตรวจสอบจาก Monitoring หรือ Ticket อื่น ๆ",
      },
      {
        step: 2, title: "ตรวจสอบ IP Address",
        description:    "ดูว่าเครื่องได้รับ IP, Subnet Mask, Gateway และ DNS ถูกต้องหรือไม่",
        checkCommand:   "ipconfig /all",
        expectedResult: "เครื่องต้องได้ IP ในวงที่ถูกต้อง และมี Default Gateway",
        ifFailed:       "ตรวจสอบ DHCP, VLAN, Switch Port หรือ Static IP ที่ตั้งผิด",
      },
      {
        step: 3, title: "Ping Default Gateway",
        description:    "ทดสอบว่าเครื่องสื่อสารกับ Gateway ในวงตัวเองได้หรือไม่",
        checkCommand:   "ping <default-gateway>",
        expectedResult: "ต้อง Ping Gateway ได้",
        ifFailed:       "ตรวจสอบสาย LAN, Wi-Fi, Switch Port, VLAN หรือ Gateway Interface",
      },
      {
        step: 4, title: "Ping Public IP",
        description:    "ทดสอบว่าเครื่องออก Internet ด้วย IP ได้หรือไม่",
        checkCommand:   "ping 8.8.8.8",
        expectedResult: "ถ้า Ping ได้ แปลว่า Routing/Internet อาจยังใช้งานได้",
        ifFailed:       "ตรวจสอบ Firewall, NAT, Default Route หรือ Internet Link",
      },
      {
        step: 5, title: "ตรวจสอบ DNS",
        description:    "ถ้า Ping IP ได้ แต่เปิดเว็บไม่ได้ ให้ตรวจ DNS",
        checkCommand:   "nslookup google.com",
        expectedResult: "DNS ต้อง Resolve ชื่อเว็บเป็น IP ได้",
        ifFailed:       "เปลี่ยน DNS, ตรวจ DNS Server หรือ Firewall ที่ Block DNS",
      },
    ],
    commands: [
      { title: "ดู IP Address",        command: "ipconfig /all",             platform: "Windows", description: "ใช้ดู IP, Subnet Mask, Gateway, DNS และ MAC Address ของเครื่อง" },
      { title: "ทดสอบ Gateway",        command: "ping <default-gateway>",    platform: "Windows", description: "ใช้ตรวจสอบว่าเครื่องติดต่อ Gateway ได้หรือไม่" },
      { title: "ทดสอบ Internet",       command: "ping 8.8.8.8",              platform: "General", description: "ใช้แยกว่าออก Internet ได้หรือไม่โดยไม่พึ่ง DNS" },
      { title: "ตรวจ DNS",             command: "nslookup google.com",       platform: "Windows", description: "ใช้ตรวจสอบว่า DNS Resolve ชื่อเว็บไซต์ได้หรือไม่" },
      { title: "ดูเส้นทาง",            command: "tracert 8.8.8.8",           platform: "Windows", description: "ใช้ดูว่า Packet ไปติดที่ Hop ไหน" },
      { title: "ดู Switch Port",       command: "show interfaces status",    platform: "Cisco",   description: "ใช้ตรวจสอบว่า Port up/down และอยู่ VLAN ใด" },
      { title: "ดู VLAN",              command: "show vlan brief",           platform: "Cisco",   description: "ใช้ตรวจสอบ VLAN และ Port Assignment" },
    ],
    decisionTree: [
      { question: "เครื่องได้รับ IP Address หรือไม่?",  yes: "ไปตรวจสอบ Gateway",           no: "ตรวจ DHCP, VLAN และ Switch Port" },
      { question: "Ping Gateway ได้หรือไม่?",            yes: "ไปตรวจสอบ Internet หรือ DNS", no: "ตรวจสาย, Wi-Fi, VLAN, Switch Port และ Gateway Interface" },
      { question: "Ping 8.8.8.8 ได้หรือไม่?",           yes: "ตรวจ DNS",                     no: "ตรวจ Firewall, NAT, Routing หรือ Internet Link" },
      { question: "nslookup ใช้งานได้หรือไม่?",         yes: "ตรวจ Browser, Proxy หรือ Security Agent", no: "ตรวจ DNS Server หรือ Firewall Rule สำหรับ DNS" },
    ],
    rootCauseExamples: [
      "DHCP Scope เต็ม ทำให้เครื่องไม่ได้รับ IP",
      "Switch Port ถูกย้ายไป VLAN ผิด",
      "Firewall Policy Block DNS",
      "Default Route บน Firewall หาย",
      "Internet Link ของ ISP Down",
    ],
    fixActions: [
      "แก้ VLAN ของ Switch Port ให้ถูกต้อง",
      "Restart หรือแก้ไข DHCP Service",
      "เพิ่ม DHCP Scope ถ้า IP เต็ม",
      "แก้ DNS Server ให้ถูกต้อง",
      "ตรวจ Firewall Policy และ NAT",
      "Failover ไป Backup Internet Link ถ้า Link หลักล่ม",
    ],
    verificationSteps: [
      "เครื่องได้รับ IP Address ถูกต้อง",
      "Ping Gateway ได้",
      "Ping 8.8.8.8 ได้",
      "nslookup เว็บไซต์ได้",
      "เปิดเว็บไซต์ได้",
      "Monitoring แสดง Link และ Gateway ปกติ",
      "ผู้ใช้ยืนยันว่าใช้งานได้",
    ],
    escalation: [
      "ถ้าเป็นเครื่องเดียว ให้ส่งต่อ IT Support ตรวจเครื่องผู้ใช้",
      "ถ้าเป็นทั้ง VLAN ให้ส่งต่อ Network Engineer",
      "ถ้า Firewall หรือ NAT มีปัญหา ให้ส่งต่อ Security/Firewall Engineer",
      "ถ้า Internet Link Down ให้เปิด Case กับ ISP",
      "ถ้ามีผลกระทบทั้ง Site ให้ประกาศ Incident และเปิด War Room",
    ],
    rcaTemplate: {
      incidentTitle: "Internet ใช้งานไม่ได้",
      impact:        "ผู้ใช้ไม่สามารถใช้งาน Internet และระบบ Cloud ได้",
      timeline: [
        "09:00 ผู้ใช้แจ้งปัญหา",
        "09:05 ตรวจสอบ Scope พบกระทบทั้งแผนก",
        "09:10 ตรวจสอบ Gateway และ Firewall",
        "09:20 พบ Default Route ผิด",
        "09:30 แก้ไข Route และทดสอบสำเร็จ",
      ],
      rootCause:  "Default Route บน Firewall ถูกเปลี่ยนระหว่าง Change ก่อนหน้า",
      resolution: "แก้ไข Default Route ให้ชี้ไป Internet Gateway ที่ถูกต้อง",
      prevention: [
        "เพิ่ม Change Review",
        "Backup Config ก่อน Change",
        "เพิ่ม Monitoring ตรวจ Default Route",
        "ทำ Post-check หลัง Change ทุกครั้ง",
      ],
    },
    relatedLabs:    ["basic-ip", "dhcp-troubleshoot"],
    relatedCourses: ["network-fundamentals", "network-troubleshooting"],
  },

  /* 2 ─ Wi-Fi หลุดบ่อย ────────────────────────────────────────────── */
  {
    id:          "wifi-drops-frequently",
    title:       "Wi-Fi หลุดบ่อย",
    category:    "Wireless",
    severity:    "Medium",
    level:       "Beginner",
    description: "แก้ปัญหา Wi-Fi ที่หลุดเป็นช่วง ๆ, สัญญาณไม่เสถียร หรือ Roaming ทำงานผิดพลาด",
    symptoms: [
      "Wi-Fi หลุดและต่อใหม่เองบ่อย ๆ",
      "Speed ช้าผิดปกติ",
      "มีเพียงบางจุดที่มีปัญหา",
      "Video Call / Streaming กระตุก",
      "เครื่องเห็น SSID แต่ต่อไม่ได้",
    ],
    possibleCauses: [
      "Channel Interference จาก Wi-Fi เพื่อนบ้าน",
      "AP Power Too High/Low",
      "Roaming ไม่ตรงจุด (Sticky Client)",
      "DHCP Lease หมดแล้วไม่ Renew",
      "Driver ของ Wi-Fi Card มีปัญหา",
      "AP ล้นจาก Client มากเกินไป",
      "RF Interference จากอุปกรณ์อื่น",
      "SSID Config ผิดบน AP",
    ],
    flowSteps: [
      { step: 1, title: "ระบุขอบเขตปัญหา", description: "ตรวจว่าเป็นเครื่องเดียว ทุกเครื่อง หรือเฉพาะพื้นที่", expectedResult: "รู้ว่าปัญหาอยู่ที่ Client หรือ AP/Network", ifFailed: "ทดสอบด้วยหลายเครื่องในหลายจุด" },
      { step: 2, title: "ตรวจสัญญาณ Wi-Fi (RSSI)", description: "วัดค่า Signal Strength บริเวณที่มีปัญหา", checkCommand: "netsh wlan show interfaces", expectedResult: "Signal ควรอยู่ที่ -70 dBm หรือดีกว่า", ifFailed: "ตรวจสอบตำแหน่ง AP และ Power Level" },
      { step: 3, title: "ตรวจ Channel Utilization", description: "ดูว่า Channel ที่ใช้อยู่มี Interference มากไหม", checkCommand: "ใช้ Wi-Fi Analyzer App", expectedResult: "Channel ควรไม่แออัด ไม่ซ้อนกับ AP อื่น", ifFailed: "เปลี่ยน Channel หรือตั้ง Auto Channel" },
      { step: 4, title: "ตรวจ AP Log", description: "ดู Log ของ AP ว่ามี Disconnect, Deauth หรือ Roam อะไรผิดปกติ", expectedResult: "ไม่มี Error ซ้ำ ๆ เกิน 5 ครั้ง/ชั่วโมง", ifFailed: "ตรวจสอบ SSID Config, Security, และ DHCP" },
      { step: 5, title: "ทดสอบ DHCP Renewal", description: "บังคับ Renew IP เพื่อดูว่าปัญหาเกิดจาก DHCP", checkCommand: "ipconfig /release && ipconfig /renew", expectedResult: "เครื่องได้รับ IP ใหม่ภายใน 10 วินาที", ifFailed: "ตรวจ DHCP Server และ DHCP Lease Time" },
    ],
    commands: [
      { title: "ดูสถานะ Wi-Fi",         command: "netsh wlan show interfaces",  platform: "Windows", description: "แสดง SSID, Channel, Signal, Speed ปัจจุบัน" },
      { title: "ดู Wi-Fi Profile",       command: "netsh wlan show profiles",     platform: "Windows", description: "แสดง Wi-Fi Profile ทั้งหมดที่เคย Connect" },
      { title: "Release & Renew IP",     command: "ipconfig /release && ipconfig /renew", platform: "Windows", description: "บังคับ Renew IP Address จาก DHCP" },
      { title: "ดู AP Client Count",     command: "show wireless summary",        platform: "Cisco",   description: "แสดงจำนวน Client ต่อ AP บน Cisco WLC" },
      { title: "ดู AP Neighbor",         command: "show ap auto-rf 802.11a",      platform: "Cisco",   description: "แสดง Channel และ Power ของ AP ข้างเคียง" },
    ],
    decisionTree: [
      { question: "เป็นทุกเครื่องในพื้นที่เดียวกันหรือไม่?", yes: "ปัญหาอยู่ที่ AP หรือ Channel", no: "ปัญหาอยู่ที่ Client หรือ Driver" },
      { question: "Signal อยู่ที่ -70 dBm หรือดีกว่าไหม?",   yes: "ตรวจ Channel Interference",   no: "ปัญหาเรื่องสัญญาณ ตรวจ AP Position หรือ Power" },
      { question: "AP มี Client เกิน Limit ไหม?",             yes: "เพิ่ม AP หรือ Load Balance",  no: "ตรวจ DHCP, Auth และ RF Interference" },
    ],
    rootCauseExamples: [
      "Channel 6 ถูกใช้โดย AP ข้างเคียง 5 ตัว ทำให้ Interference สูง",
      "DHCP Lease ตั้งไว้ 1 ชั่วโมง เมื่อ Expire Client ไม่ Renew ทัน",
      "AP ตั้ง Power สูงเกิน ทำให้ Client ไม่ Roam ไปยัง AP ที่ใกล้กว่า",
    ],
    fixActions: [
      "เปลี่ยน Channel Wi-Fi เป็น Non-overlapping (1, 6, 11 สำหรับ 2.4GHz)",
      "ตั้ง DHCP Lease Time ให้นานพอ (8-24 ชั่วโมง)",
      "ลด AP Power ลงเพื่อให้ Roaming ทำงานดีขึ้น",
      "ตรวจสอบ Driver ของ Wi-Fi Card และ Update",
      "เพิ่ม AP ถ้า Client Count เกิน Limit",
    ],
    verificationSteps: [
      "Wi-Fi เสถียร ไม่หลุดเกิน 30 นาที",
      "Signal อยู่ที่ -65 dBm หรือดีกว่าในพื้นที่ที่ต้องการ",
      "Channel ไม่ Overlap กับ AP ข้างเคียง",
      "DHCP Renew ปกติ",
      "ผู้ใช้ยืนยันว่าใช้งานได้",
    ],
    escalation: [
      "ถ้าปัญหาเป็นทั้ง Floor ให้ส่งต่อ Wi-Fi Engineer ตรวจ RF Survey",
      "ถ้า AP Crash บ่อย ให้ส่งต่อ Vendor Support",
      "ถ้าเป็นปัญหา Roaming ขนาดใหญ่ ให้ปรึกษา Wi-Fi Architecture Review",
    ],
    rcaTemplate: {
      incidentTitle: "Wi-Fi หลุดบ่อยในห้องประชุม",
      impact:        "ประชุม Video Call ไม่ได้ กระทบการประชุมสำคัญ",
      timeline: ["10:00 แจ้งปัญหา", "10:10 ตรวจ Signal พบ RSSI -80 dBm", "10:20 พบ Channel 6 ถูกใช้ 4 AP", "10:30 เปลี่ยน Channel เป็น 11", "10:40 ปัญหาหายไป"],
      rootCause:  "AP ในห้องประชุมใช้ Channel ซ้ำกับ AP ข้างเคียง ทำให้ Co-Channel Interference สูง",
      resolution: "เปลี่ยน Channel AP เป็น Channel 11 และลด Power ลง 3 dB",
      prevention: ["ทำ RF Survey ทุก 6 เดือน", "ตั้ง Auto-RF บน WLC", "ตรวจ Channel Utilization ผ่าน Monitoring"],
    },
    relatedLabs:    [],
    relatedCourses: ["network-fundamentals", "network-troubleshooting"],
  },

  /* 3 ─ VLAN ใช้งานไม่ได้ ─────────────────────────────────────────── */
  {
    id:          "vlan-not-working",
    title:       "VLAN ใช้งานไม่ได้",
    category:    "Switching",
    severity:    "High",
    level:       "Intermediate",
    description: "ไล่ปัญหาเมื่อ VLAN ใหม่ใช้งานไม่ได้ หรือ Device ใน VLAN เดียวกันคุยกันไม่ได้",
    symptoms: [
      "เครื่องใน VLAN เดียวกัน Ping กันไม่ได้",
      "เครื่องได้รับ IP ผิด VLAN หรือไม่ได้รับ IP เลย",
      "Port ที่เพิ่งย้ายไป VLAN ใหม่ ใช้งานไม่ได้",
      "Trunk Port ไม่ผ่าน VLAN บางตัว",
      "Inter-VLAN Routing ใช้งานไม่ได้",
    ],
    possibleCauses: [
      "VLAN ไม่ถูก Create บน Switch",
      "Access Port ถูกตั้ง VLAN ผิด",
      "Trunk Port ไม่ได้ Allow VLAN นั้น",
      "Native VLAN ไม่ตรงกันระหว่าง Switch",
      "SVI (Layer 3 Interface) ของ VLAN ไม่ถูก Configure",
      "DHCP Scope ของ VLAN ใหม่ยังไม่ได้สร้าง",
      "VLAN Pruning บน Trunk ตัด VLAN ออก",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจสอบว่า VLAN ถูก Create",    description: "ตรวจสอบ VLAN Database บน Switch",                checkCommand: "show vlan brief",              expectedResult: "VLAN ต้องปรากฏในรายการและสถานะ active", ifFailed: "สร้าง VLAN: vlan [id] → name [name]" },
      { step: 2, title: "ตรวจสอบ Access Port",            description: "ตรวจว่า Port ถูกตั้งเป็น VLAN ที่ถูกต้อง",        checkCommand: "show interfaces [int] switchport", expectedResult: "Access Mode VLAN ต้องตรงกับที่ต้องการ",   ifFailed: "แก้ไข: switchport access vlan [id]" },
      { step: 3, title: "ตรวจ Trunk Port",                description: "ตรวจว่า Trunk Allow VLAN นั้น",                  checkCommand: "show interfaces trunk",         expectedResult: "VLAN ต้องอยู่ใน VLANs allowed and active", ifFailed: "เพิ่ม: switchport trunk allowed vlan add [id]" },
      { step: 4, title: "ตรวจ Native VLAN",               description: "ตรวจว่า Native VLAN ตรงกันทั้ง 2 ฝั่ง Trunk",   checkCommand: "show interfaces trunk",         expectedResult: "Native VLAN ต้องตรงกันทั้ง 2 ฝั่ง",         ifFailed: "แก้ไข: switchport trunk native vlan [id]" },
      { step: 5, title: "ตรวจ SVI และ DHCP (Inter-VLAN)", description: "ตรวจว่ามี Layer 3 Interface และ DHCP Pool",      checkCommand: "show ip interface brief",       expectedResult: "SVI ต้อง Up/Up และมี IP ถูกต้อง",           ifFailed: "สร้าง SVI: interface vlan [id] → ip address..." },
    ],
    commands: [
      { title: "ดู VLAN ทั้งหมด",       command: "show vlan brief",                          platform: "Cisco",   description: "แสดง VLAN ID, Name, Status และ Ports" },
      { title: "ดู Switchport Config",  command: "show interfaces [interface] switchport",   platform: "Cisco",   description: "แสดง Mode, Access VLAN, Trunk Config" },
      { title: "ดู Trunk Status",       command: "show interfaces trunk",                    platform: "Cisco",   description: "แสดง Trunk Ports, VLANs allowed และ active" },
      { title: "ดู Interface Status",   command: "show ip interface brief",                  platform: "Cisco",   description: "แสดงสถานะ Interface ทั้งหมดรวม SVI" },
      { title: "ดู MAC Table",          command: "show mac address-table vlan [id]",         platform: "Cisco",   description: "แสดง MAC ที่ Switch เรียนรู้ใน VLAN นั้น" },
    ],
    decisionTree: [
      { question: "VLAN ปรากฏใน show vlan brief หรือไม่?",       yes: "ตรวจ Access Port",        no: "สร้าง VLAN ก่อน: vlan [id]" },
      { question: "Access Port ถูกตั้ง VLAN ถูกต้องหรือไม่?",    yes: "ตรวจ Trunk",              no: "แก้ไข: switchport access vlan [id]" },
      { question: "VLAN อยู่ใน Trunk Allowed List หรือไม่?",      yes: "ตรวจ Native VLAN / SVI",  no: "เพิ่ม VLAN บน Trunk" },
      { question: "SVI Up/Up หรือไม่? (Inter-VLAN)",              yes: "ตรวจ DHCP Scope",         no: "สร้าง SVI และ IP Address" },
    ],
    rootCauseExamples: [
      "VLAN 30 ถูกสร้างบน Switch A แต่ไม่ได้สร้างบน Switch B ทำให้ Trunk ไม่ส่งผ่าน",
      "Trunk Port ตั้ง allowed vlan 10,20 แต่ลืมเพิ่ม VLAN 30",
      "Native VLAN ของ Switch 2 ตัวไม่ตรงกัน ทำให้ Traffic ผิด VLAN",
    ],
    fixActions: [
      "สร้าง VLAN บนทุก Switch ที่เกี่ยวข้อง",
      "เพิ่ม VLAN บน Trunk: switchport trunk allowed vlan add [id]",
      "แก้ Access Port: switchport access vlan [id]",
      "ตรวจและแก้ Native VLAN ให้ตรงกัน",
      "สร้าง DHCP Pool สำหรับ VLAN ใหม่",
      "สร้าง SVI ถ้าต้องการ Inter-VLAN Routing",
    ],
    verificationSteps: [
      "VLAN ปรากฏใน show vlan brief สถานะ active",
      "Port ถูก Assign ใน VLAN ที่ถูกต้อง",
      "Trunk Allow VLAN นั้น",
      "เครื่องได้รับ IP จาก VLAN ที่ถูกต้อง",
      "Ping ระหว่างเครื่องใน VLAN เดียวกันได้",
      "Inter-VLAN Routing ทำงานถ้าต้องการ",
    ],
    escalation: [
      "ถ้าปัญหาเกิดจาก STP ให้ส่งต่อ Senior Network Engineer",
      "ถ้ามี VTP Mismatch ทั้ง Network ให้ประเมิน Impact ก่อน",
    ],
    rcaTemplate: {
      incidentTitle: "VLAN 30 ใช้งานไม่ได้หลัง Add Switch ใหม่",
      impact:        "เครื่องใน VLAN 30 ทั้งหมด (25 เครื่อง) ไม่มีเน็ต",
      timeline: ["14:00 เพิ่ม Switch ใหม่", "14:30 แจ้งปัญหา VLAN 30 ไม่ได้", "14:35 ตรวจ show vlan brief", "14:40 พบ VLAN 30 ไม่ถูก Create บน Switch ใหม่", "14:45 สร้าง VLAN 30 และปัญหาหาย"],
      rootCause:  "ลืมสร้าง VLAN 30 บน Switch ใหม่ระหว่าง Deployment",
      resolution: "สร้าง VLAN 30 บน Switch ใหม่และ Verify Trunk",
      prevention: ["สร้าง Switch Deployment Checklist", "ใช้ VTP (ถ้าเหมาะสม)", "ทดสอบ VLAN ทุกตัวหลัง Deployment"],
    },
    relatedLabs:    ["vlan-config", "trunk-port"],
    relatedCourses: ["switching-essentials", "vlan-trunk"],
  },

  /* 4 ─ DHCP แจก IP ไม่ได้ ────────────────────────────────────────── */
  {
    id:          "dhcp-not-working",
    title:       "DHCP แจก IP ไม่ได้",
    category:    "Services",
    severity:    "High",
    level:       "Intermediate",
    description: "ไล่ปัญหาเมื่อเครื่อง Client ไม่ได้รับ IP Address จาก DHCP Server หรือได้รับ IP 169.254.x.x (APIPA)",
    symptoms: [
      "เครื่องได้รับ IP 169.254.x.x (APIPA)",
      "เครื่องไม่ได้รับ IP เลย",
      "บางเครื่องได้รับ IP บางเครื่องไม่ได้",
      "IP Address ซ้ำกัน (Conflict)",
      "DHCP Lease หมดแล้ว Renew ไม่ได้",
    ],
    possibleCauses: [
      "DHCP Scope เต็ม (IP หมด)",
      "DHCP Service หยุดทำงาน",
      "DHCP Helper-Address (IP Relay) ไม่ได้ตั้ง",
      "Firewall Block UDP 67/68",
      "VLAN ผิด ทำให้ DHCP Discover ไม่ถึง Server",
      "DHCP Scope ผิด Subnet",
      "Rogue DHCP Server แจก IP ผิด",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจ IP ที่เครื่องได้รับ",       description: "ดูว่าได้รับ APIPA หรือไม่ได้รับเลย",                checkCommand: "ipconfig /all",         expectedResult: "เครื่องควรได้รับ IP ในวงที่ถูกต้อง ไม่ใช่ 169.254.x.x", ifFailed: "DHCP ไม่ตอบสนอง ตรวจ Server และ Network" },
      { step: 2, title: "ตรวจ DHCP Service",               description: "ตรวจสอบว่า DHCP Service ยังทำงานอยู่",               checkCommand: "show ip dhcp pool",     expectedResult: "DHCP Pool ต้อง Active และมี IP เหลือ",                     ifFailed: "Restart DHCP Service หรือเพิ่ม Scope" },
      { step: 3, title: "ตรวจ DHCP Helper-Address",        description: "ถ้า DHCP ต่าง Subnet ต้องมี IP Relay",               checkCommand: "show run interface [int]", expectedResult: "ต้องมี ip helper-address [dhcp-server-ip]",               ifFailed: "เพิ่ม ip helper-address บน Interface Gateway" },
      { step: 4, title: "ตรวจ DHCP Lease ที่เหลือ",        description: "ดูว่า IP Pool ยังมี Address ว่างอยู่หรือไม่",          checkCommand: "show ip dhcp pool",     expectedResult: "ต้องมี Available IP > 0",                                  ifFailed: "เพิ่ม Scope หรือลด Lease Time" },
      { step: 5, title: "ตรวจ Rogue DHCP",                 description: "ตรวจว่ามี DHCP Server ที่ไม่ได้รับอนุญาตแจก IP ด้วย", checkCommand: "show ip dhcp conflict",  expectedResult: "ไม่มี IP Conflict",                                         ifFailed: "หา Rogue DHCP Server และ Disable" },
    ],
    commands: [
      { title: "ดู DHCP Pool",        command: "show ip dhcp pool",                platform: "Cisco",   description: "แสดง Pool Name, Subnet, Range, Leases" },
      { title: "ดู DHCP Binding",     command: "show ip dhcp binding",             platform: "Cisco",   description: "แสดง IP ที่แจกออกไปแล้วพร้อม MAC" },
      { title: "ดู DHCP Conflict",    command: "show ip dhcp conflict",            platform: "Cisco",   description: "แสดง IP ที่มี Conflict" },
      { title: "ดู Helper Address",   command: "show run | include helper",        platform: "Cisco",   description: "แสดง IP Relay ที่ตั้งบน Interface" },
      { title: "Release/Renew",       command: "ipconfig /release && ipconfig /renew", platform: "Windows", description: "บังคับขอ IP ใหม่จาก DHCP" },
      { title: "ดู DHCP Server Log",  command: "Get-DhcpServerv4Statistics",       platform: "Windows", description: "ดูสถิติ DHCP Server บน Windows Server" },
    ],
    decisionTree: [
      { question: "เครื่องได้รับ IP 169.254.x.x หรือไม่?",        yes: "DHCP ไม่ตอบ ตรวจ Service และ Network", no: "ตรวจว่าเครื่องได้ IP ผิด Subnet" },
      { question: "DHCP Service ทำงานอยู่หรือไม่?",               yes: "ตรวจ Scope และ Helper-Address",        no: "Restart DHCP Service" },
      { question: "DHCP Pool มี IP เหลือหรือไม่?",                yes: "ตรวจ Helper-Address และ VLAN",          no: "เพิ่ม IP Range ใน Scope" },
      { question: "มี ip helper-address บน Interface หรือไม่?",   yes: "ตรวจ Firewall และ VLAN",               no: "เพิ่ม ip helper-address [server-ip]" },
    ],
    rootCauseExamples: [
      "DHCP Scope มี IP เพียง 50 ตัว แต่มีเครื่องใช้ 60 ตัว",
      "ลืมตั้ง ip helper-address หลัง Add VLAN ใหม่",
      "มี Rogue DHCP Server จากเครื่อง PC ที่ใช้ Internet Sharing",
    ],
    fixActions: [
      "เพิ่ม IP Range ใน DHCP Scope",
      "Restart DHCP Service",
      "ตั้ง ip helper-address บน Interface",
      "หาและปิด Rogue DHCP Server",
      "ลด Lease Time เพื่อคืน IP เร็วขึ้น",
    ],
    verificationSteps: [
      "เครื่องได้รับ IP ในวงที่ถูกต้อง",
      "DHCP Pool มี Available Leases เพียงพอ",
      "ไม่มี IP Conflict",
      "Ping Gateway ได้",
      "Ping Internet ได้",
    ],
    escalation: [
      "ถ้า DHCP Service Crash บ่อย ให้ตรวจ Windows Event Log",
      "ถ้ามี Rogue DHCP ให้แจ้ง Security Team ตรวจสอบ",
    ],
    rcaTemplate: {
      incidentTitle: "DHCP แจก IP ไม่ได้ในชั้น 3",
      impact:        "เครื่อง 30 เครื่องในชั้น 3 ไม่ได้รับ IP ใช้งานไม่ได้",
      timeline: ["08:00 แจ้งปัญหา", "08:10 ตรวจสอบพบ APIPA", "08:15 ตรวจ DHCP Pool พบ IP เต็ม", "08:20 เพิ่ม Scope และ Release Lease เก่า", "08:30 ปกติ"],
      rootCause:  "DHCP Scope ไม่ได้ขยายตาม Growth ของเครื่องใหม่ที่เพิ่มมา",
      resolution: "เพิ่ม IP Range จาก /24 เป็น /23 และ Clear Lease เก่า",
      prevention: ["ตั้ง Alert เมื่อ DHCP ใช้เกิน 80%", "Review DHCP Scope ทุกไตรมาส"],
    },
    relatedLabs:    ["dhcp-troubleshoot"],
    relatedCourses: ["network-fundamentals", "network-troubleshooting"],
  },

  /* 5 ─ DNS ใช้งานไม่ได้ ──────────────────────────────────────────── */
  {
    id:          "dns-not-working",
    title:       "DNS ใช้งานไม่ได้",
    category:    "Services",
    severity:    "High",
    level:       "Beginner",
    description: "ไล่ปัญหาเมื่อ DNS Resolution ล้มเหลว เปิดเว็บไม่ได้ทั้งที่ Ping IP ได้",
    symptoms: [
      "Ping IP ได้แต่เปิดเว็บไม่ได้",
      "nslookup แสดง Server failed",
      "บางชื่อ Resolve ได้ บางชื่อไม่ได้",
      "DNS ช้ามากทำให้เว็บโหลดนาน",
      "ระบบภายในหา Server ด้วยชื่อไม่ได้",
    ],
    possibleCauses: [
      "DNS Server ผิด IP",
      "DNS Service หยุดทำงาน",
      "Firewall Block UDP/TCP Port 53",
      "DNS Cache เก่า",
      "Split-DNS Config ผิด",
      "DNS Forwarder ใช้งานไม่ได้",
      "Internal DNS Zone มีปัญหา",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจ DNS Server ที่ตั้ง",       description: "ดูว่า DNS Server IP ถูกต้อง",                   checkCommand: "ipconfig /all",              expectedResult: "DNS Server ต้องเป็น IP ที่ถูกต้อง",      ifFailed: "แก้ DNS Server ใน Network Config หรือ DHCP" },
      { step: 2, title: "Test DNS Resolution",            description: "ทดสอบ DNS ด้วย nslookup และ dig",              checkCommand: "nslookup google.com 8.8.8.8", expectedResult: "ต้องได้รับ IP Address ของ Domain",       ifFailed: "ลอง DNS Server อื่น เช่น 8.8.8.8" },
      { step: 3, title: "Flush DNS Cache",                description: "ล้าง DNS Cache ที่อาจเก่าหรือผิดพลาด",         checkCommand: "ipconfig /flushdns",         expectedResult: "Cache ถูกล้าง",                          ifFailed: "ตรวจ DNS Service บน Server" },
      { step: 4, title: "ตรวจ DNS Service",               description: "ตรวจสอบว่า DNS Service ทำงานอยู่",              checkCommand: "nslookup [hostname] [dns-ip]", expectedResult: "Response ปกติภายใน 1 วินาที",           ifFailed: "Restart DNS Service หรือตรวจ Config" },
      { step: 5, title: "ตรวจ Firewall Port 53",          description: "ตรวจว่า Firewall ไม่ Block DNS",               expectedResult: "Port 53 UDP/TCP ต้องผ่านได้",               ifFailed: "เพิ่ม Rule ใน Firewall Allow DNS" },
    ],
    commands: [
      { title: "ตรวจ DNS Config",    command: "ipconfig /all",                  platform: "Windows", description: "ดู DNS Server IP ที่เครื่องใช้" },
      { title: "Test DNS",           command: "nslookup google.com",             platform: "Windows", description: "ทดสอบ DNS Resolution กับ Server ปัจจุบัน" },
      { title: "Test DNS อื่น",      command: "nslookup google.com 8.8.8.8",    platform: "Windows", description: "ทดสอบ DNS ผ่าน Google DNS โดยตรง" },
      { title: "Flush DNS",          command: "ipconfig /flushdns",             platform: "Windows", description: "ล้าง DNS Cache บนเครื่อง" },
      { title: "Test DNS (Linux)",   command: "dig google.com @8.8.8.8",        platform: "Linux",   description: "ทดสอบ DNS บน Linux" },
    ],
    decisionTree: [
      { question: "Ping IP ได้หรือไม่?",                    yes: "ปัญหาอยู่ที่ DNS",      no: "ตรวจ Routing และ Connectivity ก่อน" },
      { question: "nslookup ด้วย 8.8.8.8 ได้หรือไม่?",     yes: "DNS Server ภายในมีปัญหา", no: "Firewall Block Port 53 หรือ Internet มีปัญหา" },
      { question: "Flush DNS แล้วใช้งานได้หรือไม่?",        yes: "เป็นปัญหา DNS Cache",    no: "ตรวจ DNS Server Config" },
    ],
    rootCauseExamples: [
      "DNS Server ถูก Migrate ไป IP ใหม่แต่ลืมอัพเดต DHCP",
      "Firewall Rule ใหม่ Block Port 53 โดยไม่ตั้งใจ",
      "DNS Cache มีระยะเวลา TTL นาน ทำให้ IP เก่าค้างอยู่",
    ],
    fixActions: [
      "แก้ DNS Server IP ใน DHCP หรือ Network Config",
      "Restart DNS Service บน Server",
      "Flush DNS Cache บน Client",
      "เพิ่ม Firewall Rule Allow Port 53",
      "ตรวจและแก้ DNS Zone Record",
    ],
    verificationSteps: ["nslookup ทำงานปกติ", "เปิดเว็บได้", "ระบบภายในหา Server ด้วยชื่อได้", "DNS Response เร็วกว่า 100ms"],
    escalation: ["ถ้า DNS Zone มีปัญหา ให้ส่งต่อ DNS Admin", "ถ้าเป็น External DNS ให้ตรวจกับ ISP"],
    rcaTemplate: {
      incidentTitle: "DNS ใช้งานไม่ได้หลัง Migrate",
      impact:        "ผู้ใช้ทุกคนเปิดเว็บไม่ได้และระบบ Internal Application ใช้งานไม่ได้",
      timeline: ["09:00 Migrate DNS Server", "09:30 แจ้งปัญหา", "09:35 พบ DNS IP ใน DHCP ยังเป็น IP เก่า", "09:40 แก้ DHCP และ Renew Client", "10:00 ปกติ"],
      rootCause:  "ลืมอัพเดต DNS IP ใน DHCP Scope หลัง Migrate DNS Server",
      resolution: "แก้ DNS IP ใน DHCP Scope และ Renew IP ทุกเครื่อง",
      prevention: ["สร้าง Migration Checklist", "Test DNS จาก Client ทุกจุดหลัง Migrate"],
    },
    relatedLabs:    ["basic-ip"],
    relatedCourses: ["network-fundamentals", "network-troubleshooting"],
  },

  /* 6 ─ Ping Gateway ไม่ได้ ───────────────────────────────────────── */
  {
    id:          "cannot-ping-gateway",
    title:       "Ping Gateway ไม่ได้",
    category:    "Connectivity",
    severity:    "High",
    level:       "Beginner",
    description: "ไล่ปัญหาเมื่อ Ping Default Gateway ไม่ได้ซึ่งทำให้ออก Network ไม่ได้เลย",
    symptoms: [
      "Ping Gateway แล้ว Request Timed Out",
      "เครื่องได้รับ IP แต่ออก Internet ไม่ได้",
      "tracert หยุดที่ Hop แรก",
      "เครื่องทั้ง VLAN Ping Gateway ไม่ได้",
    ],
    possibleCauses: [
      "สาย LAN หลวมหรือเสีย",
      "Switch Port Down",
      "VLAN ผิดบน Switch Port",
      "Gateway Interface Down",
      "IP Gateway ตั้งผิดบน PC",
      "Firewall Block ICMP",
      "ARP ไม่ผ่าน",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจสาย LAN / LED",      description: "ดู LED บน Switch Port และที่ NIC",              expectedResult: "LED ต้องติด (Link Up)",                    ifFailed: "เปลี่ยนสาย หรือ Port Switch" },
      { step: 2, title: "ตรวจ Switch Port Status", description: "ดูว่า Port Up/Down และ VLAN ถูกต้อง",         checkCommand: "show interfaces status",  expectedResult: "Port Status: connected, VLAN ถูกต้อง",    ifFailed: "ตรวจ Port หรือย้าย Port ใหม่" },
      { step: 3, title: "ตรวจ Default Gateway",    description: "ดูว่า Gateway IP ที่ตั้งถูกต้อง",             checkCommand: "ipconfig /all",          expectedResult: "Default Gateway ต้องเป็น IP ของ Router",  ifFailed: "แก้ไข Gateway IP บนเครื่อง" },
      { step: 4, title: "ตรวจ Gateway Interface",  description: "ดูว่า Gateway Interface Up และ IP ถูกต้อง",  checkCommand: "show ip interface brief", expectedResult: "Interface ต้อง Up/Up และมี IP ถูกต้อง",    ifFailed: "ตรวจ Router Interface และ Config" },
      { step: 5, title: "ตรวจ ARP",               description: "ดูว่า ARP แปลง Gateway IP เป็น MAC ได้",     checkCommand: "arp -a",                 expectedResult: "ARP Table มี Gateway IP พร้อม MAC",        ifFailed: "ตรวจ VLAN และ Switch Config" },
    ],
    commands: [
      { title: "ดู IP / Gateway",       command: "ipconfig /all",                  platform: "Windows", description: "ดู IP, Subnet, Gateway ของเครื่อง" },
      { title: "Ping Gateway",          command: "ping <gateway-ip>",              platform: "General", description: "ทดสอบ Connectivity ไปยัง Gateway" },
      { title: "ดู ARP Table",          command: "arp -a",                         platform: "Windows", description: "ดู ARP Cache ว่า Gateway มี MAC หรือไม่" },
      { title: "ดู Switch Port",        command: "show interfaces status",         platform: "Cisco",   description: "ดูสถานะ Port ทั้งหมด" },
      { title: "ดู Gateway Interface",  command: "show ip interface brief",        platform: "Cisco",   description: "ดูสถานะ Interface บน Router" },
    ],
    decisionTree: [
      { question: "LED บน Switch Port ติดหรือไม่?",         yes: "ตรวจ VLAN และ Gateway",  no: "ตรวจสาย LAN หรือย้าย Port" },
      { question: "Switch Port Status Connected หรือไม่?",   yes: "ตรวจ Gateway IP",         no: "ตรวจสาย, NIC หรือ Port เสีย" },
      { question: "Gateway IP ถูกต้องหรือไม่?",             yes: "ตรวจ Gateway Interface",  no: "แก้ IP Gateway บนเครื่อง" },
      { question: "Gateway Interface Up/Up หรือไม่?",        yes: "ตรวจ Firewall / ICMP",    no: "ตรวจ Router Config หรือ Cable ที่ Router" },
    ],
    rootCauseExamples: [
      "สาย LAN หลวมที่ Patch Panel ทำให้ Link Down",
      "Switch Port อยู่ VLAN 999 แทนที่จะเป็น VLAN 10",
      "Gateway Interface Down เพราะ Router Reboot",
    ],
    fixActions: ["เปลี่ยนสาย LAN", "แก้ VLAN บน Switch Port", "แก้ IP Gateway บนเครื่อง", "ตรวจและ No Shutdown Gateway Interface"],
    verificationSteps: ["Ping Gateway ได้ Reply < 5ms", "tracert ผ่าน Gateway ได้", "Ping Internet ได้", "ผู้ใช้ยืนยันออก Internet ได้"],
    escalation: ["ถ้า Router Interface มีปัญหา ให้ส่งต่อ Senior Network Engineer", "ถ้า Switch Port เสีย ให้ Request Hardware Replacement"],
    rcaTemplate: {
      incidentTitle: "Ping Gateway ไม่ได้ในชั้น 5",
      impact:        "เครื่อง 15 เครื่องออก Internet ไม่ได้",
      timeline: ["11:00 แจ้งปัญหา", "11:05 ตรวจ Switch Port พบ VLAN 999", "11:10 แก้ VLAN เป็น VLAN 10", "11:15 ปกติ"],
      rootCause:  "Switch Port ถูกย้ายไป VLAN 999 ระหว่าง Test ก่อนหน้าและไม่ได้ Reset กลับ",
      resolution: "แก้ VLAN บน Switch Port เป็น VLAN ที่ถูกต้อง",
      prevention: ["ตรวจ Switch Config ก่อนและหลัง Test", "ใช้ Change Management"],
    },
    relatedLabs:    ["basic-ip"],
    relatedCourses: ["network-fundamentals", "routing-fundamentals"],
  },

  /* 7 ─ VPN ต่อไม่ได้ ─────────────────────────────────────────────── */
  {
    id:          "vpn-connection-failed",
    title:       "VPN ต่อไม่ได้",
    category:    "Security",
    severity:    "Medium",
    level:       "Intermediate",
    description: "ไล่ปัญหาเมื่อ VPN Client ต่อไม่ได้ หรือต่อได้แต่เข้าถึง Resource ภายในไม่ได้",
    symptoms: [
      "VPN Client Error: Connection Timeout",
      "Authentication Failed",
      "ต่อ VPN ได้แต่ Ping Server ภายในไม่ได้",
      "VPN ตัดเองบ่อย",
      "VPN ช้ามาก",
    ],
    possibleCauses: [
      "Firewall Block VPN Port (UDP 500, 4500, TCP 443)",
      "Username / Password ผิด",
      "Certificate หมดอายุ",
      "Split Tunnel Config ผิด",
      "DNS ภายใน VPN ไม่ทำงาน",
      "VPN Gateway IP ผิด",
      "MTU Size ไม่ถูกต้อง",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจ VPN Gateway",         description: "ตรวจว่า Ping VPN Gateway IP ได้",              checkCommand: "ping <vpn-gateway-ip>",    expectedResult: "Ping ได้",                              ifFailed: "ตรวจ Internet Connectivity และ DNS" },
      { step: 2, title: "ตรวจ Authentication",       description: "ทดสอบ Login ด้วย Credentials ที่ถูกต้อง",      expectedResult: "Authentication Successful",              ifFailed: "Reset Password หรือตรวจ MFA" },
      { step: 3, title: "ตรวจ Firewall Port",        description: "ตรวจว่า Port VPN ไม่ถูก Block",                expectedResult: "UDP 500/4500 หรือ TCP 443 ผ่านได้",     ifFailed: "เพิ่ม Firewall Rule Allow VPN Port" },
      { step: 4, title: "ตรวจ Routing หลัง Connect", description: "เมื่อต่อ VPN แล้ว ตรวจว่า Route ไป Internal ถูก", checkCommand: "route print",              expectedResult: "มี Route ไปหา Internal Network ผ่าน VPN", ifFailed: "ตรวจ Split Tunnel Config" },
      { step: 5, title: "ตรวจ DNS ใน VPN",          description: "ตรวจว่า DNS ใน VPN Resolve Internal ได้",       checkCommand: "nslookup [internal-host]", expectedResult: "Resolve Internal Hostname ได้",          ifFailed: "ตรวจ VPN DNS Config" },
    ],
    commands: [
      { title: "Ping VPN Gateway",    command: "ping <vpn-gateway>",           platform: "General", description: "ตรวจว่า VPN Gateway Reachable" },
      { title: "ดู Route Table",      command: "route print",                  platform: "Windows", description: "ดู Routing Table หลัง VPN Connect" },
      { title: "ดู VPN Status",       command: "show vpn-sessiondb anyconnect", platform: "Cisco",   description: "ดู Active VPN Session บน ASA" },
      { title: "ตรวจ Port VPN",       command: "telnet <vpn-gw> 443",          platform: "General", description: "ตรวจว่า TCP 443 ผ่านได้" },
    ],
    decisionTree: [
      { question: "Ping VPN Gateway ได้หรือไม่?",        yes: "ตรวจ Auth และ Firewall Port",   no: "ตรวจ Internet และ DNS ก่อน" },
      { question: "Authentication ผ่านหรือไม่?",         yes: "ตรวจ Routing และ DNS ใน VPN",   no: "Reset Password หรือตรวจ Certificate" },
      { question: "Route ไป Internal มีหรือไม่?",        yes: "Ping Internal Server ได้หรือไม่?", no: "ตรวจ Split Tunnel และ VPN Policy" },
    ],
    rootCauseExamples: [
      "Firewall Block UDP 4500 (NAT-T) ทำให้ IKEv2 ไม่ผ่าน",
      "VPN Certificate หมดอายุ Client Trust ไม่ได้",
      "Split Tunnel ตั้งผิด ทำให้ Traffic Internal ไม่เข้า VPN",
    ],
    fixActions: [
      "เพิ่ม Firewall Rule Allow UDP 500/4500",
      "Renew VPN Certificate",
      "แก้ Split Tunnel Config",
      "ตั้ง DNS Server ใน VPN Profile ให้ถูกต้อง",
    ],
    verificationSteps: ["VPN Connect สำเร็จ", "Ping Internal Server ได้", "เปิด Internal Web Application ได้", "DNS Internal Resolve ได้"],
    escalation: ["ถ้า Certificate มีปัญหา ส่งต่อ PKI / Security Team", "ถ้า VPN Gateway Down ส่งต่อ Firewall Engineer"],
    rcaTemplate: {
      incidentTitle: "VPN ต่อไม่ได้หลัง Firewall Upgrade",
      impact:        "พนักงาน WFH ทุกคน VPN ต่อไม่ได้ ทำงานจากบ้านไม่ได้",
      timeline: ["18:00 Upgrade Firewall", "09:00 แจ้งปัญหา VPN", "09:10 ตรวจ Firewall Rule", "09:20 พบ UDP 4500 ถูก Block", "09:25 เพิ่ม Rule และปกติ"],
      rootCause:  "Firewall Upgrade Reset Rule ที่ Allow UDP 4500 ทำให้ IKEv2 NAT-T ไม่ผ่าน",
      resolution: "เพิ่ม Firewall Rule Allow UDP 500 และ 4500 สำหรับ VPN",
      prevention: ["Export และ Verify Firewall Rule ก่อน Upgrade", "Test VPN หลัง Firewall Change ทุกครั้ง"],
    },
    relatedLabs:    ["acl-basic", "nat-basic"],
    relatedCourses: ["firewall-acl"],
  },

  /* 8 ─ Network ช้า ───────────────────────────────────────────────── */
  {
    id:          "network-slow",
    title:       "Network ช้าผิดปกติ",
    category:    "Performance",
    severity:    "Medium",
    level:       "Intermediate",
    description: "ไล่ปัญหาเมื่อ Network ช้า ทั้งใน LAN และออก Internet ทั้ง Download/Upload ลดลงผิดปกติ",
    symptoms: [
      "Web โหลดช้ามาก",
      "File Transfer ช้ากว่าปกติมาก",
      "Video Call กระตุก",
      "Ping มี High Latency",
      "Bandwidth ต่ำกว่าปกติ",
    ],
    possibleCauses: [
      "Bandwidth Saturation (ใช้ Traffic เต็ม)",
      "Duplex Mismatch",
      "High CPU บน Switch/Router",
      "Broadcast Storm",
      "Spanning Tree Topology Change",
      "QoS Config ผิด",
      "ISP Throttling",
      "CRC Error บน Interface",
    ],
    flowSteps: [
      { step: 1, title: "วัด Bandwidth จริง",      description: "ใช้ Speedtest ดู Throughput จริง",               checkCommand: "speedtest-cli หรือเปิด speedtest.net", expectedResult: "Speed ควรใกล้เคียง Subscribed Bandwidth", ifFailed: "ตรวจ ISP หรือ Link Utilization" },
      { step: 2, title: "ตรวจ Interface Utilization", description: "ดู Traffic บน Uplink Interface",              checkCommand: "show interfaces [uplink]",              expectedResult: "Utilization ไม่เกิน 80%",                ifFailed: "ตรวจ Traffic Heavy Hitter, ปรับ QoS" },
      { step: 3, title: "ตรวจ Interface Error",     description: "ดูว่ามี CRC / Input Error หรือไม่",              checkCommand: "show interfaces [int]",                 expectedResult: "Error Counter ไม่เพิ่มขึ้น",              ifFailed: "เปลี่ยนสายหรือ SFP" },
      { step: 4, title: "ตรวจ Duplex / Speed",      description: "ดูว่า Interface ทำงาน Full-duplex ถูกต้อง",     checkCommand: "show interfaces [int] | include duplex", expectedResult: "Full-duplex, ถูก Speed",                  ifFailed: "แก้ Duplex/Speed Config" },
      { step: 5, title: "ตรวจ CPU บน Network Device", description: "ดูว่า Router/Switch CPU ไม่สูงเกินไป",        checkCommand: "show processes cpu sorted",             expectedResult: "CPU < 70%",                               ifFailed: "ตรวจ Process ที่กิน CPU มาก" },
    ],
    commands: [
      { title: "ดู Interface Traffic",  command: "show interfaces [int]",              platform: "Cisco",   description: "ดู Input/Output Rate, Error, Duplex" },
      { title: "ดู CPU",                command: "show processes cpu sorted",          platform: "Cisco",   description: "ดู Process ที่ใช้ CPU มากที่สุด" },
      { title: "ดู QoS",                command: "show policy-map interface",          platform: "Cisco",   description: "ดู QoS Policy และ Queue Stats" },
      { title: "ดู Bandwidth (Linux)",  command: "iftop -i eth0",                     platform: "Linux",   description: "ดู Real-time Bandwidth ต่อ Connection" },
      { title: "Ping มี Packet Size",   command: "ping -l 1400 8.8.8.8",              platform: "Windows", description: "ทดสอบ MTU Path" },
    ],
    decisionTree: [
      { question: "Bandwidth ถึง ISP ปกติหรือไม่?", yes: "ปัญหาอยู่ใน LAN",         no: "ตรวจ ISP และ Uplink" },
      { question: "Interface มี Error หรือไม่?",     yes: "ตรวจสาย / SFP",           no: "ตรวจ Utilization และ QoS" },
      { question: "Utilization เกิน 80% หรือไม่?",  yes: "ปรับ QoS หรือเพิ่ม BW",  no: "ตรวจ Duplex และ CPU" },
    ],
    rootCauseExamples: [
      "Backup Job รันตอนกลางวัน ใช้ Bandwidth เต็ม Link",
      "Duplex Mismatch บน Uplink ทำให้เกิด Collision ตลอด",
      "Broadcast Storm จาก Loop ใน Network",
    ],
    fixActions: [
      "กำหนด QoS Policy จำกัด Traffic ที่ไม่สำคัญ",
      "ย้าย Backup Job ไปรันตอนกลางคืน",
      "แก้ Duplex/Speed บน Interface",
      "เพิ่ม Bandwidth หาก Utilization สูงเป็นประจำ",
    ],
    verificationSteps: ["Speedtest ได้ Bandwidth ตาม Spec", "Interface Utilization < 80%", "Ping Latency ปกติ < 10ms ใน LAN", "ผู้ใช้ยืนยันว่าเร็วขึ้น"],
    escalation: ["ถ้า BW หมดทุกวัน ให้ประเมิน Upgrade Circuit", "ถ้ามี Broadcast Storm ให้ตรวจ STP ทันที"],
    rcaTemplate: {
      incidentTitle: "Network ช้าทั้ง Office ช่วงบ่าย",
      impact:        "ประสิทธิภาพการทำงานลดลง Video Call ไม่ได้",
      timeline: ["13:00 แจ้งปัญหา", "13:10 ตรวจ Interface พบ Utilization 98%", "13:15 ตรวจ NetFlow พบ Backup Traffic", "13:20 ย้าย Backup ไปเวลา 23:00", "13:30 ปกติ"],
      rootCause:  "Backup Job ถูกเปลี่ยนเวลาจาก 23:00 เป็น 13:00 โดยไม่ได้แจ้ง",
      resolution: "ย้าย Backup Job กลับไปรัน 23:00 และตั้ง QoS Rate-Limit",
      prevention: ["ทำ Change Management สำหรับ Backup Schedule", "ตั้ง Alert เมื่อ BW เกิน 80%"],
    },
    relatedLabs:    [],
    relatedCourses: ["network-troubleshooting"],
  },

  /* 9 ─ Packet Loss ───────────────────────────────────────────────── */
  {
    id:          "packet-loss",
    title:       "Packet Loss สูง",
    category:    "Performance",
    severity:    "High",
    level:       "Intermediate",
    description: "ไล่ปัญหาเมื่อมี Packet Loss ทำให้ Connection ไม่เสถียร, Video/VoIP มีปัญหา หรือ TCP Throughput ลดลงมาก",
    symptoms: [
      "Ping มี % packet loss",
      "Video Call กระตุกหรือแตก",
      "File Transfer ช้าและ Retry บ่อย",
      "VoIP มีเสียงหาย",
      "TCP Connection Drop ตลอด",
    ],
    possibleCauses: [
      "สาย LAN เสื่อมหรือหลวม",
      "SFP / Transceiver เสีย",
      "Interface Error สูง (CRC, Input Error)",
      "Queue Overflow บน Router/Switch",
      "Wi-Fi Interference",
      "ISP มีปัญหา",
      "Hardware เสียบน Network Device",
    ],
    flowSteps: [
      { step: 1, title: "ยืนยัน Packet Loss ด้วย Extended Ping", description: "ทดสอบ Ping จำนวนมากไปยังหลาย Destination", checkCommand: "ping -n 100 8.8.8.8",       expectedResult: "Loss < 1%",                           ifFailed: "มี Packet Loss จริง ตรวจต่อ" },
      { step: 2, title: "ตรวจ Interface Error",                   description: "ดูว่า Interface มี CRC หรือ Input Error",   checkCommand: "show interfaces [int]",    expectedResult: "Error Rate < 0.01%",                  ifFailed: "เปลี่ยนสาย / SFP" },
      { step: 3, title: "Traceroute หา Hop ที่ Loss",              description: "ดูว่า Loss เกิดที่ Hop ไหน",                checkCommand: "tracert 8.8.8.8",          expectedResult: "ทุก Hop Reply ปกติ",                  ifFailed: "Hop ที่ Loss คือจุดปัญหา" },
      { step: 4, title: "ตรวจ Queue / Drop",                      description: "ดูว่ามี Packet Drop จาก Queue",            checkCommand: "show policy-map interface", expectedResult: "Drop Count ไม่เพิ่มขึ้น",              ifFailed: "ปรับ Queue Size หรือ QoS" },
      { step: 5, title: "ทดสอบด้วยสายใหม่",                       description: "เปลี่ยนสาย LAN เพื่อ Eliminate Cable",    expectedResult: "Loss หายไปหลังเปลี่ยนสาย",             ifFailed: "ปัญหาไม่ได้อยู่ที่สาย ตรวจ Switch Port" },
    ],
    commands: [
      { title: "Extended Ping",           command: "ping -n 100 8.8.8.8",         platform: "Windows", description: "ทดสอบ Ping 100 ครั้งเพื่อดู Loss" },
      { title: "Traceroute",              command: "tracert 8.8.8.8",             platform: "Windows", description: "หา Hop ที่มี Loss" },
      { title: "ดู Interface Error",      command: "show interfaces [int]",       platform: "Cisco",   description: "ดู CRC, Input Error, Output Drop" },
      { title: "ดู Interface (Linux)",    command: "ip -s link show eth0",        platform: "Linux",   description: "ดู Error Stats บน Linux" },
      { title: "ดู Ping (Linux Flood)",   command: "ping -f -c 1000 8.8.8.8",    platform: "Linux",   description: "Flood Ping เพื่อหา Loss Rate" },
    ],
    decisionTree: [
      { question: "Traceroute ชี้ Hop ที่ Loss ได้หรือไม่?",  yes: "ตรวจ Device ที่ Hop นั้น",   no: "Loss เกิดทุก Hop ตรวจ Physical" },
      { question: "Interface มี CRC Error หรือไม่?",           yes: "เปลี่ยนสาย / SFP",          no: "ตรวจ Queue Drop และ Software" },
      { question: "Loss เกิดเฉพาะ Wi-Fi หรือไม่?",            yes: "ตรวจ RF Interference",        no: "ตรวจ Physical Layer บน LAN" },
    ],
    rootCauseExamples: [
      "SFP Module เสื่อมทำให้มี CRC Error 5%",
      "Queue บน Uplink เต็มในช่วง Peak Traffic",
      "สาย UTP Cat5 เก่าทำให้มี CRC Error",
    ],
    fixActions: [
      "เปลี่ยนสาย LAN",
      "เปลี่ยน SFP Module",
      "ปรับ QoS Queue Policy",
      "เพิ่ม Bandwidth บน Uplink",
    ],
    verificationSteps: ["Ping 1000 ครั้ง Loss < 0.1%", "Interface Error ไม่เพิ่มขึ้น", "VoIP / Video ปกติ", "TCP Throughput ปกติ"],
    escalation: ["ถ้า Loss มาจาก ISP ให้เปิด Ticket กับ ISP", "ถ้า Hardware เสียให้ Request Replacement"],
    rcaTemplate: {
      incidentTitle: "VoIP มีเสียงหายตลอด",
      impact:        "การโทรภายในบริษัทไม่ได้ยินเสียง",
      timeline: ["10:00 แจ้งปัญหา VoIP", "10:10 ตรวจ Ping พบ Loss 8%", "10:15 ตรวจ Interface พบ CRC Error", "10:25 เปลี่ยน SFP Module", "10:35 ปกติ"],
      rootCause:  "SFP Module บน Uplink Switch เสื่อมทำให้มี CRC Error สูง",
      resolution: "เปลี่ยน SFP Module ใหม่",
      prevention: ["ตรวจ Interface Error ผ่าน Monitoring ทุก 5 นาที", "สำรอง SFP Module พร้อมใช้งาน"],
    },
    relatedLabs:    [],
    relatedCourses: ["network-troubleshooting"],
  },

  /* 10 ─ MAC Flapping / Loop ──────────────────────────────────────── */
  {
    id:          "mac-flapping-loop",
    title:       "MAC Flapping / Network Loop",
    category:    "Switching",
    severity:    "Critical",
    level:       "Advanced",
    description: "ไล่ปัญหาเมื่อมี MAC Flapping Error บน Switch หรือสงสัยว่ามี Switching Loop ในเครือข่าย",
    symptoms: [
      "Switch Log แสดง MAC Flapping Warning",
      "Network ช้าผิดปกติหรือล่มสนิท",
      "Broadcast ถูกส่งซ้ำแล้วซ้ำเล่า",
      "CPU บน Switch สูงมาก",
      "Ping ไม่ได้หรือ Loss 100%",
    ],
    possibleCauses: [
      "สายเชื่อมต่อสร้าง Loop โดยไม่ตั้งใจ",
      "Spanning Tree Protocol (STP) ไม่ได้เปิด",
      "STP Configuration ผิด",
      "PortFast เปิดบน Trunk Port",
      "BPDU Guard ปิด",
      "Software Bug บน Switch",
    ],
    flowSteps: [
      { step: 1, title: "ตรวจ Switch Log",         description: "ดู Log ว่ามี MAC Flapping หรือ STP Change",    checkCommand: "show log | include flap",    expectedResult: "ไม่มี MAC Flapping หรือ STP TCN ต่อเนื่อง", ifFailed: "ระบุ Port ที่ Flap และตรวจทันที" },
      { step: 2, title: "ตรวจ STP Status",         description: "ดูว่า STP ทำงานและ Root Bridge ถูกต้อง",      checkCommand: "show spanning-tree",         expectedResult: "STP ทำงาน Topology Stable ไม่มี TCN บ่อย",   ifFailed: "ตรวจ Port ที่ Forwarding/Blocking ผิด" },
      { step: 3, title: "หา Loop Port",             description: "ดูว่า MAC เดิม Learn จากหลาย Port",            checkCommand: "show mac address-table",     expectedResult: "MAC แต่ละ Entry อยู่ Port เดียว",            ifFailed: "Port ที่ MAC สลับไปมา = Loop Port" },
      { step: 4, title: "Shutdown Port ที่สงสัย",  description: "Shutdown Port ที่สงสัยว่าเป็น Loop",           checkCommand: "shutdown บน Port",          expectedResult: "Network กลับมาปกติทันที",                    ifFailed: "ลอง Shutdown Port อื่น" },
      { step: 5, title: "ตรวจสายเชื่อมต่อ",        description: "ตรวจสายทุกเส้นว่าไม่มีสายวนกลับ",              expectedResult: "ไม่มีสายที่ต่อวน (ต้นทาง = ปลายทาง)",      ifFailed: "ถอดสายที่ Loop ออก" },
    ],
    commands: [
      { title: "ดู MAC Flapping",      command: "show log | include MAC_MOVE|flap",   platform: "Cisco",   description: "ดู Log MAC Flapping" },
      { title: "ดู STP",               command: "show spanning-tree",                  platform: "Cisco",   description: "ดูสถานะ STP, Root Bridge, Port State" },
      { title: "ดู STP Detail",        command: "show spanning-tree detail",           platform: "Cisco",   description: "ดู TC Count, TCN ที่เกิดขึ้น" },
      { title: "ดู MAC Table",         command: "show mac address-table",              platform: "Cisco",   description: "ดู MAC ทั้งหมดและ Port ที่ Learn" },
      { title: "Shutdown Port ทดสอบ",  command: "interface [int]\nshutdown",           platform: "Cisco",   description: "Shutdown Port ที่สงสัยเป็น Loop" },
    ],
    decisionTree: [
      { question: "Switch Log มี MAC Flapping หรือไม่?",  yes: "ระบุ Port ที่ Flap ทันที",    no: "ตรวจสาเหตุอื่น" },
      { question: "STP ทำงานอยู่หรือไม่?",                yes: "ตรวจ STP Topology",           no: "เปิด STP ทันที: spanning-tree mode rapid-pvst" },
      { question: "Shutdown Port แล้ว Network ดีขึ้นหรือไม่?", yes: "Port นั้นคือ Loop Port", no: "ลอง Shutdown Port อื่น" },
    ],
    rootCauseExamples: [
      "ผู้ใช้นำ Unmanaged Switch มาเสียบและต่อสายวน",
      "PortFast เปิดบน Trunk Port ทำให้ STP ไม่ทำงาน",
      "Network Admin ต่อ Patch Cord ผิดทำให้เกิด Loop บน Patch Panel",
    ],
    fixActions: [
      "ถอดสายที่ทำให้เกิด Loop",
      "เปิด STP ถ้ายังไม่ได้เปิด",
      "ตั้ง BPDU Guard บน Access Port",
      "ตั้ง Root Guard บน Port ที่ไม่ควรเป็น Root",
      "ลบ Unmanaged Switch ที่ผู้ใช้นำมาเอง",
    ],
    verificationSteps: [
      "ไม่มี MAC Flapping ใน Log",
      "STP Topology Stable ไม่มี TCN บ่อย",
      "Network Traffic กลับสู่ปกติ",
      "CPU บน Switch < 50%",
      "ผู้ใช้ยืนยันว่าใช้งานได้ปกติ",
    ],
    escalation: ["ถ้า Loop ขนาดใหญ่กระทบทั้ง Building ให้ประกาศ P1 Incident", "ถ้า STP มีปัญหาขนาดใหญ่ ให้ปรึกษา Network Architect"],
    rcaTemplate: {
      incidentTitle: "Network Loop ทำให้ทั้ง Office ล่ม",
      impact:        "Network ล่มทั้ง Office 200 เครื่อง ไม่สามารถทำงานได้ 30 นาที",
      timeline: ["09:00 Network ล่มสนิท", "09:05 ตรวจพบ CPU Switch 99%", "09:10 ตรวจ Log พบ MAC Flapping บน Fa0/24", "09:12 Shutdown Fa0/24", "09:13 Network ปกติทันที", "09:30 พบ Unmanaged Switch ที่ผู้ใช้นำมา"],
      rootCause:  "ผู้ใช้นำ Unmanaged Switch มาเสียบที่โต๊ะและต่อสาย 2 เส้นจาก Port เดิมสร้าง Loop",
      resolution: "ถอด Unmanaged Switch และสายที่ Loop ออก และเปิด BPDU Guard",
      prevention: ["ตั้ง BPDU Guard บน Access Port ทุก Port", "ห้ามผู้ใช้นำ Switch มาเสียบเอง", "ตั้ง Port Security", "Monitor STP TC Count"],
    },
    relatedLabs:    ["vlan-config", "trunk-port"],
    relatedCourses: ["switching-essentials", "vlan-trunk"],
  },

  /* 11 ─ BGP Peer ไม่ขึ้น Established ───────────────────────────── */
  {
    id:          "bgp-peer-not-established",
    title:       "BGP Peer ไม่ขึ้น Established",
    category:    "Routing",
    severity:    "High",
    level:       "Advanced",
    description: "แนวทางไล่ปัญหาเมื่อ BGP Neighbor State ไม่ขึ้น Established ค้างอยู่ที่ Active หรือ Idle",
    symptoms: [
      "show bgp summary แสดง State: Active หรือ Idle",
      "BGP Route ไม่ปรากฏใน Routing Table",
      "Prefix จาก Peer ไม่เข้ามา",
      "Traffic ไม่สามารถออก ISP ได้",
    ],
    possibleCauses: [
      "IP Connectivity ระหว่าง Neighbor ขาด (ไม่ถึงกัน)",
      "AS Number ผิดฝั่งใดฝั่งหนึ่ง",
      "TCP Port 179 ถูก Firewall Block",
      "Authentication MD5 Key ไม่ตรงกัน",
      "Update Source Interface ผิด (iBGP)",
      "TTL ไม่ถึง (eBGP Multi-hop ไม่ได้ตั้ง)",
    ],
    flowSteps: [
      {
        step: 1, title: "ตรวจ IP Connectivity",
        description: "Ping ไป Neighbor IP โดยตรงเพื่อตรวจสอบ Layer 3 Connectivity",
        checkCommand: "ping 10.0.0.2 source 10.0.0.1",
        expectedResult: "Ping สำเร็จ 5/5 packets",
        ifFailed: "แก้ Routing หรือ Interface ให้ Ping ผ่านก่อน",
      },
      {
        step: 2, title: "ตรวจ BGP Config",
        description: "ตรวจ AS Number และ Neighbor IP ที่ Config ว่าถูกต้องทั้งสองฝั่ง",
        checkCommand: "show bgp neighbors 10.0.0.2",
        expectedResult: "เห็น remote-as ถูกต้อง และ Local AS ถูกต้อง",
        ifFailed: "แก้ neighbor command ให้ตรงกัน",
      },
      {
        step: 3, title: "ตรวจ TCP Port 179",
        description: "ตรวจสอบว่า Firewall หรือ ACL ไม่ Block TCP Port 179",
        checkCommand: "show ip access-lists | show ip sockets",
        expectedResult: "ไม่มี ACL Block TCP 179, มี Socket Listen Port 179",
        ifFailed: "เพิ่ม ACL Permit TCP Port 179 ระหว่าง Neighbor",
      },
      {
        step: 4, title: "ตรวจ Authentication",
        description: "ถ้าใช้ BGP MD5 Authentication ตรวจสอบ Password ทั้งสองฝั่ง",
        checkCommand: "show bgp neighbors 10.0.0.2 | include MD5",
        expectedResult: "MD5 Status: enabled (ถ้าใช้)",
        ifFailed: "ตรวจสอบ password command ให้ตรงกันทั้งสองฝั่ง",
      },
    ],
    commands: [
      { title: "BGP Summary",       command: "show bgp summary",                    platform: "Cisco", description: "ดู State ของ Neighbor ทั้งหมด" },
      { title: "BGP Neighbor Detail", command: "show bgp neighbors 10.0.0.2",       platform: "Cisco", description: "ดูรายละเอียด Neighbor รวม Error Count" },
      { title: "BGP Events Debug",  command: "debug ip bgp 10.0.0.2 events",       platform: "Cisco", description: "ดู BGP Event แบบ Real-time (ระวัง Production)" },
      { title: "Check TCP Socket",  command: "show ip sockets",                     platform: "Cisco", description: "ดู TCP Connection บน Router" },
      { title: "Ping Neighbor",     command: "ping 10.0.0.2 source 10.0.0.1",      platform: "Cisco", description: "ทดสอบ IP Connectivity" },
    ],
    decisionTree: [
      { question: "Ping Neighbor ได้ไหม?",           yes: "ตรวจ BGP Config และ AS Number", no: "แก้ Routing/Interface ให้ถึงกันก่อน" },
      { question: "AS Number ถูกต้องทั้งสองฝั่ง?",   yes: "ตรวจ Firewall/ACL Port 179",   no: "แก้ remote-as ให้ถูกต้อง" },
      { question: "TCP 179 ไม่ถูก Block?",           yes: "ตรวจ MD5 Authentication",       no: "เพิ่ม ACL Permit TCP 179" },
    ],
    rootCauseExamples: [
      "ใส่ AS Number ผิด: neighbor 10.0.0.2 remote-as 65003 แทน 65002",
      "Firewall Block TCP 179 ระหว่าง Router ทั้งสอง",
      "MD5 Password ไม่ตรงกัน: cisco vs Cisco",
    ],
    fixActions: [
      "ตรวจและแก้ AS Number ให้ตรงกับ Peer",
      "เพิ่ม ACL/Firewall Rule Allow TCP 179",
      "ลบและตั้ง Password ใหม่ให้ตรงกันทั้งสองฝั่ง",
      "ตรวจ Update-source สำหรับ iBGP Loopback",
    ],
    verificationSteps: [
      "show bgp summary — State ต้องเป็น Established",
      "show bgp ipv4 unicast — เห็น Prefix จาก Peer",
      "show ip route bgp — มี BGP Route ใน Routing Table",
    ],
    escalation: [
      "ถ้า Established แล้วแต่ Route ไม่เข้า ตรวจ Route-map หรือ Prefix-list",
      "ถ้าปัญหายังอยู่ หลัง Check ทุกอย่างแล้ว ส่ง Debug Log ให้ TAC",
    ],
    rcaTemplate: {
      incidentTitle: "BGP Peer ไม่ขึ้น Established หลัง Change",
      impact:        "Traffic ไม่สามารถออก ISP ผ่าน BGP ได้ ผู้ใช้ทั้งองค์กรไม่มี Internet",
      timeline:      ["10:00 - Change Window เริ่ม", "10:15 - Config BGP บน Router ใหม่", "10:30 - พบว่า BGP State Active", "11:00 - ตรวจพบ AS Number ผิด", "11:05 - แก้ไขและ BGP Established"],
      rootCause:     "ใส่ remote-as ผิดตอน Config เนื่องจาก Copy/Paste ผิด",
      resolution:    "แก้ neighbor command ให้ remote-as ถูกต้อง",
      prevention:    ["ทำ Config Review ก่อน Apply", "ใช้ Template แทน Manual Type", "Test ใน Lab ก่อน Production"],
    },
    relatedLabs:    ["bgp-ebgp-config"],
    relatedCourses: ["bgp-routing"],
  },

  /* 12 ─ Voice Quality ต่ำ (QoS Problem) ─────────────────────── */
  {
    id:          "voice-quality-degraded",
    title:       "Voice Call คุณภาพต่ำ / สะดุด",
    category:    "QoS",
    severity:    "High",
    level:       "Intermediate",
    description: "Flow ไล่ปัญหา Voice Call ที่มีเสียงหาย สะดุด หรือ Echo สูง บน Network ที่มี QoS",
    symptoms: [
      "เสียงโทรศัพท์ IP สะดุดเป็นช่วงๆ",
      "มีเสียงหรือ Packet Loss",
      "Echo สูงผิดปกติ",
      "MOS Score ต่ำกว่า 3.5",
      "ปัญหาเกิดเฉพาะช่วง Peak Traffic",
    ],
    possibleCauses: [
      "QoS ไม่ได้ Config หรือ Config ผิด",
      "WAN Bandwidth ไม่พอ",
      "Jitter สูงเกิน 30ms",
      "Packet Loss บน WAN Link เกิน 1%",
      "Voice Traffic ไม่ได้รับ Priority Queue",
      "Codec ไม่เหมาะสมกับ Bandwidth",
    ],
    flowSteps: [
      {
        step: 1, title: "วัด Jitter และ Packet Loss",
        description: "ใช้ IP SLA หรือ Tool วัด Jitter และ Packet Loss ระหว่าง Site",
        checkCommand: "show ip sla statistics",
        expectedResult: "Jitter < 30ms, Packet Loss < 1%",
        ifFailed: "ถ้าเกิน ปัญหาที่ WAN Link หรือ QoS",
      },
      {
        step: 2, title: "ตรวจ QoS Policy บน Interface",
        description: "ตรวจสอบว่า QoS Policy Applied บน WAN Interface และ Voice ใช้ Priority Queue",
        checkCommand: "show policy-map interface Gi0/1",
        expectedResult: "VOICE Class ใช้ Priority Queue, Drop Count = 0",
        ifFailed: "Apply QoS Policy บน Interface หรือแก้ Priority Bandwidth",
      },
      {
        step: 3, title: "ตรวจ DSCP Marking",
        description: "ตรวจว่า VoIP Phone Mark DSCP EF (46) บน Voice RTP Packet",
        checkCommand: "show policy-map interface | include VOICE|dscp",
        expectedResult: "DSCP EF (46) Match ได้ที่ class VOICE",
        ifFailed: "Config IP Phone หรือ CUCM ให้ Mark DSCP EF",
      },
    ],
    commands: [
      { title: "QoS Interface Stats", command: "show policy-map interface Gi0/1",  platform: "Cisco", description: "ดู Queue Drop Counter แต่ละ Class" },
      { title: "IP SLA Jitter",       command: "show ip sla statistics",           platform: "Cisco", description: "ดู Jitter และ Packet Loss จาก IP SLA" },
      { title: "Interface Error",     command: "show interface Gi0/1",             platform: "Cisco", description: "ดู Error Counter บน WAN Interface" },
      { title: "Voice Codec Check",   command: "show voice call status",           platform: "Cisco", description: "ดู Active Call และ Codec ที่ใช้" },
    ],
    decisionTree: [
      { question: "Jitter > 30ms หรือ Loss > 1%?",     yes: "ปัญหาที่ WAN — เพิ่ม Bandwidth หรือ QoS",  no: "ตรวจ Codec และ IP Phone Config" },
      { question: "QoS Policy Applied บน Interface?",  yes: "ตรวจ DSCP Marking",                         no: "Apply service-policy บน WAN Interface" },
      { question: "Voice DSCP EF Mark ถูกต้อง?",       yes: "ตรวจ Priority Bandwidth เพียงพอ",           no: "Config Phone/CUCM ให้ Mark DSCP EF" },
    ],
    rootCauseExamples: [
      "WAN Interface ไม่มี service-policy ทำให้ Voice ไม่ได้ Priority",
      "VoIP Phone ไม่ได้ Mark DSCP ทำให้ class-map ไม่ match",
      "Priority Bandwidth น้อยเกินไปในช่วง Peak",
    ],
    fixActions: [
      "Apply service-policy บน WAN Interface ขา Outbound",
      "เพิ่ม Priority Bandwidth สำหรับ Voice Class",
      "Config VoIP Phone/CUCM ให้ Mark DSCP EF (46)",
      "พิจารณาเพิ่ม WAN Bandwidth หรือเปลี่ยน Codec เป็น G.729",
    ],
    verificationSteps: [
      "show policy-map interface — VOICE Class Drop = 0",
      "IP SLA Jitter < 30ms, Loss < 1%",
      "MOS Score > 4.0 หลัง Fix",
    ],
    escalation: [
      "ถ้า QoS ถูกต้องแล้วแต่ยังมีปัญหา ตรวจ ISP WAN Link Quality",
      "เปิด Ticket กับ ISP พร้อม IP SLA Stats",
    ],
    rcaTemplate: {
      incidentTitle: "Voice Call คุณภาพต่ำช่วง Business Hours",
      impact:        "VoIP Call สะดุดทุก Call ทำให้ธุรกิจหยุดชะงัก",
      timeline:      ["09:00 - User แจ้งเสียงสะดุด", "09:15 - ตรวจพบ QoS ไม่ได้ Apply บน WAN", "09:30 - Apply service-policy", "09:45 - Voice คุณภาพดีขึ้น"],
      rootCause:     "หลัง Router Replace ไม่ได้ Apply QoS Policy บน WAN Interface",
      resolution:    "Apply service-policy output WAN_QOS บน Gi0/1",
      prevention:    ["มี QoS Config ใน Standard Template", "ตรวจ QoS หลัง Change ทุกครั้ง", "Monitor MOS Score ด้วย IP SLA"],
    },
    relatedLabs:    ["qos-dscp-lab"],
    relatedCourses: ["qos-fundamentals"],
  },

  /* 13 ─ WiFi เชื่อมต่อไม่ได้ ─────────────────────────────────── */
  {
    id:          "wifi-not-connecting",
    title:       "WiFi เชื่อมต่อไม่ได้",
    category:    "Wireless",
    severity:    "Medium",
    level:       "Beginner",
    description: "Flow ไล่ปัญหาเมื่อ Device ไม่สามารถ Connect WiFi ได้ หรือ Connect แล้วไม่ได้ IP",
    symptoms: [
      "กด Connect WiFi แล้วไม่ได้ Connected",
      "ขึ้น 'Authentication Failed' หรือ 'Wrong Password'",
      "Connect แล้วได้ IP 169.254.x.x (APIPA)",
      "WiFi เห็น SSID แต่ Connect ไม่ติด",
      "Device บางตัว Connect ได้ บางตัวไม่ได้",
    ],
    possibleCauses: [
      "Password ผิดหรือเปลี่ยนแล้ว",
      "DHCP Server ไม่ทำงานหรือ IP Pool เต็ม",
      "MAC Address Filtering Block Device",
      "WPA Version ไม่รองรับ (Device เก่าไม่รองรับ WPA3)",
      "AP Overload เกิน Client Limit",
      "Client กำหนด Security ผิด เช่น WPA2 แต่ AP เป็น WPA3 Only",
    ],
    flowSteps: [
      {
        step: 1, title: "ตรวจ Password",
        description: "ลอง Connect ด้วย Password ใหม่อีกครั้ง Forget Network แล้ว Reconnect",
        checkCommand: "เปิด WiFi Settings → Forget Network → เชื่อมต่อใหม่",
        expectedResult: "Connect ได้หลัง Forget",
        ifFailed: "ตรวจ Security Type และ DHCP",
      },
      {
        step: 2, title: "ตรวจ DHCP",
        description: "ตรวจสอบว่า IP ที่ได้รับถูกต้อง ไม่ใช่ 169.254.x.x",
        checkCommand: "ipconfig (Win) / ip addr (Linux)",
        expectedResult: "ได้ IP ในช่วงที่กำหนด เช่น 192.168.1.x",
        ifFailed: "DHCP Server ปัญหา หรือ VLAN ไม่ถูกต้อง",
      },
      {
        step: 3, title: "ตรวจ AP Client Limit",
        description: "ตรวจว่า AP ไม่เกิน Client Limit (ปกติ 30-50 Clients ต่อ AP)",
        checkCommand: "show wireless client summary (WLC)",
        expectedResult: "Client Count ไม่เกิน 80% ของ Limit",
        ifFailed: "เพิ่ม AP หรือ Load Balance Client ไป AP อื่น",
      },
    ],
    commands: [
      { title: "Check IP (Windows)",  command: "ipconfig /all",                       platform: "Windows", description: "ดู IP Address ที่ได้รับจาก DHCP" },
      { title: "Renew IP (Windows)",  command: "ipconfig /release && ipconfig /renew", platform: "Windows", description: "ขอ IP ใหม่จาก DHCP" },
      { title: "WiFi Info (Windows)", command: "netsh wlan show interfaces",           platform: "Windows", description: "ดู Signal, BSSID, Security Type" },
      { title: "Scan Networks",       command: "netsh wlan show networks",             platform: "Windows", description: "ดู SSID และ Security Mode ทั้งหมด" },
      { title: "Check AP Clients",    command: "show wireless client summary",         platform: "Cisco",   description: "ดู Client จำนวนบน WLC" },
    ],
    decisionTree: [
      { question: "เห็น SSID ไหม?",                      yes: "ตรวจ Password และ Security Type", no: "SSID Hidden หรือ AP ปัญหา" },
      { question: "Connect แล้วได้ IP ถูกต้องไหม?",      yes: "ตรวจ Default Gateway และ DNS",   no: "ตรวจ DHCP Server และ VLAN" },
      { question: "Device อื่น Connect ได้ไหม?",         yes: "ปัญหาที่ Device นั้น",           no: "ปัญหาที่ AP หรือ Network" },
    ],
    rootCauseExamples: [
      "เปลี่ยน WiFi Password แล้ว Device เก่า Cache Password ผิด",
      "DHCP Pool เต็ม ต้องเพิ่ม IP Range",
      "Device เก่าไม่รองรับ WPA3 ต้องตั้ง Compatibility Mode",
    ],
    fixActions: [
      "Forget Network บน Device แล้ว Connect ใหม่",
      "เคลียร์ DHCP Lease หรือเพิ่ม IP Pool",
      "ปรับ AP Security เป็น WPA2/WPA3 Mixed Mode",
      "ตรวจ MAC Address Filtering ว่า Block Device นั้นอยู่",
    ],
    verificationSteps: [
      "ipconfig /all — ได้ IP ในช่วงที่ถูกต้อง",
      "Ping Default Gateway ได้สำเร็จ",
      "เปิดเว็บได้ปกติ",
    ],
    escalation: [
      "ถ้าหลาย Device ไม่ Connect พร้อมกัน ตรวจ DHCP Server",
      "ถ้าปัญหาเกิดเป็นช่วงๆ ตรวจ RF Interference และ Channel Utilization",
    ],
    rcaTemplate: {
      incidentTitle: "WiFi ใช้งานไม่ได้หลัง Password Change",
      impact:        "ผู้ใช้ 50 คนไม่สามารถ Connect WiFi ได้ ต้องใช้ LAN แทน",
      timeline:      ["08:00 - เปลี่ยน WiFi Password", "08:30 - User แจ้งเข้า WiFi ไม่ได้", "09:00 - แจ้ง Password ใหม่และให้ Forget + Reconnect", "09:15 - ทุกคน Connect ได้ปกติ"],
      rootCause:     "ไม่ได้แจ้ง Password ใหม่ให้ User ทราบหลัง Change",
      resolution:    "แจ้ง Password ใหม่และให้ Forget Network แล้ว Reconnect",
      prevention:    ["แจ้ง Change Plan ล่วงหน้า", "ส่ง Email Password ใหม่ก่อน Change", "ตั้ง Password Change Notification"],
    },
    relatedLabs:    ["wifi-security-lab"],
    relatedCourses: ["wireless-networking"],
  },

  /* 14 ─ IPv6 Connectivity ปัญหา ─────────────────────────────── */
  {
    id:          "ipv6-connectivity-issue",
    title:       "IPv6 Connectivity ปัญหา",
    category:    "IP Addressing",
    severity:    "Medium",
    level:       "Intermediate",
    description: "Flow ไล่ปัญหาเมื่อ IPv6 Ping ไม่ผ่านหรือ IPv6 Route ไม่ปรากฏใน Routing Table",
    symptoms: [
      "Ping IPv6 Address ไม่ได้",
      "show ipv6 route ไม่มี Route",
      "OSPFv3 Neighbor ไม่ขึ้น",
      "IPv6 Address ไม่ปรากฏบน Interface",
      "Browser เข้า IPv6-only Website ไม่ได้",
    ],
    possibleCauses: [
      "ลืม ipv6 unicast-routing บน Router",
      "ไม่มี IPv6 Address บน Interface",
      "OSPFv3 ไม่มี Router-ID",
      "Firewall Block ICMPv6",
      "Dual-Stack ไม่ได้ Config IPv6 บน Interface",
    ],
    flowSteps: [
      {
        step: 1, title: "ตรวจ ipv6 unicast-routing",
        description: "ตรวจสอบว่าเปิด IPv6 Routing บน Router แล้ว",
        checkCommand: "show running-config | include ipv6 unicast-routing",
        expectedResult: "แสดง 'ipv6 unicast-routing'",
        ifFailed: "รัน ipv6 unicast-routing ใน Global Config",
      },
      {
        step: 2, title: "ตรวจ IPv6 Address บน Interface",
        description: "ตรวจสอบว่า Interface มี IPv6 Address ที่ถูกต้อง",
        checkCommand: "show ipv6 interface brief",
        expectedResult: "Interface Up/Up มี IPv6 Address",
        ifFailed: "Config IPv6 Address บน Interface",
      },
      {
        step: 3, title: "ตรวจ OSPFv3 Neighbor",
        description: "ถ้าใช้ OSPFv3 ตรวจ Neighbor State",
        checkCommand: "show ipv6 ospf neighbor",
        expectedResult: "Neighbor State Full",
        ifFailed: "ตรวจ Router-ID และ Area",
      },
    ],
    commands: [
      { title: "IPv6 Routing Config",    command: "show run | include ipv6 unicast",  platform: "Cisco", description: "ตรวจว่าเปิด IPv6 Routing" },
      { title: "IPv6 Interface",         command: "show ipv6 interface brief",        platform: "Cisco", description: "ดู IPv6 Address และ Status" },
      { title: "IPv6 Route Table",       command: "show ipv6 route",                 platform: "Cisco", description: "ดู IPv6 Routing Table" },
      { title: "OSPFv3 Neighbor",        command: "show ipv6 ospf neighbor",         platform: "Cisco", description: "ดู OSPFv3 Adjacency" },
      { title: "Ping IPv6",              command: "ping ipv6 2001:db8::1",           platform: "Cisco", description: "ทดสอบ IPv6 Connectivity" },
    ],
    decisionTree: [
      { question: "ipv6 unicast-routing เปิดอยู่?",    yes: "ตรวจ IPv6 Address บน Interface",  no: "รัน ipv6 unicast-routing" },
      { question: "Interface มี IPv6 Address?",        yes: "ตรวจ Routing Protocol (OSPFv3)",  no: "Config IPv6 Address" },
      { question: "OSPFv3 Neighbor Full?",             yes: "ตรวจ Firewall/ACL Block ICMPv6", no: "ตรวจ Router-ID และ Area Config" },
    ],
    rootCauseExamples: [
      "ลืม ipv6 unicast-routing หลัง Config IPv6 Address",
      "OSPFv3 ไม่มี Router-ID เพราะไม่มี IPv4 Loopback",
      "Firewall Block ICMPv6 Type 135/136 (Neighbor Discovery)",
    ],
    fixActions: [
      "รัน ipv6 unicast-routing บน Router ทุกตัว",
      "กำหนด router-id ใน OSPFv3 Process",
      "Allow ICMPv6 บน Firewall สำหรับ NDP",
      "Config IPv6 Address บน Interface ที่ขาด",
    ],
    verificationSteps: [
      "show ipv6 interface brief — Interface Up มี Address",
      "show ipv6 route — เห็น Route จาก OSPFv3",
      "ping ipv6 [address] — สำเร็จ",
    ],
    escalation: [
      "ถ้า Ping ได้แต่ Application ไม่ทำงาน ตรวจ DNS AAAA Record",
      "ตรวจ ISP IPv6 Prefix Delegation ถ้าปัญหาฝั่ง WAN",
    ],
    rcaTemplate: {
      incidentTitle: "IPv6 ไม่ทำงานหลัง Network Migration",
      impact:        "IPv6-only Services ใช้งานไม่ได้",
      timeline:      ["14:00 - Config IPv6 บน Router", "14:30 - ทดสอบ Ping IPv6 ไม่ผ่าน", "14:35 - ตรวจพบไม่มี ipv6 unicast-routing", "14:36 - เปิด ipv6 unicast-routing ทุก Router", "14:40 - IPv6 ทำงานปกติ"],
      rootCause:     "ลืม ipv6 unicast-routing ใน Config",
      resolution:    "เพิ่ม ipv6 unicast-routing บน Router ทุกตัว",
      prevention:    ["เพิ่ม ipv6 unicast-routing ใน Standard Template", "ตรวจ IPv6 Checklist ก่อน Migration", "Test Lab ก่อน Production"],
    },
    relatedLabs:    ["ipv6-ospfv3-lab"],
    relatedCourses: ["ipv6-deep-dive"],
  },

  /* 15 ─ Script Connection Failed (Automation) ────────────────── */
  {
    id:          "automation-script-failed",
    title:       "Network Automation Script เชื่อมต่อไม่ได้",
    category:    "Automation",
    severity:    "Medium",
    level:       "Advanced",
    description: "Flow ไล่ปัญหาเมื่อ Python/Ansible Script ไม่สามารถ SSH ไปยัง Network Device ได้",
    symptoms: [
      "NetMikoTimeoutException หรือ SSH Connection refused",
      "NetMikoAuthenticationException — Authentication failed",
      "Script หยุดกลางคันเมื่อ Device ไม่ตอบ",
      "Ansible แสดง 'unreachable'",
    ],
    possibleCauses: [
      "SSH ไม่ได้เปิดบน Device",
      "Username/Password ผิด",
      "IP Address ผิดหรือ Route ไม่ถึง",
      "Firewall Block SSH Port 22",
      "Host Key Verification Failed",
      "device_type ผิด",
    ],
    flowSteps: [
      {
        step: 1, title: "ตรวจ SSH Connectivity",
        description: "ลอง SSH จาก Workstation ไปยัง Device โดยตรง",
        checkCommand: "ssh admin@192.168.1.1",
        expectedResult: "SSH Login ได้สำเร็จ",
        ifFailed: "ตรวจ SSH Config บน Device และ Firewall Rule",
      },
      {
        step: 2, title: "ตรวจ SSH Config บน Device",
        description: "ตรวจสอบว่า SSH เปิดและมี Crypto Key บน Router",
        checkCommand: "show ip ssh",
        expectedResult: "SSH Enabled, Version 2",
        ifFailed: "Config SSH: crypto key generate rsa modulus 2048, ip ssh version 2",
      },
      {
        step: 3, title: "ตรวจ device_type ใน Script",
        description: "ตรวจสอบว่า device_type ถูกต้องสำหรับ Platform ที่ใช้",
        checkCommand: "ดูค่า device_type ใน Code เทียบกับ Netmiko documentation",
        expectedResult: "device_type ตรงกับ Platform (cisco_ios, cisco_nxos, arista_eos)",
        ifFailed: "แก้ device_type ให้ถูกต้อง",
      },
    ],
    commands: [
      { title: "Test SSH",            command: "ssh -v admin@192.168.1.1",                platform: "Linux",  description: "ทดสอบ SSH พร้อม Verbose สำหรับ Debug" },
      { title: "Show SSH Status",     command: "show ip ssh",                             platform: "Cisco",  description: "ดูสถานะ SSH บน Router" },
      { title: "Enable SSH",          command: "crypto key generate rsa modulus 2048\nip ssh version 2\nline vty 0 4\n transport input ssh", platform: "Cisco", description: "เปิด SSH บน Cisco Router" },
      { title: "Netmiko Debug",       command: "logging.basicConfig(level=logging.DEBUG)", platform: "General", description: "เปิด Debug Log ใน Python Script" },
    ],
    decisionTree: [
      { question: "SSH ด้วย Manual Login ได้ไหม?",     yes: "ตรวจ Script: device_type, timeout",  no: "ตรวจ SSH บน Device และ Firewall" },
      { question: "Authentication Error?",             yes: "ตรวจ Username/Password ใน Script",   no: "ตรวจ Network/Timeout" },
      { question: "Timeout Error?",                    yes: "ตรวจ IP และ Firewall Port 22",       no: "ตรวจ device_type ใน Script" },
    ],
    rootCauseExamples: [
      "device_type='cisco_ios' แต่ Device เป็น NX-OS ต้องใช้ 'cisco_nxos'",
      "ไม่ได้เปิด SSH บน Router ยังใช้ Telnet อยู่",
      "Password มี Special Character ที่ต้อง Escape ใน Python String",
    ],
    fixActions: [
      "เปิด SSH บน Device: crypto key generate rsa modulus 2048",
      "แก้ device_type ให้ตรงกับ Platform",
      "ตรวจสอบ Username/Password และ Privilege Level",
      "เพิ่ม try/except ใน Script ป้องกัน Script หยุดกลางคัน",
    ],
    verificationSteps: [
      "SSH Login Manual ได้สำเร็จ",
      "Script รัน Test Connection ผ่าน 1 Device ก่อน",
      "Loop ทุก Device สำเร็จ ไม่มี Exception",
    ],
    escalation: [
      "ถ้า SSH ทำงานแต่ Script ยัง Fail ดู Netmiko Debug Log",
      "ตรวจ Known Hosts ถ้า Host Key Changed",
    ],
    rcaTemplate: {
      incidentTitle: "Automation Script ล้มเหลวทั้งหมด",
      impact:        "Config Backup ทั้งคืนไม่ได้รัน ไม่มี Backup ในวันนั้น",
      timeline:      ["02:00 - Cron Job รัน Script", "02:01 - Script ล้มเหลวทุก Device", "08:00 - ทีมค้นพบปัญหาตอนเช้า", "09:00 - ตรวจพบ SSH Key หมดอายุ", "09:30 - Renew Key และรัน Script ใหม่"],
      rootCause:     "SSH RSA Key หมดอายุบน Router ทำให้ทุก SSH Connection ล้มเหลว",
      resolution:    "Regenerate RSA Key บน Router ทุกตัว",
      prevention:    ["Monitor SSH Key Expiry", "ทำ Alerting เมื่อ Script ล้มเหลว", "เก็บ Script Log ทุก Run"],
    },
    relatedLabs:    ["python-netmiko-lab"],
    relatedCourses: ["network-automation"],
  },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
export function getGuideById(id: string): TroubleshootingGuide | undefined {
  return troubleshootingGuides.find((g) => g.id === id);
}

export const guideStats = {
  total:    troubleshootingGuides.length,
  critical: troubleshootingGuides.filter((g) => g.severity === "Critical").length,
  high:     troubleshootingGuides.filter((g) => g.severity === "High").length,
  medium:   troubleshootingGuides.filter((g) => g.severity === "Medium").length,
  low:      troubleshootingGuides.filter((g) => g.severity === "Low").length,
};

export const guideCategories = Array.from(new Set(troubleshootingGuides.map((g) => g.category)));
