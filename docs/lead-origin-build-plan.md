# Lead origin: build plan

How the "How this lead started" field gets built. The feature is described in [lead-origin.md](lead-origin.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Look at existing data and agree on the conversion (no code)
A read-only look at dev (10/14/26): `discoveredVia` was empty on all 195 leads; `source` was Outreach on 165, empty on 19, Networking on 7, In person on 3 and Referral on 1. Since "Outreach" mixed visits and DMs, the first touchpoint decides those. The options and the conversion table in the spec were approved after two rounds: no "cold" prefix, "In-person visit" (not "walked in"), "Approached us" for people who come up to us in public, and leads without a reliable record (never contacted, or the first contact wasn't logged) stay empty.

### ✅ Step 2: Schema and migration (pitchr-server)
**Files:** `prisma/schema.prisma`, migration `20261016000000_add_lead_origin`, `scripts/import-ghl-leads.ts`

- `LeadOrigin` enum and `Lead.origin`; `discoveredViaOther` renamed to `originOther`.
- The migration converts every lead with the spec's rules (first touchpoint by date), clears `originOther` unless the origin is Other, then drops `source`, `discoveredVia` and their enums.
- Checked by running the whole migration on dev inside a transaction and rolling it back: 75 DM, 65 in-person visit, 12 email, 7 networking event, 3 approached us, 2 text, 1 referral, 30 empty, exactly the approved table.
- The old GoHighLevel import script no longer sets `source` / `discoveredVia`; leads it imports start with no origin.

### ✅ Step 3: Server logic (pitchr-server)
**Files:** `src/leads/lead-origin.ts` (+ `.spec.ts`, new), `leads.service.ts`, `lead-snapshot.service.ts`, `src/touchpoints/touchpoint-logging.service.ts` (+ tests), `src/sessions/session-logging.service.ts` (+ tests)

- `lead-origin.ts`: `ORIGIN_GROUP`, `fillOriginOnFirstContact()` (touchpoint type → origin), `originFields()` (validates the origin; keeps `originOther` only with Other) and `parseOrigin()`.
- `TouchpointLoggingService.logWithin()` fills the origin in on a lead's very first touchpoint, so the lead page and sessions share it. Leads that already have touchpoints, or an origin, are never changed.
- Creating and updating leads go through `originFields()`; an update only touches the origin when `origin` is sent.
- Session quick-add takes an optional `origin` (and `originOther`) instead of `source`; left empty, the item's touchpoint fills it in.
- The snapshot request sends `origin` (Other's description for Other) and `originGroup`.
- 7 new Jest tests (94 total).

### ✅ Step 4: Snapshot input (pitchr-ai)
**Files:** `app/features/lead_snapshot/schemas.py`, `prompt.py`, `tests/lead_snapshot/test_prompt.py`, the eval cases, `docs/lead-snapshot.md`

`LeadInfo` takes `origin` and `origin_group` instead of `source` and `discovered_via`; the prompt shows one line, e.g. "How this lead started: DM (we reached out)". The six eval cases use the new fields (origins from their first touchpoints). The eval wasn't rerun: it needs the owner's go-ahead. 31 tests.

### ✅ Step 5: Screens (pitchr-client)
**Files:** `src/constants/origins.ts`, `src/components/leads/OriginSelect.tsx` (+ test) (new), `LeadDetailPage.tsx`, `useLeadDetail.ts`, `AddLeadPage.tsx`, `AddToSessionDialog.tsx`, `PipelinePage.tsx`, `AnalyticsPage.tsx`, `types.d.ts`

- `OriginSelect`: the origins grouped under **We reached out** / **They came to us**, with a description box for Other. Used on the lead page ("How This Lead Started", shown as e.g. "DM · we reached out" or "Not known yet"), add lead (optional, "filled in on first contact") and session quick-add ("Fill in from what I log").
- Pipeline cards show the origin's label.
- Analytics: **Inbound vs Outbound** uses the groups, with a count of leads that have no origin; **Conversion by How Leads Started** lists each origin that has leads, plus "Not recorded".
- 4 new client tests (44 total).

### ⏭️ Step 6: Apply
Apply the migration to dev, check the lead page, add lead, a session quick-add and analytics in the app, then deploy so it converts prod.
