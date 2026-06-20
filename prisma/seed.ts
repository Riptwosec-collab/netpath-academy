import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding NetPath Academy database...");

  // ─── Users ──────────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const demoPassword  = await bcrypt.hash("Demo@123",  12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@netpath.academy" },
    update: {},
    create: {
      name:          "Admin",
      email:         "admin@netpath.academy",
      password:      adminPassword,
      role:          "ADMIN",
      xp:            9999,
      level:         7,
      skillLevel:    "Network Architect",
      learningStreak: 30,
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@netpath.academy" },
    update: {},
    create: {
      name:          "Network Learner",
      email:         "demo@netpath.academy",
      password:      demoPassword,
      role:          "USER",
      xp:            2450,
      level:         3,
      skillLevel:    "Junior Network Engineer",
      learningStreak: 7,
    },
  });

  console.log("✅ Users created:", admin.email, demo.email);

  // ─── Courses ────────────────────────────────────────────────────────────────
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { id: "network-fundamentals" },
      update: {},
      create: {
        id:          "network-fundamentals",
        title:       "Network Fundamentals",
        description: "พื้นฐาน Network ตั้งแต่ OSI Model จนถึง IP Addressing",
        level:       "Beginner",
        category:    "Fundamentals",
        duration:    "12 hrs",
        modules: {
          create: [
            {
              title: "OSI Model",
              order: 1,
              lessons: {
                create: [
                  { title: "OSI 7 Layer คืออะไร", duration: "10 min", type: "video",   order: 1 },
                  { title: "Layer 1-3 Physical, Data Link, Network", duration: "15 min", type: "video", order: 2 },
                  { title: "Layer 4-7 Transport to Application", duration: "12 min", type: "video", order: 3 },
                ],
              },
            },
            {
              title: "IP Addressing",
              order: 2,
              lessons: {
                create: [
                  { title: "IPv4 Addressing Basics", duration: "15 min", type: "video", order: 1 },
                  { title: "Subnetting CIDR",         duration: "20 min", type: "lab",   order: 2 },
                  { title: "IPv6 Introduction",        duration: "10 min", type: "video", order: 3 },
                ],
              },
            },
          ],
        },
      },
    }),

    prisma.course.upsert({
      where: { id: "routing-protocols" },
      update: {},
      create: {
        id:          "routing-protocols",
        title:       "Routing Protocols",
        description: "Static Route, OSPF, BGP สำหรับ Network Engineer",
        level:       "Intermediate",
        category:    "Routing",
        duration:    "18 hrs",
        modules: {
          create: [
            {
              title: "Static Routing",
              order: 1,
              lessons: {
                create: [
                  { title: "Static Route คืออะไร",    duration: "10 min", type: "video", order: 1 },
                  { title: "Default Route",             duration: "8 min",  type: "video", order: 2 },
                  { title: "Lab: Static Route Config",  duration: "20 min", type: "lab",   order: 3 },
                ],
              },
            },
            {
              title: "OSPF Single Area",
              order: 2,
              lessons: {
                create: [
                  { title: "OSPF Overview",              duration: "12 min", type: "video", order: 1 },
                  { title: "OSPF Neighbor Adjacency",    duration: "10 min", type: "video", order: 2 },
                  { title: "Lab: OSPF Single Area",      duration: "25 min", type: "lab",   order: 3 },
                ],
              },
            },
          ],
        },
      },
    }),

    prisma.course.upsert({
      where: { id: "network-security" },
      update: {},
      create: {
        id:          "network-security",
        title:       "Network Security",
        description: "ACL, Firewall, VPN และ Security Best Practices",
        level:       "Intermediate",
        category:    "Security",
        duration:    "15 hrs",
        modules: {
          create: [
            {
              title: "Access Control Lists",
              order: 1,
              lessons: {
                create: [
                  { title: "Standard ACL",          duration: "12 min", type: "video", order: 1 },
                  { title: "Extended ACL",           duration: "15 min", type: "video", order: 2 },
                  { title: "Lab: ACL Configuration", duration: "20 min", type: "lab",   order: 3 },
                ],
              },
            },
          ],
        },
      },
    }),
  ]);

  console.log("✅ Courses created:", courses.length);

  // ─── Labs ───────────────────────────────────────────────────────────────────
  const labs = await Promise.all([
    prisma.lab.upsert({ where: { id: "lab-vlan-routing" }, update: {}, create: { id: "lab-vlan-routing", title: "Inter-VLAN Routing Lab", category: "Switching", level: "Beginner", duration: "30 min", description: "Config Inter-VLAN Routing ด้วย Router-on-a-Stick", scenario: "บริษัทมี 3 VLAN ต้องการให้ traffic ข้ามกันได้", objective: "Config trunk, sub-interface และทดสอบ ping" } }),
    prisma.lab.upsert({ where: { id: "lab-ospf-area0" }, update: {}, create: { id: "lab-ospf-area0", title: "OSPF Single Area 0", category: "Routing", level: "Intermediate", duration: "45 min", description: "Config OSPF Area 0 บน 4 Router", scenario: "เชื่อม 4 Router ในองค์กรด้วย OSPF", objective: "สร้าง Full Adjacency และตรวจสอบ Routing Table" } }),
    prisma.lab.upsert({ where: { id: "lab-dhcp-config" }, update: {}, create: { id: "lab-dhcp-config", title: "DHCP Server Configuration", category: "Services", level: "Beginner", duration: "25 min", description: "Config DHCP Server บน Router Cisco", scenario: "PC ต้องรับ IP อัตโนมัติจาก DHCP Server", objective: "สร้าง DHCP Pool และทดสอบ IP lease" } }),
    prisma.lab.upsert({ where: { id: "lab-acl-security" }, update: {}, create: { id: "lab-acl-security", title: "ACL Security Policy", category: "Security", level: "Intermediate", duration: "35 min", description: "Config ACL เพื่อควบคุม Traffic ระหว่าง VLAN", scenario: "ต้องการป้องกัน VLAN 10 ไม่ให้เข้า Server VLAN 30", objective: "Config Extended ACL และทดสอบผล" } }),
    prisma.lab.upsert({ where: { id: "lab-stp-loop" }, update: {}, create: { id: "lab-stp-loop", title: "Spanning Tree Protocol", category: "Switching", level: "Intermediate", duration: "40 min", description: "ทำความเข้าใจ STP และป้องกัน Loop ใน LAN", scenario: "Switch 3 ตัวเชื่อมกันแบบ Full Mesh มี Loop", objective: "สังเกต STP Election และทดสอบ Failover" } }),
  ]);

  console.log("✅ Labs created:", labs.length);

  // ─── Quizzes ────────────────────────────────────────────────────────────────
  const quizQuestions = JSON.stringify([
    { id: 1, question: "OSI Model มีกี่ Layer?", options: ["5","6","7","8"], answer: 2, explanation: "OSI Model มี 7 Layer ตั้งแต่ Physical ถึง Application" },
    { id: 2, question: "Protocol ใดทำงานที่ Layer 3?", options: ["Ethernet","IP","TCP","HTTP"], answer: 1, explanation: "IP (Internet Protocol) ทำงานที่ Network Layer (Layer 3)" },
    { id: 3, question: "Default Gateway คืออะไร?", options: ["DNS Server","DHCP Server","Router Interface ที่ใช้ออก Network อื่น","Switch Port"], answer: 2, explanation: "Default Gateway คือ IP ของ Router Interface ที่ PC จะส่ง Packet ไปเมื่อ Destination อยู่ต่าง Subnet" },
  ]);

  const quizzes = await Promise.all([
    prisma.quiz.upsert({ where: { id: "quiz-osi-model" }, update: {}, create: { id: "quiz-osi-model", title: "OSI Model & TCP/IP", description: "ทดสอบความเข้าใจ OSI Model และ TCP/IP Stack", category: "Fundamentals", level: "Beginner", duration: "10 min", passingScore: 70, questionsJson: quizQuestions } }),
    prisma.quiz.upsert({ where: { id: "quiz-subnetting" }, update: {}, create: { id: "quiz-subnetting", title: "Subnetting & CIDR", description: "ทดสอบการคำนวณ Subnet", category: "IP Addressing", level: "Beginner", duration: "15 min", passingScore: 70, questionsJson: quizQuestions } }),
    prisma.quiz.upsert({ where: { id: "quiz-routing" }, update: {}, create: { id: "quiz-routing", title: "Routing Protocols", description: "ทดสอบ Static Route, OSPF, BGP", category: "Routing", level: "Intermediate", duration: "20 min", passingScore: 70, questionsJson: quizQuestions } }),
    prisma.quiz.upsert({ where: { id: "quiz-switching" }, update: {}, create: { id: "quiz-switching", title: "Switching & VLANs", description: "ทดสอบ VLAN, Trunk, STP", category: "Switching", level: "Intermediate", duration: "15 min", passingScore: 70, questionsJson: quizQuestions } }),
    prisma.quiz.upsert({ where: { id: "quiz-security" }, update: {}, create: { id: "quiz-security", title: "Network Security", description: "ทดสอบ ACL, Firewall, VPN", category: "Security", level: "Intermediate", duration: "20 min", passingScore: 75, questionsJson: quizQuestions } }),
  ]);

  console.log("✅ Quizzes created:", quizzes.length);

  // ─── Badges ─────────────────────────────────────────────────────────────────
  const badgeData = [
    { id: "subnet-master",       title: "Subnet Master",          description: "คำนวณ Subnet ได้แม่นยำ", icon: "🧮", xpReward: 150 },
    { id: "vlan-builder",        title: "VLAN Builder",            description: "Config VLAN ได้สำเร็จ",  icon: "🔗", xpReward: 100 },
    { id: "ospf-beginner",       title: "OSPF Beginner",           description: "เข้าใจ OSPF และทำ Lab สำเร็จ", icon: "🌐", xpReward: 200 },
    { id: "troubleshoot-hero",   title: "Troubleshooting Hero",    description: "แก้ปัญหา Network ได้ 5 กรณี", icon: "🔧", xpReward: 250 },
    { id: "lab-finisher",        title: "Lab Finisher",            description: "ทำ Lab ครบ 5 Labs",       icon: "🏆", xpReward: 300 },
    { id: "quiz-warrior",        title: "Quiz Warrior",            description: "ผ่าน Quiz 5 ชุดขึ้นไป",   icon: "⚔️",  xpReward: 200 },
    { id: "ai-explorer",         title: "AI Tutor Explorer",       description: "ใช้ AI Tutor ครบทุก Mode", icon: "🤖", xpReward: 100 },
    { id: "senior-ready",        title: "Senior Ready",            description: "ถึง Level 5 หรือสูงกว่า",  icon: "🎓", xpReward: 500 },
  ];

  for (const b of badgeData) {
    await prisma.badge.upsert({ where: { id: b.id }, update: {}, create: b });
  }
  console.log("✅ Badges created:", badgeData.length);

  // ─── Demo user progress & badges ────────────────────────────────────────────
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: demo.id, badgeId: "subnet-master" } },
    update: {},
    create: { userId: demo.id, badgeId: "subnet-master" },
  });
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: demo.id, badgeId: "vlan-builder" } },
    update: {},
    create: { userId: demo.id, badgeId: "vlan-builder" },
  });

  // Demo quiz score
  const quizRef = await prisma.quiz.findFirst({ where: { id: "quiz-osi-model" } });
  if (quizRef) {
    await prisma.quizScore.create({
      data: { userId: demo.id, quizId: quizRef.id, score: 85, passed: true },
    });
  }

  console.log("✅ Demo user progress seeded");
  console.log("\n🎉 Seed complete!");
  console.log("\n📧 Login credentials:");
  console.log("   Admin: admin@netpath.academy / Admin@123");
  console.log("   Demo:  demo@netpath.academy  / Demo@123");
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
