## ADDED Requirements

### Requirement: Configure OpenSky Credentials
The system MUST allow OpenSky Network credentials to be configured via environment variables.

#### Scenario: Valid credentials provided
- **WHEN** the application environment defines `VITE_OPENSKY_CLIENTID` and `VITE_OPENSKY_CLIENTSECRET`
- **THEN** the system MUST use those credentials to construct authentication headers

#### Scenario: Missing credentials
- **WHEN** the application environment is missing either `VITE_OPENSKY_CLIENTID` or `VITE_OPENSKY_CLIENTSECRET`
- **THEN** the system MUST fall back to making unauthenticated API calls

### Requirement: Authenticate OpenSky API Requests
The system MUST include JWT token fetched using client_credentials flow when fetching flight data if credentials are provided.

#### Scenario: Fetching data with credentials
- **WHEN** the API service fetches flight data AND valid credentials are configured
- **THEN** the HTTP request MUST include an `Authorization: Bearer <token>` header

#### Scenario: Fetching data without credentials
- **WHEN** the API service fetches flight data AND credentials are NOT configured
- **THEN** the HTTP request MUST NOT include an `Authorization` header
