# Production Readiness — NetPath Academy

## Pre-Deploy

### Code Quality
- [ ] `npm run typecheck` — zero TypeScript errors
- [ ] `npm run test` — all tests pass
- [ ] `npm run build` — build succeeds locally
- [ ] No `console.log` with sensitive data left in code
- [ ] `app/error.tsx` does not expose stack traces

### Environment
- [ ] `.env.local` created from `.env.example`
- [ ] `DATABASE_URL` set with real production credentials + `?sslmode=require`
- [ ] `NEXTAUTH_SECRET` is ≥32 chars (generate: `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` is exact Vercel URL (e.g. `https://myapp.vercel.app`)
- [ ] `OPENAI_API_KEY` set if AI Tutor is enabled
- [ ] `NEXT_PUBLIC_APP_URL` matches `NEXTAUTH_URL`

### Database
- [ ] Production PostgreSQL database created (Supabase / Neon / Railway)
- [ ] Database accessible from Vercel (allow external connections or use connection string)
- [ ] `npx prisma migrate deploy` run against production DB
- [ ] `npx prisma db seed` run to populate initial data
- [ ] Admin user exists (admin@netpath.academy / Admin@123 — **change password**)

### Auth
- [ ] `NEXTAUTH_SECRET` matches across all instances
- [ ] `NEXTAUTH_URL` returns the correct host when accessed
- [ ] Login flow tested end-to-end in production

### AI
- [ ] OpenAI API key has sufficient credits
- [ ] AI mode `gpt-4.1-mini` or correct model set in `AI_MODEL`
- [ ] Fallback mock response works when API returns 503

### Security
- [ ] All items in `docs/SECURITY_CHECKLIST.md` checked
- [ ] Admin route protected (tested with non-admin account)
- [ ] Rate limit active on `/api/ai-tutor`

## Deploy Steps

1. Push final code to GitHub main branch
2. Import repository in Vercel dashboard
3. Set Framework: Next.js
4. Set all environment variables in Vercel project settings
5. Deploy (Vercel runs `npx prisma generate && npm run build` per vercel.json)
6. After deploy: run `npx prisma migrate deploy` via Vercel CLI or DB migration tool
7. Verify `/health` page — all green
8. Test login with admin and demo accounts
9. Test AI Tutor — real response or expected mock fallback
10. Test at least one Lab submit, one Quiz, one Admin page

## Performance

- [ ] Images are in `/public` and have explicit width/height where possible
- [ ] No large client-side bundle (avoid importing heavy libs in Client Components)
- [ ] Server Components used for all data-fetching pages
- [ ] `revalidatePath` called after admin mutations (already done via Server Actions)

## SEO

- [ ] `app/sitemap.ts` returns correct URL base
- [ ] `app/robots.ts` blocks `/admin` and `/api`
- [ ] `lib/metadata.ts` default metadata applied to layout
- [ ] OG image added at `/public/og-image.png` (optional but recommended)

## Monitoring (Recommended)

- [ ] Vercel Analytics enabled (free tier)
- [ ] Vercel Speed Insights enabled
- [ ] Error reporting via Sentry (optional)
- [ ] Uptime monitor on `/health` (e.g. UptimeRobot, BetterUptime)

## Post-Deploy Checklist

- [ ] App loads at production URL
- [ ] HTTPS working
- [ ] Login/register flow works
- [ ] Dashboard loads
- [ ] AI Tutor responds (or shows mock if not configured)
- [ ] Admin panel accessible only with ADMIN role
- [ ] `/health` shows all configured correctly
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots at `/robots.txt`

## Rollback

If deploy breaks:
1. Vercel dashboard → Deployments → select previous deployment → Redeploy
2. Or: `vercel rollback` via Vercel CLI
3. Database migrations cannot be auto-rolled back — test migrations locally first

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `NEXTAUTH_URL does not match` | NEXTAUTH_URL env wrong | Set to exact Vercel URL |
| `PrismaClientInitializationError` | DATABASE_URL missing or wrong | Check SSL, credentials, whitelist IP |
| `Prisma Client not generated` | Missing prisma generate | vercel.json buildCommand includes it |
| `401 Unauthorized on /admin` | Session not recognized | Check NEXTAUTH_SECRET matches |
| `503 from /api/ai-tutor` | OPENAI_API_KEY missing | Add key or use mock mode |
| `429 from /api/ai-tutor` | Rate limit hit | Wait 1 minute |
