## Why

Fetching data periodically for flights currently causes the entire application to re-render all data points at once. This results in a jarring visual experience, rather than a smooth transition of airplanes moving from their previous coordinates to their new ones. By updating the data rendering approach, we can provide a much better user experience with smooth airplane movements.

## What Changes

- Modify the state management for flight data to retain existing flight objects and update their properties (e.g., latitude, longitude) rather than replacing the entire list.
- Implement CSS or JavaScript-based transitions (e.g., using framer-motion, d3, or standard CSS transitions) to smoothly animate flight markers from old coordinates to new coordinates.
- Ensure that newly discovered flights are added to the map and flights that are no longer in the payload are removed gracefully.

## Capabilities

### New Capabilities

- `flight-data-rendering`: Handles the fetching, state management, and smooth visual transitions of flight markers on the map.

### Modified Capabilities

## Impact

- Frontend state management logic for flights.
- Map marker components displaying the flights.
- Potentially the map rendering layer depending on the mapping library used (e.g., Leaflet, React Leaflet, Mapbox).
