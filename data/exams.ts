/* ─── Types ─────────────────────────────────────────────────────── */
export interface ExamQuestion {
  id:       string;
  question: string;
  options:  string[];
  answer:   number;           // 0-based index
  explain?: string;
}

export interface Exam {
  id:           string;
  title:        string;
  category:     string;
  description:  string;
  level:        "Beginner" | "Intermediate" | "Advanced";
  timeLimit:    number;        // minutes
  passingScore: number;        // percentage
  questions:    ExamQuestion[];
  certName:     string;
  icon:         string;
  relatedCourse?: string;
}

/* ─── Data ───────────────────────────────────────────────────────── */
export const exams: Exam[] = [

  /* ══════════════════════════════════════════════════
   *  1. Network Fundamentals
   * ══════════════════════════════════════════════════ */
  {
    id:           "network-fundamentals-exam",
    title:        "Network Fundamentals",
    category:     "Foundation",
    level:        "Beginner",
    description:  "ทดสอบความเข้าใจพื้นฐาน OSI Model, IP Addressing, Subnetting และ Basic Protocols",
    timeLimit:    30,
    passingScore: 70,
    certName:     "NetPath Foundation Certificate",
    icon:         "🌐",
    relatedCourse: "network-fundamentals",
    questions: [
      {
        id: "nf-1",
        question: "OSI Model มีกี่ Layer?",
        options: ["5", "6", "7", "8"],
        answer: 2,
        explain: "OSI Model มี 7 Layer: Physical, Data Link, Network, Transport, Session, Presentation, Application",
      },
      {
        id: "nf-2",
        question: "Layer ใดใน OSI Model ที่รับผิดชอบการ routing?",
        options: ["Layer 1 – Physical", "Layer 2 – Data Link", "Layer 3 – Network", "Layer 4 – Transport"],
        answer: 2,
        explain: "Layer 3 (Network) รับผิดชอบ Logical Addressing และ Routing",
      },
      {
        id: "nf-3",
        question: "IP Address 192.168.1.0/24 มี usable host ได้กี่ตัว?",
        options: ["252", "254", "256", "255"],
        answer: 1,
        explain: "2^8 - 2 = 254 (หัก Network address และ Broadcast address)",
      },
      {
        id: "nf-4",
        question: "โปรโตคอลใดทำงานที่ Layer 4 และ connection-oriented?",
        options: ["UDP", "TCP", "IP", "ICMP"],
        answer: 1,
        explain: "TCP (Transmission Control Protocol) เป็น connection-oriented ที่ Layer 4",
      },
      {
        id: "nf-5",
        question: "Subnet mask ของ /26 คืออะไร?",
        options: ["255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240"],
        answer: 1,
        explain: "/26 = 11111111.11111111.11111111.11000000 = 255.255.255.192",
      },
      {
        id: "nf-6",
        question: "คำสั่งใดใช้ตรวจสอบ IP address บน Cisco Router?",
        options: ["show ip route", "show ip interface brief", "show running-config", "show interfaces"],
        answer: 1,
        explain: "show ip interface brief แสดง IP address และ status ของทุก interface",
      },
      {
        id: "nf-7",
        question: "VLAN ทำงานที่ OSI Layer ใด?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        answer: 1,
        explain: "VLAN (Virtual LAN) ทำงานที่ Layer 2 (Data Link Layer)",
      },
      {
        id: "nf-8",
        question: "โปรโตคอลใดใช้สำหรับ Dynamic IP Assignment?",
        options: ["DNS", "ARP", "DHCP", "NAT"],
        answer: 2,
        explain: "DHCP (Dynamic Host Configuration Protocol) จ่าย IP address อัตโนมัติ",
      },
      {
        id: "nf-9",
        question: "Default gateway คืออะไร?",
        options: [
          "IP address ของ DNS Server",
          "IP address ของ Router ที่ใช้ออกนอก Network",
          "IP address สุดท้ายใน Subnet",
          "IP ของ DHCP Server",
        ],
        answer: 1,
        explain: "Default gateway คือ IP ของ Router ที่ Host ใช้ส่ง Packet ไปยัง Network อื่น",
      },
      {
        id: "nf-10",
        question: "คำสั่ง ping ใช้โปรโตคอลใด?",
        options: ["TCP", "UDP", "ICMP", "ARP"],
        answer: 2,
        explain: "ping ใช้ ICMP (Internet Control Message Protocol) Echo Request/Reply",
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   *  2. CCNA-Style Routing & Switching
   * ══════════════════════════════════════════════════ */
  {
    id:           "ccna-routing-switching",
    title:        "CCNA: Routing & Switching",
    category:     "Routing",
    level:        "Intermediate",
    description:  "ข้อสอบจำลอง CCNA ครอบคลุม OSPF, EIGRP, BGP, STP, VLANs และ EtherChannel",
    timeLimit:    45,
    passingScore: 72,
    certName:     "NetPath CCNA Simulation Certificate",
    icon:         "🎯",
    questions: [
      {
        id: "ccna-1",
        question: "OSPF ใช้ Algorithm ใดในการคำนวณ Best Path?",
        options: ["Bellman-Ford", "Dijkstra (SPF)", "Distance Vector", "DUAL"],
        answer: 1,
        explain: "OSPF ใช้ Dijkstra Shortest Path First (SPF) Algorithm",
      },
      {
        id: "ccna-2",
        question: "Default Administrative Distance ของ OSPF คือ?",
        options: ["90", "100", "110", "120"],
        answer: 2,
        explain: "OSPF มี AD = 110 (EIGRP = 90, RIP = 120)",
      },
      {
        id: "ccna-3",
        question: "STP Root Bridge ถูกเลือกโดยใช้เกณฑ์ใด?",
        options: [
          "Highest MAC Address",
          "Lowest Bridge ID (Priority + MAC)",
          "Highest Priority",
          "Fastest Port",
        ],
        answer: 1,
        explain: "Root Bridge = Router ที่มี Bridge ID ต่ำสุด (Priority 0–65535 + MAC address)",
      },
      {
        id: "ccna-4",
        question: "คำสั่งใดใช้ตั้งค่า VLAN Trunk บน Cisco Switch?",
        options: [
          "switchport mode access",
          "switchport trunk allowed vlan",
          "switchport mode trunk",
          "switchport encapsulation dot1q",
        ],
        answer: 2,
        explain: "switchport mode trunk เปิด port เป็น trunk โดยใช้ 802.1Q encapsulation",
      },
      {
        id: "ccna-5",
        question: "EtherChannel ประกอบด้วย protocol อะไรบ้าง? (เลือก 2)",
        options: ["LACP (802.3ad)", "PAGP", "STP", "RSTP"],
        answer: 0,
        explain: "EtherChannel ใช้ LACP (IEEE 802.3ad) หรือ PAgP (Cisco proprietary)",
      },
      {
        id: "ccna-6",
        question: "OSPF DR/BDR Election ใช้เกณฑ์ใดก่อน?",
        options: ["Router ID", "OSPF Priority", "Interface Cost", "Uptime"],
        answer: 1,
        explain: "เลือก DR/BDR จาก OSPF Priority สูงสุด (default = 1) ถ้าเท่ากันดู Router ID",
      },
      {
        id: "ccna-7",
        question: "BGP ถูกเรียกว่า Protocol ประเภทใด?",
        options: ["Link-State", "Distance Vector", "Path Vector", "Hybrid"],
        answer: 2,
        explain: "BGP เป็น Path Vector Protocol ใช้ AS-PATH attribute ในการเลือก route",
      },
      {
        id: "ccna-8",
        question: "ข้อใดคือ Private IP Range ตาม RFC 1918?",
        options: [
          "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
          "172.0.0.0/8, 192.0.0.0/8, 10.0.0.0/8",
          "10.0.0.0/16, 172.16.0.0/16, 192.168.0.0/24",
          "1.0.0.0/8, 2.0.0.0/8, 3.0.0.0/8",
        ],
        answer: 0,
        explain: "RFC 1918: 10.0.0.0/8, 172.16.0.0/12 (172.16–31.x.x), 192.168.0.0/16",
      },
      {
        id: "ccna-9",
        question: "NAT Overload (PAT) ทำงานอย่างไร?",
        options: [
          "แปลง 1 Public IP เป็น 1 Private IP",
          "แปลง Private IP หลายตัวเป็น 1 Public IP โดยใช้ Port number",
          "แจก IP อัตโนมัติจาก Pool",
          "ใช้ Static mapping ทุก IP",
        ],
        answer: 1,
        explain: "PAT (Port Address Translation) รวม Private IP หลายตัวผ่าน 1 Public IP โดยต่างกันที่ Port",
      },
      {
        id: "ccna-10",
        question: "คำสั่งใดดู OSPF neighbor relationships?",
        options: ["show ip ospf", "show ip ospf neighbor", "show ip route ospf", "debug ip ospf adj"],
        answer: 1,
        explain: "show ip ospf neighbor แสดง Neighbor ID, State, Dead Time และ Interface",
      },
      {
        id: "ccna-11",
        question: "PortFast ใน STP ควรใช้กับ port ประเภทใด?",
        options: ["Trunk ports", "Uplink ports", "End-device (host) ports", "Port-channel"],
        answer: 2,
        explain: "PortFast ใช้กับ access port ที่เชื่อมต่อ end-device เพื่อข้าม Listening/Learning state",
      },
      {
        id: "ccna-12",
        question: "EIGRP Metric คำนวณจากอะไรเป็น default?",
        options: ["Bandwidth + Delay", "Hop Count", "Cost (Bandwidth)", "MTU + Load"],
        answer: 0,
        explain: "EIGRP ใช้ Bandwidth และ Delay เป็น default metric (K1=1, K3=1)",
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   *  3. Network Security
   * ══════════════════════════════════════════════════ */
  {
    id:           "network-security-exam",
    title:        "Network Security Essentials",
    category:     "Security",
    level:        "Intermediate",
    description:  "ทดสอบความรู้ด้าน Firewall, ACL, VPN, IDS/IPS และ Common Network Attacks",
    timeLimit:    35,
    passingScore: 75,
    certName:     "NetPath Security Certificate",
    icon:         "🔒",
    questions: [
      {
        id: "sec-1",
        question: "Stateful Firewall แตกต่างจาก Stateless อย่างไร?",
        options: [
          "Stateful ตรวจสอบเฉพาะ IP Header",
          "Stateful ติดตาม connection state table",
          "Stateless เร็วกว่าและ Secure กว่า",
          "Stateful ทำงานที่ Layer 2",
        ],
        answer: 1,
        explain: "Stateful Firewall รักษา connection table ทำให้ track ได้ว่า packet เป็นส่วนของ session ที่อนุญาตแล้วหรือไม่",
      },
      {
        id: "sec-2",
        question: "การโจมตีแบบ Man-in-the-Middle (MITM) คืออะไร?",
        options: [
          "Flood packets จำนวนมากไปยัง Target",
          "ผู้โจมตีแทรกตัวระหว่างการสื่อสาร 2 ฝ่าย",
          "เดารหัสผ่านด้วย Dictionary",
          "Inject SQL ลงใน Database",
        ],
        answer: 1,
        explain: "MITM คือผู้โจมตีอยู่ระหว่าง Client-Server แล้ว intercept หรือ modify traffic",
      },
      {
        id: "sec-3",
        question: "VPN ย่อมาจากอะไร?",
        options: ["Virtual Protocol Network", "Virtual Private Network", "Very Protected Network", "Verified Public Network"],
        answer: 1,
        explain: "VPN = Virtual Private Network — สร้าง encrypted tunnel ผ่าน Public network",
      },
      {
        id: "sec-4",
        question: "IDS แตกต่างจาก IPS อย่างไร?",
        options: [
          "IDS Block traffic, IPS แค่ Alert",
          "IDS แค่ Detect & Alert, IPS Detect & Block",
          "IDS ทำงานที่ Layer 7, IPS ทำงานที่ Layer 3",
          "ไม่แตกต่างกัน",
        ],
        answer: 1,
        explain: "IDS (Detection System) แค่ตรวจจับและแจ้งเตือน แต่ IPS (Prevention System) ตรวจจับและบล็อกได้",
      },
      {
        id: "sec-5",
        question: "Extended ACL ควรวางไว้ที่ใด?",
        options: [
          "ใกล้ Destination มากที่สุด",
          "ใกล้ Source มากที่สุด",
          "ตรงกลาง Network",
          "บน Firewall เท่านั้น",
        ],
        answer: 1,
        explain: "Extended ACL ควรวางใกล้ Source เพื่อลด unnecessary traffic traversal",
      },
      {
        id: "sec-6",
        question: "DoS Attack คืออะไร?",
        options: [
          "เจาะเข้า Database",
          "ส่ง Traffic จำนวนมากจนทำให้ Service ไม่ตอบสนอง",
          "ปลอม MAC Address",
          "Capture packet ใน Network",
        ],
        answer: 1,
        explain: "Denial of Service (DoS) คือการ flood traffic จนทำให้ target ไม่สามารถให้บริการได้",
      },
      {
        id: "sec-7",
        question: "HTTPS ใช้ Port ใด?",
        options: ["80", "443", "8080", "8443"],
        answer: 1,
        explain: "HTTPS ใช้ Port 443 พร้อม TLS/SSL encryption",
      },
      {
        id: "sec-8",
        question: "การทำ Port Security บน Cisco Switch ป้องกันอะไร?",
        options: [
          "DDoS Attack",
          "การเชื่อมต่อ Unauthorized MAC Address",
          "VLAN Hopping",
          "ARP Spoofing",
        ],
        answer: 1,
        explain: "Port Security จำกัด MAC address ที่อนุญาตต่อ port เพื่อป้องกัน unauthorized device",
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   *  4. BGP & Advanced Routing
   * ══════════════════════════════════════════════════ */
  {
    id:           "bgp-advanced-exam",
    title:        "BGP & Advanced Routing",
    category:     "Routing",
    level:        "Advanced",
    description:  "ข้อสอบระดับสูงครอบคลุม BGP Attributes, Route Policies, MPLS และ Traffic Engineering",
    timeLimit:    50,
    passingScore: 70,
    certName:     "NetPath BGP Expert Certificate",
    icon:         "🏆",
    relatedCourse: "bgp-routing",
    questions: [
      {
        id: "bgp-1",
        question: "BGP Well-Known Mandatory Attributes ได้แก่?",
        options: [
          "AS-PATH, NEXT-HOP, ORIGIN",
          "LOCAL-PREF, MED, COMMUNITY",
          "WEIGHT, CLUSTER-LIST, ORIGINATOR-ID",
          "AS-PATH, LOCAL-PREF, AGGREGATOR",
        ],
        answer: 0,
        explain: "Well-Known Mandatory: ORIGIN, AS-PATH, NEXT-HOP ต้องมีใน BGP Update ทุกครั้ง",
      },
      {
        id: "bgp-2",
        question: "BGP Best Path Selection — ลำดับแรกสุดที่ตรวจสอบคือ?",
        options: ["AS-PATH Length", "LOCAL-PREF", "WEIGHT", "MED"],
        answer: 2,
        explain: "WEIGHT (Cisco proprietary, local to router) ถูกตรวจสอบก่อน ค่าสูงสุดชนะ",
      },
      {
        id: "bgp-3",
        question: "eBGP ต่างจาก iBGP ในเรื่อง Next-Hop อย่างไร?",
        options: [
          "iBGP เปลี่ยน Next-Hop เป็น self เสมอ",
          "eBGP เปลี่ยน Next-Hop เป็น IP ตัวเองก่อนส่งต่อ",
          "iBGP และ eBGP เปลี่ยน Next-Hop เหมือนกัน",
          "Next-Hop ไม่มีความแตกต่าง",
        ],
        answer: 1,
        explain: "eBGP จะ update Next-Hop เป็น IP ของ outgoing interface ก่อนส่งให้ neighbor",
      },
      {
        id: "bgp-4",
        question: "BGP Route Reflector แก้ปัญหาอะไร?",
        options: [
          "iBGP Full-Mesh requirement",
          "eBGP Loop Prevention",
          "BGP Convergence Time",
          "AS-PATH Manipulation",
        ],
        answer: 0,
        explain: "Route Reflector แก้ปัญหา iBGP ต้องการ full-mesh topology (n*(n-1)/2 peerings)",
      },
      {
        id: "bgp-5",
        question: "MPLS Label ถูกแทรกอยู่ที่ Layer ใด?",
        options: ["Layer 1", "Layer 2.5 (ระหว่าง Layer 2 และ 3)", "Layer 3", "Layer 4"],
        answer: 1,
        explain: "MPLS Label ถูกเรียกว่า 'Layer 2.5' แทรกระหว่าง Ethernet header (L2) และ IP header (L3)",
      },
      {
        id: "bgp-6",
        question: "BGP Community WELL_KNOWN ค่า no-export หมายความว่าอย่างไร?",
        options: [
          "ไม่ advertise route ไปยัง eBGP peer ใดเลย",
          "ลบ route ออกจาก table",
          "ส่ง route เฉพาะ iBGP peer",
          "ตั้ง LOCAL-PREF เป็น 0",
        ],
        answer: 0,
        explain: "no-export (65535:65281) บอกให้ไม่ส่ง prefix นี้ไปยัง eBGP peer ข้าง AS boundary",
      },
      {
        id: "bgp-7",
        question: "LOCAL-PREF ใช้ใน BGP เพื่ออะไร?",
        options: [
          "เลือก exit point ออกจาก AS",
          "กำหนด Path สำหรับ Traffic เข้า AS",
          "ป้องกัน Routing Loop",
          "แทน WEIGHT attribute",
        ],
        answer: 0,
        explain: "LOCAL-PREF (default 100) ใช้ใน iBGP เพื่อบอก Router ใน AS เดียวกันว่าใช้ exit point ไหน — ค่าสูงกว่าชนะ",
      },
      {
        id: "bgp-8",
        question: "คำสั่งใดใช้ตรวจสอบ BGP RIB บน Cisco IOS?",
        options: ["show ip bgp", "show bgp summary", "show ip route bgp", "debug ip bgp updates"],
        answer: 0,
        explain: "show ip bgp แสดง BGP Routing Information Base (RIB) พร้อม attributes ทั้งหมด",
      },
      {
        id: "bgp-9",
        question: "AS-PATH Prepending ใช้เพื่ออะไร?",
        options: [
          "ทำให้ route มี priority สูงขึ้น",
          "ทำให้ path ดูยาวขึ้นเพื่อให้ neighbor เลือก path อื่นแทน",
          "เพิ่ม LOCAL-PREF",
          "ป้องกัน iBGP Loop",
        ],
        answer: 1,
        explain: "AS-PATH Prepend เพิ่ม AS number ซ้ำๆ เพื่อทำให้ path ดู longer → BGP จะเลือก path ที่ shorter แทน",
      },
      {
        id: "bgp-10",
        question: "iBGP Synchronization rule กำหนดว่าอะไร?",
        options: [
          "iBGP ต้อง sync กับ IGP ก่อน advertise route ออก eBGP",
          "iBGP ต้องมี full-mesh",
          "iBGP ต้องใช้ Loopback เป็น peer address",
          "iBGP ต้อง update ทุก 30 วินาที",
        ],
        answer: 0,
        explain: "Synchronization: iBGP router จะไม่ advertise route จนกว่า IGP จะรู้ route นั้นก่อน (ปัจจุบัน disable by default)",
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   *  5. IPv6 & Modern Networking
   * ══════════════════════════════════════════════════ */
  {
    id:           "ipv6-exam",
    title:        "IPv6 & Modern Networking",
    category:     "IPv6",
    level:        "Intermediate",
    description:  "ทดสอบความรู้ IPv6 Addressing, NDP, OSPFv3, DHCPv6 และ Transition Mechanisms",
    timeLimit:    30,
    passingScore: 72,
    certName:     "NetPath IPv6 Certificate",
    icon:         "6️⃣",
    relatedCourse: "ipv6-deep-dive",
    questions: [
      {
        id: "ipv6-1",
        question: "IPv6 address มีขนาดเท่าไร?",
        options: ["32 bits", "64 bits", "128 bits", "256 bits"],
        answer: 2,
        explain: "IPv6 ใช้ 128-bit address เทียบกับ IPv4 ที่ใช้ 32-bit",
      },
      {
        id: "ipv6-2",
        question: "Loopback address ใน IPv6 คือ?",
        options: ["::1", "FE80::1", "FF02::1", "2001::1"],
        answer: 0,
        explain: "::1 คือ IPv6 Loopback (เทียบกับ 127.0.0.1 ใน IPv4)",
      },
      {
        id: "ipv6-3",
        question: "NDP ทำหน้าที่แทน Protocol ใดใน IPv4?",
        options: ["OSPF", "ARP และ ICMP Router Discovery", "DHCP", "NAT"],
        answer: 1,
        explain: "NDP (Neighbor Discovery Protocol) แทน ARP (L2 resolution) และ Router Discovery ใน IPv4",
      },
      {
        id: "ipv6-4",
        question: "Link-Local Address ใน IPv6 ขึ้นต้นด้วยอะไร?",
        options: ["2001:", "FC00:", "FE80:", "FF02:"],
        answer: 2,
        explain: "Link-Local address ขึ้นต้นด้วย FE80::/10 ใช้ได้เฉพาะใน local link",
      },
      {
        id: "ipv6-5",
        question: "SLAAC ย่อมาจากอะไร?",
        options: [
          "Stateless Address Auto-Configuration",
          "Static Link Auto Address Configuration",
          "Secure Local Area Address Control",
          "System Level Address Auto-Config",
        ],
        answer: 0,
        explain: "SLAAC = Stateless Address Auto-Configuration — Host กำหนด IPv6 address เองจาก Router Advertisement",
      },
      {
        id: "ipv6-6",
        question: "Multicast address FF02::1 หมายถึงอะไร?",
        options: ["All Routers", "All Nodes (hosts) on link", "OSPF Routers", "DHCPv6 Servers"],
        answer: 1,
        explain: "FF02::1 = All Nodes multicast address — ส่งถึงทุก IPv6 node บน local link",
      },
      {
        id: "ipv6-7",
        question: "6to4 Tunnel ใช้เพื่ออะไร?",
        options: [
          "เชื่อมต่อ IPv6 network ผ่าน IPv4 infrastructure",
          "แปลง IPv6 เป็น IPv4",
          "เพิ่ม security ให้ IPv6",
          "ลด size ของ IPv6 header",
        ],
        answer: 0,
        explain: "6to4 Tunnel encapsulate IPv6 packet ใน IPv4 header เพื่อข้าม IPv4-only network",
      },
      {
        id: "ipv6-8",
        question: "OSPFv3 ต่างจาก OSPFv2 อย่างไร?",
        options: [
          "OSPFv3 ใช้ Link-State algorithm ต่างกัน",
          "OSPFv3 Advertise prefix แยกจาก topology",
          "OSPFv3 ไม่มี Area concept",
          "OSPFv3 ใช้ TCP แทน IP",
        ],
        answer: 1,
        explain: "OSPFv3 แยก prefix/address information ออกจาก topology information (ใช้ LSA Type ใหม่)",
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   *  6. Network Automation
   * ══════════════════════════════════════════════════ */
  {
    id:           "automation-exam",
    title:        "Network Automation & DevOps",
    category:     "Automation",
    level:        "Advanced",
    description:  "ทดสอบ Python Netmiko, Ansible, RESTCONF, NETCONF และ Infrastructure as Code",
    timeLimit:    40,
    passingScore: 70,
    certName:     "NetPath Automation Certificate",
    icon:         "🤖",
    relatedCourse: "network-automation",
    questions: [
      {
        id: "auto-1",
        question: "Netmiko ใช้สำหรับอะไร?",
        options: [
          "Monitor network performance",
          "เชื่อมต่อและ automate network devices ผ่าน SSH",
          "สร้าง Virtual Network",
          "Analyze packet capture",
        ],
        answer: 1,
        explain: "Netmiko เป็น Python library สำหรับ SSH connection และ automation บน multi-vendor devices",
      },
      {
        id: "auto-2",
        question: "YANG ในบริบท Network Automation คืออะไร?",
        options: [
          "Python framework สำหรับ Network",
          "Data Modeling Language สำหรับ Network configuration",
          "Protocol สำหรับ Network Monitoring",
          "Programming language สำหรับ Router",
        ],
        answer: 1,
        explain: "YANG (Yet Another Next Generation) เป็น data modeling language ใช้กับ NETCONF/RESTCONF",
      },
      {
        id: "auto-3",
        question: "Ansible ใช้ File ประเภทใดในการกำหนด Tasks?",
        options: ["JSON", "XML", "YAML Playbook", "Python Script"],
        answer: 2,
        explain: "Ansible ใช้ YAML Playbook (.yml) ในการกำหนด tasks, hosts, และ variables",
      },
      {
        id: "auto-4",
        question: "RESTCONF ใช้ HTTP Method ใดในการ Update Configuration?",
        options: ["GET", "POST", "PUT/PATCH", "DELETE"],
        answer: 2,
        explain: "PUT แทนที่ resource ทั้งหมด, PATCH แก้ไข partial — ทั้งคู่ใช้ update configuration",
      },
      {
        id: "auto-5",
        question: "GitOps ในบริบท Network คืออะไร?",
        options: [
          "ใช้ Git clone configurations",
          "ใช้ Git เป็น single source of truth และ trigger automation",
          "Backup Router config ไปที่ Git",
          "Version control สำหรับ Ansible",
        ],
        answer: 1,
        explain: "GitOps ใช้ Git repository เป็น source of truth แล้ว pipeline automation apply configuration อัตโนมัติ",
      },
      {
        id: "auto-6",
        question: "JSON Path `$.interfaces[0].name` หมายถึงอะไร?",
        options: [
          "interface ทั้งหมด",
          "ชื่อของ interface แรกใน array",
          "จำนวน interface",
          "IP address ของ interface",
        ],
        answer: 1,
        explain: "$ = root, interfaces = key, [0] = index แรก, .name = field name",
      },
      {
        id: "auto-7",
        question: "Infrastructure as Code (IaC) หมายถึงอะไร?",
        options: [
          "เขียน code ให้ทำงานบน Router",
          "บริหาร infrastructure ผ่าน configuration files และ automation",
          "Compile code เป็น Firmware",
          "ใช้ Python แทน CLI",
        ],
        answer: 1,
        explain: "IaC บริหาร servers, network, storage ผ่าน machine-readable configuration files แทนการ configure manual",
      },
      {
        id: "auto-8",
        question: "Terraform ต่างจาก Ansible อย่างไร?",
        options: [
          "Terraform ใช้ YAML, Ansible ใช้ HCL",
          "Terraform เน้น infrastructure provisioning, Ansible เน้น configuration management",
          "Ansible รองรับ Cloud เท่านั้น",
          "Terraform ต้องการ Agent บน Device",
        ],
        answer: 1,
        explain: "Terraform (HCL) เหมาะกับการสร้าง infrastructure ใหม่ (provision) ส่วน Ansible เหมาะกับ configure/deploy บน existing infra",
      },
    ],
  },
];

export function getExamById(id: string): Exam | undefined {
  return exams.find(e => e.id === id);
}

export const examCategories = Array.from(new Set(exams.map(e => e.category)));
