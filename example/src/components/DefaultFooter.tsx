import React from 'react';

const DefaultFooter: React.FC = () => {
  return (
    <footer className="default-footer">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px 0',
        width: '100%'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #646cff, #a488ff)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '14px',
              boxShadow: '0 2px 10px rgba(100, 108, 255, 0.2)'
            }}>
              PL
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>React Pluggable Layouts</span>
          </div>
          <p style={{ 
            margin: '0 0 12px 0', 
            opacity: 0.7, 
            fontSize: '0.9rem',
            maxWidth: '400px',
            lineHeight: '1.5'
          }}>
            A powerful and flexible system for building dynamic, pluggable layouts in React applications.
          </p>
          <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
            © {new Date().getFullYear()} • Released under MIT License
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.95rem' }}>Resources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <FooterLink href="https://github.com/Nom-nom-hub/react-pluggable-layouts">GitHub Repository</FooterLink>
            <FooterLink href="https://www.npmjs.com/package/react-pluggable-layouts">NPM Package</FooterLink>
            <FooterLink href="https://github.com/Nom-nom-hub/react-pluggable-layouts/issues">Issues</FooterLink>
            <FooterLink href="https://github.com/Nom-nom-hub/react-pluggable-layouts/blob/main/LICENSE">License</FooterLink>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.95rem' }}>Documentation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <FooterLink href="#getting-started">Getting Started</FooterLink>
            <FooterLink href="#examples">Examples</FooterLink>
            <FooterLink href="#api-reference">API Reference</FooterLink>
            <FooterLink href="#plugins">Plugins</FooterLink>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.95rem' }}>Community</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <FooterLink href="https://x.com/ReactPluggable">Twitter</FooterLink>
            <FooterLink href="#contribute">Contribute</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href}
      style={{
        color: 'inherit',
        opacity: 0.7,
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateX(3px)';
        e.currentTarget.style.color = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.color = 'inherit';
      }}
    >
      {children}
    </a>
  );
};

export default DefaultFooter; 