# Route planning

**Status:** Building. Build plan: [route-planning-build-plan.md](route-planning-build-plan.md).

In-person sessions used to be planned in MyWay ($10/month) and re-entered in Pitchr. Route planning brings that into the session itself: add leads to a session, tap **Optimize route**, and the stops go into the fastest driving order, shown on a map with the list in a sheet you swipe up. It's V1.5 of [outreach sessions](outreach-sessions.md). Once it's proven in the field, MyWay is cancelled.

## What you see

- **On the session page** (in-person and mixed sessions): a map with numbered pins in route order, the route line, and the start. On phones the stop list sits in a sheet over the map: **peek** (stop count, total drive time and distance, **Optimize route**), **half** and **full**. Drag the sheet's top (or tap its handle); the stops inside can still be dragged to reorder. Tapping a pin highlights its stop. The page loads one map at every screen size, since Google bills per map load. On desktop, map and list sit side by side.
- **Between stops:** "12 min · 4.3 mi", plus the route's total. A stop without coordinates says "Not on the map: add an address".
- **On the active session screen:** a **Map** toggle and **Re-optimize from here**, which reorders only the stops still left, from where you are now (e.g. after a skip or a come-back-later).
- Driving stays in Google/Apple Maps through each stop's **Navigate** button. No in-app turn-by-turn or live re-routing.

## Optimizing

**Optimize route** asks two things each time; nothing is saved as a default:

- **Start:** **My location** (the phone's location) or **another address**, typed in with the Google address search. Re-optimizing suggests the session's last start.
- **Return to start:** on or off.

The server (`POST /api/sessions/:id/route`) then:

1. Takes the session's **planned** stops whose lead has coordinates (`remainingOnly` for Re-optimize from here). Completed and skipped stops keep their places at the top; planned stops without coordinates go last.
2. Refuses more than **25** stops, Google's limit for ordering stops.
3. Makes **one Google Routes API call** (driving, without live traffic) with stop-order optimization:
   - **Return to start:** the route starts and ends at the start; Google orders every stop.
   - **End at the last stop:** Google needs a fixed end, so the end is the stop farthest (in a straight line) from the start, and Google orders the rest. This is checked against MyWay on real routes.
4. Saves, all at once, the new order, each stop's drive time and distance from the previous one, and the route (line, start, return or not, totals, when it was optimized).

Dragging stops by hand afterward clears the drive times and route line, since they no longer match, and the screen offers to re-optimize.

## Coordinates

A stop can only be ordered and pinned if its lead's main location has coordinates.

- The address search on the lead page saves the coordinates Google returns.
- An address saved without them (typed by hand) is looked up with Google Geocoding when it's saved.
- 34 older, hand-entered locations were looked up once (`scripts/address-backfill/geocode.ts`); the 142 addresses from the [address backfill](address-backfill.md) already had coordinates.

## Data

- `SessionItem.legSeconds`, `legMeters`: drive time and distance from the previous stop.
- `OutreachSession.routePolyline`, `routeStartLabel`, `routeStartLat`, `routeStartLng`, `routeReturns`, `routeSeconds`, `routeMeters`, `routeOptimizedAt`: the last optimized route.
- `Location.latitude`, `longitude`, `googlePlaceId` (added by the address backfill).

## Google setup and cost

- Server key `GOOGLE_API_KEY`: **Routes API** and **Geocoding API**. Browser key `VITE_GOOGLE_MAPS_API_KEY`: **Maps JavaScript API** and **Places API** (the address search), restricted to the app's websites; plus a **Map ID** (`VITE_GOOGLE_MAP_ID`) for the pins.
- One Routes call per optimize, one map load per page view, Geocoding only for hand-typed addresses: expected to stay within Google's free monthly allowance for one person (check the billing page).
