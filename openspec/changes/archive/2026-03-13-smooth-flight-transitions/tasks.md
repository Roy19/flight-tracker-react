## 1. Investigation & Setup

- [x] 1.1 Identify the current map rendering library (e.g., react-leaflet, mapbox-gl) and how markers are currently rendered.
- [x] 1.2 Identify where the flight data state is managed and updated (e.g., Redux, Context, or local component state).

## 2. State Management

- [x] 2.1 Refactor the data fetching and state update logic to diff incoming flights against existing flights using `icao24` or another unique identifier.
- [x] 2.2 Update state to merge new coordinates for existing flights, append entirely new flights, and remove flights no longer tracked.

## 3. UI and Animation

- [x] 3.1 Update the map marker component to use stable React keys (`flight.icao24`) to prevent unmounting on re-render.
- [x] 3.2 Implement smooth transitions for marker coordinate updates (e.g., CSS transition on transform, or library-specific animation plugins).
- [x] 3.3 Verify markers smoothly transition across the map instead of blinking or teleporting discretely.
