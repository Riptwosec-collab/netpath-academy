import type { Lesson, FoundationCategory } from "@/types/course";

// ─── Shared quiz + interview helpers ─────────────────────────────
const makeQ = (
  question: string,
  choices: string[],
  answer: string,
  explanation: string
) => ({ question, choices, answer, explanation });

const makeI = (
  level: "Junior" | "Mid" | "Senior",
  question: string,
  answerGuide: string
) => ({ level, question, answerGuide });

// ─────────────────────────────────────────────────────────────────
// FOUNDATION LESSONS
// ─────────────────────────────────────────────────────────────────

const networkFundamentals: Lesson = {
  id: "found-001",
  slug: "network-fundamentals",
  title: "Network Fundamentals",
  titleTh: "พื้นฐาน Network",
  track: "foundation",
  category: "fundamentals",
  level: "Beginner",
  duration: "45 min",
  xp: 50,
  description: "เรียนรู้พื้นฐาน Network ว่า Network คืออะไร ทำงานอย่างไร และ Component หลักมีอะไรบ้าง",
  objectives: [
    "อธิบายว่า Network คืออะไรและทำไมถึงสำคัญ",
    "ระบุ Component หลักของ Network ได้",
    "เข้าใจความแตกต่างระหว่าง LAN, WAN, MAN",
    "อธิบาย Unicast, Multicast, Broadcast ได้",
  ],
  prerequisites: [],
  concepts: ["LAN", "WAN", "MAN", "Topology", "Node", "Host", "Protocol", "Bandwidth", "Latency", "Unicast", "Multicast", "Broadcast"],
  architecture: "Network เชื่อมต่อ Device หลายตัวเข้าด้วยกันผ่าน Switch, Router และ Cable เพื่อให้แลกเปลี่ยนข้อมูลกันได้",
  mermaidDiagram: `graph LR
    PC1[💻 PC1] --> SW[🔀 Switch]
    PC2[💻 PC2] --> SW
    PC3[💻 PC3] --> SW
    SW --> RT[🌐 Router]
    RT --> INT[☁️ Internet]`,
  trafficFlow: [
    "PC1 ส่ง Packet ไปยัง Switch",
    "Switch ดู MAC Address แล้วส่ง Frame ไปยัง PC เป้าหมาย",
    "ถ้า Destination อยู่ต่าง Network — Switch ส่งไปให้ Router",
    "Router ดู IP Address แล้วส่งไปยัง Network ปลายทาง",
  ],
  commands: [
    { command: "ping 192.168.1.1", description: "ทดสอบ Connectivity ไปยัง Gateway" },
    { command: "traceroute 8.8.8.8", description: "ดู Path ที่ Packet เดินทาง" },
    { command: "ipconfig", description: "ดู IP Config บน Windows" },
    { command: "ip addr show", description: "ดู IP Config บน Linux" },
  ],
  labs: [
    {
      title: "Basic Network Connectivity Check",
      level: "Beginner",
      estimatedMinutes: 20,
      steps: [
        "เปิด Terminal หรือ Command Prompt",
        "รัน ipconfig (Windows) หรือ ip addr (Linux) เพื่อดู IP Address ของเครื่อง",
        "รัน ping 127.0.0.1 เพื่อทดสอบ Loopback",
        "รัน ping <gateway-ip> เพื่อทดสอบ LAN Connectivity",
        "รัน ping 8.8.8.8 เพื่อทดสอบ Internet Connectivity",
        "รัน traceroute 8.8.8.8 เพื่อดู Network Path",
      ],
      verification: [
        "ping ทุกตัวต้อง Reply กลับมา",
        "traceroute แสดง Hop แต่ละ Hop ได้",
      ],
    },
  ],
  troubleshooting: [
    {
      symptom: "ping ไม่ได้ ขึ้น Request timed out",
      possibleCause: "Firewall บล็อก ICMP, Cable หลุด, หรือ IP Config ผิด",
      check: "ตรวจ ipconfig, ตรวจ Cable, ตรวจ Firewall",
      fix: "แก้ IP Config, เสียบ Cable, ปิด Firewall ชั่วคราว",
    },
  ],
  quiz: [
    makeQ(
      "LAN ย่อมาจากอะไร?",
      ["Large Area Network", "Local Area Network", "Logical Area Network", "Linked Area Network"],
      "Local Area Network",
      "LAN = Local Area Network เชื่อมต่อ Device ในพื้นที่เดียวกัน เช่น ออฟฟิศ หรือบ้าน"
    ),
    makeQ(
      "Protocol ในทางเครือข่ายคืออะไร?",
      ["อุปกรณ์เครือข่าย", "กฎที่กำหนดวิธีการสื่อสาร", "ชนิดของสาย", "ชื่อของเครือข่าย"],
      "กฎที่กำหนดวิธีการสื่อสาร",
      "Protocol คือชุดกฎที่ทุก Device ต้องทำตามเพื่อให้สื่อสารกันได้ เช่น TCP/IP, HTTP, DNS"
    ),
    makeQ(
      "Broadcast คือการส่งข้อมูลในรูปแบบใด?",
      ["ส่งถึง Device เดียว", "ส่งถึง Group ที่เลือก", "ส่งถึงทุก Device ใน Network", "ส่งถึง Router"],
      "ส่งถึงทุก Device ใน Network",
      "Broadcast ส่งข้อมูลไปยัง Device ทุกตัวใน Network Segment เดียวกัน"
    ),
    makeQ(
      "อุปกรณ์ใดทำหน้าที่เชื่อมต่อระหว่าง Network ต่างๆ?",
      ["Switch", "Hub", "Router", "Access Point"],
      "Router",
      "Router ทำงานที่ Layer 3 ดู IP Address เพื่อส่ง Packet ระหว่าง Network ที่ต่างกัน"
    ),
    makeQ(
      "Latency คืออะไร?",
      ["ความเร็วในการส่งข้อมูล", "ระยะเวลาที่ข้อมูลใช้เดินทาง", "ขนาดของ Packet", "จำนวน Device ใน Network"],
      "ระยะเวลาที่ข้อมูลใช้เดินทาง",
      "Latency หรือ Delay คือเวลาที่ใช้ในการส่งข้อมูลจาก Source ถึง Destination วัดเป็น milliseconds"
    ),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบายความแตกต่างระหว่าง LAN กับ WAN", "LAN = Local (ออฟฟิศ, บ้าน) ระยะสั้น bandwidth สูง; WAN = Wide (ข้ามประเทศ, Internet) ระยะไกล bandwidth ต่ำกว่า ผ่าน ISP"),
    makeI("Mid", "ทำไม Protocol ถึงจำเป็น?", "Protocol กำหนดมาตรฐานกลางให้ Device ต่างยี่ห้อต่าง OS คุยกันได้ ถ้าไม่มีก็ต้องใช้อุปกรณ์ยี่ห้อเดียวกันหมด"),
    makeI("Senior", "อธิบาย Network Topology ชนิดต่างๆ และเลือกใช้เมื่อไร?", "Star (ออฟฟิศ), Ring (เก่า ไม่ค่อยใช้), Mesh (Datacenter), Bus (เก่า), Hybrid (Enterprise ใหญ่ๆ) — แต่ละแบบมี trade-off เรื่อง fault tolerance, cost, complexity"),
  ],
  portfolioTask: {
    title: "Small Office Network Design",
    description: "ออกแบบ Network สำหรับออฟฟิศขนาดเล็ก 20 คน",
    deliverables: ["Network Diagram", "IP Plan", "Device List", "Brief Explanation"],
  },
  tags: ["Network", "LAN", "WAN", "Fundamentals", "Topology"],
  order: 1,
};

const osiModel: Lesson = {
  id: "found-002",
  slug: "osi-model",
  title: "OSI Model",
  titleTh: "OSI Model ทั้ง 7 ชั้น",
  track: "foundation",
  category: "fundamentals",
  level: "Beginner",
  duration: "60 min",
  xp: 50,
  description: "เรียนรู้ OSI 7 Layer ว่าแต่ละ Layer ทำอะไร อุปกรณ์อยู่ชั้นไหน และใช้ประโยชน์ในการ Troubleshoot อย่างไร",
  objectives: [
    "ท่องชื่อ 7 Layer ของ OSI Model ได้",
    "บอกหน้าที่ของแต่ละ Layer ได้",
    "ระบุว่า Device แต่ละชนิดอยู่ Layer ไหน",
    "ใช้ OSI Model เป็น Framework ในการ Troubleshoot ได้",
  ],
  prerequisites: ["network-fundamentals"],
  concepts: ["Physical", "Data Link", "Network", "Transport", "Session", "Presentation", "Application", "PDU", "Encapsulation", "Decapsulation"],
  mermaidDiagram: `graph TB
    subgraph OSI ["OSI 7 Layer Model"]
      L7["Layer 7 — Application\n HTTP, DNS, SMTP, FTP"]
      L6["Layer 6 — Presentation\n SSL/TLS, Encryption, Compression"]
      L5["Layer 5 — Session\n NetBIOS, RPC, SIP"]
      L4["Layer 4 — Transport\n TCP (reliable), UDP (fast)"]
      L3["Layer 3 — Network\n IP, OSPF, BGP — Router"]
      L2["Layer 2 — Data Link\n MAC, Ethernet, VLAN — Switch"]
      L1["Layer 1 — Physical\n Cable, Hub, NIC, Signal"]
    end
    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1`,
  commands: [
    { command: "show interfaces", description: "Layer 1/2 — Physical + Data Link status" },
    { command: "show ip route", description: "Layer 3 — Routing table" },
    { command: "netstat -an", description: "Layer 4 — Active TCP/UDP connections" },
    { command: "tcpdump -i eth0", description: "Capture packets across all layers" },
  ],
  labs: [
    {
      title: "OSI Layer Mapping Exercise",
      level: "Beginner",
      estimatedMinutes: 30,
      steps: [
        "เปิด Wireshark แล้ว Capture traffic บน interface",
        "Ping ไปยัง 8.8.8.8",
        "ดู Packet ที่ capture ได้ — สังเกต Layer แต่ละชั้น (Ethernet → IP → ICMP)",
        "ลอง HTTP request แล้วดู HTTP Header (Layer 7), TCP (Layer 4), IP (Layer 3)",
        "Map แต่ละ Protocol ไปยัง OSI Layer",
      ],
      verification: [
        "ระบุ Ethernet Header ว่าอยู่ Layer อะไร",
        "ระบุ IP Header ว่าอยู่ Layer อะไร",
        "ระบุ TCP/UDP Header ว่าอยู่ Layer อะไร",
      ],
    },
  ],
  troubleshooting: [
    {
      symptom: "ไม่สามารถ ping ได้แต่ interface ขึ้น up",
      possibleCause: "ปัญหาที่ Layer 3 — IP Config ผิด หรือ Route ขาด",
      check: "show ip interface brief, show ip route",
      fix: "แก้ IP Address / Subnet, เพิ่ม Route ที่ขาดหาย",
    },
    {
      symptom: "Interface down แต่ Cable เสียบอยู่",
      possibleCause: "ปัญหาที่ Layer 1/2 — สาย, SFP, หรือ Speed/Duplex mismatch",
      check: "show interfaces, ดู error counter, ลอง swap cable",
      fix: "เปลี่ยนสาย, เปลี่ยน SFP, fix speed/duplex",
    },
  ],
  quiz: [
    makeQ("OSI Layer ใดทำหน้าที่ส่ง IP Packet ระหว่าง Network?", ["Layer 2", "Layer 3", "Layer 4", "Layer 5"], "Layer 3", "Layer 3 = Network Layer ทำงานกับ IP Address และทำการ Routing ผ่าน Router"),
    makeQ("TCP อยู่ที่ Layer ไหนของ OSI?", ["Layer 3", "Layer 4", "Layer 5", "Layer 6"], "Layer 4", "Layer 4 = Transport Layer ใช้ TCP (reliable) หรือ UDP (fast) ในการส่งข้อมูล"),
    makeQ("Switch ทั่วไปทำงานที่ Layer ใด?", ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], "Layer 2", "Switch ทำงานที่ Layer 2 ใช้ MAC Address ตัดสินใจส่ง Frame"),
    makeQ("PDU ของ Layer 4 เรียกว่าอะไร?", ["Frame", "Packet", "Segment", "Bit"], "Segment", "Transport Layer (L4) PDU = Segment (TCP) หรือ Datagram (UDP)"),
    makeQ("SSL/TLS อยู่ที่ Layer ใด?", ["Layer 4", "Layer 5", "Layer 6", "Layer 7"], "Layer 6", "Presentation Layer (L6) จัดการ Encryption/Decryption, Compression, Format เช่น SSL/TLS"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย OSI 7 Layer และหน้าที่หลักของแต่ละ Layer", "L1 Physical (สายไฟ signal), L2 Data Link (MAC Frame switch), L3 Network (IP Route), L4 Transport (TCP/UDP segment), L5 Session, L6 Presentation (encrypt/compress), L7 Application (HTTP DNS)"),
    makeI("Mid", "Router ทำงานที่ Layer ไหน และทำไม?", "Router ทำงานที่ Layer 3 เพราะดู IP Header เพื่อ Route Packet ระหว่าง Network — บาง Router ยังทำ L4 QoS, L7 Firewall ด้วย"),
    makeI("Senior", "เวลา Troubleshoot Network problem คุณเริ่มจาก Layer ไหน?", "Top-down หรือ Bottom-up ขึ้นอยู่กับ symptom — ถ้า interface down ก็ bottom-up จาก L1; ถ้า Application ใช้ไม่ได้แต่ ping ได้ก็ top-down จาก L7"),
  ],
  tags: ["OSI", "Network", "Layer", "Protocol", "Troubleshooting"],
  order: 2,
};

const tcpipModel: Lesson = {
  id: "found-003",
  slug: "tcpip-model",
  title: "TCP/IP Model",
  titleTh: "TCP/IP Model",
  track: "foundation",
  category: "fundamentals",
  level: "Beginner",
  duration: "45 min",
  xp: 50,
  description: "เรียนรู้ TCP/IP Model 4 Layer ที่ใช้จริงในอินเทอร์เน็ต เปรียบเทียบกับ OSI และเข้าใจ 3-Way Handshake",
  objectives: [
    "อธิบาย TCP/IP 4 Layer ได้",
    "เปรียบเทียบ TCP/IP กับ OSI ได้",
    "อธิบาย TCP 3-Way Handshake ได้",
    "ระบุความแตกต่าง TCP vs UDP ได้",
  ],
  prerequisites: ["osi-model"],
  concepts: ["TCP", "UDP", "IP", "3-Way Handshake", "SYN", "SYN-ACK", "ACK", "Port", "Socket", "Reliable", "Connectionless"],
  mermaidDiagram: `sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: SYN (seq=100)
    S->>C: SYN-ACK (seq=200, ack=101)
    C->>S: ACK (ack=201)
    Note over C,S: Connection Established!
    C->>S: Data
    S->>C: ACK + Data`,
  commands: [
    { command: "netstat -an | grep ESTABLISHED", description: "ดู TCP connections ที่ active อยู่" },
    { command: "ss -tuln", description: "ดู open ports บน Linux" },
    { command: "tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'", description: "ดู SYN Packets" },
  ],
  labs: [
    {
      title: "TCP vs UDP Behavior",
      level: "Beginner",
      estimatedMinutes: 25,
      steps: [
        "เปิด Wireshark แล้ว start capture",
        "เปิด browser แล้วไปที่ http://example.com — ดู TCP 3-Way Handshake",
        "รัน nslookup google.com — ดู DNS query ใช้ UDP Port 53",
        "เปรียบเทียบ TCP vs UDP ใน Wireshark",
      ],
      verification: ["เห็น SYN, SYN-ACK, ACK sequence ใน TCP", "DNS ใช้ UDP Port 53"],
    },
  ],
  troubleshooting: [
    {
      symptom: "Connection timeout — ไม่สามารถเชื่อมต่อ Service ได้",
      possibleCause: "Port ไม่ได้ open, Firewall block, Service ไม่ได้ run",
      check: "telnet <ip> <port>, nmap -p <port> <ip>, netstat -tuln",
      fix: "เปิด Port บน Firewall, start Service, ตรวจ IP ว่าถูกต้อง",
    },
  ],
  quiz: [
    makeQ("TCP/IP Model มีกี่ Layer?", ["3", "4", "5", "7"], "4", "TCP/IP Model มี 4 Layer: Network Access, Internet, Transport, Application"),
    makeQ("TCP ต่างจาก UDP ข้อใดที่สำคัญที่สุด?", ["TCP เร็วกว่า UDP", "TCP รับประกันการส่งข้อมูล UDP ไม่รับประกัน", "UDP ใช้ Port สูงกว่า TCP", "TCP ไม่มี Header"], "TCP รับประกันการส่งข้อมูล UDP ไม่รับประกัน", "TCP Reliable — มี ACK, Retransmission; UDP Fast แต่ Best-effort ไม่มี ACK"),
    makeQ("Port 443 ใช้กับ Protocol ใด?", ["HTTP", "HTTPS", "FTP", "SSH"], "HTTPS", "Port 443 = HTTPS (HTTP over TLS/SSL) ใช้สำหรับ Web ที่เข้ารหัส"),
    makeQ("3-Way Handshake ขั้นตอนแรกคืออะไร?", ["ACK", "SYN-ACK", "SYN", "FIN"], "SYN", "Client ส่ง SYN ก่อน → Server ตอบ SYN-ACK → Client ส่ง ACK → Connection established"),
    makeQ("Protocol ใดเหมาะสำหรับ Video Streaming แบบ Real-time?", ["TCP", "UDP", "HTTP", "FTP"], "UDP", "UDP ไม่มี Retransmission — เหมาะกับ Real-time เพราะ Low latency แม้ packet drop บ้างก็ไม่เป็นไร"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย TCP 3-Way Handshake", "SYN (client ขอ connect) → SYN-ACK (server ตอบรับ) → ACK (client ยืนยัน) → เสร็จ สร้าง connection ได้"),
    makeI("Mid", "ทำไม DNS ถึงใช้ UDP แทน TCP?", "DNS query เล็กมาก UDP ตอบได้เร็ว ไม่ต้อง handshake — ถ้า response ใหญ่เกิน 512 bytes ค่อย fallback TCP"),
    makeI("Senior", "อธิบาย TCP Flow Control และ Congestion Control ต่างกันอย่างไร?", "Flow Control = Receiver บอก Sender ว่ารับได้แค่ไหน (Receive Window); Congestion Control = Sender ลด rate เมื่อ Network แน่น (CWND, Slow Start, AIMD)"),
  ],
  tags: ["TCP", "UDP", "IP", "Transport", "Protocol"],
  order: 3,
};

const ipv4: Lesson = {
  id: "found-004",
  slug: "ipv4-addressing",
  title: "IPv4 Addressing",
  titleTh: "IPv4 Address และ Subnetting",
  track: "foundation",
  category: "addressing",
  level: "Beginner",
  duration: "90 min",
  xp: 75,
  description: "เรียนรู้ IPv4 Address, Class, Subnet Mask, CIDR และการคำนวณ Subnet ด้วยมือและเครื่องมือ",
  objectives: [
    "อธิบาย IPv4 Address Structure ได้",
    "แยกแยะ Network ID และ Host ID",
    "คำนวณ Subnet ด้วย CIDR Notation",
    "ออกแบบ IP Addressing Plan สำหรับองค์กรขนาดเล็กได้",
  ],
  prerequisites: ["osi-model", "tcpip-model"],
  concepts: ["IPv4", "Octet", "Binary", "Subnet Mask", "CIDR", "Network ID", "Host ID", "Broadcast", "Network Address", "VLSM", "Private IP", "Public IP"],
  mermaidDiagram: `graph LR
    subgraph IP["192.168.1.100 /24"]
      NET["Network: 192.168.1.0"]
      HOST["Host: .100"]
      BC["Broadcast: 192.168.1.255"]
    end`,
  trafficFlow: [
    "PC ต้องการส่งข้อมูล: เช็คว่า Destination IP อยู่ใน Network เดียวกันหรือไม่",
    "Same Network → ส่งตรงผ่าน ARP หา MAC Address",
    "Different Network → ส่งไปที่ Default Gateway (Router)",
    "Router ดู Routing Table ส่งต่อ Packet ไปยัง Network ปลายทาง",
  ],
  commands: [
    { command: "ipcalc 192.168.1.0/24", description: "คำนวณ Subnet (Linux ipcalc)" },
    { command: "ip addr show eth0", description: "ดู IP Address บน Linux" },
    { command: "ipconfig /all", description: "ดู IP Config บน Windows" },
  ],
  labs: [
    {
      title: "Subnet Calculator Exercise",
      level: "Beginner",
      estimatedMinutes: 45,
      steps: [
        "ได้รับ Network: 10.0.0.0/8 ต้องแบ่งเป็น 4 Subnet สำหรับ 4 แผนก",
        "คำนวณ Subnet สำหรับแต่ละแผนก (Sales 50 hosts, IT 30 hosts, HR 20 hosts, Management 10 hosts)",
        "ใช้ VLSM เพื่อแบ่ง IP อย่างมีประสิทธิภาพ",
        "สร้าง IP Plan Table ระบุ Network, Subnet Mask, Gateway, Range, Broadcast",
        "ตรวจสอบด้วย ipcalc หรือ subnet calculator online",
      ],
      verification: ["ทุก Subnet ไม่ overlap กัน", "Host ในแต่ละ Subnet เพียงพอ", "Broadcast address ถูกต้อง"],
    },
  ],
  troubleshooting: [
    {
      symptom: "PC สอง Host Ping กันไม่ได้ทั้งที่อยู่ใน Switch เดียวกัน",
      possibleCause: "Subnet Mask ผิด ทำให้ Host คิดว่าอยู่คนละ Network",
      check: "ตรวจ ipconfig ทั้งสอง Host ว่า Subnet Mask ตรงกัน",
      fix: "แก้ Subnet Mask ให้ตรงกัน",
    },
  ],
  quiz: [
    makeQ("192.168.1.0/24 มีกี่ Host ที่ใช้งานได้?", ["254", "255", "256", "253"], "254", "/24 = 256 addresses − 2 (Network+Broadcast) = 254 usable hosts"),
    makeQ("Private IP Range ในกลุ่ม Class B คือ?", ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16"], "172.16.0.0/12", "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (RFC 1918)"),
    makeQ("/30 Subnet มีกี่ Host ที่ใช้ได้?", ["2", "4", "6", "30"], "2", "/30 = 4 addresses − 2 = 2 hosts เหมาะสำหรับ Point-to-Point Link"),
    makeQ("Loopback Address ใน IPv4 คือ?", ["192.168.0.1", "10.0.0.1", "127.0.0.1", "169.254.0.1"], "127.0.0.1", "127.0.0.1 เป็น Loopback — ใช้ทดสอบ TCP/IP Stack ของตัวเอง"),
    makeQ("CIDR /25 มี Subnet Mask เท่าไร?", ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.240"], "255.255.255.128", "/25 = 11111111.11111111.11111111.10000000 = 255.255.255.128"),
  ],
  interviewQuestions: [
    makeI("Junior", "คำนวณ: Network 192.168.10.0/26 มีกี่ Host?", "/26 = 64 addresses − 2 = 62 usable hosts; Range 192.168.10.1–192.168.10.62; Broadcast .63"),
    makeI("Mid", "อธิบาย VLSM และทำไมถึงดีกว่า Fixed-length Subnetting?", "VLSM = Variable Length Subnet Mask ใช้ /prefix ต่างกันในแต่ละ Subnet ทำให้ใช้ IP อย่างมีประสิทธิภาพ — เช่น /30 สำหรับ P2P link ไม่ต้องเสีย /24 ทั้งหมด"),
    makeI("Senior", "ออกแบบ IP Plan สำหรับบริษัทที่มี HQ + 3 Branch ใช้ 10.0.0.0/8", "แบ่งตาม Site ก่อน: HQ=10.1.0.0/16, Branch1=10.2.0.0/16, Branch2=10.3.0.0/16, Branch3=10.4.0.0/16 จากนั้นแบ่งย่อยภายใน Site ตาม VLAN/Function"),
  ],
  portfolioTask: {
    title: "Corporate IP Addressing Plan",
    description: "สร้าง IP Plan สำหรับบริษัทที่มี HQ และ 3 สาขา",
    deliverables: ["IP Plan Spreadsheet", "VLAN Design", "Subnet Diagram", "Justification Document"],
  },
  tags: ["IPv4", "Subnetting", "CIDR", "VLSM", "IP Address"],
  order: 4,
};

const vlanLesson: Lesson = {
  id: "found-005",
  slug: "vlan",
  title: "VLAN & Trunking",
  titleTh: "VLAN และ Trunking",
  track: "foundation",
  category: "switching",
  level: "Beginner",
  duration: "60 min",
  xp: 75,
  description: "เรียนรู้ VLAN คืออะไร ทำไมถึงใช้ วิธี Configure VLAN, Access Port, Trunk Port และ 802.1Q",
  objectives: [
    "อธิบาย VLAN และประโยชน์ได้",
    "Config VLAN บน Cisco Switch ได้",
    "Config Access Port และ Trunk Port ได้",
    "เข้าใจ 802.1Q Tagging",
  ],
  prerequisites: ["osi-model", "ipv4-addressing"],
  concepts: ["VLAN", "Access Port", "Trunk Port", "802.1Q", "Native VLAN", "VLAN Tagging", "Broadcast Domain", "Layer 2 Segmentation"],
  mermaidDiagram: `graph LR
    subgraph SW ["Switch"]
      P1["Port 1\nAccess VLAN10"]
      P2["Port 2\nAccess VLAN20"]
      P3["Port 3\nTrunk VLAN10,20"]
    end
    PC1[💻 HR PC] --> P1
    PC2[💻 IT PC] --> P2
    P3 --> RT[🌐 Router]`,
  commands: [
    { command: "vlan 10\nname HR", description: "สร้าง VLAN 10 ชื่อ HR" },
    { command: "interface Fa0/1\nswitchport mode access\nswitchport access vlan 10", description: "Config Access Port VLAN 10" },
    { command: "interface Fa0/24\nswitchport mode trunk\nswitchport trunk allowed vlan 10,20", description: "Config Trunk Port อนุญาต VLAN 10,20" },
    { command: "show vlan brief", description: "ดูรายการ VLAN ทั้งหมด" },
    { command: "show interfaces trunk", description: "ดู Trunk Port Status" },
  ],
  labs: [
    {
      title: "VLAN Configuration Lab",
      level: "Beginner",
      estimatedMinutes: 40,
      steps: [
        "เข้า Switch CLI",
        "สร้าง VLAN 10 (HR) และ VLAN 20 (IT)",
        "Config Port Fa0/1-5 เป็น Access VLAN 10",
        "Config Port Fa0/6-10 เป็น Access VLAN 20",
        "Config Port Fa0/24 เป็น Trunk",
        "Verify ด้วย show vlan brief และ show interfaces trunk",
        "ทดสอบ ping จาก PC ใน VLAN 10 ไปยัง VLAN 10 (สำเร็จ) และ VLAN 20 (ล้มเหลว ถ้าไม่มี Router)",
      ],
      verification: ["show vlan brief แสดง VLAN 10, 20", "Trunk port แสดง VLAN 10,20 allowed", "Ping ใน VLAN เดียวกันได้ ต่าง VLAN ไม่ได้"],
    },
  ],
  troubleshooting: [
    {
      symptom: "PC สอง Host ping กันไม่ได้ทั้งที่ต่อ Switch เดียวกัน",
      possibleCause: "PC อยู่คนละ VLAN",
      check: "show vlan brief ดูว่า Port ของ PC อยู่ VLAN อะไร",
      fix: "ย้าย Port มา VLAN เดียวกัน หรือ Config Inter-VLAN Routing",
    },
    {
      symptom: "Trunk ไม่ยอมส่ง VLAN บาง VLAN ข้ามไป",
      possibleCause: "VLAN ไม่ได้อยู่ใน allowed list ของ Trunk",
      check: "show interfaces trunk ดู VLANs allowed",
      fix: "switchport trunk allowed vlan add <vlan-id>",
    },
  ],
  quiz: [
    makeQ("VLAN แก้ปัญหาอะไรหลักๆ?", ["ความเร็ว Network", "การแบ่ง Broadcast Domain", "การเพิ่ม Bandwidth", "การ Encrypt Traffic"], "การแบ่ง Broadcast Domain", "VLAN แบ่ง Switch Physical ออกเป็นหลาย Logical Network ลด Broadcast Traffic และเพิ่ม Security"),
    makeQ("802.1Q ใช้ทำอะไร?", ["Encrypt VLAN Traffic", "Tag Frame ด้วย VLAN ID บน Trunk Link", "แบ่ง Port เป็น VLAN", "สร้าง VLAN บน Switch"], "Tag Frame ด้วย VLAN ID บน Trunk Link", "802.1Q เพิ่ม 4-byte VLAN Tag ใน Ethernet Frame เพื่อให้ Switch รู้ว่า Frame นั้นเป็น VLAN อะไร"),
    makeQ("Native VLAN บน Trunk คืออะไร?", ["VLAN ที่ Trunk ไม่ยอมส่ง", "VLAN ที่ Frame ไม่ถูก Tag", "VLAN ที่มี Priority สูงสุด", "VLAN เริ่มต้นของ Switch"], "VLAN ที่ Frame ไม่ถูก Tag", "Native VLAN คือ VLAN ที่ Frame วิ่งบน Trunk โดยไม่มี 802.1Q Tag — ค่า default คือ VLAN 1"),
    makeQ("Access Port คืออะไร?", ["Port ที่ส่งหลาย VLAN", "Port ที่เชื่อมต่อ Switch กับ Switch", "Port ที่เชื่อมต่อกับ End Device และอยู่ใน VLAN เดียว", "Port สำหรับ Management"], "Port ที่เชื่อมต่อกับ End Device และอยู่ใน VLAN เดียว", "Access Port เชื่อมต่อ PC, Server, Printer — อยู่ใน 1 VLAN ไม่มี 802.1Q Tag"),
    makeQ("คำสั่งใดใช้ดูรายการ VLAN บน Cisco Switch?", ["show ip vlan", "show vlan brief", "show interface vlan", "show running-config vlan"], "show vlan brief", "show vlan brief แสดง VLAN ID, Name, Status, และ Port ที่ assign ใน VLAN นั้น"),
  ],
  interviewQuestions: [
    makeI("Junior", "VLAN คืออะไร และใช้ทำไม?", "VLAN = Virtual LAN แบ่ง Switch เป็นหลาย Logical Segment เพื่อ 1) ลด Broadcast 2) เพิ่ม Security 3) แยก Department โดยไม่ต้องซื้อ Switch เพิ่ม"),
    makeI("Mid", "อธิบายความแตกต่าง Access Port vs Trunk Port", "Access Port: เชื่อมต่อ end device, 1 VLAN, ไม่มี Tag; Trunk Port: เชื่อมต่อ Switch-to-Switch หรือ Switch-to-Router, หลาย VLAN, ใช้ 802.1Q Tag"),
    makeI("Senior", "อธิบาย VLAN Hopping Attack และวิธีป้องกัน", "VLAN Hopping ทำได้ 2 วิธี: 1) Switch Spoofing (attacker แกล้งทำเป็น Switch เพื่อเปิด Trunk) — ป้องกัน: set port mode access 2) Double Tagging (ส่ง Frame ที่มี 2 Tag) — ป้องกัน: เปลี่ยน Native VLAN ออกจาก VLAN 1"),
  ],
  tags: ["VLAN", "Trunk", "802.1Q", "Switching", "Segmentation"],
  order: 5,
};

const ospfLesson: Lesson = {
  id: "found-006",
  slug: "ospf",
  title: "OSPF Routing Protocol",
  titleTh: "OSPF Routing Protocol",
  track: "foundation",
  category: "routing",
  level: "Intermediate",
  duration: "90 min",
  xp: 100,
  description: "เรียนรู้ OSPF Link-State Routing Protocol ตั้งแต่พื้นฐาน Neighbor Relationship, LSA, SPF Algorithm จนถึง Multi-Area",
  objectives: [
    "อธิบาย OSPF ทำงานอย่างไร",
    "Configure OSPF Single-Area ได้",
    "เข้าใจ OSPF Neighbor States และ DR/BDR Election",
    "Config OSPF Multi-Area และอธิบายประโยชน์ได้",
  ],
  prerequisites: ["ipv4-addressing", "vlan"],
  concepts: ["OSPF", "Link-State", "SPF", "LSA", "LSDB", "Area", "Backbone Area 0", "DR", "BDR", "Hello Packet", "Neighbor", "Adjacency", "Cost"],
  mermaidDiagram: `graph LR
    subgraph Area0 ["Area 0 (Backbone)"]
      ABR1[ABR1]
      ABR2[ABR2]
      ABR1 --- ABR2
    end
    subgraph Area1 ["Area 1"]
      R1[R1] --- R2[R2]
      R2 --- ABR1
    end
    subgraph Area2 ["Area 2"]
      R3[R3] --- ABR2
    end`,
  commands: [
    { command: "router ospf 1\nnetwork 10.0.0.0 0.255.255.255 area 0", description: "Enable OSPF Area 0" },
    { command: "show ip ospf neighbor", description: "ดู OSPF Neighbor ทั้งหมด" },
    { command: "show ip ospf database", description: "ดู OSPF Link-State Database" },
    { command: "show ip route ospf", description: "ดู Route ที่ OSPF เรียนมา" },
    { command: "debug ip ospf hello", description: "Debug OSPF Hello Packets" },
  ],
  labs: [
    {
      title: "OSPF Single-Area Lab",
      level: "Intermediate",
      estimatedMinutes: 60,
      steps: [
        "Topology: R1 — R2 — R3 เชื่อมแบบ Serial/Ethernet",
        "Config IP Address บน Router ทุกตัว",
        "Enable OSPF Area 0 บน R1, R2, R3",
        "ตรวจสอบ Neighbor Adjacency: show ip ospf neighbor",
        "ตรวจสอบ Routing Table: show ip route ospf",
        "ทดสอบ ping ระหว่าง Loopback Interface ของ R1, R2, R3",
        "ปิด Interface บน R2 แล้วสังเกต OSPF Reconvergence",
      ],
      verification: ["Neighbor State = FULL", "Routing table มี Route จาก OSPF O", "ping ผ่านทุก Route ได้"],
    },
  ],
  troubleshooting: [
    {
      symptom: "OSPF Neighbor ไม่ขึ้น (ค้างที่ EXSTART/EXCHANGE)",
      possibleCause: "MTU mismatch ระหว่าง Interface",
      check: "show interfaces ดู MTU ทั้งสอง Router",
      fix: "ip ospf mtu-ignore หรือ แก้ MTU ให้ตรงกัน",
    },
    {
      symptom: "OSPF Neighbor ขึ้น แต่ Route ไม่มาถึง",
      possibleCause: "Area ไม่ match, network command ผิด, หรือ Wildcard mask ผิด",
      check: "show ip ospf database, show run | section router ospf",
      fix: "แก้ network statement ให้ครอบคลุม Interface ที่ต้องการ",
    },
  ],
  quiz: [
    makeQ("OSPF ใช้ Algorithm อะไรในการคำนวณ Route?", ["Bellman-Ford", "Dijkstra SPF", "DUAL", "Distance Vector"], "Dijkstra SPF", "OSPF เป็น Link-State Protocol ใช้ Dijkstra SPF (Shortest Path First) คำนวณ Route ที่ดีที่สุด"),
    makeQ("OSPF Area 0 คืออะไร?", ["Area ที่มี Router เยอะที่สุด", "Backbone Area ที่ทุก Area ต้องเชื่อมต่อ", "Area สำหรับ External Route", "Area สำหรับ Security"], "Backbone Area ที่ทุก Area ต้องเชื่อมต่อ", "Area 0 = Backbone Area — ทุก OSPF Area ต้องเชื่อมต่อกับ Area 0 โดยตรงหรือผ่าน Virtual Link"),
    makeQ("OSPF Cost คำนวณจากอะไร?", ["Delay", "Bandwidth", "Hop Count", "Load"], "Bandwidth", "OSPF Cost = 10^8 / Bandwidth (bps) — ยิ่ง Bandwidth สูง Cost ต่ำลง"),
    makeQ("DR ใน OSPF คืออะไร?", ["Default Route", "Designated Router", "Dynamic Router", "Dead Route"], "Designated Router", "DR = Designated Router ใน Multi-access Network (Ethernet) — ลด LSA flooding โดย Router อื่นส่ง Update ไปที่ DR แทนการ Flood ทุกคน"),
    makeQ("OSPF Hello Packet ส่งไปที่ Address ใด?", ["255.255.255.255", "224.0.0.1", "224.0.0.5", "10.0.0.1"], "224.0.0.5", "OSPF Hello ส่งไปที่ 224.0.0.5 (AllSPFRouters Multicast) บน Broadcast Network"),
  ],
  interviewQuestions: [
    makeI("Junior", "OSPF ต่างจาก RIP อย่างไร?", "OSPF: Link-State, No hop limit, Fast convergence, Cost=Bandwidth; RIP: Distance-Vector, Max 15 hops, ช้า, Metric=hop count — ปัจจุบัน RIP แทบไม่ใช้แล้ว"),
    makeI("Mid", "อธิบาย OSPF Neighbor States ทั้งหมด", "Down→Init→2-Way→ExStart→Exchange→Loading→Full — ต้อง FULL ถึงจะ share route กันได้"),
    makeI("Senior", "ทำไม OSPF Multi-Area ถึงดีกว่า Single-Area สำหรับ Network ใหญ่?", "1) ลด LSDB size ในแต่ละ Area 2) Limit LSA flooding ข้ามเฉพาะที่จำเป็น 3) SPF คำนวณแค่ภายใน Area ตัวเอง 4) Route summarization ที่ ABR ลด Routing Table"),
  ],
  tags: ["OSPF", "Routing", "Link-State", "SPF", "Area"],
  order: 6,
};

const bgpLesson: Lesson = {
  id: "found-007",
  slug: "bgp-basic",
  title: "BGP Basic",
  titleTh: "BGP พื้นฐาน",
  track: "foundation",
  category: "routing",
  level: "Intermediate",
  duration: "90 min",
  xp: 125,
  description: "เรียนรู้ BGP (Border Gateway Protocol) — eBGP vs iBGP, Neighbor Setup, Path Attributes, Best Path Selection และ Route Filtering",
  objectives: [
    "อธิบาย BGP ทำงานอย่างไรและใช้ที่ไหน",
    "Configure eBGP Neighbor ระหว่าง Router สองตัวได้",
    "เข้าใจ BGP Path Attributes: AS Path, Local Preference, MED",
    "เขียน Basic Route Filtering ด้วย Prefix-list และ Route-map",
  ],
  prerequisites: ["ospf"],
  concepts: ["BGP", "eBGP", "iBGP", "AS", "ASN", "Neighbor", "TCP 179", "NLRI", "UPDATE", "OPEN", "KEEPALIVE", "AS Path", "Local Preference", "MED", "Weight", "Next-hop", "Prefix-list", "Route-map", "BGP Best Path"],
  mermaidDiagram: `graph LR
    subgraph AS65001 ["AS 65001 (Company)"]
      R1["R1\n10.0.0.1"]
      R2["R2\n10.0.0.2"]
      R1 ---|"iBGP"| R2
    end
    subgraph AS65000 ["AS 65000 (ISP A)"]
      ISP_A["ISP-A\n1.1.1.1"]
    end
    subgraph AS65002 ["AS 65002 (ISP B)"]
      ISP_B["ISP-B\n2.2.2.2"]
    end
    R1 ---|"eBGP"| ISP_A
    R2 ---|"eBGP"| ISP_B`,
  trafficFlow: [
    "BGP TCP Session สร้างบน Port 179",
    "Router แลกเปลี่ยน OPEN Message ตกลง Parameters",
    "ส่ง UPDATE Message พร้อม NLRI (Network Layer Reachability Info)",
    "BGP Best Path Selection ดู Attribute: Weight → Local Pref → AS Path → MED → ...",
    "Inject Best Route ลง Routing Table",
  ],
  commands: [
    { command: "router bgp 65001\nneighbor 1.1.1.1 remote-as 65000", description: "Config eBGP Neighbor กับ ISP-A" },
    { command: "neighbor 1.1.1.1 description ISP-A\nneighbor 1.1.1.1 soft-reconfiguration inbound", description: "เพิ่ม Description และ Soft-reconfig" },
    { command: "show bgp summary", description: "ดู BGP Neighbor Status ทั้งหมด" },
    { command: "show bgp ipv4 unicast", description: "ดู BGP Table" },
    { command: "show bgp ipv4 unicast 0.0.0.0", description: "ดู Default Route จาก BGP" },
    { command: "clear ip bgp * soft", description: "Soft Reset BGP โดยไม่ drop Session" },
    { command: "debug ip bgp 1.1.1.1 updates", description: "Debug BGP Updates กับ Neighbor" },
  ],
  labs: [
    {
      title: "eBGP Dual-homed ISP Lab",
      level: "Intermediate",
      estimatedMinutes: 75,
      steps: [
        "Topology: R1 (AS65001) เชื่อม ISP-A (AS65000) และ ISP-B (AS65002)",
        "Config eBGP Neighbor บน R1 กับทั้ง ISP-A และ ISP-B",
        "รับ Default Route 0.0.0.0/0 จากทั้งสอง ISP",
        "ตรวจสอบ show bgp summary — ทั้งคู่ต้อง Established",
        "ใช้ Local Preference ให้ ISP-A เป็น Primary (LP=200) ISP-B เป็น Backup (LP=100)",
        "ทดสอบ Failover โดยปิด ISP-A Interface — ตรวจว่า Traffic ย้ายไป ISP-B",
        "เพิ่ม Prefix-list กรอง Received Routes จาก ISP",
      ],
      verification: [
        "show bgp summary: ทั้งคู่ Established",
        "show bgp ipv4 unicast: Best path ไป ISP-A (LP=200)",
        "หลัง Failover: Best path เปลี่ยนไป ISP-B ภายใน 60 วินาที",
      ],
    },
  ],
  troubleshooting: [
    {
      symptom: "BGP Neighbor ค้างที่ Active State",
      possibleCause: "TCP 179 ถูก Block, IP ผิด, หรือ ASN ผิด",
      check: "telnet <neighbor-ip> 179, show bgp neighbors, ตรวจ Firewall",
      fix: "เปิด Port 179, ตรวจ remote-as ว่าตรงกับ Neighbor จริง",
    },
    {
      symptom: "BGP Up แต่ไม่ได้รับ Route",
      possibleCause: "Prefix-list หรือ Route-map Filter บล็อก, หรือ Neighbor ไม่ได้ Advertise",
      check: "show bgp neighbors <ip> received-routes, show bgp neighbors <ip> advertised-routes",
      fix: "ตรวจ Filter Policy, เพิ่ม neighbor soft-reconfiguration inbound",
    },
    {
      symptom: "BGP Flapping ต่อเนื่อง",
      possibleCause: "Link ไม่เสถียร, MTU mismatch, หรือ Keepalive Timeout",
      check: "show bgp neighbors ดู Flap Count, ดู Interface Error",
      fix: "ตรวจ Physical Link, แก้ MTU, เพิ่ม Keepalive Timer",
    },
  ],
  quiz: [
    makeQ("BGP ใช้ TCP Port ใด?", ["80", "179", "443", "8080"], "179", "BGP สร้าง TCP Session บน Port 179 ระหว่าง Neighbor ทั้งสอง — ต้องเปิด Firewall ให้ Port นี้"),
    makeQ("eBGP กับ iBGP ต่างกันอย่างไร?", ["Speed ต่างกัน", "eBGP เชื่อม AS ต่างกัน iBGP เชื่อมภายใน AS เดียวกัน", "iBGP ปลอดภัยกว่า", "eBGP ใช้ UDP"], "eBGP เชื่อม AS ต่างกัน iBGP เชื่อมภายใน AS เดียวกัน", "eBGP = external BGP (ระหว่าง AS); iBGP = internal BGP (ภายใน AS เดียว) — iBGP ไม่แก้ Next-hop ให้อัตโนมัติ"),
    makeQ("BGP Best Path Selection ดู Attribute ใดก่อน (Cisco)?", ["AS Path", "Local Preference", "Weight", "MED"], "Weight", "Cisco BGP Best Path: Weight (สูงสุดชนะ) → Local Pref → Local Origin → AS Path (สั้นสุดชนะ) → Origin → MED → eBGP vs iBGP → IGP Metric"),
    makeQ("AS Path Prepend ใช้ทำอะไร?", ["เพิ่ม Security", "ทำให้ Route ดูมี AS Hop เยอะขึ้นเพื่อลด Priority", "เพิ่ม Bandwidth", "ลด Latency"], "ทำให้ Route ดูมี AS Hop เยอะขึ้นเพื่อลด Priority", "AS Path Prepend เพิ่ม ASN ซ้ำๆ ใน AS Path ทำให้ Route ดูยาวขึ้น BGP ของ Peer จะชอบ Path สั้นกว่า — ใช้ Influence Inbound Traffic"),
    makeQ("Local Preference ใช้ Control อะไร?", ["Inbound Traffic จาก Internet", "Outbound Traffic จาก AS ตัวเอง", "MTU ของ BGP Session", "AS Number"], "Outbound Traffic จาก AS ตัวเอง", "Local Preference ใช้ภายใน AS — บอกทุก Router ใน AS ว่าควรใช้ Exit Point ไหนออก ค่าสูงกว่าชนะ"),
  ],
  interviewQuestions: [
    makeI("Junior", "BGP ต่างจาก OSPF อย่างไร?", "BGP: Path Vector, เชื่อม AS ต่างกัน (Internet), Policy-based, ช้า Converge; OSPF: Link-State, ภายใน AS, Fast Converge, Cost-based — BGP สำหรับ ISP/Enterprise Internet Edge; OSPF สำหรับ Internal Routing"),
    makeI("Mid", "อธิบาย BGP Best Path Selection ให้ครบ", "Weight(Cisco) → Local Pref → Local Origin → AS Path Length → Origin(IGP<EGP<?) → MED → eBGP>iBGP → IGP Metric → Router ID — จำย่อ: We Love Oranges As Oranges Mean Pure Refreshment"),
    makeI("Senior", "ออกแบบ Dual-homed ISP BGP สำหรับ Enterprise อย่างไร?", "1) รับ Full Table หรือ Default Only จาก ISP (ขึ้นกับ Memory/CPU); 2) ใช้ Local Pref กำหนด Primary/Backup ขาออก; 3) ใช้ AS Path Prepend หรือ MED กำหนด Inbound; 4) Filter bogon/private prefixes; 5) BFD เพื่อ Fast Detection; 6) Route Dampening ป้องกัน Flap"),
  ],
  tags: ["BGP", "Routing", "eBGP", "iBGP", "AS Path", "Internet", "ISP"],
  order: 7,
};

const firewallAcl: Lesson = {
  id: "found-008",
  slug: "firewall-nat-acl",
  title: "Firewall, NAT & ACL",
  titleTh: "Firewall, NAT และ ACL",
  track: "foundation",
  category: "security",
  level: "Intermediate",
  duration: "75 min",
  xp: 100,
  description: "เรียนรู้ ACL (Standard/Extended), NAT/PAT, Stateful Firewall และ Zone-Based Firewall — พื้นฐานที่ Network Engineer ต้องรู้",
  objectives: [
    "เขียน Standard และ Extended ACL ได้",
    "Config NAT/PAT บน Router ได้",
    "อธิบาย Stateful Firewall ทำงานอย่างไร",
    "ออกแบบ Basic Firewall Zone Policy ได้",
  ],
  prerequisites: ["ipv4-addressing", "vlan"],
  concepts: ["ACL", "Standard ACL", "Extended ACL", "Named ACL", "NAT", "PAT", "Static NAT", "Dynamic NAT", "Inside Local", "Inside Global", "Stateful Firewall", "Zone-Based Firewall", "DMZ", "Stateless vs Stateful"],
  mermaidDiagram: `graph LR
    subgraph Inside ["Inside (192.168.1.0/24)"]
      PC["💻 PC\n192.168.1.10"]
    end
    subgraph FW ["Firewall / Router"]
      NAT["NAT/PAT\nInside→Outside"]
      ACL["ACL\nInbound/Outbound"]
    end
    subgraph Outside ["Outside (Internet)"]
      WEB["🌐 Web Server"]
    end
    subgraph DMZ ["DMZ (10.0.0.0/24)"]
      SRV["🖥️ Public Server\n10.0.0.10"]
    end
    PC --> ACL --> NAT --> WEB
    WEB -->|"Static NAT → SRV"| SRV`,
  commands: [
    { command: "ip access-list extended BLOCK_TELNET\ndeny tcp any any eq 23\npermit ip any any", description: "Extended ACL บล็อก Telnet" },
    { command: "interface Fa0/0\nip access-group BLOCK_TELNET in", description: "Apply ACL บน Interface" },
    { command: "ip nat inside source list 1 interface Fa0/1 overload", description: "Config PAT (NAT Overload)" },
    { command: "ip nat inside source static 192.168.1.10 203.0.113.10", description: "Config Static NAT" },
    { command: "show ip nat translations", description: "ดู NAT Translation Table" },
    { command: "show ip access-lists", description: "ดู ACL Counter" },
  ],
  labs: [
    {
      title: "NAT/PAT + ACL Lab",
      level: "Intermediate",
      estimatedMinutes: 50,
      steps: [
        "Topology: PC (192.168.1.0/24) → Router → Internet (203.0.113.0/24)",
        "Config PAT: ให้ PC ทั้ง Subnet ออก Internet ผ่าน IP เดียว",
        "ทดสอบ: PC ping 8.8.8.8 ผ่าน NAT",
        "ดู NAT Table: show ip nat translations",
        "สร้าง ACL อนุญาตเฉพาะ HTTP/HTTPS ออก Internet บล็อก Telnet",
        "Apply ACL บน Inside Interface (inbound)",
        "ทดสอบ: HTTP ผ่าน, Telnet ถูกบล็อก",
      ],
      verification: ["NAT Table แสดง Translation", "ping 8.8.8.8 สำเร็จ", "Telnet ถูกปฏิเสธ (ACL Hit Counter เพิ่ม)"],
    },
  ],
  troubleshooting: [
    {
      symptom: "NAT ไม่ทำงาน — PC ออก Internet ไม่ได้",
      possibleCause: "NAT Inside/Outside Interface ไม่ได้ Set, หรือ ACL ที่ใช้กับ NAT ไม่ Match",
      check: "show ip nat translations, debug ip nat, ตรวจ ip nat inside/outside บน Interface",
      fix: "เพิ่ม ip nat inside บน LAN Interface, ip nat outside บน WAN Interface",
    },
    {
      symptom: "ACL บล็อก Traffic ที่ไม่ต้องการบล็อก",
      possibleCause: "ACL มี Implicit Deny any any ท้ายสุด หรือ Sequence ผิด",
      check: "show ip access-lists ดู Hit Counter, ตรวจ Order ของ ACE",
      fix: "เพิ่ม permit ip any any ท้าย ACL ถ้าต้องการ, จัดลำดับ ACE ให้ถูก",
    },
  ],
  quiz: [
    makeQ("Standard ACL Match อะไร?", ["Source IP เท่านั้น", "Source + Destination IP", "Port Number", "Protocol"], "Source IP เท่านั้น", "Standard ACL (1-99, 1300-1999) Match เฉพาะ Source IP — ควร Apply ใกล้ Destination; Extended ACL Match ทั้ง Src/Dst IP + Port"),
    makeQ("PAT ต่างจาก NAT อย่างไร?", ["PAT เร็วกว่า", "PAT ให้ IP หลายตัว Map กับ Public IP เดียวโดยใช้ Port ต่าง", "NAT ไม่ต้องการ IP", "ไม่มีความแตกต่าง"], "PAT ให้ IP หลายตัว Map กับ Public IP เดียวโดยใช้ Port ต่าง", "PAT = Port Address Translation (NAT Overload) ใช้ Port Number แยกแต่ละ Session ทำให้หลายร้อย PC ใช้ Public IP เดียวได้"),
    makeQ("Stateful Firewall ต่างจาก ACL อย่างไร?", ["Stateful เร็วกว่า", "Stateful ติดตาม Connection State — Return Traffic ผ่านอัตโนมัติ", "ACL ปลอดภัยกว่า", "ไม่มีความแตกต่าง"], "Stateful ติดตาม Connection State — Return Traffic ผ่านอัตโนมัติ", "Stateful Firewall เก็บ Connection Table — เมื่ออนุญาต Outbound ก็อนุญาต Return Traffic อัตโนมัติ ACL ธรรมดาต้องเขียน Rule สองทิศทาง"),
    makeQ("DMZ ใช้สำหรับอะไร?", ["เก็บ Database ลับ", "วาง Server ที่ต้องเข้าถึงจาก Internet แต่แยกจาก Internal", "เชื่อม WAN", "Backup Zone"], "วาง Server ที่ต้องเข้าถึงจาก Internet แต่แยกจาก Internal", "DMZ (Demilitarized Zone) คือ Segment กลาง วาง Web Server, Mail Server ที่ Internet เข้าถึงได้ แต่แยกออกจาก Internal LAN"),
    makeQ("ip nat inside source list ใช้ทำอะไร?", ["Block NAT", "กำหนดว่า IP ไหน (ใน ACL) จะถูก Translate", "ดู NAT Table", "ล้าง NAT Table"], "กำหนดว่า IP ไหน (ใน ACL) จะถูก Translate", "คำสั่งนี้เลือก Source IP ที่จะ Translate โดยอ้าง ACL และกำหนด Interface หรือ IP สำหรับ Outside"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบายความแตกต่าง Standard vs Extended ACL", "Standard (1-99): Match แค่ Source IP, Apply ใกล้ Destination; Extended (100-199): Match Src+Dst IP+Port+Protocol, Apply ใกล้ Source — Extended ยืดหยุ่นกว่า ใช้บ่อยกว่า"),
    makeI("Mid", "อธิบาย Implicit Deny ใน ACL และผลกระทบ", "ทุก ACL มี 'deny any any' ท้ายสุดที่มองไม่เห็น — ถ้าไม่มี permit any any ท้าย ACL Traffic ที่ไม่ Match Rule ใดจะถูก Drop ทั้งหมด ทำให้ Network Down โดยไม่ตั้งใจ"),
    makeI("Senior", "ออกแบบ Firewall Policy สำหรับ 3-Tier Architecture (Inside/DMZ/Outside)", "Zone Policy Matrix: Outside→DMZ=Allow HTTPS/443 เท่านั้น; Outside→Inside=Deny all; DMZ→Inside=Allow specific ports (DB); Inside→DMZ=Allow admin ports; Inside→Outside=Allow HTTP/HTTPS; ใช้ Stateful ตลอด + IPS บน DMZ"),
  ],
  tags: ["ACL", "NAT", "PAT", "Firewall", "DMZ", "Security", "Foundation"],
  order: 8,
};

// ─── Foundation Categories ────────────────────────────────────────
export const foundationCategories: FoundationCategory[] = [
  {
    id: "fundamentals",
    title: "Network Fundamentals",
    titleTh: "พื้นฐาน Network",
    icon: "🌐",
    description: "OSI Model, TCP/IP, Protocol พื้นฐานที่ต้องรู้",
    lessons: [networkFundamentals, osiModel, tcpipModel],
    order: 1,
  },
  {
    id: "addressing",
    title: "IP Addressing & Subnetting",
    titleTh: "IP Address และ Subnetting",
    icon: "🔢",
    description: "IPv4, IPv6, CIDR, VLSM, IP Planning",
    lessons: [ipv4],
    order: 2,
  },
  {
    id: "switching",
    title: "Switching",
    titleTh: "Switching",
    icon: "🔀",
    description: "VLAN, Trunk, STP, EtherChannel, Port Security",
    lessons: [vlanLesson],
    order: 3,
  },
  {
    id: "routing",
    title: "Routing",
    titleTh: "Routing",
    icon: "🗺️",
    description: "Static Route, OSPF, EIGRP, BGP Basic, Route Policy",
    lessons: [ospfLesson, bgpLesson],
    order: 4,
  },
  {
    id: "security",
    title: "Firewall & VPN",
    titleTh: "Firewall และ VPN",
    icon: "🔒",
    description: "NAT, ACL, Firewall, IPSec VPN พื้นฐาน",
    lessons: [firewallAcl],
    order: 5,
  },
  {
    id: "wireless",
    title: "Wireless Basic",
    titleTh: "Wireless พื้นฐาน",
    icon: "📶",
    description: "Wi-Fi Standards, WLC, SSID, Security",
    lessons: [],
    order: 6,
  },
  {
    id: "monitoring",
    title: "Monitoring Basic",
    titleTh: "Monitoring พื้นฐาน",
    icon: "📊",
    description: "SNMP, Syslog, NetFlow, Monitoring Tools",
    lessons: [],
    order: 7,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    titleTh: "Troubleshooting",
    icon: "🔧",
    description: "Methodology, Tools, Common Issues",
    lessons: [],
    order: 8,
  },
  {
    id: "documentation",
    title: "Documentation & IPAM",
    titleTh: "Documentation และ IPAM",
    icon: "📄",
    description: "Network Diagram, IPAM, Change Management",
    lessons: [],
    order: 9,
  },
];

export const allFoundationLessons: Lesson[] = foundationCategories.flatMap(c => c.lessons);
