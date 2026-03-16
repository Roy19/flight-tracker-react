## Context

The map is rendered with DeckGL on top of MapLibre GL. DeckGL's built-in controller handles map panning and sets the canvas cursor to `grab`/`grabbing` by default. Pickable layers (`IconLayer`, `ScatterplotLayer`) support hover callbacks (`onHover`) and a `getCursor` prop on the `DeckGL` component to override cursor behaviour. Currently neither `getCursor` nor `onHover` is wired up, so the cursor never changes when the user moves over a flight icon.

Additionally, there is no visual hover state on the icons themselves — the `FlightDetails` panel updates only on click, so users have no affordance to discover clickability.

## Goals / Non-Goals

**Goals:**
- Show a `pointer` cursor whenever the pointer is over any pickable flight object (icon or scatter dot).
- Apply a hover highlight (brightened tint + slight scale-up) on the hovered flight icon/dot.
- Preserve all existing click, pan, zoom, and selection behaviours.

**Non-Goals:**
- Changing the `FlightDetails` component or its data.
- Adding a dedicated tooltip/popover separate from `FlightDetails`.
- Modifying polling, data-fetch, or state logic unrelated to hover.

## Decisions

### D1 — Use DeckGL `getCursor` for cursor management
DeckGL's `DeckGL` component accepts a `getCursor` prop `({ isDragging, isHovering }) => string`. When `isHovering` is `true` (a hovered pickable object is present), returning `'pointer'` gives the correct browser cursor without any CSS hacks or event listeners on the canvas element.

**Alternative considered**: Mutating `canvas.style.cursor` directly in `onHover` callbacks on each layer. Rejected because it races with DeckGL's own cursor resets and is less composable.

### D2 — Track hovered flight in component state
A single `useState<string | null>` (`hoveredIcao`) in `Map.tsx` stores the `icao24` of the currently hovered flight. Both layers share the `onHover` callback that sets/clears this value.  
The hovered id is used to:
- Drive the `getCursor` indirectly through DeckGL's `isHovering` flag (DeckGL already sets `isHovering = true` when any pickable object is under the pointer — no manual tracking needed for the cursor itself).
- Drive color/size overrides in the layer accessor functions.

### D3 — Highlight via color brightening only (no scale change)
DeckGL `IconLayer` does not support per-object size transitions triggered by external state changes efficiently without forcing a full layer re-creation. A color change (brighter cyan / white tint) is sufficient to communicate hover and avoids jank.
`ScatterplotLayer` can accept a larger radius on hover via `getRadius` since it already transitions radius.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Frequent `onHover` calls on every mouse move could cause re-renders | Avoid setting state when the same icao24 is already hovered (compare before calling `setHoveredIcao`) |
| Expired flights (invisible, size=0) would still fire `onHover` | Check `!object?.expired` before setting hovered state, same as the existing `onClick` guard |
| `getCursor` conflicts with DeckGL's internal dragging cursor | DeckGL calls `getCursor({ isDragging, isHovering })` — return `'grab'` when dragging and `'pointer'` when hovering, preserving both semantics |
