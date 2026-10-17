# Business card scan

**Status:** Building. Build plan: [business-card-scan-build-plan.md](business-card-scan-build-plan.md).

Most in-person visits end with a gatekeeper and a business card for the person we actually need. Cards are already photographed and uploaded to leads, but nothing reads them, so the decision-maker's name and email stay in a photo. Business card scan reads every photo uploaded to a lead, and when it's a business card, turns it into a contact: a new one if the person isn't on file, or filled-in details if they are. It doesn't matter whether the person came up in the visit.

It works anywhere, not only in sessions: on an existing lead's page, on the current stop of a session, and on **Add Lead**, where a business card from a chance meeting can start a new lead (see [New lead from a business card](#new-lead-from-a-business-card)).

At a visit, the front desk often hands over several business cards for the same business (the owner, the marketing coordinator, an aesthetician), and two-sided cards often share a back with the business details. So one upload can be **up to 6 photos**: up to 3 people's sides plus the back they share, photographed once. Claude reads them together, sorts them into people and the shared business side, and checks they're all for the same business (see [Several business cards at once](#several-business-cards-at-once)).

It feeds the [visit debrief](visit-debrief.md), which matches people in a voice note against the lead's contacts, and later the follow-up emails, which need the decision-maker's email.

## What you see

- **Uploading a photo** works as today on the lead page (one at a time), plus an **Add business cards** button on the current stop of an in-person session: take a photo, or pick up to 6 from the library. It shows that lead's photos from today.
- While the photos are read (a few seconds), each shows **Reading business card…**. Then each says:
  - **A person's business card:** "Business card · Maria López", naming the contact it added or filled in. That contact's page shows the photo, and the session's visit form lists the new contact.
  - **A side with only the business on it** (often the shared back): "Business card · business details". It stays on the lead.
  - **For another business:** "Business card for **Bright Smile Dental**, not this lead" with **Add anyway** and **Remove**. No contact is made until you choose.
  - **Not a business card:** nothing; it's an ordinary photo.
  - **Couldn't read it:** "Couldn't read this business card", with **Try again** (the photos uploaded with it are read again together).
- **On a contact**, details the card disagrees with show as **Business card says maria@lopezmedspa.com · Replace · Keep**.

## New lead from a business card

Meeting a business owner by chance (they need a videographer and hand over a card) shouldn't mean typing the card in later. **Add Lead** works as before, with a shortcut at the top of the form: **Fill in from business card**.

- Tapping it opens the phone's photo choices (take a photo, or pick up to 6 already taken); on a computer, a file picker. The form shows **Reading business cards…** for a few seconds; you can keep typing meanwhile.
- When they're read:
  - **The business** fills in from what the business cards share: business name, website, business email (an info@-style address), Instagram and the address, each tagged **From business card**.
  - **Contacts:** one entry per person's business card (first and last name, title, email, phone, decision-maker), each removable, plus **+ Add contact** for anyone typed in.
  - **Industry and business type** are suggested from the existing lists, for you to confirm; a suggestion is never made up. Both are optional: when the business cards don't fit any (a social hall when the lists are med spas and roofers), the lead can be saved without them, and the lead page shows **No industry yet · Add** until they're set. The leads list has a **Needs industry/type** filter.
  - Thumbnails of the photos sit next to the button, to check what was read.
- **Add the back or another card** then stays available (until 6 photos): the new photos are read again together with the earlier ones. When no business name was found, it's highlighted with "No business name found. Is it on the back?". Reading again fills empty fields and refreshes fields filled from business cards that you haven't edited; anything you typed or edited is never overwritten, and an edited contact is kept as is.
- **A business card for another business** (not the one most of them share) shows in Contacts as "Business card for **Bright Smile Dental**, not Lopez Med Spa. Not added." with **Add anyway**. It isn't saved with the lead unless you choose that.
- **Already a lead?** If the business matches one in Pitchr (same website, an email at the same domain, the same phone, or the same name), the form says "Lopez Med Spa is already a lead" with **Add this business card there** (it's added to that lead and read against its contacts, as on the lead page) or **Keep creating a new lead**.
- **Couldn't read it:** "Couldn't read this business card. Try again or fill in the form yourself." Nothing typed is lost.
- **Origin** is still yours to pick; a business card never sets it.
- A **How we met** box ("Met at a coffee shop, said they need a videographer") is saved as each new contact's how-we-met note and as a note on the lead (on the contact too when there's only one), so the snapshot sees it.
- **Save** creates the lead, its address (looked up for coordinates, so it can go on a route), the contacts and the business card photos in one step: each person's photos linked to their contact, a shared back to the lead only. Photos of a business card left out (another business, or removed) aren't kept with the lead.

The **Address** and **Contacts** sections are on the form whether or not a business card is used; the address uses the Google address search, like the lead page.

## Several business cards at once

One upload is up to 6 photos of one business's business cards: usually up to 3 people's sides and one back they share. Claude reads them in one call and:

- **Sorts the photos.** A side with a person on it is that person's business card, one contact. A side with only the business on it (name, logo, website, address, main number) is shared: its details apply to the lead and everyone, never to one person. A person's own back (with their direct number, say) is paired with their front only when it's clearly the same card. A photo that isn't a business card is set aside. Each photo is used once; a photo Claude leaves out, or a person with no readable name, counts as a business-only side, so it's still kept with the lead.
- **Reads each person and the business**, with the same rules as one card.
- **Checks they're for the same business:** the lead's business, or for a new lead, the one most of them share. Small differences are the same business ("Lopez Med Spa" and "Lopez Aesthetics & Med Spa"). A card that clearly names another business is held (`OTHER_BUSINESS`) for **Add anyway** or **Remove**; a card that names no business is taken as this one's.
- **Never makes two people the same contact.** If two cards would match one contact, the second asks **Whose business card is this?**.

More than 6 photos is refused before anything is uploaded ("Up to 6 photos at a time").

## Rules

**Which photos:** images (`image/*`) uploaded to a lead. Photos uploaded on a contact's page aren't read. Each photo is read **once**, with the photos uploaded alongside it; its scan status records that. PDFs and videos are never read.

**Matching:** Claude gets the lead's contacts and says which one the card belongs to, or none. Matching uses the name first (accents, nicknames and a missing last name are fine: "Maria" on file matches "María López" on the card) and the title or email to break ties. When it can't tell between two contacts, it creates nothing and the photo shows **Whose business card is this?** with the candidates and **New contact**.

**A new person** is created on the lead with everything the card has: first and last name, title, email, phone. `howWeMet` is `IN_PERSON`. `isDecisionMaker` is set when the title is clearly the top decision-maker (owner, co-owner, founder, president, CEO, managing partner, practice owner, general manager of a single location); otherwise it's left off. The card photo is linked to the contact.

**An existing person:**

- Empty fields are filled in from the card automatically.
- A field that already has a **different** value is never overwritten. It becomes a suggestion on the contact (**Replace / Keep**). A misread card shouldn't erase a good email.
- The same value in a different format (capitalization, phone formatting) counts as the same and isn't suggested.
- `isDecisionMaker` is only ever turned on, never off.

**What's read from a business card:** name, title, email, phone, website, and for a new lead also the business name, a general business email, the Instagram handle, the address in parts, and suggested industry and business type. With several phones, the direct or cell number wins over the main line. The website fills in the **lead's** website when it's empty; a different existing website is left as is. Address and social handles are kept with the scan result but not copied anywhere in v1.

**Not a business card:** a storefront, a flyer, a menu. Marked as read and left alone. A card for the business itself with no person on it (just "Lopez Med Spa, info@…") creates no contact.

**Accuracy:** only what's printed on the card. Claude never guesses a missing last name or builds an email from a name and a domain. Text on a card is information, never instructions.

## How it runs

**New lead** (Add Lead): `POST /api/business-cards/read` stores the new photos (not yet on any lead) and reads them straight away, while you wait, together with any photos read earlier for the same form (`attachmentIds`, for **Add the back or another card**), with the industry and business type lists instead of contacts. It answers with every photo so far, the reading and any likely duplicate leads; if reading fails, the new photos aren't kept. Saving the form (`POST /api/leads` with the address, `contacts` (each with its photos), the how-we-met note and `businessCardAttachmentIds`) creates everything in one transaction and marks the photos `BUSINESS_CARD`. **Add this business card there** (`POST /api/business-cards/add-to-lead` with the photo ids) puts the photos on that lead and reads them again together in the background, this time against the lead's contacts. Photos read for a form that was never saved stay unattached; a cleanup can come later.

**Existing lead** (lead page, sessions):

1. `POST /api/attachments` (one photo, the lead page) or `POST /api/attachments/business-cards` (up to 6, the run screen) saves the photos with scan status `PENDING` and one `businessCardBatchId`, and returns right away.
2. In the background, NestJS shrinks a copy of each (longest side 1568 px, JPEG; the originals in R2 are unchanged) and sends them to **pitchr-ai** `POST /business-cards/scan` with the lead's business name and contacts (id, name, title, email, phone, decision-maker flag).
3. pitchr-ai makes **one Claude call** with the photos, labeled Photo 1, Photo 2…, and returns the business, each person (their photos, what their card says, whether it's the same business, which contact they match: id, new, or ambiguous with candidates), the business-only photos and the photos that aren't business cards.
4. NestJS applies the rules above in one transaction and sets each photo's status: `BUSINESS_CARD`, `NOT_BUSINESS_CARD`, `NEEDS_MATCH`, `OTHER_BUSINESS` or `FAILED`. Each photo keeps what was read for it: its role, its person and the business.
5. The client checks the lead's photos every 2.5 seconds while any are `PENDING` and reloads the contacts when they finish.

**Whose business card is this?** (`POST /api/attachments/:id/business-card-scan/match`), **Add anyway** (`…/add-anyway`) and **Remove** (`DELETE /api/attachments/:id/business-card`) act on all of that person's photos and use what was already read, with no second Claude call.

A scan interrupted by a restart stays `PENDING`; anything still `PENDING` after 5 minutes is treated as `FAILED` and can be retried. Scanning failing never blocks the upload: the photo is always saved.

## iPhone photos (HEIC)

iPhones often upload photos as HEIC, which `sharp`'s standard build can't decode and most browsers other than Safari can't show. Every uploaded photo that is HEIC (recognized by its content, whatever it's labeled) is converted to JPEG before it's stored: decoded with `heic-decode` (pure JavaScript), encoded with `sharp`. A 12-megapixel photo takes about 1.5 seconds and up to about 270 MB of memory while converting. If a lead or contact photo can't be converted, the original is kept; for **Fill in from business card**, the photo is refused with "Couldn't open this photo".

## Data

- `Attachment.businessCardScan` (`BusinessCardScanStatus`: `PENDING`, `BUSINESS_CARD`, `NOT_BUSINESS_CARD`, `NEEDS_MATCH`, `OTHER_BUSINESS`, `FAILED`; null for files that are never read), `Attachment.businessCardScannedAt`, `Attachment.businessCardData` (JSON: the photo's role (a person's card, the business, not a business card), its person and the business, including fields not copied anywhere), `Attachment.businessCardBatchId` (photos uploaded and read together).
- `ContactChangeSuggestion`: contact, field, current value, card value, the photo it came from. Deleted once you Replace or Keep.
- A card photo stays on the lead and also gets `contactId` set to the contact it created or updated.

## Existing photos

The 16 photos already uploaded (all on leads, all JPEG) are read once by a script, `scripts/business-card-scan/backfill.ts`: `--read` reads them and lists what each would create or update without saving anything, then `--apply` saves those readings (no second Claude call). Dev first; prod only with the owner's sign-off after a `--read` against prod.

## Model and cost

One Claude call per upload (up to 6 photos read together), at effort `low`; photos that turn out not to be business cards count too. A shrunk photo is about 2,000 input tokens, so it's roughly 1¢ per photo on Sonnet 5.5: three people's business cards with a shared back (4 photos) is about 4¢. **Add the back or another card** reads the earlier photos again with the new ones, so they're paid for again. On Haiku 5.5 it would be a small fraction of that (an estimate from the per-token prices, to be checked in the eval). The model is set by `BUSINESS_CARD_SCAN_MODEL` in pitchr-ai; until the eval of real cards picks one (run only with the owner's OK), it's Sonnet 5.5, like the snapshot. Haiku has no server-side refusal fallback, so the helper sends it without one.

## Checking how well it works

Everything a scan read is kept in `businessCardData`, and Replace/Keep choices are kept on the suggestion until it's resolved. Comparing `businessCardData` with the contact later (a name or title fixed by hand, a contact deleted) shows where reading went wrong. With the owner's OK, real cards that went wrong become eval cases.
