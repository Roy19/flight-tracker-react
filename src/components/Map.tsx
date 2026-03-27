import { useEffect, useState } from 'react';
import { Map as MapGL } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { IconLayer, ScatterplotLayer } from '@deck.gl/layers';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useFlightStore } from '../store/useFlightStore';
import { fetchFlights } from '../services/api';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// We map a simple SVG airplane to data URI for robust loading
const AIRPLANE_SVG = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" /></svg>`;

export function Map() {
  const { flights, setFlights, selectedFlight, setSelectedFlight, viewport, setViewport, setIsLoading } = useFlightStore();
  const [hoveredIcao, setHoveredIcao] = useState<string | null>(null);

  const handleHover = (info: { object?: any }) => {
    const { object } = info;
    const icao = (!object || object.expired) ? null : (object.icao24 ?? null);
    setHoveredIcao(prev => (prev === icao ? prev : icao));
  };
  
  // Re-fetch when panning
  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      // Calculate dynamic bbox based on zoom
      // The lower the zoom (1=global), the wider the delta
      const delta = Math.max(180 / Math.pow(2, viewport.zoom - 1), 2);
      
      const lamin = Math.max(-90, viewport.latitude - delta);
      const lamax = Math.min(90, viewport.latitude + delta);
      const lomin = Math.max(-180, viewport.longitude - delta * 1.5);
      const lomax = Math.min(180, viewport.longitude + delta * 1.5);
      
      setIsLoading(true);
      const flightData = await fetchFlights(lamin, lomin, lamax, lomax);
      
      if(active) {
        setFlights(flightData);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s poll
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [viewport.longitude, viewport.latitude, viewport.zoom]);

  const layers = [
    new ScatterplotLayer({
      id: 'flights-dots',
      data: flights,
      pickable: true,
      onClick: ({ object }) => !object?.expired && setSelectedFlight(object),
      onHover: handleHover,
      getPosition: (d: any) => [d.longitude || 0, d.latitude || 0],
      getFillColor: (d: any) => {
        if (d.expired) return [0, 0, 0, 0];
        if (d.icao24 === selectedFlight?.icao24) return [0, 255, 136, 255];
        if (d.icao24 === hoveredIcao) return [255, 255, 255, 200];
        return [0, 210, 255, 150];
      },
      getRadius: (d: any) => {
        if (d.expired || viewport.zoom > 6) return 0;
        if (d.icao24 === hoveredIcao && d.icao24 !== selectedFlight?.icao24) return 6;
        return 4;
      },
      radiusUnits: 'pixels',
      updateTriggers: {
        getFillColor: [selectedFlight?.icao24, hoveredIcao],
        getRadius: [hoveredIcao, selectedFlight?.icao24, viewport.zoom],
      },
      transitions: {
        getPosition: 500,
        getFillColor: 200,
        getRadius: 200
      }
    }),
    new IconLayer({
      id: 'flights-icons',
      data: flights,
      pickable: true,
      onClick: ({ object }) => !object?.expired && setSelectedFlight(object),
      onHover: handleHover,
      iconAtlas: AIRPLANE_SVG,
      iconMapping: {
        marker: { x: 0, y: 0, width: 24, height: 24, mask: true }
      },
      getIcon: () => 'marker',
      sizeScale: viewport.zoom > 6 ? 2 : 0, // Only show icons when zoomed in
      getPosition: (d: any) => [d.longitude || 0, d.latitude || 0],
      getSize: (d: any) => d.expired ? 0 : 16,
      getColor: (d: any) => {
        if (d.expired) return [0, 0, 0, 0];
        if (d.icao24 === selectedFlight?.icao24) return [0, 255, 136, 255];
        if (d.icao24 === hoveredIcao) return [255, 255, 255, 255];
        return [0, 210, 255, 255];
      },
      getAngle: (d: any) => 360 - (d.trueTrack || 0), // Rotate plane
      updateTriggers: {
        getColor: [selectedFlight?.icao24, hoveredIcao],
      },
      transitions: {
        getPosition: 500,
        getColor: 200,
        getSize: 500,
        getAngle: 500
      }
    }),
  ];

  return (
    <div className="map-container">
      <DeckGL
        initialViewState={viewport}
        onViewStateChange={({ viewState }) => setViewport(viewState as any)}
        controller={true}
        layers={layers}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab'
        }
      >
        <MapGL mapStyle={MAP_STYLE} reuseMaps />
      </DeckGL>
    </div>
  );
}
