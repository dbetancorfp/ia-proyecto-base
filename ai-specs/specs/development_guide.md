# Development Guide

Setup instructions and workflow reference for the Nuxt 4 application.

## Prerequisites

- **Node.js** v20 or higher (LTS recommended)
- **npm** v10 or higher
- **PostgreSQL 16** installed locally
- **Git**

---

## 1. Clone the Repository

```bash
# TODO: replace your-org/your-repo with your actual repository
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

---

## 2. Environment Configuration

Create a `.env` file in the project root (single file — no separate backend/frontend envs):

```env
# Database
DATABASE_URL="postgresql://appuser:apppassword@localhost:5432/appdb"

# App
NUXT_PUBLIC_APP_NAME="Your App Name"
NODE_ENV=development
```

> Never commit `.env` — it is gitignored. Share a `.env.example` with placeholder values.

---

## 3. Database Setup (Local PostgreSQL)

Create the database user and database using `psql`:

```bash
psql -U postgres
```

```sql
CREATE USER appuser WITH PASSWORD 'apppassword';
CREATE DATABASE appdb OWNER appuser;
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
\q
```

Verify the connection:

```bash
psql -U appuser -d appdb -h localhost
```

---

## 4. Install Dependencies

```bash
npm install
```

The `postinstall` script automatically runs:
1. `prisma generate` — generates the Prisma client from `server/db/prisma/schema.prisma`
2. `nuxt prepare` — generates Nuxt type declarations

---

## 5. Database Migrations

```bash
# Create and apply a new migration (development)
npm run prisma:migrate:dev -- --name initial_schema

# Apply existing migrations (CI / production)
npm run prisma:migrate:deploy

# (Optional) Seed the database with sample data
npm run prisma:seed
```

---

## 6. Start the Development Server

```bash
npm run dev
```

Nuxt starts a single dev server that serves both the frontend and the API routes:

- **App**: `http://localhost:3000`
- **API**: `http://localhost:3000/api/*`

There is no separate backend server — everything runs under Nitro.

---

## 7. Available Scripts

```bash
npm run dev               # Start development server
npm run build             # Production build
npm run preview           # Preview production build locally
npm run generate          # Generate static site

npm test                  # Run Vitest unit tests
npm run test:watch        # Vitest in watch mode
npm run test:e2e          # Run Playwright E2E tests

npm run typecheck         # vue-tsc type check (no emit)
npm run lint              # ESLint
npm run lint:fix          # ESLint with auto-fix

npm run prisma:generate   # Regenerate Prisma client
npm run prisma:migrate:dev        # Create + apply migration (dev)
npm run prisma:migrate:deploy     # Apply migrations (prod/CI)
npm run prisma:push       # Push schema without migration (prototyping only)
npm run prisma:studio     # Open Prisma Studio GUI at localhost:5555
npm run prisma:seed       # Run seed script
```

---

## 8. Testing

### Unit Tests (Vitest)

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file change)
npm run test:watch

# With coverage report
npx vitest run --coverage
```

Tests live in `tests/` and as `*.test.ts` files co-located with source.

### E2E Tests (Playwright)

```bash
# Install browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npx playwright test --ui

# Run a specific test file
npx playwright test e2e/users.spec.ts
```

E2E tests require the dev server to be running (`npm run dev` in another terminal) or use Playwright's `webServer` config to start it automatically.

---

## 9. Prisma Studio

Visual GUI for browsing and editing the database:

```bash
npm run prisma:studio
# Opens at http://localhost:5555
```

---

## 10. Project Structure Reference

```
.
├── app/                          # Frontend (Vue 3 pages, components, stores)
│   ├── pages/                    # File-based routing
│   ├── components/               # Reusable Vue components
│   ├── composables/              # Auto-imported composables
│   ├── stores/                   # Pinia stores
│   ├── layouts/                  # Page layouts
│   └── middleware/               # Client-side route guards
│
├── server/                       # Backend (Nitro server)
│   ├── api/                      # HTTP API routes (H3 handlers)
│   ├── services/                 # Business logic (Application layer)
│   ├── domain/                   # Entities + repository interfaces
│   ├── infrastructure/           # Prisma repository implementations
│   ├── middleware/               # Server middleware (auth, logging)
│   ├── utils/                    # Server utilities (prisma.ts, etc.)
│   └── db/
│       └── prisma/
│           ├── schema.prisma     # Database schema
│           ├── migrations/       # Migration history
│           └── seed.ts           # Seed data
│
├── tests/                        # Vitest unit tests
├── e2e/                          # Playwright E2E tests
├── public/                       # Static assets (not processed)
├── nuxt.config.ts                # Nuxt configuration
├── playwright.config.ts          # Playwright configuration
├── vitest.config.ts              # Vitest configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```
