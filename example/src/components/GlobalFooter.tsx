import React from 'react';

const GlobalFooter: React.FC = () => {
  return (
    <div className="global-footer">
      <p>React Pluggable Layouts © {new Date().getFullYear()}</p>
      <p><small>This component was registered outside the React component tree</small></p>
    </div>
  );
};

export default GlobalFooter; 