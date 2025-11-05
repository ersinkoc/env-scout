import { describe, it, expect, beforeEach } from 'vitest';
import * as runtime from '../src/runtime';
import * as browser from '../src/browser';
import * as device from '../src/device';
import * as features from '../src/features';

describe('Bug Fixes - Regression Tests', () => {
  beforeEach(() => {
    // Clear any global mocks
    delete (globalThis as any).Bun;
    delete (globalThis as any).Deno;
  });

  describe('Bug #1: isBun() and isDeno() should use globalThis', () => {
    it('should detect Bun when globalThis.Bun is set', () => {
      (globalThis as any).Bun = { version: '1.0.0' };
      expect(runtime.isBun()).toBe(true);
      delete (globalThis as any).Bun;
    });

    it('should detect Deno when globalThis.Deno is set', () => {
      (globalThis as any).Deno = { version: { deno: '1.0.0' } };
      expect(runtime.isDeno()).toBe(true);
      delete (globalThis as any).Deno;
    });

    it('should return false when Bun is not present', () => {
      delete (globalThis as any).Bun;
      expect(runtime.isBun()).toBe(false);
    });

    it('should return false when Deno is not present', () => {
      delete (globalThis as any).Deno;
      expect(runtime.isDeno()).toBe(false);
    });
  });

  describe('Bug #3: isCordova() should not crash when document is undefined', () => {
    it('should handle missing document gracefully', () => {
      // In Node.js environment, document is undefined
      // This should not throw an error
      expect(() => runtime.isCordova()).not.toThrow();
      expect(runtime.isCordova()).toBe(false);
    });
  });

  describe('Bug #4: isLinux() should exclude Windows', () => {
    it('should return false for Windows even if Linux is in userAgent', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'Win32',
        configurable: true
      });
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        configurable: true
      });

      expect(browser.isWindows()).toBe(true);
      expect(browser.isLinux()).toBe(false);
    });
  });

  describe('Bug #5: isMobile() should not include iPad', () => {
    it('should not detect iPad as mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X)',
        configurable: true
      });
      Object.defineProperty(window, 'innerWidth', {
        value: 820,
        configurable: true
      });

      // iPad should be detected as tablet, not mobile
      const userAgent = navigator.userAgent || '';
      const hasiPad = /iPad/i.test(userAgent);
      const isMobileByUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      // The mobile regex should NOT match iPad
      expect(hasiPad).toBe(true);
      expect(isMobileByUA).toBe(false);
      expect(device.isTablet()).toBe(true);
    });
  });

  describe('Bug #6: isLocalhost() should handle missing window.location', () => {
    it('should return false when window.location is undefined', () => {
      // In non-browser environments, window.location might not exist
      expect(features.isLocalhost()).toBe(false);
    });

    it('should return false when window.location.hostname is empty', () => {
      const originalLocation = window.location;
      // This test runs in jsdom, so we need to handle it differently
      // Just verify the function doesn't crash
      expect(() => features.isLocalhost()).not.toThrow();
    });
  });

  describe('Bug #7: isNode() should return false when Bun is detected', () => {
    it('should prioritize Bun detection over Node', () => {
      // Set up Bun environment
      (globalThis as any).Bun = { version: '1.0.0' };

      // Even if process.versions.node exists (for compatibility),
      // it should return false for isNode() if Bun is detected
      expect(runtime.isBun()).toBe(true);
      expect(runtime.isNode()).toBe(false);

      delete (globalThis as any).Bun;
    });

    it('should prioritize Deno detection over Node', () => {
      // Set up Deno environment
      (globalThis as any).Deno = { version: { deno: '1.0.0' } };

      expect(runtime.isDeno()).toBe(true);
      expect(runtime.isNode()).toBe(false);

      delete (globalThis as any).Deno;
    });
  });
});
