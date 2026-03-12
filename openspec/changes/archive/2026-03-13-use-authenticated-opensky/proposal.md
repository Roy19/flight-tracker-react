## Why
The application currently uses the unauthenticated OpenSky API, which has strict rate limits that restrict the frequency and reliability of flight data updates. Authenticating with the OpenSky Network will provide higher API limits, enabling a more stable and responsive flight tracking experience.

## What Changes
- Implement OAuth2 client_credentials authentication for OpenSky API requests using configured credentials.
- Introduce environment variables to securely store OpenSky credentials.
- Update the API fetching logic to attach the appropriate authorization headers if credentials are provided.

## Capabilities

### New Capabilities
- `opensky-authentication`: Securely manage and use OpenSky Network credentials to authenticate API requests, increasing the allowed rate limits.

### Modified Capabilities

## Impact
- API Service (`src/services/api.ts`): Will be updated to handle authentication headers.
- Environment Configuration: Requires new environment variables (e.g., `VITE_OPENSKY_CLIENTID`, `VITE_OPENSKY_CLIENTSECRET`) to be set for local development and deployment environments.
