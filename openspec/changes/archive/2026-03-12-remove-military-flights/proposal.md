## Why

The military flight tracking feature relies on the `api.adsb.fi/v2/mil` endpoint, which adds external API dependency, extra network requests on every poll cycle, and complexity to the UI. Removing it simplifies the app to focus purely on commercial OpenSky data, reduces API surface area, and streamlines the codebase.

## What Changes

- **Remove** the `fetchMilitaryFlights` API function from `src/services/api.ts`
- **Remove** the military/commercial toggle UI (buttons) from `src/components/Sidebar.tsx`
- **Remove** the `militaryMode` state and `setMilitaryMode` action from the Zustand store (`src/store/useFlightStore.ts`)
- **Remove** military flight fetching, merging, and filtering logic from `src/components/Map.tsx`
- **Remove** the `isMilitary` field from the `Flight` type in `src/types.ts`
- **Remove** military-related CSS styles (`--accent-military`, `.btn-military`) from `src/index.css`

## Capabilities

### New Capabilities

_None — this is a removal-only change._

### Modified Capabilities

_No existing specs to modify._

## Impact

- **API layer**: `fetchMilitaryFlights` export removed from `src/services/api.ts`; any external consumer would break
- **State management**: `militaryMode` and `setMilitaryMode` removed from the store interface
- **UI**: The sidebar simplifies — the Commercial/Military toggle buttons are removed
- **Map rendering**: Flight dot/icon color logic simplifies (no more red military coloring)
- **Types**: `isMilitary` optional field removed from `Flight` interface
- **Styles**: Military accent color and button styles removed from CSS
