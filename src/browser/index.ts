export interface BrowserInfo {
  name: string;
  version: string;
}

function getUserAgent(): string {
  return (typeof navigator !== 'undefined' ? navigator.userAgent : '') || '';
}

function getVendor(): string {
  return (typeof navigator !== 'undefined' ? navigator.vendor : '') || '';
}

export function isChrome(): boolean {
  return /Chrome/.test(getUserAgent()) && /Google Inc/.test(getVendor()) && !isEdge() && !isOpera();
}

export function isFirefox(): boolean {
  const ua = getUserAgent();
  return /Firefox/.test(ua) && !/Seamonkey/.test(ua);
}

export function isSafari(): boolean {
  return /Safari/.test(getUserAgent()) && /Apple Computer/.test(getVendor()) && !isChrome() && !isEdge();
}

export function isEdge(): boolean {
  return /Edg/.test(getUserAgent());
}

export function isOpera(): boolean {
  const ua = getUserAgent();
  return /OPR/.test(ua) || /Opera/.test(ua);
}

export function getBrowser(): BrowserInfo | null {
  if (typeof navigator === 'undefined') return null;
  
  const ua = getUserAgent();
  let name = 'unknown';
  let version = '';
  
  if (isOpera()) {
    name = 'opera';
    const match = ua.match(/(?:OPR|Opera)[\/\s](\d+\.\d+)/);
    version = match?.[1] ?? '';
  } else if (isEdge()) {
    name = 'edge';
    const match = ua.match(/Edg[\/\s](\d+\.\d+)/);
    version = match?.[1] ?? '';
  } else if (isChrome()) {
    name = 'chrome';
    const match = ua.match(/Chrome[\/\s](\d+\.\d+)/);
    version = match?.[1] ?? '';
  } else if (isFirefox()) {
    name = 'firefox';
    const match = ua.match(/Firefox[\/\s](\d+\.\d+)/);
    version = match?.[1] ?? '';
  } else if (isSafari()) {
    name = 'safari';
    const match = ua.match(/Version[\/\s](\d+\.\d+)/);
    version = match?.[1] ?? '';
  }
  
  return { name, version };
}

export function isHeadlessBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check for explicit headless indicators
  if (/HeadlessChrome/.test(getUserAgent()) || navigator.webdriver === true) {
    return true;
  }

  // Only consider plugins/languages as indicators when combined with other suspicious signs
  const hasNoLanguages = navigator.languages?.length === 0;
  const hasNoPlugins = navigator.plugins && navigator.plugins.length === 0;

  // Both must be true for a positive headless detection (reduces false positives)
  return hasNoLanguages && hasNoPlugins;
}

export function isMacOs(): boolean {
  if (typeof navigator === 'undefined') return false;
  // Only match Mac, not iOS devices (iPhone, iPad, iPod)
  return /Mac/.test(navigator.platform) && !/iPhone|iPod|iPad/.test(navigator.platform) &&
         !/iPhone|iPod|iPad/.test(getUserAgent());
}

export function isWindows(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Win/.test(navigator.platform) || /Windows/.test(getUserAgent());
}

export function isLinux(): boolean {
  if (typeof navigator === 'undefined') return false;
  return !isWindows() && !isIos() && ((/Linux/.test(navigator.platform) || /Linux/.test(getUserAgent())) && !isAndroid());
}

export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod/.test(getUserAgent()) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/.test(getUserAgent());
}

export function getOS(): string {
  if (isWindows()) return 'windows';
  if (isMacOs() && !isIos()) return 'macos';
  if (isIos()) return 'ios';
  if (isAndroid()) return 'android';
  if (isLinux()) return 'linux';
  return 'unknown';
}