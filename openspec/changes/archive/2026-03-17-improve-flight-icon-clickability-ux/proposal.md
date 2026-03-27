## Why

When a user hovers over a flight icon on the map, the cursor remains a grab/drag hand (the default DeckGL map-pan cursor) instead of switching to a pointer, making the icons appear non-interactive even though they are fully clickable. This creates a confusing UX disconnect between the visible hover data in `FlightDetails` and the lack of a clickability cue.

## What Changes

- Override the DeckGL cursor to show `pointer` when hovering over a pickable flight object (icon or scatter dot), and restore `default` (or `grab` while panning) otherwise.
- Add a visible hover highlight effect on the flight icon/dot so users get a clear affordance that the element is clickable.
- Ensure the tooltip/`FlightDetails` panel appears only on click (current behavior is preserved) while the cursor change provides the hover cue.

## Capabilities

### New Capabilities
- `flight-icon-cursor`: Controls the map cursor state based on whether the pointer is over a pickable flight object, providing a pointer cursor on hover to signal clickability.
- `flight-icon-hover-highlight`: Highlights a flight icon/dot on hover (e.g. brightened color or scale pulse) to reinforce interactivity before a click.

### Modified Capabilities
- None

## Impact

- `src/components/Map.tsx`: Add `getCursor` callback to `DeckGL`, add `onHover` handlers to `IconLayer` and `ScatterplotLayer`, update layer color/size accessors to reflect hover state.
- No API, routing, or dependency changes required.
