import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as runtime from '../src/runtime';

describe('Runtime Detection', () => {
  const originalWindow = global.window;
  const originalProcess = global.process;
  const originalGlobal = global.global;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.window = originalWindow;
    global.process = originalProcess;
    global.global = originalGlobal;
  });

  describe('isBrowser', () => {
    it('should return true in browser environment', () => {
      global.window = { document: {} } as any;
      expect(runtime.isBrowser()).toBe(true);
    });

    it('should return false in non-browser environment', () => {
      global.window = undefined as any;
      expect(runtime.isBrowser()).toBe(false);
    });

    it('should return false in jsdom environment', () => {
      global.window = { 
        document: {},
        navigator: { userAgent: 'jsdom' }
      } as any;
      expect(runtime.isBrowser()).toBe(false);
    });
  });

  describe('isNode', () => {
    it('should return true in Node environment', () => {
      global.process = { 
        versions: { node: '18.0.0' }
      } as any;
      global.global = {} as any;
      expect(runtime.isNode()).toBe(true);
    });

    it('should return false when not in Node', () => {
      global.process = undefined as any;
      expect(runtime.isNode()).toBe(false);
    });

    it('should return false in Bun environment', () => {
      global.process = { 
        versions: { node: '18.0.0' }
      } as any;
      global.global = { Bun: { version: '1.0.0' } } as any;
      expect(runtime.isNode()).toBe(false);
    });
  });

  describe('isBun', () => {
    it('should return true in Bun environment', () => {
      global.global = { Bun: { version: '1.0.0' } } as any;
      expect(runtime.isBun()).toBe(true);
    });

    it('should return false when not in Bun', () => {
      global.global = {} as any;
      expect(runtime.isBun()).toBe(false);
    });
  });

  describe('isDeno', () => {
    it('should return true in Deno environment', () => {
      global.global = { Deno: { version: { deno: '1.0.0' } } } as any;
      expect(runtime.isDeno()).toBe(true);
    });

    it('should return false when not in Deno', () => {
      global.global = {} as any;
      expect(runtime.isDeno()).toBe(false);
    });
  });

  describe('isElectron', () => {
    it('should return true in Electron environment', () => {
      global.process = { 
        versions: { electron: '20.0.0' }
      } as any;
      expect(runtime.isElectron()).toBe(true);
    });

    it('should return false when not in Electron', () => {
      global.process = { versions: {} } as any;
      expect(runtime.isElectron()).toBe(false);
    });
  });

  describe('isReactNative', () => {
    it('should return true when ReactNativeWebView exists', () => {
      global.window = { ReactNativeWebView: {} } as any;
      expect(runtime.isReactNative()).toBe(true);
    });

    it('should return true when navigator.product is ReactNative', () => {
      global.window = {} as any;
      global.navigator = { product: 'ReactNative' } as any;
      expect(runtime.isReactNative()).toBe(true);
    });

    it('should return false when not in React Native', () => {
      global.window = {} as any;
      global.navigator = {} as any;
      expect(runtime.isReactNative()).toBe(false);
    });
  });

  describe('isWebWorker', () => {
    it('should return true in web worker environment', () => {
      global.self = {} as any;
      global.importScripts = (() => {}) as any;
      global.navigator = undefined as any;
      expect(runtime.isWebWorker()).toBe(true);
    });

    it('should return false when not in web worker', () => {
      global.self = undefined as any;
      global.importScripts = undefined as any;
      expect(runtime.isWebWorker()).toBe(false);
    });

    it('should return false in jsdom environment', () => {
      global.self = {} as any;
      global.importScripts = (() => {}) as any;
      global.navigator = { userAgent: 'jsdom' } as any;
      expect(runtime.isWebWorker()).toBe(false);
    });
  });

  describe('getRuntimeEnvironment', () => {
    it('should return correct runtime environment string', () => {
      global.window = { document: {} } as any;
      expect(runtime.getRuntimeEnvironment()).toBe('browser');
      
      global.window = undefined as any;
      global.process = { 
        versions: { node: '18.0.0' }
      } as any;
      global.global = {} as any;
      expect(runtime.getRuntimeEnvironment()).toBe('node');
    });

    it('should return unknown for unrecognized environment', () => {
      global.window = undefined as any;
      global.process = undefined as any;
      global.global = {} as any;
      expect(runtime.getRuntimeEnvironment()).toBe('unknown');
    });
  });
});