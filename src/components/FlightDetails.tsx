import { useFlightStore } from '../store/useFlightStore';
import { Share2, MapPin, Gauge, Navigation } from 'lucide-react';

export function FlightDetails() {
  const { selectedFlight, setSelectedFlight } = useFlightStore();

  if (!selectedFlight) return null;

  const getAltitudeString = (meters: number | null) => {
    if (meters === null) return 'N/A';
    return `${Math.round(meters * 3.28084).toLocaleString()} ft`;
  };

  const getSpeedString = (ms: number | null) => {
    if (ms === null) return 'N/A';
    // m/s to knots
    return `${Math.round(ms * 1.94384)} kts`;
  };

  return (
    <div className="ui-layer">
      <div 
        className="glass-panel interactive-panel"
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '320px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ 
              backgroundColor: 'rgba(0, 210, 255, 0.1)', 
              color: 'var(--accent-blue)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              {selectedFlight.originCountry}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
              {selectedFlight.callsign === 'UNKNOWN' ? selectedFlight.icao24.toUpperCase() : selectedFlight.callsign}
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              ICAO24: {selectedFlight.icao24}
            </div>
          </div>
          
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            onClick={() => setSelectedFlight(null)}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
              <Navigation size={14} /> Altitude
            </div>
            <div style={{ fontSize: '18px', fontWeight: 500 }}>
              {getAltitudeString(selectedFlight.baroAltitude)}
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
              <Gauge size={14} /> Speed
            </div>
            <div style={{ fontSize: '18px', fontWeight: 500 }}>
              {getSpeedString(selectedFlight.velocity)}
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
              <Share2 size={14} /> Heading
            </div>
            <div style={{ fontSize: '18px', fontWeight: 500 }}>
              {selectedFlight.trueTrack !== null ? `${Math.round(selectedFlight.trueTrack)}°` : 'N/A'}
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
              <MapPin size={14} /> Lat/Lng
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>
              {selectedFlight.latitude?.toFixed(2)}, {selectedFlight.longitude?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
