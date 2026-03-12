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

  setFlights: (flights) => set({ flights }),
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setViewport: (viewport) => set((state) => ({ viewport: { ...state.viewport, ...viewport } })),
}));
