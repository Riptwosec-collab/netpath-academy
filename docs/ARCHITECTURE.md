# Architecture — NetPath Academy

## Overview

NetPath Academy is a full-stack web application built with Next.js 14 App Router.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS v3, CSS custom properties |
| Language | TypeScript (strict) |
| Auth | NextAuth.js v4 (JWT + Credentials) |
| Database | PostgreSQL |
| ORM | Prisma |
| AI | OpenAI API (server-side only) |
| Deployment | Vercel |

## Architecture Diagram

```
Browser
  │
  ▼
Next.js App Router
  ├── Server Components (data fetching, DB calls)
  ├── Client Components ("use client" — interaction, state)
  ├── Server Actions ("use server" — form mutations)
  └── API Routes (/api/*)
        ├── /api/auth/[...nextauth]  ← NextAuth handler
        ├── /api/register            ← User registration
        └── /api/ai-tutor            ← OpenAI proxy

  ▼
Prisma ORM
  │
  ▼
PostgreSQL Database

AI Flow:
Client Component → fetch("/api/ai-tutor") → [Server] → OpenAI API → response → client
```

## Folder Structure

```
netpath-academy/
├── app/                      # Next.js App Router pages
│   ├── (auth pages)          # login, register
│   ├── admin/                # Admin CMS (ADMIN role only)
│   ├── api/                  # API routes
│   │   ├── ai-tutor/         # OpenAI proxy
│   │   ├── auth/             # NextAuth
│   │   ├── register/         # User registration
│   │   └── user/progress/    # Progress API
│   ├── courses/              # Course listing + detail
│   ├── dashboard/            # Main dashboard
│   ├── health/               # Health check
│   ├── labs/                 # Lab listing + detail
│   ├── portfolio/            # Portfolio system
│   ├── profile/              # User profile
│   ├── progress/             # Progress tracking
│   ├── quiz/                 # Quiz system
│   ├── roadmap/              # Learning roadmap
│   ├── tools/                # Network tools
│   ├── troubleshooting/      # Troubleshooting guides
│   ├── error.tsx             # Error boundary
│   ├── loading.tsx           # Suspense fallback
│   ├── not-found.tsx         # 404 page
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout + metadata
│
├── components/               # Reusable components
│   ├── admin/                # Admin UI
│   ├── ai/                   # AI Tutor UI
│   ├── auth/                 # Auth forms
│   ├── courses/              # Course components
│   ├── labs/                 # Lab components
│   ├── layout/               # AppShell, Sidebar, Topbar, MobileNav
│   ├── portfolio/            # Portfolio components
│   ├── profile/              # Profile components
│   ├── progress/             # Progress components
│   ├── quiz/                 # Quiz components
│   ├── roadmap/              # Roadmap components
│   ├── tools/                # Tool components
│   ├── troubleshooting/      # Guide components
│   └── ui/                   # Design system primitives
│
├── data/                     # Mock/static data
├── docs/                     # Documentation
├── lib/                      # Server utilities
│   ├── adminActions.ts       # Server Actions (admin CRUD)
│   ├── adminAuth.ts          # requireAdmin() guard
│   ├── aiSystemPrompt.ts     # AI prompt builder
│   ├── aiValidation.ts       # Request validation
│   ├── auth.ts               # NextAuth config
│   ├── env.ts                # Environment validation
│   ├── metadata.ts           # SEO metadata
│   ├── networkCalculations.ts# Subnet math
│   ├── openai.ts             # OpenAI client (server-only)
│   ├── prisma.ts             # Prisma singleton
│   ├── rateLimit.ts          # In-memory rate limiter
│   ├── security.ts           # Security helpers
│   ├── session.ts            # Session helpers
│   ├── utils.ts              # General utilities
│   └── validation.ts         # Input validation
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
│
├── tests/                    # Vitest tests
│   ├── components/
│   └── lib/
│
├── types/                    # TypeScript types
│   ├── admin.ts
│   ├── ai.ts
│   └── auth.ts
│
├── .env.example              # Environment template
├── CHANGELOG.md
├── LICENSE
├── README.md
├── vercel.json
└── vitest.config.ts
```

## Key Design Decisions

### Server vs Client Components
- Default: Server Components (data fetching, rendering)
- Client Components: interactive UI (chat, forms, filters)
- Rule: never import server-only modules in `"use client"` files

### Auth Strategy
- JWT strategy (stateless, no DB session table)
- `getServerSession()` on server, `useSession()` on client
- Password never returned to client from any API

### AI Security
- OpenAI API key lives only in server environment
- All AI calls go through `/api/ai-tutor` (proxy route)
- Input validated and rate-limited before forwarding

### Admin Security
- Layout-level `requireAdmin()` protects entire `/admin/*` tree
- Server Actions also call `guardAdmin()` for defense-in-depth
- Role stored in DB, checked server-side on every request
