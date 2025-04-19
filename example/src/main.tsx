import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import and register a global component outside of React rendering
import { registerSlot } from 'react-pluggable-layouts';
import GlobalFooter from './components/GlobalFooter';

// Register a component that will be available globally
registerSlot('footer', <GlobalFooter />, { priority: 5 });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 