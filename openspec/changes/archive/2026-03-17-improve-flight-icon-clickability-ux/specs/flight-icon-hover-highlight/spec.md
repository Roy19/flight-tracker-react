## ADDED Requirements

### Requirement: Visual hover highlight on flight objects
The system SHALL apply a distinguishable visual highlight to a flight icon or scatter dot when the user hovers over it, making its interactivity apparent before any click occurs.

#### Scenario: Hovering over a flight icon (zoomed in)
- **WHEN** the user moves the mouse over a flight icon at high zoom (where `IconLayer` is visible)
- **THEN** the icon SHALL change to a brighter/white colour to visually indicate it is interactive

#### Scenario: Hovering over a flight scatter dot (zoomed out)
- **WHEN** the user moves the mouse over a flight dot at low zoom (where `ScatterplotLayer` is visible)
- **THEN** the dot SHALL become brighter or larger to visually signal interactivity

#### Scenario: Moving mouse off a hovered flight
- **WHEN** the user moves the mouse away from a previously hovered flight
- **THEN** the icon/dot SHALL return to its normal un-hovered colour and size

#### Scenario: Highlight does not apply to selected flight
- **WHEN** the user hovers over the currently selected flight
- **THEN** the selected flight's distinct selection colour SHALL remain unchanged (hover does not override selection state)

#### Scenario: Highlight does not apply to expired flights
- **WHEN** the user's pointer passes over the position of an expired flight
- **THEN** no highlight SHALL be applied (expired flights are invisible and non-interactive)
