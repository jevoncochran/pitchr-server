# Lead origin: build plan

How the lead origin field gets built. The feature is described in [lead-origin.md](lead-origin.md).

**Status:** ✅ Complete (10/14/26). ✅ done · ⏭️ next · ⬜ not started

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

- `lead-origin.ts`: `ORIGIN_GROUP`, `originFields()` (validates the origin; keeps `originOther` only with Other) and `parseOrigin()`.
- First built with an automatic fill-in from a lead's first touchpoint; removed in step 6.
- Creating and updating leads go through `originFields()`; an update only touches the origin when `origin` is sent.
- Session quick-add takes an optional `origin` (and `originOther`) instead of `source`.
- The snapshot request sends `origin` (Other's description for Other) and `originGroup`.
- Jest tests for `originFields()` and quick-add (91 total after step 6).

### ✅ Step 4: Snapshot input (pitchr-ai)
**Files:** `app/features/lead_snapshot/schemas.py`, `prompt.py`, `tests/lead_snapshot/test_prompt.py`, the eval cases, `docs/lead-snapshot.md`

`LeadInfo` takes `origin` and `origin_group` instead of `source` and `discovered_via`; the prompt shows one line, e.g. "How this lead started: DM (we reached out)". The six eval cases use the new fields (origins from their first touchpoints). The eval wasn't rerun: it needs the owner's go-ahead. 31 tests.

### ✅ Step 5: Screens (pitchr-client)
**Files:** `src/constants/origins.ts`, `src/components/leads/OriginSelect.tsx` (+ test) (new), `LeadDetailPage.tsx`, `useLeadDetail.ts`, `AddLeadPage.tsx`, `AddToSessionDialog.tsx`, `PipelinePage.tsx`, `AnalyticsPage.tsx`, `types.d.ts`

- `OriginSelect`: the origins grouped under **We reached out** / **They came to us**, with a description box for Other. Used on the lead page ("How This Lead Started", shown as e.g. "DM · we reached out" or "Not known yet"), add lead (optional) and session quick-add (preselected from the session's channel, step 6).
- Pipeline cards show the origin's label.
- Analytics: **Inbound vs Outbound** uses the groups, with a count of leads that have no origin; **Conversion by How Leads Started** lists each origin that has leads, plus "Not recorded".
- 4 new client tests (44 total).

### ✅ Step 6: Origin only from what was entered (revised after review)
**Files:** migration `20261016010000_lead_origin_explicit_only`, `src/leads/lead-origin.ts`, `src/touchpoints/touchpoint-logging.service.ts` (+ tests), `src/sessions/session-logging.service.ts` (+ tests) (pitchr-server); `src/constants/origins.ts`, `AddToSessionDialog.tsx`, `RunSessionPage.tsx`, `AddLeadPage.tsx` (pitchr-client)

After the first migration ran on dev, AR Aesthetics showed the problem with using touchpoints: an AI import had turned "reach the owner by email" in a visit's notes into a first email touchpoint, so it got Email. Fixing the touchpoint didn't fix the origin, and the app can't tell a wrong or missing first touchpoint from a real one. Ronnie Dean's, Little Greek and CDB Injury Law also showed that a first-touchpoint rule overrides origins chosen on purpose. So:

- **Existing leads** keep only what was explicitly entered; every guess from a first touchpoint becomes In-person visit, and never-contacted leads stay empty. A second migration does this, so prod (which runs both) and dev (which already ran the first) end the same: 155 in-person visits, 7 networking events, 3 approached us, 1 referral, 29 empty. No origin had been edited by hand on dev in between.
- **No more automatic fill-in** on the first touchpoint. The origin is only set by hand.
- **Session quick-add** preselects an origin from the session's channel instead of leaving it to be filled in.

- **Wording:** the field is called **Lead origin** on screen (it was "How this lead started"), and the lead page shows the group first: "We reached out · In-person visit". Analytics says "Conversion by Lead Origin". The snapshot prompt keeps its own wording for Claude.

### ✅ Step 7: Apply
Deployed 10/14/26: prod ran both migrations (with stage history, sessions and the address coordinates), then dev was reset from prod in Neon, so dev no longer needed the second migration applied by hand. Afterward (196 leads): 150 in-person visits, 7 networking events, 3 approached us, 1 referral, 35 empty. That's 6 fewer in-person visits and 6 more empty than dev's preview, because prod's leads and touchpoints differed slightly from dev's copy at the time.
