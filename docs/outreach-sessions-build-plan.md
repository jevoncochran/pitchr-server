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
- **`TouchPoint` additions** (all optional, so existing touchpoints are unaffected): `sessionId`, `outcome`, `delivery`, `response`, `providerType` (video · marketing agency · unknown, for "has a provider"), `respondedOn` (date only), `leftMaterials`, `comeBackAt`.
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

### ⏭️ Step 6: Check-ins resolve responses
- The 4-day check-in's **Yes** asks what they said and when they replied (`[Today ✓] [Yesterday] [Earlier: pick a date]`), and saves it as the touchpoint's response; **No** saves "No response".
- A reply that comes in early can be recorded from the lead page at any time.

---

## Part C: Screens (pitchr-client, phone first)

### ⬜ Step 7: Sessions page and planning
- Sessions list (upcoming, in progress, past).
- Plan a session: channel, area, goal, then pick leads and drag to order.

### ⬜ Step 8: The active session screen
- One item at a time, labeled by channel ("Stop 3 of 12", "Message 3 of 12"): business, **Navigate** (Google / Apple Maps), **Snapshot**, outcome buttons, contact picker with quick-add, come-back-later timing, note, **Next**.
- Async channels (DMs, emails): a faster list mode where each lead is marked **Sent** (or Failed) in one tap.
- Add an unplanned item or quick-add a business mid-session.
- Session timer and progress.

### ⬜ Step 9: End-of-session summary
- Items completed vs. planned ("10 of 12 stops visited"), skipped, conversations, decision-makers reached, meetings booked, messages sent, follow-up tasks created.

### ⬜ Step 10: Results on the lead page
- Touchpoint history shows outcomes, delivery and responses (with Pending visible).
- "Record a reply" on any pending touchpoint.

---

## Part D: Before trusting conversion numbers

### ⬜ Step 11: One-time conversion cleanup (no code)
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
- **V1.5, maps:** coordinates for locations, map of leads, automatic best stop order. Cancel MyWay.
- **V2, analytics and team views.**
- **V3, AI:** voice notes to structured logs, snapshot before each item, "what's working" summaries.
