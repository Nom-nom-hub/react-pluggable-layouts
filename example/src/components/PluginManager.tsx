import React, { useState, useEffect } from 'react';
import { registerSlot, unregisterSlot, registerSlotAsync } from 'react-pluggable-layouts';

// Sample plugin components with better styling
const HeaderPlugin = () => (
  <div className="header-plugin">
    <h3 style={{ margin: '0 0 8px 0' }}>Custom Header Plugin</h3>
    <p style={{ margin: '0' }}>This interactive component was dynamically added to the Header slot.</p>
  </div>
);

const SidebarPlugin = () => (
  <div className="sidebar-plugin widget">
    <h3 className="widget-title">Sidebar Plugin</h3>
    <p>This widget was dynamically registered to the Sidebar slot.</p>
    <div style={{ fontSize: '0.9rem', color: '#aaa' }}>
      Try adding multiple sidebar plugins with different priorities to see how they're ordered.
    </div>
  </div>
);

const ContentPlugin = () => (
  <div className="content-plugin">
    <h3>Main Content Plugin</h3>
    <p>This component was dynamically registered to the Main Content slot.</p>
    <p>Components registered this way can include any React functionality, including hooks, state and effects.</p>
  </div>
);

const FooterPlugin = () => (
  <div className="footer-plugin">
    <p><small>This footer message was dynamically added by a plugin component.</small></p>
  </div>
);

type PluginConfig = {
  name: string;
  component: React.ReactNode;
  slotName: string;
  description: string;
  priority: number;
  id?: string;
  active: boolean;
};

const PluginManager: React.FC = () => {
  // Define available plugins with descriptions
  const [plugins, setPlugins] = useState<PluginConfig[]>([
    { 
      name: 'Header Plugin', 
      component: <HeaderPlugin />, 
      slotName: 'header', 
      description: 'Adds a custom component to the top of the page',
      priority: 5, 
      active: false 
    },
    { 
      name: 'Sidebar Navigation Plugin', 
      component: <SidebarPlugin />, 
      slotName: 'sidebar', 
      description: 'Adds a widget to the left sidebar',
      priority: 10, 
      active: false 
    },
    { 
      name: 'High Priority Sidebar Widget', 
      component: <SidebarPlugin />, 
      slotName: 'sidebar', 
      description: 'Adds a similar widget but with higher priority (appears first)',
      priority: 5, 
      active: false 
    },
    { 
      name: 'Main Content Plugin', 
      component: <ContentPlugin />, 
      slotName: 'main-content', 
      description: 'Adds content to the main area of the page',
      priority: 15, 
      active: false 
    },
    { 
      name: 'Footer Plugin', 
      component: <FooterPlugin />, 
      slotName: 'footer', 
      description: 'Adds a message to the page footer',
      priority: 20, 
      active: false 
    },
  ]);

  // Toggle plugin activation
  const togglePlugin = (index: number) => {
    setPlugins(currentPlugins => {
      const updatedPlugins = [...currentPlugins];
      const plugin = updatedPlugins[index];
      
      if (plugin.active) {
        // Unregister plugin
        if (plugin.id) {
          unregisterSlot(plugin.slotName, plugin.id);
          updatedPlugins[index] = { ...plugin, id: undefined, active: false };
        }
      } else {
        // Register plugin
        const id = registerSlot(plugin.slotName, plugin.component, { priority: plugin.priority });
        updatedPlugins[index] = { ...plugin, id, active: true };
      }
      
      return updatedPlugins;
    });
  };

  // Demonstrate async registration
  const [isLoadingAsyncPlugin, setIsLoadingAsyncPlugin] = useState(false);
  const [asyncPluginId, setAsyncPluginId] = useState<string | null>(null);
  
  const loadAsyncPlugin = async () => {
    if (asyncPluginId || isLoadingAsyncPlugin) return;
    
    setIsLoadingAsyncPlugin(true);
    
    // Simulate async loading
    try {
      const id = await registerSlotAsync(
        'main-content',
        new Promise<React.ReactNode>((resolve) => {
          setTimeout(() => {
            resolve(
              <div className="content-plugin" style={{ background: 'rgba(85, 60, 154, 0.5)' }}>
                <h3>Async Loaded Plugin</h3>
                <p>This plugin was loaded asynchronously after a 2-second delay!</p>
                <p>The async registration feature is perfect for lazy-loaded or code-split components.</p>
              </div>
            );
          }, 2000);
        }),
        { priority: 5 }
      );
      
      setAsyncPluginId(id);
    } catch (error) {
      console.error('Failed to load async plugin:', error);
    } finally {
      setIsLoadingAsyncPlugin(false);
    }
  };
  
  const unloadAsyncPlugin = () => {
    if (asyncPluginId) {
      unregisterSlot('main-content', asyncPluginId);
      setAsyncPluginId(null);
    }
  };
  
  // Clean up when unmounting
  useEffect(() => {
    return () => {
      // Unregister any active plugins when the component unmounts
      plugins.forEach(plugin => {
        if (plugin.active && plugin.id) {
          unregisterSlot(plugin.slotName, plugin.id);
        }
      });
      
      if (asyncPluginId) {
        unregisterSlot('main-content', asyncPluginId);
      }
    };
  }, [plugins, asyncPluginId]);

  return (
    <div>
      <h2>Plugin Manager</h2>
      <p>
        Use this interface to register and unregister components to different slots in the application.
        Observe how the UI updates in real-time as components are added and removed.
      </p>
      
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Available Plugins</h3>
        <p>Click the buttons to register or unregister components to different layout slots.</p>
        
        <div>
          {plugins.map((plugin, index) => (
            <div 
              key={index} 
              className={`plugin-item ${plugin.active ? 'active' : ''}`}
            >
              <div className="plugin-item-info">
                <h4 className="plugin-item-title">{plugin.name}</h4>
                <div className="plugin-item-meta">
                  Slot: {plugin.slotName} | Priority: {plugin.priority}
                </div>
                <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>{plugin.description}</div>
              </div>
              <button onClick={() => togglePlugin(index)}>
                {plugin.active ? 'Unregister' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Async Plugin Demo</h3>
        <p>
          This demonstrates the async registration capability. Clicking "Load" will register 
          a component after a 2-second delay, simulating a network request or code-splitting.
        </p>
        <div className="button-group">
          <button 
            onClick={loadAsyncPlugin} 
            disabled={isLoadingAsyncPlugin || !!asyncPluginId}
          >
            {isLoadingAsyncPlugin ? (
              <>
                <span className="loading-indicator"></span>
                Loading...
              </>
            ) : 'Load Async Plugin'}
          </button>
          <button 
            onClick={unloadAsyncPlugin} 
            disabled={!asyncPluginId}
          >
            Unload Async Plugin
          </button>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Behind the Scenes</h3>
        <p>
          Each time you register a component using this interface, the <code>registerSlot()</code> function 
          is called to add the component to the specified slot. This returns a unique ID that's used later 
          for unregistering.
        </p>
        <p>
          When a plugin is registered or unregistered, all <code>Slot</code> components with that name
          automatically update to show the current content, thanks to React's <code>useSyncExternalStore</code>.
        </p>
        <pre style={{ 
          background: '#1a1a1a', 
          padding: '12px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// Register a component to a slot
const id = registerSlot(
  'sidebar',          // slot name
  <MyComponent />,    // React component
  { priority: 10 }    // options
);

// Unregister it later
unregisterSlot('sidebar', id);`}
        </pre>
      </div>
    </div>
  );
};

export default PluginManager; 