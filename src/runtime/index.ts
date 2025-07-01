declare global {
  interface Window {
    Deno?: any;
    Bun?: any;
    cordova?: any;
    Capacitor?: any;
    __TAURI__?: any;
    ReactNativeWebView?: any;
  }
  var Deno: any;
  var Bun: any;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined' && !isJsDom();
}

export function isNode(): boolean {
  return typeof process !== 'undefined' && 
         process.versions != null && 
         process.versions.node != null &&
         !isBun() &&
         !isDeno();
}

export function isBun(): boolean {
  return typeof global !== 'undefined' && 
         typeof global.Bun !== 'undefined' &&
         global.Bun?.version != null;
}

export function isDeno(): boolean {
  return typeof global !== 'undefined' && 
         typeof global.Deno !== 'undefined' &&
         global.Deno?.version != null;
}

export function isElectron(): boolean {
  return typeof process !== 'undefined' && 
         process.versions != null && 
         process.versions.electron != null;
}

export function isJsDom(): boolean {
  return typeof window !== 'undefined' && 
         window.navigator?.userAgent?.includes('jsdom') === true;
}

export function isReactNative(): boolean {
  return typeof window !== 'undefined' && 
         (window.ReactNativeWebView != null || 
          (typeof navigator !== 'undefined' && navigator.product === 'ReactNative'));
}

export function isCapacitor(): boolean {
  return typeof window !== 'undefined' && 
         window.Capacitor != null;
}

export function isCordova(): boolean {
  return typeof window !== 'undefined' && 
         (window.cordova != null || document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
}

export function isTauri(): boolean {
  return typeof window !== 'undefined' && 
         window.__TAURI__ != null;
}

export function isWebWorker(): boolean {
  return typeof self !== 'undefined' && 
         typeof importScripts === 'function' &&
         (typeof navigator === 'undefined' || navigator.userAgent?.includes('jsdom') !== true);
}

export function isDedicatedWorker(): boolean {
  return isWebWorker() && 
         typeof DedicatedWorkerGlobalScope !== 'undefined' &&
         self instanceof DedicatedWorkerGlobalScope;
}

export function isSharedWorker(): boolean {
  return isWebWorker() && 
         typeof SharedWorkerGlobalScope !== 'undefined' &&
         self instanceof SharedWorkerGlobalScope;
}

export function isServiceWorker(): boolean {
  return isWebWorker() && 
         typeof ServiceWorkerGlobalScope !== 'undefined' &&
         self instanceof ServiceWorkerGlobalScope;
}

export function getRuntimeEnvironment(): string {
  if (isServiceWorker()) return 'service-worker';
  if (isDedicatedWorker()) return 'dedicated-worker';
  if (isSharedWorker()) return 'shared-worker';
  if (isWebWorker()) return 'web-worker';
  if (isTauri()) return 'tauri';
  if (isCapacitor()) return 'capacitor';
  if (isCordova()) return 'cordova';
  if (isReactNative()) return 'react-native';
  if (isElectron()) return 'electron';
  if (isJsDom()) return 'jsdom';
  if (isBun()) return 'bun';
  if (isDeno()) return 'deno';
  if (isNode()) return 'node';
  if (isBrowser()) return 'browser';
  return 'unknown';
}