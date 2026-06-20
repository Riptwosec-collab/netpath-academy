# API Routes — NetPath Academy

All API routes are in `app/api/`. They are server-side only and never expose secrets.

---

## Authentication

### `GET/POST /api/auth/[...nextauth]`
NextAuth.js handler — handles sign in, sign out, session callbacks.

**Providers:** Credentials (email + password)  
**Strategy:** JWT  
**Session fields:** `id`, `email`, `name`, `role`

---

## User Registration

### `POST /api/register`

Register a new user account.

**Request:**
```json
{
  "name":     "John Doe",
  "email":    "john@example.com",
  "password": "securepassword"
}
```

**Success (201):**
```json
{
  "id":    "cuid...",
  "name":  "John Doe",
  "email": "john@example.com",
  "role":  "USER"
}
```

**Errors:**
- `400` — Missing fields, invalid email, password too short
- `409` — Email already registered
- `500` — Server error

---

## AI Tutor

### `POST /api/ai-tutor`

Proxy to OpenAI API. Server-side only — API key never reaches client.

**Rate Limit:** 10 requests per minute per IP

**Request:**
```json
{
  "mode":    "explain",
  "message": "What is OSPF?",
  "history": [
    { "role": "user",      "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Modes:** `explain` | `config` | `log` | `lab` | `quiz` | `rca` | `summary` | `troubleshooting` | `commands` | `portfolio`

**Success (200):**
```json
{
  "content": "OSPF (Open Shortest Path First) is...",
  "mode":    "explain"
}
```

**Errors:**
- `400` — Invalid mode, empty message, message > 8000 chars, history > 10 items
- `429` — Rate limit exceeded
- `500` — OpenAI error
- `503` — OPENAI_API_KEY not configured (returns mock-friendly error for client fallback)

---

## User Progress

### `GET /api/user/progress`

Returns current user's full progress data. Requires authentication.

**Headers:** Session cookie (automatic via NextAuth)

**Success (200):**
```json
{
  "user": {
    "id": "...", "name": "...", "xp": 1500, "level": 3,
    "learningStreak": 5, "skillLevel": "Junior Network Engineer"
  },
  "labSubmissions": [...],
  "quizScores":     [...],
  "userBadges":     [...],
  "courseProgress": [...]
}
```

**Errors:**
- `401` — Not authenticated

### `POST /api/user/progress`

Update user progress. Requires authentication.

**Actions:**

```json
{ "action": "add_xp", "amount": 50 }

{ "action": "complete_lab", "labId": "lab-id-here" }

{ "action": "save_quiz_score", "quizId": "quiz-id", "score": 85, "passed": true }

{ "action": "unlock_badge", "badgeId": "badge-id" }
```

**Success (200):**
```json
{ "success": true }
```

---

## Notes

- All routes validate input and return structured errors
- No route exposes `password`, `NEXTAUTH_SECRET`, `DATABASE_URL`, or `OPENAI_API_KEY`
- Admin operations use Server Actions in `lib/adminActions.ts`, not separate API routes
