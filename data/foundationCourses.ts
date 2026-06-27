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
  sections: [
    {
      title: "เครือข่ายคอมพิวเตอร์คืออะไร?",
      body: "เครือข่ายคอมพิวเตอร์ (Computer Network) คือการเชื่อมต่ออุปกรณ์ตั้งแต่ 2 ชิ้นขึ้นไปเพื่อแชร์ข้อมูลและทรัพยากรร่วมกัน\n\nก่อนมีเครือข่าย: ต้องใช้ Floppy Disk หรือ USB drive พกข้อมูล\nหลังมีเครือข่าย: ส่งไฟล์, แชร์ Printer, ดู Netflix, Video Call ได้ทุกอุปกรณ์",
      table: {
        header: ["ประเภทเครือข่าย", "ย่อมาจาก", "ระยะ", "ตัวอย่าง"],
        rows: [
          ["LAN", "Local Area Network", "อาคาร / ออฟฟิศ", "เครือข่ายบริษัท, บ้าน"],
          ["WAN", "Wide Area Network", "ข้ามเมือง / ประเทศ", "Internet, MPLS"],
          ["MAN", "Metropolitan Area Network", "ระดับเมือง", "เครือข่ายมหาวิทยาลัย"],
          ["PAN", "Personal Area Network", "< 10 เมตร", "Bluetooth, USB"],
        ],
      },
      tip: "LAN = ภายในอาคาร, WAN = ระหว่างเมือง/ประเทศ — Internet คือ WAN ที่ใหญ่ที่สุดในโลก",
    },
    {
      title: "อุปกรณ์เครือข่ายและหน้าที่",
      body: "แต่ละอุปกรณ์ทำงานต่าง Layer ใน OSI Model:",
      table: {
        header: ["อุปกรณ์", "OSI Layer", "หน้าที่"],
        rows: [
          ["Hub", "Layer 1", "ส่ง broadcast ทุก port — เลิกใช้แล้ว"],
          ["Switch", "Layer 2", "ส่ง frame ตาม MAC Address — เชื่อม LAN"],
          ["Router", "Layer 3", "เลือก path ตาม IP Address — เชื่อมระหว่าง network"],
          ["Firewall", "Layer 3-7", "กรอง traffic ตาม policy"],
          ["Access Point", "Layer 2", "แปลง wired เป็น wireless"],
          ["Load Balancer", "Layer 4-7", "กระจาย traffic ไปหลาย server"],
        ],
      },
    },
    {
      title: "Protocol และ Bandwidth vs Latency",
      body: "Protocol คือ 'ภาษากลาง' ที่อุปกรณ์ใช้คุยกัน — ถ้า Protocol ไม่ตรงกัน ก็คุยกันไม่รู้เรื่อง\n\nBandwidth = ความจุของช่องทาง (เหมือนขนาดท่อน้ำ) — วัดด่วย Mbps, Gbps\nLatency = ความล่าช้า (เหมือนระยะทางที่น้ำต้องเดินทาง) — วัดด้วย ms\n\nอินเทอร์เน็ตบ้านไทยทั่วไป 100Mbps download แต่ latency ไปยุโรปอาจ 200ms",
      code: `# ทดสอบ Bandwidth และ Latency
ping 8.8.8.8 -c 10           # วัด latency (ms) ไป Google DNS
ping 8.8.8.8 -c 100 | tail   # average/min/max

# ทดสอบ bandwidth ด้วย iperf3
iperf3 -s                    # server mode (รอรับ)
iperf3 -c SERVER_IP -t 30    # client: test 30 วินาที

# ดู bandwidth usage real-time
nload eth0
iftop -i eth0`,
      language: "bash",
      tip: "Video call ต้องการ Latency ต่ำ (<100ms) มากกว่า Bandwidth สูง — 5Mbps + 50ms ดีกว่า 100Mbps + 300ms",
    },
    {
      title: "Unicast, Multicast, Broadcast คืออะไร?",
      body: "การส่งข้อมูลในเครือข่ายแบ่งตามจำนวนผู้รับ:",
      table: {
        header: ["ประเภท", "ผู้รับ", "ตัวอย่าง", "Address"],
        rows: [
          ["Unicast", "1 คน", "เปิดเว็บ, SSH", "IP เดียว เช่น 192.168.1.10"],
          ["Broadcast", "ทุกคนใน subnet", "ARP Request, DHCP Discover", "255.255.255.255 หรือ x.x.x.255"],
          ["Multicast", "กลุ่มที่สมัครไว้", "Video streaming, OSPF Hello", "224.0.0.0 – 239.255.255.255"],
          ["Anycast", "ใกล้ที่สุด 1 คน", "DNS root servers, CDN", "ที่อยู่เดียวกันหลาย server"],
        ],
      },
      warning: "Broadcast มากเกินไปทำให้ network ช้า! นั่นคือเหตุผลที่ใช้ VLAN แบ่ง Broadcast Domain",
    },
  ],
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
  sections: [
    {
      title: "IPv4 Address คืออะไร?",
      body: "IPv4 Address คือ 'ที่อยู่บ้าน' ของอุปกรณ์ในเครือข่าย — อุปกรณ์ทุกตัวต้องมี IP ที่ไม่ซ้ำกันในเครือข่ายเดียวกัน\n\nIPv4 = 32 bits แบ่งเป็น 4 ส่วน (Octet) คั่นด้วยจุด เช่น 192.168.1.100\nแต่ละ Octet = 8 bits = ค่าได้ 0-255",
      table: {
        header: ["Class", "Range (1st octet)", "Default Mask", "ใช้กับ"],
        rows: [
          ["A", "1-126", "/8 (255.0.0.0)", "ใหญ่มาก: ISP, รัฐบาล"],
          ["B", "128-191", "/16 (255.255.0.0)", "กลาง: มหาวิทยาลัย, บริษัทใหญ่"],
          ["C", "192-223", "/24 (255.255.255.0)", "เล็ก: บ้าน, SME"],
          ["D", "224-239", "N/A", "Multicast"],
          ["E", "240-255", "N/A", "Reserved/Research"],
        ],
      },
      tip: "127.x.x.x = Loopback (localhost) — ping 127.0.0.1 ทดสอบว่า network stack ทำงานปกติ",
    },
    {
      title: "Private vs Public IP — ต่างกันยังไง?",
      body: "Private IP คือ IP สำหรับใช้ภายในองค์กร/บ้าน ไม่ route บน Internet\nPublic IP คือ IP จริงบน Internet — ต้องขอจาก ISP",
      table: {
        header: ["Range", "Class", "จำนวน host"],
        rows: [
          ["10.0.0.0 – 10.255.255.255", "A", "16 ล้าน+"],
          ["172.16.0.0 – 172.31.255.255", "B", "1 ล้าน+"],
          ["192.168.0.0 – 192.168.255.255", "C", "65,534"],
          ["169.254.x.x", "APIPA", "เมื่อ DHCP ไม่ตอบ"],
        ],
      },
      warning: "ใช้ 10.x.x.x สำหรับองค์กรใหญ่, 172.16-31.x.x สำหรับ DC, 192.168.x.x สำหรับสำนักงานเล็ก/บ้าน",
    },
    {
      title: "Subnetting และ CIDR — แบ่ง network อย่างไร",
      body: "Subnet Mask บอกว่า bits ไหนเป็น Network ส่วน bits ไหนเป็น Host\n\nCIDR Notation: 192.168.1.0/24 หมายถึง 24 bits แรกเป็น network → 8 bits สุดท้ายเป็น host → 2^8 - 2 = 254 hosts\n\nการคำนวณ Subnet:\n- Network Address = IP & Mask\n- Broadcast = Network + ขนาด subnet - 1\n- Usable hosts = 2^(host bits) - 2",
      table: {
        header: ["CIDR", "Subnet Mask", "จำนวน Host", "ใช้กับ"],
        rows: [
          ["/30", "255.255.255.252", "2 hosts", "WAN point-to-point link"],
          ["/29", "255.255.255.248", "6 hosts", "Management subnet เล็ก"],
          ["/28", "255.255.255.240", "14 hosts", "VLAN เล็ก"],
          ["/27", "255.255.255.224", "30 hosts", "VLAN กลาง"],
          ["/24", "255.255.255.0", "254 hosts", "VLAN ทั่วไป"],
          ["/22", "255.255.252.0", "1022 hosts", "VLAN ใหญ่"],
          ["/16", "255.255.0.0", "65534 hosts", "Site ขนาดใหญ่"],
        ],
      },
      code: `# คำนวณ subnet ด้วย ipcalc
ipcalc 192.168.10.0/26

# ผลที่ได้:
# Address:   192.168.10.0
# Netmask:   255.255.255.192 = 26
# Network:   192.168.10.0/26
# HostMin:   192.168.10.1
# HostMax:   192.168.10.62
# Broadcast: 192.168.10.63
# Hosts/Net: 62

# Python คำนวณ subnet
python3 -c "import ipaddress; n=ipaddress.IPv4Network('10.0.0.0/22'); print(list(n.hosts())[:3])"`,
      language: "bash",
      tip: "จำสูตร: /24=254, /25=126, /26=62, /27=30, /28=14, /29=6, /30=2 — แต่ละ step ลดครึ่ง",
    },
  ],
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
  sections: [
    {
      title: "VLAN คืออะไร และทำไมต้องใช้?",
      body: "VLAN (Virtual LAN) คือการแบ่ง network เสมือนบน Switch ตัวเดียว ทำให้แต่ละกลุ่มแยก Broadcast Domain กัน\n\nก่อน VLAN: Switch 1 ตัว = 1 Broadcast Domain → ARP, DHCP, STP เต็ม network\nหลัง VLAN: แบ่งได้สูงสุด 4094 VLAN บน Switch เดียว → แต่ละ VLAN แยกกันสมบูรณ์",
      table: {
        header: ["ข้อดีของ VLAN", "อธิบาย"],
        rows: [
          ["Security", "แผนกต่างๆ คุยกันไม่ได้ถ้าไม่ผ่าน Router/Firewall"],
          ["Performance", "ลด Broadcast Storm — ARP ไม่ท่วม network ทั้งหมด"],
          ["Flexibility", "ย้าย user ระหว่างแผนกโดยเปลี่ยน VLAN บน Switch port"],
          ["Cost", "ไม่ต้องซื้อ Switch แยกต่างหากสำหรับแต่ละแผนก"],
        ],
      },
      tip: "ตัวอย่าง: VLAN 10 = IT, VLAN 20 = HR, VLAN 30 = Finance → HR ไม่เห็น Traffic ของ IT",
    },
    {
      title: "Access Port vs Trunk Port",
      body: "Port บน Switch มี 2 ประเภทหลัก:\n\nAccess Port: รับเฉพาะ traffic จาก VLAN เดียว — ต่อกับ PC, Printer, IP Phone\nTrunk Port: รับ traffic จากหลาย VLAN พร้อมกัน — ต่อระหว่าง Switch หรือ Switch→Router",
      table: {
        header: ["", "Access Port", "Trunk Port"],
        rows: [
          ["ต่อกับ", "End device (PC, Phone)", "Switch, Router, AP"],
          ["VLAN", "1 VLAN เท่านั้น", "หลาย VLAN พร้อมกัน"],
          ["Tag", "ไม่มี VLAN tag (untagged)", "มี 802.1Q tag ทุก frame"],
          ["Native VLAN", "N/A", "Frame ไม่มี tag = Native VLAN (default 1)"],
        ],
      },
      code: `! Cisco — สร้าง VLAN และ configure port
vlan 10
 name IT_Department
vlan 20
 name HR_Department

! Access port สำหรับ PC
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

! Trunk port ไปยัง Switch อื่น
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
 switchport trunk native vlan 999

! ตรวจสอบ
show vlan brief
show interfaces trunk`,
      language: "cisco",
    },
    {
      title: "Inter-VLAN Routing — ให้ VLAN ต่างกันคุยกันได้",
      body: "VLAN แยก Broadcast Domain — ดังนั้น PC ใน VLAN 10 จะคุยกับ PC ใน VLAN 20 ไม่ได้\nต้องผ่าน Layer 3 (Router หรือ L3 Switch)\n\n2 วิธีทำ Inter-VLAN Routing:\n1. Router-on-a-Stick: Router 1 port ต่อ trunk → สร้าง sub-interface ต่อ VLAN\n2. Layer 3 Switch (SVIs): สร้าง SVI (interface VLAN X) บน L3 Switch",
      code: `! Router-on-a-Stick
interface GigabitEthernet0/0.10
 encapsulation dot1q 10
 ip address 10.10.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1q 20
 ip address 10.20.20.1 255.255.255.0

! Layer 3 Switch SVIs (ดีกว่า — ไม่ต้องใช้ Router)
interface Vlan10
 ip address 10.10.10.1 255.255.255.0
 no shutdown
interface Vlan20
 ip address 10.20.20.1 255.255.255.0
 no shutdown
ip routing    ! เปิด routing บน L3 Switch`,
      language: "cisco",
      warning: "อย่าลืม 'ip routing' บน L3 Switch ไม่งั้น SVIs จะ up แต่ route ไม่ได้",
    },
  ],
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
  sections: [
    {
      title: "OSPF คืออะไร — Link-State Routing",
      body: "OSPF (Open Shortest Path First) เป็น Link-State Routing Protocol ใช้ Dijkstra's SPF Algorithm หา shortest path\n\nต่างจาก Distance-Vector (RIP) ที่ส่งแค่ routing table:\nOSPF แชร์ topology ทั้งหมด (Link-State Advertisement) ทุก router เห็นแผนที่เดียวกัน → คำนวณ path เอง",
      table: {
        header: ["OSPF State", "ความหมาย"],
        rows: [
          ["Down", "ยังไม่ได้รับ Hello"],
          ["Init", "ได้รับ Hello แต่ Router ID ตัวเองยังไม่อยู่ใน Hello ของอีกฝั่ง"],
          ["2-Way", "เห็นกันแล้ว — DR/BDR election เริ่ม"],
          ["ExStart", "เจรจา Master/Slave + DBD sequence number"],
          ["Exchange", "แลก DBD (Database Description)"],
          ["Loading", "ส่ง LSR/LSU แลก LSA ที่ขาดไป"],
          ["Full", "LSDB ตรงกัน — Adjacency สมบูรณ์ ✅"],
        ],
      },
      tip: "จำ OSPF States: 'Down, Init, 2-Way, ExStart, Exchange, Loading, Full' หรือ 'Di I 2E EL F'",
    },
    {
      title: "OSPF Areas — ทำไมต้องแบ่ง Area?",
      body: "เมื่อ network ใหญ่ขึ้น LSDB ก็ใหญ่ขึ้น → SPF calculation ใช้ CPU มาก\nแก้ด้วยการแบ่ง Area ให้ LSA ไม่ท่วม network ทั้งหมด\n\nArea 0 (Backbone Area): ทุก Area ต้องต่อกับ Area 0\nArea อื่น: แบ่งย่อยเพื่อลด LSDB size\n\nRouter ประเภทต่างๆ:\n- Internal Router: อยู่ใน Area เดียว\n- ABR (Area Border Router): เชื่อมระหว่าง Area\n- ASBR (AS Boundary Router): เชื่อมกับ routing protocol อื่น",
      code: `! OSPF Basic Configuration (Cisco)
router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0

! Passive interface (ไม่ส่ง Hello ออก LAN)
passive-interface GigabitEthernet0/1

! ตรวจสอบ OSPF
show ip ospf neighbor        ! ดู adjacency state
show ip ospf database        ! ดู LSDB
show ip route ospf           ! ดู OSPF routes (O, O IA)
debug ip ospf events         ! debug hello/adj`,
      language: "cisco",
    },
    {
      title: "DR/BDR Election บน Multi-Access Network",
      body: "บน Ethernet (Multi-Access network) ถ้า 5 router ต่างทำ Full adjacency กันเอง = 10 adjacencies → flood LSA เยอะมาก\n\nแก้ด้วย DR (Designated Router) และ BDR (Backup DR):\n- Router อื่นทำ adjacency กับ DR/BDR เท่านั้น\n- DR flood LSA แทนทุกคน\n\nElection: priority สูงสุดชนะ (default 1), ถ้าเท่ากันใช้ Router ID สูงสุด",
      code: `! ตั้ง OSPF Priority (0 = ไม่เข้าชิง DR/BDR)
interface GigabitEthernet0/0
 ip ospf priority 100    ! ต้องการเป็น DR

! ดู DR/BDR
show ip ospf interface GigabitEthernet0/0

! OSPF Cost — ยิ่งต่ำยิ่งดี
! Cost = Reference BW / Interface BW = 100Mbps / BW
! GigE = 100M/1000M = 1 (ปรับ reference BW ถ้าใช้ 10G)
auto-cost reference-bandwidth 10000   ! 10Gbps reference`,
      language: "cisco",
      warning: "DR/BDR election เกิดครั้งเดียวตอน first neighbor up — ถ้าอยากเปลี่ยน DR ต้อง reset OSPF process ('clear ip ospf process')",
    },
  ],
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
  sections: [
    {
      title: "BGP คืออะไร — Internet Routing Protocol",
      body: "BGP (Border Gateway Protocol) คือ Routing Protocol ที่ใช้บน Internet — ทุก ISP, Cloud Provider, และ large enterprise ใช้ BGP\n\nBGP เป็น Path Vector Protocol — ไม่ได้เลือก path ตาม bandwidth หรือ latency แต่เลือกตาม Policy (AS Path, Local Preference, MED)\n\neBGP: เชื่อมระหว่าง AS ต่างๆ (ISP ↔ Customer)\niBGP: เชื่อมภายใน AS เดียวกัน (router หลายตัวในบริษัทเดียว)",
      table: {
        header: ["", "eBGP", "iBGP"],
        rows: [
          ["ใช้กับ", "ระหว่าง AS", "ภายใน AS เดียวกัน"],
          ["TTL", "1 (adjacent only)", "255"],
          ["AD", "20 (ต่ำกว่า = ดีกว่า)", "200"],
          ["Next-hop", "เปลี่ยนเป็น IP ตัวเอง", "ไม่เปลี่ยน (ต้องมี IGP)"],
          ["Full mesh", "ไม่จำเป็น", "ต้องมี (หรือใช้ RR)"],
        ],
      },
    },
    {
      title: "BGP Path Attributes และ Best Path Selection",
      body: "BGP ใช้ Attributes เลือก Best Path โดยดูตามลำดับ (Weight ดีกว่า → ดูตัวถัดไป):",
      table: {
        header: ["ลำดับ", "Attribute", "ค่าที่ดีกว่า", "Scope"],
        rows: [
          ["1", "Weight (Cisco only)", "สูงกว่า", "Local router เท่านั้น"],
          ["2", "Local Preference", "สูงกว่า", "ภายใน AS"],
          ["3", "Locally originated", "Prefer local", "-"],
          ["4", "AS Path length", "สั้นกว่า", "ทั้ง Internet"],
          ["5", "Origin (i > e > ?)", "i ดีกว่า", "ทั้ง Internet"],
          ["6", "MED", "ต่ำกว่า", "ระหว่าง AS"],
          ["7", "eBGP > iBGP", "eBGP ดีกว่า", "-"],
          ["8", "IGP metric to next-hop", "ต่ำกว่า", "-"],
        ],
      },
      tip: "จำลำดับ: 'We Love Oranges As Oranges Mean Pure Refreshment' (Weight, Local-pref, Originated, AS-path, Origin, MED, Prefer-eBGP, Router-id)",
    },
    {
      title: "BGP Configuration พื้นฐาน",
      body: "BGP ต้องกำหนด neighbor (peer) แบบ manual — ไม่มี auto-discovery แบบ OSPF",
      code: `! eBGP: เชื่อมกับ ISP (AS 65001)
router bgp 65000              ! AS ของเรา
 bgp router-id 1.1.1.1
 neighbor 203.0.113.1 remote-as 65001   ! ISP peer
 neighbor 203.0.113.1 description ISP-A
 
 ! Advertise network ของเรา
 network 198.51.100.0 mask 255.255.255.0

! iBGP: เชื่อม router ภายใน AS เดียวกัน
router bgp 65000
 neighbor 10.0.0.2 remote-as 65000      ! same AS = iBGP
 neighbor 10.0.0.2 update-source Loopback0

! ตรวจสอบ
show bgp summary              ! ดู neighbor state
show bgp ipv4 unicast         ! ดู BGP table
show ip route bgp             ! ดู BGP routes ใน routing table`,
      language: "cisco",
      warning: "BGP session ต้องการ TCP 179 — ตรวจ ACL/Firewall ว่าไม่ block port 179 ระหว่าง peer",
    },
  ],
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
  sections: [
    {
      title: "ACL (Access Control List) — กรอง Traffic",
      body: "ACL คือ rule-set ที่กำหนดว่า traffic ไหนผ่านได้หรือไม่ — ทำงานบน Router บน interface\n\nStandard ACL (1-99): กรองแค่ Source IP — วางใกล้ Destination\nExtended ACL (100-199): กรอง Source+Destination IP, Protocol, Port — วางใกล้ Source",
      table: {
        header: ["ACL Type", "Match on", "วางที่ไหน", "ตัวอย่าง"],
        rows: [
          ["Standard (1-99)", "Source IP only", "ใกล้ Destination", "Block host 192.168.1.5"],
          ["Extended (100-199)", "Src+Dst IP, Protocol, Port", "ใกล้ Source", "Allow HTTP to server only"],
          ["Named ACL", "ชื่อใดก็ได้ (standard/extended)", "ยืดหยุ่นกว่า", "WEB-TRAFFIC-IN"],
        ],
      },
      code: `! Standard ACL — block host จากเข้า network
access-list 10 deny   192.168.1.5
access-list 10 permit any

! Extended ACL — อนุญาตเฉพาะ HTTP/HTTPS ไปยัง web server
access-list 110 permit tcp any host 10.0.0.80 eq 80
access-list 110 permit tcp any host 10.0.0.80 eq 443
access-list 110 deny   ip  any any

! Named ACL (แก้ไขได้ง่ายกว่า — มี sequence number)
ip access-list extended BLOCK-TELNET
 deny   tcp any any eq 23
 permit ip  any any

! Apply บน interface
interface GigabitEthernet0/0
 ip access-group 110 in     ! inbound
 ip access-group 10  out    ! outbound

show ip access-lists    ! ดู hit count`,
      language: "cisco",
      warning: "ทุก ACL มี implicit 'deny any' ท้ายสุด — ถ้าลืม permit จะ block ทุกอย่าง!",
    },
    {
      title: "NAT (Network Address Translation) — 3 ประเภทหลัก",
      body: "NAT แปลง Private IP → Public IP เพื่อให้ออก Internet ได้\n\nปัญหาที่ NAT แก้: IPv4 มีแค่ 4.3 พันล้าน address แต่อุปกรณ์มีมากกว่า → ใช้ Private IP ภายในและแชร์ Public IP 1 ตัว",
      table: {
        header: ["ประเภท NAT", "อธิบาย", "ใช้กับ"],
        rows: [
          ["Static NAT", "1:1 map Private→Public ตายตัว", "Server ที่ต้องเข้าจาก Internet"],
          ["Dynamic NAT", "Pool of Public IPs, assign on demand", "องค์กรมี Public IP หลายตัว"],
          ["PAT / NAT Overload", "Many:1 — แชร์ Public IP 1 ตัว ใช้ Port แยก", "บ้าน, ออฟฟิศส่วนใหญ่"],
        ],
      },
      code: `! PAT (NAT Overload) — ที่ใช้กันบ้าน/ออฟฟิศ
interface GigabitEthernet0/0
 ip address 203.0.113.1 255.255.255.0
 ip nat outside

interface GigabitEthernet0/1
 ip address 192.168.1.1 255.255.255.0
 ip nat inside

! ACL กำหนด traffic ที่จะ NAT
access-list 1 permit 192.168.1.0 0.0.0.255

! NAT Overload ใช้ IP ของ interface ขาออก
ip nat inside source list 1 interface GigabitEthernet0/0 overload

! Static NAT: Server ภายใน 192.168.1.100 → Public 203.0.113.50
ip nat inside source static 192.168.1.100 203.0.113.50

show ip nat translations    ! ดู NAT table
show ip nat statistics      ! hits/misses`,
      language: "cisco",
    },
    {
      title: "Firewall Zones — Stateful vs Stateless",
      body: "Stateless Firewall: กรองทุก packet แยกกัน ตาม ACL — เร็วแต่ไม่ track state\nStateful Firewall: track TCP/UDP sessions — return traffic ผ่านอัตโนมัติ ปลอดภัยกว่า\n\nZone-Based Firewall (Cisco): กำหนด zone (inside/outside/dmz) แล้ว policy ระหว่าง zone",
      table: {
        header: ["Zone", "Trust Level", "เก็บอะไร"],
        rows: [
          ["Inside", "High", "LAN ภายใน — PC, Server"],
          ["DMZ", "Medium", "Server ที่เปิดให้ Internet เข้าได้ เช่น Web, Mail"],
          ["Outside", "Low (zero)", "Internet — untrusted"],
        ],
      },
      tip: "DMZ (Demilitarized Zone) = buffer zone — ถ้า Web Server โดน hack, attacker ยังอยู่ใน DMZ และเข้า Inside ไม่ได้",
    },
  ],
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
  sections: [
    {
      title: "ทำไมต้องมี Spanning Tree?",
      body: "ในเครือข่าย Layer 2 ถ้า Switch เชื่อมกันเป็น loop จะเกิด Broadcast Storm:\n→ frame วนซ้ำไม่หยุด → bandwidth เต็ม 100% → network ล่มทั้งหมด\n\nSTP แก้ปัญหาโดย block port บางตัวทำให้ไม่มี loop แต่ยังมี redundancy\nเมื่อ link ที่ active ขาด STP จะ unblock port ที่ block ไว้ → failover อัตโนมัติ",
      table: {
        header: ["STP Version", "IEEE Standard", "Convergence", "ใช้กับ"],
        rows: [
          ["STP", "802.1D", "30-50 วินาที", "Legacy — เลิกใช้แล้ว"],
          ["RSTP", "802.1w", "1-2 วินาที", "Standard ปัจจุบัน"],
          ["MSTP", "802.1s", "1-2 วินาที", "หลาย VLAN — map หลาย VLAN ต่อ instance"],
          ["PVST+", "Cisco proprietary", "1-2 วินาที", "1 STP instance ต่อ VLAN — Cisco default"],
          ["Rapid PVST+", "Cisco proprietary", "<1 วินาที", "RSTP + per-VLAN — แนะนำสำหรับ Cisco"],
        ],
      },
    },
    {
      title: "Root Bridge Election และ Port Roles",
      body: "Root Bridge = Switch ที่เป็น 'ศูนย์กลาง' ของ STP topology\n\nElection: Bridge ID ต่ำสุดชนะ = Priority (default 32768) + MAC Address\n→ ปรับ Priority ต่ำลง เพื่อบังคับให้ Switch ตัวที่ต้องการเป็น Root Bridge",
      table: {
        header: ["Port Role", "สถานะ", "อธิบาย"],
        rows: [
          ["Root Port (RP)", "Forwarding", "Port บน non-root switch ที่ใกล้ Root Bridge ที่สุด"],
          ["Designated Port (DP)", "Forwarding", "Port ที่ดีที่สุดสำหรับ segment นั้น (รวม Root Bridge ทุก port)"],
          ["Alternate Port", "Blocking", "Backup ของ Root Port — RSTP"],
          ["Backup Port", "Blocking", "Backup ของ Designated Port — RSTP"],
          ["Disabled", "Disabled", "Admin shutdown"],
        ],
      },
      code: `! กำหนด Root Bridge (ลด Priority)
spanning-tree vlan 10 priority 4096    ! Root Bridge สำหรับ VLAN 10
spanning-tree vlan 20 priority 8192    ! Secondary Root

! หรือใช้คำสั่งง่ายๆ
spanning-tree vlan 10 root primary
spanning-tree vlan 20 root secondary

! PortFast — bypass STP states สำหรับ port ต่อ PC (ไม่ใช่ Switch!)
interface GigabitEthernet0/1
 spanning-tree portfast

! BPDU Guard — ถ้าได้รับ BPDU บน PortFast port → err-disable ทันที
spanning-tree portfast bpduguard default   ! enable global

! ตรวจสอบ
show spanning-tree vlan 10
show spanning-tree summary`,
      language: "cisco",
      warning: "อย่าเปิด PortFast บน port ที่ต่อกับ Switch — จะเกิด loop ได้! PortFast ใช้สำหรับ end device เท่านั้น",
    },
    {
      title: "EtherChannel — Link Aggregation",
      body: "EtherChannel รวมหลาย Physical link เป็น 1 Logical link:\n• เพิ่ม bandwidth: 4x 1G link = 4G logical\n• Redundancy: ถ้า 1 link ขาด ยังมีลิงค์อื่น\n• STP มองเห็นเป็น 1 link → ไม่ block\n\nMode: Static (on), LACP (IEEE 802.3ad — แนะนำ), PAgP (Cisco only)",
      code: `! EtherChannel ด้วย LACP
interface range GigabitEthernet0/1-4
 channel-group 1 mode active    ! LACP active
 
interface Port-channel 1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30

! ตรวจสอบ
show etherchannel summary       ! ดู state: SU = bundled
show etherchannel port-channel  ! ดูรายละเอียด`,
      language: "cisco",
      tip: "LACP mode: active+active หรือ active+passive = negotiate สำเร็จ; passive+passive = ไม่ negotiate",
    },
  ],
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
  sections: [
    {
      title: "EIGRP คืออะไร — Hybrid Routing Protocol",
      body: "EIGRP (Enhanced Interior Gateway Routing Protocol) เป็น Cisco proprietary protocol ที่ผสม Distance-Vector และ Link-State:\n\n• Partial updates: ส่ง update เฉพาะเมื่อ topology เปลี่ยน (ไม่ส่งทุก 30 วินาทีแบบ RIP)\n• Bounded updates: ส่งเฉพาะ router ที่ได้รับผลกระทบ\n• DUAL algorithm: guarantee loop-free path และ fast convergence\n• Multi-protocol: IPv4, IPv6, IPX, AppleTalk",
      table: {
        header: ["เปรียบเทียบ", "RIP", "OSPF", "EIGRP"],
        rows: [
          ["Type", "Distance-Vector", "Link-State", "Advanced DV / Hybrid"],
          ["Algorithm", "Bellman-Ford", "Dijkstra SPF", "DUAL"],
          ["Metric", "Hop count", "Cost (BW)", "Composite (BW+Delay+Load+Reliability)"],
          ["Convergence", "ช้า (30s update)", "เร็ว", "เร็วมาก (pre-computed backup)"],
          ["Update", "Periodic broadcast", "LSA flood", "Partial bounded"],
          ["AD", "120", "110", "90 (internal) / 170 (external)"],
        ],
      },
    },
    {
      title: "DUAL Algorithm — Successor และ Feasible Successor",
      body: "DUAL (Diffusing Update Algorithm) เลือก best path และ backup path ล่วงหน้าก่อน link จะขาด\n\nFeasible Distance (FD) = metric รวมจาก router ตัวนี้ไปถึง destination\nAdvertised Distance (AD) = metric ที่ neighbor บอกว่าใช้ไปถึง destination\n\nSuccessor: route ที่ดีที่สุด (FD ต่ำสุด) → ใส่ใน routing table\nFeasible Successor: backup route ที่ผ่าน Feasibility Condition: AD < FD ของ Successor\n→ ถ้า Successor ขาด, FS เข้ามาแทนทันที ไม่ต้อง recalculate",
      code: `! EIGRP Configuration (Classic mode)
router eigrp 100              ! AS 100
 network 192.168.1.0 0.0.0.255
 network 10.0.0.0 0.0.0.3
 no auto-summary              ! สำคัญ! ปิด auto-summary

! EIGRP Named Mode (IOS 15.0.1M+ แนะนำ)
router eigrp ENTERPRISE
 address-family ipv4 unicast autonomous-system 100
  network 10.0.0.0 0.255.255.255
  eigrp router-id 1.1.1.1

! ตรวจสอบ
show ip eigrp neighbors          ! ดู neighbor + hold time
show ip eigrp topology           ! ดู Successor, FS, FD, AD
show ip eigrp topology all-links ! ดู route ทั้งหมด
show ip route eigrp              ! ดู EIGRP routes (D, D EX)`,
      language: "cisco",
      tip: "Feasibility Condition: AD < FD (Successor) — ป้องกัน routing loop ใน DUAL",
    },
    {
      title: "EIGRP Metric — K-values",
      body: "EIGRP Metric คำนวณจาก K-values (default K1=1, K2=0, K3=1, K4=0, K5=0):\n\nMetric = [(K1×BW + K3×Delay)] × 256\n(เมื่อ K2=K4=K5=0 ซึ่งเป็น default)\n\nBW component = 10^7 / min(BW ตลอด path) × 256\nDelay component = sum(all delays) / 10 × 256\n\nค่า Delay บน interface: GigE = 10μs, FastEthernet = 100μs, Serial T1 = 20000μs",
      code: `! ดู metric รายละเอียด
show ip eigrp topology 10.0.1.0/24
! Composite metric = (Bandwidth + Delay) × 256

! ปรับ bandwidth บน interface (เพื่อ metric calculation)
interface Serial0/0
 bandwidth 1544               ! T1 = 1544 Kbps

! ปรับ delay
interface GigabitEthernet0/0
 delay 10                     ! 10 tens-of-microseconds = 100μs

! Summarization
interface GigabitEthernet0/0
 ip summary-address eigrp 100 10.0.0.0 255.255.0.0`,
      language: "cisco",
    },
  ],
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
  sections: [
    {
      title: "ทำไมต้องใช้ IPv6?",
      body: "IPv4 มีแค่ 2^32 ≈ 4.3 พันล้าน address — หมดแล้ว!\nIPv6 มี 2^128 ≈ 340 undecillion (3.4 × 10^38) — เพียงพอสำหรับอุปกรณ์ทุกชิ้นบนโลกและอวกาศ\n\nIPv6 = 128 bits, เขียนเป็น Hex 8 กลุ่ม คั่นด้วย ':' เช่น 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n\nย่อ IPv6 ได้:\n1. ตัดศูนย์นำหน้าในแต่ละกลุ่ม: 0db8 → db8\n2. กลุ่ม 0000 ที่ติดกัน ย่อเป็น :: ได้ครั้งเดียว: ::1 = loopback",
      table: {
        header: ["ประเภท IPv6", "Prefix", "เทียบกับ IPv4"],
        rows: [
          ["Global Unicast", "2000::/3", "Public IP — route บน Internet"],
          ["Link-Local", "FE80::/10", "APIPA (169.254.x.x) — ใช้บน link เดียว เท่านั้น"],
          ["Unique Local", "FC00::/7", "Private IP (10.x, 172.16-31.x, 192.168.x)"],
          ["Multicast", "FF00::/8", "224.0.0.0/4 — FF02::1 = all nodes"],
          ["Loopback", "::1/128", "127.0.0.1"],
          ["Unspecified", "::/128", "0.0.0.0"],
        ],
      },
      tip: "Link-Local (FE80::/10) สร้างอัตโนมัติทุก interface — ใช้สำหรับ NDP และ neighbor discovery ไม่ต้องกำหนดเอง",
    },
    {
      title: "SLAAC และ EUI-64 — IPv6 Auto-Configuration",
      body: "IPv6 ไม่จำเป็นต้องใช้ DHCP — มีกลไก SLAAC (Stateless Address Autoconfiguration)\n\nขั้นตอน SLAAC:\n1. PC สร้าง Link-Local address จาก MAC address (EUI-64)\n2. ส่ง Router Solicitation (RS) → FF02::2 (all routers)\n3. Router ตอบ Router Advertisement (RA) พร้อม prefix (เช่น 2001:db8::/64)\n4. PC รวม prefix + EUI-64 interface ID → ได้ Global Unicast address\n\nEUI-64: แปลง 48-bit MAC → 64-bit Interface ID โดยแทรก FF:FE กลาง และ flip bit ที่ 7",
      code: `# Linux: ดู IPv6 address
ip -6 addr show
ip -6 route show

# ทดสอบ IPv6 connectivity
ping6 ::1                        # loopback
ping6 fe80::1%eth0               # link-local (ต้องระบุ interface)
ping6 2001:db8::1                # global unicast

# Cisco: configure IPv6
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64  # static
 ipv6 address autoconfig         # SLAAC
 ipv6 enable                     # เปิดใช้ link-local เท่านั้น

ipv6 unicast-routing             # เปิด IPv6 routing บน Cisco router`,
      language: "bash",
    },
    {
      title: "NDP (Neighbor Discovery Protocol) — แทน ARP ใน IPv6",
      body: "IPv4 ใช้ ARP หา MAC จาก IP — IPv6 ใช้ NDP แทน (ไม่มี broadcast, ใช้ multicast)\n\nNDP Messages:\n• NS (Neighbor Solicitation): ถามว่า IP นี้ใครมี MAC อะไร\n• NA (Neighbor Advertisement): ตอบ MAC ของตัวเอง\n• RS (Router Solicitation): PC ขอ prefix จาก Router\n• RA (Router Advertisement): Router ตอบ prefix + default gateway\n• Redirect: บอก host ว่ามี better next-hop",
      table: {
        header: ["ICMPv6 Type", "Message", "แทน IPv4"],
        rows: [
          ["135", "Neighbor Solicitation (NS)", "ARP Request"],
          ["136", "Neighbor Advertisement (NA)", "ARP Reply"],
          ["133", "Router Solicitation (RS)", "DHCP Discover (ส่วนหนึ่ง)"],
          ["134", "Router Advertisement (RA)", "DHCP Offer (ส่วนหนึ่ง)"],
          ["137", "Redirect", "ICMP Redirect"],
        ],
      },
      warning: "ต้อง allow ICMPv6 ทุก type บน Firewall — บล็อก ICMPv6 จะทำให้ IPv6 ใช้ไม่ได้ (NDP พัง, SLAAC พัง)",
    },
  ],
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
  sections: [
    {
      title: "QoS คืออะไร — ทำไมต้องจัดคิว?",
      body: "QoS (Quality of Service) คือการจัดลำดับความสำคัญของ traffic เมื่อ bandwidth ไม่พอ\n\nไม่มี QoS: เมื่อ link อิ่ม — Voice call กับ YouTube upload แย่ง bandwidth กัน → call choppy\nมี QoS: Voice ได้ priority สูงสุด → ผ่านก่อนเสมอ\n\nQoS จำเป็นเมื่อ: link อิ่ม (congestion) — ถ้า bandwidth เหลือเยอะ QoS ไม่มีผล",
      table: {
        header: ["Traffic Type", "QoS Priority", "ทำไม"],
        rows: [
          ["VoIP / Video Call", "สูงสุด (EF)", "Latency <150ms, Jitter <30ms, Loss <1%"],
          ["Video Conferencing", "สูง (AF41)", "ต้องการ consistent bandwidth"],
          ["Interactive (SSH, RDP)", "Medium-high (AF31)", "Latency-sensitive แต่ burst ได้"],
          ["Business Apps (ERP)", "Medium (AF21)", "สำคัญแต่ tolerance สูงกว่า"],
          ["File Transfer, Backup", "ต่ำ (AF11)", "Best-effort, delay ได้"],
          ["YouTube, Social Media", "ต่ำสุด (CS1/BE)", "Scavenger — ใช้แค่ที่เหลือ"],
        ],
      },
    },
    {
      title: "DSCP Marking — ติดป้ายกำกับ Traffic",
      body: "DSCP (Differentiated Services Code Point) คือ 6-bit field ใน IP header ที่บอกว่า packet นี้มี priority เท่าไหร่\n\nMarkขึ้นต้น (trust boundary) ที่ edge — router ใน core เชื่อใน mark แล้วจัด queue ตาม",
      table: {
        header: ["DSCP Name", "Value", "PHB", "ใช้กับ"],
        rows: [
          ["EF (Expedited Forwarding)", "46 (101110)", "Low latency queue", "VoIP"],
          ["CS5", "40 (101000)", "Signaling", "Call signaling (SIP)"],
          ["AF41", "34 (100010)", "Assured Forwarding", "Video conferencing"],
          ["AF31", "26 (011010)", "Assured Forwarding", "Mission-critical apps"],
          ["AF21", "18 (010010)", "Assured Forwarding", "Business data"],
          ["AF11", "10 (001010)", "Assured Forwarding", "File transfer"],
          ["CS1/BE (Best Effort)", "0", "Best effort queue", "Default / browsing"],
        ],
      },
      code: `! Cisco MQC (Modular QoS CLI) — 3 ขั้นตอน

! 1. Class-map: classify traffic
class-map match-any VOICE
 match dscp ef               ! VoIP RTP
class-map match-any VIDEO
 match dscp af41
class-map match-any CRITICAL
 match dscp af31 af21

! 2. Policy-map: กำหนด action
policy-map WAN-OUT
 class VOICE
  priority 512               ! LLQ: guaranteed 512Kbps, พ้องก่อนเสมอ
 class VIDEO
  bandwidth percent 30       ! รับประกัน 30%
 class CRITICAL
  bandwidth percent 25
 class class-default
  fair-queue                 ! WFQ สำหรับ traffic ที่เหลือ

! 3. Apply บน interface
interface Serial0/0
 service-policy output WAN-OUT`,
      language: "cisco",
      warning: "Priority queue (LLQ) สำหรับ VoIP เท่านั้น — ถ้าใส่ traffic มากเกินไปใน priority จะ starve traffic อื่น",
    },
    {
      title: "Policing vs Shaping — ต่างกันยังไง?",
      body: "ทั้งคู่ใช้จำกัด bandwidth แต่ต่างกันที่วิธีจัดการ traffic เกิน:\n\nPolicing: DROP packet ที่เกิน rate ทันที — latency ต่ำ ใช้บน inbound / customer edge\nShaping: BUFFER packet ที่เกิน rate แล้วส่งทีหลัง — latency สูงขึ้น แต่ไม่ drop — ใช้บน outbound WAN",
      table: {
        header: ["", "Policing", "Shaping"],
        rows: [
          ["Action เมื่อเกิน", "DROP (หรือ re-mark)", "BUFFER แล้วส่งทีหลัง"],
          ["Latency", "ไม่เพิ่ม", "เพิ่มขึ้น"],
          ["Packet loss", "มี", "ไม่มี (ถ้า buffer ไม่เต็ม)"],
          ["ใช้บน", "Inbound, Service Provider", "Outbound WAN"],
          ["Memory", "ไม่ต้องการ buffer", "ต้องการ buffer"],
        ],
      },
      tip: "Rule of thumb: ใช้ Shaping บน outbound WAN ขาออกไป ISP, ใช้ Policing บน inbound จาก customer",
    },
  ],
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
  sections: [
    {
      title: "DHCP — DORA Process",
      body: "DHCP (Dynamic Host Configuration Protocol) แจก IP address อัตโนมัติ:\n\nD-O-R-A Process:\n1. Discover: Client broadcast ขอ IP (src: 0.0.0.0, dst: 255.255.255.255)\n2. Offer: Server ตอบ offer IP ที่ว่าง\n3. Request: Client เลือก offer และ broadcast บอกทุกคน\n4. Acknowledge: Server ยืนยัน, ส่ง IP + subnet + gateway + DNS + lease time",
      table: {
        header: ["DHCP Message", "Source", "Destination", "อธิบาย"],
        rows: [
          ["Discover", "0.0.0.0", "255.255.255.255", "Client หา DHCP server"],
          ["Offer", "DHCP Server IP", "255.255.255.255", "Server เสนอ IP"],
          ["Request", "0.0.0.0", "255.255.255.255", "Client ขอ IP ที่เลือก"],
          ["ACK", "DHCP Server IP", "255.255.255.255", "Server confirm + ส่ง config"],
        ],
      },
      code: `! Cisco DHCP Server
ip dhcp pool OFFICE_LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 7                     ! 7 วัน
 domain-name netpath.local

! Exclude IP ที่ไม่ต้องการแจก (router, server)
ip dhcp excluded-address 192.168.1.1 192.168.1.20

! DHCP Relay — ส่ง DHCP ข้าม subnet
interface GigabitEthernet0/1
 ip helper-address 10.0.0.100   ! IP ของ DHCP Server

! ดู DHCP bindings
show ip dhcp binding
show ip dhcp pool`,
      language: "cisco",
      tip: "ถ้า DHCP server อยู่คนละ subnet ต้องใช้ 'ip helper-address' บน Router เพื่อ relay DHCP broadcast",
    },
    {
      title: "DNS — Domain Name System",
      body: "DNS แปลง domain name → IP address (Forward lookup) และ IP → domain (Reverse lookup)\n\nDNS Hierarchy:\n• Root servers (13 กลุ่ม, ใช้ anycast): รู้จัก TLD servers\n• TLD (Top-Level Domain) servers: .com, .th, .org\n• Authoritative DNS: เก็บ record จริงของ domain\n• Recursive Resolver: server ที่ client ถาม (ISP, 8.8.8.8, 1.1.1.1)",
      table: {
        header: ["DNS Record Type", "อธิบาย", "ตัวอย่าง"],
        rows: [
          ["A", "Hostname → IPv4", "www.example.com → 203.0.113.10"],
          ["AAAA", "Hostname → IPv6", "www → 2001:db8::1"],
          ["CNAME", "Alias → อีก hostname", "blog.example.com → www.example.com"],
          ["MX", "Mail server สำหรับ domain", "example.com → mail.example.com (priority 10)"],
          ["PTR", "IP → Hostname (Reverse)", "10.113.0.203.in-addr.arpa → www.example.com"],
          ["NS", "Nameserver สำหรับ zone", "example.com NS → ns1.example.com"],
          ["TXT", "ข้อความอิสระ", "SPF, DKIM, domain verification"],
          ["SOA", "Start of Authority", "zone serial, TTL defaults, contact"],
        ],
      },
      code: `# ทดสอบ DNS
nslookup www.google.com           # query DNS
nslookup www.google.com 8.8.8.8   # query specific DNS server

dig www.google.com                # ละเอียดกว่า nslookup
dig MX gmail.com                  # ดู mail server
dig -x 8.8.8.8                    # reverse lookup
dig @1.1.1.1 www.google.com A     # query Cloudflare DNS

# ดู DNS cache (Windows)
ipconfig /displaydns
ipconfig /flushdns    # ล้าง DNS cache`,
      language: "bash",
      warning: "TTL (Time-To-Live) คือเวลา cache — ก่อนเปลี่ยน DNS record ให้ลด TTL ล่วงหน้า 24-48 ชม. ไม่งั้น change propagation ช้ามาก",
    },
  ],
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
  sections: [
    {
      title: "WAN Technologies Overview",
      body: "WAN (Wide Area Network) เชื่อมสาขา, Datacenter, Cloud ข้ามเมืองหรือประเทศ\n\nวิวัฒนาการ WAN:\nFrame Relay / ATM (legacy) → MPLS (ปัจจุบัน) → SD-WAN (อนาคต/ปัจจุบัน)\n\nไทย: CAT Telecom, NT (TOT), True Business, AIS Business เป็น MPLS providers หลัก",
      table: {
        header: ["WAN Technology", "ความเร็ว", "Latency", "ข้อดี", "ข้อเสีย"],
        rows: [
          ["Leased Line (E1/T1)", "2/1.5 Mbps", "ต่ำมาก", "Dedicated, predictable", "แพง, ช้า"],
          ["MPLS L3 VPN", "10M - 10G", "ต่ำ-กลาง", "QoS, SLA, any-to-any", "แพง, ผูก ISP"],
          ["MPLS L2 VPN", "1M - 10G", "ต่ำ", "Transparent L2", "แพง"],
          ["IPsec VPN over Internet", "ขึ้นกับ Internet", "ปานกลาง", "ถูก, ยืดหยุ่น", "ไม่มี SLA, latency variable"],
          ["SD-WAN", "ขึ้นกับ underlay", "ต่ำ (ปรับ path อัตโนมัติ)", "Multiple underlay, policy-based", "ซับซ้อนในการ setup"],
        ],
      },
    },
    {
      title: "MPLS — Multi-Protocol Label Switching",
      body: "MPLS เพิ่ม Label (32-bit) ระหว่าง L2 และ L3 header\n\nแทนที่จะ route ตาม IP (L3 lookup ทุก hop) — MPLS switch ตาม label (เร็วกว่า)\n\nLabel Stack:\n• Ingress PE: Push label\n• P (Provider) Router: Swap label\n• Egress PE: Pop label\n\nMPLS L3 VPN: แต่ละ customer มี VRF (Virtual Routing Table) แยกกัน → ป้องกัน customer เห็น route กัน",
      code: `! MPLS Basic Config (บน Provider Router)
mpls ip                           ! เปิด MPLS globally
interface GigabitEthernet0/0
 mpls ip                          ! เปิดบน interface

! ดู MPLS
show mpls interfaces              ! ดู interface ที่เปิด MPLS
show mpls ldp neighbors           ! ดู LDP peers
show mpls forwarding-table        ! ดู label table

! VRF สำหรับ customer (บน PE router)
vrf definition CUSTOMER_A
 rd 65000:100                     ! Route Distinguisher
 address-family ipv4
  route-target import 65000:100
  route-target export 65000:100

interface GigabitEthernet0/1
 vrf forwarding CUSTOMER_A
 ip address 10.0.0.1 255.255.255.252`,
      language: "cisco",
    },
    {
      title: "SD-WAN — Software-Defined WAN",
      body: "SD-WAN แยก Control Plane ออกจาก Data Plane — ควบคุม WAN policy ผ่าน centralized controller\n\nสถาปัตยกรรม Cisco SD-WAN (Viptela):\n• vManage: GUI/API controller\n• vSmart: ส่ง policy ไปยัง edge\n• vBond: orchestration / authentication\n• vEdge / cEdge: router ตามสาขา\n\nข้อดีหลัก:\n• รวม MPLS + Internet + 4G/5G เป็น underlay เดียว\n• App-aware routing: เลือก path ตาม application + latency\n• Zero-touch provisioning: plug-in แล้ว auto-configure\n• Central policy ผ่าน GUI ไม่ต้อง CLI ทุก router",
      table: {
        header: ["MPLS Traditional", "SD-WAN"],
        rows: [
          ["ผูกกับ ISP เดียว", "ใช้ได้หลาย ISP + 4G"],
          ["Config ทีละ router", "Central policy ครั้งเดียว"],
          ["ไม่มี app visibility", "เห็น app-level performance"],
          ["SLA แพง", "Internet-grade + policy = คุ้มกว่า"],
          ["Months to deploy", "Days/weeks"],
        ],
      },
      tip: "SD-WAN ไม่ได้แทน MPLS ทุกกรณี — real-time VoIP ยังชอบ MPLS SLA; SD-WAN ดีสำหรับ cloud-first + multi-branch",
    },
  ],
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
  sections: [
    {
      title: "802.11 Wireless Standards",
      body: "Wi-Fi ใช้ IEEE 802.11 เป็น standard — แต่ละรุ่นเพิ่ม speed และ efficiency\n\nชื่อ Wi-Fi 4/5/6 เป็นชื่อ marketing ที่ Wi-Fi Alliance ตั้งให้จำง่ายขึ้น",
      table: {
        header: ["Standard", "Wi-Fi Gen", "Frequency", "Max Speed", "Feature หลัก"],
        rows: [
          ["802.11b", "-", "2.4 GHz", "11 Mbps", "รุ่นแรกที่ใช้กันแพร่หลาย"],
          ["802.11g", "-", "2.4 GHz", "54 Mbps", "เร็วขึ้น, backward compat กับ b"],
          ["802.11n", "Wi-Fi 4", "2.4/5 GHz", "600 Mbps", "MIMO (หลาย antenna)"],
          ["802.11ac", "Wi-Fi 5", "5 GHz", "6.9 Gbps", "MU-MIMO, beamforming"],
          ["802.11ax", "Wi-Fi 6/6E", "2.4/5/6 GHz", "9.6 Gbps", "OFDMA, BSS Coloring, Target Wake Time"],
          ["802.11be", "Wi-Fi 7", "2.4/5/6 GHz", "46 Gbps", "Multi-Link Operation (MLO)"],
        ],
      },
      tip: "2.4 GHz: range ไกล แต่แออัด (microwave, BT แย่ง), 5 GHz: เร็วกว่า range สั้นกว่า, 6 GHz (Wi-Fi 6E): ว่างที่สุด",
    },
    {
      title: "Channel Planning — หลีกเลี่ยง Interference",
      body: "2.4 GHz มีแค่ 3 channel ที่ไม่ overlap กัน: 1, 6, 11\n5 GHz มี 24+ non-overlapping channel (ขึ้นกับประเทศ)\n\nการวาง AP ใน enterprise ต้องวางแบบ honeycomb pattern และใช้ channel ที่ไม่ overlap ติดกัน",
      code: `# ดู Wi-Fi environment บน Linux
iwlist wlan0 scan | grep -E 'ESSID|Channel|Signal'
iw dev wlan0 scan | grep -E 'SSID|freq|signal'

# ดู channel ที่ใช้ทั้งหมดในพื้นที่
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon

# Windows: ดู signal strength
netsh wlan show interfaces
netsh wlan show networks mode=bssid`,
      language: "bash",
      warning: "ถ้า AP ใกล้กันใช้ channel เดียวกัน = Co-channel Interference → throughput ลดมาก กำหนด channel ด้วยมือหรือใช้ Auto-RF บน WLC",
    },
    {
      title: "WPA2 และ WPA3 Security",
      body: "Wi-Fi Security วิวัฒนาการจาก WEP (แตกใน 5 นาที) → WPA → WPA2 → WPA3\n\nWPA2 Enterprise: ใช้ 802.1X + RADIUS server — ทุก user login ด้วย credential ของตัวเอง\nWPA2 Personal (PSK): ใช้ password ร่วมกัน — ถ้ารู้ password ก็ decrypt traffic ทุกคนได้\n\nWPA3 ปรับปรุง:\n• SAE (Simultaneous Authentication of Equals) แทน PSK: ป้องกัน offline dictionary attack\n• PMF (Protected Management Frames) บังคับ: ป้องกัน deauth attack\n• Forward Secrecy: ถึง password หลุด ก็ decrypt traffic เก่าไม่ได้",
      table: {
        header: ["Security", "Encryption", "Auth", "ช่องโหว่"],
        rows: [
          ["WEP", "RC4 (ไม่ปลอดภัย)", "Shared Key", "แตกภายใน 5 นาที — ห้ามใช้!"],
          ["WPA", "TKIP", "PSK / 802.1X", "TKIP มีช่องโหว่"],
          ["WPA2-Personal", "CCMP/AES", "PSK", "Dictionary attack บน PSK"],
          ["WPA2-Enterprise", "CCMP/AES", "802.1X + RADIUS", "RADIUS server เป็น SPOF"],
          ["WPA3-Personal", "CCMP/AES + SAE", "SAE (Dragonfly)", "ปลอดภัยกว่า PSK มาก"],
          ["WPA3-Enterprise", "GCMP-256", "802.1X + RADIUS", "ปลอดภัยที่สุด"],
        ],
      },
    },
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
  sections: [
    {
      title: "SNMP — Simple Network Management Protocol",
      body: "SNMP ใช้ monitor และ manage อุปกรณ์เครือข่าย (router, switch, server) จาก central NMS\n\nComponent:\n• Agent: software บนอุปกรณ์ ตอบคำถามและส่ง trap\n• NMS (Network Management System): เก็บข้อมูล, alert (Zabbix, Nagios, PRTG, LibreNMS)\n• MIB (Management Information Base): catalog ของ OID ที่ agent รู้จัก",
      table: {
        header: ["SNMP Version", "Security", "Port", "แนะนำ"],
        rows: [
          ["v1", "Community string (plaintext)", "UDP 161/162", "❌ ไม่ปลอดภัย"],
          ["v2c", "Community string (plaintext)", "UDP 161/162", "ยังใช้อยู่ถ้า network trusted"],
          ["v3", "USM: Auth (SHA) + Priv (AES)", "UDP 161/162", "✅ แนะนำ — encrypt"],
        ],
      },
      code: `! Cisco: SNMP v2c configuration
snmp-server community MONITOR-RO ro    ! read-only community
snmp-server host 10.0.0.100 version 2c MONITOR-RO

! SNMP v3 (ปลอดภัยกว่า)
snmp-server group NETOPS v3 priv
snmp-server user monitor NETOPS v3 auth sha AuthPass123 priv aes 128 PrivPass456
snmp-server host 10.0.0.100 version 3 priv monitor

! Linux: ดึงข้อมูลด้วย snmpget
snmpget -v2c -c MONITOR-RO 192.168.1.1 sysDescr.0
snmpwalk -v2c -c MONITOR-RO 192.168.1.1 ifTable    ! ดู interface stats`,
      language: "cisco",
      warning: "SNMP v1/v2c ส่ง community string แบบ plaintext — ใช้ SNMP v3 หรือจำกัด access ด้วย ACL",
    },
    {
      title: "NetFlow — Traffic Analysis",
      body: "NetFlow บันทึกข้อมูล flow (session) ของ traffic ทุก connection:\n• Who: src/dst IP\n• What: protocol, port\n• How much: bytes, packets\n• When: start/end time\n\nไม่บันทึก content ของ packet (ไม่ใช่ packet capture)\nใช้หาว่า host ไหน consume bandwidth มากที่สุด, detect DDoS, audit\n\nVersions: v5 (IPv4 only), v9 (template-based, IPv6), IPFIX (IETF standard, แนะนำ)",
      code: `! Cisco: เปิด NetFlow บน interface
interface GigabitEthernet0/0
 ip flow ingress
 ip flow egress

! กำหนด NetFlow exporter (ส่งไปยัง collector)
ip flow-export version 9
ip flow-export destination 10.0.0.50 9995    ! Collector IP + UDP port
ip flow-export source GigabitEthernet0/0

! ดู NetFlow cache
show ip cache flow
show ip flow interface

! Tools: ntopng, nfdump, Elastic + Kibana, SolarWinds NTA
# nfdump: วิเคราะห์ NetFlow files
nfdump -r /data/flows/nfcapd.current -s ip/bytes -n 10    ! top 10 talkers`,
      language: "cisco",
    },
    {
      title: "Syslog — Centralized Log Management",
      body: "Syslog รวบรวม log จากอุปกรณ์ทั้ง network มาไว้ที่ centralized server\n\nSyslog Severity Levels (0 = วิกฤต, 7 = debug):",
      table: {
        header: ["Level", "Keyword", "ความหมาย", "ตัวอย่าง"],
        rows: [
          ["0", "Emergency (emerg)", "System unusable", "Power failure, hardware crash"],
          ["1", "Alert", "Immediate action needed", "Disk 95% full, link down on critical router"],
          ["2", "Critical", "Critical conditions", "Software error, redundancy failed"],
          ["3", "Error", "Error conditions", "Interface error, OSPF neighbor lost"],
          ["4", "Warning", "Warning conditions", "CPU >80%, memory low"],
          ["5", "Notice", "Normal but significant", "Config change, user login"],
          ["6", "Info", "Informational", "Link up/down, ACL match"],
          ["7", "Debug", "Debug messages", "Packet-level tracing"],
        ],
      },
      code: `! Cisco: ส่ง log ไปยัง syslog server
logging host 10.0.0.200
logging trap informational    ! ส่ง level 0-6
logging source-interface Loopback0
logging on

! Linux rsyslog: forward ไปยัง central
echo "*.* @10.0.0.200:514" >> /etc/rsyslog.conf    ! UDP
echo "*.* @@10.0.0.200:514" >> /etc/rsyslog.conf   ! TCP

! ELK Stack (Elasticsearch + Logstash + Kibana): popular open-source log platform
# Logstash config รับ syslog
input { syslog { port => 5140 } }
filter { grok { match => { "message" => "%{SYSLOGLINE}" } } }
output { elasticsearch { hosts => ["localhost:9200"] } }`,
      language: "cisco",
      tip: "Production ส่ง syslog level 0-5 (ไม่ส่ง debug 6-7) — debug flood disk และ network bandwidth",
    },
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
  sections: [
    {
      title: "Systematic Troubleshooting Approach",
      body: "การ troubleshoot แบบสุ่ม waste เวลามาก — ต้องมี methodology:\n\n1. Define the problem: ปัญหาคืออะไรกันแน่? เกิดเมื่อไหร่? กระทบใคร?\n2. Gather info: show commands, logs, user report\n3. Form hypothesis: คิดว่า cause คืออะไร\n4. Test hypothesis: verify หรือ disprove\n5. ONE change at a time: เปลี่ยนทีละอย่าง แล้ว test\n6. Document: บันทึกทุกอย่างที่ทำ\n\nวิธีเลือก approach:\n• Bottom-Up: ถ้าไม่รู้ว่าปัญหาอยู่ Layer ไหน → เริ่ม L1\n• Top-Down: ถ้า user report ปัญหา application → เริ่ม L7\n• Divide & Conquer: ถ้ามีประสบการณ์ → เริ่ม L3 แล้วแยกขึ้น/ลง",
      table: {
        header: ["Approach", "เริ่มที่", "เหมาะกับ"],
        rows: [
          ["Bottom-Up", "L1 (Physical)", "ไม่รู้ layer ที่มีปัญหา, ปัญหาใหม่"],
          ["Top-Down", "L7 (Application)", "User report app error, ทราบ physical ok"],
          ["Divide & Conquer", "L3 (ping test)", "มีประสบการณ์, ต้องการเร็ว"],
          ["Follow the Path", "Trace path packet", "ปัญหา routing, WAN"],
          ["Spot the Differences", "เปรียบ working vs broken", "เกิดหลัง change"],
        ],
      },
    },
    {
      title: "Layer-by-Layer Diagnostic Commands",
      body: "ตรวจสอบทีละ Layer — พอเจอ layer ที่ผิดปกติ concentrate ที่นั้น:",
      code: `# ── L1: Physical ──────────────────────────────
show interfaces GigabitEthernet0/0    # ดู Input/Output errors, CRC, runts, giants
# CRC errors → bad cable / duplex mismatch
# Runts → frame < 64 bytes (duplex mismatch หรือ collision)
# Input errors + no CRC → duplex mismatch

# ── L2: Data Link ──────────────────────────────
show mac address-table               # MAC table
show interfaces trunk                # trunk ports, VLANs allowed
show spanning-tree vlan 10           # STP state
show cdp neighbors detail            # ดู connected devices

# ── L3: Network ────────────────────────────────
ping 192.168.1.1                     # test connectivity
ping 192.168.1.1 source Lo0 repeat 100 size 1500 df-bit  # test MTU
traceroute 8.8.8.8                   # ดู path + latency per hop
show ip route                        # routing table
show ip arp                          # ARP table

# ── L4: Transport ──────────────────────────────
telnet 10.0.0.1 80                   # test TCP port
nc -zv 10.0.0.1 443                  # netcat port test
ss -tlnp                             # ดู listening ports (Linux)
netstat -an | grep ESTABLISHED       # ดู active connections

# ── L7: Application ────────────────────────────
curl -v https://www.example.com      # HTTP debug
openssl s_client -connect host:443   # SSL/TLS debug
nslookup www.example.com             # DNS test`,
      language: "bash",
    },
    {
      title: "Common Network Issues และวิธีแก้",
      body: "เก็บ pattern ของปัญหาที่เจอบ่อย:",
      table: {
        header: ["อาการ", "สาเหตุที่เป็นไปได้", "วิธีตรวจ"],
        rows: [
          ["ping ไม่ผ่านเลย", "L1: cable/interface down", "show interfaces — ดู line/protocol"],
          ["ping ผ่าน gateway แต่ไม่ถึง remote", "Routing หาย, ACL block", "show ip route, traceroute"],
          ["ping ผ่านแต่ TCP ไม่ได้", "Firewall block port, MTU issue", "telnet <ip> <port>, ping df-bit"],
          ["เน็ตช้า intermittent", "Duplex mismatch, congestion, lossy link", "show interface (errors), ping จำนวนมาก"],
          ["DNS ไม่ทำงาน", "DNS server ไม่ตอบ, wrong DNS IP", "nslookup google.com, ping DNS IP"],
          ["DHCP ไม่ได้ IP", "DHCP server down, helper-address หาย", "ipconfig /renew, show ip dhcp binding"],
          ["OSPF neighbor ไม่ขึ้น", "Hello mismatch, MTU mismatch, network type", "show ip ospf neighbor, debug ip ospf"],
        ],
      },
      tip: "Rule #1: เปลี่ยนทีละอย่าง แล้ว test ก่อน เปลี่ยนต่อ — ถ้าเปลี่ยนหลายอย่างพร้อมกัน ไม่รู้ว่าอะไรแก้ได้",
    },
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
  sections: [
    {
      title: "ทำไม Network Documentation ถึงสำคัญ?",
      body: "Network ที่ดีต้องมี documentation ที่ดี — ถ้าไม่มี:\n• Engineer ใหม่ใช้เวลาหลายสัปดาห์ทำความเข้าใจ network\n• Troubleshoot นานขึ้น เพราะไม่รู้ว่า cable ไปไหน\n• Change ผิดพลาดบ่อยขึ้น เพราะไม่รู้ impact\n\nRule of thumb: ถ้า engineer คนสำคัญหายไปพรุ่งนี้ ทีมยังเดินงานต่อได้ไหม?\n→ ถ้าไม่ได้ = documentation ไม่พอ",
      table: {
        header: ["Document Type", "มีอะไร", "Tool"],
        rows: [
          ["L1 Physical Diagram", "rack, cable, port, label", "Visio, draw.io"],
          ["L2 Logical Diagram", "VLAN, trunk, STP root, switch port", "Visio, draw.io, NetBox"],
          ["L3 Network Diagram", "IP subnet, routing protocol, WAN", "Visio, Lucidchart"],
          ["IP Address Management (IPAM)", "IP allocation, DNS, DHCP scope", "NetBox, phpIPAM, Excel"],
          ["Change Log", "who/what/when/why changed", "ServiceNow, Jira, Wiki"],
          ["Runbook / SOP", "step-by-step procedures", "Confluence, Notion"],
        ],
      },
    },
    {
      title: "IPAM — IP Address Management",
      body: "IPAM (IP Address Management) ติดตาม IP address ทุกตัวในองค์กร:\n\nปัญหาถ้าไม่มี IPAM:\n• IP conflict — 2 device ใช้ IP เดียวกัน\n• ไม่รู้ว่า subnet ไหนเต็มแล้ว\n• เอา IP ที่ใช้อยู่ไป assign ให้ device ใหม่\n\nBest Practice — Hierarchical IP Plan:\n• 10.0.0.0/8 = ทั้งองค์กร\n• 10.SITE.0.0/16 = แต่ละ site (max 256 sites)\n• 10.SITE.VLAN.0/24 = แต่ละ VLAN ต่อ site",
      table: {
        header: ["Subnet", "ใช้กับ", "หมายเหตุ"],
        rows: [
          ["10.1.0.0/24", "BKK Site — Server VLAN", "VLAN 10"],
          ["10.1.10.0/24", "BKK Site — IT VLAN", "VLAN 20"],
          ["10.1.20.0/24", "BKK Site — HR VLAN", "VLAN 30"],
          ["10.1.254.0/30", "BKK-CNX WAN link", "point-to-point"],
          ["10.2.0.0/16", "CNX Site", "เหมือนกัน แต่ site 2"],
        ],
      },
      code: `# NetBox — open-source DCIM + IPAM (Docker install)
docker run -d -p 8000:8000 netboxcommunity/netbox:latest

# NetBox API: สร้าง prefix ด้วย Python
import requests
headers = {"Authorization": "Token YOUR_TOKEN", "Content-Type": "application/json"}
data = {"prefix": "10.1.10.0/24", "description": "BKK IT VLAN", "site": 1, "vlan": 20}
r = requests.post("http://netbox/api/ipam/prefixes/", json=data, headers=headers)

# ดู IP ที่ว่างใน prefix
r = requests.get("http://netbox/api/ipam/prefixes/5/available-ips/", headers=headers)
print(r.json())`,
      language: "python",
    },
    {
      title: "Configuration Backup และ Change Management",
      body: "Backup config ทุก device ก่อน change — ถ้า change ผิด rollback ได้ใน 30 วินาที\n\nIOS Archive (Cisco): เก็บ config เก่าพร้อม timestamp ใน flash หรือ TFTP server\n\nChange Management Process:\n1. Change Request: อธิบาย what/why/impact/rollback plan\n2. Change Approval: ผ่าน CAB (Change Advisory Board)\n3. Maintenance Window: change ในเวลา low-traffic\n4. Test: verify หลัง change\n5. Document: update diagram + IPAM",
      code: `! Cisco IOS Archive — auto backup ทุกครั้ง config เปลี่ยน
archive
 path tftp://10.0.0.50/configs/$h-$t    ! $h=hostname, $t=timestamp
 write-memory
 time-period 1440    ! backup ทุก 24 ชม.

! Show config history
show archive
archive config

! Ansible: backup config ทุก router อัตโนมัติ
# playbook backup_configs.yml
- name: Backup Cisco IOS configs
  hosts: routers
  gather_facts: false
  tasks:
    - name: Backup running config
      cisco.ios.ios_config:
        backup: yes
        backup_options:
          filename: "{{ inventory_hostname }}_{{ lookup('pipe', 'date +%Y%m%d') }}.cfg"
          dir_path: /backups/`,
      language: "cisco",
      tip: "3-2-1 Backup Rule: 3 copies, 2 media types, 1 offsite — ใช้ได้กับ network config เช่นกัน",
    },
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
