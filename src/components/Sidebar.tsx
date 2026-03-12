import { useFlightStore } from '../store/useFlightStore';
import { Activity } from 'lucide-react';

export function Sidebar() {
  const { flights, isLoading } = useFlightStore();

  return (
    <div className="ui-layer">
      <div
        className="glass-panel interactive-panel"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          width: '320px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div>
          <h1 className="text-gradient" style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={24} color="#00d2ff" />
            AeroTrack
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Real-time airspace monitoring</p>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid var(--panel-border)'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Live Statistics
          </div>
          <div style={{ fontSize: '32px', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {flights.length.toLocaleString()}
            <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}>Aircraft in view</span>
          </div>
          {isLoading && (
            <div style={{ marginTop: '8px', color: 'var(--accent-blue)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)', animation: 'pulse 1s infinite alternate' }} />
              Updating via OpenSky...
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
