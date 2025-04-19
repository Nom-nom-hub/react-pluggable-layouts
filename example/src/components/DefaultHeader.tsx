import React from 'react';

const DefaultHeader: React.FC = () => {
  return (
    <div className="default-header">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #646cff, #a488ff)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '22px',
            color: 'white',
            boxShadow: '0 2px 12px rgba(100, 108, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ position: 'relative', zIndex: 2 }}>PL</span>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.2), transparent 70%)',
              zIndex: 1
            }} />
          </div>
          <div>
            <h1 style={{ margin: '0 0 6px 0', fontSize: '1.8rem' }}>
              React Pluggable Layouts
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.8, 
              fontSize: '0.95rem',
              maxWidth: '540px'
            }}>
              A powerful plugin system for dynamic React layouts
            </p>
          </div>
        </div>
        
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="https://github.com/username/react-pluggable-layouts" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a 
            href="https://www.npmjs.com/package/react-pluggable-layouts" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0v24h24v-24h-24zm13 21h-2v-3h2v3zm8-11c0 5.372-4.628 7-10 7v-2c4.627 0 8-1.371 8-5s-3.373-5-8-5v-2c5.372 0 10 1.628 10 7z"/>
            </svg>
            npm
          </a>
        </div>
      </div>
      
      <div style={{
        marginTop: '16px',
        display: 'flex',
        gap: '16px'
      }}>
        <div className="badge badge-primary">
          v0.1.0
        </div>
        <div className="badge" style={{
          background: 'rgba(76, 175, 80, 0.1)',
          color: '#81c784',
          border: '1px solid #4caf50'
        }}>
          React 18+
        </div>
        <div className="badge" style={{
          background: 'rgba(33, 150, 243, 0.1)',
          color: '#64b5f6',
          border: '1px solid #2196f3'
        }}>
          TypeScript
        </div>
        <div className="badge" style={{
          background: 'rgba(255, 152, 0, 0.1)',
          color: '#ffb74d',
          border: '1px solid #ff9800'
        }}>
          MIT License
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader; 