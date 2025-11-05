import * as runtime from '../runtime';
import * as browser from '../browser';
import * as device from '../device';
import * as network from '../network';
import * as features from '../features';

export interface EnvironmentInfo {
  runtime: string;
  browser: ReturnType<typeof browser.getBrowser>;
  os: string;
  device: {
    type: string;
    touch: boolean;
    retina: boolean;
  };
  screen: {
    width: number;
    height: number;
    orientation: 'portrait' | 'landscape' | null;
  };
  network: {
    online: boolean;
    type: string | null;
    slow: boolean;
  };
  features: Record<string, boolean>;
  preferences: {
    colorScheme: 'dark' | 'light' | 'no-preference';
    reducedMotion: boolean;
    language: string | null;
    timezone: string | null;
  };
}

export function getEnvironmentInfo(): EnvironmentInfo {
  return {
    runtime: runtime.getRuntimeEnvironment(),
    browser: browser.getBrowser(),
    os: browser.getOS(),
    device: {
      type: device.getDeviceType(),
      touch: device.isTouchDevice(),
      retina: device.isRetina()
    },
    screen: {
      width: device.getScreenSize()?.width || 0,
      height: device.getScreenSize()?.height || 0,
      orientation: device.getOrientation()
    },
    network: {
      online: network.isOnline(),
      type: network.getConnectionType(),
      slow: network.isSlowConnection()
    },
    features: features.checkFeatureSupport([
      'webgl',
      'webgl2',
      'canvas',
      'webassembly',
      'serviceworker',
      'notification',
      'geolocation'
    ]),
    preferences: {
      colorScheme: device.getColorScheme(),
      reducedMotion: device.prefersReducedMotion(),
      language: device.getSystemLanguage(),
      timezone: device.getTimezone()
    }
  };
}

export function isEnvironment(conditions: string[]): boolean {
  const conditionMap: Record<string, () => boolean> = {
    // Runtime
    browser: runtime.isBrowser,
    node: runtime.isNode,
    bun: runtime.isBun,
    deno: runtime.isDeno,
    electron: runtime.isElectron,
    jsdom: runtime.isJsDom,
    'react-native': runtime.isReactNative,
    capacitor: runtime.isCapacitor,
    cordova: runtime.isCordova,
    tauri: runtime.isTauri,
    'web-worker': runtime.isWebWorker,
    'service-worker': runtime.isServiceWorker,
    
    // Browser
    chrome: browser.isChrome,
    firefox: browser.isFirefox,
    safari: browser.isSafari,
    edge: browser.isEdge,
    opera: browser.isOpera,
    headless: browser.isHeadlessBrowser,
    
    // OS
    macos: browser.isMacOs,
    windows: browser.isWindows,
    linux: browser.isLinux,
    ios: browser.isIos,
    android: browser.isAndroid,
    
    // Device
    mobile: device.isMobile,
    tablet: device.isTablet,
    desktop: device.isDesktop,
    touch: device.isTouchDevice,
    retina: device.isRetina,
    'small-screen': device.isSmallScreen,
    'medium-screen': device.isMediumScreen,
    'large-screen': device.isLargeScreen,
    'dark-mode': device.isDarkMode,
    'light-mode': device.isLightMode,
    
    // Network
    online: network.isOnline,
    offline: network.isOffline,
    'slow-connection': network.isSlowConnection,
    
    // Features
    https: features.isHTTPS,
    webgl: features.hasWebGL,
    webgl2: features.hasWebGL2,
    canvas: features.hasCanvas,
    webassembly: features.hasWebAssembly,
    pwa: features.isPWA,
    standalone: features.isStandalone,
    iframe: features.isIframe,
    localhost: features.isLocalhost,
    development: features.isDevelopment,
    production: features.isProduction,
    bot: features.isBot
  };
  
  return conditions.every(condition => {
    const checkFn = conditionMap[condition.toLowerCase()];
    return checkFn ? checkFn() : false;
  });
}