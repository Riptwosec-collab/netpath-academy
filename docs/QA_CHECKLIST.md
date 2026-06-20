# QA Checklist — NetPath Academy

## UI QA

### Responsive Breakpoints
- [ ] Mobile 360px — no horizontal scroll, tap targets ≥44px
- [ ] Mobile 390px (iPhone 14) — sidebar hidden, bottom nav visible
- [ ] Tablet 768px — sidebar hidden or collapsed, topbar visible
- [ ] Desktop 1024px — sidebar visible, content max-width respected
- [ ] Wide 1280px — no layout gaps or stretching

### Visual
- [ ] Dark theme consistent across all pages
- [ ] Glassmorphism cards render correctly
- [ ] Neon glow on hover elements
- [ ] Scrollbar styled (thin, translucent)
- [ ] Selection color (cyan highlight)

### States
- [ ] Loading spinner on slow connections (app/loading.tsx)
- [ ] Skeleton cards where applicable
- [ ] Empty state message when list is empty
- [ ] Error state with retry button
- [ ] 404 page displays correctly
- [ ] Error boundary catches JS errors

---

## Feature QA

### Auth
- [ ] Register with valid email/password → success
- [ ] Register with duplicate email → error message
- [ ] Register with short password → validation error
- [ ] Login with correct credentials → redirect to /dashboard
- [ ] Login with wrong password → error message
- [ ] Protected route without session → redirect to /login
- [ ] Admin route with USER role → redirect to /dashboard
- [ ] Sign out clears session

### Dashboard
- [ ] XP bar displays correctly
- [ ] Streak counter shows
- [ ] Recent activity loads
- [ ] All navigation links work
- [ ] Welcome message shows user name

### Courses
- [ ] Course listing loads
- [ ] Filter by level works
- [ ] Course detail page loads
- [ ] Lessons expand/collapse
- [ ] Progress saved

### Labs
- [ ] Lab listing with filters
- [ ] Lab detail page with scenario/objective
- [ ] Submit button works
- [ ] Completion updates progress

### Quiz
- [ ] Quiz listing loads
- [ ] Quiz starts, shows questions
- [ ] Answer selection works
- [ ] Score calculated correctly
- [ ] Pass/fail result shown
- [ ] Score saved to DB (if logged in)

### Troubleshooting
- [ ] Guides listing with search
- [ ] Filter by category/level works
- [ ] Guide detail with steps

### AI Tutor
- [ ] Mode selector works (10 modes)
- [ ] Send message → response received
- [ ] Fallback to mock if API not configured (503)
- [ ] Rate limit returns friendly error (429)
- [ ] History maintained in session

### Progress
- [ ] XP total correct
- [ ] Level calculated correctly
- [ ] Badges displayed
- [ ] Course progress shown
- [ ] Lab submissions listed

### Portfolio
- [ ] Portfolio listing
- [ ] Add new item (client-side)
- [ ] Filter by type
- [ ] Detail page with config/RCA blocks

### Tools
- [ ] Subnet calculator with real math
- [ ] VLAN planner edit/generate
- [ ] Command generator by category
- [ ] Config generator preview
- [ ] Network diagram viewer (4 topologies)
- [ ] Packet flow accordion

### Admin
- [ ] /admin redirects non-admins
- [ ] Overview stats correct
- [ ] Create/edit/delete Course
- [ ] Create/edit/delete Lab
- [ ] Create/edit/delete Quiz
- [ ] Manage Badges
- [ ] Manage Users (promote/demote role)
- [ ] Progress overview loads

---

## Data QA

### Database
- [ ] `npx prisma migrate dev` runs without errors
- [ ] `npx prisma db seed` creates admin + demo user + content
- [ ] Admin user: admin@netpath.academy / Admin@123
- [ ] Demo user: demo@netpath.academy / Demo@123
- [ ] 3 courses with modules+lessons seeded
- [ ] 5 labs seeded
- [ ] 5 quizzes seeded
- [ ] 8 badges seeded

### API
- [ ] POST /api/register → creates user
- [ ] POST /api/auth/callback/credentials → authenticates
- [ ] POST /api/ai-tutor → returns AI response or 503
- [ ] GET  /api/user/progress → returns user data (auth required)

---

## Health Page
- [ ] /health shows App: Running
- [ ] /health shows Environment mode
- [ ] /health shows DB configured/missing
- [ ] /health shows AI configured/missing
- [ ] /health does NOT show actual secret values
