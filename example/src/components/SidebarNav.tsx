import React from 'react';

interface SidebarNavProps {
  activeTab: 'home' | 'plugins' | 'debug';
  onTabChange: (tab: 'home' | 'plugins' | 'debug') => void;
}

// Simple icon components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
  </svg>
);

const PluginsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 5h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-10-1h4v1h-4V4zM7 15l2.5-3.5 1.5 2 3-4L18 15H7z"/>
  </svg>
);

const DebugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8h-3V6.22c0-2.61-1.91-4.94-4.51-5.19C9.51.74 7 3.08 7 6v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-7H9V6c0-1.66 1.34-3 3-3s3 1.34 3 3v4z"/>
  </svg>
);

const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="sidebar-nav widget">
      <h3 className="widget-title">Navigation</h3>
      <div className="nav-buttons">
        <button 
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          <HomeIcon />
          Home
        </button>
        <button 
          className={`nav-button ${activeTab === 'plugins' ? 'active' : ''}`}
          onClick={() => onTabChange('plugins')}
        >
          <PluginsIcon />
          Plugin Manager
        </button>
        <button 
          className={`nav-button ${activeTab === 'debug' ? 'active' : ''}`}
          onClick={() => onTabChange('debug')}
        >
          <DebugIcon />
          Slot Debugger
        </button>
      </div>
    </div>
  );
};

export default SidebarNav; 