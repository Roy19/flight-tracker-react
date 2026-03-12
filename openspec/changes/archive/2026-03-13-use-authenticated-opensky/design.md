## Context
The application fetches flight data from the OpenSky Network. Unauthenticated requests are strictly rate-limited (e.g., lower query limits, slower data refresh rates), leading to degraded application performance and reliability during heavy usage or frequent polling. Authenticating using an OpenSky account significantly improves these limits.

## Goals / Non-Goals

**Goals:**
- Provide a mechanism to supply an OpenSky client_id and client_secret securely via environment variables.
- Update the API service to conditionally use OAuth2 client_credentials authentication if these credentials are provided.

**Non-Goals:**
- Implement a user-facing login form for OpenSky credentials.
- Change the underlying data model or how flight data is parsed and displayed.
- Setup a backend proxy server (for now).

## Decisions
- **Use OAuth2 client_credentials Authentication**: The OpenSky REST API supports OAuth2 client_credentials Authentication. We will fetch the JWT token in the client-side and attach it to the `Authorization: Bearer <token>` header. Use the endpoint https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token to fetch the token via POST request with client_id and client_secret as form data.
  - *Rationale*: This is the standard and only supported method to authenticate with OpenSky's REST API.
- **Environment Variables**: Use configured `.env` files (e.g., `VITE_OPENSKY_CLIENTID`, `VITE_OPENSKY_CLIENTSECRET`) to populate credentials.
  - *Rationale*: Keeps secrets out of source control. Vite supports environment variables natively using the `VITE_` prefix.

## Risks / Trade-offs
- **Risk: Credential Exposure in Client App**: Because this is a Vite-based React client-side application, any `VITE_` environment variables will be embedded into the client bundle and are accessible to anyone inspecting the network requests.
  - *Mitigation*: As long as the application is run locally or the user is aware of this trade-off for personal usage, it is acceptable. If deployed publicly in the future, a backend proxy service will be required to hide the credentials. Note this explicitly in the README or documentation.
