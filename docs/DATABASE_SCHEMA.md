# Database Schema — NetPath Academy

ORM: **Prisma**  
Database: **PostgreSQL**  
Schema file: `prisma/schema.prisma`

---

## Enums

```prisma
enum UserRole        { USER  ADMIN }
enum ProgressStatus  { NOT_STARTED  IN_PROGRESS  COMPLETED }
```

---

## Models

### User
Primary user account.

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | PK |
| name | String? | Display name |
| email | String | Unique |
| password | String? | bcrypt hash — never returned to client |
| image | String? | Avatar URL |
| role | UserRole | Default: USER |
| xp | Int | Default: 0 |
| level | Int | Default: 1 |
| skillLevel | String | Default: "Network Beginner" |
| learningStreak | Int | Default: 0 |
| createdAt / updatedAt | DateTime | Auto |

Relations: courses, labs, quizzes, progress, badges, portfolioItems, aiConversations, notes

---

### Course
```
id           String (slug)  PK
title        String
description  String
level        String         e.g. "Beginner"
category     String
duration     String
modules      Module[]
```

### Module
```
id        String (cuid)
courseId  String (FK → Course)
title     String
order     Int
lessons   Lesson[]
```

### Lesson
```
id          String (cuid)
moduleId    String (FK → Module)
title       String
content     String?
videoUrl    String?
duration    String?
order       Int
```

---

### Lab
```
id           String (cuid)
title        String
category     String
level        String
duration     String
description  String
scenario     String?
objective    String?
solution     String?
submissions  LabSubmission[]
```

### LabSubmission
```
id       String (cuid)
userId   String (FK → User)
labId    String (FK → Lab)
score    Float?
status   ProgressStatus   Default: COMPLETED
notes    String?
createdAt DateTime
```

---

### Quiz
```
id            String (cuid)
title         String
description   String
category      String
level         String
duration      String
passingScore  Int           Default: 70
questionsJson String?       JSON array of questions
scores        QuizScore[]
```

### QuizScore
```
id      String (cuid)
userId  String (FK → User)
quizId  String (FK → Quiz)
score   Float
passed  Boolean
createdAt DateTime
```

---

### TroubleshootingGuide
```
id           String (cuid)
title        String
category     String
level        String
description  String
symptoms     String?    JSON array
steps        String?    JSON array of step objects
resolution   String?
prevention   String?
tags         String?
```

---

### Badge
```
id           String (slug)
title        String
description  String
icon         String      emoji or icon identifier
xpReward     Int
userBadges   UserBadge[]
```

### UserBadge @@unique([userId, badgeId])
```
id       String (cuid)
userId   String (FK → User)
badgeId  String (FK → Badge)
earnedAt DateTime   Default: now()
```

---

### UserProgress @@unique([userId, courseId, lessonId])
```
id        String (cuid)
userId    String (FK → User)
courseId  String?
lessonId  String?
status    ProgressStatus
updatedAt DateTime
```

---

### PortfolioItem
```
id          String (cuid)
userId      String (FK → User)
title       String
type        String         project|config|diagram|lab|rca|automation|certification|documentation
description String
tags        String?        JSON array
configData  String?        raw config text
rcaData     String?        JSON object
link        String?
createdAt   DateTime
```

---

### AiConversation
```
id        String (cuid)
userId    String?  (optional — guest allowed)
mode      String
message   String
response  String
createdAt DateTime
```

---

### Note
```
id        String (cuid)
userId    String (FK → User)
title     String?
content   String
createdAt DateTime
```

---

## Indexes & Constraints

- `User.email` — unique
- `UserBadge(userId, badgeId)` — unique (prevent duplicate badges)
- `UserProgress(userId, courseId, lessonId)` — unique
