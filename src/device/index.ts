interface ScreenSize {
  width: number;
  height: number;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
         (window.innerWidth <= 768 && isTouchDevice());
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  return (/iPad/i.test(userAgent) || 
          (/Android/i.test(userAgent) && !/Mobile/i.test(userAgent))) ||
         (window.innerWidth > 768 && window.innerWidth <= 1024 && isTouchDevice());
}

export function isDesktop(): boolean {
  return !isMobile() && !isTablet();
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return ('ontouchstart' in window) ||
         (navigator.maxTouchPoints > 0) ||
         (navigator.msMaxTouchPoints !== undefined && navigator.msMaxTouchPoints > 0) ||
         (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

export function isRetina(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.devicePixelRatio > 1 ||
         (window.matchMedia && 
          window.matchMedia('(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)').matches);
}

export function getDeviceType(): string {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  if (isDesktop()) return 'desktop';
  return 'unknown';
}

export function getScreenSize(): ScreenSize | null {
  if (typeof window === 'undefined') return null;
  
  return {
    width: window.innerWidth || document.documentElement?.clientWidth || document.body?.clientWidth || 0,
    height: window.innerHeight || document.documentElement?.clientHeight || document.body?.clientHeight || 0
  };
}

export function getOrientation(): 'portrait' | 'landscape' | null {
  if (typeof window === 'undefined') return null;
  
  const orientation = (screen.orientation?.type || '').toLowerCase();
  if (orientation.includes('portrait')) return 'portrait';
  if (orientation.includes('landscape')) return 'landscape';
  
  const size = getScreenSize();
  if (size) {
    return size.width > size.height ? 'landscape' : 'portrait';
  }
  
  return null;
}

export function isSmallScreen(): boolean {
  const size = getScreenSize();
  return size ? size.width < 576 : false;
}

export function isMediumScreen(): boolean {
  const size = getScreenSize();
  return size ? size.width >= 576 && size.width < 1200 : false;
}

export function isLargeScreen(): boolean {
  const size = getScreenSize();
  return size ? size.width >= 1200 : false;
}

export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function isLightMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getColorScheme(): 'dark' | 'light' | 'no-preference' {
  if (isDarkMode()) return 'dark';
  if (isLightMode()) return 'light';
  return 'no-preference';
}

export function getSystemLanguage(): string | null {
  if (typeof navigator === 'undefined') return null;
  
  return navigator.language || navigator.languages?.[0] || null;
}

export function getTimezone(): string | null {
  if (typeof Intl === 'undefined') return null;
  
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return null;
  }
}