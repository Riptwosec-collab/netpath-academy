# Setup Guide — NetPath Academy

## Prerequisites

- Node.js 18.17+ (recommended: 20 LTS)
- npm 9+
- PostgreSQL 14+ (local or cloud)
- Git

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd netpath-academy

# 2. Install dependencies
npm install

# 3. Install dev/test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react

# 4. Copy environment file
cp .env.example .env.local
```

## Environment Variables

Edit `.env.local`:

```env
# PostgreSQL — local example
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/netpath_academy"

# NextAuth — generate secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI — optional, falls back to mock if missing
OPENAI_API_KEY="sk-..."
AI_MODEL="gpt-4.1-mini"

# App
NEXT_PUBLIC_APP_NAME="NetPath Academy"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create database tables (development)
npx prisma migrate dev --name init

# Seed initial data
npx prisma db seed
```

Seed creates:
- Admin user: `admin@netpath.academy` / `Admin@123`
- Demo user:  `demo@netpath.academy` / `Demo@123`
- 3 courses, 5 labs, 5 quizzes, 8 badges

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm run start
```

## Run Tests

```bash
npm run test          # run all tests
npm run test:watch    # watch mode
npm run typecheck     # TypeScript type checking
npm run qa            # full QA: typecheck + test + build
```

## Useful Commands

```bash
# Open Prisma Studio (DB browser)
npx prisma studio

# Reset database and re-seed
npx prisma migrate reset

# View migration history
npx prisma migrate status

# Format Prisma schema
npx prisma format
```

## Troubleshooting

**`Can't reach database` error**
- Confirm PostgreSQL is running: `pg_isready`
- Check DATABASE_URL credentials
- For Supabase/Neon/Railway: ensure connection string includes `?sslmode=require`

**`Prisma Client not found` error**
- Run `npx prisma generate`

**`NEXTAUTH_URL mismatch` in production**
- `NEXTAUTH_URL` must exactly match your deployment URL including protocol

**`OPENAI_API_KEY not set` — AI shows mock responses**
- This is expected behavior — add your key to `.env.local` for real AI
