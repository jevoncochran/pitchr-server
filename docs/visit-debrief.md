# Visit debrief

**Status:** Building. Build plan: [visit-debrief-build-plan.md](visit-debrief-build-plan.md).

Logging a visit means tapping through outcome, contacts, provider, come-back date and materials, then typing a summary, standing on a sidewalk between stops. It gets skipped or done thinly, and everything downstream (the [lead snapshot](https://github.com/jevoncochran/pitchr-ai/blob/HEAD/docs/lead-snapshot.md), follow-up emails, the next visit) is only as good as what was logged. With a debrief, you say what happened in a few sentences and the visit form fills itself in for you to check and save.

It builds on [business card scan](business-card-scan.md): by the time you debrief, any card you photographed is already a contact, so the debrief only has to match the people you mention.

## What you see

On the active session screen, an in-person visit to a lead that's in Pitchr gets a **What happened?** box at the top of the visit form, with **Fill in**. (Not on calls, or for a business added on the spot, which has no contacts or history yet.) The outcome buttons below are headed **Outcome**.

1. Tap the box and use the iPhone keyboard's mic: "Spoke with Jen at the front desk. Owner is Maria, she's in on Thursdays. They use an agency for social but nothing for video. Left a card. Come back next Thursday."
2. Tap **Fill in** (it shows **Filling in…** for a few seconds). The form below fills in, and each filled section is tagged **From your note**:
   - **Outcome:** Decision-maker not available, with **Going back? When?** set to next Thursday (an estimated date or time, from "next week" or "afternoon", is tagged **Estimated from "next week"** instead)
   - **Provider:** Marketing agency (shown when the outcome is Has a provider)
   - **Who did you talk to?:** contacts on file you spoke with are ticked; new people appear as contact rows to check (Jen, front desk, **Spoke with** ticked); someone mentioned but not spoken to (an owner who wasn't in) is added unticked
   - **Update María López: title "owner", decision-maker** for what the note says about a contact on file, with **Don't** to drop it (the server only fills empty fields; a different title becomes a Replace/Keep suggestion)
   - People mentioned with no name ("the woman at the register") are listed as "No name given for: …", not saved
   - **Summary** and **Left materials**
3. Questions show above the form only when you have to decide something: **Which contact is Maria?** with the candidates and **Someone new**, or checking a spoken email or phone number against their business card. Anything the note simply doesn't say (a last name, someone's role, a time of day) is left empty, not asked; most visits have no questions.
4. Check, change anything, and tap **Save & next** as today.

You can always skip the box and fill in the form by hand. Editing the note and tapping **Fill in again** refreshes only what you haven't changed by hand: a section you edited keeps your version and loses its tag.

The keyboard mic is used because it's free and reliable on iPhone, and Safari's built-in speech recognition isn't. A one-tap record button with server-side transcription can come later if the extra tap matters.

## Rules

**Contacts, in this order:**

1. **People on file.** "Maria", "the owner" or "the manager" matches an existing contact by name, then title or decision-maker flag. Matched people are ticked as spoken to only if you spoke to them; being mentioned isn't enough.
2. **New people.** Anyone you spoke to or named who isn't on file becomes a proposed new contact (first name, last name if said, title or role if said). Cards don't need handling here: business card scan already made them contacts.
3. **Not sure.** Two possible matches: nothing is guessed; the form asks which. Someone with no name ("the girl at the front desk", "the manager") is listed by role with no name; they can't become a contact until a name is added.

**Contact updates** from what you said (a title, "she's the owner") follow business card scan's rule: empty fields are filled in, a different existing value is shown as a suggestion and never overwritten. Emails and phone numbers are **never** taken from a voice note: spoken emails are too easy to mishear, and the card is the source for those.

**Outcome** is one of the in-person outcomes the form offers, picked in this order of priority: meeting booked, interested, not a fit, has a provider, not interested, decision-maker not available, come back later, business closed. When the note doesn't say how the visit went, none is picked.

- **The outcome says how the visit went; a time to go back is separate.** A come-back day and time can go with **Interested**, **Decision-maker not available** and **Come back later** ("very interested, come back tomorrow afternoon" is Interested with tomorrow), and creates the follow-up task. The visit form shows the come-back choices for those three outcomes, and the server accepts a come-back time with them (`COME_BACK_OUTCOMES`). "Come back later" is for being told to come back without talking business (too busy right now, come back another day).
- **Interested** counts the decision-maker or someone who runs marketing or the business day to day (a marketing coordinator, practice manager) asking for examples, pricing or a proposal, even when the owner signs off on the budget. **A gatekeeper (front desk, a waiter) liking the idea, or guessing the owner would, isn't "Interested"**: that's the decision-maker's call. The summary records what the gatekeeper said.
- Our own promise to email or call ("I'll email it over Monday") isn't a come-back date; the summary keeps it.
- "Come back later today" works as today: the form's **Add back to today's route** option is left for you to choose.

**Dates** are read off a calendar of the next 45 days that comes with the note, starting today in the team's time zone, rather than worked out by Claude.

- **A day that was said:** "next Thursday" is the first Thursday after today, "tomorrow" is tomorrow, "after the 15th" is the day after the next 15th that hasn't passed, "later today" is today. It's never moved, even to a weekend ("come by Saturday").
- **A period instead of a day** is proposed as its first weekday, marked as an estimate: "next week" is the Monday of next week; "in a couple of weeks" the Monday two weeks out; "later this week" the coming Thursday; a month ("in January", "until next month") the first weekday of that month; "after the holidays" the first weekday in January. Claude gives the start of the period, and code moves it to the first Monday–Friday that isn't a holiday (New Year's Day, Memorial Day, July 4th, Labor Day, Thanksgiving, Christmas), since date arithmetic is where models slip. Pitchr doesn't store opening hours, so it can't know a restaurant is closed Mondays; you review the date anyway. (Saving opening hours from Google Places could make this "the first day they're open" later.)
- **A part of the day** is a time, also marked as an estimate: morning 9:00, afternoon or after lunch 13:00, end of the day or before they close 16:00. An exact time said ("around 3") is used as is.
- **No period at all** ("sometime", "soon") gives no date; the summary keeps the words. A date before today is dropped.

**Summary:** first person plural ("we spoke with Jen"), like the rest of the app. People are referred to by name and role, and their gender is kept when the note gives it, said plainly ("the girl at the register" becomes "the woman at the register"): it helps find the same person on the next visit. It keeps every fact you said (names, roles, objections, timing, promises) and only fixes dictation mistakes and filler. Nothing is added. It's what goes into the touchpoint, and what the snapshot and follow-up emails read later.

**Accuracy:** only what's in the note. Gender is kept (see Summary), but nothing about anyone's age, appearance, accent, ethnicity or other personal traits, even if said. The note is your words, so it's trusted, but it's still information, not instructions.

## How it runs

1. **Fill in** calls `POST /api/sessions/:id/debrief` with the stop (item, or the lead for an unplanned stop) and the note.
2. If one of the lead's photos is still being read (`businessCardScan` is `PENDING`), NestJS waits for it, checking every second for up to 20 seconds, so a card photographed a moment ago is included.
3. NestJS sends **pitchr-ai** `POST /visits/debrief`: today's date, the note, the lead (business name, industry, business type, pipeline stage), its contacts (id, name, title, decision-maker flag) and its three most recent touchpoints (so "came back as she asked" makes sense). The outcomes and provider types are the in-person ones from pitchr-server's enums, fixed in pitchr-ai.
4. One Claude call returns the outcome, provider type, come-back date and time, left materials, summary, the people mentioned (each a contact on file, a choice between contacts, or a new person, with their role, whether they decide and whether we spoke with them) and questions for anything unclear. Contact updates (a title, the decision-maker flag) come from the people on file. Code then checks the answer: a real date that isn't in the past, a real time, contact ids that were sent, and no two people as one contact.
5. NestJS gives pitchr-ai **30 seconds**: Fill in is used on a sidewalk, so it fails fast rather than leave you waiting. Then it saves the note and the proposal (with the model that wrote it) as a `VisitDebrief` and returns `{ debriefId, proposal }` to the form. **Nothing on the lead changes until you tap Log.**

**Log** goes through the existing `POST /api/sessions/:id/log` in one transaction, which now also accepts:

- several new contacts (`newContacts`, alongside the single `newContact`), each with `spokeWith`: false adds someone (the owner who wasn't in) without counting them as spoken to;
- contact updates for contacts on file (`contactUpdates`: a title and the decision-maker flag): an empty title is filled in, a different one becomes a **Replace / Keep** suggestion (the same value in a different case isn't), and the decision-maker flag is only ever turned on. Emails and phone numbers are never part of them;
- the debrief it came from (`debriefId`), linked to the touchpoint; it must be from this session and lead and not used yet;
- and links this visit's photos to the touchpoint: photos on the lead uploaded since the session started (or in the last 12 hours, for a session logged before it started) and not linked to a touchpoint yet. This happens on every in-person log, with or without a debrief.

If **Fill in** fails (no signal, pitchr-ai down), the note stays in the box with "Couldn't fill in the form. Try again or fill it in yourself."

## Model and cost

One Claude call per **Fill in**, on **Haiku 5.5** at effort `low` (`VISIT_DEBRIEF_MODEL` in pitchr-ai, default `claude-haiku-5-5`). It passed all 183 checks of the eval (17 notes, 5 of them from the owner's own visits) at about 0.1¢ a note, so Sonnet wasn't needed; it's one setting to change if real notes show otherwise. pitchr-ai returns the model with each proposal, and it's saved with the note, so models can be compared on real notes later.

## Checking how well it works

Made-up notes are enough to choose a model before launch, but only real notes show how it does with your dictation. So every **Fill in** is saved as a `VisitDebrief`:

- the note, exactly as dictated;
- what Claude proposed (the whole response) and the model;
- the touchpoint it ended up in, once you tap **Log** (empty if you never logged it).

Comparing the proposal with the logged touchpoint shows which fields you had to fix, per field and over time. That is the quality measure, and it's what a model or prompt change is judged by. A script prints it (`scripts/visit-debrief/report.ts --db dev|prod [--since YYYY-MM-DD] [--worst N]`; it only reads, so it's safe on prod): how many notes were filled in and logged, by model; how often each field was fixed; fields fixed per note on average and how many were logged exactly as proposed; and the notes with the most fixes, with the note and what changed.

A field counts as fixed when what was logged differs from the proposal:

- **Outcome**, **left materials**: different value.
- **Provider**: only for visits logged as "has a provider".
- **Come back**: a different day; the time only when the proposal gave one (otherwise the form's default time isn't a change). Days and times are in the team's time zone.
- **Who we spoke with**: a different set of people, by first name, ignoring accents and case.
- **Summary**: under 90% of the proposed words kept, with words added counting against it, so a light touch-up isn't a fix but a rewrite is. With the owner's OK, real debriefs that went wrong become eval cases, with the logged touchpoint as the expected answer.

The note is your own words about the visit, the same kind of thing the summary already holds, and it's kept like any other lead data.

## Data

`VisitDebrief`: note, proposal (JSON), model, session, lead, user, touchpoint (set on **Log**), created at.

## Later

- The same box on the lead page's **Log touchpoint** form, for visits logged outside a session.
- Calls: the same idea for call notes.
- Follow-up tasks from what was said ("she asked us to send examples").
