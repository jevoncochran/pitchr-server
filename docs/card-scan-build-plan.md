# Card scan: build plan

How card scan gets built. The feature is described in [card-scan.md](card-scan.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Spec and build plan

Every image uploaded to a lead is read once (contact-page uploads aren't). A card creates a contact or fills in an existing one's empty fields; a different existing value becomes a Replace/Keep suggestion. Built before the [visit debrief](visit-debrief.md), which relies on it.

### ✅ Step 2: Schema

**Files:** `prisma/schema.prisma`, migration `20261018000000_add_card_scan`

- `CardScanStatus` enum (`PENDING`, `CARD`, `NOT_CARD`, `NEEDS_MATCH`, `FAILED`); `Attachment.cardScan`, `cardScannedAt`, `cardData` (all optional).
- `ContactChangeSuggestion`: contact (cascade), field, current value, suggested value, attachment (set null); one per contact and field.
- The SQL came from `prisma migrate diff` between the committed schema file and the new one (two files, no database, no shadow database). It only adds things. Applied to dev with `prisma migrate deploy`.

### ✅ Step 3: Images in pitchr-ai's Claude helper

**Files (pitchr-ai):** `app/core/claude.py`, `app/core/config.py`, `.env.example`, `tests/core/test_claude.py` (new)

- `generate_structured` takes `images` (base64, shown to Claude before the prompt) and a `model` override; the log line now includes the image count.
- `CARD_SCAN_MODEL` setting (empty means `CLAUDE_MODEL`, Sonnet 5.5) until the eval picks one.
- Haiku has no server-side refusal fallback, so the helper sends the fallback only for other models.
- 4 new tests with a fake Anthropic client.

### ✅ Step 4: `POST /cards/scan` in pitchr-ai

**Files (pitchr-ai):** `app/features/card_scan/` (router, schemas, prompt, service), `app/main.py`, `tests/card_scan/test_card_scan.py`, README

- Request: the photo (base64), the business name, the lead's contacts. Response: is it a card, has a person, the fields read (name, title, email, phone, other phones, website, address, social handles), the match (`existing` with an id, `new`, `ambiguous` with candidate ids, or `none`) and the decision-maker call. Effort `low`.
- The service checks Claude's answer before NestJS sees it: not a card clears everything; a business-only card keeps the website but no person; a contact id NestJS didn't send never becomes a match (it becomes a choice instead); ambiguous with nobody on file is new; emails are lowercased.
- 10 new tests with Claude faked (45 total).

### ⏭️ Step 5: Eval and model choice

**Files (pitchr-ai):** `evals/card_scan/`, `evals/run_card_scan.py`

Cases from real cards (the 16 dev photos, with the owner's OK) plus made-up contact lists: a new person, a match with a different email, a name with an accent, two possible matches, a storefront photo, a business-only card. Compare the models on accuracy and cost. **Costs money: ask first** with an estimate.

### ✅ Step 6: Scan on upload in pitchr-server

**Files:** `src/attachments/card-scan-rules.ts` (+ `.spec.ts`), `card-scan.service.ts` (+ `.spec.ts`), `attachments.service.ts`, `attachments.controller.ts`, `attachments.module.ts`, `src/common/pitchr-ai.ts` (new), `src/contacts/contacts.service.ts`, `contacts.controller.ts`; `sharp` added

- **Rules** (`planCardScan`, no database): what a reading changes. Empty fields are filled in, different values become suggestions, the same value written differently (case, accents, spacing, phone punctuation) is left alone, decision-maker is only ever turned on, an empty lead website is filled in.
- **Upload:** images on a lead are saved with `cardScan: PENDING` and read in the background (the photo straightened and shrunk to 1568 px with `sharp`, sent to pitchr-ai with the lead's contacts). The plan, the reading (`cardData`) and the photo's link to the contact are saved in one transaction; any failure is saved as `FAILED`.
- **Endpoints:** `POST /api/attachments/:id/card-scan/retry` (failed scans), `POST /api/attachments/:id/card-scan/match` with `{ contactId }` or `"new"` (uses the saved reading, no second Claude call); `POST /api/contacts/suggestions/:id/replace` and `DELETE /api/contacts/suggestions/:id` (Keep). Contacts now come with their `changeSuggestions`.
- Listing a lead's photos first marks scans stuck in `PENDING` for over 5 minutes as `FAILED`.
- `postToPitchrAi()` is the shared way to call pitchr-ai (the snapshot still has its own copy).
- `sharp` must be imported as `import sharp = require('sharp')`: the project has no `esModuleInterop`, and the default import fails at runtime.
- 19 new Jest tests, pitchr-ai mocked (121 total).

### ✅ Step 7: Client

**Files (pitchr-client):** `src/features/cards/cardScan.ts` (types, `useCardScanPolling`), `CardScanLine.tsx` (`CardScanLine`, `CardSuggestions`), `__tests__/CardScan.test.tsx` (all new); `src/features/sessions/StopPhotos.tsx` (new), `RunSessionPage.tsx`; `src/features/leads/LeadAttachments.tsx`, `LeadContacts.tsx`, `useLeadDetail.ts`; `src/features/contacts/ContactDetailPage.tsx`

- **Run screen:** **Add photo** on the current stop of an in-person session (opens the camera), with today's photos of that lead and their scan state. When a scan finishes, the session reloads, so a new contact is in the visit form's list.
- **Lead page:** each photo shows its scan state (Reading card…, Card · Maria López, Couldn't read this card · Try again, Which contact is …? with the candidates and New contact). The page checks every 2.5 s while a photo is being read, then reloads contacts and the lead.
- **Contacts** (lead page and contact page): **Card says email … · Replace · Keep**. A card photo linked to a contact shows on the contact page's attachments.
- 6 new tests (64 total); `tsc -b`, `vite build` and lint unchanged.

### ⏭️ Step 8: Backfill existing photos

**Files:** `scripts/card-scan/backfill.ts`; `CardScanService.planReading` / `applyReading` and `readCard` (shared with uploads)

Three runs, each one asked for: no flag lists the photos (dev: 16, no Claude calls); `--read` reads each (16 paid Claude calls), prints what each would change and saves the readings to `scripts/card-scan/output/` without touching the database; `--apply` applies the saved readings, re-checked against the lead as it is then (no Claude calls). Run with `-r tsconfig-paths/register`. Not run yet: `--read` needs the owner's OK. Prod: list and `--read` against prod, then `--apply` only with the owner's sign-off.

### ⬜ Step 9: Try it in the field

Photograph real cards during a session on the iPhone; check the contacts made and the time a scan takes.
