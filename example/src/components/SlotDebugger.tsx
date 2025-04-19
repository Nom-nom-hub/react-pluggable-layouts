import React from 'react';
import { useSlot } from 'react-pluggable-layouts';

const SlotDebugger: React.FC = () => {
  // Get content of all main slots
  const headerSlot = useSlot('header');
  const sidebarSlot = useSlot('sidebar');
  const mainContentSlot = useSlot('main-content');
  const footerSlot = useSlot('footer');

  // Function to render a slot's debug info
  const renderSlotDebug = (name: string, slotContent: any[]) => (
    <div className="debug-panel" key={name}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <span className={`slot-badge ${slotContent.length > 0 ? 'has-content' : 'empty'}`} style={{ 
          padding: '4px 8px', 
          borderRadius: '12px', 
          fontSize: '0.8rem', 
          background: slotContent.length > 0 ? 'rgba(100, 108, 255, 0.2)' : 'rgba(255, 100, 100, 0.15)',
          color: slotContent.length > 0 ? '#8890ff' : '#ff8080',
        }}>
          {slotContent.length} component{slotContent.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {slotContent.length === 0 ? (
        <div style={{ padding: '12px', background: '#222', borderRadius: '4px', color: '#888', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>No components registered to this slot</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem' }}>
            Use the Plugin Manager to register components
          </p>
        </div>
      ) : (
        <div>
          {slotContent.map((item, index) => (
            <div 
              key={index} 
              className="debug-item"
              style={{ 
                borderLeft: '4px solid #646cff',
                padding: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <strong>ID:</strong> <code>{item.id}</code>
                </div>
                <div>
                  <strong>Priority:</strong> <code>{item.priority}</code>
                </div>
              </div>
              
              <div>
                <strong>Component Type:</strong> {' '}
                <code>
                  {React.isValidElement(item.component) 
                    ? (item.component.type as any).name || 'Anonymous Component' 
                    : typeof item.component}
                </code>
              </div>
              
              {React.isValidElement(item.component) && (
                <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#aaa' }}>
                  Components are sorted by priority (lower number = higher priority)
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const slots = [
    { name: 'header', content: headerSlot, description: 'Top section of the page' },
    { name: 'sidebar', content: sidebarSlot, description: 'Left navigation area' },
    { name: 'main-content', content: mainContentSlot, description: 'Main center content area' },
    { name: 'footer', content: footerSlot, description: 'Bottom section of the page' }
  ];

  return (
    <div>
      <h2>Slot Debugger</h2>
      <p>
        This view shows all components currently registered in each slot, demonstrating how 
        the <code>useSlot</code> hook provides real-time access to slot contents.
      </p>
      
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>How the Debugger Works</h3>
        <p>
          This debugger uses the <code>useSlot</code> hook to access all registered components 
          for each slot. The hook automatically re-renders this component whenever slot contents change.
        </p>
        <pre style={{ 
          background: '#1a1a1a', 
          padding: '12px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// Get contents of a slot
const headerComponents = useSlot('header');

// Display component count
console.log(\`Header has \${headerComponents.length} components\`);

// Access component details
headerComponents.forEach(item => {
  console.log(item.id, item.priority, item.component);
});`}
        </pre>
      </div>
      
      <div>
        {slots.map(slot => renderSlotDebug(slot.name, slot.content))}
      </div>
    </div>
  );
};

export default SlotDebugger; 