import { create } from 'zustand';
import type { Flight } from '../types';

interface ViewportState {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface FlightStore {
  flights: Flight[];
  selectedFlight: Flight | null;
  isLoading: boolean;
  viewport: ViewportState;

  setFlights: (flights: Flight[]) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setIsLoading: (loading: boolean) => void;
  setViewport: (viewport: ViewportState) => void;
}

export const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  selectedFlight: null,
  isLoading: false,
  viewport: {
    longitude: -0.1276, // London default
    latitude: 51.5072,
    zoom: 4,
  },

  setFlights: (newFlights) => set((state) => {
    const newFlightsMap = new Map(newFlights.map(f => [f.icao24, f]));
    let updatedFlights = [];

    // Retain existing flights that are in the new payload and update them
    for (const existingFlight of state.flights) {
      if (newFlightsMap.has(existingFlight.icao24)) {
        updatedFlights.push({
          ...existingFlight,
          ...newFlightsMap.get(existingFlight.icao24)!,
          expired: false
        });
        newFlightsMap.delete(existingFlight.icao24);
      } else {
        // Mark as expired to maintain index stability for DeckGL transitions
        updatedFlights.push({
          ...existingFlight,
          expired: true
        });
      }
    }

    // Add entirely new flights
    for (const newFlight of newFlightsMap.values()) {
      updatedFlights.push({ ...newFlight, expired: false });
    }

    // Garbage collection to prevent memory issues.
    // Triggers a rearrange once every ~5000 items, bounded length.
    if (updatedFlights.length > 5000) {
      updatedFlights = updatedFlights.filter((f: any) => !f.expired);
    }

    return { flights: updatedFlights };
  }),
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setViewport: (viewport) => set((state) => ({ viewport: { ...state.viewport, ...viewport } })),
}));
