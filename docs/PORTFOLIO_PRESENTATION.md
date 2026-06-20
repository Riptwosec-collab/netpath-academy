# Portfolio Presentation — NetPath Academy

## สำหรับใช้พูดในการสัมภาษณ์หรือโชว์ Portfolio

---

## Project Summary (English)

**Project:** NetPath Academy  
**Type:** Full-Stack Web Application  
**Role:** Full-Stack Developer / Product Designer  
**Duration:** Solo project  
**Status:** Production-ready v1.0.0

**Problem:**  
Aspiring Network Engineers lack a structured learning path and practical resources to progress from beginner to senior level. Most resources are fragmented across different platforms.

**Solution:**  
Built a comprehensive, unified learning platform that combines roadmap guidance, structured courses, hands-on labs, quizzes, AI tutoring, progress tracking, portfolio management, and network tools — all in one place.

**Impact:**  
Learners can see a clear path, practice real skills, measure their progress, and build a professional portfolio to showcase in job applications.

---

## Project Summary (ภาษาไทย)

**โปรเจกต์:** NetPath Academy  
**ประเภท:** Full-Stack Web Application  
**บทบาท:** Full-Stack Developer / Product Designer  

**ปัญหา:**  
คนที่อยากเข้าสาย Network Engineer ไม่มี Roadmap ที่ชัดเจน และขาดแพลตฟอร์มรวมที่มีทั้ง Course, Lab, Quiz และ AI Tutor

**วิธีแก้:**  
สร้างเว็บเรียนรู้แบบครบวงจร ตั้งแต่ Roadmap, Course, Lab, Quiz, AI Tutor, Progress Tracking, Portfolio จนถึง Network Tools และ Admin CMS

**ผลลัพธ์:**  
ผู้เรียนเห็นเส้นทางที่ชัดเจน ฝึกทักษะจริง วัดผลได้ และสร้าง Portfolio สำหรับสมัครงาน

---

## Technical Highlights

### Architecture Decisions
- **Next.js App Router** — chose Server Components for data-fetching pages to reduce bundle size; Client Components only where interaction is needed
- **Server-side AI** — OpenAI API calls routed through `/api/ai-tutor` to ensure the API key never reaches the browser
- **Prisma + PostgreSQL** — type-safe ORM with migrations; prevents SQL injection by design
- **NextAuth JWT** — stateless sessions; `getServerSession()` on every server request for auth check
- **Role-based access** — `requireAdmin()` at layout level + Server Action guard for defense-in-depth

### Interesting Challenges Solved
1. **AI mock fallback** — when OpenAI is not configured, returns graceful 503 and client falls back to pre-built mock responses with a warning
2. **Prisma singleton** — using `globalThis` to prevent multiple Prisma clients during Next.js hot-reload in development
3. **Real subnet math** — implemented IPv4 calculation from scratch (`ipToNumber`, `cidrToSubnetMask`, `calculateSubnet`) without external libraries
4. **Admin protection at scale** — layout-level `requireAdmin()` means all child routes are protected without per-page code

---

## Tech Stack Talking Points

| Technology | Why |
|------------|-----|
| Next.js 14 | App Router = Server Components, Server Actions, built-in routing |
| TypeScript | Catch bugs at compile time, better DX with Prisma generated types |
| Tailwind CSS | Rapid development, consistent design tokens |
| Prisma | Type-safe DB queries, automatic migration management |
| NextAuth.js | Production-ready auth without building from scratch |
| OpenAI API | Network-specific AI tutor with mode-based prompt engineering |
| Vercel | Zero-config deployment, edge CDN |

---

## GitHub Description

```
A full-stack Network Engineer learning platform with roadmap, courses, hands-on labs, quizzes, 
AI tutor, progress tracking, portfolio system, network tools, and admin CMS. 
Built with Next.js 14, TypeScript, Prisma, PostgreSQL, NextAuth, and OpenAI API.
```

## GitHub Topics / Tags

```
nextjs typescript tailwindcss prisma postgresql nextauth openai networking ccna ccnp 
learning-platform full-stack vercel
```

---

## Key Metrics to Mention

- **17 development phases** — structured from foundation to production
- **40+ components** — reusable design system
- **10 AI modes** — context-aware prompts per use case
- **8 courses, 8 labs, 8 quizzes** — real learning content
- **15+ Prisma models** — comprehensive data schema
- **Full admin CMS** — non-developer can manage all content
- **Production-ready** — SEO, sitemap, health check, error pages, rate limiting, security

---

## One-Liner for Resume

> Built NetPath Academy — a full-stack Network Engineer learning platform with AI tutoring, 
> hands-on labs, quiz engine, progress tracking, and admin CMS using Next.js 14, 
> TypeScript, Prisma, PostgreSQL, NextAuth, and OpenAI API.
