import type { Flight } from '../types';

const OPENSKY_URL = 'https://opensky-network.org/api/states/all';
const OPENSKY_TOKEN_URL = '/opensky-auth/auth/realms/opensky-network/protocol/openid-connect/token';

const clientId = import.meta.env.VITE_OPENSKY_CLIENTID;
const clientSecret = import.meta.env.VITE_OPENSKY_CLIENTSECRET;

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

const getAccessToken = async (): Promise<string | null> => {
  if (!clientId || !clientSecret) return null;
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    });

    const response = await fetch(OPENSKY_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    if (!response.ok) {
      console.warn('Failed to obtain OpenSky OAuth token', response.status);
      return null;
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Expire 1 minute before the actual expiration to be safe
    tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return cachedToken;
  } catch (error) {
    console.error('Error fetching OpenSky token:', error);
    return null;
  }
};

export const fetchFlights = async (
  lamin: number,
  lomin: number,
  lamax: number,
  lomax: number
): Promise<Flight[]> => {
  try {
    const url = `${OPENSKY_URL}?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
    
    const token = await getAccessToken();
    const fetchOptions: RequestInit = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {};

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('OpenSky Rate Limit Exceeded!');
        return [];
      } else if (response.status === 401) {
        console.error('OpenSky Unauthorized (Invalid Credentials)');
        return [];
      }
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();

    if (!data.states) return [];

    return data.states.map((state: any) => ({
      icao24: state[0],
      callsign: state[1] ? state[1].trim() : 'UNKNOWN',
      originCountry: state[2],
      timePosition: state[3],
      lastContact: state[4],
      longitude: state[5],
      latitude: state[6],
      baroAltitude: state[7],
      onGround: state[8],
      velocity: state[9],
      trueTrack: state[10],
      verticalRate: state[11],
      sensors: state[12],
      geoAltitude: state[13],
      squawk: state[14],
      spi: state[15],
      positionSource: state[16],
      category: state[17],
    }));
  } catch (error) {
    console.error('Error fetching OpenSky data:', error);
    return []; // Return empty gracefully
  }
};
