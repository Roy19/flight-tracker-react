## 1. Remove Military API Function

- [x] 1.1 Delete the `fetchMilitaryFlights` function from `src/services/api.ts`

## 2. Remove Military State from Store

- [x] 2.1 Remove `militaryMode` property and `setMilitaryMode` action from the `FlightStore` interface in `src/store/useFlightStore.ts`
- [x] 2.2 Remove `militaryMode` initial value and `setMilitaryMode` implementation from the store creator

## 3. Remove Military Type Annotation

- [x] 3.1 Remove the `isMilitary` optional field from the `Flight` interface in `src/types.ts`

## 4. Simplify Map Component

- [x] 4.1 Remove the `fetchMilitaryFlights` import from `src/components/Map.tsx`
- [x] 4.2 Replace `Promise.all([fetchFlights(...), fetchMilitaryFlights()])` with a direct `fetchFlights(...)` call and remove the merge-by-ICAO deduplication logic
- [x] 4.3 Remove `militaryMode` from the store destructure and the `useEffect` dependency array
- [x] 4.4 Remove the `filteredFlights` memo that filters by `isMilitary` — use `flights` directly
- [x] 4.5 Simplify `getFillColor` and `getColor` accessors to remove military red coloring branches

## 5. Simplify Sidebar Component

- [x] 5.1 Remove `militaryMode`, `setMilitaryMode` from the store destructure and remove `ShieldAlert` import in `src/components/Sidebar.tsx`
- [x] 5.2 Remove the Commercial/Military toggle button group from the sidebar JSX

## 6. Remove Military CSS Styles

- [x] 6.1 Remove `--accent-military` CSS custom property from `src/index.css`
- [x] 6.2 Remove `.btn-military` and `.btn-military.active` rule sets from `src/index.css`

## 7. Verification

- [x] 7.1 Confirm the app compiles without TypeScript errors (`npm run build`)
- [x] 7.2 Verify the app renders correctly in the browser with no military UI or console errors
