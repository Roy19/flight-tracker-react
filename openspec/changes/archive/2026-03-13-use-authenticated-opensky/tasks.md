## 1. Environment Configuration

- [x] 1.1 Setup mechanism to read `VITE_OPENSKY_CLIENTID` and `VITE_OPENSKY_CLIENTSECRET` from `import.meta.env`.
- [x] 1.2 Determine if authentication should be used based on the presence of both variables.

## 2. API Service Updates

- [x] 2.1 Update `src/services/api.ts` to fetch an OAuth token using the `client_credentials` flow if credentials are present.
- [x] 2.2 Include the generated `Authorization: Bearer <token>` header in the `fetch()` request options to `https://opensky-network.org/api/states/all`.
- [x] 2.3 Add error handling indicating 401 Unauthorized if provided credentials are invalid.

## 3. Verification

- [x] 3.1 Add valid credentials to a local `.env.local` file and verify API limits are bypassed and data fetches successfully.
- [x] 3.2 Add invalid credentials to `.env.local` and verify graceful failure.
- [x] 3.3 Ensure the application gracefully falls back to unauthenticated requests if `.env.local` has no credentials.
