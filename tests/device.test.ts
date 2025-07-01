import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as device from '../src/device';

describe('Device Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window properties
    Object.defineProperty(window, 'innerWidth', {
      value: 1920,
      configurable: true
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1080,
      configurable: true
    });
  });

  describe('Device type detection', () => {
    it('should detect mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
        configurable: true
      });
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        configurable: true
      });
      
      expect(device.isMobile()).toBe(true);
      expect(device.isTablet()).toBe(false);
      expect(device.isDesktop()).toBe(false);
    });

    it('should detect tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X)',
        configurable: true
      });
      Object.defineProperty(window, 'innerWidth', {
        value: 820,
        configurable: true
      });
      
      expect(device.isTablet()).toBe(true);
      expect(device.isMobile()).toBe(false);
      expect(device.isDesktop()).toBe(false);
    });

    it('should detect desktop device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        configurable: true
      });
      Object.defineProperty(window, 'innerWidth', {
        value: 1920,
        configurable: true
      });
      
      expect(device.isDesktop()).toBe(true);
      expect(device.isMobile()).toBe(false);
      expect(device.isTablet()).toBe(false);
    });
  });

  describe('Touch and display detection', () => {
    it('should detect touch device', () => {
      Object.defineProperty(window, 'ontouchstart', {
        value: () => {},
        configurable: true
      });
      
      expect(device.isTouchDevice()).toBe(true);
    });

    it('should detect retina display', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: 2,
        configurable: true
      });
      
      expect(device.isRetina()).toBe(true);
    });
  });

  describe('Screen size functions', () => {
    it('should return correct screen size', () => {
      const size = device.getScreenSize();
      expect(size).toEqual({ width: 1920, height: 1080 });
    });

    it('should detect small screen', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 400,
        configurable: true
      });
      
      expect(device.isSmallScreen()).toBe(true);
      expect(device.isMediumScreen()).toBe(false);
      expect(device.isLargeScreen()).toBe(false);
    });

    it('should detect medium screen', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 800,
        configurable: true
      });
      
      expect(device.isSmallScreen()).toBe(false);
      expect(device.isMediumScreen()).toBe(true);
      expect(device.isLargeScreen()).toBe(false);
    });

    it('should detect large screen', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 1400,
        configurable: true
      });
      
      expect(device.isSmallScreen()).toBe(false);
      expect(device.isMediumScreen()).toBe(false);
      expect(device.isLargeScreen()).toBe(true);
    });
  });

  describe('Orientation detection', () => {
    it('should detect portrait orientation', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 768,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1024,
        configurable: true
      });
      
      expect(device.getOrientation()).toBe('portrait');
    });

    it('should detect landscape orientation', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 768,
        configurable: true
      });
      
      expect(device.getOrientation()).toBe('landscape');
    });
  });

  describe('User preferences', () => {
    it('should detect dark mode preference', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }));
      
      expect(device.isDarkMode()).toBe(true);
      expect(device.isLightMode()).toBe(false);
      expect(device.getColorScheme()).toBe('dark');
    });

    it('should detect light mode preference', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }));
      
      expect(device.isDarkMode()).toBe(false);
      expect(device.isLightMode()).toBe(true);
      expect(device.getColorScheme()).toBe('light');
    });

    it('should detect reduced motion preference', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }));
      
      expect(device.prefersReducedMotion()).toBe(true);
    });
  });

  describe('System information', () => {
    it('should return system language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'en-US',
        configurable: true
      });
      
      expect(device.getSystemLanguage()).toBe('en-US');
    });

    it('should return timezone', () => {
      const timezone = device.getTimezone();
      expect(timezone).toBeTruthy();
      expect(typeof timezone).toBe('string');
    });
  });
});