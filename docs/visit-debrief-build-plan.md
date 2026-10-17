# Visit debrief: build plan

How the visit debrief gets built. The feature is described in [visit-debrief.md](visit-debrief.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Spec and build plan
A **What happened?** box on the in-person visit form, filled with the iPhone keyboard mic; **Fill in** proposes the whole form for review, nothing on the lead changes until **Log**. Each note and proposal is saved, to measure quality against what was logged. Starts after [business card scan](business-card-scan.md) is built, so cards are already contacts.

### ⬜ Step 2: Schema
**Files:** `prisma/schema.prisma`, a new migration

`VisitDebrief` (note, proposal, model, session, lead, user, optional touchpoint). Migration written without a shadow database, applied to dev with `prisma migrate deploy`.

### ⬜ Step 3: `POST /visits/debrief` in pitchr-ai
**Files (pitchr-ai):** `app/features/visit_debrief/` (router, schemas, prompt, service), `tests/features/visit_debrief/`

- Request: today's date, the note, the lead, its contacts, its three latest touchpoint summaries, allowed outcomes and provider types. Response: outcome, provider type, come-back date, left materials, summary, contacts spoken to (ids or new people), contact updates, uncertain notes.
- Prompt rules from the spec: contacts on file first, never take emails or phones from the note, dates from today in the team's time zone, a summary that keeps every fact and adds none.
- Tests with Claude mocked.

### ⬜ Step 4: Eval and model choice
**Files (pitchr-ai):** `evals/visit_debrief/`, `evals/run_visit_debrief.py`

Realistic dictated notes, dictation mistakes included: gatekeeper and owner, a name match with an accent, two Marias, "talked to the manager" with none on file, relative dates ("next Thursday", "after the 15th", "in January"), an agency provider, a note with no people in it, "come back later today". Compare the models. **Costs money: ask first** with an estimate.

### ⬜ Step 5: pitchr-server
**Files:** `src/sessions/` (new `visit-debrief.service.ts` + `.spec.ts`, `sessions.controller.ts`, `session-logging.service.ts`), tests

- `POST /api/sessions/:id/debrief`: waits up to 20 s for the lead's `PENDING` card scans, sends the data, saves the note and proposal as a `VisitDebrief`, returns the proposal. Nothing on the lead changes.
- `POST /api/sessions/:id/log` accepts a `debriefId` (linked to the new touchpoint), `newContacts` (several, replacing `newContact`) and contact updates (fill in empty fields, suggestions for different values, decision-maker on only), and links the lead's unlinked photos from this session to the touchpoint, all in the existing transaction.

### ⬜ Step 6: Client
**Files (pitchr-client):** `src/features/sessions/LogVisitForm.tsx`, `RunSessionPage.tsx`, tests

The box and **Fill in**, highlighted filled fields, uncertain notes above the form, several new contacts, contact updates shown before **Log**; refilling replaces only what it filled, not what was changed by hand; a clear message when it fails.

### ⬜ Step 7: Quality report
**Files:** `scripts/visit-debrief/report.ts`

Compares each debrief's proposal with its logged touchpoint: fields fixed per debrief, the most-fixed fields, the worst debriefs. Reads only.

### ⬜ Step 8: Try it in the field
A real session on the iPhone: time from the end of a visit to logged, the quality report afterwards, and what the summaries look like in the lead snapshot. With the owner's OK, the debriefs that went wrong become eval cases.
