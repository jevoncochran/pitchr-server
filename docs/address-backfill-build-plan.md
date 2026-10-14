# Lead addresses from Google: build plan

How filling in lead addresses gets built. The feature is described in [address-backfill.md](address-backfill.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Keys and counts
- A separate server key, `GOOGLE_API_KEY`, created for pitchr-server (the browser key had been shared with the server and was unrestricted; restricting it is still to do).
- Prod recount (10/14/26): 162 of 195 leads without an address (150 active), 152 without a website.

### ✅ Step 2: Lookup and review
**Files:** `scripts/address-backfill/lookup.ts`, `.gitignore` (`scripts/address-backfill/output/`)

- A 10-lead test first, then the other 152 (`--merge` skips leads already looked up): 162 searches in all, reading prod.
- First results: 95 confident, 55 check, 12 not found. The rules were too cautious, so they were revised for future runs: a matching website wins over distance, only several *Tampa Bay* locations count as ambiguous, "Prospect" and spacing are ignored in names, and "not found" keeps the closest result.
- Rather than repeat 162 paid searches, the review file (`output/review-prod-<time>.csv`) has a **suggestion** column with a hand review of the 55 "check" rows: 40 likely right (approve prefilled yes), 2 wrong (VM Construction in London, Everlast Roofing in Pennsylvania), 13 unsure.

### ✅ Step 3: Owner review
Reviewed in Google Sheets and saved back over the review CSV. 142 approved (95 confident, 47 check), 20 skipped (8 check, all 12 not found). The save script now ignores a byte-order mark, which spreadsheet exports can add.

### ✅ Step 4: Save script and schema
**Files:** `scripts/address-backfill/save.ts`, `prisma/schema.prisma`, migration `20261016020000_add_location_coordinates`

- `Location.latitude`, `longitude`, `googlePlaceId`.
- `save.ts`: dry run by default; `--apply` saves every approved row in one transaction (primary location with coordinates and place ID, phone, website only where missing), skipping leads that got an address since.
- Dry run on prod with the reviewed file: 142 addresses (139 with a phone) and 112 websites.

### ⏭️ Step 5: Deploy, save, sync dev
1. Deploy pitchr-server so prod gets its pending migrations (stage history, sessions, lead origin, coordinates).
2. `save.ts --db prod --apply` with the reviewed file.
3. Reset dev from prod in Neon ("Reset from parent").

### ⬜ Step 6: No new gaps
"Find on Google" on add lead and session quick-add fills in the address, phone and website.
