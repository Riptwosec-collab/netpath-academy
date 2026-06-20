# Security Checklist — NetPath Academy

## Authentication & Sessions

- [x] Passwords hashed with bcrypt (rounds: 12)
- [x] Session managed by NextAuth with JWT strategy
- [x] `NEXTAUTH_SECRET` used for JWT signing — must be ≥32 chars in production
- [x] `NEXTAUTH_URL` set to exact production URL (no trailing slash)
- [x] Session cookie is `httpOnly` and `secure` in production (managed by NextAuth)
- [x] `password` field never returned from any API route
- [x] `getServerSession()` used server-side — never trust client-provided user ID

## Authorization

- [x] All `/admin/*` routes guarded by `requireAdmin()` in layout.tsx
- [x] `requireAdmin()` checks both session existence AND `role === "ADMIN"`
- [x] All Server Actions call `guardAdmin()` before any DB mutation
- [x] Regular users cannot access `/admin` — redirected to `/dashboard`
- [x] Unauthenticated users redirected to `/login`

## Environment Variables

- [x] `DATABASE_URL` is server-side only (no `NEXT_PUBLIC_` prefix)
- [x] `NEXTAUTH_SECRET` is server-side only
- [x] `OPENAI_API_KEY` is server-side only
- [x] `NEXT_PUBLIC_OPENAI_API_KEY` does NOT exist anywhere
- [x] `.env.local` is in `.gitignore` — never committed to git
- [x] `.env.example` contains only placeholder values

## API Security

- [x] `/api/ai-tutor` validates input via `validateAiRequest()`
- [x] `/api/ai-tutor` enforces rate limit (10 req/min per IP)
- [x] `/api/ai-tutor` does not expose stack traces on error
- [x] `/api/ai-tutor` only accepts whitelisted modes
- [x] `/api/register` validates email format and password length
- [x] `/api/register` checks for duplicate email before creation
- [x] Error responses do not include SQL or internal details

## Database

- [x] Prisma ORM used — parameterized queries, SQL injection not possible
- [x] Production uses `?sslmode=require` in DATABASE_URL
- [x] Prisma seed creates users with hashed passwords only
- [x] `@@unique` constraints on UserProgress and UserBadge prevent duplicates

## AI API

- [x] OpenAI API called only from `/api/ai-tutor` (server-side)
- [x] API key never sent to browser
- [x] User input sanitized before sending to OpenAI
- [x] Rate limit prevents API abuse

## Frontend

- [x] `app/error.tsx` never shows stack traces to user
- [x] `/health` page shows config presence only — no actual values
- [x] Admin Access Denied shown via server-side redirect, not client-only guard

## Pre-Deploy Checklist

- [ ] `NEXTAUTH_SECRET` is a strong random string (openssl rand -base64 32)
- [ ] `NEXTAUTH_URL` matches the exact Vercel deployment URL
- [ ] `DATABASE_URL` points to production DB with SSL
- [ ] `.env.local` is NOT pushed to GitHub
- [ ] Vercel environment variables set in project settings
- [ ] Run `npm run build` locally — must pass with 0 errors
- [ ] Run `npx prisma generate` before build
- [ ] Verify `/health` after deploy shows all OK
