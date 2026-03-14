import type { Flight } from '../types';

const FLIGHTS_FUNCTION_URL = '/.netlify/functions/opensky-flights';
const TOKEN_FUNCTION_URL = '/.netlify/functions/opensky-token';

const getAccessToken = async () => {
  const token = localStorage.getItem('opensky-token');
  const expiresAt = localStorage.getItem('opensky-token-expires-at');
  if (!token || !expiresAt || Date.now() > Date.parse(expiresAt)) {
    const response = await fetch(TOKEN_FUNCTION_URL);
    const data = await response.json();
    console.log("token data", data);
    localStorage.setItem('opensky-token', data.access_token);
    localStorage.setItem('opensky-token-expires-at', (Date.now() + data.expires_in * 1000).toString());
  } else {
    return token;
  }
}

export const fetchFlights = async (
  lamin: number,
  lomin: number,
  lamax: number,
  lomax: number
): Promise<Flight[]> => {
  try {
    const token = await getAccessToken();

    const url = `${FLIGHTS_FUNCTION_URL}?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    return [];
  }
};
