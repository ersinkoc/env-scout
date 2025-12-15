/**
 * React Component Example with @oxog/env-scout
 * Demonstrates environment-aware React components
 */

import React, { useEffect, useState } from 'react';
import {
  isMobile,
  isTablet,
  isDesktop,
  isDarkMode,
  isOnline,
  getEnvironmentInfo,
  isEnvironment,
  checkFeatureSupport,
  prefersReducedMotion,
  getScreenSize,
  type EnvironmentInfo
} from '@oxog/env-scout';

// Custom hook for environment detection
export function useEnvironment() {
  const [env, setEnv] = useState<EnvironmentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const envInfo = getEnvironmentInfo();
    setEnv(envInfo);
    setIsLoading(false);
  }, []);

  return { env, isLoading };
}

// Custom hook for responsive design
export function useResponsive() {
  const [viewport, setViewport] = useState({
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    screenSize: getScreenSize()
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        screenSize: getScreenSize()
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}

// Custom hook for user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    darkMode: isDarkMode(),
    reducedMotion: prefersReducedMotion(),
    isOnline: isOnline()
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setPreferences({
        darkMode: isDarkMode(),
        reducedMotion: prefersReducedMotion(),
        isOnline: isOnline()
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    motionQuery.addEventListener('change', handleChange);
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      motionQuery.removeEventListener('change', handleChange);
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
  }, []);

  return preferences;
}

// Environment-aware component wrapper
interface EnvAwareProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  conditions: string[];
}

export const EnvAware: React.FC<EnvAwareProps> = ({ 
  children, 
  fallback = null, 
  conditions 
}) => {
  const shouldRender = isEnvironment(conditions);
  return <>{shouldRender ? children : fallback}</>;
};

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  className 
}) => {
  const getSrc = () => {
    const ext = src.split('.').pop();
    const baseName = src.replace(`.${ext}`, '');

    // Use WebP for supported browsers
    if (isEnvironment(['chrome']) || isEnvironment(['edge'])) {
      return `${baseName}.webp`;
    }

    // Use 2x for retina displays
    if (isEnvironment(['retina'])) {
      return `${baseName}@2x.${ext}`;
    }

    // Use compressed version for mobile
    if (isEnvironment(['mobile'])) {
      return `${baseName}-mobile.${ext}`;
    }

    return src;
  };

  return (
    <img 
      src={getSrc()} 
      alt={alt} 
      className={className}
      loading={isEnvironment(['mobile']) ? 'lazy' : 'eager'}
    />
  );
};

// Feature detection component
export const FeatureGate: React.FC<{
  features: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ features, children, fallback }) => {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const support = checkFeatureSupport(features);
    const allSupported = features.every(f => support[f]);
    setSupported(allSupported);
  }, [features]);

  return <>{supported ? children : fallback}</>;
};

// Main demo component
export const EnvironmentDashboard: React.FC = () => {
  const { env, isLoading } = useEnvironment();
  const viewport = useResponsive();
  const preferences = useUserPreferences();

  if (isLoading || !env) {
    return <div>Loading environment information...</div>;
  }

  return (
    <div className={`dashboard ${preferences.darkMode ? 'dark' : 'light'}`}>
      <h1>Environment Dashboard</h1>

      {/* Device-specific content */}
      <EnvAware conditions={['mobile']}>
        <div className="mobile-layout">
          <h2>Mobile Experience</h2>
          <p>Optimized for touch interaction</p>
        </div>
      </EnvAware>

      <EnvAware conditions={['desktop']}>
        <div className="desktop-layout">
          <h2>Desktop Experience</h2>
          <p>Full-featured interface with advanced controls</p>
        </div>
      </EnvAware>

      {/* Connection-aware content */}
      <EnvAware 
        conditions={['online']} 
        fallback={<div className="offline-message">You are currently offline</div>}
      >
        <div className="online-content">
          <h3>Connected</h3>
          <p>All features available</p>
        </div>
      </EnvAware>

      {/* Feature-based content */}
      <FeatureGate 
        features={['webgl2']} 
        fallback={<div>3D features not available</div>}
      >
        <div className="3d-content">
          <h3>3D Graphics Available</h3>
          <p>WebGL2 supported - enhanced graphics enabled!</p>
        </div>
      </FeatureGate>

      {/* Environment info display */}
      <div className="env-info">
        <h3>Current Environment</h3>
        <ul>
          <li>Runtime: {env.runtime}</li>
          <li>OS: {env.os}</li>
          <li>Browser: {env.browser?.name} {env.browser?.version}</li>
          <li>Device: {env.device.type}</li>
          <li>Screen: {viewport.screenSize?.width}x{viewport.screenSize?.height}</li>
          <li>Dark Mode: {preferences.darkMode ? 'Yes' : 'No'}</li>
          <li>Online: {preferences.isOnline ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      {/* Responsive grid */}
      <div className={`grid ${viewport.isMobile ? 'mobile' : ''} ${viewport.isTablet ? 'tablet' : ''}`}>
        <div className="card">Card 1</div>
        <div className="card">Card 2</div>
        <div className="card">Card 3</div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .dark {
          background: #1a1a1a;
          color: #f0f0f0;
        }

        .light {
          background: #ffffff;
          color: #333333;
        }

        .grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .grid.mobile {
          grid-template-columns: 1fr;
        }

        .grid.tablet {
          grid-template-columns: repeat(2, 1fr);
        }

        .grid:not(.mobile):not(.tablet) {
          grid-template-columns: repeat(3, 1fr);
        }

        .card {
          padding: 20px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }

        .dark .card {
          background: rgba(255, 255, 255, 0.05);
        }

        .offline-message {
          padding: 20px;
          background: #ffe6e6;
          border-radius: 8px;
          text-align: center;
        }

        .env-info ul {
          list-style: none;
          padding: 0;
        }

        .env-info li {
          padding: 5px 0;
        }
      `}</style>
    </div>
  );
};

// Example usage in App component
export default function App() {
  return (
    <div className="app">
      <EnvironmentDashboard />
    </div>
  );
}