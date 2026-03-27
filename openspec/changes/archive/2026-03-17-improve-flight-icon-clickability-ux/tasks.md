## 1. State Management

- [x] 1.1 Add `hoveredIcao` state (`string | null`) to `Map.tsx` using `useState`
- [x] 1.2 Create a shared `onHover` handler that sets `hoveredIcao` to the hovered flight's `icao24` (or `null` when moving off), guarding against expired flights

## 2. Cursor Fix

- [x] 2.1 Add the `getCursor` prop to the `<DeckGL>` component that returns `'pointer'` when `isHovering` is true and `'grab'` when `isDragging` is true and `'default'` otherwise

## 3. Hover Highlight — Icon Layer

- [x] 3.1 Update `getColor` in `IconLayer` to return a bright white-cyan colour (`[255, 255, 255, 255]`) when `d.icao24 === hoveredIcao && !d.expired` and `d.icao24` is not the selected flight, keeping existing selected/default colours
- [x] 3.2 Add `hoveredIcao` to `IconLayer`'s `updateTriggers.getColor` so DeckGL re-evaluates colours on hover state change

## 4. Hover Highlight — Scatter Layer

- [x] 4.1 Update `getFillColor` in `ScatterplotLayer` to return a brighter colour (`[255, 255, 255, 200]`) when `d.icao24 === hoveredIcao && !d.expired` and `d.icao24` is not the selected flight
- [x] 4.2 Update `getRadius` in `ScatterplotLayer` to return a slightly larger radius (e.g., `6` pixels) for the hovered dot (non-selected, non-expired)
- [x] 4.3 Add `hoveredIcao` to `ScatterplotLayer`'s `updateTriggers.getFillColor` and `updateTriggers.getRadius`

## 5. Verification

- [x] 5.1 Manually verify: hover over a flight icon at high zoom → cursor becomes a pointer
- [x] 5.2 Manually verify: hover over a flight dot at low zoom → cursor becomes a pointer and dot brightens/enlarges
- [x] 5.3 Manually verify: move mouse off flight → cursor reverts to grab/default
- [x] 5.4 Manually verify: drag the map while hovering over a flight → cursor shows grabbing (not pointer)
- [x] 5.5 Manually verify: selected flight keeps its green selection colour when hovered over
