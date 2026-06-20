# Deployment Guide — Vercel

## Prerequisites

- GitHub account with repo containing the project
- Vercel account (free tier works)
- Production PostgreSQL database (Supabase / Neon / Railway — all free tier available)

---

## Step 1 — Create Production Database

### Option A: Supabase (recommended)
1. Go to https://supabase.com → New Project
2. Copy the **Connection string** (Transaction Pooler, port 5432)
3. Add `?sslmode=require` to the URL

### Option B: Neon (serverless)
1. Go to https://neon.tech → New Project
2. Copy the **Connection string**

### Option C: Railway
1. Go to https://railway.app → New Project → PostgreSQL
2. Copy DATABASE_URL from Variables tab

---

## Step 2 — Push Code to GitHub

```bash
git add .
git commit -m "feat: NetPath Academy v1.0.0"
git push origin main
```

---

## Step 3 — Import Project in Vercel

1. Go to https://vercel.com → Add New Project
2. Import from GitHub → select your repository
3. Framework: **Next.js** (auto-detected)
4. Build settings auto-configured via `vercel.json`

---

## Step 4 — Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://...?sslmode=require` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` output |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |
| `OPENAI_API_KEY` | `sk-...` (optional) |
| `AI_MODEL` | `gpt-4.1-mini` |
| `NEXT_PUBLIC_APP_NAME` | `NetPath Academy` |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` |

> ⚠️ `NEXTAUTH_URL` must match your exact Vercel URL — get it after first deploy

---

## Step 5 — Deploy

Click **Deploy** in Vercel.  
Vercel runs: `npx prisma generate && npm run build`

---

## Step 6 — Run Database Migration

After deploy, run migrations against production DB:

```bash
# Using Vercel CLI
npm i -g vercel
vercel env pull .env.production.local
DATABASE_URL="<your-production-url>" npx prisma migrate deploy
DATABASE_URL="<your-production-url>" npx prisma db seed
```

Or run directly if your machine can connect to the DB:
```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx prisma db seed
```

---

## Step 7 — Verify

1. Open `https://your-project.vercel.app/health` — all items should be green
2. Test login with `admin@netpath.academy` / `Admin@123`
3. Test login with `demo@netpath.academy` / `Demo@123`
4. Test AI Tutor — send a message
5. Test `/admin` with admin account

---

## Common Errors

### `NEXTAUTH_URL does not match request host`
- Update `NEXTAUTH_URL` in Vercel env vars to exact deployed URL
- Redeploy after change

### `PrismaClientInitializationError: Can't reach database`
- Check `DATABASE_URL` in Vercel env
- Ensure DB allows connections from Vercel IPs (or use connection pooler)
- For Supabase: use Transaction Pooler URL (port 5432 or 6543)

### `Error: Prisma Client not generated`
- Vercel's build command in `vercel.json` includes `npx prisma generate` — verify it ran
- Check build logs in Vercel dashboard

### `Module not found` / Build fails
- Run `npm run build` locally first
- Fix all TypeScript errors before deploying

### Admin panel shows "Access Denied"
- Confirm `role` is `ADMIN` in DB: `SELECT role FROM "User" WHERE email='admin@netpath.academy';`
- If not, update: `UPDATE "User" SET role='ADMIN' WHERE email='admin@netpath.academy';`

---

## Rollback

In Vercel Dashboard:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → Promote to Production

Or via CLI:
```bash
vercel rollback
```
