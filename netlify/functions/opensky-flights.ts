import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const OPENSKY_URL = 'https://opensky-network.org/api/states/all';

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const { lamin, lomin, lamax, lomax } = event.queryStringParameters ?? {};
  const headers = event.headers;

  if (lamin == null || lomin == null || lamax == null || lomax == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required query params: lamin, lomin, lamax, lomax' }),
    };
  }

  try {
    const url = `${OPENSKY_URL}?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;

    const fetchOptions: RequestInit = headers
      ? { headers: headers as HeadersInit }
      : {};

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.warn('OpenSky API error:', response.status);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `OpenSky returned ${response.status}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('opensky-flights error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};

export { handler };
