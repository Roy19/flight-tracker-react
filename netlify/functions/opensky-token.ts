import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const TOKEN_URL =
  'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';

// Module-level token cache (survives warm invocations)
let cachedToken: string | null = null;
let cachedExpiresIn = 0;
let tokenExpiresAt = 0;

export const getAccessToken = async (): Promise<string | null> => {
  const clientId = process.env.OPENSKY_CLIENTID;
  const clientSecret = process.env.OPENSKY_CLIENTSECRET;

  if (!clientId || !clientSecret) return null;
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    console.warn('Failed to obtain OpenSky token:', response.status);
    return null;
  }

  const data = await response.json();
  cachedToken = data.access_token;
  cachedExpiresIn = data.expires_in as number;
  // Expire 1 minute before actual expiry to be safe
  tokenExpiresAt = Date.now() + (cachedExpiresIn - 60) * 1000;
  return cachedToken;
};

// Expose as a standalone HTTP endpoint as well (optional, useful for debugging)
const handler: Handler = async (_event: HandlerEvent, _context: HandlerContext) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return {
        statusCode: 503,
        body: JSON.stringify({ error: 'Could not obtain token — check server env vars' }),
      };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: token, expires_in: cachedExpiresIn }),
    };
  } catch (err) {
    console.error('opensky-token error:', err);
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      return {
        statusCode: 504,
        body: JSON.stringify({ error: 'OpenSky auth server timed out' }),
      };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};

export { handler };
