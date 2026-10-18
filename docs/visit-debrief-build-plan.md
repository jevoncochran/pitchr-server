# Visit debrief: build plan

How the visit debrief gets built. The feature is described in [visit-debrief.md](visit-debrief.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Spec and build plan
A **What happened?** box on the in-person visit form, filled with the iPhone keyboard mic; **Fill in** proposes the whole form for review, nothing on the lead changes until **Log**. Each note and proposal is saved, to measure quality against what was logged. Starts after [business card scan](business-card-scan.md) is built, so cards are already contacts.

### ✅ Step 2: Schema
**Files:** `prisma/schema.prisma`, migration `20261018040000_add_visit_debriefs`

`VisitDebrief`: the note as dictated, the proposal (pitchr-ai's whole answer, JSON), the model, the session, lead and user, and the touchpoint it was logged as (unique; set on Log, cleared if the touchpoint is deleted). Each **Fill in** is one row. Deleting the session or the lead deletes its debriefs. Built after the prompt and eval (steps 3–4). The SQL came from `prisma migrate diff` between two schema files (no database, no shadow database); it only adds the table. Applied to dev with `prisma migrate deploy`.

### ✅ Step 3: `POST /visits/debrief` in pitchr-ai
**Files (pitchr-ai):** `app/features/visit_debrief/` (schemas, prompt, service, router), `app/main.py`, `app/core/config.py` (`VISIT_DEBRIEF_MODEL`), `.env.example`, `tests/visit_debrief/test_visit_debrief.py`

Built before the schema step: the prompt is the part that decides whether this works, so it went first.

- **Request:** today, the note, the lead (business, industry, business type, stage), its contacts, its three latest touchpoints. The in-person outcomes and provider types are fixed in pitchr-ai (pitchr-server's enums), not sent each time.
- **Prompt:** outcomes in an order of priority, with a day to come back always meaning "Come back later" (the form only saves a date with that outcome) and a gatekeeper's interest not counting as "Interested"; a calendar of the next 45 days to read dates off instead of working them out; contacts on file first, choices when unsure, never emails or phones from the note; a summary that keeps every fact, adds none and leaves out personal traits; questions for what the owner should decide. The note is wrapped in `<note>` tags.
- **Format:** every field required, "" or "none" for nothing (0 union-typed, 0 optional fields; a test checks).
- **Checks in code:** a come-back date must be real and not in the past, a time must be HH:MM, contact ids must be ones sent, two people can't be one contact, people with nothing to go on are dropped, at most 5 questions.
- 13 tests with Claude faked (62 total).

### ✅ Step 4: Eval and model choice
**Files (pitchr-ai):** `evals/visit_debrief/cases/` (17 cases: 12 written for the spec, 5 from the owner's real visits), `evals/run_visit_debrief.py`

Realistic dictated notes (lowercase, run-ons, a dictation mistake) with expected answers: a gatekeeper with the owner on file only in on Thursdays; an owner on file with an accent in her name and a meeting booked; two Marias; a nameless manager with an in-house videographer; "after the 15th" on the 16th; a closed business; "back around 3"; vague timing ("after the holidays"); a note describing the owner's age and accent; a spoken email; "come back another day"; interest despite an agency. The runner scores each case field by field (121 checks; a perfect answer scores 121/121) and writes a report with the summaries to read (`evals/visit_debrief/results/`, not committed); `--model`, `--effort` and `--cases` for comparisons. Estimated cost for all 17: about 25¢ on Sonnet 5.5, 2¢ on Haiku 5.5, 50¢ on Opus 5.5. **Costs money: ask first.**

**Runs so far (Haiku 5.5 only, with the owner's OK; about 1¢ each):**

| Run | Checks | What changed before it |
| --- | --- | --- |
| haiku-1 | 172/176 | First run, 17 cases (12 written for the spec, 5 from the owner's visits) |
| haiku-2 | 181/184 | Questions only for which contact or a spoken email/phone (haiku-1 asked about last names, times, roles in most cases); someone running marketing asking for a proposal counts as Interested; the scorer matches a name in either name field; every case now scores whether it asks |
| haiku-3 | 182/184 | Nothing (an edit script failed silently; same prompt as haiku-2): showed the slips vary from run to run |
| haiku-4 | 182/184 | Our own promise to email isn't a come-back date; a nameless person is never given someone else's name; "does all the marketing herself" is the decision-maker |
| haiku-5 | 172/173 | People by name or role, never "the girl at the register"; the runner keeps going when a call fails (one case timed out on the API) |
| haiku-6 | 183/183 | The owner wants gender kept (it helps find the same person on the next visit): "the girl at the register" becomes "the woman at the register", pronouns stay; age, appearance, accent and ethnicity are still left out. Afterwards the example for leaving traits out was reworded, since one summary copied it ("the owner, a woman") |

Before haiku-1, the decision from the owner's case "very interested, come back tomorrow": a come-back time now goes with Interested and Decision-maker not available too, not only Come back later (pitchr-server `COME_BACK_OUTCOMES` in touchpoint logging, 6 new tests; the visit form shows the come-back choices for those outcomes, 5 new tests).

**Model: Haiku 5.5** (the owner's call after haiku-6): good enough, so Sonnet wasn't run. It's the default for `VISIT_DEBRIEF_MODEL`, and pitchr-ai now returns the model with each proposal so it can be saved. Known slip: "out until after the 15th" (today the 16th) gives 11/15 in some runs, 11/16 in others; the date is reviewed before saving.

### ✅ Step 5: pitchr-server
**Files:** `src/sessions/visit-debrief.service.ts` (+ `.spec.ts`), `sessions.controller.ts`, `sessions.module.ts`, `session-logging.service.ts` (+ tests)

- **`POST /api/sessions/:id/debrief`** with `{ itemId | leadId, note }`: checks the session is the user's to edit; waits (checking every second, up to 20 s) for the lead's business cards still being read; sends pitchr-ai the note, the lead (business, industry, business type, stage), its contacts and its three latest touchpoints, with a **30-second** limit (the owner's last eval run saw API calls of up to a minute; on a sidewalk that's too long); saves the note, proposal and model as a `VisitDebrief`; returns `{ debriefId, proposal }`. On failure: 502 "Couldn't fill in the form. Try again or fill it in yourself." and nothing saved.
- **`POST /api/sessions/:id/log`** now also takes `newContacts` (each with `spokeWith`), `contactUpdates` (title and decision-maker, with business card scan's fill-in / suggest / only-on rule, via the shared `sameValue`) and `debriefId` (must be this session's and lead's, unused). Every in-person log links the lead's photos from the session (or the last 12 hours) to the touchpoint.
- 14 new tests (170 total). Checked on the running server that the route exists.

### ✅ Step 6: Client
**Files (pitchr-client):** `src/features/sessions/debrief.ts` (new: types, `formFromProposal`), `LogVisitForm.tsx`, `RunSessionPage.tsx`, `__tests__/VisitDebrief.test.tsx` (new), `__tests__/RunSessionPage.test.tsx`

- **`formFromProposal`** (no React, tested on its own): the proposal as form values. Contacts on file spoken with are ticked; what the note says about them (title, decision-maker) becomes a contact update; a person who could be two contacts becomes a choice; new people become contact rows (someone known only as "Dr. Kim" goes in as Kim, since a contact needs a first name); people with no name are listed, not saved; an outcome the form doesn't offer is dropped; a come-back date of today is **Later today**.
- **Visit form:** the **What happened?** box and **Fill in** / **Fill in again** (in-person visits to leads in Pitchr only), questions and **Which contact is …?** above the form, **From your note** tags until a section is changed by hand, several new contact rows (with **Spoke with**, **Remove**) instead of one, "Update …" lines with **Don't**. The outcome buttons are headed **Outcome**. Fill in again leaves anything changed by hand alone. Saves `newContacts`, `contactUpdates` and `debriefId` with the visit.
- **Run screen:** Fill in calls `POST /api/sessions/:id/debrief` for the current stop (`itemId`, or `leadId` for an unplanned lead).
- 10 new tests (94 total); `tsc -b`, `vite build` and lint unchanged. Not checked in the browser yet (its sign-in had expired).

### ✅ Step 7: Quality report
**Files:** `src/sessions/visit-debrief-report.ts` (+ `.spec.ts`), `scripts/visit-debrief/report.ts`

- **`compareDebrief()`** (no database, tested): each field of a proposal against the touchpoint it was logged as, fixed or kept, with what it was and what it became. Provider only for "has a provider"; come-back time only when one was proposed (team time zone); people by first name, ignoring accents; summary kept when at least 90% of the words are (`similarity()`, words added count against it).
- **The script** (reads only; `--db dev|prod`, `--since`, `--worst`): notes filled in and logged, by model; fix rate per field; fields fixed per note and how many were logged as proposed; the notes with the most fixes, with the note and each change.
- 7 new tests (177 total). Run on dev: no notes yet, so nothing to compare.

### ⏭️ Step 8: Try it in the field
A real session on the iPhone: time from the end of a visit to logged, the quality report afterwards, and what the summaries look like in the lead snapshot. With the owner's OK, the debriefs that went wrong become eval cases.

**First test (10/17, a practice session of 3 leads on the owner's phone, dev opened over Wi-Fi):** worked as expected, with one gap: "the owner will be back in the office next week" gave no come-back date. Changed after it:

- **Estimated dates and times.** A period instead of a day ("next week", "in a couple of weeks", "later this week", a month, "after the holidays") is proposed as its first weekday; a part of the day as a time (morning 9:00, afternoon 13:00, end of the day 16:00; the owner's times). The answer has `come_back_day_estimated` and `come_back_estimated_from`; pitchr-ai's code moves an estimated day to the first Monday–Friday that isn't a holiday (`first_workday`, `is_holiday`), and leaves a day that was said exactly alone (a test caught "tomorrow afternoon" moving Saturday to Monday before this was split). The form tags it **Estimated from "next week"**.
- **A name borrowed from the owner** (the nameless front desk person called "Kim" like Dr. Kim, in 2 of 7 runs despite the prompt): two new people with the same name keep it only on the decision-maker (`drop_borrowed_names`).
- **Eval:** 21 cases (the owner's "next week" plus "a couple of weeks", "Monday morning", "before they close today"); four reference answers updated (a month or "after the holidays" lands on Mon 1/4/27 or Mon 11/2; "tomorrow afternoon" is 13:00); the scorer checks whether a date is marked as an estimate. haiku-7: 232/233, the miss being the borrowed name, fixed in code afterwards.
- Tests: pitchr-ai 71, pitchr-server 177, pitchr-client 95.
