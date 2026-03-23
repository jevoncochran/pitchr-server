# Pitchr — Server

Backend API for **Pitchr**, a CRM built for Intercon Visuals to manage outbound B2B sales for a video production agency in Tampa, FL.

Built with NestJS + Prisma ORM, PostgreSQL hosted on Neon.

---

## What it does

REST API serving the Pitchr frontend. Handles authentication, lead management, touchpoint logging, reminder scheduling, contacts, notes, pipeline stages, and the follow-up sequence engine.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | NestJS (Node.js) |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Auth | JWT + bcrypt |
| Language | TypeScript |

---

## Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon recommended — free tier works for development, upgrade to Launch tier for production)

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy the environment file and fill in your values
cp .env.example .env

# Generate the Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start the dev server
npm run start:dev
```

The API runs at `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-secret-key"
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Full Neon (or other PostgreSQL) connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens — keep this private |

---

## Database

This project uses **Prisma** with **Neon** (serverless PostgreSQL).

```bash
# Create and apply a new migration during development
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Regenerate the Prisma client after schema changes
npx prisma generate

# Open Prisma Studio (visual DB browser)
npx prisma studio
```

> **Important:** After every schema change, always run `npx prisma generate` to keep TypeScript types in sync.

---

## Project Structure

```
src/
├── auth/             # JWT auth, login, guards
├── leads/            # Lead CRUD and pipeline management
├── touchpoints/      # Touchpoint logging with sequence positions
├── reminders/        # Follow-up reminder engine
├── contacts/         # Lead contacts (decision makers, staff)
├── notes/            # Lead notes
├── locations/        # Lead locations/addresses
├── users/            # User management
├── database/         # PrismaClient service
└── generated/
    └── prisma/       # Auto-generated Prisma client (do not edit)
```

---

## Known Gotchas

**Prisma client location**
The Prisma client is generated to `src/generated/prisma/` (not the default location). This is intentional — it ensures NestJS can copy it into `dist/` via `nest-cli.json` assets.

**deleteOutDir**
`nest-cli.json` has `"deleteOutDir": false`. This prevents NestJS from wiping `dist/` on each hot-reload restart, which would delete the copied Prisma client.

**DATABASE_URL resolution**
`database.service.ts` explicitly calls `dotenv.config()` with an absolute path to `.env`. This is required because the compiled Prisma client in `dist/` resolves `.env` relative to its own location (wrong), not the project root.

**After any schema change, run both:**
```bash
npx prisma migrate dev --name <name>
npx prisma generate
```

---

## Deployment

Recommended: **Railway**

1. Push the repo to GitHub
2. Create a new Railway project and connect the repo
3. Set `DATABASE_URL` and `JWT_SECRET` as environment variables in Railway
4. Railway will auto-build and deploy on every push to `main`

> Use `npm run start:prod` as the start command in Railway.
