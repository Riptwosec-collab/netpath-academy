# Release Checklist — NetPath Academy v1.0.0

## Code Quality

- [ ] `npm run typecheck` — zero TypeScript errors
- [ ] `npm run test` — all tests pass (networkCalculations, aiValidation, env, Button, Progress, Badge)
- [ ] `npm run build` — build completes with no errors
- [ ] `npm run qa` — all three pass in sequence
- [ ] No hardcoded secrets in any file
- [ ] No `console.log` with sensitive data
- [ ] `app/error.tsx` does not expose stack traces

## Environment

- [ ] `DATABASE_URL` — production PostgreSQL with `?sslmode=require`
- [ ] `NEXTAUTH_SECRET` — ≥32 chars random string (`openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` — exact Vercel production URL (no trailing slash)
- [ ] `OPENAI_API_KEY` — set if AI Tutor is enabled
- [ ] `NEXT_PUBLIC_APP_URL` — matches `NEXTAUTH_URL`
- [ ] `.env.local` NOT committed to git (in `.gitignore`)

## Database

- [ ] `npx prisma migrate deploy` run against production DB — no errors
- [ ] `npx prisma db seed` completed — admin + demo user + content seeded
- [ ] Admin user exists: `admin@netpath.academy` / `Admin@123`
- [ ] ⚠️ Change admin password after first login in production

## Security

- [ ] `/admin` redirects regular users to `/dashboard`
- [ ] `/admin` redirects unauthenticated users to `/login`
- [ ] AI API rate limit active (429 returned after 10 req/min)
- [ ] `OPENAI_API_KEY` not accessible in browser DevTools Network tab
- [ ] `/health` shows status without revealing actual secret values

## UI / UX

- [ ] Mobile (360px) — no horizontal scroll
- [ ] Mobile — bottom nav visible, sidebar hidden
- [ ] Desktop — sidebar visible, content readable
- [ ] Loading page (app/loading.tsx) renders correctly
- [ ] 404 page (app/not-found.tsx) renders correctly
- [ ] Error page (app/error.tsx) with Try Again button works
- [ ] Empty states shown when lists are empty
- [ ] Dark theme consistent across all pages

## Features

- [ ] Login with admin account → admin panel accessible
- [ ] Login with demo account → admin panel NOT accessible
- [ ] Register new account → success
- [ ] Course listing + detail loads
- [ ] Lab listing + detail loads, submit works
- [ ] Quiz starts, completes, score saved
- [ ] Troubleshooting guides filter works
- [ ] AI Tutor sends message (real or mock response)
- [ ] Progress page shows XP / level / badges
- [ ] Portfolio add/view works
- [ ] All 6 Network Tools functional
- [ ] Admin CRUD for Course/Lab/Quiz/Badge
- [ ] Admin user role toggle works

## Deploy (Vercel)

- [ ] Push to GitHub main branch
- [ ] Vercel deployment succeeds (check build log)
- [ ] All environment variables set in Vercel project settings
- [ ] `https://your-domain.vercel.app` loads
- [ ] HTTPS enabled
- [ ] `/health` page shows all green
- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible

## Post-Deploy Verification

- [ ] Login as admin — test full admin flow
- [ ] Login as demo — confirm no admin access
- [ ] Submit a lab — check progress API
- [ ] Take a quiz — score saved
- [ ] AI Tutor — send 1 message in each mode (spot-check 3 modes)
- [ ] Mobile device test — entire app navigable
- [ ] Check Vercel Analytics is receiving traffic

---

**Release approved by:** _______________  
**Release date:** _______________  
**Version:** v1.0.0
