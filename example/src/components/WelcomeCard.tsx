import React from 'react';

const WelcomeCard: React.FC = () => {
  return (
    <div className="card welcome-card">
      <h2>Welcome to React Pluggable Layouts</h2>
      
      <p>
        This demo showcases a powerful WordPress-like plugin architecture for React applications,
        allowing components to be dynamically registered to different layout slots.
      </p>
      
      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <h3>Key Features:</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Register React components to named layout slots from anywhere in your app</li>
          <li>Support for priority-based ordering to control rendering sequence</li>
          <li>Automatic updates when components are registered or unregistered</li>
          <li>Works both inside and outside of React component lifecycles</li>
          <li>Support for asynchronous component registration</li>
          <li>Full SSR compatibility</li>
        </ul>
      </div>
      
      <p>
        Try out the interactive demo using the <strong>Plugin Manager</strong> to register 
        and unregister components, and see the <strong>Slot Debugger</strong> to examine the current state 
        of all registered components.
      </p>
      
      <div className="demo-highlight" style={{ 
        padding: '1rem', 
        background: 'rgba(100, 108, 255, 0.1)', 
        borderRadius: '6px',
        marginTop: '1.5rem',
        borderLeft: '4px solid #646cff'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>How it works:</h4>
        <ol style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li>The entire app is wrapped in a <code>SlotProvider</code></li>
          <li>Specific areas of the layout use <code>Slot</code> components with unique names</li>
          <li>Other parts of the app can register components to these slots using <code>registerSlot()</code></li>
          <li>Components can be added or removed at any time, and all slots update automatically</li>
        </ol>
      </div>
    </div>
  );
};

export default WelcomeCard; 