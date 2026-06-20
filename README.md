# NetPath Academy

> A full-stack Network Engineer learning platform with roadmap, courses, hands-on labs, quizzes, AI tutor, progress tracking, portfolio system, network tools, and admin CMS.

**NetPath Academy คือแพลตฟอร์มเรียนรู้สาย Network Engineer แบบครบวงจร ตั้งแต่พื้นฐานจนถึงระดับ Senior มี Roadmap, Course, Lab, Quiz, Troubleshooting Guide, AI Tutor, Progress, Portfolio และ Admin CMS**

---

## Overview

NetPath Academy helps aspiring Network Engineers follow a structured learning path with:
- Clear progression from beginner to Network Architect (7 levels)
- Hands-on labs with real Cisco-style scenarios
- AI Network Tutor powered by OpenAI (10 specialized modes)
- XP, badge, and level system for motivation
- Portfolio builder for job applications
- Interactive network tools (subnet calculator, VLAN planner, etc.)

---

## Features

### Learning
- **Roadmap** — 7-level learning path with skill milestones
- **Courses** — 8+ structured courses with modules and lessons
- **Labs** — Hands-on lab scenarios with objectives and solutions
- **Quiz** — Multiple-choice quizzes with scoring and pass/fail
- **Troubleshooting Guides** — Step-by-step resolution for common issues

### AI Tutor
- 10 AI modes: explain, config, log, lab, quiz, rca, summary, troubleshooting, commands, portfolio
- Server-side only — OpenAI key never exposed to browser
- Graceful mock fallback when API not configured

### User System
- Authentication with NextAuth.js (email + password)
- XP and level progression
- Learning streak tracking
- Badge system (8+ badges)
- Progress tracking across courses, labs, quizzes

### Network Tools
- Subnet Calculator (real IPv4 math)
- VLAN Planner with Cisco config generator
- Command Generator (4 categories)
- Config Generator (5 templates: VLAN, OSPF, DHCP, PAT)
- Network Diagram Viewer (4 topologies)
- Packet Flow Viewer

### Portfolio
- 8 portfolio item types
- Config block with copy-to-clipboard
- RCA report builder
- Project timeline view

### Admin CMS
- Role-based access (USER / ADMIN)
- CRUD for Courses, Labs, Quizzes, Badges
- User role management
- Progress and activity overview

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Auth | NextAuth.js v4 |
| ORM | Prisma |
| Database | PostgreSQL |
| AI | OpenAI API (server-side) |
| Deployment | Vercel |
| Testing | Vitest + Testing Library |

---

## Architecture

```
Browser
  │
  ▼
Next.js App Router
  ├── Server Components (data fetching, DB calls)
  ├── Client Components (interaction, state)
  ├── Server Actions (admin CRUD mutations)
  └── API Routes
        ├── /api/auth/[...nextauth]
        ├── /api/register
        └── /api/ai-tutor → OpenAI API (server-side proxy)
              │
              ▼
        Prisma ORM → PostgreSQL
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+
- PostgreSQL 14+

### Installation

```bash
git clone <your-repo-url>
cd netpath-academy
npm install

cp .env.example .env.local
# Edit .env.local with your credentials

npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/netpath_academy"

# NextAuth — generate: openssl rand -base64 32
NEXTAUTH_SECRET="your-strong-secret"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (optional — uses mock if missing)
OPENAI_API_KEY="sk-..."
AI_MODEL="gpt-4.1-mini"

# App
NEXT_PUBLIC_APP_NAME="NetPath Academy"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> ⚠️ Never commit `.env.local` to git. Never use `NEXT_PUBLIC_` for secrets.

---

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Development migration
npx prisma migrate dev --name init

# Seed initial data
npx prisma db seed

# Browse DB
npx prisma studio
```

---

## Authentication

NextAuth.js with Credentials Provider and JWT strategy.

**Demo Accounts (after seeding):**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@netpath.academy | Admin@123 |
| Demo | demo@netpath.academy | Demo@123 |

> ⚠️ Change admin password before making the app public.

---

## AI Tutor Setup

1. Get an OpenAI API key from https://platform.openai.com
2. Add to `.env.local`: `OPENAI_API_KEY="sk-..."`
3. Set model: `AI_MODEL="gpt-4.1-mini"`

Without a key, the AI Tutor uses mock responses with a warning banner.

---

## Admin CMS

Access at `/admin` — requires ADMIN role.

Features: manage courses, labs, quizzes, badges, users, view progress.

---

## Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run test         # Vitest tests
npm run typecheck    # TypeScript check
npm run qa           # typecheck + test + build
```

---

## Deployment (Vercel)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full guide.

Quick steps:
1. Push to GitHub
2. Import in Vercel → set environment variables
3. Deploy (auto-runs `npx prisma generate && npm run build`)
4. Run `npx prisma migrate deploy` against production DB
5. Verify `/health` page

---

## Project Structure

```
app/          # Pages and routes (App Router)
components/   # React components
  ui/         # Design system (Button, Card, Badge, Progress...)
  layout/     # AppShell, Sidebar, Topbar, MobileNav
  admin/      # Admin CMS components
  ai/         # AI Tutor components
  auth/       # Auth forms
data/         # Static/mock data
docs/         # Documentation
lib/          # Server utilities
  adminActions.ts   # Server Actions
  adminAuth.ts      # requireAdmin() guard
  auth.ts           # NextAuth config
  env.ts            # Environment validation
  openai.ts         # OpenAI client (server-only)
  prisma.ts         # Prisma singleton
  rateLimit.ts      # Rate limiter
  security.ts       # Security helpers
  validation.ts     # Input validation
prisma/       # Schema + seed
tests/        # Vitest tests
types/        # TypeScript types
```

---

## Health Check

`/health` — shows app status, environment mode, DB config, AI config.  
Safe to monitor — never reveals actual secret values.

---

## Demo Account

After running `npx prisma db seed`:
- Demo: `demo@netpath.academy` / `Demo@123` — explore full learning features
- Admin: `admin@netpath.academy` / `Admin@123` — manage content

---

## Known Issues

- AI response quality depends on OpenAI API availability and rate limits
- In-memory rate limiter resets on server restart — use Redis for production scale
- File upload not included (portfolio items use text/config data only)
- Admin forms use JSON textarea for questionsJson (no visual question builder)
- No email verification for registration in v1

---

## Future Improvements

- Real network lab simulator (Packet Tracer style)
- Topology builder with drag-and-drop
- File upload for portfolio items
- Public portfolio profile URL
- Payment / subscription tiers
- Community discussion / Q&A
- Leaderboard
- Redis-backed rate limiting
- Email notifications
- Advanced analytics dashboard
- Mobile app (React Native)

---

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/SETUP.md](docs/SETUP.md) | Installation and setup guide |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel deployment steps |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [docs/API_ROUTES.md](docs/API_ROUTES.md) | API reference |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | Database models |
| [docs/AI_TUTOR.md](docs/AI_TUTOR.md) | AI Tutor details |
| [docs/QA_CHECKLIST.md](docs/QA_CHECKLIST.md) | QA and testing checklist |
| [docs/SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md) | Security checklist |
| [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) | Pre-deploy checklist |
| [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) | Release checklist |
| [docs/PORTFOLIO_PRESENTATION.md](docs/PORTFOLIO_PRESENTATION.md) | Portfolio / interview summary |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

---

## License

[MIT](LICENSE)

---

## Author

Built as a full-stack portfolio project demonstrating Next.js 14, TypeScript, Prisma, PostgreSQL, NextAuth.js, OpenAI API, and production deployment practices.
