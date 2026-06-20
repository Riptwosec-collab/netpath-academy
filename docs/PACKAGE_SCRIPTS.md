# Package Scripts to Add

Add these scripts to your `package.json` in the project root:

```json
{
  "scripts": {
    "dev":           "next dev",
    "build":         "next build",
    "start":         "next start",
    "lint":          "next lint",
    "test":          "vitest",
    "test:watch":    "vitest --watch",
    "test:ui":       "vitest --ui",
    "test:coverage": "vitest --coverage",
    "typecheck":     "tsc --noEmit",
    "qa":            "npm run typecheck && npm run test && npm run build"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

## Install Test Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
npm install -D @vitest/coverage-v8
```

## Run Tests

```bash
# Run all tests once
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Full QA (typecheck + test + build)
npm run qa
```
