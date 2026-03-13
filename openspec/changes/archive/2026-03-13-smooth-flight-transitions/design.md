## Context

The current `flight-tracker-react` application periodically fetches data for all flights to display on a map. When new data arrives, the application replaces the entire array of flight objects in state. This approach causes the mapping library to unmount and remount all map markers, resulting in a blinking or discontinuous visual experience. Users see planes disappearing and reappearing at new coordinates rather than smoothly transitioning across the map.

## Goals / Non-Goals

**Goals:**
- Provide a smooth visual transition for flight markers moving from old coordinates to new coordinates.
- Retain existing flight objects in the state if they continue to exist in the new payload.
- Add new flights to the map seamlessly.
- Remove flights that are no longer in the payload.

**Non-Goals:**
- Changing the backend data-fetching architecture (e.g., using WebSockets instead of polling). This is out of scope.
- Replacing the core mapping library.

## Decisions

- **State Management Update Strategy**: Instead of wholesale replacement of the flights array, the application will use the flight's unique identifier (e.g., `icao24`) to update existing flight objects. New objects will be appended, and missing objects will be removed.
  - *Rationale*: This is the most React-friendly way to prevent unmounting/remounting of child marker components.
- **Animation Strategy**: Utilize CSS transitions or the mapping library's built-in transition capabilities for the marker components on coordinate changes.
  - *Rationale*: Depending on the map library in use (e.g., React Leaflet), updating a marker's position directly on a retained component instance will allow underlying CSS transitions (`transition: transform 0.3s ease`) to smoothly animate the element from point A to point B.

## Risks / Trade-offs

- [Performance on large updates] → Keeping track of diffs via IDs might be slightly slower than replacing the whole array if the number of markers is extremely large (e.g., thousands). Mitigation: Profile the state update function and optimize if necessary (e.g., using a Map or dictionary for O(1) lookups instead of an array).
- [Map Library Limitations] → Some React-wrapper map libraries strictly re-render on prop changes. Mitigation: Ensure markers use standard React keys (`key={flight.icao24}`) so React reconciles them properly without unmounting.

## Open Questions

- What specific mapping library is currently in use, and does it natively support smooth coordinate transitions for markers?
