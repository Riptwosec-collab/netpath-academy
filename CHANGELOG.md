# Changelog — NetPath Academy

All notable changes to this project are documented here.

---

## [v1.0.0] — 2026-06-20

### Initial Full Release

#### Learning System
- Learning Roadmap — 7-level progression from Beginner to Network Architect
- 8 Courses with modules and lessons
- 8 Hands-on Labs with scenario, objective, and solution
- 8 Quizzes with multiple-choice questions and scoring
- 10 Troubleshooting Guides with step-by-step resolution

#### AI System
- AI Network Tutor with 10 modes: explain, config, log, lab, quiz, rca, summary, troubleshooting, commands, portfolio
- Server-side OpenAI API integration (key never exposed to client)
- Mock response fallback when API not configured (503 graceful degradation)
- In-memory rate limiting (10 req/min per IP)

#### User System
- Authentication via NextAuth.js Credentials Provider
- User registration with bcrypt password hashing
- XP and level progression system
- Learning streak tracking
- Badge unlock system (8 badges)
- User Progress tracking across courses, labs, quizzes

#### Portfolio System
- 8 portfolio item types (project, config, diagram, lab, rca, automation, certification, documentation)
- Config block with copy-to-clipboard
- RCA report block
- Project timeline view

#### Network Tools
- Subnet Calculator with real IPv4 math
- VLAN Planner with Cisco config generator
- Command Generator (4 categories)
- Config Generator (5 templates)
- Network Diagram Viewer (4 topologies: Star, RoaS, OSPF, DMZ)
- Packet Flow Viewer (2 flows)

#### Database
- PostgreSQL with Prisma ORM
- Full schema: User, Course, Module, Lesson, Lab, Quiz, TroubleshootingGuide, UserProgress, QuizScore, LabSubmission, Badge, UserBadge, PortfolioItem, AiConversation, Note
- Seed data with admin user, demo user, 3 courses, 5 labs, 5 quizzes, 8 badges

#### Admin CMS
- Role-based access control (USER / ADMIN)
- CRUD for Courses, Labs, Quizzes, Badges
- User role management (promote/demote)
- Progress overview (lab submissions, quiz scores, badge awards)
- Server Actions with `"use server"` directive

#### Production
- Vercel deployment configuration
- Sitemap and Robots.txt
- Health check page at /health
- Loading, Error, and 404 pages
- SEO metadata with OpenGraph
- Environment variable validation

#### UI/UX
- Dark Neon theme (#050816 background)
- Glassmorphism cards with backdrop-blur
- Responsive design (mobile-first)
- Improved mobile bottom navigation with slide drawer
- Design system: Button, Card, Badge, Progress, Input, Textarea, EmptyState, ErrorState, LoadingCard, PageHeader, StatCard

#### Testing & Security
- Vitest test suite (networkCalculations, aiValidation, env, UI components)
- Rate limiting on AI API
- Input sanitization helpers
- Security, QA, and Production Readiness documentation

---

## [v0.x.x] — Pre-release Development Phases

- Phase 1–3: Project setup, routing, mock data
- Phase 4: Courses system
- Phase 5: Quiz system
- Phase 6: Troubleshooting guides
- Phase 7: AI Tutor (mock)
- Phase 8: Progress / XP / Badges
- Phase 9: Portfolio system
- Phase 10: Network Tools
- Phase 11: Database / Auth / Prisma
- Phase 12: Real AI integration
- Phase 13: Admin CMS
