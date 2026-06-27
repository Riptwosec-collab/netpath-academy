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
  sections: [
    {
      title: "OSI Model คืออะไร และทำไมต้องรู้?",
      body: "OSI Model (Open Systems Interconnection) เป็น Framework 7 ชั้นที่ ISO กำหนดขึ้นเพื่ออธิบายว่าข้อมูลเดินทางผ่านเครือข่ายอย่างไร\n\nแม้ในชีวิตจริงจะใช้ TCP/IP Model แต่ OSI ยังสำคัญมากเพราะ:\n- ใช้พูดถึง Layer ที่เกิดปัญหาได้ตรงจุด เช่น 'Layer 1 issue' = สาย/สัญญาณมีปัญหา\n- Vendor, Engineer ทุกคนใช้ภาษาเดียวกัน\n- ช่วยในการ Troubleshoot อย่างเป็นระบบ",
      tip: "จำชื่อ Layer: 'Please Do Not Throw Sausage Pizza Away' (Physical, Data Link, Network, Transport, Session, Presentation, Application)",
    },
    {
      title: "7 Layers อธิบายทีละชั้น",
      body: "แต่ละ Layer มีหน้าที่เฉพาะและส่งต่อข้อมูลให้ Layer ถัดไป:",
      table: {
        header: ["Layer", "ชื่อ", "หน้าที่", "อุปกรณ์/Protocol"],
        rows: [
          ["7", "Application", "Interface กับ User และ Application", "HTTP, DNS, FTP, SMTP"],
          ["6", "Presentation", "แปลง format, Encrypt, Compress", "SSL/TLS, JPEG, MP3"],
          ["5", "Session", "จัดการ Session (เปิด/ปิด connection)", "NetBIOS, RPC, SIP"],
          ["4", "Transport", "ส่งข้อมูล end-to-end, port, reliability", "TCP, UDP"],
          ["3", "Network", "Routing ระหว่าง network, IP address", "Router, IP, OSPF, BGP"],
          ["2", "Data Link", "ส่งระหว่าง node ใน network เดียว, MAC", "Switch, Ethernet, VLAN"],
          ["1", "Physical", "Signal ทางกายภาพ, bits บนสาย", "Cable, Hub, NIC, WiFi"],
        ],
      },
    },
    {
      title: "Encapsulation — ข้อมูลถูกห่อยังไงตอนส่ง",
      body: "เมื่อ Application ส่งข้อมูล แต่ละ Layer จะเพิ่ม Header (บางครั้ง Trailer) ของตัวเอง เรียกว่า Encapsulation\n\nตัวอย่าง: คุณเปิดเว็บ google.com\n1. Browser สร้าง HTTP Request (Layer 7)\n2. TLS เข้ารหัส (Layer 6)\n3. TCP เพิ่ม Port + Sequence (Layer 4)\n4. IP เพิ่ม Source/Destination IP (Layer 3)\n5. Ethernet เพิ่ม MAC Address (Layer 2)\n6. ส่งออกเป็น electrical signal (Layer 1)\n\nฝั่งรับจะ Decapsulate ถอด header ทีละชั้นจนถึง Application",
      code: `# ดู Encapsulation จริงด้วย Wireshark / tcpdump

# ดู Ethernet frame (Layer 2) + IP header (Layer 3)
sudo tcpdump -i eth0 -vv -n dst host 8.8.8.8

# ดู HTTP request (Layer 7) ไม่เข้ารหัส
sudo tcpdump -i eth0 -A -s 0 'tcp port 80'

# ดู Layer 1/2 interface status  
ip link show
ethtool eth0`,
      language: "bash",
    },
    {
      title: "ใช้ OSI Troubleshoot อย่างไร?",
      body: "เมื่อเน็ตมีปัญหา ให้ตรวจจาก Layer ล่างขึ้นบน:\n\nLayer 1 (Physical): สายหลุดไหม? LED ติดไหม? → ping ไม่ได้เลย\nLayer 2 (Data Link): Switch port ดีไหม? VLAN ถูกไหม? → ping ใน subnet ไม่ได้\nLayer 3 (Network): Route ถูกไหม? IP ชนกันไหม? → ping ข้าม subnet ไม่ได้\nLayer 4 (Transport): Port เปิดไหม? Firewall block? → connect service ไม่ได้\nLayer 7 (Application): Service config ถูกไหม? Cert หมดอายุ? → connect ได้แต่ error",
      code: `# Layer 1/2 check
ping -c 3 192.168.1.1        # ถ้า ping ไม่ได้ = Layer 1/2/3 มีปัญหา
arp -n                        # ดู MAC table (Layer 2)

# Layer 3 check
ip route show                 # ดู routing table
traceroute 8.8.8.8            # ดูว่า packet ไปถึงไหน

# Layer 4 check
telnet 192.168.1.1 22         # test port open
nmap -p 22,80,443 target-ip

# Layer 7 check
curl -v https://example.com   # ดู HTTP response detail`,
      language: "bash",
      tip: "OSI Troubleshooting rule: Bottom-up — แก้ Layer ล่างก่อนเสมอ ไม่งั้นเสียเวลา debug Layer บน",
    },
  ],

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
  sections: [
    {
      title: "TCP/IP Model คืออะไร?",
      body: "TCP/IP Model (Transmission Control Protocol/Internet Protocol) คือโครงสร้างสถาปัตยกรรมเครือข่ายที่ใช้จริงบนอินเทอร์เน็ตในปัจจุบัน\n\nต่างจาก OSI Model (7 Layer) ที่เป็นแค่ทฤษฎี — TCP/IP มี 4 Layer จริงๆ ที่ทำงานอยู่ทุกครั้งที่คุณเปิดเว็บหรือส่ง Email",
      table: {
        header: ["TCP/IP Layer", "ทำหน้าที่", "Protocol ตัวอย่าง"],
        rows: [
          ["Application (4)", "จัดการ data ระดับ Application", "HTTP, HTTPS, DNS, FTP, SMTP"],
          ["Transport (3)", "ส่งข้อมูล end-to-end, port numbers", "TCP, UDP"],
          ["Internet (2)", "Routing ระหว่าง network", "IP, ICMP, ARP"],
          ["Network Access (1)", "Physical + Data Link", "Ethernet, Wi-Fi, PPP"],
        ],
      },
      tip: "จำง่ายๆ: Application → Transport → Internet → Network Access (A-T-I-N หรือ 'ทีมอินเตอร์เน็ต')",
    },
    {
      title: "TCP vs UDP — เลือกใช้ยังไง?",
      body: "Protocol ระดับ Transport มีสองตัวหลักที่ต้องเข้าใจ:\n\n**TCP (Transmission Control Protocol)** — รับประกันว่า data ถึงปลายทางครบถ้วน มีการตรวจสอบและส่งซ้ำถ้า packet หาย\n\n**UDP (User Datagram Protocol)** — เร็วกว่า ไม่มี overhead ของการ confirm แต่ไม่รับประกันว่าถึง",
      table: {
        header: ["คุณสมบัติ", "TCP", "UDP"],
        rows: [
          ["การรับประกัน", "✅ รับประกันครบ", "❌ Best-effort"],
          ["ลำดับ packet", "✅ เรียงลำดับ", "❌ ไม่รับประกัน"],
          ["Speed", "🐢 ช้ากว่า (overhead)", "🚀 เร็วกว่า"],
          ["Connection", "Connection-based (3-Way)", "Connectionless"],
          ["ใช้กับ", "Web, Email, File transfer", "Video call, DNS, Gaming"],
        ],
      },
      warning: "อย่าสับสน — UDP ไม่ได้แย่กว่า TCP แค่ use case ต่างกัน Video streaming ต้องการ UDP เพราะถ้าส่งซ้ำจะ lag มากกว่า",
    },
    {
      title: "TCP 3-Way Handshake — กระบวนการสร้าง Connection",
      body: "ก่อน TCP จะส่งข้อมูล ต้องสร้าง connection ก่อนผ่าน 3 ขั้นตอน:\n\nขั้น 1: Client ส่ง SYN (Synchronize) บอกว่า 'ขอ connect นะ'\nขั้น 2: Server ตอบ SYN-ACK บอกว่า 'โอเค พร้อมแล้ว'\nขั้น 3: Client ส่ง ACK ยืนยันว่า 'รับทราบ เริ่มได้เลย'\n\nหลังจากนี้ connection established — data ไหลได้ทั้งสองทาง",
      code: `# ดู TCP 3-Way Handshake ด้วย tcpdump
sudo tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0' -n

# ผลที่เห็น:
# 10.0.0.1.54321 > 10.0.0.2.80: Flags [S]       ← SYN
# 10.0.0.2.80 > 10.0.0.1.54321: Flags [S.]      ← SYN-ACK  
# 10.0.0.1.54321 > 10.0.0.2.80: Flags [.]       ← ACK

# ดู established connections
ss -tuln
netstat -an | grep ESTABLISHED`,
      language: "bash",
      tip: "Flag ย่อใน tcpdump: [S] = SYN, [.] = ACK, [S.] = SYN-ACK, [F] = FIN, [R] = RST",
    },
    {
      title: "Port Numbers — ประตูบ้านของ Service",
      body: "Port คือ 'ช่อง' ที่ทำให้ device เดียวรัน service หลายตัวพร้อมกันได้ เหมือนตึกมีหลายห้อง แต่ใช้ที่อยู่เดิม\n\nPort แบ่งเป็น 3 range:\n- 0–1023: Well-known ports (require root)\n- 1024–49151: Registered ports\n- 49152–65535: Dynamic/Ephemeral ports (ฝั่ง client ใช้ชั่วคราว)",
      table: {
        header: ["Port", "Protocol", "Service"],
        rows: [
          ["22", "TCP", "SSH — Remote access เข้ารหัส"],
          ["80", "TCP", "HTTP — Web ไม่เข้ารหัส"],
          ["443", "TCP", "HTTPS — Web เข้ารหัส TLS"],
          ["53", "UDP/TCP", "DNS — แปลง domain → IP"],
          ["25", "TCP", "SMTP — ส่ง Email"],
          ["3306", "TCP", "MySQL — Database"],
          ["6379", "TCP", "Redis — Cache"],
        ],
      },
      code: `# ดู port ที่กำลัง listen
ss -tuln

# ดู process ที่ใช้ port นั้น
sudo lsof -i :443
sudo netstat -tlnp | grep 443

# scan port ด้วย nmap
nmap -p 22,80,443 192.168.1.1`,
      language: "bash",
    },
  ],

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

// ─────────────────────────────────────────────────────────────────
// ADDITIONAL FOUNDATION LESSONS
// ─────────────────────────────────────────────────────────────────

const spanningTree: Lesson = {
  id: "found-009",
  slug: "spanning-tree",
  title: "Spanning Tree Protocol",
  titleTh: "Spanning Tree Protocol (STP/RSTP)",
  track: "foundation",
  category: "switching",
  level: "Intermediate",
  duration: "50 min",
  xp: 100,
  description: "STP/RSTP ป้องกัน Switching Loop ใน Layer 2 Network — เรียนรู้ Root Bridge Election, Port Roles, RSTP Convergence และ Best Practices",
  objectives: [
    "อธิบาย Switching Loop และทำไม STP ถึงจำเป็น",
    "อธิบายกระบวนการ Root Bridge Election ด้วย Bridge ID",
    "แยก Port Roles: Root, Designated, Blocked",
    "เปรียบเทียบ STP (802.1D) vs RSTP (802.1w) — convergence time",
    "Configure RSTP และ PortFast, BPDU Guard",
  ],
  prerequisites: ["vlan"],
  concepts: ["STP", "RSTP", "Root Bridge", "Bridge ID", "Port Cost", "BPDUs", "PortFast", "BPDU Guard", "EtherChannel"],
  commands: [
    { command: "spanning-tree mode rapid-pvst", description: "Enable RSTP (Rapid PVST+) — default บน Cisco" },
    { command: "spanning-tree vlan 10 priority 4096", description: "Force switch เป็น Root Bridge สำหรับ VLAN 10 (ต่ำสุดชนะ)" },
    { command: "spanning-tree portfast", description: "Interface mode: ข้าม Listening/Learning → Forwarding ทันที (Access port เท่านั้น)" },
    { command: "spanning-tree bpduguard enable", description: "Interface mode: Shutdown ถ้ารับ BPDU (ป้องกัน rogue switch)" },
    { command: "show spanning-tree vlan 10", description: "แสดง STP topology, Root Bridge, Port Roles, Port States" },
    { command: "show spanning-tree summary", description: "สรุป STP mode, Root Bridge, จำนวน Port Blocking" },
    { command: "debug spanning-tree events", description: "Real-time STP events — ใช้ troubleshoot convergence" },
  ],
  labs: [{
      title: "STP Root Bridge Election + PortFast",
      level: "Intermediate",
      estimatedMinutes: 60,
      steps: [
      "Connect SW1-SW2-SW3 เป็น Triangle (redundant links)",
      "show spanning-tree vlan 1 — สังเกต Root Bridge ที่ถูกเลือก",
      "Force SW1 เป็น Root: spanning-tree vlan 1 priority 4096",
      "ตรวจสอบ Port Roles บน SW2 และ SW3 (Root/Designated/Blocking)",
      "Enable PortFast + BPDU Guard บน Access Ports ทุกตัว",
      "Unplug และ Plug PC — วัดเวลา Convergence ก่อน/หลัง PortFast",
    ],
      verification: [
      "show spanning-tree vlan 1 — SW1 ต้องเป็น Root Bridge",
      "show spanning-tree vlan 1 detail — ดู Port State ทุก Port",
      "show spanning-tree interface fa0/1 portfast — ต้องเป็น enabled",
      "PC สามารถ ping ได้ทันทีหลัง connect (PortFast ทำงาน)",
    ],
    }],
  troubleshooting: [
    { symptom: "Network ช้า / Broadcast storm / CPU 100%", possibleCause: "Switching Loop เกิดขึ้น — STP ไม่ได้ enabled หรือ BPDU ถูก Block", check: "show spanning-tree — ดูว่า Port ทุกตัวมี State; show interface counters — ดู Broadcast/Multicast spike", fix: "Enable STP, ลบ loop link ชั่วคราว, ตรวจว่า BPDU ไม่ถูก filter" },
    { symptom: "PC ต้องรอ 30+ วิ หลัง plug ถึง ping ได้", possibleCause: "PortFast ไม่ได้เปิด — Port ผ่าน Listening (15s) + Learning (15s) ก่อน Forwarding", check: "show spanning-tree interface fa0/x portfast", fix: "เปิด spanning-tree portfast บน Access Port และ bpduguard enable" },
    { symptom: "Port ถูก Shutdown ด้วย err-disabled", possibleCause: "BPDU Guard Triggered — มี Switch เชื่อมต่อกับ PortFast Port", check: "show interfaces status err-disabled; show log | include BPDUGUARD", fix: "ลบ switch/hub ที่ต้นเหตุ จาก port นั้น แล้ว shutdown / no shutdown" },
  ],
  quiz: [
    makeQ("Root Bridge ถูกเลือกอย่างไร?", ["Port ที่เร็วที่สุด", "Bridge ID ต่ำสุด (Priority + MAC)", "Switch ที่มีหลาย Port", "ตั้งค่าด้วย IP Address"], "Bridge ID ต่ำสุด (Priority + MAC)", "Bridge ID = Priority (default 32768) + MAC Address — ค่าต่ำสุดชนะ สามารถ override ได้ด้วย priority 4096"),
    makeQ("PortFast ทำอะไร?", ["เพิ่มความเร็ว Port", "ข้าม STP Listening/Learning → Forwarding ทันที", "บล็อก BPDU", "เลือก Root Bridge"], "ข้าม STP Listening/Learning → Forwarding ทันที", "PortFast เหมาะกับ Access Port ที่ต่อ PC — ทำให้ PC ออนไลน์ทันที ไม่ต้องรอ 30 วิ"),
    makeQ("BPDU Guard ทำอะไรเมื่อรับ BPDU?", ["ส่ง BPDU กลับ", "Shutdown Port ด้วย err-disabled", "เพิ่ม Priority", "Reset STP"], "Shutdown Port ด้วย err-disabled", "BPDU Guard ป้องกัน Rogue Switch ที่ plug เข้า Access Port — ถ้ารับ BPDU จะ err-disable port ทันที"),
    makeQ("RSTP เร็วกว่า STP อย่างไร?", ["ใช้ Port ที่เร็วกว่า", "Convergence < 1 วิ แทน 30-50 วิ โดยใช้ Proposal/Agreement", "ใช้ CPU น้อยกว่า", "ไม่มีความแตกต่าง"], "Convergence < 1 วิ แทน 30-50 วิ โดยใช้ Proposal/Agreement", "RSTP ใช้ Proposal/Agreement mechanism ทำให้ Port ผ่านสู่ Forwarding ได้เร็วมาก แทน 802.1D ที่ต้องรอ Timer"),
    makeQ("Alternate Port ใน RSTP คืออะไร?", ["Port สำรองที่พร้อม Forwarding ทันทีถ้า Root Port ล้มเหลว", "Port ที่ต่อ PC", "Port ที่ Block ตลอดเวลา", "Port ของ Root Bridge"], "Port สำรองที่พร้อม Forwarding ทันทีถ้า Root Port ล้มเหลว", "Alternate Port = สำรองของ Root Port — เมื่อ Root Port ล้มเหลว Alternate Port เปลี่ยนเป็น Forwarding ได้ทันทีโดยไม่ต้องรอ Timer"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย Port Roles ใน STP: Root, Designated, Blocked", "Root Port: Port บน Non-Root Switch ที่ใกล้ Root Bridge ที่สุด (Cost ต่ำสุด) — มีหนึ่ง Port ต่อ Switch; Designated Port: Port ที่ Forward traffic บน Segment นั้น (มีหนึ่งต่อ Segment); Blocked Port: Port ที่ Block เพื่อป้องกัน Loop"),
    makeI("Mid", "ทำไม RSTP ถึง Converge เร็วกว่า STP มาก", "RSTP ใช้ Proposal/Agreement handshake แทน Timer-based: Root Bridge ส่ง Proposal → Switch ตอบ Agreement → Port เข้า Forwarding ทันที นอกจากนี้ Alternate/Backup Port พร้อม Forwarding ทันทีโดยไม่ต้องผ่าน State Machine ยาว รวมทั้ง RSTP ส่ง BPDUs ทุก Hello Time ไม่ต้องรอ Topology Change"),
    makeI("Senior", "ออกแบบ STP สำหรับ Dual-Core Distribution Campus Network", "Primary Distribution เป็น Root VLAN 1-100 (priority 4096); Secondary Distribution เป็น Root VLAN 101-200 และ Secondary สำหรับ 1-100 (priority 8192); ใช้ Rapid PVST+ ทุก VLAN; PortFast+BPDU Guard บน Access Layer ทุก Port; Loop Guard บน Uplinks; BPDU Filter ห้ามใช้เด็ดขาด (บาง cases); Monitor ด้วย SNMP Topology Change trap"),
  ],
  tags: ["STP", "RSTP", "Spanning Tree", "Root Bridge", "PortFast", "BPDU Guard", "Switching", "Loop Prevention"],
  order: 9,
};

const eigrpLesson: Lesson = {
  id: "found-010",
  slug: "eigrp",
  title: "EIGRP Routing Protocol",
  titleTh: "EIGRP — Enhanced Interior Gateway Routing Protocol",
  track: "foundation",
  category: "routing",
  level: "Intermediate",
  duration: "55 min",
  xp: 110,
  description: "EIGRP เป็น Hybrid Routing Protocol ของ Cisco รวมข้อดีของ Distance Vector + Link-State เหมาะกับ Enterprise Network ขนาดกลาง-ใหญ่",
  objectives: [
    "อธิบาย EIGRP Metric Components: Bandwidth, Delay, Reliability, Load",
    "อธิบาย DUAL Algorithm: Successor, Feasible Successor",
    "Configure EIGRP และ Named EIGRP Mode",
    "Verify EIGRP Neighbor Relationship และ Routing Table",
    "เปรียบเทียบ EIGRP vs OSPF — เมื่อไหร่ควรใช้อะไร",
  ],
  prerequisites: ["ospf"],
  concepts: ["EIGRP", "DUAL", "Successor", "Feasible Successor", "AD/FD", "Named Mode", "Autonomous System", "K-values"],
  commands: [
    { command: "router eigrp 100", description: "Enable EIGRP AS 100 (classic mode)" },
    { command: "network 192.168.1.0 0.0.0.255", description: "Advertise network ด้วย wildcard mask" },
    { command: "no auto-summary", description: "ปิด Auto-summarization (ต้องทำใน Classful network)" },
    { command: "router eigrp MAIN\neigrp router-id 1.1.1.1", description: "Named EIGRP mode — modern approach" },
    { command: "show ip eigrp neighbors", description: "แสดง EIGRP Neighbors, Hold Time, Uptime" },
    { command: "show ip eigrp topology", description: "แสดง EIGRP Topology Table — Successor + Feasible Successor" },
    { command: "show ip route eigrp", description: "Routes ที่ EIGRP installed (marked D)" },
    { command: "ip bandwidth-percent eigrp 100 25", description: "จำกัด Bandwidth ที่ EIGRP ใช้ได้ (default 50%)" },
  ],
  labs: [{
      title: "EIGRP Hub-and-Spoke + Summarization",
      level: "Intermediate",
      estimatedMinutes: 60,
      steps: [
      "Configure IP Addresses บนทุก Interface",
      "Enable EIGRP AS 100 บนทุก Router, network ทุก interface",
      "no auto-summary บนทุก Router",
      "show ip eigrp neighbors — ตรวจ Neighbor",
      "show ip eigrp topology — หา Successor และ Feasible Successor",
      "ทำ Manual Summary บน R1: ip summary-address eigrp 100 10.0.0.0 255.0.0.0",
      "ตรวจ Routing Table บน Spoke — ควรเห็น Summary Route",
    ],
      verification: [
      "show ip eigrp neighbors — ทุก Neighbor ต้อง Up",
      "show ip eigrp topology all-links — เห็นทุก Route",
      "show ip route eigrp — Routes มี D prefix",
      "ping ระหว่าง Spoke Networks ผ่าน Hub",
    ],
    }],
  troubleshooting: [
    { symptom: "EIGRP Neighbor ไม่ขึ้น (Stuck in Active)", possibleCause: "AS Number ไม่ตรงกัน, K-values ไม่ match, Authentication ผิด, Network Statement ไม่ครอบ Interface", check: "show ip eigrp neighbors; debug eigrp packets; show ip protocols — ดู AS Number", fix: "ตรวจสอบ AS Number ทั้งสอง Router ต้องตรงกัน; ตรวจ K-values ต้อง match; ตรวจ Authentication key" },
    { symptom: "Route ใน EIGRP Topology แต่ไม่อยู่ใน Routing Table", possibleCause: "Route ไม่ผ่าน Feasibility Condition (FC) — FD > AD", check: "show ip eigrp topology all-links — ดู AD/FD ของทุก Path", fix: "ปรับ Bandwidth/Delay บน Interface เพื่อให้ FC ผ่าน หรือใช้ variance สำหรับ Unequal Load Balancing" },
  ],
  quiz: [
    makeQ("EIGRP Metric ใช้อะไรคำนวณ?", ["Hop Count", "Bandwidth + Delay (default)", "Cost = 10^8/BW", "จำนวน Router"], "Bandwidth + Delay (default)", "EIGRP ใช้ Composite Metric: K1*BW + K3*Delay (default K1=K3=1, K2=K4=K5=0) — Bandwidth เป็น Bottleneck Link, Delay เป็น Sum ตลอดเส้นทาง"),
    makeQ("Feasible Successor คืออะไร?", ["Primary Route", "Backup Route ที่ผ่าน Feasibility Condition (AD < FD)", "Route ที่ไม่ใช้", "Route จาก OSPF"], "Backup Route ที่ผ่าน Feasibility Condition (AD < FD)", "Feasible Successor คือ backup path ที่ AD (Advertised Distance จาก Neighbor) < FD (Feasible Distance ของ Successor ปัจจุบัน) — ถ้า Successor ล้มเหลว FS ถูก Install ทันทีโดยไม่ต้อง Query"),
    makeQ("EIGRP ใช้ Algorithm ชื่ออะไร?", ["Dijkstra", "Bellman-Ford", "DUAL", "A*"], "DUAL", "DUAL (Diffusing Update Algorithm) รับประกัน Loop-free path และ Fast Convergence — ถ้าไม่มี FS จะส่ง Query ไป Neighbors"),
    makeQ("no auto-summary ใน EIGRP ทำอะไร?", ["เร่ง Convergence", "ปิด Classful Summarization — ส่ง Subnet จริง", "เพิ่ม Security", "ลด Metric"], "ปิด Classful Summarization — ส่ง Subnet จริง", "EIGRP Classic Mode สรุป Route ตาม Class A/B/C โดย default — no auto-summary ปิดสิ่งนี้เพื่อส่ง Subnet ที่แท้จริง สำคัญมากใน Discontiguous Network"),
    makeQ("EIGRP ต่างจาก OSPF อย่างไรที่สำคัญที่สุด?", ["EIGRP ช้ากว่า", "EIGRP เป็น Cisco Proprietary, OSPF เป็น Open Standard", "OSPF ใช้ Bandwidth น้อยกว่า", "ไม่มีความต่าง"], "EIGRP เป็น Cisco Proprietary, OSPF เป็น Open Standard", "EIGRP ทำงานได้เฉพาะ Cisco (บาง vendor รองรับ) ส่วน OSPF เป็น Open Standard — EIGRP Config ง่ายกว่า, OSPF Scale ได้ดีกว่าใน Multi-vendor"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย Successor vs Feasible Successor ใน EIGRP", "Successor: Best Path ไปยัง Destination — อยู่ใน Routing Table และ Topology Table; Feasible Successor: Backup Path ที่ผ่าน Feasibility Condition (AD < FD ของ Successor) — อยู่ใน Topology Table พร้อม Install ทันทีถ้า Successor ล้มเหลว — ทำให้ Fast Convergence"),
    makeI("Mid", "เมื่อไหร่จะเลือก EIGRP แทน OSPF", "EIGRP ดีกว่าเมื่อ: Pure Cisco Environment; ต้องการ Config ที่ง่าย (ไม่ต้องออกแบบ Area); มี Unequal Load Balancing (variance); Network ขนาดกลาง; OSPF ดีกว่าเมื่อ: Multi-vendor; Network ใหญ่มาก (Hierarchical Areas ช่วย Scale); ต้องการ Standard + ดูแลง่ายระยะยาว"),
    makeI("Senior", "อธิบาย EIGRP Stuck in Active และวิธีแก้", "Stuck in Active เกิดเมื่อ EIGRP ส่ง Query แต่ไม่ได้รับ Reply ภายใน Active Timer (3 min default) — สาเหตุ: Router ล้ม, Link เต็ม, Query Propagation ไปไกลเกิน; แก้ด้วย: Route Summarization ลด Query Scope, Stub Router (eigrp stub) บน Branch — Stub ไม่ส่ง Query ต่อ, ปรับ Active Timer, ออกแบบ Hierarchical Network"),
  ],
  tags: ["EIGRP", "DUAL", "Routing Protocol", "Successor", "Feasible Successor", "Enterprise", "Cisco"],
  order: 10,
};

const ipv6Lesson: Lesson = {
  id: "found-011",
  slug: "ipv6-fundamentals",
  title: "IPv6 Fundamentals",
  titleTh: "IPv6 พื้นฐาน",
  track: "foundation",
  category: "addressing",
  level: "Intermediate",
  duration: "60 min",
  xp: 110,
  description: "IPv6 คือ Future ของ Internet — 128-bit Address, Stateless Autoconfiguration, NDP แทน ARP เรียนรู้ Address Types, Prefix, Routing และ Transition Mechanism",
  objectives: [
    "อ่านและเขียน IPv6 Address ในรูปแบบย่อที่ถูกต้อง",
    "แยก Address Types: Global Unicast, Link-local, Loopback, Multicast",
    "อธิบาย SLAAC และ DHCPv6 — Stateless vs Stateful",
    "อธิบาย NDP (Neighbor Discovery Protocol) แทน ARP",
    "Configure IPv6 บน Router และ Routing (OSPFv3 / EIGRP for IPv6)",
  ],
  prerequisites: ["ipv4-addressing"],
  concepts: ["IPv6", "128-bit", "Global Unicast", "Link-local", "SLAAC", "NDP", "EUI-64", "OSPFv3", "Dual Stack", "6to4"],
  commands: [
    { command: "ipv6 unicast-routing", description: "Enable IPv6 routing บน Router (Global)" },
    { command: "ipv6 address 2001:db8:1::1/64", description: "Assign Global Unicast IPv6 Address" },
    { command: "ipv6 address fe80::1 link-local", description: "Manual Link-local Address" },
    { command: "ipv6 address autoconfig", description: "SLAAC — Router ได้ Address อัตโนมัติจาก RA" },
    { command: "show ipv6 interface brief", description: "แสดง IPv6 Address บนทุก Interface" },
    { command: "show ipv6 neighbors", description: "แสดง IPv6 Neighbor Cache (เทียบ ARP Table)" },
    { command: "ping ipv6 2001:db8::1", description: "Ping ด้วย IPv6" },
    { command: "ipv6 route ::/0 2001:db8::1", description: "Default Route IPv6" },
  ],
  labs: [{
      title: "IPv6 Dual-Stack + SLAAC",
      level: "Intermediate",
      estimatedMinutes: 60,
      steps: [
      "Enable ipv6 unicast-routing บน Router",
      "Assign Global Unicast IPv6 บน Router Interfaces",
      "Enable SLAAC: ipv6 nd ra suppress ปิด แล้วให้ PC autoconfig",
      "ตรวจ PC ได้ IPv6 Address จาก SLAAC (EUI-64 format)",
      "show ipv6 neighbors — ดู NDP Cache",
      "ping ipv6 ระหว่าง PC — ใช้ Link-local + Global Unicast",
      "Configure OSPFv3 ระหว่าง Routers สำหรับ IPv6 Routing",
    ],
      verification: [
      "show ipv6 interface — Address ทุก Interface ถูกต้อง",
      "show ipv6 neighbors — NDP entries มีครบ",
      "PC: ipconfig — มี IPv6 Global Unicast + Link-local",
      "ping6 ระหว่าง PCs ผ่านได้",
    ],
    }],
  troubleshooting: [
    { symptom: "PC ไม่ได้ IPv6 Address จาก SLAAC", possibleCause: "Router ไม่ส่ง RA (Router Advertisement), ipv6 unicast-routing ไม่ได้ enable", check: "show ipv6 interface — ดู RA suppress; debug ipv6 nd", fix: "Enable ipv6 unicast-routing; ตรวจว่าไม่มี ipv6 nd ra suppress บน Interface" },
    { symptom: "ping IPv6 ไม่ผ่านแม้ Address ถูก", possibleCause: "Firewall บล็อก ICMPv6, ACLv6 ผิด, Route ไม่มี", check: "show ipv6 route; show ipv6 access-lists", fix: "ตรวจ ACLv6 — IPv6 ต้องการ ICMPv6 ผ่านเสมอสำหรับ NDP; ตรวจ Default Route IPv6" },
  ],
  quiz: [
    makeQ("IPv6 Address มีกี่ bit?", ["32 bit", "64 bit", "128 bit", "256 bit"], "128 bit", "IPv6 ใช้ 128-bit Address เทียบกับ IPv4 32-bit — ทำให้มี 3.4×10^38 Addresses เพียงพอสำหรับทุกอุปกรณ์"),
    makeQ("Link-local Address เริ่มด้วยอะไร?", ["2001::", "FC00::", "FE80::", "FF00::"], "FE80::", "Link-local Address (FE80::/10) ใช้สื่อสารบน Local Segment เท่านั้น — ไม่ Route ผ่าน Router ใช้สำหรับ NDP, SLAAC, Routing Protocol Next-hop"),
    makeQ("SLAAC ย่อมาจากอะไร?", ["Static Link Auto-Address Configuration", "Stateless Address Autoconfiguration", "Simple Local Area Access Control", "Subnet Local Address Allocation"], "Stateless Address Autoconfiguration", "SLAAC ให้ Host สร้าง IPv6 Address เองจาก Network Prefix (จาก RA) + Interface ID (EUI-64) โดยไม่ต้องมี DHCP Server"),
    makeQ("NDP แทนอะไรใน IPv4?", ["DHCP", "DNS", "ARP", "ICMP"], "ARP", "NDP (Neighbor Discovery Protocol) ทำหน้าที่แทน ARP — ใช้ ICMPv6 Neighbor Solicitation/Advertisement แทน ARP Request/Reply บน IPv4"),
    makeQ("EUI-64 คืออะไร?", ["IPv6 Prefix", "วิธีสร้าง Interface ID จาก MAC Address 48-bit เป็น 64-bit", "IPv6 Routing Protocol", "Type ของ IPv6 Address"], "วิธีสร้าง Interface ID จาก MAC Address 48-bit เป็น 64-bit", "EUI-64 แทรก FFFE ตรงกลาง MAC Address และ flip bit 7 ของ Byte แรก — ทำให้ได้ 64-bit Interface ID ที่ Globally Unique"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย IPv6 Address Types ที่สำคัญ", "Global Unicast (2000::/3): Public IP ที่ Route บน Internet; Link-local (FE80::/10): ใช้บน Segment เดียว ไม่ Route; Loopback (::1/128): localhost; Multicast (FF00::/8): ส่งหลาย Host; Anycast: IP เดียวบน Router หลายตัว — ส่งไปที่ใกล้ที่สุด; ไม่มี Broadcast ใน IPv6"),
    makeI("Mid", "อธิบาย Dual Stack vs Tunneling vs Translation สำหรับ IPv6 Transition", "Dual Stack: ทั้ง IPv4 และ IPv6 ทำงานพร้อมกัน — ง่ายที่สุดแต่ต้องการ Infrastructure รองรับทั้งคู่; Tunneling (6to4, ISATAP, GRE): ห่อ IPv6 ไว้ใน IPv4 Packet ข้าม IPv4-only Network; Translation (NAT64/DNS64): แปลง IPv6 ↔ IPv4 สำหรับ Communication ระหว่าง IPv6-only กับ IPv4-only Host"),
    makeI("Senior", "ออกแบบ IPv6 Addressing Plan สำหรับ Enterprise 5000 Employees", "ขอ /32 จาก ISP (หรือ /48 สำหรับ Site เดียว); แบ่ง /48 เป็น /56 per Building; แต่ละ Floor ได้ /64 — SLAAC ทำงานได้ทันที; Link-local FE80::/64 บน Router Links; Management Network ใช้ /64 แยก; ใช้ OSPFv3 หรือ EIGRP for IPv6; Deploy DHCPv6 Stateful สำหรับ Windows Devices (SLAAC ไม่ได้ DNS บน Windows); Monitor ด้วย IPv6-capable SNMP/Syslog"),
  ],
  tags: ["IPv6", "SLAAC", "NDP", "EUI-64", "Dual Stack", "Global Unicast", "Link-local", "OSPFv3"],
  order: 11,
};

const qosLesson: Lesson = {
  id: "found-012",
  slug: "qos-basics",
  title: "Quality of Service (QoS)",
  titleTh: "QoS — Quality of Service พื้นฐาน",
  track: "foundation",
  category: "routing",
  level: "Intermediate",
  duration: "45 min",
  xp: 100,
  description: "QoS จัดลำดับความสำคัญ Traffic เพื่อให้ Voice/Video มีคุณภาพดี แม้ Network ยุ่ง — เรียนรู้ Classification, Marking, Queuing, Shaping, Policing",
  objectives: [
    "อธิบาย QoS Models: Best Effort, IntServ, DiffServ",
    "อธิบาย Traffic Classification: DSCP, CoS, IP Precedence",
    "เปรียบเทียบ Queuing Algorithms: FIFO, WFQ, CBWFQ, LLQ",
    "อธิบาย Policing vs Shaping — ความแตกต่างและการใช้งาน",
    "Verify QoS ด้วย show policy-map interface",
  ],
  prerequisites: ["network-fundamentals"],
  concepts: ["DSCP", "CoS", "DiffServ", "LLQ", "CBWFQ", "WFQ", "Policing", "Shaping", "MQC", "Traffic Class"],
  commands: [
    { command: "class-map match-any VOICE\n match dscp ef", description: "ระบุ Traffic Class: DSCP EF (Expedited Forwarding) = Voice" },
    { command: "policy-map QOS_POLICY\n class VOICE\n  priority 1000", description: "LLQ: Voice ได้ Guaranteed BW 1Mbps พร้อม Low Latency Queue" },
    { command: "service-policy output QOS_POLICY", description: "Apply QoS Policy บน Interface (Outbound)" },
    { command: "show policy-map interface gi0/1", description: "ดู QoS Statistics: Drops, Queuing, Marking" },
    { command: "ip dscp-map", description: "Map DSCP values" },
  ],
  labs: [{
      title: "LLQ QoS สำหรับ Voice + Data",
      level: "Intermediate",
      estimatedMinutes: 60,
      steps: [
      "สร้าง Class-Map สำหรับ Voice (DSCP EF), Video (DSCP AF41), Data (default)",
      "สร้าง Policy-Map: Voice → LLQ priority 2Mbps, Video → CBWFQ 4Mbps, Data → CBWFQ 4Mbps",
      "Apply Service-Policy บน WAN Interface (Outbound)",
      "Generate Traffic: ping flood สำหรับ Data",
      "show policy-map interface — ดู Queue Statistics",
      "ตรวจ Voice Traffic ไม่มี Drops แม้ Data Congestion",
    ],
      verification: [
      "show policy-map interface — Policy ถูก Apply",
      "Voice Class มี 0 drops ขณะ Network congested",
      "show class-map — Class ทุกตัวถูก Define",
    ],
    }],
  troubleshooting: [
    { symptom: "Voice Quality ไม่ดี (Choppy/Jitter) แม้มี QoS", possibleCause: "Policy ไม่ได้ Apply บน Interface ที่ถูกต้อง, DSCP marking ผิด, Bandwidth ไม่พอ", check: "show policy-map interface — ดู Hits ของ Voice Class; show run interface — ตรวจ service-policy", fix: "ตรวจ DSCP marking บน IP Phone, ตรวจ policy apply ถูก Direction, เพิ่ม Bandwidth ให้ LLQ" },
  ],
  quiz: [
    makeQ("DSCP EF ใช้กับ Traffic อะไร?", ["HTTP", "Voice/Real-time", "Database", "Backup"], "Voice/Real-time", "EF (Expedited Forwarding / DSCP 46) สำรองสำหรับ Voice และ Real-time Traffic ที่ต้องการ Low Latency, Low Jitter, Low Loss"),
    makeQ("LLQ ต่างจาก CBWFQ อย่างไร?", ["LLQ เร็วกว่า", "LLQ มี Strict Priority Queue สำหรับ Real-time Traffic", "CBWFQ ง่ายกว่า", "ไม่มีความต่าง"], "LLQ มี Strict Priority Queue สำหรับ Real-time Traffic", "LLQ = CBWFQ + Strict Priority Queue — Real-time Traffic (Voice) ออกก่อนเสมอ ไม่ต้องแชร์ BW กับ Traffic อื่น"),
    makeQ("Policing vs Shaping ต่างกันอย่างไร?", ["Policing เร็วกว่า", "Policing DROP เกิน Rate ทันที, Shaping DELAY (Buffer) เกิน Rate", "Shaping ปลอดภัยกว่า", "เหมือนกัน"], "Policing DROP เกิน Rate ทันที, Shaping DELAY (Buffer) เกิน Rate", "Policing: Drop/Remark Traffic ที่เกิน Rate ทันที — ใช้ที่ Ingress/ISP Edge; Shaping: Buffer Traffic ไว้ส่งทีหลัง — ใช้ที่ Egress ก่อน WAN"),
    makeQ("Trust Boundary ใน QoS คืออะไร?", ["Firewall", "จุดที่เชื่อถือ DSCP Marking ของ Endpoint", "Router แรก", "ISP Edge"], "จุดที่เชื่อถือ DSCP Marking ของ Endpoint", "Trust Boundary: Access Switch หรือ Router ที่ยอมรับ DSCP จาก Endpoint — ควรกำหนด Trust ที่ IP Phone เพื่อให้ PC ไม่สามารถ Self-mark เป็น Priority สูง"),
    makeQ("DiffServ Model ใช้หลักการอะไร?", ["Reserve BW ล่วงหน้าทุก Flow", "Mark Packet ที่ Edge แล้วให้ Core Forward ตาม DSCP", "Per-flow signaling", "Best effort เท่านั้น"], "Mark Packet ที่ Edge แล้วให้ Core Forward ตาม DSCP", "DiffServ: Mark DSCP บน Edge Device ให้ Core Router Forward ตาม Per-Hop Behavior (PHB) — Scale ได้ดีกว่า IntServ ที่ต้อง Reserve ทุก Flow"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย QoS Models 3 แบบ", "Best Effort: ไม่มี QoS ทุก Packet เท่ากัน; IntServ (RSVP): Reserve BW ล่วงหน้าสำหรับแต่ละ Flow — Scale ไม่ดี; DiffServ: Mark DSCP บน Edge แล้วให้ Core ทำ PHB — ใช้จริงในปัจจุบัน Enterprise ใช้ DiffServ เป็นหลัก"),
    makeI("Mid", "อธิบาย Voice QoS Requirements และวิธี Design", "Voice ต้องการ: Delay < 150ms One-way; Jitter < 30ms; Packet Loss < 1%; BW ≈ 64-87 kbps per call (G.711); Design: Mark DSCP EF ที่ IP Phone; LLQ Priority Queue บน WAN; สำรอง BW 30% สำหรับ Voice; ใช้ CAC (Call Admission Control) จำกัดจำนวน Call; DSCP trust บน Access Switch Port ที่ต่อ IP Phone"),
    makeI("Senior", "ออกแบบ End-to-End QoS สำหรับ Enterprise WAN", "Campus Edge: Access Switch trust IP Phone DSCP EF / PC re-mark; Distribution: DSCP ผ่าน Transparent; WAN Edge: MQC Policy 5 Class — Voice LLQ 20%, Video CBWFQ 30%, Critical App 20%, Default 25%, Scavenger 5%; ISP SLA: ตรวจสอบ DSCP ถูก Honor ผ่าน iPerf; Monitor ด้วย NBAR สำหรับ App classification; QoS ต้อง Consistent ทุก Hop"),
  ],
  tags: ["QoS", "DSCP", "LLQ", "CBWFQ", "Policing", "Shaping", "DiffServ", "Voice", "MQC"],
  order: 12,
};

const dhcpDnsLesson: Lesson = {
  id: "found-013",
  slug: "dhcp-dns",
  title: "DHCP & DNS",
  titleTh: "DHCP และ DNS — Network Services พื้นฐาน",
  track: "foundation",
  category: "fundamentals",
  level: "Beginner",
  duration: "40 min",
  xp: 85,
  description: "DHCP แจก IP อัตโนมัติ, DNS แปลง Domain เป็น IP — สองบริการนี้ทำให้ Network ใช้งานได้โดยไม่ต้อง Config ด้วยมือทุก Device",
  objectives: [
    "อธิบาย DORA Process: Discover, Offer, Request, Acknowledge",
    "Configure DHCP Server บน Router และ DHCP Relay (ip helper-address)",
    "อธิบาย DNS Resolution Process: Recursive vs Iterative Query",
    "Configure DNS บน Router + ตรวจสอบด้วย nslookup/dig",
    "Troubleshoot DHCP/DNS ด้วย debug และ show commands",
  ],
  prerequisites: ["network-fundamentals", "ipv4-addressing"],
  concepts: ["DHCP", "DORA", "ip helper-address", "DHCP Relay", "DNS", "A Record", "CNAME", "MX", "Recursive Query", "TTL"],
  commands: [
    { command: "ip dhcp pool LAN_POOL\n network 192.168.1.0 255.255.255.0\n default-router 192.168.1.1\n dns-server 8.8.8.8\n lease 7", description: "สร้าง DHCP Pool พร้อม Gateway, DNS, Lease Time" },
    { command: "ip dhcp excluded-address 192.168.1.1 192.168.1.20", description: "ยกเว้น IP ที่ใช้งานอยู่จาก Pool" },
    { command: "ip helper-address 10.0.0.2", description: "DHCP Relay — Forward Broadcast ไปยัง DHCP Server อีก Subnet" },
    { command: "show ip dhcp binding", description: "แสดง IP ที่แจกออกไปพร้อม MAC + Lease expiry" },
    { command: "show ip dhcp pool", description: "สถิติ Pool: Available, Allocated addresses" },
    { command: "debug ip dhcp server events", description: "Real-time DHCP events" },
    { command: "ip domain-lookup\nip name-server 8.8.8.8", description: "Enable DNS Lookup + กำหนด DNS Server" },
  ],
  labs: [{
      title: "DHCP Multi-Subnet + Relay",
      level: "Beginner",
      estimatedMinutes: 60,
      steps: [
      "สร้าง DHCP Pool สำหรับ 3 Subnets บน Central Router",
      "ip dhcp excluded-address สำหรับ Router + Server IPs",
      "บน Access Router: ip helper-address ชี้ไป DHCP Server",
      "Test: PC Request IP — ควรได้จาก Pool ที่ถูก Subnet",
      "show ip dhcp binding — ดูทุก Lease",
      "Revoke แล้ว Renew IP: ipconfig /release + /renew",
    ],
      verification: [
      "show ip dhcp binding — ทุก PC มี IP ใน Pool ที่ถูกต้อง",
      "PC: ipconfig — ได้ IP, Gateway, DNS ถูกต้อง",
      "ping gateway จาก PC ทุกตัว",
      "show ip dhcp pool — Available addresses ลดลง",
    ],
    }],
  troubleshooting: [
    { symptom: "PC ไม่ได้ IP (APIPA 169.254.x.x)", possibleCause: "DHCP Pool หมด, DHCP Server ไม่ได้ up, DHCP Relay ไม่ได้ config, Excluded range ครอบทั้ง Pool", check: "show ip dhcp pool — ดู Available; show ip dhcp binding; debug ip dhcp server events", fix: "ขยาย Pool หรือลด Lease Time; ตรวจ ip helper-address บน Router; ตรวจ excluded ไม่ครอบ IP ที่จะแจก" },
    { symptom: "DNS ไม่ทำงาน — ping domain ไม่ผ่าน แต่ ping IP ผ่าน", possibleCause: "DNS Server ไม่ถึง, ip domain-lookup ถูกปิด, DNS Server ผิด", check: "nslookup google.com; show hosts; debug domain", fix: "ตรวจ DNS Server IP ใน DHCP Pool; enable ip domain-lookup; ตรวจ Firewall ไม่บล็อก UDP 53" },
  ],
  quiz: [
    makeQ("DORA ย่อมาจากอะไร?", ["Data, Output, Route, Address", "Discover, Offer, Request, Acknowledge", "Domain, Origin, Reply, Assign", "Dynamic, Optional, Relay, Auth"], "Discover, Offer, Request, Acknowledge", "DORA = 4 ขั้นตอน DHCP: Client ส่ง Discover (Broadcast) → Server ตอบ Offer → Client ส่ง Request → Server ตอบ Ack พร้อม IP"),
    makeQ("ip helper-address ใช้ทำอะไร?", ["Block DHCP", "Forward DHCP Broadcast ไปยัง DHCP Server อีก Subnet", "Assign Static IP", "Monitor DHCP"], "Forward DHCP Broadcast ไปยัง DHCP Server อีก Subnet", "DHCP ใช้ Broadcast ที่ไม่ข้าม Router — ip helper-address บน Router Interface แปลง Broadcast → Unicast ส่งไป DHCP Server"),
    makeQ("DNS A Record คืออะไร?", ["Mail Server Record", "IPv4 Address Record — แปลง Domain → IP", "Alias Record", "Name Server Record"], "IPv4 Address Record — แปลง Domain → IP", "A Record: hostname → IPv4 Address; AAAA: hostname → IPv6; CNAME: Alias; MX: Mail Server; PTR: Reverse DNS (IP → hostname)"),
    makeQ("TTL ใน DNS คืออะไร?", ["Transfer Time Limit", "เวลาที่ Cache DNS Record ก่อน Query ใหม่", "TCP Timeout", "Authentication Timer"], "เวลาที่ Cache DNS Record ก่อน Query ใหม่", "TTL (Time to Live) กำหนดว่า Resolver Cache Record ไว้นานเท่าไร — TTL ต่ำ: เปลี่ยน IP ได้เร็ว แต่ Query บ่อย; TTL สูง: ลด Load แต่เปลี่ยน IP ช้า"),
    makeQ("Recursive DNS Query คืออะไร?", ["Query ที่ Client ต้องส่ง Query หลายรอบ", "Query ที่ Resolver รับผิดชอบหา Answer จนเจอ", "Query ที่เร็วกว่า", "Query ไปยัง Root Server โดยตรง"], "Query ที่ Resolver รับผิดชอบหา Answer จนเจอ", "Recursive: Client ถาม Resolver → Resolver ไปถาม Root → TLD → Authoritative และส่ง Final Answer กลับมา Client; Iterative: Resolver ตอบ Referral ให้ Client ไปถามต่อเอง"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย DHCP DORA Process และ Packet ที่ใช้", "Discover: Client ส่ง UDP Broadcast (src 0.0.0.0 dst 255.255.255.255 port 67); Offer: Server ตอบ Unicast/Broadcast เสนอ IP, Subnet, GW, DNS, Lease; Request: Client ส่ง Broadcast เลือก Offer (แจ้ง Server ที่ไม่ได้เลือกด้วย); Acknowledge: Server ยืนยัน IP และ Parameters ทั้งหมด"),
    makeI("Mid", "อธิบาย DNS Resolution ตั้งแต่ต้นจนจบ", "1. Browser ถาม Local Cache; 2. OS ถาม Resolver (ISP/8.8.8.8); 3. Resolver ถาม Root Server (.) → ได้ TLD NS; 4. ถาม TLD .com NS → ได้ Authoritative NS; 5. ถาม Authoritative NS → ได้ A Record; 6. Resolver Cache และตอบ Client; ทั้งหมดใช้เวลา < 100ms"),
    makeI("Senior", "ออกแบบ DHCP/DNS HA สำหรับ Enterprise 5000 Users", "DHCP: 2 DHCP Servers, Split-scope 50/50 หรือ Failover Partnership (Cisco หรือ Windows DHCP Failover); Pool แยก VLAN — ip helper-address ชี้ทั้งสอง Server; Exclude IPs ให้ Server, Printers, AP; DNS: Primary + Secondary Internal DNS Servers; Forward Zone สำหรับ Internal Domain; Forward Conditional ไป External DNS; RPZ (Response Policy Zone) สำหรับ Security; Monitor ด้วย Prometheus + Grafana"),
  ],
  tags: ["DHCP", "DNS", "DORA", "ip helper-address", "A Record", "DNS Resolution", "Network Services"],
  order: 13,
};

const wanLesson: Lesson = {
  id: "found-014",
  slug: "wan-technologies",
  title: "WAN Technologies",
  titleTh: "WAN Technologies — เชื่อมต่อระหว่าง Site",
  track: "foundation",
  category: "routing",
  level: "Intermediate",
  duration: "50 min",
  xp: 100,
  description: "WAN เชื่อม Branch, HQ, Cloud — เรียนรู้ MPLS, SD-WAN, IPsec VPN, Leased Line และวิธีเลือก WAN Technology ที่เหมาะกับ Business",
  objectives: [
    "เปรียบเทียบ WAN Technologies: Leased Line, MPLS, Internet VPN, SD-WAN",
    "อธิบาย MPLS Labels และ Label Switching",
    "อธิบาย IPsec VPN: IKEv2, ESP, Tunnel Mode vs Transport Mode",
    "อธิบาย SD-WAN Architecture และข้อดีเทียบ Traditional WAN",
    "เลือก WAN Technology ที่เหมาะกับ Business Requirements",
  ],
  prerequisites: ["network-fundamentals", "ospf"],
  concepts: ["MPLS", "Label Switching", "LSP", "IPsec", "IKEv2", "ESP", "GRE", "SD-WAN", "vEdge", "Underlay", "Overlay"],
  commands: [
    { command: "crypto isakmp policy 10\n encryption aes 256\n hash sha256\n authentication pre-share\n group 14", description: "IKEv1 Phase 1: AES-256, SHA-256, DH Group 14" },
    { command: "crypto ipsec transform-set TS esp-aes 256 esp-sha256-hmac", description: "IPsec Transform Set: AES-256 + SHA-256 HMAC" },
    { command: "crypto map CMAP 10 ipsec-isakmp\n match address VPN_ACL\n set peer 203.0.113.1\n set transform-set TS", description: "Crypto Map กำหนด Peer + Traffic ที่ Encrypt" },
    { command: "show crypto ipsec sa", description: "ดู IPsec SA: Packets encrypted/decrypted, Errors" },
    { command: "show mpls forwarding-table", description: "ดู MPLS Label Forwarding Table (LFIB)" },
  ],
  labs: [{
      title: "Site-to-Site IPsec VPN",
      level: "Advanced",
      estimatedMinutes: 60,
      steps: [
      "Configure IP Routing บน HQ และ Branch (default route ไป ISP)",
      "สร้าง IKEv1 Policy บนทั้งสอง Router",
      "สร้าง Pre-shared Key สำหรับ Peer",
      "สร้าง IPsec Transform Set",
      "สร้าง ACL กำหนด Interesting Traffic",
      "สร้าง Crypto Map และ Apply บน WAN Interface",
      "Initiate VPN: ping LAN ของอีก Site จาก PC",
    ],
      verification: [
      "show crypto isakmp sa — SA ต้อง QM_IDLE",
      "show crypto ipsec sa — Packets encrypted > 0",
      "ping จาก HQ LAN ไป Branch LAN ผ่าน Encrypted Tunnel",
    ],
    }],
  troubleshooting: [
    { symptom: "IPsec VPN Phase 1 ไม่ขึ้น", possibleCause: "IKE Policy ไม่ match (encryption/hash/DH group ต่าง), Pre-shared Key ผิด, UDP 500 ถูกบล็อก", check: "debug crypto isakmp; show crypto isakmp sa — ดู State; show crypto isakmp policy", fix: "ตรวจ Policy ทั้งสอง Router ต้อง Match; ตรวจ Pre-shared Key ตรงกัน; ตรวจ Firewall ไม่บล็อก UDP 500/4500" },
    { symptom: "Phase 1 ขึ้นแต่ Phase 2 ไม่ขึ้น", possibleCause: "Transform Set ไม่ match, ACL Interesting Traffic ไม่ mirror กัน, Proxy Identity ผิด", check: "debug crypto ipsec; show crypto ipsec sa — ดู Errors", fix: "ตรวจ Transform Set ต้องเหมือนกัน; ตรวจ ACL ทั้งสอง Router ต้อง Mirror กัน (Src/Dst สลับ)" },
  ],
  quiz: [
    makeQ("MPLS ต่างจาก Traditional IP Routing อย่างไร?", ["MPLS เร็วกว่า", "MPLS ใช้ Label แทน IP Lookup ทุก Hop — เร็วและ Predictable Path", "MPLS ปลอดภัยกว่า", "MPLS ใช้ UDP"], "MPLS ใช้ Label แทน IP Lookup ทุก Hop — เร็วและ Predictable Path", "MPLS ติด Label บน Packet ที่ Edge Router — Core Router ดู Label เท่านั้น ไม่ต้อง Lookup Routing Table ทุก Hop ทำให้เร็วและสร้าง Traffic Engineering ได้"),
    makeQ("IKE Phase 1 ทำอะไร?", ["Encrypt Data", "สร้าง Secure Channel (ISAKMP SA) สำหรับ Negotiate Phase 2", "Assign IP", "Route Packets"], "สร้าง Secure Channel (ISAKMP SA) สำหรับ Negotiate Phase 2", "IKE Phase 1: Authenticate Peers + สร้าง Encrypted Channel ด้วย DH Key Exchange; Phase 2: Negotiate IPsec SA (Transform Set, Keys) สำหรับ Encrypt Data จริง"),
    makeQ("SD-WAN ข้อดีหลักเทียบ Traditional MPLS WAN?", ["ราคาถูกกว่าเท่านั้น", "ใช้ Internet Links ได้ + Central Management + Application-aware Routing", "Security ดีกว่า", "ไม่มีข้อดี"], "ใช้ Internet Links ได้ + Central Management + Application-aware Routing", "SD-WAN: ใช้ Internet/LTE/MPLS ร่วมกัน; Route ตาม App (Salesforce ไป MPLS, YouTube ไป Internet); Central Policy จาก Cloud Controller; Zero-touch Provisioning"),
    makeQ("ESP ใน IPsec ทำอะไร?", ["ส่ง Key", "Encrypt + Authenticate Payload", "Route Packet", "Compress Data"], "Encrypt + Authenticate Payload", "ESP (Encapsulating Security Payload) Encrypt Data Payload + ให้ Authentication — AH (Authentication Header) ให้เฉพาะ Authentication ไม่ Encrypt; Enterprise ใช้ ESP เป็นหลัก"),
    makeQ("Tunnel Mode vs Transport Mode ต่างกันอย่างไร?", ["ความเร็ว", "Tunnel Mode เข้ารหัส IP Header ด้วย, Transport Mode เข้ารหัสเฉพาะ Payload", "Security", "ไม่มีความต่าง"], "Tunnel Mode เข้ารหัส IP Header ด้วย, Transport Mode เข้ารหัสเฉพาะ Payload", "Tunnel Mode: สร้าง IP Header ใหม่ ซ่อน Original Header — ใช้สำหรับ Site-to-Site VPN; Transport Mode: ต่อตรง Host-to-Host ใช้ L2TP/IPsec สำหรับ Remote Access"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย MPLS Label Switching Process", "PE Router (Provider Edge) รับ IP Packet → ดู Routing Table → ผูก Label → ส่งเข้า MPLS Cloud; P Router (Provider Core) ดูเฉพาะ Label → LFIB Lookup → สลับ Label → ส่งต่อ; PE ปลายทาง ถอด Label → Deliver ด้วย IP — ทำให้ Core ไม่ต้องมี Route ปลายทาง"),
    makeI("Mid", "เปรียบเทียบ MPLS vs Internet VPN vs SD-WAN — เลือกอะไรเมื่อไหร่", "MPLS: Guaranteed BW, Low Latency, SLA — ดีสำหรับ Voice/Video + ราคาสูง; Internet VPN: IPsec/GRE ผ่าน Internet — ราคาถูก แต่ Latency/BW ไม่แน่นอน; SD-WAN: ใช้ทั้ง MPLS + Internet อัจฉริยะ — Route ตาม App + Real-time ดีที่สุด แต่ OPEX สูงกว่า; เลือก MPLS สำหรับ Critical App; SD-WAN สำหรับ Branch ที่ต้องการ Flexibility"),
    makeI("Senior", "ออกแบบ WAN สำหรับ Retail Chain 500 Branches", "Primary: SD-WAN Overlay บน Internet (100Mbps per Branch) สำหรับ General Traffic; Secondary: 4G/LTE Backup; Critical Branch (Top 50): Add MPLS 10Mbps สำหรับ POS/ERP; Central: SD-WAN Hub + DC Interconnect; Security: IPsec ทุก Branch-to-HQ; Application Policy: POS → MPLS/SD-WAN Priority; Video Surveillance → Internet; Monitoring: SLA per Application per Branch; ZTP ทุก Branch เปิดตัวเองด้วย SD-WAN Controller"),
  ],
  tags: ["WAN", "MPLS", "IPsec", "VPN", "SD-WAN", "IKE", "ESP", "GRE", "Site-to-Site", "Leased Line"],
  order: 14,
};


// ─────────────────────────────────────────────────────────────────
// FOUNDATION LESSONS — BATCH 3 (Wireless, Monitoring, Troubleshooting, Documentation)
// ─────────────────────────────────────────────────────────────────

const wirelessBasic: Lesson = {
  id: "found-015",
  slug: "wireless-basic",
  title: "Wireless Networking Fundamentals",
  titleTh: "Wireless Network พื้นฐาน",
  track: "foundation",
  category: "wireless",
  level: "Beginner",
  duration: "55 min",
  xp: 90,
  description: "802.11 standards, WLC, CAPWAP, SSID planning, WPA2/WPA3 security สำหรับ Network Engineer",
  objectives: [
    "อธิบาย 802.11a/b/g/n/ac/ax (Wi-Fi 6) และความแตกต่างด้าน frequency/throughput",
    "เข้าใจ WLC vs Autonomous AP architecture และ CAPWAP tunnel",
    "Configure SSID, VLAN mapping, WPA2/WPA3 Enterprise บน WLC",
    "วางแผน Channel planning, Cell coverage, และ Roaming",
    "Troubleshoot wireless issues ด้วย show commands",
  ],
  prerequisites: ["vlan"],
  concepts: [
    "802.11 standards: b/g/n/ac/ax (Wi-Fi 6) — frequency, MIMO, OFDMA",
    "CAPWAP: Control (UDP 5246) + Data (UDP 5247) tunnel AP→WLC",
    "WLC Centralized: AP Lightweight → CAPWAP → WLC manages all",
    "Channel planning: 2.4GHz (1/6/11 non-overlap), 5GHz (24+ channels)",
    "WPA2-Enterprise: 802.1X + RADIUS + CCMP/AES",
    "WPA3: SAE (Dragonfly), PMF mandatory, Forward Secrecy",
    "FlexConnect: AP switches locally — survives WAN outage",
    "RRM (Radio Resource Management): auto channel + power",
  ],
  commands: [
    { command: "show ap summary", description: "แสดง AP ทั้งหมดที่ join WLC" },
    { command: "show ap dot11 5ghz summary", description: "สถานะ 5GHz radio ของทุก AP" },
    { command: "show client summary", description: "Wireless clients ที่ connected" },
    { command: "show wlan summary", description: "WLAN/SSID ทั้งหมด" },
    { command: "show ap config general <ap-name>", description: "Config รายละเอียดของ AP" },
    { command: "debug client <mac-address>", description: "Debug association process ของ client" },
    { command: "show rf-profile summary", description: "RF Profiles สำหรับ RRM" },
  ],
  labs: [
    {
      title: "WLC SSID + Security Lab",
      level: "Intermediate",
      estimatedMinutes: 45,
      steps: [
        "เข้า WLC GUI: https://192.168.1.1 → WLANs → Create New",
        "สร้าง SSID 'CorpNet' → Security: WPA2+WPA3 Transition → 802.1X → RADIUS 192.168.1.10",
        "Map SSID CorpNet → VLAN 10 Interface",
        "สร้าง SSID 'Guest' → Security: WPA3-Personal → Web Policy: Passthrough → Map → VLAN 99",
        "ตรวจสอบ: show wlan summary | show client summary",
        "ทดสอบ Roaming: ย้าย client ระหว่าง AP — ตรวจสอบ reassociation time",
      ],
      verification: [
        "show client detail <mac> — ดู SSID, VLAN, Security Policy ถูกต้อง",
        "Client ที่ login staff ได้ IP จาก VLAN 10 subnet",
      ],
    },
  ],
  quiz: [
    makeQ("802.11ax (Wi-Fi 6) ใช้เทคโนโลยีใดลด congestion ใน dense environment?",
      ["MIMO", "OFDMA", "DSSS", "FHSS"], "OFDMA",
      "OFDMA แบ่ง channel เป็น sub-channels ให้หลาย client ส่งพร้อมกัน — ลด latency ใน dense Wi-Fi environments"),
    makeQ("CAPWAP ใช้ port อะไร?",
      ["UDP 5246/5247", "TCP 443/80", "UDP 1812/1813", "TCP 22/23"], "UDP 5246/5247",
      "CAPWAP ใช้ UDP 5246 (Control) และ UDP 5247 (Data) สำหรับ tunnel ระหว่าง AP และ WLC"),
    makeQ("Channel ใดใช้ได้ใน 2.4GHz โดยไม่ overlap กัน?",
      ["1, 6, 11", "1, 5, 9, 13", "1, 4, 8, 12", "2, 7, 12"], "1, 6, 11",
      "2.4GHz มี 3 non-overlapping channels: 1, 6, 11 — แต่ละ channel กว้าง 22MHz ต้องห่าง 5 channels"),
    makeQ("WPA3 Enterprise เพิ่มความปลอดภัยอะไรเหนือ WPA2?",
      ["ความเร็วสูงกว่า", "PMF บังคับ + SAE + Forward Secrecy", "ใช้ RC4 encryption", "ไม่ต้องการ RADIUS"], "PMF บังคับ + SAE + Forward Secrecy",
      "WPA3 Enterprise เพิ่ม PMF (บังคับ), SAE แทน PSK, และ Perfect Forward Secrecy ป้องกัน session replay"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย CAPWAP และทำงานยังไง", "CAPWAP เป็น protocol AP Lightweight ใช้ tunnel ไปหา WLC — Control plane (UDP 5246) จัดการ config/firmware/channel; Data plane (UDP 5247) ส่ง client traffic — ทำให้ WLC จัดการ AP แบบ centralized"),
    makeI("Mid", "เปรียบเทียบ Local Mode vs FlexConnect AP", "Local Mode: AP ส่ง traffic ผ่าน CAPWAP ไป WLC ทั้งหมด; FlexConnect: AP switch local ได้ — ถ้า WAN ขาด client ยังใช้งานได้ (standalone mode) เหมาะ Branch ที่ WAN latency สูง"),
    makeI("Senior", "ออกแบบ Wireless สำหรับ Hospital 500 Beds", "Wi-Fi 6 AP ทุก ward, SSID: Clinical (WPA3-Ent 802.1X VLAN 10), Staff (WPA3 VLAN 20), IoT Medical (WPA2-PSK isolated VLAN 30), Guest (Captive Portal VLAN 99); WLC redundant pair; RRM Auto; mDNS gateway สำหรับ medical devices"),
  ],
  troubleshooting: [
    { symptom: "Client connect ไม่ได้ — Authentication failure", possibleCause: "RADIUS unreachable หรือ credentials ผิด", check: "debug client <mac> บน WLC, ping RADIUS server", fix: "แก้ RADIUS IP/secret, ตรวจ certificate validity, ดู EAP logs บน RADIUS" },
    { symptom: "Roaming ช้า / packet loss ระหว่าง AP", possibleCause: "802.11r ไม่ได้ enable หรือ RSSI threshold ไม่เหมาะสม", check: "ตรวจ 802.11r config, ตรวจ RSSI threshold (-70dBm), ตรวจ overlap coverage ≥15%", fix: "เปิด 802.11r (Fast BSS Transition), ปรับ RSSI threshold" },
    { symptom: "Throughput ต่ำทั้งที่ signal ดี", possibleCause: "Channel utilization สูง หรือ legacy 802.11b rates ทำให้ช้า", check: "show ap dot11 5ghz summary ดู channel utilization", fix: "ปิด legacy rates, เปลี่ยน channel ที่ utilization ต่ำกว่า, ใช้ 5GHz band" },
  ],
  tags: ["wireless", "802.11", "WLC", "CAPWAP", "WPA3", "SSID", "Wi-Fi6", "RADIUS", "RRM"],
  order: 15,
};

const monitoringBasic: Lesson = {
  id: "found-016",
  slug: "monitoring-basic",
  title: "Network Monitoring Fundamentals",
  titleTh: "Network Monitoring พื้นฐาน",
  track: "foundation",
  category: "monitoring",
  level: "Beginner",
  duration: "50 min",
  xp: 85,
  description: "SNMP, Syslog, NetFlow/IPFIX, ICMP monitoring — เครื่องมือ monitor network ที่ต้องรู้จริง",
  objectives: [
    "เข้าใจ SNMP v2c vs v3 — OID, MIB, Community String, USM",
    "Configure Syslog ส่งไป centralized server + ตั้ง severity levels",
    "เข้าใจ NetFlow/IPFIX — export flow data สำหรับ traffic analysis",
    "ใช้ ICMP-based monitoring: ping, traceroute, RTTMON",
    "เชื่อม Cisco IOS กับ monitoring tools: Prometheus + Grafana",
  ],
  prerequisites: ["network-fundamentals"],
  concepts: [
    "SNMP v2c: Community String (plaintext), GET/SET/TRAP — UDP 161/162",
    "SNMP v3: USM — auth (SHA/MD5) + priv (AES/3DES) — secure",
    "OID/MIB: 1.3.6.1.2.1.1.1.0 = sysDescr, ifInOctets, enterprise MIB",
    "Syslog levels 0-7: Emergency(0) → Debug(7), production ส่ง 0-5",
    "NetFlow v5: fixed format IPv4 only; v9: template-based IPv6; IPFIX: IETF open standard",
    "Flow data: who→who, how much, when — ไม่บอก content",
    "Prometheus + SNMP Exporter + Grafana = modern monitoring stack",
    "IP SLA: active monitoring probe สำหรับ latency/jitter measurement",
  ],
  commands: [
    { command: "snmp-server community PUBLIC ro", description: "ตั้ง SNMP v2c read-only community" },
    { command: "snmp-server host 192.168.1.20 version 2c PUBLIC", description: "ส่ง SNMP trap ไป NMS" },
    { command: "snmp-server user ADMIN NETGROUP v3 auth sha AUTH123 priv aes 128 PRIV456", description: "ตั้ง SNMPv3 user" },
    { command: "logging host 192.168.1.20 transport udp port 514", description: "ส่ง Syslog ไป server" },
    { command: "logging trap warnings", description: "ส่ง log level 4 (warnings) ขึ้นไป" },
    { command: "ip flow-export destination 192.168.1.30 2055", description: "Export NetFlow ไป collector" },
    { command: "ip flow-export version 9", description: "ใช้ NetFlow v9" },
    { command: "ip flow ingress", description: "Enable NetFlow บน interface" },
    { command: "show snmp", description: "สถานะ SNMP + packet counters" },
    { command: "show ip cache flow", description: "NetFlow cache — flows ปัจจุบัน" },
  ],
  labs: [
    {
      title: "SNMP + Syslog + NetFlow Lab",
      level: "Beginner",
      estimatedMinutes: 40,
      steps: [
        "Configure SNMPv3 บน R1: snmp-server group NETGROUP v3 priv + snmp-server user ADMIN",
        "ทดสอบ: snmpwalk -v3 -u ADMIN -a SHA -A AUTH123 -x AES -X PRIV456 192.168.1.1 sysDescr",
        "Configure Syslog: logging host 192.168.1.20 | logging trap informational",
        "สร้าง interface flap เพื่อดู syslog: shutdown/no shutdown บน interface",
        "Configure NetFlow บน G0/0: ip flow ingress + ip flow-export destination 192.168.1.30 2055",
        "ดู flows: show ip cache flow | ตรวจสอบ top talkers",
      ],
      verification: [
        "show snmp — แสดง SNMP statistics",
        "show logging — syslog messages บันทึกอยู่",
        "show ip cache flow — NetFlow cache มี flows",
      ],
    },
  ],
  quiz: [
    makeQ("SNMPv3 ใช้อะไรแทน Community String?",
      ["OID", "USM (User-based Security Model)", "MIB", "Community v3"], "USM (User-based Security Model)",
      "SNMPv3 ใช้ USM ที่มี username, authentication (SHA/MD5), และ privacy (AES/3DES) — ปลอดภัยกว่า plaintext community string"),
    makeQ("Syslog level ใดควรส่งไป production logging server?",
      ["0-7 ทั้งหมด", "0-5 (Emergency ถึง Notifications)", "6-7 เท่านั้น", "4 เท่านั้น"], "0-5 (Emergency ถึง Notifications)",
      "Level 6-7 สร้าง log จำนวนมาก — ใช้เฉพาะ troubleshooting; production ควรส่งแค่ 0-5"),
    makeQ("NetFlow export ไป collector ใช้ port อะไรโดย default?",
      ["UDP 514", "UDP 2055", "TCP 443", "UDP 161"], "UDP 2055",
      "NetFlow ใช้ UDP 2055 เป็น default export port"),
    makeQ("IPFIX แตกต่างจาก NetFlow v9 อย่างไร?",
      ["IPFIX เร็วกว่า", "IPFIX เป็น IETF open standard based on NetFlow v9", "IPFIX ใช้ TCP", "ไม่มีความแตกต่าง"], "IPFIX เป็น IETF open standard based on NetFlow v9",
      "IPFIX (RFC 7011) คือ standardization ของ NetFlow v9 โดย IETF — vendor-neutral"),
  ],
  interviewQuestions: [
    makeI("Junior", "อธิบาย SNMP Trap vs Poll (GET)", "Poll: NMS ส่ง GET ถาม agent ทุก X วินาที — detect ปัญหาช้า; Trap: Agent ส่ง notification ทันทีเมื่อ event เกิด — real-time แต่ trap อาจหาย (UDP); Best: Trap+INFORM สำหรับ critical + Poll สำหรับ trending"),
    makeI("Mid", "ออกแบบ monitoring สำหรับ 200 routers", "Prometheus + SNMP Exporter + Grafana สำหรับ metrics; ELK Stack สำหรับ Syslog; ntopng สำหรับ NetFlow; Alert: Interface down (immediate), CPU>80% (5min), BGP down (immediate); Retention: 30d hot, 1y cold"),
    makeI("Senior", "เปรียบเทียบ passive vs active monitoring", "Active: ping/traceroute จาก probe, IP SLA — detect ปัญหาก่อน user; Passive: SNMP + Syslog + NetFlow — monitor จาก traffic จริง; Best: ใช้ทั้งคู่ — Active สำหรับ SLA, Passive สำหรับ capacity planning + security anomaly"),
  ],
  troubleshooting: [
    { symptom: "SNMP poll timeout / no response", possibleCause: "ACL block หรือ community string ผิด", check: "snmpwalk จาก NMS ทดสอบ manual, ตรวจ UDP 161 ผ่าน firewall", fix: "แก้ ACL (permit NMS IP), แก้ community string, เปิด UDP 161 บน firewall" },
    { symptom: "Syslog messages ไม่ถึง server", possibleCause: "logging host ไม่ตรงหรือ firewall block UDP 514", check: "ping syslog server จาก device, show logging", fix: "แก้ logging host IP, เปิด UDP 514, ตรวจ logging trap level" },
    { symptom: "NetFlow ไม่มี data ใน collector", possibleCause: "ip flow ingress ไม่ได้ enable บน interface", check: "show ip flow export statistics, show ip interface", fix: "ใส่ ip flow ingress บน interface, ตรวจ flow-export destination IP/port" },
  ],
  tags: ["SNMP", "Syslog", "NetFlow", "IPFIX", "monitoring", "Prometheus", "Grafana", "MIB", "OID"],
  order: 16,
};

const troubleshootingBasic: Lesson = {
  id: "found-017",
  slug: "troubleshooting-methodology",
  title: "Network Troubleshooting Methodology",
  titleTh: "Troubleshooting Method ที่ถูกต้อง",
  track: "foundation",
  category: "troubleshooting",
  level: "Beginner",
  duration: "45 min",
  xp: 80,
  description: "OSI-based troubleshooting approach, เครื่องมือ, และ show commands สำหรับแก้ปัญหา network จริง",
  objectives: [
    "ใช้ OSI model เป็น framework troubleshoot อย่างเป็นระบบ",
    "รู้จัก top-down, bottom-up, divide-and-conquer approaches",
    "Master คำสั่ง ping, traceroute, show, debug บน Cisco IOS",
    "Troubleshoot Layer 1-3 ได้อย่างรวดเร็ว",
    "อ่าน show outputs และ log messages เพื่อหา root cause",
  ],
  prerequisites: ["network-fundamentals", "osi-model"],
  concepts: [
    "Bottom-Up: L1 (cable/link) → L2 (MAC/VLAN) → L3 (route/ARP) → L4 (port) → L7",
    "Top-Down: L7 (app error) → L4 → L3 → L2 → L1 — ใช้เมื่อ user report ปัญหา app",
    "Divide & Conquer: เริ่ม L3 ping → แยกขึ้น/ลงตามผล",
    "One change at a time — ห้ามเปลี่ยนหลายอย่างพร้อมกัน",
    "show interface: CRC=bad cable, Runts=duplex mismatch, Drops=congestion",
    "ping with source/size/df-bit — test specific path + MTU",
    "debug ip icmp / undebug all — ใช้ระวัง production",
    "show tech-support — รวม output ส่ง TAC",
  ],
  commands: [
    { command: "ping <ip> repeat 100 size 1472 df-bit", description: "Test MTU path (1472+28=1500 byte)" },
    { command: "traceroute <ip> source <interface> probe 5", description: "Traceroute จาก source specific" },
    { command: "show interface GigabitEthernet0/0", description: "Layer 1-2 errors, speed, duplex, counters" },
    { command: "show ip route <prefix>", description: "ตรวจ routing table สำหรับ prefix" },
    { command: "show arp | include 192.168.1", description: "ตรวจ ARP entries สำหรับ subnet" },
    { command: "debug ip icmp", description: "Debug ICMP (ปิดหลังใช้เสมอ)" },
    { command: "undebug all", description: "ปิด debug ทั้งหมด — ทำทันทีหลัง debug เสร็จ" },
    { command: "show logging | last 50", description: "ดู syslog 50 lines ล่าสุด" },
  ],
  labs: [
    {
      title: "Systematic Troubleshooting Drill",
      level: "Beginner",
      estimatedMinutes: 35,
      steps: [
        "Scenario: PC A (192.168.1.10) ping PC B (192.168.2.10) ไม่ได้",
        "L1: show interface ทุก hop — ตรวจ link up/down และ error counters",
        "L2: show mac-address-table — ตรวจ MAC อยู่ถูก VLAN",
        "L2: show spanning-tree vlan 1 — ตรวจ port ไม่ blocking",
        "L3: show ip route 192.168.2.0 — route มีไหม",
        "L3: ping 192.168.1.1 (gateway) จาก PC A — ตรวจ L3 local",
        "L3: ping 192.168.2.10 source 192.168.1.1 — ตรวจ inter-VLAN routing",
        "บันทึก: root cause คืออะไร, แก้ยังไง",
      ],
      verification: [
        "PC A ping PC B 100% success",
        "บันทึก root cause อย่างชัดเจน — ระบุ layer ที่มีปัญหา",
      ],
    },
  ],
  quiz: [
    makeQ("ถ้า show interface แสดง 'input errors' สูงมาก สาเหตุน่าจะเป็นอะไร?",
      ["Software bug", "Duplex mismatch หรือ bad cable/SFP", "OSPF misconfiguration", "BGP route loop"], "Duplex mismatch หรือ bad cable/SFP",
      "CRC errors และ input errors สูงมักเกิดจาก duplex mismatch, bad cable, หรือ SFP เสีย — ตรวจ L1 ก่อน"),
    makeQ("divide-and-conquer troubleshooting เริ่มที่ Layer ใด?",
      ["Layer 1", "Layer 7", "Layer 3 (middle)", "Layer 4"], "Layer 3 (middle)",
      "Divide & Conquer เริ่ม L3 — ถ้า ping ได้ = L1-3 OK ขึ้นไปตรวจ L4-7; ถ้า ping ไม่ได้ = ลงตรวจ L1-2"),
    makeQ("ควรทำอะไรทันทีหลัง debug commands เสร็จสิ้น?",
      ["reload router", "undebug all", "show logging", "write memory"], "undebug all",
      "debug สร้าง output มาก — ถ้าลืมปิดจะกิน CPU สูงมาก; ใช้ undebug all ทันที"),
    makeQ("'Runts' ใน show interface หมายถึงอะไร?",
      ["Packet ที่ใหญ่กว่า MTU", "Packet ที่เล็กกว่า 64 bytes", "Packet ที่ duplicate", "Packet ที่ fragment"], "Packet ที่เล็กกว่า 64 bytes",
      "Runts = frame < 64 bytes — มักเกิดจาก duplex mismatch หรือ collision; Giants = frame > MTU"),
  ],
  interviewQuestions: [
    makeI("Junior", "ถ้า user บอก Internet ใช้ไม่ได้ จะ troubleshoot ยังไง", "Top-Down: 1) DNS — ping 8.8.8.8 vs ping google.com (IP ได้แต่ domain ไม่ได้ = DNS issue); 2) Gateway — ping gateway; 3) ISP — traceroute 8.8.8.8; 4) Local IP — ipconfig; 5) Physical — cable/Wi-Fi connected?"),
    makeI("Mid", "อธิบาย MTU troubleshooting", "MTU mismatch ทำให้ large packet drop โดยไม่มี error ชัด; Test: ping <ip> size 1472 df-bit (1472+28=1500); ถ้า fail ลอง 1400, 1300; Common: VPN overhead ~50-80 bytes; Fix: ip tcp adjust-mss 1452 บน WAN interface"),
    makeI("Senior", "Network ขาดกะทันหัน ทั้ง site — approach", "P1 Process: 1) War room 2) Preserve evidence (show tech-support, export logs) 3) Check change log ก่อน 4) Divide: WAN up? → ISP? → routing? 5) Parallel tracks 6) Communicate ทุก 15 นาที 7) Rollback ถ้า change เพิ่งเกิด 8) RCA หลัง restore"),
  ],
  troubleshooting: [
    { symptom: "Ping timeout ทั้งที่ route มีและ interface up", possibleCause: "ACL block หรือ NAT issue", check: "show ip access-lists, show ip nat translations, show arp", fix: "แก้ ACL permit ICMP, ตรวจ NAT translation ถูกต้อง, ping จาก device กลาง" },
    { symptom: "Traceroute แสดง * ที่ specific hop", possibleCause: "ICMP TTL exceeded ถูก rate-limit หรือ block — ไม่ใช่ packet loss จริง", check: "ทดสอบ TCP traceroute port 80 แทน", fix: "ใช้ traceroute port 80/443 หรือ test ว่า destination ยังตอบสนองได้" },
    { symptom: "Intermittent connectivity", possibleCause: "STP topology change หรือ routing loop หรือ duplex errors", check: "show spanning-tree detail | inc topology change, traceroute ดู TTL, show interface errors", fix: "ตรวจ STP config, ปิด debug ทั้งหมด, ใช้ IP SLA track uptime ต่อเนื่อง" },
  ],
  tags: ["troubleshooting", "ping", "traceroute", "debug", "OSI", "methodology", "show commands", "MTU"],
  order: 17,
};

const documentationBasic: Lesson = {
  id: "found-018",
  slug: "network-documentation",
  title: "Network Documentation & IPAM",
  titleTh: "Network Documentation และ IPAM",
  track: "foundation",
  category: "documentation",
  level: "Beginner",
  duration: "40 min",
  xp: 70,
  description: "Network diagrams, IP Address Management, change management, config backup — สิ่งที่ Network Engineer มักข้ามแต่สำคัญมาก",
  objectives: [
    "สร้าง Network diagram ระดับ L1/L2/L3 ที่มีประโยชน์จริง",
    "ออกแบบ IP Address Management (IPAM) สำหรับ enterprise",
    "ใช้ tools: draw.io, NetBox, Git สำหรับ config backup",
    "เข้าใจ change management process: RFC, maintenance window, rollback plan",
    "Backup config อัตโนมัติด้วย SCP/Ansible",
  ],
  prerequisites: ["network-fundamentals"],
  concepts: [
    "L1 Physical Diagram: rack layout, cable colors, physical ports",
    "L2 Logical Diagram: VLAN, trunk, STP root, switch port mapping",
    "L3 Network Diagram: IP subnets, routing protocol areas, WAN circuits",
    "IPAM: hierarchical allocation 10.x.0.0/16 per-site, /24 per-VLAN",
    "NetBox: open-source DCIM+IPAM — sites, prefixes, devices, VLANs",
    "IOS Archive: track config changes with who/when/what",
    "Change Management: RFC → Peer Review → Approval → MW → Verify → Rollback → Document",
    "Config drift: compare running config vs Git golden config daily",
  ],
  commands: [
    { command: "copy running-config scp://admin@192.168.1.10/backup/R1.cfg", description: "Backup config ผ่าน SCP (encrypted)" },
    { command: "archive log config", description: "เปิด IOS Config Archive — track config changes" },
    { command: "show archive log config all", description: "ดู config change history" },
    { command: "show version | include uptime", description: "ดู uptime และ last reload reason" },
    { command: "show cdp neighbors detail", description: "ดู physical topology จาก CDP" },
    { command: "show lldp neighbors detail", description: "LLDP topology (multi-vendor)" },
  ],
  labs: [
    {
      title: "Documentation Sprint Lab",
      level: "Beginner",
      estimatedMinutes: 30,
      steps: [
        "ใช้ show cdp neighbors detail บนทุก device — map L1/L2 topology",
        "ใช้ show interface + show ip interface brief — สร้าง IP inventory",
        "สร้าง L3 diagram ใน draw.io: routers, subnets, WAN links",
        "Config IOS Archive: archive → log config → notify syslog → hidekeys",
        "Backup config: copy running-config scp://backup-server/configs/",
        "สร้าง IP plan ใน spreadsheet: VLAN, Subnet, Gateway, Purpose, Owner",
      ],
      verification: [
        "มี L3 diagram ครบทุก device",
        "IP spreadsheet แสดง VLAN/Subnet ทั้งหมด",
        "show archive log config all แสดง change history",
      ],
    },
  ],
  quiz: [
    makeQ("L2 Network Diagram ควรมีข้อมูลอะไร?",
      ["IP addresses และ routing", "VLAN topology, trunk links, STP root, port numbers", "Physical cable types", "BGP AS numbers"], "VLAN topology, trunk links, STP root, port numbers",
      "L2 diagram แสดง logical switching: VLANs, trunk, STP topology — ต่างจาก L1 (physical) และ L3 (routing/IP)"),
    makeQ("IPAM ย่อมาจากอะไร?",
      ["IP Address Management", "Internet Protocol Automation Module", "IP Assignment Monitor", "Integrated Protocol Address Mapping"], "IP Address Management",
      "IPAM = IP Address Management — ระบบจัดการ IP addresses, subnets, DNS, DHCP ทั้งองค์กร"),
    makeQ("Change Management RFC ต้องมีอะไรที่สำคัญที่สุด?",
      ["ชื่อผู้ทำ change", "Rollback plan", "Cost estimate", "Vendor approval"], "Rollback plan",
      "Rollback plan สำคัญที่สุด — ถ้า change ทำให้ system พัง ต้องกู้คืนได้ภายใน maintenance window"),
    makeQ("IOS Archive log config ใช้ทำอะไร?",
      ["Backup config ไป TFTP", "Track configuration changes พร้อม diff", "Monitor interface counters", "Export NetFlow data"], "Track configuration changes พร้อม diff",
      "archive log config บันทึกทุก config change พร้อม who/when/what — ช่วย audit และ troubleshoot หลัง change"),
  ],
  interviewQuestions: [
    makeI("Junior", "ทำไม network documentation ถึงสำคัญ", "Documentation ช่วย: troubleshoot เร็วขึ้น, onboard engineer ใหม่ได้เร็ว, compliance (ISO 27001, PCI-DSS), capacity planning, disaster recovery; ปัญหาคือ docs ไม่ update หลัง change — ต้องทำเป็นส่วนหนึ่งของ change process"),
    makeI("Mid", "ออกแบบ IPAM สำหรับ 50 branches", "Hierarchical: 10.0.0.0/8 รวม; 10.branch.0.0/16 per branch; /24 Management, /24 Server, /23 Users, /24 Guest, /30 WAN; ใช้ NetBox: sites, prefixes, VLANs, devices; Ansible generate IP จาก NetBox API"),
    makeI("Senior", "Config drift — detect และ prevent อย่างไร", "Detect: Ansible check mode เปรียบ running vs Git golden config ทุกวัน; Oxidized pull config + alert เมื่อ change; Prevent: ห้าม direct SSH — ทำผ่าน Ansible/AWX; IOS Archive + Syslog alert เมื่อ config เปลี่ยน; NetDevOps: Git flow สำหรับ network config"),
  ],
  troubleshooting: [
    { symptom: "Config backup ล้มเหลว — SCP timeout", possibleCause: "SCP server ไม่ running หรือ ACL block", check: "ping backup server, ตรวจ SSH reachability, ตรวจ disk space", fix: "เปิด SSH/SCP service, แก้ ACL permit device IP, เพิ่ม disk space" },
    { symptom: "IP conflict — 2 devices ใช้ IP เดียวกัน", possibleCause: "IPAM ไม่ได้ update หรือ static IP ซ้ำกับ DHCP pool", check: "show arp บน gateway ดู MAC ที่ชน, ตรวจ IPAM database", fix: "fix IPAM ก่อน, reconfigure device ที่ผิด, ตั้ง DHCP exclusion สำหรับ static IPs" },
  ],
  tags: ["documentation", "IPAM", "NetBox", "draw.io", "backup", "change management", "CDP", "LLDP"],
  order: 18,
};

// ─── Foundation Categories ────────────────────────────────────────
export const foundationCategories: FoundationCategory[] = [
  {
    id: "fundamentals",
    title: "Network Fundamentals",
    titleTh: "พื้นฐาน Network",
    icon: "🌐",
    description: "OSI Model, TCP/IP, Protocol พื้นฐานที่ต้องรู้",
    lessons: [networkFundamentals, osiModel, tcpipModel, dhcpDnsLesson],
    order: 1,
  },
  {
    id: "addressing",
    title: "IP Addressing & Subnetting",
    titleTh: "IP Address และ Subnetting",
    icon: "🔢",
    description: "IPv4, IPv6, CIDR, VLSM, IP Planning",
    lessons: [ipv4, ipv6Lesson],
    order: 2,
  },
  {
    id: "switching",
    title: "Switching",
    titleTh: "Switching",
    icon: "🔀",
    description: "VLAN, Trunk, STP, EtherChannel, Port Security",
    lessons: [vlanLesson, spanningTree],
    order: 3,
  },
  {
    id: "routing",
    title: "Routing",
    titleTh: "Routing",
    icon: "🗺️",
    description: "Static Route, OSPF, EIGRP, BGP Basic, Route Policy",
    lessons: [ospfLesson, bgpLesson, eigrpLesson, qosLesson, wanLesson],
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
    lessons: [wirelessBasic],
    order: 6,
  },
  {
    id: "monitoring",
    title: "Monitoring Basic",
    titleTh: "Monitoring พื้นฐาน",
    icon: "📊",
    description: "SNMP, Syslog, NetFlow, Monitoring Tools",
    lessons: [monitoringBasic],
    order: 7,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    titleTh: "Troubleshooting",
    icon: "🔧",
    description: "Methodology, Tools, Common Issues",
    lessons: [troubleshootingBasic],
    order: 8,
  },
  {
    id: "documentation",
    title: "Documentation & IPAM",
    titleTh: "Documentation และ IPAM",
    icon: "📄",
    description: "Network Diagram, IPAM, Change Management",
    lessons: [documentationBasic],
    order: 9,
  },
];

export const allFoundationLessons: Lesson[] = foundationCategories.flatMap(c => c.lessons);
