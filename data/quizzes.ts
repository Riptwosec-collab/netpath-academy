/* ─── Types ─────────────────────────────────────────────────────── */
export type QuizLevel     = "Beginner" | "Intermediate" | "Advanced";
export type QuizQuestionType = "multiple-choice" | "true-false";
export type QuizDifficulty   = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id:            string;
  type:          QuizQuestionType;
  question:      string;
  options:       string[];
  correctAnswer: string;
  explanation:   string;
  difficulty:    QuizDifficulty;
}

export interface Quiz {
  id:               string;
  title:            string;
  description:      string;
  category:         string;
  level:            QuizLevel;
  duration:         string;
  passingScore:     number;          // percentage, e.g. 70
  relatedCourseId?: string;
  relatedLessonId?: string;
  questions:        QuizQuestion[];
}

/* ─── Quiz Data ─────────────────────────────────────────────────── */
export const quizzes: Quiz[] = [

  /* 1 ─ Network Fundamentals ─────────────────────────────────────── */
  {
    id:             "network-fundamentals-quiz",
    title:          "Network Fundamentals Quiz",
    description:    "ทดสอบความเข้าใจพื้นฐาน Network, อุปกรณ์เครือข่าย, IP, Gateway และ Packet Flow",
    category:       "Foundation",
    level:          "Beginner",
    duration:       "10 min",
    passingScore:   70,
    relatedCourseId: "network-fundamentals",
    relatedLessonId: "what-is-network",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "อุปกรณ์ใดใช้เชื่อมต่อหลายอุปกรณ์ภายใน LAN เดียวกัน?",
        options:       ["Switch", "Router", "Firewall", "DNS Server"],
        correctAnswer: "Switch",
        explanation:   "Switch ใช้เชื่อมต่ออุปกรณ์ภายใน LAN เดียวกัน เช่น PC, Printer, Server หรือ Access Point",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "Default Gateway มีหน้าที่อะไร?",
        options:       [
          "แจก IP Address ให้เครื่องลูกข่าย",
          "แปลงชื่อเว็บไซต์เป็น IP Address",
          "พา Traffic ออกจาก Network ปัจจุบันไปยัง Network อื่น",
          "ป้องกันไวรัสบนเครื่อง Client",
        ],
        correctAnswer: "พา Traffic ออกจาก Network ปัจจุบันไปยัง Network อื่น",
        explanation:   "Default Gateway คือทางออกของเครื่อง Client เมื่อต้องการติดต่อปลายทางที่อยู่นอก Network ของตัวเอง",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "true-false",
        question:      "Router ใช้เชื่อมต่อ Network ที่แตกต่างกัน",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Router ทำงานหลักที่ Layer 3 และใช้ Routing Table เพื่อตัดสินใจส่ง Packet ระหว่าง Network",
        difficulty:    "Easy",
      },
      {
        id: "q4", type: "multiple-choice",
        question:      "ถ้าเครื่องมี IP แต่เปิดเว็บไม่ได้ ควรตรวจสอบอะไรก่อน?",
        options:       ["CPU Usage", "DNS และ Gateway", "Wallpaper", "Keyboard Layout"],
        correctAnswer: "DNS และ Gateway",
        explanation:   "ปัญหาเปิดเว็บไม่ได้อาจเกิดจาก DNS แปลงชื่อไม่ได้ หรือ Gateway ออก Network อื่นไม่ได้",
        difficulty:    "Medium",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "คำสั่งใดใช้ดู IP Address บน Windows?",
        options:       ["show ip route", "ipconfig /all", "show vlan brief", "ls -la"],
        correctAnswer: "ipconfig /all",
        explanation:   "ipconfig /all ใช้ดู IP Address, Subnet Mask, Default Gateway, DNS และ MAC Address บน Windows",
        difficulty:    "Easy",
      },
      {
        id: "q6", type: "true-false",
        question:      "Hub ส่ง Data ไปยังทุก Port โดยไม่สนใจ Destination MAC Address",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Hub เป็น Layer 1 Device ที่ Broadcast ทุก Frame ออกทุก Port ต่างจาก Switch ที่ส่งตรงตาม MAC Table",
        difficulty:    "Medium",
      },
      {
        id: "q7", type: "multiple-choice",
        question:      "Bandwidth 100 Mbps หมายความว่าอะไร?",
        options:       [
          "ส่งข้อมูลได้ 100 MB ต่อวินาที",
          "ส่งข้อมูลได้ 100 Megabit ต่อวินาที",
          "ใช้ Fiber Optic เท่านั้น",
          "รองรับ 100 อุปกรณ์พร้อมกัน",
        ],
        correctAnswer: "ส่งข้อมูลได้ 100 Megabit ต่อวินาที",
        explanation:   "Mbps = Megabits per second ต่างจาก MBps (Megabytes per second) โดย 1 Byte = 8 Bits",
        difficulty:    "Medium",
      },
    ],
  },

  /* 2 ─ OSI Model ─────────────────────────────────────────────────── */
  {
    id:             "osi-model-quiz",
    title:          "OSI Model Quiz",
    description:    "ทดสอบความเข้าใจ OSI 7 Layer, หน้าที่แต่ละ Layer และอุปกรณ์ที่ทำงานใน Layer นั้น",
    category:       "Foundation",
    level:          "Beginner",
    duration:       "12 min",
    passingScore:   70,
    relatedCourseId: "network-fundamentals",
    relatedLessonId: "osi-model",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "OSI Model มีกี่ Layer?",
        options:       ["4", "5", "7", "9"],
        correctAnswer: "7",
        explanation:   "OSI Model มี 7 Layer ตั้งแต่ Physical (L1) จนถึง Application (L7)",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "Switch ทำงานที่ Layer ไหนเป็นหลัก?",
        options:       ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correctAnswer: "Layer 2",
        explanation:   "Switch ทำงานที่ Data Link Layer (Layer 2) โดยใช้ MAC Address เพื่อส่ง Frame ไปยัง Port ที่ถูกต้อง",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "multiple-choice",
        question:      "Layer ใดรับผิดชอบการเข้ารหัส (Encryption) และการบีบอัดข้อมูล?",
        options:       ["Session Layer", "Transport Layer", "Presentation Layer", "Application Layer"],
        correctAnswer: "Presentation Layer",
        explanation:   "Presentation Layer (L6) จัดการ Encryption, Compression และ Data Format Conversion",
        difficulty:    "Medium",
      },
      {
        id: "q4", type: "true-false",
        question:      "TCP ทำงานที่ Transport Layer (Layer 4)",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "TCP และ UDP ทั้งคู่ทำงานที่ Transport Layer และรับผิดชอบ End-to-End Communication",
        difficulty:    "Easy",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "PDU ที่ใช้ที่ Layer 3 เรียกว่าอะไร?",
        options:       ["Bit", "Frame", "Packet", "Segment"],
        correctAnswer: "Packet",
        explanation:   "แต่ละ Layer มี PDU ของตัวเอง: L1=Bit, L2=Frame, L3=Packet, L4=Segment/Datagram",
        difficulty:    "Medium",
      },
      {
        id: "q6", type: "multiple-choice",
        question:      "HTTP ทำงานที่ Layer ไหน?",
        options:       ["Layer 4", "Layer 5", "Layer 6", "Layer 7"],
        correctAnswer: "Layer 7",
        explanation:   "HTTP, HTTPS, FTP, DNS, SMTP ล้วนทำงานที่ Application Layer (Layer 7)",
        difficulty:    "Easy",
      },
      {
        id: "q7", type: "true-false",
        question:      "Router ทำงานได้เฉพาะที่ Layer 3 เท่านั้น",
        options:       ["True", "False"],
        correctAnswer: "False",
        explanation:   "Router ทำงานหลักที่ Layer 3 แต่ต้องอ่าน Layer 1 และ 2 ด้วย และ Router รุ่นใหม่อาจมี Firewall ที่ทำงานถึง Layer 7",
        difficulty:    "Hard",
      },
      {
        id: "q8", type: "multiple-choice",
        question:      "Physical Layer (Layer 1) รับผิดชอบสิ่งใด?",
        options:       [
          "MAC Address",
          "IP Address",
          "การส่ง Bit ผ่านสื่อกายภาพ เช่น สาย Ethernet",
          "Port Number",
        ],
        correctAnswer: "การส่ง Bit ผ่านสื่อกายภาพ เช่น สาย Ethernet",
        explanation:   "Layer 1 จัดการกับสัญญาณทางกายภาพ เช่น สาย UTP, Fiber, สัญญาณ WiFi และ Bit Encoding",
        difficulty:    "Easy",
      },
    ],
  },

  /* 3 ─ IP Address & Subnetting ───────────────────────────────────── */
  {
    id:             "ip-subnetting-quiz",
    title:          "IP Address & Subnetting Quiz",
    description:    "ทดสอบความเข้าใจ IP Class, Subnet Mask, CIDR Notation และการคำนวณ Subnet",
    category:       "Foundation",
    level:          "Beginner",
    duration:       "15 min",
    passingScore:   70,
    relatedCourseId: "ip-subnetting",
    relatedLessonId: "subnet-calculation",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "IP Address 192.168.1.100/24 มี Network Address คืออะไร?",
        options:       ["192.168.1.0", "192.168.0.0", "192.168.1.100", "192.168.1.255"],
        correctAnswer: "192.168.1.0",
        explanation:   "/24 หมายความว่า 24 bit แรกคือ Network ส่วน 8 bit สุดท้ายคือ Host ดังนั้น Network = 192.168.1.0",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "Subnet Mask 255.255.255.0 ตรงกับ CIDR Notation ใด?",
        options:       ["/8", "/16", "/24", "/32"],
        correctAnswer: "/24",
        explanation:   "255.255.255.0 มี 24 bit ที่เป็น 1 ดังนั้นตรงกับ /24",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "multiple-choice",
        question:      "Network 192.168.1.0/24 มี Host ได้กี่ตัว?",
        options:       ["254", "255", "256", "252"],
        correctAnswer: "254",
        explanation:   "/24 มี 256 address แต่ต้องหัก Network Address และ Broadcast Address ออก = 256-2 = 254 Hosts",
        difficulty:    "Easy",
      },
      {
        id: "q4", type: "true-false",
        question:      "10.0.0.0 เป็น IP Address ส่วนตัว (Private IP)",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Private IP Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 ตามกำหนดใน RFC 1918",
        difficulty:    "Easy",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "Broadcast Address ของ Network 192.168.10.0/24 คืออะไร?",
        options:       ["192.168.10.0", "192.168.10.1", "192.168.10.254", "192.168.10.255"],
        correctAnswer: "192.168.10.255",
        explanation:   "Broadcast Address คือ Address สุดท้ายของ Network ซึ่งมี Host Bit ทั้งหมดเป็น 1 = 192.168.10.255",
        difficulty:    "Medium",
      },
      {
        id: "q6", type: "multiple-choice",
        question:      "ต้องการแบ่ง 192.168.1.0/24 เป็น 4 Subnet เท่า ๆ กัน ต้องใช้ Prefix ใด?",
        options:       ["/25", "/26", "/27", "/28"],
        correctAnswer: "/26",
        explanation:   "เพิ่ม 2 bit จาก /24 ได้ /26 ซึ่งให้ 4 Subnet (2^2=4) แต่ละ Subnet มี 64 Address, 62 Hosts",
        difficulty:    "Hard",
      },
      {
        id: "q7", type: "true-false",
        question:      "IPv6 มีความยาว 128 bit",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "IPv6 มีขนาด 128 bit ต่างจาก IPv4 ที่มี 32 bit ทำให้มี Address ได้มากกว่ามหาศาล",
        difficulty:    "Easy",
      },
      {
        id: "q8", type: "multiple-choice",
        question:      "IP Class C มี Default Subnet Mask คืออะไร?",
        options:       ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.128"],
        correctAnswer: "255.255.255.0",
        explanation:   "Class C (192.0.0.0 - 223.255.255.255) มี Default Subnet Mask = 255.255.255.0 (/24)",
        difficulty:    "Medium",
      },
    ],
  },

  /* 4 ─ VLAN & Trunk ──────────────────────────────────────────────── */
  {
    id:             "vlan-trunk-quiz",
    title:          "VLAN & Trunk Quiz",
    description:    "ทดสอบความเข้าใจ VLAN, Access Port, Trunk Port, 802.1Q Tagging และการ Config บน Cisco",
    category:       "Switching",
    level:          "Beginner",
    duration:       "12 min",
    passingScore:   70,
    relatedCourseId: "vlan-trunk",
    relatedLessonId: "vlan-config-lesson",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "VLAN ย่อมาจากอะไร?",
        options:       [
          "Virtual Local Area Network",
          "Virtual LAN Access Node",
          "Variable Length Area Network",
          "Virtual Link Access Network",
        ],
        correctAnswer: "Virtual Local Area Network",
        explanation:   "VLAN = Virtual Local Area Network ใช้แบ่ง Network ออกเป็นกลุ่มย่อย ๆ แบบ Logical บน Switch เดียวกัน",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "Trunk Port ต่างจาก Access Port อย่างไร?",
        options:       [
          "Trunk Port ส่งได้หลาย VLAN, Access Port ส่งได้แค่ VLAN เดียว",
          "Trunk Port เร็วกว่า Access Port",
          "Access Port ใช้กับ Router เท่านั้น",
          "ไม่ต่างกัน",
        ],
        correctAnswer: "Trunk Port ส่งได้หลาย VLAN, Access Port ส่งได้แค่ VLAN เดียว",
        explanation:   "Access Port ส่ง Traffic ของ VLAN เดียว (ต่ออุปกรณ์ End Device) ส่วน Trunk Port ส่งได้หลาย VLAN พร้อมกัน (ต่อระหว่าง Switch)",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "multiple-choice",
        question:      "คำสั่งใดสร้าง VLAN 10 บน Cisco Switch?",
        options:       ["vlan add 10", "create vlan 10", "vlan 10", "set vlan 10"],
        correctAnswer: "vlan 10",
        explanation:   "ใน VLAN Config Mode ให้พิมพ์ vlan 10 แล้วตามด้วย name [ชื่อ] เพื่อสร้าง VLAN",
        difficulty:    "Easy",
      },
      {
        id: "q4", type: "true-false",
        question:      "Native VLAN บน Trunk Port ส่ง Traffic โดยไม่มี VLAN Tag",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Native VLAN (Default VLAN 1) ส่ง Traffic แบบ Untagged บน Trunk Port ตามมาตรฐาน 802.1Q",
        difficulty:    "Medium",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "Protocol ใดใช้ใน VLAN Tagging มาตรฐาน?",
        options:       ["802.1X", "802.1Q", "802.3", "802.11"],
        correctAnswer: "802.1Q",
        explanation:   "IEEE 802.1Q เป็นมาตรฐาน VLAN Tagging ที่เพิ่ม 4-byte Tag ใน Ethernet Frame เพื่อระบุ VLAN",
        difficulty:    "Medium",
      },
      {
        id: "q6", type: "multiple-choice",
        question:      "คำสั่งใดตั้ง Port fa0/1 เป็น Access Port ของ VLAN 20?",
        options:       [
          "switchport access vlan 20",
          "vlan access port 20",
          "set port vlan 20",
          "access-vlan 20",
        ],
        correctAnswer: "switchport access vlan 20",
        explanation:   "ลำดับ: interface fa0/1 → switchport mode access → switchport access vlan 20",
        difficulty:    "Medium",
      },
      {
        id: "q7", type: "true-false",
        question:      "VLAN ช่วยลด Broadcast Domain บน Network",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "VLAN แบ่ง Switch ออกเป็นหลาย Broadcast Domain ทำให้ Broadcast ไม่กระจายออกไปทั้ง Network",
        difficulty:    "Easy",
      },
      {
        id: "q8", type: "multiple-choice",
        question:      "คำสั่งใดดู VLAN ทั้งหมดบน Cisco Switch?",
        options:       ["show vlan", "show vlan brief", "display vlan all", "show interface vlan"],
        correctAnswer: "show vlan brief",
        explanation:   "show vlan brief แสดงสรุป VLAN ทั้งหมด ชื่อ และ Port ที่อยู่ใน VLAN นั้น",
        difficulty:    "Easy",
      },
    ],
  },

  /* 5 ─ Routing Basics ────────────────────────────────────────────── */
  {
    id:             "routing-basics-quiz",
    title:          "Routing Basics Quiz",
    description:    "ทดสอบความเข้าใจหลักการ Routing, Routing Table, Static Route และ Default Route",
    category:       "Routing",
    level:          "Intermediate",
    duration:       "12 min",
    passingScore:   70,
    relatedCourseId: "routing-fundamentals",
    relatedLessonId: "routing-basics",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "Router ตัดสินใจส่ง Packet ไปที่ไหนโดยอ้างอิงจากอะไร?",
        options:       ["MAC Address Table", "ARP Table", "Routing Table", "VLAN Database"],
        correctAnswer: "Routing Table",
        explanation:   "Router ใช้ Routing Table เพื่อค้นหา Best Path สำหรับ Destination IP ของแต่ละ Packet",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "คำสั่งใดสร้าง Default Route บน Cisco Router?",
        options:       [
          "ip route 0.0.0.0 0.0.0.0 [next-hop]",
          "ip route default [next-hop]",
          "default-route [next-hop]",
          "ip route 255.255.255.255 0.0.0.0 [next-hop]",
        ],
        correctAnswer: "ip route 0.0.0.0 0.0.0.0 [next-hop]",
        explanation:   "Default Route ใช้ 0.0.0.0/0 ซึ่ง Match ทุก Destination ที่ไม่มีใน Routing Table",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "true-false",
        question:      "Administrative Distance ของ Static Route มีค่า 1",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Static Route มี AD = 1 ต่ำกว่า Dynamic Routing Protocol เกือบทั้งหมด ยกเว้น Connected (AD=0)",
        difficulty:    "Medium",
      },
      {
        id: "q4", type: "multiple-choice",
        question:      "Longest Prefix Match คืออะไร?",
        options:       [
          "Router เลือก Route ที่มี AD ต่ำที่สุด",
          "Router เลือก Route ที่มี Prefix ยาวที่สุด (Specific ที่สุด)",
          "Router เลือก Route ที่เพิ่มล่าสุด",
          "Router ส่ง Packet ไปทุก Route",
        ],
        correctAnswer: "Router เลือก Route ที่มี Prefix ยาวที่สุด (Specific ที่สุด)",
        explanation:   "Longest Prefix Match = Router เลือก Route ที่ Match Destination ได้ Specific ที่สุด เช่น /28 ชนะ /24",
        difficulty:    "Hard",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "คำสั่งใดดู Routing Table บน Cisco Router?",
        options:       ["show route", "display ip route", "show ip route", "ip route show"],
        correctAnswer: "show ip route",
        explanation:   "show ip route แสดง Routing Table ทั้งหมดพร้อม Protocol, AD, Metric และ Next-hop",
        difficulty:    "Easy",
      },
      {
        id: "q6", type: "true-false",
        question:      "Connected Route มี Administrative Distance เป็น 0",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Connected Route คือ Network ที่ Interface ของ Router เชื่อมต่ออยู่โดยตรง มี AD = 0 และน่าเชื่อถือที่สุด",
        difficulty:    "Medium",
      },
      {
        id: "q7", type: "multiple-choice",
        question:      "Floating Static Route คืออะไร?",
        options:       [
          "Static Route ที่ AD สูงกว่า Primary Route ใช้เป็น Backup",
          "Static Route ที่เปลี่ยน Next-hop อัตโนมัติ",
          "Static Route สำหรับ IPv6 เท่านั้น",
          "Default Route แบบ Dynamic",
        ],
        correctAnswer: "Static Route ที่ AD สูงกว่า Primary Route ใช้เป็น Backup",
        explanation:   "Floating Static Route ตั้ง AD สูงกว่า Primary จะ Active เฉพาะเมื่อ Primary Route หายไป",
        difficulty:    "Hard",
      },
    ],
  },

  /* 6 ─ OSPF Basics ───────────────────────────────────────────────── */
  {
    id:             "ospf-basics-quiz",
    title:          "OSPF Basics Quiz",
    description:    "ทดสอบความเข้าใจ OSPF, Neighbor Relationship, LSA, DR/BDR และการ Config OSPF Single Area",
    category:       "Routing",
    level:          "Intermediate",
    duration:       "15 min",
    passingScore:   70,
    relatedCourseId: "ospf-basics",
    relatedLessonId: "ospf-config",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "OSPF ใช้ Algorithm อะไรในการคำนวณ Best Path?",
        options:       ["Bellman-Ford", "Dijkstra (SPF)", "Distance Vector", "Diffusing Update"],
        correctAnswer: "Dijkstra (SPF)",
        explanation:   "OSPF ใช้ Dijkstra Shortest Path First (SPF) Algorithm คำนวณ Lowest Cost Path จาก LSDB",
        difficulty:    "Medium",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "OSPF Neighbor ต้องตรงกันในเรื่องใดจึงจะ Form Adjacency ได้?",
        options:       [
          "Area ID, Hello/Dead Timer, Subnet, MTU",
          "VLAN ID และ MAC Address",
          "Router Name และ IP Class",
          "Bandwidth และ Duplex เท่านั้น",
        ],
        correctAnswer: "Area ID, Hello/Dead Timer, Subnet, MTU",
        explanation:   "OSPF Neighbor ต้องตรงกันใน: Area ID, Hello/Dead Timers, Subnet, MTU, Authentication และ Stub Flag",
        difficulty:    "Hard",
      },
      {
        id: "q3", type: "true-false",
        question:      "OSPF Administrative Distance มีค่า 110",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "OSPF มี AD = 110 ต่ำกว่า RIP (120) แต่สูงกว่า EIGRP (90) และ Static Route (1)",
        difficulty:    "Easy",
      },
      {
        id: "q4", type: "multiple-choice",
        question:      "คำสั่งใดเริ่มต้น OSPF Process 1 บน Cisco Router?",
        options:       ["ospf enable 1", "router ospf 1", "ospf process 1", "start ospf 1"],
        correctAnswer: "router ospf 1",
        explanation:   "ใช้ router ospf [process-id] ใน Global Config Mode เพื่อเข้า OSPF Config ตามด้วย network statement",
        difficulty:    "Easy",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "Wildcard Mask ของ /24 คืออะไร?",
        options:       ["255.255.255.0", "0.0.0.255", "0.255.255.255", "255.0.0.0"],
        correctAnswer: "0.0.0.255",
        explanation:   "Wildcard Mask คือ Inverse ของ Subnet Mask ดังนั้น /24 (255.255.255.0) มี Wildcard = 0.0.0.255",
        difficulty:    "Medium",
      },
      {
        id: "q6", type: "true-false",
        question:      "Passive Interface ใน OSPF จะไม่ส่ง Hello Packet ออกไป",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Passive Interface ประกาศ Network ใน OSPF แต่ไม่ส่ง Hello ทำให้ไม่ Form Neighbor ผ่าน Interface นั้น",
        difficulty:    "Medium",
      },
      {
        id: "q7", type: "multiple-choice",
        question:      "DR (Designated Router) ใน OSPF มีหน้าที่อะไร?",
        options:       [
          "ส่ง LSA แทน Router ทุกตัวใน Segment",
          "เป็น Default Gateway ของ Subnet",
          "คำนวณ Routing Table แทน Router อื่น",
          "จัดการ VLAN บน Segment นั้น",
        ],
        correctAnswer: "ส่ง LSA แทน Router ทุกตัวใน Segment",
        explanation:   "DR ช่วยลด OSPF Traffic บน Multi-Access Network โดยรวม LSA และส่งแทน Router ทุกตัวใน Segment",
        difficulty:    "Hard",
      },
      {
        id: "q8", type: "multiple-choice",
        question:      "คำสั่งใดดู OSPF Neighbor บน Cisco?",
        options:       ["show ospf neighbor", "show ip ospf neighbor", "display ospf peer", "show neighbor ospf"],
        correctAnswer: "show ip ospf neighbor",
        explanation:   "show ip ospf neighbor แสดง Neighbor ID, State, Dead Time, Interface ของ OSPF Neighbor ทั้งหมด",
        difficulty:    "Easy",
      },
    ],
  },

  /* 7 ─ Firewall & ACL ────────────────────────────────────────────── */
  {
    id:             "firewall-acl-quiz",
    title:          "Firewall & ACL Quiz",
    description:    "ทดสอบความเข้าใจ ACL Standard/Extended, Implicit Deny, การ Apply ACL และ Firewall Concepts",
    category:       "Security",
    level:          "Intermediate",
    duration:       "15 min",
    passingScore:   70,
    relatedCourseId: "firewall-acl",
    relatedLessonId: "extended-acl",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "Standard ACL กรอง Traffic ตามอะไร?",
        options:       ["Source IP เท่านั้น", "Destination IP เท่านั้น", "Source และ Destination IP", "Port Number"],
        correctAnswer: "Source IP เท่านั้น",
        explanation:   "Standard ACL (1-99, 1300-1999) กรองได้เฉพาะ Source IP ต่างจาก Extended ACL ที่กรองได้หลายอย่าง",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "true-false",
        question:      "ACL อ่าน Rule จากบนลงล่างและหยุดที่ Rule แรกที่ Match",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "ACL ประมวลผล Rule แบบ Top-Down เมื่อพบ Match จะหยุดและไม่อ่าน Rule ถัดไป ลำดับ Rule จึงสำคัญมาก",
        difficulty:    "Easy",
      },
      {
        id: "q3", type: "multiple-choice",
        question:      "Implicit Deny คืออะไร?",
        options:       [
          "Rule พิเศษที่ Permit ทุก Traffic",
          "Rule ที่ซ่อนอยู่ท้าย ACL ที่ Deny ทุก Traffic ที่ไม่ Match",
          "การ Deny แบบ Explicit ด้วยคำสั่ง deny any",
          "Rule ที่ใช้เฉพาะ Extended ACL",
        ],
        correctAnswer: "Rule ที่ซ่อนอยู่ท้าย ACL ที่ Deny ทุก Traffic ที่ไม่ Match",
        explanation:   "ทุก ACL มี Implicit Deny all ที่ท้ายเสมอ ถ้า Traffic ไม่ Match Rule ใดเลยจะถูก Deny",
        difficulty:    "Medium",
      },
      {
        id: "q4", type: "multiple-choice",
        question:      "Extended ACL ควร Apply ที่ไหน?",
        options:       ["ใกล้ Destination มากที่สุด", "ใกล้ Source มากที่สุด", "บน Core Switch", "ที่ตรงกลาง Network"],
        correctAnswer: "ใกล้ Source มากที่สุด",
        explanation:   "Extended ACL Apply ใกล้ Source เพื่อกัน Traffic ตั้งแต่ต้น ไม่ให้เปลืองแบนด์วิดธ์ขนส่ง Traffic ที่จะ Deny อยู่ดี",
        difficulty:    "Medium",
      },
      {
        id: "q5", type: "true-false",
        question:      "Named ACL อ่านง่ายกว่า Numbered ACL",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Named ACL ใช้ชื่อแทนตัวเลข เช่น ip access-list extended BLOCK_HTTP ทำให้เข้าใจง่ายกว่า access-list 101",
        difficulty:    "Easy",
      },
      {
        id: "q6", type: "multiple-choice",
        question:      "คำสั่งใด Apply ACL 101 บน Interface fa0/0 ขาเข้า?",
        options:       [
          "ip access-group 101 in",
          "ip access-list 101 inbound",
          "access-list apply 101 in",
          "ip acl 101 inbound fa0/0",
        ],
        correctAnswer: "ip access-group 101 in",
        explanation:   "ใช้ ip access-group [acl-name/number] in|out บน Interface เพื่อ Apply ACL",
        difficulty:    "Medium",
      },
      {
        id: "q7", type: "multiple-choice",
        question:      "Stateful Firewall ต่างจาก Stateless (ACL) อย่างไร?",
        options:       [
          "Stateful ติดตาม Connection State และอนุญาต Return Traffic อัตโนมัติ",
          "Stateful เร็วกว่า Stateless เสมอ",
          "Stateless ติดตาม Session ได้",
          "Stateful ใช้ได้เฉพาะ IPv6",
        ],
        correctAnswer: "Stateful ติดตาม Connection State และอนุญาต Return Traffic อัตโนมัติ",
        explanation:   "Stateful Firewall รู้ว่า Packet เป็นส่วนหนึ่งของ Connection ที่เปิดไว้แล้ว จึงอนุญาต Return Traffic โดยไม่ต้องเขียน Rule กลับ",
        difficulty:    "Hard",
      },
    ],
  },

  /* 8 ─ Network Troubleshooting ───────────────────────────────────── */
  {
    id:             "network-troubleshooting-quiz",
    title:          "Network Troubleshooting Quiz",
    description:    "ทดสอบความเข้าใจ Troubleshooting Methodology, Ping, Traceroute, และการวิเคราะห์ปัญหา Network",
    category:       "Foundation",
    level:          "Intermediate",
    duration:       "12 min",
    passingScore:   70,
    relatedCourseId: "network-troubleshooting",
    relatedLessonId: "ping-traceroute",
    questions: [
      {
        id: "q1", type: "multiple-choice",
        question:      "Bottom-Up Approach ในการ Troubleshoot หมายความว่าอะไร?",
        options:       [
          "เริ่มจาก Layer 7 แล้วลงมา",
          "เริ่มจาก Layer 1 (Physical) แล้วขึ้นมาถึง Layer 7",
          "เริ่มจาก Router แล้วไปหา PC",
          "เริ่มจาก Application แล้วตรวจ Software",
        ],
        correctAnswer: "เริ่มจาก Layer 1 (Physical) แล้วขึ้นมาถึง Layer 7",
        explanation:   "Bottom-Up ตรวจตาม OSI Layer จาก L1 (สาย, LED) ขึ้นไปเรื่อย ๆ ตัดความเป็นไปได้ทีละ Layer",
        difficulty:    "Easy",
      },
      {
        id: "q2", type: "multiple-choice",
        question:      "Ping ได้รับ 'Request Timed Out' หมายความว่าอะไร?",
        options:       [
          "เครื่องปลายทางปิดอยู่หรือ Firewall บล็อก ICMP",
          "DNS แปลงชื่อไม่ได้",
          "Routing Loop เกิดขึ้น",
          "สาย LAN หลวม",
        ],
        correctAnswer: "เครื่องปลายทางปิดอยู่หรือ Firewall บล็อก ICMP",
        explanation:   "Request Timed Out = ส่ง ICMP Echo ออกไปแต่ไม่ได้รับ Reply อาจเพราะ Host ไม่ตอบ หรือ Firewall Drop ICMP",
        difficulty:    "Medium",
      },
      {
        id: "q3", type: "true-false",
        question:      "Traceroute แสดงเส้นทาง Routing ทีละ Hop",
        options:       ["True", "False"],
        correctAnswer: "True",
        explanation:   "Traceroute ส่ง Packet ด้วย TTL เพิ่มทีละ 1 แต่ละ Hop ที่ลด TTL จนเป็น 0 จะตอบกลับ ICMP Time Exceeded",
        difficulty:    "Easy",
      },
      {
        id: "q4", type: "multiple-choice",
        question:      "Ping ไป IP ได้แต่เปิดเว็บไม่ได้ ปัญหาน่าจะเป็นอะไร?",
        options:       ["IP Conflict", "DNS ปัญหา", "Routing Loop", "Port ของ Switch ผิด"],
        correctAnswer: "DNS ปัญหา",
        explanation:   "Ping IP ผ่าน = Layer 3 ใช้งานได้ แต่เปิดเว็บ (ชื่อ Domain) ไม่ได้ = DNS แปลง Domain เป็น IP ไม่ได้",
        difficulty:    "Medium",
      },
      {
        id: "q5", type: "multiple-choice",
        question:      "คำสั่งใดดู ARP Table บน Windows?",
        options:       ["show arp", "arp -a", "ipconfig /arp", "netstat -arp"],
        correctAnswer: "arp -a",
        explanation:   "arp -a แสดง ARP Cache ของ Windows แสดง IP ↔ MAC Mapping ที่เก็บไว้",
        difficulty:    "Easy",
      },
      {
        id: "q6", type: "true-false",
        question:      "Duplex Mismatch ทำให้ Network ช้าแต่ไม่ได้ทำให้ Ping ผิดพลาด",
        options:       ["True", "False"],
        correctAnswer: "False",
        explanation:   "Duplex Mismatch ทำให้เกิด Collisions และ Late Collisions อย่างมาก อาจทำให้ Packet Loss สูง และ Ping ผิดพลาดได้",
        difficulty:    "Hard",
      },
      {
        id: "q7", type: "multiple-choice",
        question:      "*** ใน Output ของ Traceroute หมายความว่าอะไร?",
        options:       [
          "Hop นั้น Response เร็วมาก",
          "Hop นั้นไม่ตอบ ICMP (Firewall หรือ Timeout)",
          "Packet ถูก Encrypt",
          "ไม่มี Route ถึงปลายทาง",
        ],
        correctAnswer: "Hop นั้นไม่ตอบ ICMP (Firewall หรือ Timeout)",
        explanation:   "*** หมายถึงไม่ได้รับ Response จาก Hop นั้น อาจเพราะ Firewall บล็อก ICMP หรือ Hop นั้น Timeout",
        difficulty:    "Medium",
      },
      {
        id: "q8", type: "multiple-choice",
        question:      "เน็ตหลุดเป็นช่วง ๆ สาเหตุที่พบบ่อยคืออะไร?",
        options:       [
          "DNS ผิดพลาด",
          "Duplex Mismatch, สายเสีย หรือ ISP ปัญหา",
          "ACL บล็อก Traffic",
          "VLAN Config ผิด",
        ],
        correctAnswer: "Duplex Mismatch, สายเสีย หรือ ISP ปัญหา",
        explanation:   "เน็ตหลุดเป็นช่วง ๆ มักเกิดจาก Duplex/Speed Mismatch, สาย LAN เสื่อม, ISP Line มีปัญหา หรือ Interface Flapping",
        difficulty:    "Medium",
      },
    ],
  },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

export const quizStats = {
  total:        quizzes.length,
  beginner:     quizzes.filter((q) => q.level === "Beginner").length,
  intermediate: quizzes.filter((q) => q.level === "Intermediate").length,
  advanced:     quizzes.filter((q) => q.level === "Advanced").length,
};

export const quizCategories = Array.from(new Set(quizzes.map((q) => q.category)));
