# Route planning: build plan

How route planning gets built. The feature is described in [route-planning.md](route-planning.md).

**Status:** ✅ done · ⏭️ next · ⬜ not started

### ✅ Step 1: Spec and build plan
Start and end are chosen each time (My location or a typed-in address; return to start or not), both the session page and the active screen get the map, and drive times show between stops.

### ✅ Step 2: Coordinates for every location
**Files:** `src/common/google.ts` (new: Geocoding and Routes calls, one log line each), `src/locations/locations.service.ts` (+ new `.spec.ts`), `scripts/address-backfill/geocode.ts` (new) (pitchr-server); `src/lib/googleMaps.ts` (new: one shared loader), `src/components/ui/AddressAutocomplete.tsx`, `src/features/leads/useLeadDetail.ts`, `LeadLocations.tsx` (pitchr-client)

- The address search asks Google for coordinates and the place ID too; the location form sends them only if the address wasn't edited after picking it (`addressKey()`).
- The server looks up coordinates for an address saved without them, and again when an address changes; if Google can't help, the location still saves, just without a pin.
- `geocode.ts` lists the locations without coordinates (dry run) and, with `--apply`, looks each up. Dry run on dev: 34. Not run yet: needs the Geocoding API on the server key and the owner's OK.

### ✅ Step 3: Schema
**Files:** `prisma/schema.prisma`, migration `20261017000000_add_session_routes`

Route fields on `OutreachSession` and `legSeconds`/`legMeters` on `SessionItem`, all optional. Applied to dev with `prisma migrate deploy` (after dev was restored: a `prisma migrate diff` run with dev as its shadow database had wiped it; dev was reset from prod in Neon, and CLAUDE.md now forbids using a real database as a shadow database).

### ✅ Step 4: Route endpoint
**Files:** `src/sessions/route-planning.service.ts` (+ `.spec.ts`), `sessions.controller.ts`, `sessions.module.ts`, `sessions.service.ts` (+ tests)

- `POST /api/sessions/:id/route` with `{ start: { latitude, longitude, label }, returnToStart }`: planned stops with coordinates go through one Google Routes call (round trip: start to start; otherwise the stop farthest from the start is the end). Done and skipped stops stay on top, stops without coordinates go last. Max 25. Order, each stop's leg and the route are saved together; a Google failure saves nothing and returns 502 with a plain message.
- Session items now include the lead's coordinates.
- Adding, removing or reordering stops by hand clears the stored route and drive times (`clearRoute()`), keeping the last start so re-optimizing can suggest it.
- 13 new Jest tests (102 total), Google mocked.

### ✅ Step 5: Map and sheet on the session page
**Files (pitchr-client):** `src/features/sessions/StopList.tsx`, `BottomSheet.tsx`, `SessionMap.tsx`, `OptimizeRouteDialog.tsx`, `src/lib/geolocation.ts` (all new), `SessionPage.tsx`, `constants.ts` (`formatDriveTime`, `formatMiles`, `isVisitChannel`, `routeSummary`), `types.ts`, tests

- **The list** moved into `StopList` (used by the desktop card and the phone sheet), with "↓ 12 min · 4.3 mi" above each optimized stop and "Not on the map" notes.
- **The sheet** is our own small component instead of `vaul`: vaul moves the sheet with CSS transforms, which breaks `@hello-pangea/dnd`'s drag-to-reorder inside it. `BottomSheet` changes height between peek, half and full (drag the header or tap/keyboard the handle; header buttons stay tappable) and sits above the phone tab bar.
- **The map** (`SessionMap`): numbered pins in list order (done/skipped grey, selected dark), the start as a blue dot, the route line, fit to the stops; tapping a pin highlights the stop and opens the sheet to half. **One map per page** on all screen sizes, since Google bills per map load. Map ID from `VITE_GOOGLE_MAP_ID`, falling back to Google's demo ID.
- **Optimize route** (`OptimizeRouteDialog`): My location, the last typed-in start (suggested when re-optimizing), or another address from the address search; Return to start. Location errors explain what to do instead.
- Desktop: list and map side by side, the map sticky.

### ✅ Step 6: Active session screen
**Files (pitchr-client):** `RunSessionPage.tsx` (+ test)

- **Map** next to List (visit sessions): full-screen map with the stops left and the route summary; tapping a pin goes to that stop. The map only loads when opened.
- **Re-optimize from here**: the stops still planned, from the phone's location, ending at the last stop.
- The current stop shows the drive to it ("12 min · 4.3 mi from the last stop").
- Client: 9 new tests (57 total); `tsc`, build and lint unchanged.

### ✅ Step 7: Try it on dev
With the owner's OK: the 33 locations still missing coordinates on dev were geocoded (all found), then a 10-stop Tampa test session was planned and optimized in the app (3 Routes calls) and deleted afterwards.

- **One way** from the Tampa Convention Center: 1 h 18 min · 25 mi, ending at the farthest stop (Carrollwood). **Round trip:** 1 h 34 min · 34 mi; the per-stop drives plus the drive back add up to the total. Pins, numbering, the route line, drive times, the sheet's snap points, tapping a pin, drag-to-reorder in the sheet (which cleared the route as designed) and the desktop layout all checked out.
- **Active screen:** skipping the first stop, then Re-optimize from here (location simulated in Ybor) reordered the 9 remaining stops: 1 h 8 min · 23 mi.
- **Fixed along the way:**
  - The map never loaded: the Maps script's load event fires before Google is ready. `loadGoogleMaps()` now uses Google's `callback` parameter.
  - Picking an address in the Optimize dialog was immediately undone, because the address search reports the picked text as a change; the dialog now only clears its pick on real typing (+ test).
  - Pins hid behind the sheet on phones; the map now leaves room at the bottom when fitting the stops.
  - The phone tab bar sat on top of full-screen popups (same layer, later in the page), hiding their bottom buttons: the run screen's map and List, the lead picker's **Add leads** (found by the owner on a phone) and the run screen's quick-add. Fixed once in the layout: the tab bar now sits below every popup (page sheet z-10, More sheet z-20, tab bar z-30, popups z-40+), documented in `InternalLayout.tsx`.
  - The first stop of a route said "from the last stop"; it now says "from the start".

### ✅ Step 8: Compare with MyWay
The owner loaded the same 10 stops into both (10/16/26): six clustered stops plus two far north and two far west. For the six clustered stops the order was identical; the routes differed only in the last four, the outlying ones. Pitchr: 1 h 35 min; MyWay: 2 h 6 min. Pitchr's time is Google's estimate without traffic, and MyWay may count differently, so the gap isn't a strict comparison, but the order was at least as good. Real sessions are clustered, where the results match, so the farthest-stop approach stays; no route-matrix or Route Optimization fallback needed.

### ⏭️ Step 9: Deploy
1. ✅ Geocoded prod's locations without coordinates (10/16/26): dry run listed 33, the owner signed off, `--apply` found all 33. All 175 prod locations now have coordinates, all inside Florida.
2. Map ID created and working locally (`VITE_GOOGLE_MAP_ID`); the browser key was renamed `VITE_GOOGLE_MAPS_API_KEY` and restricted to `http://localhost:5173/*` and `https://pitchr-client.vercel.app/*`, and to the Maps JavaScript API and Places API (checked: the map and the address search both work). Still to do: add both variables in Vercel.
3. Deploy pitchr-server (migration `20261017000000_add_session_routes` runs on startup) and pitchr-client together.
4. Field test a real session; then cancel MyWay.
