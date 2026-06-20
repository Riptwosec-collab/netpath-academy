/* ─── Types ─────────────────────────────────────────────────────── */
export type CourseLevel  = "Beginner" | "Intermediate" | "Advanced";
export type LessonStatus = "completed" | "in-progress" | "not-started" | "locked";
export type LessonType   = "lesson" | "lab" | "quiz";

export interface ContentSection {
  heading: string;
  body:    string;
}

export interface CommandItem {
  title:       string;
  command:     string;
  description: string;
}

export interface Lesson {
  id:             string;
  title:          string;
  duration:       string;
  type:           LessonType;
  status:         LessonStatus;
  objectives:     string[];
  content:        ContentSection[];
  diagramText:    string;
  commands:       CommandItem[];
  commonMistakes: string[];
  keyTakeaways:   string[];
  summary:        string;
  prevLessonId:   string | null;
  nextLessonId:   string | null;
}

export interface CourseModule {
  id:          string;
  title:       string;
  description: string;
  lessons:     Lesson[];
}

export interface Course {
  id:          string;
  title:       string;
  description: string;
  level:       CourseLevel;
  category:    string;
  duration:    string;
  progress:    number;
  roleTarget:  string;
  relatedLabs: string[];
  modules:     CourseModule[];
}

/* ─── Mock Data ─────────────────────────────────────────────────── */
export const courses: Course[] = [

  /* ══════════════════════════════════════════════════════════════
   * 1. Network Fundamentals
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "network-fundamentals",
    title:       "Network Fundamentals",
    description: "เรียนพื้นฐาน Network ตั้งแต่ OSI Model, TCP/IP, IP Address, Gateway, DNS, DHCP และ Packet Flow",
    level:       "Beginner",
    category:    "Foundation",
    duration:    "4 hours",
    progress:    35,
    roleTarget:  "IT Support / Junior Network Engineer",
    relatedLabs: ["basic-ip", "dhcp-troubleshoot"],
    modules: [
      {
        id:          "net-basics",
        title:       "พื้นฐานระบบเครือข่าย",
        description: "เข้าใจภาพรวมว่า Network ทำงานอย่างไรและอุปกรณ์หลักที่ต้องรู้จัก",
        lessons: [
          {
            id:       "what-is-network",
            title:    "Network คืออะไร",
            duration: "15 min",
            type:     "lesson",
            status:   "completed",
            objectives: [
              "เข้าใจความหมายและประเภทของ Network",
              "รู้จักอุปกรณ์พื้นฐาน: Switch, Router, Firewall, Access Point",
              "เข้าใจ Client-Server Model และ Packet Flow เบื้องต้น",
            ],
            content: [
              {
                heading: "Network คืออะไร",
                body:    "Network คือการเชื่อมต่ออุปกรณ์หลายเครื่องเข้าด้วยกัน เพื่อให้สามารถสื่อสาร แชร์ข้อมูล และใช้งาน Resource ร่วมกันได้ เช่น File Server, Printer, Application Server และ Internet ประเภทของ Network แบ่งเป็น LAN (Local Area Network) ใช้ในออฟฟิศหรือบ้าน, WAN (Wide Area Network) เชื่อมต่อระหว่างสาขา และ Internet ซึ่งเป็น Public WAN ที่ใหญ่ที่สุด",
              },
              {
                heading: "อุปกรณ์หลักใน Network",
                body:    "Switch ใช้เชื่อมต่ออุปกรณ์ใน LAN เดียวกัน ทำงานที่ Layer 2 ใช้ MAC Address ในการส่งข้อมูล Router ใช้เชื่อมต่อคนละ Network ทำงานที่ Layer 3 ใช้ IP Address ในการ Route Firewall ใช้ควบคุมความปลอดภัยของ Traffic ที่เข้า-ออก Network Access Point (AP) ใช้กระจายสัญญาณ Wi-Fi ให้อุปกรณ์ไร้สาย",
              },
              {
                heading: "Packet Flow เบื้องต้น",
                body:    "เวลาผู้ใช้เปิดเว็บไซต์ เครื่อง PC จะสร้าง Packet แล้วส่งออกผ่าน Switch ใน LAN → Router → Firewall → ISP → Internet จนถึง Web Server แล้ว Server ก็ส่ง Response กลับมาตามเส้นทางเดิม การเข้าใจ Packet Flow ช่วยให้ Troubleshoot ปัญหา Network ได้อย่างเป็นระบบ",
              },
            ],
            diagramText:    "PC → Switch → Router → Firewall → ISP → Internet → Web Server",
            commands: [
              { title: "ดู IP บน Windows",    command: "ipconfig /all",    description: "แสดง IP Address, Subnet Mask, Default Gateway และ DNS Server" },
              { title: "ทดสอบ Connectivity", command: "ping 8.8.8.8",     description: "ทดสอบว่าเครื่องสามารถออก Internet ได้หรือไม่" },
              { title: "ดู IP บน Linux/Mac", command: "ip addr show",     description: "แสดง Network Interface และ IP Address บน Linux/macOS" },
            ],
            commonMistakes: [
              "จำหน้าที่ Switch กับ Router สลับกัน — Switch อยู่ใน LAN, Router เชื่อม Network",
              "คิดว่า Wi-Fi และ Internet คือสิ่งเดียวกัน — Wi-Fi คือวิธีเชื่อมต่อ LAN ไม่ใช่ Internet",
              "แก้ปัญหาโดยไม่เช็ก IP Address ก่อน — ควรเริ่มจาก Physical → IP → Gateway",
            ],
            keyTakeaways: [
              "Network คือการเชื่อมต่ออุปกรณ์เพื่อแชร์ข้อมูลและ Resource",
              "Switch ทำงานใน LAN (Layer 2), Router เชื่อม Network (Layer 3)",
              "การเข้าใจ Packet Flow ช่วย Troubleshoot ปัญหาได้อย่างมีระบบ",
            ],
            summary:     "บทนี้ทำให้เข้าใจภาพรวมของ Network อุปกรณ์หลักที่พบในงานจริง และเส้นทางที่ Packet ไหลจาก PC ไปสู่ Internet",
            prevLessonId: null,
            nextLessonId: "osi-model",
          },
          {
            id:       "osi-model",
            title:    "OSI Model แบบเข้าใจง่าย",
            duration: "25 min",
            type:     "lesson",
            status:   "in-progress",
            objectives: [
              "เข้าใจ OSI Model ทั้ง 7 Layer และหน้าที่ของแต่ละ Layer",
              "รู้ว่า Protocol และอุปกรณ์แต่ละอย่างอยู่ Layer ไหน",
              "ใช้ OSI Model เป็น Framework ในการ Troubleshoot Network",
            ],
            content: [
              {
                heading: "OSI Model คืออะไร",
                body:    "OSI (Open Systems Interconnection) Model คือโมเดลมาตรฐานที่ใช้อธิบายการสื่อสารของระบบ Network แบ่งออกเป็น 7 Layer แต่ละ Layer มีหน้าที่เฉพาะและทำงานร่วมกัน ช่วยให้ Engineers เข้าใจและ Troubleshoot ปัญหา Network ได้อย่างเป็นระบบ",
              },
              {
                heading: "7 Layers และหน้าที่",
                body:    "Layer 7 Application — Interface กับ User (HTTP, DNS, FTP, SMTP) | Layer 6 Presentation — แปลงรูปแบบข้อมูล Encryption, Compression | Layer 5 Session — จัดการ Session การสื่อสาร | Layer 4 Transport — TCP (Reliable), UDP (Fast), Port Number | Layer 3 Network — IP Address, Routing (Router ทำงานที่นี่) | Layer 2 Data Link — MAC Address, Frame (Switch ทำงานที่นี่) | Layer 1 Physical — สายสัญญาณ, Bit, สัญญาณไฟฟ้า",
              },
              {
                heading: "ใช้ OSI กับ Troubleshooting",
                body:    "เวลาแก้ปัญหา Network ให้ไล่จาก Layer 1 ขึ้นไป: ตรวจสาย LED (L1) → ตรวจ VLAN MAC (L2) → ตรวจ IP Route (L3) → ตรวจ Port Firewall (L4) → ตรวจ DNS App (L7) วิธีนี้ช่วยตัดความเป็นไปได้ทีละ Layer ทำให้หาต้นเหตุได้เร็ว",
              },
            ],
            diagramText:    "L7 Application → L6 Presentation → L5 Session → L4 Transport → L3 Network → L2 Data Link → L1 Physical",
            commands: [
              { title: "ตรวจ Layer 3 IP",    command: "ipconfig /all",     description: "ดู IP, Subnet, Gateway (Layer 3)" },
              { title: "Trace เส้นทาง",      command: "tracert 8.8.8.8",   description: "ดูเส้นทาง Routing Layer 3 ทีละ Hop" },
              { title: "ดู ARP (Layer 2)",   command: "arp -a",            description: "ดู MAC-to-IP mapping ที่ Layer 2" },
            ],
            commonMistakes: [
              "ข้าม Layer 1 แล้วไปแก้ Firewall ทันที — สายหลุดก็ทำให้ไม่ผ่านได้",
              "ไม่แยกว่า DNS ล้มกับ Internet ล้มต่างกัน — Ping IP ผ่านแต่ Ping ชื่อไม่ผ่าน = DNS ปัญหา",
              "จำ Layer ผิด — ท่อง 'Please Do Not Throw Sausage Pizza Away' ช่วยได้",
            ],
            keyTakeaways: [
              "OSI มี 7 Layer แต่ละ Layer มีหน้าที่ชัดเจน",
              "Switch ทำงาน Layer 2, Router ทำงาน Layer 3",
              "Troubleshoot จาก Layer 1 ขึ้นไปเสมอ — อย่าข้าม",
            ],
            summary:     "OSI Model เป็นเครื่องมือสำคัญของ Network Engineer ช่วยให้วิเคราะห์และแก้ปัญหาได้อย่างเป็นระบบโดยเริ่มจาก Physical Layer ขึ้นไป",
            prevLessonId: "what-is-network",
            nextLessonId: "tcp-ip",
          },
        ],
      },
      {
        id:          "tcp-ip-protocols",
        title:       "TCP/IP & Core Protocols",
        description: "เข้าใจ TCP/IP Stack, DNS, DHCP และ Gateway ที่ใช้จริงในงาน",
        lessons: [
          {
            id:       "tcp-ip",
            title:    "TCP/IP Protocol Stack",
            duration: "20 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจความแตกต่างของ TCP และ UDP",
              "รู้จัก Common Port Numbers ที่ใช้จริง",
              "เข้าใจ 3-Way Handshake ของ TCP",
            ],
            content: [
              {
                heading: "TCP vs UDP",
                body:    "TCP (Transmission Control Protocol) คือ Protocol ที่มีการ Acknowledge ว่าข้อมูลถึงปลายทางหรือไม่ มีการส่งซ้ำถ้าหายหลายใช้กับ HTTP, FTP, Email ที่ต้องการความน่าเชื่อถือ UDP (User Datagram Protocol) คือ Protocol ที่ส่งข้อมูลออกไปโดยไม่รอ Acknowledge เร็วกว่า TCP แต่อาจสูญหายได้ ใช้กับ Video Streaming, VoIP, DNS",
              },
              {
                heading: "Common Port Numbers",
                body:    "Port คือช่องทางที่ Protocol ใช้สื่อสาร เช่น HTTP = 80, HTTPS = 443, FTP = 21, SSH = 22, DNS = 53, DHCP = 67/68, SMTP = 25, RDP = 3389 การรู้ Port Numbers ช่วย Configure Firewall และ Troubleshoot ได้ถูกต้อง",
              },
              {
                heading: "TCP 3-Way Handshake",
                body:    "การเชื่อมต่อ TCP ต้องผ่าน 3 ขั้นตอน: 1) Client ส่ง SYN (Synchronize) ไปหา Server 2) Server ตอบ SYN-ACK 3) Client ส่ง ACK ยืนยัน หลังจากนี้จึงเริ่มส่งข้อมูลได้ การ Handshake ทำให้มั่นใจว่าทั้งสองฝ่ายพร้อมสื่อสาร",
              },
            ],
            diagramText:    "Client SYN → Server | Server SYN-ACK → Client | Client ACK → Server | [Data Transfer Begins]",
            commands: [
              { title: "ดู Active Connections", command: "netstat -an",        description: "แสดง TCP/UDP Connections ทั้งหมดและ Port ที่เปิดอยู่" },
              { title: "ทดสอบ TCP Port",        command: "telnet 192.168.1.1 80", description: "ทดสอบว่า Port เปิดอยู่หรือไม่ (ถ้าไม่มี telnet ใช้ Test-NetConnection)" },
              { title: "Windows Port Test",     command: "Test-NetConnection 8.8.8.8 -Port 53", description: "ทดสอบ TCP Port บน Windows (PowerShell)" },
            ],
            commonMistakes: [
              "ใช้ UDP กับงานที่ต้องการ Reliability — ควรใช้ TCP สำหรับ File Transfer",
              "ไม่รู้ Port Number ทำให้ Configure Firewall ผิด — ควรจำ Common Port ไว้",
              "ลืมว่า DNS ใช้ UDP port 53 (แต่ใช้ TCP ด้วยถ้า Response ใหญ่)",
            ],
            keyTakeaways: [
              "TCP = Reliable, Connection-Oriented | UDP = Fast, Connectionless",
              "จำ Port สำคัญ: HTTP 80, HTTPS 443, SSH 22, DNS 53",
              "TCP ต้อง 3-Way Handshake ก่อนส่งข้อมูลจริง",
            ],
            summary:     "TCP/IP เป็นหัวใจของการสื่อสารบน Internet การเข้าใจ TCP vs UDP และ Port Numbers ช่วยให้ Configure Firewall และ Troubleshoot ได้แม่นยำ",
            prevLessonId: "osi-model",
            nextLessonId: "dns-dhcp",
          },
          {
            id:       "dns-dhcp",
            title:    "DNS, DHCP & Gateway",
            duration: "20 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "เข้าใจการทำงานของ DNS และ DHCP",
              "รู้บทบาทของ Default Gateway",
              "Troubleshoot ปัญหา DNS/DHCP เบื้องต้น",
            ],
            content: [
              {
                heading: "DNS — แปลงชื่อเป็น IP",
                body:    "DNS (Domain Name System) ทำหน้าที่แปลง Domain Name เช่น www.google.com ให้เป็น IP Address เช่น 142.250.72.4 เพื่อให้เครื่อง PC รู้ว่าต้องเชื่อมต่อไปที่ IP ไหน DNS Server ที่นิยมใช้ เช่น 8.8.8.8 (Google), 1.1.1.1 (Cloudflare)",
              },
              {
                heading: "DHCP — แจก IP อัตโนมัติ",
                body:    "DHCP (Dynamic Host Configuration Protocol) ทำหน้าที่แจก IP Address, Subnet Mask, Default Gateway และ DNS Server ให้กับ Client อัตโนมัติ ทำงานผ่าน 4 ขั้นตอน: DISCOVER → OFFER → REQUEST → ACK (DORA) ทำให้ไม่ต้องตั้ง IP แบบ Manual ทุกเครื่อง",
              },
              {
                heading: "Default Gateway",
                body:    "Default Gateway คือ IP Address ของ Router ที่ PC ใช้เป็นทางออกไปยัง Network อื่นหรือ Internet เมื่อ PC ต้องการส่ง Packet ไปยัง IP ที่ไม่ได้อยู่ใน Subnet เดียวกัน มันจะส่งไปให้ Gateway เสมอ ถ้า Gateway ผิดหรือไม่มี PC จะออก Internet ไม่ได้",
              },
            ],
            diagramText:    "PC → DHCP Server (IP, GW, DNS) | PC → DNS Server (domain→IP) | PC → Gateway → Internet",
            commands: [
              { title: "ต่ออาย DHCP ใหม่",     command: "ipconfig /renew",         description: "ขอ IP ใหม่จาก DHCP Server" },
              { title: "ล้าง DNS Cache",         command: "ipconfig /flushdns",      description: "ล้าง DNS Cache เมื่อเว็บไม่โหลดหรือ DNS ผิด" },
              { title: "ทดสอบ DNS",              command: "nslookup google.com",     description: "ตรวจสอบว่า DNS แก้ชื่อได้ถูกต้อง" },
            ],
            commonMistakes: [
              "ตั้ง DNS ผิดทำให้เปิดเว็บไม่ได้แต่ Ping IP ผ่าน — ลอง nslookup ก่อน",
              "ลืมตั้ง Default Gateway ทำให้ออก Internet ไม่ได้",
              "IP ชน (Duplicate) เพราะตั้ง Static IP ในช่วงที่ DHCP แจก — ควร Exclude IP สำหรับ Static Device",
            ],
            keyTakeaways: [
              "DNS แปลง Domain → IP ใช้ port UDP 53",
              "DHCP แจก IP อัตโนมัติผ่าน DORA Process",
              "Default Gateway คือ IP ของ Router ที่ PC ใช้ออก Network อื่น",
            ],
            summary:     "DNS, DHCP และ Gateway ทำงานร่วมกันให้ PC สามารถออก Internet ได้อัตโนมัติ การเข้าใจทั้ง 3 อย่างช่วย Troubleshoot ปัญหาการเชื่อมต่อได้รวดเร็ว",
            prevLessonId: "tcp-ip",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 2. IP Address & Subnetting
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "ip-subnetting",
    title:       "IP Address & Subnetting",
    description: "เรียนรู้ IP Address Class, Subnet Mask, CIDR และการแบ่ง Subnet อย่างมืออาชีพ",
    level:       "Beginner",
    category:    "Foundation",
    duration:    "3 hours",
    progress:    0,
    roleTarget:  "Junior Network Engineer",
    relatedLabs: ["basic-ip"],
    modules: [
      {
        id:          "ip-concepts",
        title:       "IP Address Concepts",
        description: "เข้าใจโครงสร้าง IP Address และการแบ่ง Class",
        lessons: [
          {
            id:       "ip-classes",
            title:    "IP Address Class & Structure",
            duration: "20 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจโครงสร้าง IPv4 Address (32-bit)",
              "แยกแยะ Class A, B, C, Private IP ได้",
              "รู้จัก Public IP vs Private IP",
            ],
            content: [
              {
                heading: "โครงสร้าง IPv4 Address",
                body:    "IPv4 Address คือตัวเลข 32-bit แบ่งเป็น 4 ส่วน (Octet) แต่ละส่วนคือตัวเลข 0-255 คั่นด้วยจุด เช่น 192.168.1.10 ใน Binary คือ 11000000.10101000.00000001.00001010 ทุก IP แบ่งเป็น 2 ส่วน คือ Network Part และ Host Part ขึ้นอยู่กับ Subnet Mask",
              },
              {
                heading: "IP Address Classes",
                body:    "Class A: 1.0.0.0 – 126.255.255.255 (Subnet /8) ใช้สำหรับ Network ขนาดใหญ่ | Class B: 128.0.0.0 – 191.255.255.255 (Subnet /16) | Class C: 192.0.0.0 – 223.255.255.255 (Subnet /24) เหมาะกับ LAN ทั่วไป | Private IP ใช้ใน LAN: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
              },
              {
                heading: "Public vs Private IP",
                body:    "Private IP ใช้ภายใน LAN ไม่ Route บน Internet ต้องใช้ NAT เพื่อออก Internet Public IP คือ IP ที่ ISP ให้มาและ Route บน Internet ได้ เช่น 8.8.8.8 หลักการ Private IP ช่วยประหยัด IP Address เนื่องจาก IPv4 มีจำกัดเพียง ~4.3 พันล้าน Address",
              },
            ],
            diagramText:    "Class A /8 → 16M hosts | Class B /16 → 65K hosts | Class C /24 → 254 hosts | Private: 10.x.x.x / 172.16-31.x.x / 192.168.x.x",
            commands: [
              { title: "ดู IP ปัจจุบัน",       command: "ipconfig",              description: "ดู IP Address และ Subnet Mask" },
              { title: "ดู IP บน Linux",        command: "ip addr",               description: "ดู IP Address บน Linux" },
              { title: "Convert Binary",        command: "python3 -c \"print(bin(192))\"", description: "แปลง Decimal เป็น Binary ด้วย Python" },
            ],
            commonMistakes: [
              "ใช้ Private IP บน Internet — Private IP ต้องผ่าน NAT ก่อน",
              "สับสน Class A กับ Class C — จำว่า Class A เริ่มที่ 1-126, Class C เริ่มที่ 192",
              "127.x.x.x คือ Loopback ไม่ใช่ Class A ทั่วไป — ใช้ทดสอบ Local Stack",
            ],
            keyTakeaways: [
              "IPv4 = 32-bit แบ่งเป็น 4 Octet (0-255)",
              "Class C (192.168.x.x) ใช้บ่อยที่สุดใน LAN",
              "Private IP ไม่สามารถ Route บน Internet ต้องใช้ NAT",
            ],
            summary:     "การเข้าใจโครงสร้าง IP Address และ Class ทำให้ออกแบบ Network และ Assign IP ได้ถูกต้องตั้งแต่แรก",
            prevLessonId: null,
            nextLessonId: "subnet-mask",
          },
          {
            id:       "subnet-mask",
            title:    "Subnet Mask & CIDR Notation",
            duration: "25 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "เข้าใจ Subnet Mask และ CIDR Notation",
              "คำนวณ Network Address, Broadcast, Host Range",
              "แยก Network Part และ Host Part จาก IP",
            ],
            content: [
              {
                heading: "Subnet Mask คืออะไร",
                body:    "Subnet Mask ใช้บอกว่าส่วนไหนของ IP เป็น Network Part และส่วนไหนเป็น Host Part ค่า 255 ในตำแหน่งไหน แปลว่าบิตนั้นเป็น Network เช่น 255.255.255.0 หมายความว่า 3 Octet แรกเป็น Network, Octet สุดท้ายเป็น Host (/24 ใน CIDR)",
              },
              {
                heading: "CIDR Notation",
                body:    "CIDR (Classless Inter-Domain Routing) ใช้ตัวเลขหลัง / เพื่อบอกจำนวน Network Bits เช่น 192.168.1.0/24 หมายถึง 24 bit แรกเป็น Network ทำให้ Host ได้ 2^8-2 = 254 เครื่อง /24 = 255.255.255.0, /25 = 255.255.255.128, /26 = 255.255.255.192",
              },
              {
                heading: "Network, Broadcast, Host Range",
                body:    "สำหรับ 192.168.1.0/24: Network Address = 192.168.1.0 (Host ทุก bit = 0) Broadcast = 192.168.1.255 (Host ทุก bit = 1) Usable Host Range = 192.168.1.1 ถึง 192.168.1.254 (254 addresses) กฎ: IP แรกสุดและสุดท้ายใช้ไม่ได้",
              },
            ],
            diagramText:    "192.168.1.0/24 → Network:192.168.1.0 | Broadcast:192.168.1.255 | Hosts:.1-.254 (254 total)",
            commands: [
              { title: "คำนวณ Subnet (Linux)", command: "ipcalc 192.168.1.0/24",   description: "แสดง Network, Broadcast, Host Range อัตโนมัติ" },
              { title: "ดู Subnet ปัจจุบัน",  command: "ipconfig",                description: "ดู Subnet Mask ของ Interface" },
              { title: "Python Subnet Calc",  command: "python3 -c \"import ipaddress; n=ipaddress.ip_network('192.168.1.0/24'); print(n.network_address, n.broadcast_address)\"", description: "คำนวณด้วย Python" },
            ],
            commonMistakes: [
              "ใช้ Network Address หรือ Broadcast เป็น Host IP — ทั้งสองใช้ไม่ได้",
              "สับสน /24 กับ 255.255.255.0 — ทั้งสองคือสิ่งเดียวกัน",
              "คิดว่า /24 มี 256 Host — ต้องลบ 2 (Network+Broadcast) เหลือ 254",
            ],
            keyTakeaways: [
              "/24 = 255.255.255.0 = 254 usable hosts",
              "Network Address (host = 0) และ Broadcast (host = all 1s) ใช้ host ไม่ได้",
              "CIDR /prefix บอกจำนวน Network bits",
            ],
            summary:     "Subnet Mask และ CIDR เป็นพื้นฐานที่ Network Engineer ต้องรู้จักและคำนวณได้คล่องเพื่อออกแบบ Network อย่างถูกต้อง",
            prevLessonId: "ip-classes",
            nextLessonId: "subnet-calculation",
          },
        ],
      },
      {
        id:          "subnetting-practice",
        title:       "Subnetting Practice",
        description: "ฝึกแบ่ง Subnet และคำนวณ VLSM สำหรับงานจริง",
        lessons: [
          {
            id:       "subnet-calculation",
            title:    "Subnetting Calculation",
            duration: "30 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "แบ่ง Network ใหญ่เป็น Subnet ย่อย ๆ ได้",
              "คำนวณ Subnet ด้วยมือได้ภายใน 2 นาทีต่อ Subnet",
              "ออกแบบ IP Scheme สำหรับ Network ขนาดเล็กได้",
            ],
            content: [
              {
                heading: "ทำไมต้องแบ่ง Subnet",
                body:    "การแบ่ง Subnet ช่วยลด Broadcast Domain ทำให้ Network มีประสิทธิภาพสูงขึ้น แยก Department ออกจากกันได้ ง่ายต่อการ Manage และเพิ่ม Security เช่น แบ่ง 192.168.1.0/24 ออกเป็น 4 Subnet สำหรับ HR, IT, Finance, Management",
              },
              {
                heading: "วิธีคำนวณ Subnet",
                body:    "ถ้าต้องการ 4 Subnet จาก /24: ต้องยืม 2 bit จาก Host (2^2=4) ทำให้ Prefix เป็น /26 แต่ละ Subnet มี 64 Address (2^6) ใช้ได้ 62 Host เช่น Subnet 1: 192.168.1.0/26 (.0-.63), Subnet 2: .64-.127, Subnet 3: .128-.191, Subnet 4: .192-.255",
              },
              {
                heading: "สูตรจำง่าย",
                body:    "จำนวน Subnet = 2^(borrowed bits) | จำนวน Host ต่อ Subnet = 2^(remaining host bits) - 2 | Block Size = 256 - Subnet Mask ค่าสุดท้าย เช่น /26 Block Size = 256-192 = 64 ดังนั้น Subnet เพิ่มทีละ 64",
              },
            ],
            diagramText:    "192.168.1.0/24 → /26 × 4 Subnets | .0/26 | .64/26 | .128/26 | .192/26 | Each = 62 hosts",
            commands: [
              { title: "ipcalc Subnetting",  command: "ipcalc 192.168.1.0/24 -s 60 60 60 60", description: "คำนวณ 4 Subnet ที่รองรับ 60 hosts แต่ละอัน" },
              { title: "Python Subnets",     command: "python3 -c \"import ipaddress; [print(s) for s in ipaddress.ip_network('192.168.1.0/24').subnets(new_prefix=26)]\"", description: "แสดง /26 subnets ทั้งหมด" },
            ],
            commonMistakes: [
              "ลืมลบ 2 จากจำนวน Host ต่อ Subnet",
              "คำนวณ Block Size ผิด — ใช้ 256 ลบด้วยค่า Octet สุดท้ายของ Mask",
              "ลืมว่า Subnet Address แรกสุดเป็น Network ไม่ใช่ Host",
            ],
            keyTakeaways: [
              "Borrow bits ยิ่งมาก Subnet ยิ่งเยอะแต่ Host ต่อ Subnet ลดลง",
              "Block Size = 256 - Subnet Mask ค่าสุดท้าย",
              "ทุก Subnet มี 1 Network + 1 Broadcast ที่ใช้ไม่ได้",
            ],
            summary:     "การ Subnetting คือทักษะที่ต้องฝึกจนคล่อง Network Engineer ทุกคนต้องคำนวณ Subnet ได้รวดเร็วและแม่นยำ",
            prevLessonId: "subnet-mask",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 3. Switching Essentials
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "switching-essentials",
    title:       "Switching Essentials",
    description: "เรียน LAN, Ethernet, MAC Address, Cisco Switch CLI และ STP เบื้องต้น",
    level:       "Beginner",
    category:    "Switching",
    duration:    "4 hours",
    progress:    0,
    roleTarget:  "Junior Network Engineer",
    relatedLabs: ["vlan-config", "trunk-port"],
    modules: [
      {
        id:          "switch-basics",
        title:       "Switch Fundamentals",
        description: "เข้าใจการทำงานของ Switch และ MAC Address Table",
        lessons: [
          {
            id:       "switch-operations",
            title:    "Switch Operations & MAC Table",
            duration: "25 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจว่า Switch ทำงานอย่างไรที่ Layer 2",
              "รู้จัก MAC Address Table และ CAM Table",
              "เข้าใจ Unicast, Broadcast, Multicast Forwarding",
            ],
            content: [
              {
                heading: "Switch ทำงานอย่างไร",
                body:    "Switch รับ Frame เข้ามาทาง Port แล้วดู Destination MAC Address เพื่อตัดสินใจว่าจะส่ง Frame ออกทาง Port ไหน ถ้ารู้ MAC จะส่งตรง (Unicast Forwarding) ถ้าไม่รู้จะ Flood ออกทุก Port (Unknown Unicast Flooding) ยกเว้น Port ที่รับ Frame มา",
              },
              {
                heading: "MAC Address Table",
                body:    "Switch เรียนรู้ MAC Address จากการสังเกต Source MAC ของ Frame ที่รับเข้ามา แล้วจด MAC → Port ลงใน Table เมื่อรับ Frame ใหม่จะ Lookup Table ก่อน ถ้าเจอ MAC ส่งตรง ถ้าไม่เจอ Flood MAC Entry จะหมดอายุหลัง 300 วินาที (aging timer)",
              },
              {
                heading: "Broadcast Domain vs Collision Domain",
                body:    "แต่ละ Port ของ Switch แยก Collision Domain ออกจากกัน (Full Duplex) แต่ทุก Port อยู่ใน Broadcast Domain เดียวกัน เมื่อมี Broadcast Frame เช่น ARP Request Switch จะ Flood ออกทุก Port ถ้าต้องการแบ่ง Broadcast Domain ต้องใช้ VLAN หรือ Router",
              },
            ],
            diagramText:    "PC-A → Frame[src:AA, dst:BB] → Switch | Switch learns AA=Port1 | Lookup BB → Port2 | Forward to PC-B",
            commands: [
              { title: "ดู MAC Table",         command: "show mac address-table",          description: "แสดง MAC Address Table ทั้งหมด" },
              { title: "ดู MAC เฉพาะ VLAN",    command: "show mac address-table vlan 10",  description: "แสดง MAC Table สำหรับ VLAN 10" },
              { title: "ล้าง MAC Table",        command: "clear mac address-table dynamic", description: "ล้าง Dynamic MAC Entry ทั้งหมด" },
            ],
            commonMistakes: [
              "คิดว่า Switch Flood ทุก Frame — Switch Flood เฉพาะ Unknown Unicast และ Broadcast",
              "ลืมว่า MAC Table มี Aging Timer — Entry หมดอายุเองถ้าไม่มี Traffic",
              "สับสน Switch กับ Hub — Hub Flood ทุก Frame ทุก Port เสมอ",
            ],
            keyTakeaways: [
              "Switch เรียนรู้ MAC Address จาก Source MAC ของ Frame ที่รับเข้ามา",
              "Unknown Unicast → Flood | Known Unicast → Forward | Broadcast → Flood",
              "VLAN คือวิธีเดียวที่แบ่ง Broadcast Domain บน Switch ได้",
            ],
            summary:     "Switch ทำงานโดยใช้ MAC Address Table เพื่อ Forward Frame อย่างชาญฉลาด การเข้าใจกลไกนี้ช่วยให้ Troubleshoot ปัญหา Layer 2 ได้อย่างมีประสิทธิภาพ",
            prevLessonId: null,
            nextLessonId: "switch-cli",
          },
          {
            id:       "switch-cli",
            title:    "Cisco Switch CLI Basics",
            duration: "30 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "เข้าใจโหมดต่าง ๆ ใน Cisco IOS CLI",
              "ตั้งค่าพื้นฐาน: Hostname, Password, Banner",
              "ตรวจสอบสถานะ Switch ด้วย Show Commands",
            ],
            content: [
              {
                heading: "Cisco IOS Modes",
                body:    "User EXEC Mode (>) สำหรับดู Status เบื้องต้น | Privileged EXEC Mode (#) สำหรับดูรายละเอียดและ Troubleshoot ใช้ enable เข้า | Global Configuration Mode (config)# สำหรับ Configure ใช้ configure terminal เข้า | Interface Configuration Mode (config-if)# สำหรับตั้งค่า Interface",
              },
              {
                heading: "Basic Configuration",
                body:    "ตั้ง Hostname ด้วย hostname [name], ตั้ง Password ด้วย enable secret [password], ตั้ง Console Password ด้วย line console 0 → password, ตั้ง Banner ด้วย banner motd, บันทึก Config ด้วย write memory หรือ copy running-config startup-config",
              },
              {
                heading: "Essential Show Commands",
                body:    "show version — ดู IOS Version และ Hardware | show running-config — ดู Config ปัจจุบัน | show ip interface brief — ดูสถานะ Interface ทั้งหมด | show interfaces — ดู Interface Status ละเอียด | show vlan brief — ดู VLAN ที่มีอยู่",
              },
            ],
            diagramText:    "User> → enable → Privileged# → configure terminal → Global(config)# → interface → (config-if)#",
            commands: [
              { title: "เข้า Privileged Mode",  command: "enable",                        description: "เข้า Privileged EXEC Mode" },
              { title: "เข้า Global Config",    command: "configure terminal",            description: "เข้า Global Configuration Mode" },
              { title: "ตั้ง Hostname",         command: "hostname SW1",                  description: "ตั้งชื่อ Switch เป็น SW1" },
              { title: "บันทึก Config",         command: "write memory",                  description: "บันทึก Running Config เป็น Startup Config" },
              { title: "ดูสถานะ Interface",    command: "show ip interface brief",       description: "ดูสถานะ Interface ทั้งหมดแบบย่อ" },
            ],
            commonMistakes: [
              "Configure ใน User Mode — ต้อง enable ก่อนแล้วค่อย configure terminal",
              "ลืม write memory หลัง Configure — Config จะหายเมื่อ Restart",
              "ใช้ enable password แทน enable secret — secret เข้ารหัส MD5 ปลอดภัยกว่า",
            ],
            keyTakeaways: [
              "IOS Mode: > (User) → # (Privileged) → (config)# (Global) → (config-if)# (Interface)",
              "write memory บันทึก Config ไม่งั้นหายหลัง Restart",
              "show running-config คือคำสั่งแรกที่ต้องใช้เมื่อ Troubleshoot",
            ],
            summary:     "Cisco IOS CLI เป็นทักษะพื้นฐานที่ Network Engineer ต้องคล่อง การเข้าใจ Mode และ Show Commands ช่วยให้ทำงานและ Troubleshoot ได้เร็ว",
            prevLessonId: "switch-operations",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 4. VLAN & Trunk
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "vlan-trunk",
    title:       "VLAN & Trunk",
    description: "ตั้งค่า VLAN, Access Port, Trunk Port และ Inter-VLAN Routing บน Cisco",
    level:       "Beginner",
    category:    "Switching",
    duration:    "5 hours",
    progress:    0,
    roleTarget:  "Junior Network Engineer",
    relatedLabs: ["vlan-config", "trunk-port", "inter-vlan-routing"],
    modules: [
      {
        id:          "vlan-concepts",
        title:       "VLAN Concepts & Configuration",
        description: "เข้าใจ VLAN และฝึกตั้งค่า VLAN บน Cisco Switch",
        lessons: [
          {
            id:       "vlan-concept",
            title:    "VLAN คืออะไรและทำไมต้องใช้",
            duration: "20 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจความหมายและประโยชน์ของ VLAN",
              "รู้ว่า VLAN แบ่ง Broadcast Domain อย่างไร",
              "แยกแยะ Access Port และ Trunk Port ได้",
            ],
            content: [
              {
                heading: "VLAN คืออะไร",
                body:    "VLAN (Virtual LAN) คือการแบ่ง Switch ออกเป็น LAN ย่อย ๆ แบบ Virtual โดยไม่ต้องใช้ Switch แยกทาง Physical PC ที่อยู่ VLAN ต่างกันจะไม่เห็นกัน แม้จะเสียบ Switch เดียวกัน เหมือนกับมี Switch แยกกันหลายตัว VLAN ถูกระบุด้วยหมายเลข 1-4094 โดย VLAN 1 คือ Default VLAN",
              },
              {
                heading: "ประโยชน์ของ VLAN",
                body:    "แบ่ง Broadcast Domain ลด Broadcast Traffic ที่ไม่จำเป็น เพิ่ม Security โดยแยก Department เช่น HR ไม่เห็น IT ง่ายต่อการ Manage เพราะสามารถย้าย PC ข้าม Physical Location โดยไม่ต้องเดินสายใหม่ ประหยัด Hardware เพราะ 1 Switch ทำงานแทนหลาย Switch ได้",
              },
              {
                heading: "Access Port vs Trunk Port",
                body:    "Access Port คือ Port ที่เชื่อมกับ End Device เช่น PC, Printer โดย Port หนึ่งอยู่ได้แค่ VLAN เดียว (Untagged) Trunk Port คือ Port ที่เชื่อมระหว่าง Switch-to-Switch หรือ Switch-to-Router สามารถส่ง Traffic ของหลาย VLAN ได้ในสาย Ethernet เส้นเดียวโดยใช้ 802.1Q Tagging",
              },
            ],
            diagramText:    "VLAN 10 (HR): Port 1-5 | VLAN 20 (IT): Port 6-10 | Trunk Port (Gi0/1): All VLANs → Router/Switch",
            commands: [
              { title: "ดู VLAN ทั้งหมด",      command: "show vlan brief",           description: "แสดง VLAN ที่มีทั้งหมดและ Port ที่ Assign" },
              { title: "ดู VLAN ID เฉพาะ",     command: "show vlan id 10",           description: "แสดงรายละเอียด VLAN 10" },
              { title: "ดู Interface VLAN",    command: "show interfaces switchport", description: "แสดง Mode และ VLAN ของทุก Interface" },
            ],
            commonMistakes: [
              "คิดว่า PC ต่าง VLAN คุยกันไม่ได้เด็ดขาด — ต้องผ่าน Router แต่คุยได้ถ้ามี Route",
              "ตั้ง Access Port ผิด VLAN ทำให้ PC คุยกันไม่ได้แม้อยู่ Switch เดียวกัน",
              "ลืมสร้าง VLAN ก่อน Assign Port — ต้องสร้าง VLAN ก่อนเสมอ",
            ],
            keyTakeaways: [
              "VLAN แบ่ง Broadcast Domain ทำให้ Network ปลอดภัยและมีประสิทธิภาพ",
              "Access Port = 1 VLAN (ต่อกับ PC) | Trunk Port = หลาย VLAN (ต่อระหว่าง Switch)",
              "VLAN ต่างกัน คุยกันต้องผ่าน Router (Inter-VLAN Routing)",
            ],
            summary:     "VLAN เป็นเทคโนโลยีพื้นฐานที่ Network Engineer ทุกคนต้องรู้ ช่วยให้ออกแบบ Network ที่มีความปลอดภัยและจัดการง่าย",
            prevLessonId: null,
            nextLessonId: "vlan-config-lesson",
          },
          {
            id:       "vlan-config-lesson",
            title:    "VLAN Configuration on Cisco Switch",
            duration: "25 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "สร้างและตั้งชื่อ VLAN บน Cisco Switch ได้",
              "กำหนด Access Port และ Trunk Port ได้",
              "ตรวจสอบ VLAN Configuration ด้วย show commands",
            ],
            content: [
              {
                heading: "สร้าง VLAN",
                body:    "ใช้คำสั่ง vlan [id] ใน Global Config Mode แล้วตั้งชื่อด้วย name [vlan-name] เช่น vlan 10 / name HR VLAN จะถูกบันทึกใน vlan.dat บน Flash ไม่ใช่ใน running-config ดังนั้นถ้าลบด้วย delete flash:vlan.dat จะหายหมด",
              },
              {
                heading: "ตั้ง Access Port",
                body:    "ใน Interface Configuration Mode ใช้ switchport mode access เพื่อตั้งเป็น Access Mode แล้วใช้ switchport access vlan [id] เพื่อ Assign VLAN ถ้าไม่ตั้ง Port จะอยู่ใน VLAN 1 (Default) ตรวจสอบด้วย show interfaces [int] switchport",
              },
              {
                heading: "ตั้ง Trunk Port",
                body:    "ใน Interface Configuration Mode ใช้ switchport mode trunk เพื่อตั้งเป็น Trunk Mode จากนั้นระบุ VLAN ที่อนุญาตผ่าน Trunk ด้วย switchport trunk allowed vlan [vlan-list] ตรวจสอบด้วย show interfaces trunk",
              },
            ],
            diagramText:    "vlan 10 (HR) → Fa0/1-5 access | vlan 20 (IT) → Fa0/6-10 access | Gi0/1 trunk → allowed 10,20",
            commands: [
              { title: "สร้าง VLAN",           command: "vlan 10\n name HR",                                  description: "สร้าง VLAN 10 และตั้งชื่อ HR" },
              { title: "ตั้ง Access Port",     command: "interface Fa0/1\n switchport mode access\n switchport access vlan 10", description: "ตั้ง Fa0/1 เป็น Access Port VLAN 10" },
              { title: "ตั้ง Trunk Port",      command: "interface Gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 10,20", description: "ตั้ง Gi0/1 เป็น Trunk Port" },
              { title: "ตรวจ Trunk",           command: "show interfaces trunk",                               description: "ดู Trunk Port และ VLAN ที่ผ่าน" },
            ],
            commonMistakes: [
              "ลืม switchport mode access ก่อน Assign VLAN — Port อาจยังเป็น Dynamic mode",
              "Native VLAN ไม่ตรงกันทั้ง 2 ฝั่ง Trunk — จะเกิด CDP Warning และ VLAN mismatich",
              "Assign VLAN ที่ยังไม่ได้สร้าง — VLAN ต้องมีอยู่ใน vlan.dat ก่อน",
            ],
            keyTakeaways: [
              "สร้าง VLAN ก่อนด้วย vlan [id] แล้วค่อย Assign Port",
              "Trunk Port ต้องตั้งทั้ง 2 ฝั่งของ Link เสมอ",
              "ตรวจสอบด้วย show vlan brief และ show interfaces trunk",
            ],
            summary:     "การ Configure VLAN และ Trunk Port เป็นทักษะพื้นฐานที่ต้องทำได้คล่องในงานจริง ฝึกทำใน Lab จนจำคำสั่งได้โดยไม่ต้องดู",
            prevLessonId: "vlan-concept",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 5. Routing Fundamentals
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "routing-fundamentals",
    title:       "Routing Fundamentals",
    description: "เรียน Static Route, Dynamic Routing Concepts และ Routing Table อ่านแบบมืออาชีพ",
    level:       "Intermediate",
    category:    "Routing",
    duration:    "5 hours",
    progress:    0,
    roleTarget:  "Network Engineer",
    relatedLabs: ["basic-ip", "ospf-single-area"],
    modules: [
      {
        id:          "routing-basics-mod",
        title:       "Routing Concepts",
        description: "เข้าใจว่า Router ตัดสินใจ Forward Packet อย่างไร",
        lessons: [
          {
            id:       "routing-basics",
            title:    "How Routing Works",
            duration: "25 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจว่า Router ใช้ Routing Table ตัดสินใจอย่างไร",
              "รู้จัก Administrative Distance และ Metric",
              "เข้าใจ Longest Prefix Match",
            ],
            content: [
              {
                heading: "Router ทำงานอย่างไร",
                body:    "Router รับ Packet มาทาง Ingress Interface แล้วดู Destination IP ไป Lookup ใน Routing Table เพื่อหา Best Path แล้วส่ง Packet ออกทาง Egress Interface ที่เหมาะสม Router จะลด TTL ลง 1 และอัปเดต MAC Address ในทุก Hop",
              },
              {
                heading: "Routing Table",
                body:    "Routing Table ประกอบด้วย Destination Network, Next-Hop IP หรือ Exit Interface และ Metric (ค่าต้นทุนของเส้นทาง) ประเภทของ Route: C = Connected (Direct), S = Static (Manual), O = OSPF, R = RIP, D = EIGRP, B = BGP ถ้าไม่เจอ Route ที่ Match จะใช้ Default Route (0.0.0.0/0) ถ้ามี",
              },
              {
                heading: "Longest Prefix Match",
                body:    "เมื่อ Routing Table มี Route หลายอันที่ Match Destination IP Router จะเลือก Route ที่มี Prefix ยาวที่สุด (Specific ที่สุด) เช่น มีทั้ง 192.168.1.0/24 และ 192.168.1.128/25 Packet ไป 192.168.1.200 จะใช้ /25 เพราะ Specific กว่า",
              },
            ],
            diagramText:    "Packet Arrives → Check Dest IP → Lookup Routing Table → Longest Prefix Match → Forward to Next-Hop / Drop",
            commands: [
              { title: "ดู Routing Table",      command: "show ip route",               description: "แสดง Routing Table ทั้งหมด" },
              { title: "ดู Route เฉพาะ",        command: "show ip route 10.1.1.0",      description: "ดูว่า Router รู้จัก Network นี้ผ่าน Route ไหน" },
              { title: "Windows Route Table",   command: "route print",                 description: "ดู Routing Table บน Windows PC" },
            ],
            commonMistakes: [
              "คิดว่า Router รู้ทุก Network โดยอัตโนมัติ — ต้องมีใน Routing Table ก่อน",
              "ลืมว่าต้องมี Route ทั้งขาไปและขากลับ — ถ้าขากลับไม่มี Route จะ Ping ไม่ผ่าน",
              "ใส่ Next-Hop ผิด — Next-Hop ต้องเป็น IP ที่ Directly Connected",
            ],
            keyTakeaways: [
              "Router เลือก Route โดยใช้ Longest Prefix Match",
              "Routing Table ต้องมีทั้งขาไปและขากลับจึงจะ Ping ผ่าน",
              "Default Route (0.0.0.0/0) ใช้เมื่อไม่มี Specific Route ตรงกัน",
            ],
            summary:     "การเข้าใจหลักการทำงานของ Routing เป็นพื้นฐานสำคัญก่อนเรียน Dynamic Routing Protocol เช่น OSPF, BGP",
            prevLessonId: null,
            nextLessonId: "static-route",
          },
          {
            id:       "static-route",
            title:    "Static Route Configuration",
            duration: "30 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "ตั้งค่า Static Route บน Cisco Router ได้",
              "ตั้งค่า Default Route ได้",
              "Troubleshoot ปัญหา Routing ด้วย show commands",
            ],
            content: [
              {
                heading: "Static Route คืออะไร",
                body:    "Static Route คือการ Configure Route ด้วยมือโดย Admin ระบุ Destination Network, Subnet Mask และ Next-Hop IP หรือ Exit Interface ข้อดีคือ Predictable ไม่ใช้ Bandwidth สำหรับ Routing Updates ข้อเสียคือ ต้อง Configure ด้วยมือทุก Route ไม่ Scale สำหรับ Network ใหญ่",
              },
              {
                heading: "การตั้งค่า Static Route",
                body:    "ใช้คำสั่ง ip route [destination-network] [mask] [next-hop / exit-interface] เช่น ip route 10.2.2.0 255.255.255.0 192.168.1.2 หรือ ip route 10.2.2.0 255.255.255.0 GigabitEthernet0/1 Default Route ใช้ ip route 0.0.0.0 0.0.0.0 [next-hop]",
              },
              {
                heading: "Floating Static Route",
                body:    "Floating Static Route คือ Backup Route ที่จะทำงานเฉพาะเมื่อ Primary Route หายไป ตั้งค่าโดยใส่ Administrative Distance สูงกว่า Primary Route เช่น ip route 10.2.2.0 255.255.255.0 192.168.2.2 200 (AD=200 > OSPF 110)",
              },
            ],
            diagramText:    "R1: ip route 10.2.2.0/24 → next-hop 192.168.1.2 (R2) | R2: ip route 10.1.1.0/24 → next-hop 192.168.1.1 (R1)",
            commands: [
              { title: "ตั้ง Static Route",    command: "ip route 10.2.2.0 255.255.255.0 192.168.1.2",   description: "เพิ่ม Static Route ไป Network 10.2.2.0/24 ผ่าน 192.168.1.2" },
              { title: "ตั้ง Default Route",   command: "ip route 0.0.0.0 0.0.0.0 203.0.113.1",          description: "ตั้ง Default Route ออก Internet" },
              { title: "ตรวจ Route",           command: "show ip route static",                          description: "ดู Static Routes ทั้งหมด" },
              { title: "ลบ Static Route",      command: "no ip route 10.2.2.0 255.255.255.0 192.168.1.2", description: "ลบ Static Route ออก" },
            ],
            commonMistakes: [
              "ใส่ Next-Hop เป็น IP ที่ไม่ได้ Connected โดยตรง — Next-Hop ต้อง Directly Reachable",
              "ลืมตั้ง Route ขากลับ — ต้องมี Route ทั้ง 2 ทิศทาง",
              "ใช้ exit interface แทน next-hop บน Multi-Access Network (Ethernet) — อาจเกิด ARP Issue",
            ],
            keyTakeaways: [
              "Static Route: ip route [network] [mask] [next-hop]",
              "Default Route: ip route 0.0.0.0 0.0.0.0 [next-hop]",
              "ต้องมี Route ทั้งขาไปและขากลับจึงจะ Ping ผ่าน",
            ],
            summary:     "Static Route เหมาะกับ Network เล็กที่ Topology ไม่เปลี่ยน สำหรับ Network ใหญ่ควรใช้ Dynamic Routing Protocol เช่น OSPF",
            prevLessonId: "routing-basics",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 6. OSPF Basics
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "ospf-basics",
    title:       "OSPF Basics",
    description: "เรียน OSPF Single Area, Neighbor Relationship, LSA และการ Verify ด้วย show commands",
    level:       "Intermediate",
    category:    "Routing",
    duration:    "6 hours",
    progress:    0,
    roleTarget:  "Network Engineer",
    relatedLabs: ["ospf-single-area"],
    modules: [
      {
        id:          "ospf-concepts-mod",
        title:       "OSPF Concepts & Neighbor",
        description: "เข้าใจว่า OSPF ทำงานอย่างไรและ Neighbor ขึ้นมาได้อย่างไร",
        lessons: [
          {
            id:       "ospf-intro",
            title:    "OSPF Introduction & Concepts",
            duration: "30 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจว่า OSPF คืออะไรและทำงานอย่างไร",
              "รู้จัก OSPF Area, Router ID, Hello/Dead Timer",
              "เข้าใจ Link State Algorithm (Dijkstra)",
            ],
            content: [
              {
                heading: "OSPF คืออะไร",
                body:    "OSPF (Open Shortest Path First) คือ Link State Routing Protocol ที่ใช้ Dijkstra Algorithm คำนวณเส้นทางที่ดีที่สุด (Shortest Path) ทุก Router จะมีแผนที่ Network เต็มรูปแบบใน LSDB (Link State Database) และคำนวณ Route ของตัวเอง OSPF เป็น IGP ใช้ภายใน AS เดียวกัน",
              },
              {
                heading: "OSPF Area",
                body:    "OSPF ใช้ Area เพื่อแบ่ง Network ออกเป็นส่วน ๆ ลด LSDB Size และ CPU Usage Area 0 คือ Backbone Area ทุก Area ต้องเชื่อมกับ Area 0 Single Area OSPF (ใช้ Area 0 เดียว) เหมาะกับ Network ขนาดกลาง Router ที่อยู่ใน Area เดียวกันจะ Share LSDB เหมือนกัน",
              },
              {
                heading: "Hello Protocol & Neighbor",
                body:    "OSPF ใช้ Hello Packet ส่งทุก 10 วินาที (Default บน Ethernet) เพื่อค้นหาและรักษา Neighbor ถ้าไม่เห็น Hello ภายใน Dead Timer (40 วินาที Default) จะถือว่า Neighbor Down Neighbor จะขึ้นเป็น FULL เมื่อ Exchange LSDB กันครบแล้ว",
              },
            ],
            diagramText:    "Router → Hello (10s) → Neighbor | Hello miss (40s) → Neighbor Down | Exchange LSA → LSDB Sync → SPF Calc → Routing Table",
            commands: [
              { title: "ดู OSPF Neighbors",    command: "show ip ospf neighbor",         description: "แสดง OSPF Neighbors และ State" },
              { title: "ดู OSPF Database",     command: "show ip ospf database",         description: "แสดง LSDB ทั้งหมด" },
              { title: "ดู OSPF Interface",    command: "show ip ospf interface brief",  description: "แสดง Interface ที่ OSPF ทำงานอยู่" },
            ],
            commonMistakes: [
              "Area ID ไม่ตรงกัน — ต้องตรงกันทั้ง 2 Router ถึงจะเป็น Neighbor ได้",
              "Hello/Dead Timer ไม่ตรงกัน — ต้องตรงกันทั้งคู่",
              "Subnet Mask ไม่เหมือนกัน — Interface 2 ฝั่งต้องอยู่ Subnet เดียวกัน",
            ],
            keyTakeaways: [
              "OSPF ใช้ Link State + Dijkstra ทุก Router มีแผนที่ Network ครบ",
              "Area 0 คือ Backbone Area ที่ต้องมีเสมอ",
              "Neighbor ขึ้นต้องตรงกัน: Area ID, Hello/Dead Timer, Subnet",
            ],
            summary:     "OSPF เป็น Routing Protocol ที่ Scale ดีและ Converge เร็ว เหมาะกับ Network ขนาดกลาง-ใหญ่ การเข้าใจ Hello Protocol และ Neighbor State ช่วย Troubleshoot ได้เร็ว",
            prevLessonId: null,
            nextLessonId: "ospf-config",
          },
          {
            id:       "ospf-config",
            title:    "OSPF Configuration & Verification",
            duration: "35 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "Configure OSPF บน Cisco Router ได้",
              "ประกาศ Network ด้วย network statement ถูกต้อง",
              "ตรวจสอบ OSPF ด้วย show commands และ debug",
            ],
            content: [
              {
                heading: "OSPF Configuration Steps",
                body:    "1) เข้า Global Config: router ospf [process-id] 2) ตั้ง Router ID (optional): router-id [x.x.x.x] 3) ประกาศ Network: network [address] [wildcard] area [id] Wildcard Mask คือ Inverse ของ Subnet Mask เช่น /24 wildcard = 0.0.0.255, /30 wildcard = 0.0.0.3 Process ID ไม่จำเป็นต้องตรงกันระหว่าง Router",
              },
              {
                heading: "Network Statement",
                body:    "network statement ระบุว่า Interface ไหนที่ต้องการให้ OSPF ทำงาน ใช้ Wildcard Mask (ไม่ใช่ Subnet Mask) เช่น network 10.1.1.0 0.0.0.255 area 0 จะ Match Interface ทุกอันที่มี IP ใน 10.1.1.0/24 หรือใช้ ip ospf [process] area [id] บน Interface โดยตรงได้",
              },
              {
                heading: "Passive Interface",
                body:    "Passive Interface คือ Interface ที่ OSPF ประกาศ Network แต่ไม่ส่ง Hello Packet ออก ใช้สำหรับ Interface ที่เชื่อมกับ LAN ที่ไม่มี OSPF Router ตั้งด้วย passive-interface [int] ใน OSPF Config Mode เพื่อป้องกัน Hello ออกไปใน LAN โดยไม่จำเป็น",
              },
            ],
            diagramText:    "router ospf 1 → network 10.0.0.0 0.255.255.255 area 0 → passive-interface Fa0/0 (LAN) | verify: show ip ospf neighbor | show ip route ospf",
            commands: [
              { title: "เปิด OSPF",             command: "router ospf 1",                                   description: "เริ่ม OSPF Process 1" },
              { title: "ประกาศ Network",         command: "network 10.1.1.0 0.0.0.255 area 0",               description: "ประกาศ Network 10.1.1.0/24 ใน Area 0" },
              { title: "Passive Interface",      command: "passive-interface FastEthernet0/0",                description: "ไม่ส่ง Hello ออก Fa0/0 (LAN)" },
              { title: "ตรวจ OSPF Routes",      command: "show ip route ospf",                              description: "ดู Route ที่ได้จาก OSPF (O)" },
              { title: "ตรวจ Neighbor",         command: "show ip ospf neighbor",                           description: "ดู OSPF Neighbor State" },
            ],
            commonMistakes: [
              "ใช้ Subnet Mask แทน Wildcard Mask — Wildcard คือ Inverse (ลบจาก 255.255.255.255)",
              "ลืม passive-interface บน LAN Interface — Hello ออกไปใน LAN โดยไม่จำเป็น",
              "ประกาศ Network ไม่ครบ — ต้องประกาศทุก Interface ที่ต้องการให้ OSPF Route",
            ],
            keyTakeaways: [
              "Wildcard Mask คือ Inverse ของ Subnet Mask: /24 = 0.0.0.255",
              "Process ID ไม่จำเป็นต้องตรงกันระหว่าง Router",
              "ใช้ passive-interface บน LAN Interface เสมอ",
            ],
            summary:     "OSPF Configuration ไม่ยากถ้าเข้าใจ Wildcard Mask และ Network Statement การ Verify ด้วย show ip ospf neighbor จะบอกทันทีว่า OSPF ทำงานถูกต้องหรือไม่",
            prevLessonId: "ospf-intro",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 7. Firewall & ACL Basics
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "firewall-acl",
    title:       "Firewall & ACL Basics",
    description: "เรียน ACL, Firewall Policy และ NAT เพื่อควบคุม Traffic ใน Network อย่างปลอดภัย",
    level:       "Intermediate",
    category:    "Security",
    duration:    "5 hours",
    progress:    0,
    roleTarget:  "Network Engineer / Security Engineer",
    relatedLabs: ["acl-basic", "nat-basic"],
    modules: [
      {
        id:          "acl-module",
        title:       "Access Control List (ACL)",
        description: "เรียนรู้การสร้างและ Apply ACL เพื่อควบคุม Traffic",
        lessons: [
          {
            id:       "acl-intro",
            title:    "ACL Concepts & Standard ACL",
            duration: "30 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจหลักการทำงานของ ACL",
              "สร้าง Standard ACL เพื่อ Permit/Deny Source IP ได้",
              "รู้ว่าควร Apply ACL ที่ Interface ไหนและ Direction ไหน",
            ],
            content: [
              {
                heading: "ACL คืออะไร",
                body:    "ACL (Access Control List) คือรายการ Rule ที่ใช้ Permit หรือ Deny Traffic บน Router/Firewall ทำงานโดยอ่าน Rule จากบนลงล่างหยุดที่ Rule แรกที่ Match ถ้าไม่มี Rule Match จะ Deny ทั้งหมด (Implicit Deny) มี 2 ประเภทหลัก: Standard ACL (กรองเฉพาะ Source IP) และ Extended ACL (กรอง Source/Dest IP, Protocol, Port)",
              },
              {
                heading: "Standard ACL",
                body:    "Standard ACL ใช้หมายเลข 1-99 หรือ 1300-1999 กรองได้เฉพาะ Source IP Address เช่น Permit หรือ Deny จาก Subnet ไหน เพราะกรองได้แค่ Source IP ควร Apply ใกล้ Destination มากที่สุด เพื่อไม่ให้บล็อก Traffic อื่นโดยไม่ตั้งใจ",
              },
              {
                heading: "Apply ACL บน Interface",
                body:    "ACL ต้อง Apply บน Interface ถึงจะทำงาน มี 2 Direction: Inbound (Traffic ที่เข้ามาใน Router) และ Outbound (Traffic ที่ออกไปจาก Router) กฎทั่วไป: Extended ACL Apply ใกล้ Source | Standard ACL Apply ใกล้ Destination",
              },
            ],
            diagramText:    "Traffic In → ACL Check (Rule 1 → Rule 2 → ... → Implicit Deny) → Permit/Deny | Apply: Inbound (enter) or Outbound (exit) Interface",
            commands: [
              { title: "สร้าง Standard ACL",   command: "ip access-list standard BLOCK_HOST\n deny host 192.168.1.10\n permit any", description: "สร้าง Named Standard ACL" },
              { title: "Apply บน Interface",   command: "interface Gi0/0\n ip access-group BLOCK_HOST in",                         description: "Apply ACL Inbound บน Gi0/0" },
              { title: "ตรวจ ACL",             command: "show ip access-lists",                                                    description: "ดู ACL Rules และ Hit Count" },
            ],
            commonMistakes: [
              "ลืม permit any ท้าย ACL — Implicit Deny จะบล็อก Traffic ทุกอย่าง",
              "Apply ผิด Direction — Inbound/Outbound ขึ้นอยู่กับมุมมองของ Router",
              "Apply Standard ACL ใกล้ Source — ควรใช้ Extended ACL แทน หรือ Apply ใกล้ Destination",
            ],
            keyTakeaways: [
              "ACL อ่านจากบนลงล่าง หยุดที่ Rule แรกที่ Match เสมอ",
              "ท้าย ACL ทุกอันมี Implicit Deny All — ต้องใส่ permit any ถ้าต้องการ",
              "Standard ACL: กรอง Source IP, Apply ใกล้ Destination",
            ],
            summary:     "ACL เป็นเครื่องมือพื้นฐานสำหรับ Network Security การเข้าใจลำดับ Rule และ Direction ของการ Apply ช่วยให้ Configure ได้ถูกต้องตั้งแต่แรก",
            prevLessonId: null,
            nextLessonId: "extended-acl",
          },
          {
            id:       "extended-acl",
            title:    "Extended ACL & Best Practices",
            duration: "30 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "สร้าง Extended ACL กรอง Source/Dest IP, Protocol, Port ได้",
              "รู้ Best Practice ในการ Configure ACL",
              "Troubleshoot ACL ด้วย show และ debug",
            ],
            content: [
              {
                heading: "Extended ACL",
                body:    "Extended ACL ใช้หมายเลข 100-199 หรือ 2000-2699 หรือ Named Extended ACL กรองได้ละเอียดกว่า Standard เช่น กรองตาม Source IP, Destination IP, Protocol (TCP/UDP/ICMP) และ Port Number ควร Apply ใกล้ Source เพื่อลด Unnecessary Traffic ในเครือข่าย",
              },
              {
                heading: "Syntax ของ Extended ACL",
                body:    "permit/deny [protocol] [source] [wildcard] [dest] [wildcard] [operator port] เช่น deny tcp 192.168.10.0 0.0.0.255 host 192.168.30.10 eq 80 → Deny HTTP จาก VLAN 10 ไปหา Server หรือ permit ip any any → Permit ทุกอย่างที่เหลือ",
              },
              {
                heading: "ACL Best Practices",
                body:    "1) Plan ก่อน Write — เขียน Policy เป็น Plain Text ก่อนเขียน ACL 2) ใช้ Named ACL เสมอ อ่านง่ายกว่า Number 3) เพิ่ม Comments ด้วย remark 4) Test ก่อน Apply ใน Production 5) ดู Hit Count เพื่อ Verify ว่า Traffic Match Rule ที่ต้องการ",
              },
            ],
            diagramText:    "deny tcp [VLAN10 src] [Server dst] eq 80 | permit ip any any | Apply: Gi0/0 inbound (ใกล้ Source VLAN10)",
            commands: [
              { title: "สร้าง Extended ACL",  command: "ip access-list extended POLICY\n remark Block HTTP from VLAN10 to Finance\n deny tcp 192.168.10.0 0.0.0.255 host 10.0.0.10 eq 80\n permit ip any any", description: "Named Extended ACL พร้อม Comment" },
              { title: "Apply Inbound",        command: "interface GigabitEthernet0/0\n ip access-group POLICY in",                                                                                                  description: "Apply Extended ACL Inbound" },
              { title: "ตรวจ Hit Count",      command: "show ip access-lists POLICY",                                                                                                                               description: "ดู Rule Hit Count" },
              { title: "Clear Hit Count",     command: "clear ip access-list counters POLICY",                                                                                                                      description: "Reset Hit Counter" },
            ],
            commonMistakes: [
              "ใช้ Subnet Mask แทน Wildcard Mask ใน ACL — ต้องใช้ Wildcard (Inverse)",
              "Permit Any Any ไม่ได้ใส่ท้าย — Traffic อื่นทั้งหมดจะถูก Deny",
              "Apply Extended ACL ใกล้ Destination — ควร Apply ใกล้ Source เสมอ",
            ],
            keyTakeaways: [
              "Extended ACL: กรองได้ทั้ง Source/Dest IP, Protocol, Port",
              "Apply Extended ACL ใกล้ Source เพื่อลด Unnecessary Traffic",
              "ใช้ Named ACL + remark เสมอเพื่อ Readability",
            ],
            summary:     "Extended ACL เป็นเครื่องมือทรงพลังที่ Network Engineer ต้องใช้เป็น การ Plan Policy ก่อน Configure ช่วยหลีกเลี่ยง Mistake ที่พบบ่อย",
            prevLessonId: "acl-intro",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 8. Network Troubleshooting
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "network-troubleshooting",
    title:       "Network Troubleshooting",
    description: "เรียน Methodology ในการแก้ปัญหา Network อย่างเป็นระบบตาม OSI Model",
    level:       "Intermediate",
    category:    "Foundation",
    duration:    "4 hours",
    progress:    0,
    roleTarget:  "Junior / Network Engineer",
    relatedLabs: ["basic-ip", "dhcp-troubleshoot"],
    modules: [
      {
        id:          "troubleshoot-methodology-mod",
        title:       "Troubleshooting Methodology",
        description: "เรียน Framework การแก้ปัญหา Network อย่างมืออาชีพ",
        lessons: [
          {
            id:       "troubleshoot-method",
            title:    "Troubleshooting Methodology",
            duration: "25 min",
            type:     "lesson",
            status:   "not-started",
            objectives: [
              "เข้าใจ Bottom-Up Troubleshooting Methodology",
              "ใช้ OSI Model เป็น Framework แก้ปัญหาได้",
              "รู้คำถามที่ต้องถามก่อนเริ่มแก้ปัญหา",
            ],
            content: [
              {
                heading: "Troubleshooting Methodology",
                body:    "วิธีที่มีประสิทธิภาพที่สุดคือ Bottom-Up Approach ตาม OSI Model เริ่มจาก Layer 1 Physical (สาย, LED, Speed) → Layer 2 (VLAN, MAC, Duplex) → Layer 3 (IP, Route) → Layer 4 (Port, Firewall) → Layer 7 (DNS, App) วิธีนี้ตัดความเป็นไปได้ทีละ Layer ไม่กระโดดข้าม",
              },
              {
                heading: "คำถามสำคัญก่อนเริ่ม",
                body:    "1) อาการคืออะไร ชัดเจน? เช่น เปิดเว็บไม่ได้ หรือ Ping ไม่ผ่าน 2) เกิดขึ้นกับใครบ้าง ทุกคน หรือคนเดียว 3) เกิดขึ้นตลอดเวลา หรือเป็นบางช่วง 4) มีการเปลี่ยนแปลงอะไรล่าสุดก่อนเกิดปัญหา 5) ทดสอบจาก Device อื่นได้ไหม",
              },
              {
                heading: "Tools ที่ต้องรู้จัก",
                body:    "Ping: ทดสอบ Layer 3 Connectivity | Traceroute/Tracert: ดูเส้นทาง Routing ทีละ Hop | NSLookup: ตรวจ DNS Resolution | Netstat: ดู Active Connection และ Port | Wireshark: Capture Packet ดู Traffic จริง | Show Commands: ดู State ของ Cisco Device",
              },
            ],
            diagramText:    "Problem → L1 Check (Cable/LED) → L2 Check (VLAN/MAC) → L3 Check (IP/Route) → L4 Check (Port/FW) → L7 Check (DNS/App) → Solution",
            commands: [
              { title: "Test Connectivity",    command: "ping 8.8.8.8",             description: "Test Layer 3 Connectivity ไป Internet" },
              { title: "Trace Route",          command: "tracert 8.8.8.8",          description: "ดูเส้นทาง Routing และหา Hop ที่มีปัญหา" },
              { title: "Test DNS",             command: "nslookup google.com",      description: "ทดสอบ DNS Resolution" },
              { title: "Check Port",           command: "netstat -an | findstr :80", description: "ดูว่า Port 80 เปิดอยู่หรือไม่" },
            ],
            commonMistakes: [
              "กระโดดไปแก้ Layer สูง ๆ ก่อน — ควรเริ่มจาก Physical เสมอ",
              "แก้ปัญหาโดยไม่ Document — ควร Note อาการ, สิ่งที่ทดสอบ, และผลลัพธ์",
              "ไม่ Verify หลังแก้เสร็จ — ควรทดสอบซ้ำเพื่อยืนยันว่าหายจริง",
            ],
            keyTakeaways: [
              "Bottom-Up ตาม OSI Model คือ Method ที่มีประสิทธิภาพที่สุด",
              "ถามคำถามให้ชัดเจนก่อนเริ่มแก้ปัญหาเสมอ",
              "Verify ซ้ำหลังแก้เสร็จทุกครั้ง",
            ],
            summary:     "การมี Methodology ที่ชัดเจนทำให้แก้ปัญหา Network ได้เร็วและไม่ตกหล่น ทักษะ Troubleshooting คือสิ่งที่แยก Junior ออกจาก Senior Engineer",
            prevLessonId: null,
            nextLessonId: "ping-traceroute",
          },
          {
            id:       "ping-traceroute",
            title:    "Ping, Traceroute & Common Issues",
            duration: "30 min",
            type:     "lesson",
            status:   "locked",
            objectives: [
              "ใช้ Ping และ Traceroute ได้อย่างมีประสิทธิภาพ",
              "อ่านผล Ping และ Traceroute แล้ว Diagnose ปัญหาได้",
              "แก้ปัญหา Common Network Issues ได้",
            ],
            content: [
              {
                heading: "การอ่านผล Ping",
                body:    "Reply from [IP]: ปกติ | Request Timed Out: ปลายทางไม่ตอบ (อาจ Down หรือ Firewall บล็อก) | Destination Net Unreachable: ไม่มี Route ไปถึงปลายทาง | Destination Host Unreachable: ไม่มี Route หรือ Host ไม่มีใน Network ping ผ่าน IP แต่เปิดเว็บไม่ได้ = DNS ปัญหา",
              },
              {
                heading: "การอ่านผล Traceroute",
                body:    'แต่ละบรรทัดคือ Hop (Router) หนึ่งตัว แสดง IP และ RTT *** หมายถึง Hop ไม่ตอบ ICMP (อาจ Firewall Block หรือ Drop) ถ้า Traceroute หยุดที่ Hop ไหน = ปัญหาอยู่ที่ Hop นั้นหรือหลังจากนั้น ดูเวลา RTT ที่เพิ่มขึ้นผิดปกติเพื่อหา Bottleneck',
              },
              {
                heading: "Common Issues & Solutions",
                body:    "ปัญหา: Ping ไม่ออก → ตรวจ IP/GW/DNS ปัญหา: Ping ออก IP ได้แต่เปิดเว็บไม่ได้ → DNS ปัญหา ปัญหา: เน็ตหลุดเป็นช่วง ๆ → Duplex Mismatch, Bad Cable, ISP ปัญหา: บางเว็บเปิดได้บางเว็บไม่ได้ → DNS Cache, Proxy, Firewall ปัญหา: เน็ตช้า → Bandwidth Saturation, High Latency, Packet Loss",
              },
            ],
            diagramText:    "Ping OK → Layer 3 OK | Traceroute stops at HopX → Issue at HopX | Ping IP OK + Web Fail → DNS Issue | *** at hop → ICMP Blocked",
            commands: [
              { title: "Extended Ping (Cisco)", command: "ping 10.1.1.10 repeat 100 size 1500", description: "Ping 100 ครั้ง ขนาด 1500 byte เพื่อ Test MTU" },
              { title: "Traceroute (Cisco)",   command: "traceroute 8.8.8.8",                  description: "Trace เส้นทางออก Internet" },
              { title: "Continuous Ping",      command: "ping 8.8.8.8 -t",                    description: "Ping ต่อเนื่องบน Windows (Ctrl+C หยุด)" },
              { title: "Debug IP Packet",      command: "debug ip packet",                     description: "ดู Packet ที่ Router รับ/ส่ง (ระวัง CPU)" },
            ],
            commonMistakes: [
              "สรุปว่า Network ดีเพราะ Ping ผ่านครั้งเดียว — ควร Ping หลายครั้งและดู Packet Loss",
              "เชื่อ *** ใน Traceroute ว่า Down — อาจเป็นแค่ ICMP Block แต่ Route ยังผ่าน",
              "ลืม Test DNS แยกจาก Connectivity — Ping IP กับ Ping Domain Name ต้องทำแยก",
            ],
            keyTakeaways: [
              "Ping = ทดสอบ Layer 3 Connectivity ไม่ได้ยืนยันว่า Service ทำงาน",
              "Traceroute หยุดที่ Hop ไหน = ปัญหาอยู่ที่นั่นหรือหลังจากนั้น",
              "Ping IP ผ่านแต่เปิดเว็บไม่ได้ = DNS ปัญหา ไม่ใช่ Network",
            ],
            summary:     "Ping และ Traceroute เป็น Tool พื้นฐานที่ Network Engineer ใช้ทุกวัน การอ่านผลได้อย่างถูกต้องช่วยหา Root Cause ได้เร็วและแม่นยำ",
            prevLessonId: "troubleshoot-method",
            nextLessonId: null,
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
   * 9. BGP Routing
   * ══════════════════════════════════════════════════════════════ */
  {
    id:          "bgp-routing",
    title:       "BGP Routing Protocol",
    description: "เรียนรู้ BGP ตั้งแต่พื้นฐาน eBGP/iBGP, Path Selection, Communities และ BGP Policy สำหรับ ISP และ Enterprise WAN",
    level:       "Advanced",
    category:    "Routing",
    duration:    "8 hours",
    progress:    0,
    roleTarget:  "Network Engineer / ISP Engineer",
    relatedLabs: ["bgp-ebgp-config"],
    modules: [
      {
        id:          "bgp-basics",
        title:       "BGP พื้นฐาน",
        description: "เข้าใจว่า BGP คืออะไร ทำงานอย่างไร และต่างจาก IGP อย่างไร",
        lessons: [
          {
            id:       "bgp-overview",
            title:    "BGP คืออะไร และเมื่อไหร่ต้องใช้",
            duration: "20 min",
               content: ["BGP คือ Exterior Gateway Protocol ที่ใช้แลกเปลี่ยน routing information ระหว่าง Autonomous Systems", "eBGP เชื่อมต่อ AS ต่าง AS, iBGP เชื่อมต่อ Router ใน AS เดียวกัน", "BGP ใช้ TCP port 179 และเป็น Path Vector protocol"],
            commands: ["router bgp 65001", "neighbor 10.0.0.2 remote-as 65002", "network 192.168.1.0 mask 255.255.255.0", "show bgp summary", "show ip bgp"],
          },
        ],
      },
    ],
    relatedLabs: ["bgp-ebgp-config"],
    relatedQuizzes: ["bgp-routing-quiz"],
  },


  /* ── MPLS & QoS ─────────────────────────────────────────────── */
  {
    id:          "mpls-qos",
    title:       "MPLS & QoS",
    category:    "Advanced",
    level:       "Advanced",
    duration:    "5 hr",
    description: "เรียนรู้ MPLS Label Switching, Traffic Engineering และ Quality of Service บนเครือข่าย enterprise",
    icon:        "⚡",
    objectives:  ["เข้าใจหลักการ MPLS Label Switching", "ตั้งค่า LDP และ RSVP", "ออกแบบ QoS policy ด้วย DSCP", "ทำ Traffic Engineering ด้วย MPLS-TE"],
    modules: [
      {
        id:          "mpls-fundamentals",
        title:       "MPLS พื้นฐาน",
        description: "เข้าใจ label switching และ forwarding plane",
        lessons: [
          {
            id:       "mpls-concepts",
            title:    "MPLS คืออะไร และทำงานอย่างไร",
            duration: "20 min",
            content:  ["MPLS เพิ่ม 32-bit label header ระหว่าง Layer 2 และ Layer 3 (Layer 2.5)", "LER เพิ่ม/ถอด label, LSR forward ตาม label โดยไม่ต้อง lookup IP", "LDP (Label Distribution Protocol) แลก label ระหว่าง LSR"],
            commands: ["mpls ip", "mpls label protocol ldp", "show mpls interfaces", "show mpls ldp neighbor", "show mpls forwarding-table"],
          },
          {
            id:       "mpls-vpn",
            title:    "MPLS L3VPN",
            duration: "25 min",
            content:  ["MPLS L3VPN ใช้ VRF แยก routing table ของ customer แต่ละราย", "PE router รู้จัก VRF, P router ไม่รู้จัก customer prefix", "Route Distinguisher (RD) ทำให้ prefix ไม่ซ้ำกัน, Route Target (RT) ควบคุม import/export"],
            commands: ["ip vrf CUSTOMER-A", "rd 65001:100", "route-target export 65001:100", "show ip vrf", "show ip route vrf CUSTOMER-A"],
          },
        ],
      },
      {
        id:          "qos-basics",
        title:       "Quality of Service",
        description: "จัดลำดับความสำคัญของ traffic",
        lessons: [
          {
            id:       "qos-concepts",
            title:    "QoS Model และ DSCP",
            duration: "20 min",
            content:  ["QoS มี 3 model: Best-Effort, IntServ (RSVP), DiffServ (DSCP)", "DSCP อยู่ใน IP header ใช้ 6 bits (0-63), EF=46 สำหรับ VoIP", "Expedited Forwarding (EF) สำหรับ VoIP, Assured Forwarding (AF) สำหรับ video/data"],
            commands: ["policy-map MARK-TRAFFIC", "class VOICE-CLASS", "set dscp ef", "service-policy input MARK-TRAFFIC", "show policy-map interface"],
          },
          {
            id:       "qos-queuing",
            title:    "Queuing และ Shaping",
            duration: "20 min",
            content:  ["CBWFQ จัด bandwidth ให้แต่ละ class", "LLQ เพิ่ม priority queue สำหรับ voice/video", "Traffic Shaping ปรับ rate ให้สม่ำเสมอ, Policing ตัด packet ที่เกิน rate"],
            commands: ["policy-map WAN-QOS", "class VOICE", "priority 512", "class VIDEO", "bandwidth percent 30"],
          },
        ],
      },
    ],
    relatedLabs:    ["mpls-ldp-lab"],
    relatedQuizzes: [],
  },

  /* ── SD-WAN ──────────────────────────────────────────────────── */
  {
    id:          "sd-wan",
    title:       "SD-WAN Fundamentals",
    category:    "Advanced",
    level:       "Advanced",
    duration:    "4 hr",
    description: "เข้าใจสถาปัตยกรรม SD-WAN, Cisco Viptela, overlay topology และ application-aware routing",
    icon:        "🌐",
    objectives:  ["เข้าใจ SD-WAN architecture", "เปรียบเทียบ SD-WAN vs Traditional WAN", "ออกแบบ topology ด้วย vEdge/cEdge", "ตั้งค่า AAR policy"],
    modules: [
      {
        id:          "sdwan-concepts",
        title:       "SD-WAN Architecture",
        description: "ภาพรวม control plane, data plane และ components",
        lessons: [
          {
            id:       "sdwan-overview",
            title:    "SD-WAN คืออะไร",
            duration: "20 min",
            content:  ["SD-WAN แยก control plane ออกจาก data plane ควบคุมจาก controller กลาง", "Cisco Viptela: vManage (GUI), vSmart (policy), vBond (orchestrator), vEdge/cEdge (data plane)", "ใช้ OMP (Overlay Management Protocol) แลก route ระหว่าง WAN edge"],
            commands: ["show sdwan control connections", "show sdwan omp routes", "show sdwan bfd sessions"],
          },
          {
            id:       "sdwan-transport",
            title:    "Transport & Overlay",
            duration: "20 min",
            content:  ["SD-WAN ใช้ DTLS/TLS tunnel เป็น overlay บน transport ใดก็ได้ (MPLS, Internet, LTE)", "IPsec data plane tunnel ระหว่าง vEdge ให้ encryption อัตโนมัติ", "BFD วัด jitter, latency, packet loss ของแต่ละ transport"],
            commands: [],
          },
        ],
      },
      {
        id:          "sdwan-policy",
        title:       "SD-WAN Policy",
        description: "Application-Aware Routing",
        lessons: [
          {
            id:       "sdwan-aar",
            title:    "Application-Aware Routing",
            duration: "25 min",
            content:  ["AAR เลือก transport ที่ดีที่สุดสำหรับ application แต่ละประเภท", "ตั้งค่า SLA class: latency < 150ms, jitter < 30ms, loss < 1% สำหรับ VoIP", "ถ้า transport ไม่ผ่าน SLA จะ failover ไป transport อื่นอัตโนมัติ"],
            commands: [],
          },
        ],
      },
    ],
    relatedLabs:    [],
    relatedQuizzes: [],
  },

  /* ── Network Automation ──────────────────────────────────────── */
  {
    id:          "network-automation",
    title:       "Network Automation (Python & Ansible)",
    category:    "Automation",
    level:       "Intermediate",
    duration:    "6 hr",
    description: "เรียนรู้ automate เครือข่ายด้วย Python (Netmiko, Nornir) และ Ansible ตั้งแต่พื้นฐานถึง production",
    icon:        "🤖",
    objectives:  ["ใช้ Python Netmiko เชื่อมต่อ device", "เขียน Ansible Playbook สำหรับ network", "ใช้ Jinja2 template", "เก็บ config ด้วย Git (Network as Code)"],
    modules: [
      {
        id:          "python-netmiko",
        title:       "Python + Netmiko",
        description: "เชื่อมต่อ Cisco IOS ด้วย Python",
        lessons: [
          {
            id:       "netmiko-basics",
            title:    "Netmiko เบื้องต้น",
            duration: "25 min",
            content:  ["Netmiko เป็น Python library สำหรับ SSH เข้า network device หลายยี่ห้อ", "ใช้ ConnectHandler() ระบุ device_type เช่น cisco_ios, juniper_junos", "send_command() ส่งคำสั่งและรับ output, send_config_set() ส่ง config หลายบรรทัด"],
            commands: ["pip install netmiko", "from netmiko import ConnectHandler", "net_connect = ConnectHandler(**device)", "output = net_connect.send_command('show ip int brief')"],
          },
          {
            id:       "netmiko-advanced",
            title:    "Backup config และ Loop หลาย Device",
            duration: "25 min",
            content:  ["ใช้ loop ทำงานกับ device หลายตัว", "บันทึก running-config ลงไฟล์อัตโนมัติ", "จัดการ exception เมื่อ SSH ล้มเหลว และใช้ threading เพื่อ parallel"],
            commands: ["for device in devices:", "  net_connect = ConnectHandler(**device)", "  config = net_connect.send_command('show run')"],
          },
        ],
      },
      {
        id:          "ansible-network",
        title:       "Ansible for Network",
        description: "Playbook, module และ best practice",
        lessons: [
          {
            id:       "ansible-basics",
            title:    "Ansible Network Module",
            duration: "25 min",
            content:  ["Ansible ใช้ ios_command, ios_config module สำหรับ Cisco IOS", "Inventory file กำหนด host group และ connection=network_cli", "Playbook เขียนด้วย YAML ระบุ tasks ที่ต้องทำ"],
            commands: ["ansible-playbook -i inventory.yml playbook.yml", "- name: Show IP brief", "  ios_command:", "    commands: show ip interface brief"],
          },
          {
            id:       "ansible-config",
            title:    "จัดการ Config ด้วย Ansible",
            duration: "25 min",
            content:  ["ใช้ ios_config module push configuration ให้ router/switch", "Jinja2 template สร้าง config ที่แตกต่างตาม variable แต่ละ device", "Idempotent: Ansible ตรวจว่า config มีอยู่แล้วหรือยัง ไม่ทำซ้ำ"],
            commands: ["- name: Configure OSPF", "  ios_config:", "    lines:", "      - router ospf 1", "      - network 10.0.0.0 0.255.255.255 area 0"],
          },
        ],
      },
    ],
    relatedLabs:    ["python-netmiko-lab"],
    relatedQuizzes: [],
  },

  /* ── IPv6 Deep Dive ──────────────────────────────────────────── */
  {
    id:          "ipv6-deep-dive",
    title:       "IPv6 Deep Dive",
    category:    "Protocols",
    level:       "Intermediate",
    duration:    "4 hr",
    description: "เจาะลึก IPv6 addressing, NDP, OSPFv3, BGP4+ และการ migrate จาก IPv4",
    icon:        "6️⃣",
    objectives:  ["เข้าใจ IPv6 address types", "ตั้งค่า SLAAC และ DHCPv6", "รัน OSPFv3", "ออกแบบ Dual-Stack และ Tunneling"],
    modules: [
      {
        id:          "ipv6-addressing",
        title:       "IPv6 Addressing",
        description: "Address types, notation และ allocation",
        lessons: [
          {
            id:       "ipv6-types",
            title:    "IPv6 Address Types",
            duration: "20 min",
            content:  ["Global Unicast (2000::/3) — routable บน Internet", "Link-Local (FE80::/10) — ใช้เฉพาะ local link ไม่ route", "Multicast (FF00::/8) — แทน Broadcast, Loopback ::1"],
            commands: ["ipv6 unicast-routing", "interface Gi0/0", "ipv6 address 2001:db8:1::1/64", "show ipv6 interface brief"],
          },
          {
            id:       "ipv6-ndp",
            title:    "NDP แทน ARP",
            duration: "20 min",
            content:  ["Neighbor Discovery Protocol (NDP) ใช้ ICMPv6 แทน ARP", "Router Solicitation/Advertisement สำหรับ SLAAC", "DAD (Duplicate Address Detection) ตรวจ address ซ้ำก่อนใช้"],
            commands: ["show ipv6 neighbors", "show ipv6 routers", "debug ipv6 nd"],
          },
        ],
      },
      {
        id:          "ipv6-routing",
        title:       "IPv6 Routing Protocols",
        description: "OSPFv3 และ Migration",
        lessons: [
          {
            id:       "ospfv3",
            title:    "OSPFv3",
            duration: "20 min",
            content:  ["OSPFv3 รัน IPv6 โดยเฉพาะ ใช้ Link-Local address เป็น neighbor", "Area, LSA type เหมือน OSPFv2 แต่ format ต่างกัน", "สามารถรันพร้อมกับ OSPFv2 บน router เดียวกัน"],
            commands: ["ipv6 router ospf 1", "router-id 1.1.1.1", "interface Gi0/0", "ipv6 ospf 1 area 0", "show ipv6 ospf neighbor"],
          },
          {
            id:       "ipv6-migration",
            title:    "Migration Strategy",
            duration: "20 min",
            content:  ["Dual-Stack: รัน IPv4 และ IPv6 พร้อมกัน วิธีง่ายที่สุด", "6to4 Tunnel: Encapsulate IPv6 ใน IPv4 ข้าม IPv4-only network", "NAT64/DNS64: ให้ IPv6-only client เข้าถึง IPv4 server"],
            commands: ["interface Tunnel0", "tunnel source Gi0/0", "tunnel mode ipv6ip", "ipv6 address 2001:db8::1/128"],
          },
        ],
      },
    ],
    relatedLabs:    ["ipv6-ospfv3-lab"],
    relatedQuizzes: [],
  },

];

export const courseCategories = Array.from(new Set(courses.map((c) => c.category)));

export const courseStats = {
  total:        courses.length,
  beginner:     courses.filter(c => c.level === "Beginner").length,
  intermediate: courses.filter(c => c.level === "Intermediate").length,
  advanced:     courses.filter(c => c.level === "Advanced").length,
};


export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return null;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module: mod, course };
  }
  return null;
}

export function getTotalLessons(course: Course): number {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}

export function getCompletedLessons(_course: Course): number {
  // placeholder — real completion tracked in user progress
  return 0;
}
