# Feature: Outreach sessions (draft for review)

**Status:** Building. Steps 1–10 of the build plan are done (logging, planned lists, the phone screen, the end-of-session summary, results and replies on the lead page and in snapshots); next is a real session as a checkpoint. The conversion cleanup is deferred until it can be done against the prod database. Build plan: [outreach-sessions-build-plan.md](outreach-sessions-build-plan.md).

## Why

1. **Faster, safer logging.** Record outreach in the app as it happens: no paper worksheet, no uploading later, no lost notes.
2. **Better analytics.** With consistent, structured data, see what's working (which industries, channels and approaches convert) and what isn't.

## Name

**Session** in the app ("Start a session"), **Outreach session** where it needs context (page title, analytics). It fits every channel: a walking route, an hour of DMs, a batch of follow-up emails.

## How it works

A session is a block of outreach work by one person. Each lead contacted in it is a normal **touchpoint**, so lead pages, snapshots, sequences and check-in tasks keep working unchanged. The session adds speed (channel, date and person are set once) and context (when, where, how long, how much got done).

```
Session: Tue 10/14 · In person · South Tampa · 9:10–11:45am · Jevon
  ├─ Peak Roofing        Outcome: Come back later (decision-maker in after 3pm)
  ├─ Glow Med Spa        Outcome: Business closed
  ├─ (new) Bay Roofing   Outcome: Interested · contact: Dana (owner, decision-maker)
  └─ ...

Session: Wed 10/15 · Instagram DMs · Jevon
  ├─ Summit Build Co.    Sent · Response: Pending
  ├─ Peak Roofing        Sent · Replied 10/17: "Sounds good, what do you charge?"
  └─ ...
```

### Session fields

- Channel: in person · calls · Instagram DMs · emails · texts · mixed
- Started / ended (a timer runs while the session is open)
- Area (optional, mostly for in-person, e.g. "South Tampa")
- Goal (optional, e.g. "20 stops" or "30 DMs")
- Notes (optional)
- Who ran it

## Results: outcomes (in person, calls) vs. delivery + response (DMs, emails, texts)

Live channels and async channels record different things, because for DMs and emails we don't know at the time how they'll react.

### In person and calls: **Outcome**, recorded at the time

| Outcome | Channel | Notes |
| --- | --- | --- |
| Business closed | In person | |
| No answer | Call | |
| Left voicemail | Call | |
| Decision-maker not available | Both | We spoke to staff only |
| Come back later | Both | Your "circle back". See below |
| Interested | Both | |
| Not interested | Both | A clear no |
| Has a provider | Both | Video provider · marketing agency · unclear. Matches the snapshot's existing-provider rule |
| Not a fit | Both | Offers to move the lead to the **Not a Fit** stage |
| Meeting booked | Both | Offers to move the lead to **Meeting Scheduled** |

When we spoke to someone, pick **who** from the lead's contacts (decision-makers listed first), or quick-add one (name, optional title, decision-maker yes/no). Touchpoints already link to contacts, and each contact has a decision-maker flag, so "did we reach the decision-maker?" comes from who was logged, with no extra field. If we didn't get a name, the contact can be skipped.

### DMs, emails and texts: **Delivery** at the time, **Response** later

- **Delivery**, recorded when sent: **Sent** · **Failed** (bounced, or the message couldn't be delivered).
- **Response** starts as **Pending** and is updated when we know:
  - They replied → **Replied**, with **their actual message** (pasted or typed in). No category: a written reply says far more than a button could ("Sounds great, what do you charge?" vs. "Maybe, send me something"), and snapshots can read it.
  - **When they replied** is entered by hand (nothing logs replies automatically), so it's a date, not a time, prefilled with **Today**: `[Today ✓] [Yesterday] [Earlier: pick a date]`. Zero extra taps when replies are recorded the day they arrive.
  - They didn't → **No response**.

The existing check-in task ("Did they respond?", due 4 days after outreach) is where Pending gets resolved: **Yes** → paste their reply (the date defaults to today); **No** → No response. A reply that arrives before the check-in (or after a No response) can be recorded from the lead page at any time with **Record a reply**. The lead page shows each message's status and their reply, and snapshots read the reply's words and date.

Outcome categories (interested, has a provider, come back later...) are for visits and calls only. Messages are counted by response rate (replied vs. no response); what replies say lives in their text. Later, Claude could read replies and categorize them for analytics.


### Come back later

The most common "circle back": bad timing, come back. Sometimes they name a time.

- **When** (optional): later today (pick a time) · another day (pick a date) · not specified.
- **Note** (optional): e.g. "decision-maker in after 3pm, ask for Maria".
- Creates a follow-up task due at that time.
- **Later today, during an in-person session:** offers to put the stop back on today's route at that time.
- The snapshot picks up the date through its timing rules, so it shows up when you look at the lead again.

### Any item

- **Left materials / sent info** checkbox.
- Optional short note.

## What the screen calls each item

Internally each lead on a session's list is a **session item**. On screen, the label follows the channel so it always reads naturally:

| Channel | Progress | Summary |
| --- | --- | --- |
| In person | Stop 3 of 12 | 10 of 12 stops visited |
| Calls | Call 3 of 12 | 10 of 12 calls made |
| Instagram DMs / texts | Message 3 of 12 | 10 of 12 messages sent |
| Emails | Email 3 of 12 | 10 of 12 emails sent |
| Mixed | Lead 3 of 12 | 10 of 12 leads contacted |

When planning, they're just **leads** ("12 leads planned").

## Logging flow (phone first)

The bar: logging each item must be faster than writing on paper.

1. **Start session:** pick channel; optional area and goal; or start from a planned route (below).
2. **Log each item** (about 10 seconds):
   - The next planned item, or search for a lead, or **quick-add** a business (name; industry and business type are optional and can be added later on the lead page; its source, how we got the lead, defaults to Outreach).
   - In person / call: tap the **outcome**, and pick or quick-add the **contact** spoken to.
   - DM / email / text: **Sent** is preselected; response starts Pending.
   - Optional: note, left materials, come-back-later timing.
   - **Next**.
3. **End session:** summary (items completed vs. planned and skipped, time taken, goal met or not, conversations, decision-makers reached, meetings booked, a count of each outcome, messages sent and failed) and the follow-up tasks it created. A conversation is a visit or call where someone was spoken to. Decision-makers are counted once per lead. The summary stays on the session's page afterwards.

## Planned routes (replaces MyWay)

Routes are planned ahead of in-person sessions (currently in MyWay, $10/month). Planned stops become the session's queue, so planning, driving, the snapshot and logging happen in one flow:

> **Stop 3 of 12 · Peak Roofing** · [Navigate] · [Snapshot] · log outcome → **Next stop**

| Piece | How |
| --- | --- |
| Plan a session | Pick leads (from a list; later a map) into the session's stop list |
| Stop order | Drag to reorder; later, Google's routing API finds the fastest order (up to 25 stops) |
| Driving | Each stop has a **Navigate** button that opens Google Maps / Apple Maps. No in-app turn-by-turn |
| Map of leads (later) | Pins filterable by industry, stage, "not contacted in 30+ days". Needs coordinates: geocode addresses on save and backfill existing locations |
| Plan from data (later) | e.g. "roofers in South Tampa not contacted in 30 days" |

Notes:

- Google Maps charges per request beyond a monthly free allowance; one person planning a few routes a week should stay within it (verify current pricing).
- The browser Maps key must be restricted to Pitchr's domains in Google Cloud. Route calculations go through NestJS with a separate server-side key.
- MyWay features we won't rebuild: live re-routing and route sharing. Driving is handed off to Google/Apple Maps. Drive times between stops are shown (they come with the optimized route). The details are in [route-planning.md](route-planning.md).

## Built for a team

One person does outreach today, but everything is designed for several.

- **Every session belongs to the person who ran it.** Touchpoints logged in a session record that person (`contactedBy`, which already exists).
- **Visibility:** staff see and edit their own sessions; admins see everyone's (Pitchr already has `STAFF` and `ADMIN` roles).
- **No double visits:** when planning a route, leads already on someone else's planned session for the same day are flagged. Lead assignment (`assignedTo`, already exists) can filter planning to "my leads".
- **Analytics** can be viewed for one person or the whole team; admins can compare people.

V1 only needs the data to be recorded per person correctly. Team screens (comparisons, double-visit warnings) can come with V2, without changing the data.

## Recording conversions (required)

Conversions haven't been recorded consistently, and upcoming client-management features depend on knowing exactly who converted and when. So conversion recording is part of V1, not an afterthought.

- **One action marks a conversion:** moving a lead to the **Converted** stage. The server sets `convertedAt` automatically (editable, so a conversion can be backdated to the real date). Nobody has to remember a second step.
- **Stage history:** every stage change is recorded with who made it and when. That gives reliable conversion dates, shows how long leads sit in each stage, and is the foundation for client management.
- **One-time cleanup:** fewer than 20 conversions exist, so a one-time list (not a report page) of Converted leads and their dates, plus leads with a date that aren't Converted. Each is checked against the definition and fixed by hand on the lead page before analytics are trusted.

- **What counts:** a booked project with money in the bank. A signed or verbal agreement alone isn't a conversion. It's marked by hand.
- **Moving a lead out of Converted** (e.g. by mistake) clears its conversion date, so it never counts in conversion analytics. Stage history still records it.

## Analytics

| Question | Needs | Available |
| --- | --- | --- |
| Leads contacted per conversion | Unique leads with a touchpoint ÷ converted leads | After the conversion cleanup |
| Touchpoints before conversion (median) | Touchpoints before `convertedAt` | After the conversion cleanup |
| Days from first contact to conversion, by industry | First touchpoint → `convertedAt` | After the conversion cleanup |
| Conversion rate by industry / business type | Converted ÷ contacted | After the conversion cleanup |
| Response rate and time to respond, by channel | Delivery + response + reply date | After sessions. Time to respond is approximate: it's only as accurate as the reply dates entered |
| Outcome rates by channel, industry, time of day | Outcomes + session times | After sessions |
| How often we reach the decision-maker | Contacts logged on touchpoints (their decision-maker flag) | After sessions; only as complete as contacts are logged |
| Session productivity | Items and conversations per hour | After sessions |
| Where leads stall | Stage history | After stage history |
| Any of the above per person | `contactedBy` / session owner | After sessions |

Rules for showing numbers:

- **Always show counts with percentages** ("3 of 12, 25%"). With few conversions, a percentage alone can look like a pattern when it's noise.
- Outcome and response analytics only cover touchpoints logged after sessions launch. They get more useful week by week.

## Data model (sketch)

- **New `OutreachSession`:** user, channel, startedAt, endedAt, area, goal, notes.
- **New `SessionItem`**: one lead on a session's list. Session, lead, position, planned time (for "come back later today"), status (planned · completed · skipped), the touchpoint it produced. Planned items exist before anything happens; skipped ones never get a touchpoint. Unplanned contacts (e.g. a business you spot mid-route) are added as items when logged, so every touchpoint in a session belongs to an item.
- **`TouchPoint` additions:** `sessionId` (optional: touchpoints can still be logged outside a session), `outcome` (in person / calls), `delivery` (sent / failed), `response` (pending → replied / no response), `responseText` (their reply), `respondedOn` (date only), `leftMaterials`, `comeBackAt`.
- **`receivedResponse`** stays for now so existing screens keep working; it's set automatically when a response or a "spoke to someone" outcome is recorded.
- **New `LeadStageChange`:** lead, from stage, to stage, changed by, changedAt.
- **`Location` additions (V1.5):** latitude, longitude.

## Scope

- **V1, logging, planned sessions and conversions:** sessions (per person), outcomes / delivery / response, come back later with timing, quick-add lead, the phone logging screen, end-of-session summary, check-in tasks resolving responses, planned session items from a list (pick, drag to order, Navigate buttons, log through them), automatic conversion dates, stage history, a one-time conversion cleanup.
- **Right after V1: one "How this lead started" field.** Being built: see [lead-origin.md](lead-origin.md).
- **V1.5, maps:** coordinates for every location, map of leads, automatic best stop order. MyWay can be cancelled here. Being built: see [route-planning.md](route-planning.md).
- **V2, analytics and team views:** conversion and outcome metrics, per-person filters and comparisons, double-visit warnings.
- **Later: automatic reply detection.** A Gmail connection could detect replies to emails sent to a lead and fill in the response and date. Instagram's business API is possible but restricted; texts aren't realistic.
- **V3, AI:** voice note → structured log (Claude fills outcome, contact and note); a snapshot shown before each item; an AI summary of what's working.

## Decisions so far

- ✅ Live channels record an **outcome**; async channels record **delivery** (sent / failed) and a **response** that starts Pending.
- ✅ Who was spoken to is recorded as a **contact** (existing link), not a separate staff / decision-maker field.
- ✅ A pending response becomes **No response** at the 4-day check-in.
- ✅ The reply date is entered by hand as a **date** (not a time), defaulting to today.
- ✅ A message reply is saved as **their actual message**, with no category. Outcome categories are for visits and calls only.
- ✅ "Circle back" is **Come back later**, with optional timing (later today or another day).
- ✅ Routes are planned ahead, so sessions can start from a planned list of leads.
- ✅ Designed for multiple people from the start; one person today.
- ✅ Conversion recording and stage history are part of V1.
- ✅ Each lead on a session's list is a **`SessionItem`**; on screen the label follows the channel (stop, call, message, email).
- ✅ A conversion is a booked project with money in the bank, marked by hand. Leaving Converted clears the date.
- ✅ Logging a touchpoint and its follow-up effects (sequence tasks, stage changes) happens on the server in one all-or-nothing step, shared by the lead page and sessions.
