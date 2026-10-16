# pitchr-server

NestJS + Prisma API for the Pitchr CRM. Sibling repos: `../pitchr-client` (React) and `../pitchr-ai` (FastAPI AI service, called from here with the `X-Internal-Api-Key` header).

## Databases

- `.env` `DATABASE_URL` / `DIRECT_URL` point at **dev** (a Neon branch of prod). `PROD_DATABASE_URL` is **production**.
- **Never make any change to the production database without the user's explicit sign-off.** That includes scripts with `--apply`, hand-run migrations, SQL writes, and Prisma commands that can write or reset. Show a dry run of exactly what would change first, and get a fresh yes every time. Schema changes reach prod only through deploys (Railway runs `prisma migrate deploy`), which the user controls.
- Never pass a real database (dev or prod) as `--shadow-database-url` or to anything that resets a database: Prisma wipes the shadow database. This erased dev once (10/16/26).

## Lead origin

`origin` (`LeadOrigin`) is how a lead started, set only by hand; it replaced `source` and `discoveredVia`. See `docs/lead-origin.md`.

## Docs

- **Specs** (`docs/<feature>.md`) describe how a feature works **now** and why. Keep the status line current (Draft → Building → Built). When you change a feature's behavior, update its spec in the same change; once built, remove open questions and rewrite plans as plain descriptions.
- **Build plans** (`docs/<feature>-build-plan.md`) record how a feature was built, step by step. Update them while building; once the feature ships, mark them complete and leave them as history.
- List new docs in the README's **Docs** section.
