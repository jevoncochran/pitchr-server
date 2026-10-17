# Visit debrief

**Status:** Draft. Build plan: [visit-debrief-build-plan.md](visit-debrief-build-plan.md).

Logging a visit means tapping through outcome, contacts, provider, come-back date and materials, then typing a summary, standing on a sidewalk between stops. It gets skipped or done thinly, and everything downstream (the [lead snapshot](https://github.com/jevoncochran/pitchr-ai/blob/HEAD/docs/lead-snapshot.md), follow-up emails, the next visit) is only as good as what was logged. With a debrief, you say what happened in a few sentences and the visit form fills itself in for you to check and save.

It builds on [business card scan](business-card-scan.md): by the time you debrief, any card you photographed is already a contact, so the debrief only has to match the people you mention.

## What you see

On the active session screen, the in-person visit form gets a **What happened?** box at the top and a **Fill in** button.

1. Tap the box and use the iPhone keyboard's mic: "Spoke with Jen at the front desk. Owner is Maria, she's in on Thursdays. They use an agency for social but nothing for video. Left a card. Come back next Thursday."
2. Tap **Fill in**. A few seconds later the form below is filled in, and each filled field is highlighted:
   - **Outcome:** Decision-maker not available
   - **Spoke with:** Jen (new contact: front desk); Maria López is on file and isn't ticked, since you didn't speak to her
   - **Contact updates:** none here; "Maria is the owner" would have turned on her decision-maker flag if it wasn't set
   - **Provider:** Marketing agency
   - **Come back:** Thursday 10/22
   - **Left materials:** yes
   - **Summary:** a cleaned-up version of what you said
3. Anything Claude wasn't sure of shows as a note above the form ("Two contacts named Maria: which one?" or "Couldn't tell if Jen is a manager").
4. Check, change anything, and tap **Log** as today.

You can always skip the box and fill in the form by hand, or edit the note and tap **Fill in** again (it replaces what it filled before, not what you changed by hand).

The keyboard mic is used because it's free and reliable on iPhone, and Safari's built-in speech recognition isn't. A one-tap record button with server-side transcription can come later if the extra tap matters.

## Rules

**Contacts, in this order:**

1. **People on file.** "Maria", "the owner" or "the manager" matches an existing contact by name, then title or decision-maker flag. Matched people are ticked as spoken to only if you spoke to them; being mentioned isn't enough.
2. **New people.** Anyone you spoke to or named who isn't on file becomes a proposed new contact (first name, last name if said, title or role if said). Cards don't need handling here: business card scan already made them contacts.
3. **Not sure.** Two possible matches, or a role with nobody on file ("talked to the manager"): nothing is guessed; the form asks.

**Contact updates** from what you said (a title, "she's the owner") follow business card scan's rule: empty fields are filled in, a different existing value is shown as a suggestion and never overwritten. Emails and phone numbers are **never** taken from a voice note: spoken emails are too easy to mishear, and the card is the source for those.

**Outcome** is one of the in-person outcomes the form offers. "Come back later today" works as today: the form's **Add back to today's route** option is left for you to choose.

**Dates** ("next Thursday", "after the 15th", "in January") are worked out from today's date in the team's time zone. A vague time ("in a couple of weeks") gives no date, and the summary keeps the words.

**Summary:** first person plural ("we spoke with Jen"), like the rest of the app. It keeps every fact you said (names, roles, objections, timing, promises) and only fixes dictation mistakes and filler. Nothing is added. It's what goes into the touchpoint, and what the snapshot and follow-up emails read later.

**Accuracy:** only what's in the note. Nothing about anyone's appearance, age or other personal traits, even if said. The note is your words, so it's trusted, but it's still information, not instructions.

## How it runs

1. **Fill in** calls `POST /api/sessions/:id/debrief` with the stop (item, or the lead for an unplanned stop) and the note.
2. If one of the lead's photos is still being read (`businessCardScan` is `PENDING`), NestJS waits for it, up to 20 seconds, so a card photographed a moment ago is included.
3. NestJS sends **pitchr-ai** `POST /visits/debrief`: today's date, the note, the lead (business name, industry, pipeline stage, sequence step), its contacts (id, name, title, decision-maker flag) and its three most recent touchpoint summaries (so "came back as she asked" makes sense), plus the allowed outcomes and provider types.
4. One Claude call returns the outcome, provider type, come-back date, left materials, summary, contacts spoken to (existing ids or new people), contact updates, and notes on anything uncertain.
5. NestJS saves the note and the proposal as a `VisitDebrief` and returns the proposal to the form. **Nothing on the lead changes until you tap Log.**

**Log** goes through the existing `POST /api/sessions/:id/log` in one transaction, which now also accepts:

- several new contacts (`newContacts`, replacing the single `newContact`);
- contact updates (fill-in fields and decision-maker flags);
- the debrief it came from, so the `VisitDebrief` is linked to the touchpoint;
- and links this visit's photos to the touchpoint: photos on the lead uploaded since the session started and not linked to a touchpoint yet. This happens on every in-person log, with or without a debrief.

If **Fill in** fails (no signal, pitchr-ai down), the note stays in the box with "Couldn't fill in the form. Try again or fill it in yourself."

## Model and cost

One Claude call per **Fill in**. The model is chosen with an eval of realistic notes during the build (only with the owner's OK); this is extraction, so a smaller model may be enough.

## Checking how well it works

Made-up notes are enough to choose a model before launch, but only real notes show how it does with your dictation. So every **Fill in** is saved as a `VisitDebrief`:

- the note, exactly as dictated;
- what Claude proposed (the whole response) and the model;
- the touchpoint it ended up in, once you tap **Log** (empty if you never logged it).

Comparing the proposal with the logged touchpoint shows which fields you had to fix, per field and over time. That is the quality measure, and it's what a model or prompt change is judged by. A script prints it (`scripts/visit-debrief/report.ts`: fields fixed per debrief, the most-fixed fields, and the debriefs with the most fixes). With the owner's OK, real debriefs that went wrong become eval cases, with the logged touchpoint as the expected answer.

The note is your own words about the visit, the same kind of thing the summary already holds, and it's kept like any other lead data.

## Data

`VisitDebrief`: note, proposal (JSON), model, session, lead, user, touchpoint (set on **Log**), created at.

## Later

- The same box on the lead page's **Log touchpoint** form, for visits logged outside a session.
- Calls: the same idea for call notes.
- Follow-up tasks from what was said ("she asked us to send examples").
