# Lead origin

**Status:** Built (October 2026). Build plan: [lead-origin-build-plan.md](lead-origin-build-plan.md).

One field, `origin` (**Lead origin** on screen), says how each lead started: whether we reached out to them (and how), or they came to us (and how). It replaces two fields, `source` (how we got the lead) and `discoveredVia` (how they heard about us). Their options overlapped (both had Outreach, Referral, Networking, In person) and confused even the owner.

The origin is what analytics like "do inbound leads convert faster?" group by, so it comes before V2 analytics.

## Options

| Group | Origin | Means |
| --- | --- | --- |
| **We reached out** | In-person visit | We visited the business |
| | DM | We sent them a DM |
| | Email | We emailed them |
| | Text | We texted them |
| | Call | We called them |
| | Networking event | We met at a networking event (chamber, PIN meeting...) |
| **They came to us** | Approached us | Someone came up to us in person, e.g. in public or at their business while we were there as customers |
| | Website form | They filled out the form on our website |
| | Referral | Someone referred them (who goes in **Referred by**) |
| | Instagram · Facebook · TikTok · YouTube · Google | They found us there |
| | Other | Anything else, with a short description (`originOther`) |

The group isn't stored: it follows from the origin (`ORIGIN_GROUP` on the server, `ORIGINS` in the client).

## Only set by hand

The origin is only ever what someone entered: on the lead page, when adding a lead, or when quick-adding one in a session. It's never worked out from touchpoints. Logged touchpoints can be wrong (e.g. an AI import that turned "reach the owner by email" in a visit's notes into an email touchpoint) or missing (the real first contact was never logged), and the app can't tell either case apart from a real first contact.

A lead can have no origin: leads we haven't contacted yet (for example an imported list) stay empty until someone sets it.

## Converting existing leads

Existing leads keep what was explicitly entered in `source` / `discoveredVia`. `discoveredVia` was never filled in, and "Outreach" didn't say how we reached out, so everything else becomes **In-person visit**, since most leads started that way. Leads that were wrong can be changed on the lead page.

| Old | Becomes |
| --- | --- |
| Networking | Networking event |
| Referral | Referral |
| In person | Approached us (people who came up to us) |
| Form | The social platform or Other from `discoveredVia` if set, otherwise Website form |
| Outreach or empty, with touchpoints | In-person visit |
| Outreach or empty, never contacted | Empty |

In prod after the conversion (10/14/26, 196 leads): 150 in-person visits, 7 networking events, 3 approached us, 1 referral and 35 empty (never contacted).

This takes two migrations: `20261016000000_add_lead_origin` first guessed from each lead's first touchpoint; `20261016010000_lead_origin_explicit_only` replaces those guesses with In-person visit (see the build plan).

## Where it shows

- **Lead page:** **Lead Origin**, shown as the group then the origin, e.g. "We reached out · In-person visit", or "Not known yet". Editing shows the options grouped; "Other" asks for a short description.
- **Add lead:** the same picker, optional ("Not known yet").
- **Session quick-add:** the same picker, preselected from the session's channel (in-person and mixed → In-person visit, calls → Call, DMs → DM, emails → Email, texts → Text), changeable before adding.
- **Pipeline cards:** the origin's label.
- **Analytics:** "We reached out vs. they came to us" and conversion by origin. Leads without an origin are counted as "Not recorded".
- **Lead snapshot:** pitchr-ai gets the origin and its group ("How this lead started: DM (we reached out)").

## Data

- `Lead.origin` (`LeadOrigin` enum, optional) and `Lead.originOther` (text, only with Other; the old `discoveredViaOther` column, renamed).
- `source`, `discoveredVia`, and the `LeadSource` and `DiscoveredVia` enums are removed. Contacts' **How we met** (`ContactSource`) is a separate field and is unchanged.
