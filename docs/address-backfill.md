# Lead addresses from Google

**Status:** Building. Build plan: [address-backfill-build-plan.md](address-backfill-build-plan.md).

Most leads had no address (162 of 195 in prod on 10/14/26, 150 of them active), so **Navigate** on a session rarely worked. Two parts fix that:

1. **A one-time backfill** looks each of those businesses up on Google Places, has a person review the matches, and saves the approved ones.
2. **No new gaps:** adding a lead (and quick-adding one in a session) can search Google for the business and fill its address in.

## The backfill (one-time, scripts in `scripts/address-backfill/`)

**Lookup** (`lookup.ts`, reads the database only): for every lead with no location, one Google **Text Search (New)** for the business name, biased to 50 km around Tampa, asking for the address, coordinates, phone, website, business status and Maps link. Each lead's best result is sorted into:

- **Confident:** the name matches, it's within about 80 km of Tampa (Tampa Bay, including Wesley Chapel, Brandon, Clearwater, Lakeland), it's operating, and the address is complete. Also confident: its website is the same as the one on our lead, wherever it is (some leads are Orlando businesses on purpose).
- **Check:** the name only partly matches, it's outside Tampa Bay, several Tampa Bay locations share the name, Google says it's closed, or the address is incomplete.
- **Not found:** no results, or the closest result's name doesn't match. The closest result is still kept, so a right one can be approved.

Names are compared word by word, ignoring filler (LLC, Inc, "the", "Prospect", which prefixes some imported leads), punctuation and spacing ("GAV PRO" = "GAVPRO"). Websites lose tracking tags (`?utm_source=...`).

It writes `output/lookup-<db>-<time>.json` (all the data) and a CSV. `output/` is gitignored: it holds real business data.

**Review:** a CSV with an **approve** column (yes / no), prefilled **yes** for confident matches. People change it, especially for the "check" and "not found" rows.

**Save** (`save.ts`, dry run unless `--apply`): every approved row, in **one transaction** (all or nothing):

- a new **primary location**: address, `latitude`, `longitude`, `googlePlaceId`
- Google's phone on that location (labeled Office), when there is one
- Google's website on the lead, only when the lead has none

Leads that got an address since the lookup are skipped. Rows without a complete address can't be saved.

**Where it runs:** prod. Dev is a Neon branch of prod, so afterwards dev is reset from prod (Neon's "Reset from parent"), which also brings dev's lead origins in line.

## No new gaps

Planned: on **Add lead** and **session quick-add**, a "Find on Google" search (the browser's Places Autocomplete, limited to businesses near Tampa) that fills in the business's address (and its phone and website when empty), saved as the primary location with coordinates.

## Data

- `Location.latitude`, `Location.longitude` (optional): for Navigate and, in V1.5, the map and route order.
- `Location.googlePlaceId` (optional): which Google place it came from.

## Keys and cost

- The scripts use the server key `GOOGLE_API_KEY` (pitchr-server `.env`, restricted to Places API (New)). The browser uses its own key (`VITE_GOOGLE_PLACES_API_KEY`), which should be restricted to the app's websites.
- Asking for phone and website puts each search in Google's Enterprise tier. The backfill used 162 searches, within Google's free monthly allowance at the time.
