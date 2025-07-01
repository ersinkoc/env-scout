import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as features from '../src/features';

describe('Feature Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('HTTPS detection', () => {
    it('should detect HTTPS connection', () => {
      Object.defineProperty(window, 'location', {
        value: { protocol: 'https:' },
        configurable: true
      });
      
      expect(features.isHTTPS()).toBe(true);
    });

    it('should detect non-HTTPS connection', () => {
      Object.defineProperty(window, 'location', {
        value: { protocol: 'http:' },
        configurable: true
      });
      
      expect(features.isHTTPS()).toBe(false);
    });
  });

  describe('WebGL detection', () => {
    it('should detect WebGL support', () => {
      const mockCanvas = {
        getContext: vi.fn().mockReturnValue({})
      };
      document.createElement = vi.fn().mockReturnValue(mockCanvas);
      (window as any).WebGLRenderingContext = {};
      
      expect(features.hasWebGL()).toBe(true);
    });

    it('should detect WebGL2 support', () => {
      const mockCanvas = {
        getContext: vi.fn().mockReturnValue({})
      };
      document.createElement = vi.fn().mockReturnValue(mockCanvas);
      (window as any).WebGL2RenderingContext = {};
      
      expect(features.hasWebGL2()).toBe(true);
    });
  });

  describe('Canvas detection', () => {
    it('should detect canvas support', () => {
      const mockCanvas = {
        getContext: vi.fn().mockReturnValue({})
      };
      document.createElement = vi.fn().mockReturnValue(mockCanvas);
      
      expect(features.hasCanvas()).toBe(true);
    });
  });

  describe('WebAssembly detection', () => {
    it('should detect WebAssembly support', () => {
      (global as any).WebAssembly = {
        instantiate: () => {}
      };
      
      expect(features.hasWebAssembly()).toBe(true);
    });

    it('should detect no WebAssembly support', () => {
      (global as any).WebAssembly = undefined;
      
      expect(features.hasWebAssembly()).toBe(false);
    });
  });

  describe('Service Worker detection', () => {
    it('should detect service worker support', () => {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        configurable: true
      });
      
      expect(features.hasServiceWorkerSupport()).toBe(true);
    });
  });

  describe('Notification detection', () => {
    it('should detect notification support', () => {
      (window as any).Notification = {};
      
      expect(features.hasNotificationSupport()).toBe(true);
    });
  });

  describe('Geolocation detection', () => {
    it('should detect geolocation support', () => {
      Object.defineProperty(navigator, 'geolocation', {
        value: {},
        configurable: true
      });
      
      expect(features.hasGeolocationSupport()).toBe(true);
    });
  });

  describe('Bot detection', () => {
    it('should detect search engine bots', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        configurable: true
      });
      
      expect(features.isBot()).toBe(true);
    });

    it('should not detect regular users as bots', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        configurable: true
      });
      
      expect(features.isBot()).toBe(false);
    });
  });

  describe('PWA detection', () => {
    it('should detect PWA in standalone mode', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(display-mode: standalone)',
        media: query
      }));
      
      expect(features.isPWA()).toBe(true);
      expect(features.isStandalone()).toBe(true);
    });
  });

  describe('iframe detection', () => {
    it('should detect when running in iframe', () => {
      Object.defineProperty(window, 'self', {
        value: { name: 'iframe' },
        configurable: true
      });
      Object.defineProperty(window, 'top', {
        value: { name: 'parent' },
        configurable: true
      });
      
      expect(features.isIframe()).toBe(true);
    });
  });

  describe('Localhost detection', () => {
    it('should detect localhost', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        configurable: true
      });
      
      expect(features.isLocalhost()).toBe(true);
    });

    it('should detect 127.0.0.1', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '127.0.0.1' },
        configurable: true
      });
      
      expect(features.isLocalhost()).toBe(true);
    });

    it('should detect local network IPs', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '192.168.1.100' },
        configurable: true
      });
      
      expect(features.isLocalhost()).toBe(true);
    });
  });

  describe('Environment detection', () => {
    it('should detect development environment', () => {
      process.env.NODE_ENV = 'development';
      
      expect(features.isDevelopment()).toBe(true);
      expect(features.isProduction()).toBe(false);
    });

    it('should detect production environment', () => {
      process.env.NODE_ENV = 'production';
      
      expect(features.isDevelopment()).toBe(false);
      expect(features.isProduction()).toBe(true);
    });
  });

  describe('Feature support batch check', () => {
    it('should check multiple features at once', () => {
      const mockCanvas = {
        getContext: vi.fn().mockReturnValue({})
      };
      document.createElement = vi.fn().mockReturnValue(mockCanvas);
      (window as any).WebGLRenderingContext = {};
      (global as any).WebAssembly = {
        instantiate: () => {}
      };
      
      const support = features.checkFeatureSupport(['webgl', 'canvas', 'webassembly']);
      
      expect(support).toEqual({
        webgl: true,
        canvas: true,
        webassembly: true
      });
    });
  });
});