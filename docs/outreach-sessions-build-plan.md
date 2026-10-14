# Outreach sessions V1: build plan

How V1 of outreach sessions gets built, step by step. The feature itself is described in [outreach-sessions.md](outreach-sessions.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

**V1 scope:** sessions (per person), outcomes / delivery / response, come back later with timing, quick-add lead and contact, the phone logging screen, end-of-session summary, check-in tasks resolving responses, planned session items from a list, automatic conversion dates, stage history, a one-time conversion cleanup. Maps and automatic route order are V1.5.

Each part ends in something you can use or check, so it can ship in pieces.

---

## Part A: Foundations (pitchr-server, plus the lead page)

Everything later depends on these, and they're useful on their own.

### ✅ Step 1: Touchpoint logging moves to the server
**Files:** `src/touchpoints/touchpoint-logging.service.ts` (+ `.spec.ts`), `touchpoints.controller.ts`, `touchpoints.module.ts` (pitchr-server); `src/hooks/useLeadDetail.ts`, `src/constants/leads.ts` (pitchr-client)

Before, logging a touchpoint on a lead's page was one request to save it, then 2–4 more **from the browser** to apply the sequence rules. If the connection dropped midway, the touchpoint was saved without its follow-up tasks.

- New `POST /api/touchpoints/log`: saves the touchpoint **and** applies the sequence rules in one database transaction (all or nothing).
- Rules moved unchanged from the browser into `TouchpointLoggingService`: in-person starts the sequence and creates "Did you send the follow-up email?"; email (while the sequence runs) completes that check, advances the step and creates the 4-day check-in; a visit attempt creates nothing extra; logging from a task completes the task.
- "Logged by" now comes from the logged-in user on the server, not from the browser.
- The lead page's Save uses the new endpoint (one request instead of up to five). `CHECK_IN_LABELS` now lives only on the server.
- 10 Jest tests, one per rule plus validation. Adding a brand-new contact while logging is still its own request first (proper quick-add is step 5).

### ✅ Step 2: Stage history and automatic conversion dates
**Files:** `prisma/schema.prisma` + migration `20261014000000_add_lead_stage_history`, `src/leads/lead-stage.ts` (+ `.spec.ts`), `leads.service.ts`, `leads.controller.ts`, `src/tasks/tasks.service.ts` (pitchr-server); `src/components/leads/ConvertLeadDialog.tsx` (new), `useLeadDetail.ts`, `LeadDetailPage.tsx`, `PipelinePage.tsx` (pitchr-client)

- New `LeadStageChange` table: lead, from stage, to stage, changed by (null for system changes), when. History starts when this ships; earlier changes weren't recorded.
- `changeStage()` in `lead-stage.ts` is the one place stages change: it records history, sets `convertedAt` on Converted (today or a chosen date) and clears it when leaving Converted.
- The normal `PATCH /api/leads/:id` routes any `pipelineStage` through it, so the lead page, the Pipeline board and the Dormant modal all follow the rules without being able to bypass them. `convertedAt` alone can only be edited on a Converted lead; it can't be cleared directly.
- Creating a lead records its first stage. The sequence ending in Dormant (tasks service) goes through it too, as a system change.
- Client: moving to Converted (stage picker or Pipeline drag) opens **Mark as converted?** with a date picker and the definition (booked project, money in the bank). Cancelling a drag leaves the card where it was. Converted leads show "Converted 10/14/26 · Edit date", or "No conversion date recorded · Add date".
- 15 new Jest tests (32 total).

---

## Part B: Session data (pitchr-server)

### ✅ Step 3: Schema
**Files:** `prisma/schema.prisma`, migration `20261015000000_add_outreach_sessions`

- **`OutreachSession`**: user, channel, plannedFor (date), startedAt, endedAt, area, goal (a number), notes. Planned = `plannedFor` set and not started; in progress = `startedAt`; ended = `endedAt`.
- **`SessionItem`**: session, lead, position, plannedTime, status (planned · completed · skipped), the touchpoint it produced (each touchpoint belongs to at most one item).
- **`TouchPoint` additions** (all optional, so existing touchpoints are unaffected): `sessionId`, `outcome`, `delivery`, `response` (pending · replied · no response), `responseText` (their reply), `providerType` (video · marketing agency · unknown, for the "has a provider" outcome), `respondedOn` (date only), `leftMaterials`, `comeBackAt`.
- **Enums:** `SessionChannel`, `SessionItemStatus`, `TouchPointOutcome`, `TouchPointDelivery`, `TouchPointResponse`, `ProviderType`.
- **Deleting:** a session's items go with it; its touchpoints stay (they just lose the session link). Deleting a touchpoint leaves its item, unlinked.
- `response` has no database default: step 5 sets **Pending** when a DM, email or text is logged. Older touchpoints keep an empty response.

### ✅ Step 4: Session endpoints
**Files:** `src/sessions/` (`sessions.service.ts` + `.spec.ts`, `sessions.controller.ts`, `sessions.module.ts`), `src/app.module.ts`

| Endpoint | Does |
| --- | --- |
| `POST /api/sessions` | Create a session (channel, plannedFor, area, goal, notes), optionally with leads in order |
| `GET /api/sessions` | Your sessions with item counts; `?all=true` lists everyone's for admins |
| `GET /api/sessions/:id` | One session, items in order, each with the lead's name, stage, industry, address and resulting touchpoint |
| `PATCH /api/sessions/:id` · `DELETE /api/sessions/:id` | Edit details · delete (items go, touchpoints stay) |
| `POST /api/sessions/:id/start` · `/end` | Start the timer · end and get a basic summary (duration, counts) |
| `POST /api/sessions/:id/items` | Add leads to the end |
| `PUT /api/sessions/:id/items/order` | Save a new order (must list every item once) |
| `PATCH /api/sessions/:id/items/:itemId` | Skip, or put back on the plan |
| `DELETE /api/sessions/:id/items/:itemId` | Remove a planned item |

Rules: staff see and change only their own sessions, admins anyone's; an ended session's list can't change; a lead can't be planned twice in a session; completed items can't be skipped, removed or set by hand (logging completes them, step 5); the channel can't change after starting. 19 Jest tests (51 total).

### ✅ Step 5: Logging an item
**Files:** `src/sessions/session-logging.service.ts` (+ `.spec.ts`), `sessions.controller.ts`, `sessions.module.ts`, `src/touchpoints/touchpoint-logging.service.ts` (+ tests), `touchpoints.module.ts`, `src/leads/lead-stage.ts`, `src/common/team-time.ts` (new)

**`POST /api/sessions/:id/log`** logs one lead, all in one transaction:

- **Which lead:** exactly one of `itemId` (a planned item), `leadId` (an unplanned existing lead) or `newLead` (quick-add: name, industry, business type, and `source`, how we got the lead, defaulting to Outreach). Unplanned and quick-added leads become new items at the end of the list.
- **Type:** the session's channel, unless one is given; required in mixed sessions.
- **Starts the session** if it hasn't started yet.
- **Contacts:** existing ones must belong to the lead; `newContact` adds one (first name, last name, title, decision-maker).
- **The touchpoint** goes through step 1's `TouchpointLoggingService.logWithin()`, so the sequence rules are shared with the lead page.
- **The item** is marked completed and linked to the touchpoint. An item can't be logged twice.
- **Come back later** with a time creates a follow-up task; `addBackToRoute` (in-person or mixed, later the same day) adds the lead back on the route with that planned time.
- **Returns** the updated session and `suggestedStage` (Not a fit → Not a Fit, Meeting booked → Meeting Scheduled), for the screen to offer.

**Step 1's logging service now handles results**, for the lead page too:

- In person / calls take an **outcome**; DMs / emails / texts take **delivery** (default Sent) and a **response** (default Pending, or empty if "received response" is already checked). Mixing them up is rejected.
- Business closed on a visit is saved as a **visit attempt** (no sequence tasks, same as before). No answer and left voicemail only apply to calls.
- A **failed** email doesn't advance the sequence or create a check-in.
- `receivedResponse` is set from the result (spoke to someone / got a reply), keeping existing screens and stats right.
- "Has a provider" defaults to an unknown provider type; `comeBackAt` only goes with "come back later".

Also: a shared `teamDateKey()` helper for "today in Tampa" (used by the snapshot too), and `recordInitialStage()` shared by lead creation and quick-add. 21 new Jest tests (72 total).

### ✅ Step 6: Check-ins resolve responses
**Files:** `src/touchpoints/touchpoint-response.ts` (new), `src/tasks/tasks.service.ts` (+ new `.spec.ts`), `tasks.controller.ts`, `tasks.module.ts`, `touchpoints.controller.ts`, `touchpoints.module.ts` (pitchr-server); `src/components/leads/RecordReplyDialog.tsx` (new), `src/constants/results.ts` (new), `src/utils/dates.ts` (new), `ConfirmModal.tsx`, `ConvertLeadDialog.tsx`, `useLeadDetail.ts`, `LeadDetailPage.tsx` (pitchr-client)

- **Check-ins about a DM, email or text now save the response on that message.** **No response** → `NO_RESPONSE`. **Yes, they responded** → the lead page opens **Their reply**: paste or type their message (required) and **When did they reply?** (`[Today] [Yesterday] [Earlier]`). Saved as `response: REPLIED`, `responseText`, `respondedOn` (date only, not in the future). No category: the reply's own words say more. The sequence continues exactly as before.
- **Revised after review:** the first version asked for a category reused from in-person outcomes (interested, has a provider...). Those don't fit written replies, so the response became Pending / Replied / No response plus the message itself (step 3's migration was regenerated before ever being applied).
- Check-ins that aren't about a message (e.g. "did they respond to your reply?") work as before, with no dialog.
- **`PATCH /api/touchpoints/:id/response`** (`{ responseText, respondedOn }`) records a reply anytime. If that message still has an open check-in, it's answered too, so it isn't asked again. (The button for it comes in step 10.)
- The check-in logic now runs in **one transaction** (it was several separate writes).
- `ConfirmModal` gained `confirmDisabled` (Save stays disabled until there's text). 85 Jest tests.

---

## Part C: Screens (pitchr-client, phone first)

### ✅ Step 7: Sessions page and planning
**Files (pitchr-client):** `src/pages/SessionsPage.tsx`, `src/pages/SessionPage.tsx`, `src/components/sessions/SessionDetailsDialog.tsx`, `src/components/sessions/LeadPicker.tsx`, `src/types/sessions.ts`, `src/constants/sessions.ts` (all new), `src/utils/dates.ts`, `src/App.tsx`, `src/components/InternalLayout.tsx`

- **Sessions** in the navigation (sidebar and phone bar) → `/sessions`: your sessions grouped **In progress · Upcoming** (soonest first) **· Past**, each with channel, area, date and progress ("12 stops" planned, "8 of 12 visited" once started). Admins can show everyone's.
- **+ Plan a session**: channel, date (defaults to today), optional area, goal and notes → creates it and opens it.
- **Session page** (`/sessions/:id`): details with **Edit** (the channel locks once started) and **Delete** (logged touchpoints stay on leads); the list numbered in order, **drag to reorder** (saved right away, undone if saving fails), **✕ to remove** (with confirmation), **Navigate** (Google Maps directions) for in-person and mixed sessions, done / skipped badges. Ended sessions are read-only.
- **+ Add leads** opens a picker: search, industry, stage, "not contacted in 30+ days", with Converted / Not a Fit / Lost hidden unless included; already-planned leads aren't offered.
- Labels follow the channel ("stops", "calls", "messages", "emails", "leads"). No Start button yet: running a session is step 8.

### ✅ Step 8: The active session screen
**Files:** `src/pages/RunSessionPage.tsx`, `src/components/sessions/LogVisitForm.tsx`, `MessageRow.tsx`, `AddToSessionDialog.tsx` (all new), `src/pages/__tests__/RunSessionPage.test.tsx` (new), `src/constants/results.ts`, `src/types/sessions.ts`, `SessionPage.tsx`, `App.tsx`, `package.json` (pitchr-client); `src/sessions/sessions.service.ts` (items include the lead's contacts) (pitchr-server)

- **Start session / Continue session** on the session page opens `/sessions/:id/run`, which starts the session if needed (an ended session goes back to its page).
- **Top bar:** channel, area, "3 of 12 visited", time elapsed; **List**, **+ Add**, **End**.
- **Visits and calls, one lead at a time** ("Stop 3 of 12", "back at 3:00 PM" for come-back stops): business, industry and stage, **Navigate**, **Snapshot** (the AI snapshot inline). **What happened?** buttons (calls get no answer / left voicemail; visits get business closed); **has a provider** asks what kind; **come back later** asks when (later today / another day / not specified, plus a time) and offers **add back to today's route**; **who did you talk to?** (the lead's contacts, decision-makers marked ★, or **+ New contact**), hidden when nobody was reached; a note; **left materials** for visits. **Save & next** (disabled until an outcome is picked) or **Skip**.
- **Not a fit / meeting booked** offers the stage change afterwards.
- **DMs, emails, texts: a list** with **Sent** / **Failed** on each lead (one tap), optional note, Skip.
- **Mixed sessions** pick the type per lead (visit, call, DM, email, text).
- **List** shows every item with its result; tap a planned or skipped one to go to it. **+ Add** logs an unplanned existing lead, or a new business (name, industry, business type, how we got the lead).
- **End** confirms (mentioning anything still planned), ends the session and returns to its page, which shows the summary (step 9).
- **First React component tests in the client:** 6 tests render the run screen with a fake server (next stop and progress, logging an outcome with a contact, auto-start, stage suggestion, closed business hides contacts, one-tap DM). Added the missing `@testing-library/dom` dev dependency they need.

### ✅ Step 9: End-of-session summary
- **Server:** `SessionsService.summarize()` works it out from the touchpoints logged in the session (`TouchPoint.sessionId`). `POST /sessions/:id/end` returns it, and `GET /sessions/:id` includes it as `summary` once the session has ended, so it can be looked at again later.
- **What it counts:** items completed / planned / skipped and the duration; **conversations** (visits and calls where someone was spoken to, so not business closed, no answer or left voicemail); **decision-makers reached** (leads where a ★ contact was picked, counted once per lead even if visited twice); **meetings booked**; a count of each outcome; messages **sent** and **failed**; and the **follow-ups** those touchpoints created (follow-up email checks, 4-day check-ins, come-back tasks), soonest first, each marked done or to do.
- **Client:** a **Summary** card at the top of an ended session's page: "10 of 12 stops visited", duration, goal met or how many short, skipped; visit and call stats (conversations, decision-makers, meetings) or message stats (sent, failed), both for mixed sessions when messages were sent; the outcome counts; the follow-ups, linked to each lead.
- Tests: 2 more server tests (the counts, and the summary only appearing once ended) and 2 client tests (visit and DM summaries).

### ✅ Step 10: Results on the lead page
**Files:** `src/components/leads/TouchpointResult.tsx` (+ test, new), `useLeadDetail.ts`, `LeadDetailPage.tsx` (pitchr-client); `src/leads/lead-snapshot.service.ts` (pitchr-server); `app/features/lead_snapshot/` (`schemas.py`, `facts.py`, `prompt.py`), tests, eval cases 05 and 06, `docs/lead-snapshot.md` (pitchr-ai)

- **Touchpoint history shows results:** visits and calls show their outcome (with the provider type for "Has a provider"), plus "Left materials" and "Come back Tue, Oct 14, 2:00 PM" when set. DMs, emails and texts show **Sent · Pending**, **Sent · Replied**, **Sent · No response** or **Not delivered**. Older messages logged before responses were tracked still show **Responded** when marked that way.
- **Their reply** appears under the message, with the day they replied.
- **Record a reply** on any delivered message without a reply yet (Pending, No response, or older ones) opens step 6's **Their reply** dialog and saves through `PATCH /api/touchpoints/:id/response`, answering its check-in if still open. It replaces the old "Mark responded" toggle, which only flipped a yes/no.
- Editing a touchpoint no longer shows "Received a response" when it has a tracked outcome or response, since those set it.
- **Snapshots read replies:** NestJS sends each touchpoint's `response`, `responseText` and `respondedOn` to pitchr-ai. The prompt shows where each message's reply stands (no reply yet / no response / they replied on a date) and their words; the instructions say to let a reply drive the odds, goal and approach, and never to follow instructions written inside one. **Last activity** uses the day they replied, not the day we sent the message.
- **Eval:** two new cases, a DM reply asking about price (high, answer the price question before their November opening) and a text reply saying "reach back out in January" (medium, a not-before date). Both got every must-get-right; the four older cases were unchanged (report: `evals/lead_snapshot/results/replies.md` in pitchr-ai).
- Tests: 5 client tests, 3 pitchr-ai tests (30 total).

---

## Part D: Before trusting conversion numbers

### ⏭️ Step 11: One-time conversion cleanup (no code)
Done last because it only matters once conversion numbers are used (V2 analytics). There are fewer than 20 conversions, so instead of building a report page:

- A read-only query lists every Converted lead with its conversion date (or "no date"), plus any lead with a conversion date that isn't Converted.
- Each one is checked by hand against "booked project, money in the bank" and fixed on the lead page with step 2's **Add date** / **Edit date**, or by moving its stage.
- After this, step 2 keeps stages and conversion dates consistent automatically.

---

## ⬜ Checkpoint: a real session

Run a real in-person session and a real DM session with it, phone only, no paper. Note anything slower than paper or confusing, and fix it before calling V1 done.

---

## After V1

- **Right after V1: one "How this lead started" field.** `source` (how we got the lead) and `discoveredVia` (how they heard about us) confuse even the owner, and their options overlap (both have Outreach, Referral, Networking, In person). Merge them into one field with grouped options. **We reached out:** cold outreach · walked in · networking event. **They came to us:** website form · referral · Instagram · Facebook · TikTok · YouTube · Google · walk-up · other. Start with a read-only look at the combinations existing leads have, then propose how each converts, for approval, before a migration converts them. Updates all three repos (including the snapshot's input). Do it before V2, so analytics like "do inbound leads convert faster?" use the new field.
- **Fill in missing addresses (before the field test if possible).** 162 of 195 leads (150 excluding Converted / Not a Fit / Lost) have no address, so Navigate rarely works. One-time job, no feature to build: look each business up with Google Places (biased to Tampa Bay), show the matches for review (confident / check / not found), then save the approved ones as primary locations in one transaction. Also collects coordinates (half of V1.5's map work) and optionally phone and website. Needs a Google key usable from a script (likely a second, server-side key). Then stop new gaps: let add-lead and session quick-add search Google for the business and fill the address in.
- **pitchr-client: move to feature folders.** The client is organized by layer (`pages/`, `components/`, `constants/`, `types/`...), so one feature like sessions is spread across six folders. Move to `src/features/<feature>/` (pages, components, hooks, types, constants together), with shared UI in `src/components/ui/`, helpers in `src/lib/` and app setup in `src/app/`, matching pitchr-server and pitchr-ai. Mechanical, no behavior change; TypeScript and the tests catch broken imports.
- **pitchr-client: split `LeadDetailPage`.** It's 2,738 lines (plus 809 in `useLeadDetail`), holding lead info, contacts, locations, attachments, tasks, touchpoints, notes, signals and dialogs. Split it into section components inside `features/leads/` (e.g. `LeadTouchpoints`, `LeadTasks`, `LeadContacts`), one section at a time, checking each in the app. Do this after the folder move.
- **V1.5, maps:** coordinates for locations, map of leads, automatic best stop order. Cancel MyWay.
- **V2, analytics and team views.**
- **V3, AI:** voice notes to structured logs, snapshot before each item, "what's working" summaries.
