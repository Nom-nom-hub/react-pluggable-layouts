import React from 'react';
import { DefaultHeader } from './DefaultHeader';
import DefaultFooter from './DefaultFooter';
import ExampleLayoutSelector from './ExampleLayoutSelector';

// import logo and styles
import * as styles from '../styles';

export const Main: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}>
      <DefaultHeader />
      
      <main style={{ 
        flex: '1',
        padding: '40px 0',
        width: '100%'
      }}>
        <div style={{
          background: 'linear-gradient(to bottom right, rgba(100, 108, 255, 0.05), rgba(168, 136, 255, 0.05))',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(100, 108, 255, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.6rem', 
            marginTop: 0,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #646cff, #a488ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Layout Examples
          </h2>
          
          <p style={{ 
            marginBottom: '25px',
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--color-text)',
            opacity: 0.85,
            maxWidth: '800px'
          }}>
            Below are examples demonstrating React Pluggable Layouts. You can switch between different layout 
            configurations to see how the content adapts. This shows how you can create flexible, reusable, 
            and composition-friendly layouts for your React applications.
          </p>
          
          <ExampleLayoutSelector />
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '20px',
            color: 'var(--color-heading)' 
          }}>
            Key Features
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <FeatureCard 
              title="Composition-Friendly" 
              description="Create complex layouts using simple, composable building blocks that can be arranged in various ways."
              icon="🧩"
            />
            <FeatureCard 
              title="Fully Typed" 
              description="Complete TypeScript support ensures type safety throughout your layout components."
              icon="📝"
            />
            <FeatureCard 
              title="Framework Agnostic" 
              description="Works with any React-based framework including Next.js, Remix, and others."
              icon="🔄"
            />
            <FeatureCard 
              title="Responsive Layouts" 
              description="Easily create layouts that adapt to different screen sizes and device types."
              icon="📱"
            />
          </div>
        </div>
      </main>
      
      <DefaultFooter />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      background: 'var(--color-background-soft)',
      border: '1px solid var(--color-border)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      height: '100%',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ 
        fontSize: '2rem', 
        marginBottom: '12px' 
      }}>
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '1.1rem', 
        marginTop: 0, 
        marginBottom: '10px',
        color: 'var(--color-heading)'
      }}>
        {title}
      </h3>
      <p style={{ 
        margin: 0, 
        fontSize: '0.9rem', 
        lineHeight: 1.5,
        color: 'var(--color-text)',
        opacity: 0.85
      }}>
        {description}
      </p>
    </div>
  );
};

export default Main; 