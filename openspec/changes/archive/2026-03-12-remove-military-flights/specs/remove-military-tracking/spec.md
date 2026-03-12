## REMOVED Requirements

### Requirement: Military flight data fetching
The system SHALL NOT fetch military flight data from the adsb.fi API endpoint.

**Reason**: Military flight tracking feature is being removed to simplify the application.
**Migration**: No migration needed — the app will only use OpenSky commercial flight data.

#### Scenario: Application polls for flight data
- **WHEN** the application fetches flight data on a poll cycle
- **THEN** it SHALL only call the OpenSky Network API and SHALL NOT call the adsb.fi military endpoint

#### Scenario: Flight data merging
- **WHEN** OpenSky flight data is received
- **THEN** the flights SHALL be set directly without military merge/deduplication logic

### Requirement: Military mode UI toggle
The system SHALL NOT display a military/commercial mode toggle in the sidebar.

**Reason**: Without military flight data, the toggle has no purpose.
**Migration**: The sidebar retains app branding and live statistics; only the toggle buttons are removed.

#### Scenario: Sidebar renders
- **WHEN** the sidebar component renders
- **THEN** it SHALL NOT contain Commercial or Military toggle buttons

### Requirement: Military mode application state
The system SHALL NOT maintain a `militaryMode` state or `setMilitaryMode` action.

**Reason**: No feature requires toggling between commercial and military views.
**Migration**: Components that referenced `militaryMode` will be updated to remove the dependency.

#### Scenario: Flight store initialization
- **WHEN** the Zustand flight store is created
- **THEN** it SHALL NOT include `militaryMode` or `setMilitaryMode` in its interface

### Requirement: Military flight type annotation
The `Flight` type SHALL NOT include an `isMilitary` field.

**Reason**: No code path sets or reads this field after the removal.
**Migration**: Remove the field from the TypeScript interface.

#### Scenario: Flight type definition
- **WHEN** the `Flight` interface is defined
- **THEN** it SHALL NOT contain an `isMilitary` property

### Requirement: Military visual styling
The system SHALL NOT apply military-specific visual styles (red accent color, military button styles).

**Reason**: No UI elements use military styling after the removal.
**Migration**: Remove `--accent-military`, `.btn-military`, and `.btn-military.active` from CSS.

#### Scenario: Flight rendering colors
- **WHEN** flights are rendered on the map
- **THEN** all flights SHALL use the standard commercial accent color (blue/cyan) unless selected
