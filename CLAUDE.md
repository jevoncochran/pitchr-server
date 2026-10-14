# pitchr-server

NestJS + Prisma API for the Pitchr CRM. Sibling repos: `../pitchr-client` (React) and `../pitchr-ai` (FastAPI AI service, called from here with the `X-Internal-Api-Key` header).

## Docs

- **Specs** (`docs/<feature>.md`) describe how a feature works **now** and why. Keep the status line current (Draft → Building → Built). When you change a feature's behavior, update its spec in the same change; once built, remove open questions and rewrite plans as plain descriptions.
- **Build plans** (`docs/<feature>-build-plan.md`) record how a feature was built, step by step. Update them while building; once the feature ships, mark them complete and leave them as history.
- List new docs in the README's **Docs** section.
