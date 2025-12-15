/**
 * Advanced TypeScript Example for @oxog/env-scout
 * Demonstrates type-safe environment detection and conditional logic
 */

import {
  EnvironmentInfo,
  BrowserInfo,
  isEnvironment,
  getEnvironmentInfo,
  checkFeatureSupport,
  isBrowser,
  isNode,
  isDevelopment,
  isProduction,
  getOS,
  getBrowser,
  getDeviceType,
  isOnline,
  getConnectionType,
  isDarkMode,
  prefersReducedMotion
} from '@oxog/env-scout';

// Type-safe configuration based on environment
interface AppConfig {
  apiUrl: string;
  debug: boolean;
  features: {
    analytics: boolean;
    errorReporting: boolean;
    performanceMonitoring: boolean;
  };
  optimization: {
    lazyLoading: boolean;
    compression: boolean;
    caching: boolean;
  };
}

class EnvironmentAwareApp {
  private config: AppConfig;
  private envInfo: EnvironmentInfo;

  constructor() {
    this.envInfo = getEnvironmentInfo();
    this.config = this.generateConfig();
  }

  /**
   * Generate configuration based on detected environment
   */
  private generateConfig(): AppConfig {
    const baseConfig: AppConfig = {
      apiUrl: 'https://api.example.com',
      debug: false,
      features: {
        analytics: true,
        errorReporting: true,
        performanceMonitoring: false
      },
      optimization: {
        lazyLoading: false,
        compression: true,
        caching: true
      }
    };

    // Development overrides
    if (isDevelopment()) {
      baseConfig.apiUrl = 'http://localhost:3000';
      baseConfig.debug = true;
      baseConfig.features.analytics = false;
      baseConfig.features.errorReporting = false;
    }

    // Mobile optimizations
    if (isEnvironment(['mobile']) || isEnvironment(['tablet'])) {
      baseConfig.optimization.lazyLoading = true;
      baseConfig.optimization.compression = true;
    }

    // Slow connection optimizations
    if (isEnvironment(['slow-connection'])) {
      baseConfig.optimization.caching = true;
      baseConfig.features.performanceMonitoring = false;
    }

    return baseConfig;
  }

  /**
   * Initialize features based on capabilities
   */
  public async initializeFeatures(): Promise<void> {
    const features = checkFeatureSupport([
      'webgl2',
      'webassembly',
      'serviceworker',
      'notification'
    ]);

    // Initialize 3D features if WebGL2 is available
    if (features.webgl2) {
      await this.init3DFeatures();
    }

    // Initialize performance features if WebAssembly is available
    if (features.webassembly) {
      await this.initHighPerformanceFeatures();
    }

    // Initialize offline features if Service Worker is available
    if (features.serviceworker && isEnvironment(['https'])) {
      await this.initOfflineFeatures();
    }

    // Initialize notifications if supported and permitted
    if (features.notification && isEnvironment(['browser'])) {
      await this.initNotifications();
    }
  }

  /**
   * Load polyfills based on browser capabilities
   */
  public async loadPolyfills(): Promise<void> {
    const browser = getBrowser();
    
    if (!browser) return;

    const polyfills: string[] = [];

    // IE11 and older browsers
    if (browser.name === 'ie' || parseInt(browser.version) < 60) {
      polyfills.push('promise', 'fetch', 'object-assign');
    }

    // Older Safari
    if (browser.name === 'safari' && parseInt(browser.version) < 12) {
      polyfills.push('intersection-observer');
    }

    if (polyfills.length > 0) {
      console.log(`Loading polyfills: ${polyfills.join(', ')}`);
      // In real app: dynamically import polyfills
    }
  }

  /**
   * Get optimized asset URLs based on device capabilities
   */
  public getAssetUrl(assetName: string): string {
    const base = '/assets/';
    
    // Use WebP for modern browsers
    if (isEnvironment(['chrome']) || isEnvironment(['edge'])) {
      return `${base}webp/${assetName}.webp`;
    }

    // Use 2x assets for retina displays
    if (isEnvironment(['retina'])) {
      return `${base}2x/${assetName}@2x.png`;
    }

    // Use compressed assets for mobile
    if (isEnvironment(['mobile'])) {
      return `${base}compressed/${assetName}.jpg`;
    }

    return `${base}${assetName}.png`;
  }

  /**
   * Setup performance monitoring based on environment
   */
  public setupMonitoring(): void {
    if (!this.config.features.performanceMonitoring) return;

    // Only monitor in production
    if (!isProduction()) return;

    // Don't monitor bots
    if (isEnvironment(['bot'])) return;

    console.log('Setting up performance monitoring...');
    // Real implementation would initialize monitoring service
  }

  /**
   * Get user preferences
   */
  public getUserPreferences(): {
    theme: 'dark' | 'light';
    motion: 'full' | 'reduced';
    dataUsage: 'full' | 'reduced';
  } {
    return {
      theme: isDarkMode() ? 'dark' : 'light',
      motion: prefersReducedMotion() ? 'reduced' : 'full',
      dataUsage: isEnvironment(['slow-connection']) ? 'reduced' : 'full'
    };
  }

  // Feature initialization methods
  private async init3DFeatures(): Promise<void> {
    console.log('Initializing 3D features with WebGL2...');
  }

  private async initHighPerformanceFeatures(): Promise<void> {
    console.log('Initializing high-performance features with WebAssembly...');
  }

  private async initOfflineFeatures(): Promise<void> {
    console.log('Initializing offline features with Service Worker...');
  }

  private async initNotifications(): Promise<void> {
    console.log('Initializing notification features...');
  }

  /**
   * Log environment information
   */
  public logEnvironment(): void {
    console.log('=== Environment Information ===');
    console.log(`Runtime: ${this.envInfo.runtime}`);
    console.log(`OS: ${this.envInfo.os}`);
    console.log(`Device: ${this.envInfo.device.type}`);
    console.log(`Browser: ${this.envInfo.browser?.name} ${this.envInfo.browser?.version}`);
    console.log(`Online: ${this.envInfo.network.online}`);
    console.log(`Configuration:`, this.config);
  }
}

// Usage example
async function main() {
  const app = new EnvironmentAwareApp();
  
  // Log environment
  app.logEnvironment();

  // Load necessary polyfills
  await app.loadPolyfills();

  // Initialize features
  await app.initializeFeatures();

  // Setup monitoring
  app.setupMonitoring();

  // Get user preferences
  const preferences = app.getUserPreferences();
  console.log('User preferences:', preferences);

  // Conditional module loading
  if (isEnvironment(['browser', 'desktop'])) {
    console.log('Loading desktop modules...');
    // const desktopModule = await import('./desktop-module');
  } else if (isEnvironment(['browser', 'mobile'])) {
    console.log('Loading mobile modules...');
    // const mobileModule = await import('./mobile-module');
  }

  // Example: Optimize API calls based on connection
  if (isOnline() && !isEnvironment(['slow-connection'])) {
    console.log('Fetching full data set...');
  } else {
    console.log('Fetching minimal data set...');
  }
}

// Run the example
if (isNode()) {
  main().catch(console.error);
}

export { EnvironmentAwareApp };