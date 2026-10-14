# Outreach sessions V1: build plan

How V1 of outreach sessions gets built, step by step. The feature itself is described in [outreach-sessions.md](outreach-sessions.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

**V1 scope:** sessions (per person), outcomes / delivery / response, come back later with timing, quick-add lead and contact, the phone logging screen, end-of-session summary, check-in tasks resolving responses, planned session items from a list, automatic conversion dates, stage history, conversion cleanup report. Maps and automatic route order are V1.5.

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
- 10 Jest tests, one per rule plus validation. Adding a brand-new contact while logging is still its own request first (proper quick-add is step 6).

### ✅ Step 2: Stage history and automatic conversion dates
**Files:** `prisma/schema.prisma` + migration `20261014000000_add_lead_stage_history`, `src/leads/lead-stage.ts` (+ `.spec.ts`), `leads.service.ts`, `leads.controller.ts`, `src/tasks/tasks.service.ts` (pitchr-server); `src/components/leads/ConvertLeadDialog.tsx` (new), `useLeadDetail.ts`, `LeadDetailPage.tsx`, `PipelinePage.tsx` (pitchr-client)

- New `LeadStageChange` table: lead, from stage, to stage, changed by (null for system changes), when. History starts when this ships; earlier changes weren't recorded.
- `changeStage()` in `lead-stage.ts` is the one place stages change: it records history, sets `convertedAt` on Converted (today or a chosen date) and clears it when leaving Converted.
- The normal `PATCH /api/leads/:id` routes any `pipelineStage` through it, so the lead page, the Pipeline board and the Dormant modal all follow the rules without being able to bypass them. `convertedAt` alone can only be edited on a Converted lead; it can't be cleared directly.
- Creating a lead records its first stage. The sequence ending in Dormant (tasks service) goes through it too, as a system change.
- Client: moving to Converted (stage picker or Pipeline drag) opens **Mark as converted?** with a date picker and the definition (booked project, money in the bank). Cancelling a drag leaves the card where it was. Converted leads show "Converted 10/14/26 · Edit date", or "No conversion date recorded · Add date".
- 15 new Jest tests (32 total).

### ⏭️ Step 3: Conversion cleanup report
- A read-only report of leads whose stage and conversion date disagree (Converted with no date, a date but not Converted).
- You fix each one by hand on the lead page. After this, conversion numbers can be trusted.

---

## Part B: Session data (pitchr-server)

### ⬜ Step 4: Schema
- New tables: `OutreachSession` (user, channel, startedAt, endedAt, area, goal, notes) and `SessionItem` (session, lead, position, planned time, status: planned · completed · skipped, resulting touchpoint).
- `TouchPoint` additions: `sessionId`, `outcome`, `delivery`, `response` (default Pending for async types), `respondedOn` (date only), `leftMaterials`, `comeBackAt`.
- New enums: outcome, delivery, response, session channel, item status.
- One migration, written to be safe to apply to production.

### ⬜ Step 5: Session endpoints
- Plan: create a session, add / remove / reorder items.
- Run: start, get the current session with its items, end (returns the summary).
- List: my sessions; admins see everyone's.
- Permissions: staff can only change their own sessions.

### ⬜ Step 6: Logging an item
- Extends step 1's endpoint with outcome / delivery / response, contact (existing or quick-added), note, left materials.
- Quick-add lead in the same request (name, industry; discovered via can be **Tip**).
- Marks the session item completed and links it to the touchpoint; unplanned contacts become new items.
- **Come back later:** creates the follow-up task at the chosen time; "later today" in an in-person session adds a new item back on the route at that time.
- Returns stage suggestions ("Not a fit" → offer Not a Fit; "Meeting booked" → offer Meeting Scheduled), applied through step 2's method if accepted.
- Keeps `receivedResponse` in sync for existing screens.

### ⬜ Step 7: Check-ins resolve responses
- The 4-day check-in's **Yes** asks what they said and when they replied (`[Today ✓] [Yesterday] [Earlier: pick a date]`), and saves it as the touchpoint's response; **No** saves "No response".
- A reply that comes in early can be recorded from the lead page at any time.

---

## Part C: Screens (pitchr-client, phone first)

### ⬜ Step 8: Sessions page and planning
- Sessions list (upcoming, in progress, past).
- Plan a session: channel, area, goal, then pick leads and drag to order.

### ⬜ Step 9: The active session screen
- One item at a time, labeled by channel ("Stop 3 of 12", "Message 3 of 12"): business, **Navigate** (Google / Apple Maps), **Snapshot**, outcome buttons, contact picker with quick-add, come-back-later timing, note, **Next**.
- Async channels (DMs, emails): a faster list mode where each lead is marked **Sent** (or Failed) in one tap.
- Add an unplanned item or quick-add a business mid-session.
- Session timer and progress.

### ⬜ Step 10: End-of-session summary
- Items completed vs. planned ("10 of 12 stops visited"), skipped, conversations, decision-makers reached, meetings booked, messages sent, follow-up tasks created.

### ⬜ Step 11: Results on the lead page
- Touchpoint history shows outcomes, delivery and responses (with Pending visible).
- "Record a reply" on any pending touchpoint.

---

## ⬜ Checkpoint: a real session

Run a real in-person session and a real DM session with it, phone only, no paper. Note anything slower than paper or confusing, and fix it before calling V1 done.

---

## After V1

- **V1.5, maps:** coordinates for locations, map of leads, automatic best stop order. Cancel MyWay.
- **V2, analytics and team views.**
- **V3, AI:** voice notes to structured logs, snapshot before each item, "what's working" summaries.
