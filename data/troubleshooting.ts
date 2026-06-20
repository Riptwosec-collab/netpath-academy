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
    flowSteps: [
      { id: "1", question: "BGP Session ขึ้น Established หรือไม่?", yes: "2", no: "check-tcp" },
      { id: "check-tcp", question: "Ping neighbor IP ได้ไหม?", yes: "check-as", no: "fix-ip" },
      { id: "fix-ip", label: "แก้ไข IP Connectivity / Routing ไปยัง neighbor" },
      { id: "check-as", question: "remote-as ถูกต้องไหม?", yes: "check-timer", no: "fix-as" },
      { id: "fix-as", label: "แก้ไข remote-as ให้ตรงกับ AS จริงของ neighbor" },
      { id: "check-timer", question: "Firewall บล็อก TCP 179 อยู่ไหม?", yes: "open-port", no: "check-auth" },
      { id: "open-port", label: "เปิด port TCP 179 บน Firewall/ACL ทั้ง 2 ทิศทาง" },
      { id: "check-auth", label: "ตรวจสอบ BGP Authentication (password) ถ้ามีการ config" },
      { id: "2", label: "BGP Session ขึ้นแล้ว — ตรวจสอบ Prefix ที่รับ/ส่ง" },
    ],
    commands: [
      "show bgp summary",
      "show ip bgp neighbors <ip>",
      "ping <neighbor-ip> source <local-ip>",
      "debug ip bgp <neighbor-ip> events",
      "show ip bgp",
    ],
    rcaTemplate: {
      problem:     "BGP Peer ไม่ขึ้น Established",
      impact:      "ไม่มี BGP Route — Traffic ออก ISP ไม่ได้",
      rootCause:   "TCP 179 ถูกบล็อก / IP ไม่ถึงกัน / remote-as ผิด / password ไม่ตรง",
      fixApplied:  "แก้ไข ACL, ตั้ง IP ใหม่, หรือ config BGP auth ใหม่",
      prevention:  "ทดสอบ TCP connectivity ก่อน BGP config, Document AS Number ไว้เสมอ",
    },
  },
];

export const guideCategories = Array.from(new Set(troubleshootingGuides.map((g) => g.category)));

export function getGuideById(id: string) {
  return troubleshootingGuides.find((g) => g.id === id);
}
