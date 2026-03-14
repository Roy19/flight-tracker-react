## Context

The current `AeroTrack` flight tracking application has a functional layout but uses a basic UI that lacks visual polish. In a modern web landscape, a premium look-and-feel drives user engagement. We aim to refactor the `Sidebar` and `FlightDetails` components to adopt a sleek, glassmorphic design system with modern typography and smooth micro-animations.

## Goals / Non-Goals

**Goals:**
- Implement a modern, premium glassmorphism design system for overlaying UI components (`Sidebar`, `FlightDetails`).
- Add dynamic micro-animations for interactions (hover states, panel entry/exit, loading pulses).
- Improve data hierarchy with vibrant color coding and better spacing.

**Non-Goals:**
- Modifying the underlying `Map` mapping engine or its visual style.
- Modifying the data fetching layer or `useFlightStore` logic.
- Adding new data fields beyond what is currently displayed.

## Decisions

- **Styling Approach**: We will leverage the existing global `index.css` (or inline styles/styled-components if the codebase prefers, based on current inline usage) to construct reusable `.glass-panel` and typography utility classes. Rationale: Avoids introducing heavier CSS frameworks like Tailwind where not strictly necessary, keeping the bundle lean while maximizing control over the glassmorphic aesthetic.
- **Animations**: CSS transitions and `@keyframes` will be used for micro-animations rather than a heavyweight JS animation library. Rationale: Better performance and simpler implementation for UI layers overlaying a WebGL map.

## Risks / Trade-offs

- **[Performance]** Heavy `backdrop-filter` blurs can cause frame drops when rendering over a complex, moving WebGL map. → **Mitigation**: We will ensure hardware acceleration is triggered and keep blur radiuses reasonable (e.g., `blur(12px)` instead of extreme values). Use opaque fallbacks for older browsers if needed.
