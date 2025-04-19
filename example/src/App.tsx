import { useState } from 'react';
import { SlotProvider, Slot } from 'react-pluggable-layouts';
import DefaultHeader from './components/DefaultHeader';
import SidebarNav from './components/SidebarNav';
import PluginManager from './components/PluginManager';
import SlotDebugger from './components/SlotDebugger';
import WelcomeCard from './components/WelcomeCard';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'plugins' | 'debug'>('home');

  return (
    <SlotProvider>
      <div className="app-container">
        <header>
          <Slot name="header" fallback={<DefaultHeader />} />
        </header>

        <div className="main-content">
          <aside className="sidebar">
            <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
            <Slot name="sidebar" />
          </aside>

          <main>
            {activeTab === 'home' && (
              <>
                <WelcomeCard />
                <Slot name="main-content" />
              </>
            )}
            
            {activeTab === 'plugins' && <PluginManager />}
            
            {activeTab === 'debug' && <SlotDebugger />}
          </main>
        </div>

        <footer>
          <Slot name="footer" fallback={<div>Default Footer © {new Date().getFullYear()}</div>} />
        </footer>
      </div>
    </SlotProvider>
  );
}

export default App; 