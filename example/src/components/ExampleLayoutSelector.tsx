import React, { useState, useEffect } from 'react';
import { registerSlot, unregisterSlot } from 'react-pluggable-layouts';

// Layout examples components
const SimpleLayout = () => (
  <div className="content-plugin" style={{ marginBottom: '20px' }}>
    <h3>Simple Layout</h3>
    <p>This is a basic layout with a single content area.</p>
    <div
      style={{
        padding: '20px',
        background: 'rgba(100, 108, 255, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(100, 108, 255, 0.2)',
      }}
    >
      <p>Main content goes here</p>
    </div>
  </div>
);

const TwoColumnLayout = () => (
  <div className="content-plugin" style={{ marginBottom: '20px' }}>
    <h3>Two Column Layout</h3>
    <p>A layout with two columns side by side.</p>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
        background: 'rgba(100, 108, 255, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(100, 108, 255, 0.2)',
      }}
    >
      <div
        style={{
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>Left Column</h4>
        <p style={{ margin: 0 }}>Sidebar content here</p>
      </div>
      <div
        style={{
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>Right Column</h4>
        <p style={{ margin: 0 }}>Main content here</p>
      </div>
    </div>
  </div>
);

const HolyGrailLayout = () => (
  <div className="content-plugin" style={{ marginBottom: '20px' }}>
    <h3>Holy Grail Layout</h3>
    <p>A classic web layout with header, footer, and three columns in between.</p>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(100, 108, 255, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(100, 108, 255, 0.2)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 20px',
          background: 'rgba(100, 108, 255, 0.2)',
          borderBottom: '1px solid rgba(100, 108, 255, 0.3)',
        }}
      >
        <h4 style={{ margin: '5px 0' }}>Header</h4>
      </div>
      <div
        style={{
          display: 'flex',
          minHeight: '200px',
        }}
      >
        <div
          style={{
            width: '150px',
            padding: '15px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRight: '1px solid rgba(100, 108, 255, 0.2)',
          }}
        >
          <h5 style={{ margin: '0 0 10px 0' }}>Left Sidebar</h5>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Navigation links</p>
        </div>
        <div
          style={{
            flex: 1,
            padding: '15px',
          }}
        >
          <h5 style={{ margin: '0 0 10px 0' }}>Main Content</h5>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Primary content area</p>
        </div>
        <div
          style={{
            width: '150px',
            padding: '15px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderLeft: '1px solid rgba(100, 108, 255, 0.2)',
          }}
        >
          <h5 style={{ margin: '0 0 10px 0' }}>Right Sidebar</h5>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Additional widgets</p>
        </div>
      </div>
      <div
        style={{
          padding: '10px 20px',
          background: 'rgba(100, 108, 255, 0.2)',
          borderTop: '1px solid rgba(100, 108, 255, 0.3)',
        }}
      >
        <h4 style={{ margin: '5px 0' }}>Footer</h4>
      </div>
    </div>
  </div>
);

const layouts = [
  {
    id: 'simple',
    name: 'Simple Layout',
    component: <SimpleLayout />,
    description: 'Basic single-content layout',
  },
  {
    id: 'two-column',
    name: 'Two Column Layout',
    component: <TwoColumnLayout />,
    description: 'Classic sidebar and main content layout',
  },
  {
    id: 'holy-grail',
    name: 'Holy Grail Layout',
    component: <HolyGrailLayout />,
    description: 'Header, footer, and three-column layout',
  },
];

const ExampleLayoutSelector: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<string>('simple');
  const [layoutId, setLayoutId] = useState<string | null>(null);

  // Register the selected layout when it changes
  useEffect(() => {
    // Clean up previous layout if there was one
    if (layoutId) {
      unregisterSlot('main-content', layoutId);
    }

    // Find and register the new selected layout
    const selectedLayout = layouts.find((layout) => layout.id === activeLayout);
    if (selectedLayout) {
      const id = registerSlot('main-content', selectedLayout.component, { priority: 5 });
      setLayoutId(id);
    }

    // Clean up on unmount
    return () => {
      if (layoutId) {
        unregisterSlot('main-content', layoutId);
      }
    };
  }, [activeLayout, layoutId]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setActiveLayout(layout.id)}
              className={activeLayout === layout.id ? 'button-primary' : 'button-secondary'}
              style={{ 
                display: 'flex',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                backgroundColor: activeLayout === layout.id ? 'var(--color-primary)' : 'transparent',
                color: activeLayout === layout.id ? 'white' : 'var(--color-text)',
                border: activeLayout === layout.id ? 'none' : '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
            >
              {layout.name}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
          {layouts.find((layout) => layout.id === activeLayout)?.description}
        </div>
      </div>

      <div style={{ 
        padding: '5px 12px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        background: 'rgba(68, 195, 108, 0.1)',
        color: '#68d388',
        display: 'inline-block',
        marginBottom: '10px'
      }}>
        This component dynamically registers layouts to the 'main-content' slot
      </div>
      
      {/* The actual layout content is inserted by the Slot component elsewhere */}
    </div>
  );
};

export default ExampleLayoutSelector; 