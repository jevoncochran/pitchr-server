# How this lead started (lead origin)

**Status:** Building. Build plan: [lead-origin-build-plan.md](lead-origin-build-plan.md).

One field, `origin`, says how each lead started: whether we reached out to them (and how), or they came to us (and how). It replaces two fields, `source` (how we got the lead) and `discoveredVia` (how they heard about us). Their options overlapped (both had Outreach, Referral, Networking, In person) and confused even the owner.

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

## Empty until known

A lead can have no origin. That's normal for leads we haven't contacted yet (for example an imported list), and for older leads whose first contact wasn't recorded. Guessing would put wrong numbers into analytics, so leads stay empty until someone knows.

- **Filled in automatically on first contact:** logging a touchpoint on a lead with no origin **and no touchpoints at all** sets the origin from that touchpoint: visit or visit attempt → In-person visit, Instagram DM → DM, email → Email, text → Text, call → Call, networking → Networking event, walk-up → Approached us, referral outreach → Referral. Meetings and "other" touchpoints don't set it. A lead that already has touchpoints is never filled in this way, because its first logged touchpoint may not be how it really started.
- **Set by hand** anytime on the lead page, when adding a lead, or when quick-adding one in a session (where it can be left to fill itself in from what's logged).

## Converting existing leads

`discoveredVia` was never filled in, so existing leads are converted from `source`, using the first touchpoint where `source` doesn't say how. The migration applies these rules, so it gives the same result wherever it runs:

| Old | First touchpoint | Becomes |
| --- | --- | --- |
| Networking | | Networking event |
| Referral | | Referral |
| In person | | Approached us (people who came up to us) |
| Form | | The social platform or Other from `discoveredVia` if set, otherwise Website form |
| Outreach or empty | Visit or visit attempt | In-person visit |
| Outreach or empty | Instagram DM · email · text · call | DM · Email · Text · Call |
| Outreach or empty | Anything else, or none | Empty |

On dev (10/14/26) that's 65 in-person visits, 75 DMs, 12 emails, 2 texts, 7 networking events, 1 referral, 3 approached us and 30 empty (29 never contacted, plus Modern Medical Aesthetics, whose first visit wasn't logged; it can be set by hand).

## Where it shows

- **Lead page:** "How this lead started", with the options grouped. "Other" asks for a short description.
- **Add lead:** the same picker, optional.
- **Session quick-add:** the same picker, defaulting to "Fill in from what I log".
- **Pipeline cards:** the origin's label.
- **Analytics:** "We reached out vs. they came to us" and conversion by origin. Leads without an origin are counted as "Not recorded".
- **Lead snapshot:** pitchr-ai gets the origin and its group ("How this lead started: DM (we reached out)").

## Data

- `Lead.origin` (`LeadOrigin` enum, optional) and `Lead.originOther` (text, only with Other; the old `discoveredViaOther` column, renamed).
- `source`, `discoveredVia`, and the `LeadSource` and `DiscoveredVia` enums are removed. Contacts' **How we met** (`ContactSource`) is a separate field and is unchanged.
