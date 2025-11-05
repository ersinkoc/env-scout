export function isHTTPS(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location?.protocol === 'https:';
}

export function hasWebGL(): boolean {
  if (typeof window === 'undefined' || !window.document) return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
             (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export function hasWebGL2(): boolean {
  if (typeof window === 'undefined' || !window.document) return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function hasCanvas(): boolean {
  if (typeof window === 'undefined' || !window.document) return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  } catch {
    return false;
  }
}

export function hasWebAssembly(): boolean {
  return typeof WebAssembly !== 'undefined' && 
         typeof WebAssembly.instantiate === 'function';
}

export function hasServiceWorkerSupport(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
}

export function hasNotificationSupport(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function hasGeolocationSupport(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

export function isBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'applebot', 'semrushbot', 'ahrefsbot', 'mj12bot',
    'dotbot', 'rogerbot', 'seznambot', 'turnitinbot', 'slackbot',
    'telegrambot', 'ia_archiver', 'adsbot', 'pingdom', 'lighthouse'
  ];
  
  return botPatterns.some(bot => userAgent.includes(bot));
}

export function isPWA(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

export function isIframe(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function isLocalhost(): boolean {
  if (typeof window === 'undefined' || !window.location || !window.location.hostname) return false;

  const hostname = window.location.hostname;
  return hostname === 'localhost' ||
         hostname === '127.0.0.1' ||
         hostname === '[::1]' ||
         hostname.startsWith('192.168.') ||
         hostname.startsWith('10.');
}

export function isDevelopment(): boolean {
  // If NODE_ENV is explicitly set to production, don't override it
  if (process?.env?.NODE_ENV === 'production' || process?.env?.NODE_ENV === 'prod') {
    return false;
  }
  return process?.env?.NODE_ENV === 'development' ||
         process?.env?.NODE_ENV === 'dev' ||
         isLocalhost();
}

export function isProduction(): boolean {
  return process?.env?.NODE_ENV === 'production' ||
         process?.env?.NODE_ENV === 'prod';
}

export function checkFeatureSupport(features: string[]): Record<string, boolean> {
  const support: Record<string, boolean> = {};
  
  const featureMap: Record<string, () => boolean> = {
    webgl: hasWebGL,
    webgl2: hasWebGL2,
    canvas: hasCanvas,
    webassembly: hasWebAssembly,
    serviceworker: hasServiceWorkerSupport,
    notification: hasNotificationSupport,
    geolocation: hasGeolocationSupport
  };
  
  for (const feature of features) {
    const checkFn = featureMap[feature.toLowerCase()];
    support[feature] = checkFn ? checkFn() : false;
  }
  
  return support;
}