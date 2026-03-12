## Context

AeroTrack currently fetches both commercial flights (via OpenSky Network) and military flights (via adsb.fi `/v2/mil`). The military data is fetched on every 10-second poll alongside the commercial data, merged by ICAO hex, and displayed with distinct red coloring. The sidebar provides a toggle to switch between "Commercial" and "Military" view modes. This change removes all military flight functionality, leaving only the OpenSky commercial flight tracking.

## Goals / Non-Goals

**Goals:**
- Remove the `fetchMilitaryFlights` API call and the adsb.fi dependency
- Remove the military/commercial toggle from the sidebar UI
- Remove `militaryMode` state from the Zustand store
- Simplify Map component data fetching (single API call instead of `Promise.all` with two)
- Simplify flight rendering logic (no more conditional military coloring)
- Remove the `isMilitary` field from the `Flight` type
- Remove unused military CSS styles

**Non-Goals:**
- Re-architecting the data fetching or polling mechanism
- Changing the OpenSky commercial flight fetching behavior
- Modifying the map style, zoom behavior, or other non-military UI

## Decisions

### 1. Complete removal vs. feature flag
**Decision**: Complete removal of all military code paths.
**Rationale**: A feature flag would add unnecessary complexity for a feature that is being permanently removed. Clean deletion keeps the codebase simple.

### 2. Sidebar simplification approach
**Decision**: Remove the toggle buttons entirely rather than disabling the military button.
**Rationale**: With no military mode, the toggle serves no purpose. The sidebar will retain the app title, subtitle, and live statistics panel.

### 3. Map data flow simplification
**Decision**: Replace `Promise.all([fetchFlights(), fetchMilitaryFlights()])` with a direct `fetchFlights()` call, removing the merge-by-ICAO deduplication logic.
**Rationale**: Without military flights there is only one data source, so the merge map is unnecessary overhead.

## Risks / Trade-offs

- **Loss of military tracking** → Accepted; this is the goal of the change. If military tracking is needed later, it would be re-implemented.
- **Unused ShieldAlert import** → Mitigated by removing the import in the same edit to `Sidebar.tsx`.
