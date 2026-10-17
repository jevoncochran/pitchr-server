# Business card scan: build plan

How business card scan gets built. The feature is described in [business-card-scan.md](business-card-scan.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Spec and build plan
Every image uploaded to a lead is read once (contact-page uploads aren't). A card creates a contact or fills in an existing one's empty fields; a different existing value becomes a Replace/Keep suggestion. Built before the [visit debrief](visit-debrief.md), which relies on it.

### ✅ Step 2: Schema
**Files:** `prisma/schema.prisma`, migration `20261018000000_add_card_scan`

- `BusinessCardScanStatus` enum (`PENDING`, `BUSINESS_CARD`, `NOT_BUSINESS_CARD`, `NEEDS_MATCH`, `FAILED`); `Attachment.businessCardScan`, `businessCardScannedAt`, `businessCardData` (all optional).
- `ContactChangeSuggestion`: contact (cascade), field, current value, suggested value, attachment (set null); one per contact and field.
- The SQL came from `prisma migrate diff` between the committed schema file and the new one (two files, no database, no shadow database). It only adds things. Applied to dev with `prisma migrate deploy`. (Created with "card" names; renamed in step 7b.)

### ✅ Step 3: Images in pitchr-ai's Claude helper
**Files (pitchr-ai):** `app/core/claude.py`, `app/core/config.py`, `.env.example`, `tests/core/test_claude.py` (new)

- `generate_structured` takes `images` (base64, shown to Claude before the prompt) and a `model` override; the log line now includes the image count.
- `BUSINESS_CARD_SCAN_MODEL` setting (empty means `CLAUDE_MODEL`, Sonnet 5.5) until the eval picks one.
- Haiku has no server-side refusal fallback, so the helper sends the fallback only for other models.
- 4 new tests with a fake Anthropic client.

### ✅ Step 4: `POST /business-cards/scan` in pitchr-ai
**Files (pitchr-ai):** `app/features/business_card_scan/` (router, schemas, prompt, service), `app/main.py`, `tests/business_card_scan/test_business_card_scan.py`, README

- Request: the photo (base64), the business name, the lead's contacts. Response: is it a card, has a person, the fields read (name, title, email, phone, other phones, website, address, social handles), the match (`existing` with an id, `new`, `ambiguous` with candidate ids, or `none`) and the decision-maker call. Effort `low`.
- The service checks Claude's answer before NestJS sees it: not a card clears everything; a business-only card keeps the website but no person; a contact id NestJS didn't send never becomes a match (it becomes a choice instead); ambiguous with nobody on file is new; emails are lowercased.
- 10 new tests with Claude faked (45 total).

### ✅ Step 6: Scan on upload in pitchr-server
**Files:** `src/attachments/business-card-scan-rules.ts` (+ `.spec.ts`), `business-card-scan.service.ts` (+ `.spec.ts`), `attachments.service.ts`, `attachments.controller.ts`, `attachments.module.ts`, `src/common/pitchr-ai.ts` (new), `src/contacts/contacts.service.ts`, `contacts.controller.ts`; `sharp` added

- **Rules** (`planBusinessCardScan`, no database): what a reading changes. Empty fields are filled in, different values become suggestions, the same value written differently (case, accents, spacing, phone punctuation) is left alone, decision-maker is only ever turned on, an empty lead website is filled in.
- **Upload:** images on a lead are saved with `businessCardScan: PENDING` and read in the background (the photo straightened and shrunk to 1568 px with `sharp`, sent to pitchr-ai with the lead's contacts). The plan, the reading (`businessCardData`) and the photo's link to the contact are saved in one transaction; any failure is saved as `FAILED`.
- **Endpoints:** `POST /api/attachments/:id/business-card-scan/retry` (failed scans), `POST /api/attachments/:id/business-card-scan/match` with `{ contactId }` or `"new"` (uses the saved reading, no second Claude call); `POST /api/contacts/suggestions/:id/replace` and `DELETE /api/contacts/suggestions/:id` (Keep). Contacts now come with their `changeSuggestions`.
- Listing a lead's photos first marks scans stuck in `PENDING` for over 5 minutes as `FAILED`.
- `postToPitchrAi()` is the shared way to call pitchr-ai (the snapshot still has its own copy).
- `sharp` must be imported as `import sharp = require('sharp')`: the project has no `esModuleInterop`, and the default import fails at runtime.
- 19 new Jest tests, pitchr-ai mocked (121 total).

### ✅ Step 7: Client
**Files (pitchr-client):** `src/features/businessCards/businessCardScan.ts` (types, `useBusinessCardScanPolling`), `BusinessCardScanLine.tsx` (`BusinessCardScanLine`, `BusinessCardSuggestions`), `__tests__/BusinessCardScan.test.tsx` (all new); `src/features/sessions/StopPhotos.tsx` (new), `RunSessionPage.tsx`; `src/features/leads/LeadAttachments.tsx`, `LeadContacts.tsx`, `useLeadDetail.ts`; `src/features/contacts/ContactDetailPage.tsx`

- **Run screen:** **Add business card** on the current stop of an in-person session (opens the camera), with today's photos of that lead and their scan state. When a scan finishes, the session reloads, so a new contact is in the visit form's list.
- **Lead page:** each photo shows its scan state (Reading business card…, Business card · Maria López, Couldn't read this business card · Try again, Whose business card is this? with the candidates and New contact). The page checks every 2.5 s while a photo is being read, then reloads contacts and the lead.
- **Contacts** (lead page and contact page): **Business card says email … · Replace · Keep**. A card photo linked to a contact shows on the contact page's attachments.
- 6 new tests (64 total); `tsc -b`, `vite build` and lint unchanged.

### ✅ Step 7b: Renamed to "business card scan"
**Files:** everything above; migration `20261018010000_rename_card_scan_to_business_card_scan`

"Card" was vague on screen and, in the client, easy to confuse with UI cards (`SectionCard`). The feature, files, routes and screen text now say business card: `/business-cards/scan`, `/api/attachments/:id/business-card-scan/…`, `business_card_scan` in pitchr-ai, `src/features/businessCards/` in the client, **Add business card** on the run screen, **Business card says …** on contacts. Where "photo" means the image itself, it stays photo. The prompt and field descriptions Claude reads are unchanged: they open with "business card", and rewording them would change behavior before the eval.

The migration renames, in place, the enum (`BusinessCardScanStatus`), its values (`BUSINESS_CARD`, `NOT_BUSINESS_CARD`) and the three columns. It was written by hand, because Prisma would drop and re-add them. Applied to dev; afterwards dev's tables matched the schema for everything in this feature (`prisma migrate diff` from dev, which only reads it). Prod gets both migrations in one deploy.

### ✅ Step 7c: Fill in from business card (Add Lead)
Business card scan beyond sessions: a business card from a chance meeting starts a new lead. **Add Lead** keeps its form, with **Fill in from business card** at the top; it also gained Address and Contact sections.

- **pitchr-ai:** a new-lead mode (no business or contacts sent; the industry and business type lists instead). The reading adds the business name, a general business email, the Instagram handle (cleaned of @ and URLs), the address in parts and suggested industry and business type ids, dropped if not in the lists. 3 new tests (48 total).
- **pitchr-server:**
  - `BusinessCardsService` / `BusinessCardsController` (new): `POST /api/business-cards/read` stores the photo on no lead, reads it while the owner waits, and answers with the reading and likely duplicates; if it can't be read, the photo is deleted again. `POST /api/business-cards/:id/add-to-lead` puts an unused business card on a lead and reads it again in the background against that lead's contacts.
  - `likelyDuplicates()` (rules): same website, same email or an email at the same business domain (not gmail and the like), same phone, same name ignoring "The" and "LLC"; best first, at most three.
  - `POST /api/leads` also takes `location`, `contact`, `howWeMet` and `businessCardAttachmentId`, saved in the lead's transaction: the address becomes the primary location (coordinates from the address search, or looked up before the transaction); the contact is `IN_PERSON` when it came from a business card; how we met goes on the contact and in a note; the photo is linked to the lead and contact and marked `BUSINESS_CARD`, only if it isn't on a lead already.
  - `lookUpCoordinates()` moved out of `LocationsService` so lead creation can use it.
  - 16 new tests (137 total).
- **pitchr-client:** `FillFromBusinessCard` (new): the button (photo choices on a phone, file picker on a computer), Reading business card…, a thumbnail, the "already a lead" prompt and errors. Add Lead fills only empty fields, tags them **From business card** until edited, and has Address (Google address search plus city, state, zip) and Contact (with Decision-maker and How we met) sections; it won't save half an address or a contact without a first name. 4 new tests (68 total).

### ✅ Step 7d: iPhone photos (HEIC)
**Files:** `src/common/images.ts` (+ `.spec.ts`, fixture `__fixtures__/tiny.heic` made with macOS `sips`), `attachments.service.ts`, `business-cards.service.ts`; `heic-decode` added (pitchr-server); `FillFromBusinessCard.tsx` (pitchr-client)

The owner's first real try failed: the iPhone photo was HEIC, and `sharp`'s prebuilt binaries can't decode HEIC ("Support for this compression format has not been built in"). HEIC uploads are now converted to JPEG before they're stored. `heic-convert` worked but peaked at about 640 MB for a 12-megapixel photo (its JPEG encoder is JavaScript); `heic-decode` for decoding and `sharp` for encoding takes about 1.5 s and 270 MB, so that's what's used. The Add Lead thumbnail shows the stored JPEG once read, since Chrome can't show a local HEIC. 3 new tests (140 total).

### ✅ Step 7e: Schema within the structured output limits
**Files (pitchr-ai):** `app/features/business_card_scan/schemas.py`, `service.py`, `prompt.py`, `app/core/claude.py`, tests

The owner's second try got a 400 from the Claude API. Structured outputs allow at most 16 union-typed parameters (like "text or null") and 24 optional ones per request; the new-lead fields had taken the reading to 17 and 21. Now `BusinessCardReading` (what Claude fills in) has every field required, with an empty string for anything missing (0 and 0); `check_reading()` turns empty strings into null, and `BusinessCardScanResponse` (what NestJS gets) is unchanged. A test fails if the schema goes over the limits again, using the SDK's own `transform_schema`. Failed Claude calls now log Anthropic's error message, not just its type. 2 new tests (50 total).

### ✅ Step 7f: Several business cards at once
After the owner's first real try: two-sided business cards (the business name was only on the back) and several business cards per visit (owner, marketing coordinator, aesthetician), whose backs are usually the same and photographed once.

- **One upload is up to 6 photos, read in one Claude call** (pitchr-ai): photos are labeled Photo 1, Photo 2… (the Claude helper's images can carry a label). The reading is the business, a list of people (each with their photos, card details, `sameBusiness` and match) and the business-only and not-a-business-card photos. `check_reading()` turns photo numbers into positions, uses each photo once (left-over photos count as business-only), drops people without a readable name and never lets two people be one contact. The format still has 0 union-typed and 0 optional fields; the limit test now looks inside nested objects. 49 tests.
- **pitchr-server:** migration `20261018020000_business_card_batches` (adds `OTHER_BUSINESS` and `Attachment.businessCardBatchId`; applied to dev). `planBusinessCardScan` plans one upload, `planPerson` one person (held as `OTHER_BUSINESS` for a card that names another business). Each photo's `businessCardData` is its role, person and business. New: `POST /api/attachments/business-cards` (up to 6), `…/business-card-scan/add-anyway`, `DELETE /api/attachments/:id/business-card`; retry reads the failed photos of an upload again together. Add Lead: `POST /api/business-cards/read` takes several photos plus earlier ones, `add-to-lead` takes photo ids, `POST /api/leads` takes `contacts` (each with its photos) and `businessCardAttachmentIds`. 149 tests.
- **pitchr-client:** the run screen's **Add business cards** takes up to 6 photos (camera or library). Add Lead: several photos, **Add the back or another card** (highlighted when no business name was found), thumbnails, and a **Contacts** list (one per person, removable, **+ Add contact**, held business cards with **Add anyway**). Re-reading refreshes untouched fields filled from business cards and keeps anything typed or edited. Status lines for the shared back and for another business. 75 tests.

### ✅ Step 7g: Industry and business type optional
The owner's next real try failed with a server error: "La Unión Residence & Social Hall" fit none of the industries, so none was suggested, and a lead required both an industry and a business type. A lead saved from a chance meeting shouldn't be blocked by a dropdown the business card can't answer, so both are optional now, with a nudge.

- **pitchr-server:** migration `20261018030000_optional_industry_and_business_type` drops the two NOT NULL rules only (no data changes; an industry or business type that leads use still can't be deleted: `onDelete: Restrict`, as before). Applied to dev. The session quick-add no longer requires them. 1 new test (150 total).
- **pitchr-client:** the lead page shows **No industry yet · Add** (or business type, or both) and "Not set" until they're set; the leads list has a **Needs industry/type** quick filter; the Pipeline and Sequence cards show "No industry yet" instead of crashing; the session quick-add marks both "(optional)". 4 new tests (79 total).
- pitchr-ai and the snapshot already treated industry as optional.

### ⏭️ Step 5: Eval and model choice
**Files (pitchr-ai):** `evals/business_card_scan/`, `evals/run_business_card_scan.py`

Run after step 7f, so it covers both modes and several business cards per upload: one card, a two-sided card, three people with a shared back, and a batch with a card from another business. Cases from real cards (the 16 dev photos, with the owner's OK) plus made-up contact lists, and the same cards in new-lead mode (business name, address parts, industry and business type suggestions): a new person, a match with a different email, a name with an accent, two possible matches, a storefront photo, a business-only card. Compare the models on accuracy and cost. **Costs money: ask first** with an estimate.

### ⬜ Step 8: Backfill existing photos
**Files:** `scripts/business-card-scan/backfill.ts`; `BusinessCardScanService.planReading` / `applyReading` and `readBusinessCard` (shared with uploads)

Three runs, each one asked for: no flag lists the photos (dev: 16, no Claude calls); `--read` reads each (16 paid Claude calls), prints what each would change and saves the readings to `scripts/business-card-scan/output/` without touching the database; `--apply` applies the saved readings, re-checked against the lead as it is then (no Claude calls). Run with `-r tsconfig-paths/register`. Not run yet: `--read` needs the owner's OK. Prod: list and `--read` against prod, then `--apply` only with the owner's sign-off.

### ⬜ Step 9: Try it in the field
Photograph real cards during a session on the iPhone; check the contacts made and the time a scan takes.
