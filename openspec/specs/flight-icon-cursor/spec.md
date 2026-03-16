## ADDED Requirements

### Requirement: Pointer cursor on flight hover
The system SHALL display a `pointer` cursor when the user's mouse is positioned over a clickable flight object (icon or scatter dot) on the map.

#### Scenario: Hovering over a flight icon
- **WHEN** the user moves the mouse over a flight icon (non-expired)
- **THEN** the map canvas cursor SHALL change to `pointer`

#### Scenario: Moving mouse off a flight icon
- **WHEN** the user moves the mouse away from all flight objects
- **THEN** the cursor SHALL revert to the default map cursor (`grab` or `default`)

#### Scenario: Dragging the map while cursor is over a flight
- **WHEN** the user holds the mouse button and drags the map
- **THEN** the cursor SHALL show `grabbing` (DeckGL drag state takes priority over hover)

#### Scenario: Hovering over an expired flight object
- **WHEN** the user's pointer is over the position of an expired (invisible) flight
- **THEN** the cursor SHALL NOT change to `pointer` (expired flights are not interactive)
