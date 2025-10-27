import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as utils from '../src/utils';

vi.mock('../src/runtime', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    getRuntimeEnvironment: () => 'browser',
    isBrowser: () => true,
    isNode: () => false,
  };
});

vi.mock('../src/features', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    checkFeatureSupport: (features) => {
      const support = {};
      features.forEach(f => {
        support[f] = true;
      });
      return support;
    }
  };
});

describe('Utility Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up a basic browser environment
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0',
      configurable: true
    });
    Object.defineProperty(navigator, 'vendor', {
      value: 'Google Inc.',
      configurable: true
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      configurable: true
    });
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true
    });
    Object.defineProperty(window, 'innerWidth', {
      value: 1920,
      configurable: true
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1080,
      configurable: true
    });
  });

  describe('getEnvironmentInfo', () => {
    it('should return complete environment information', () => {
      const info = utils.getEnvironmentInfo();
      
      expect(info).toHaveProperty('runtime');
      expect(info).toHaveProperty('browser');
      expect(info).toHaveProperty('os');
      expect(info).toHaveProperty('device');
      expect(info).toHaveProperty('screen');
      expect(info).toHaveProperty('network');
      expect(info).toHaveProperty('features');
      expect(info).toHaveProperty('preferences');
      
      expect(info.runtime).toBe('browser');
      expect(info.browser?.name).toBe('chrome');
      expect(info.os).toBe('windows');
      expect(info.device.type).toBe('desktop');
      expect(info.screen.width).toBe(1920);
      expect(info.screen.height).toBe(1080);
      expect(info.network.online).toBe(true);
    });

    it('should not cache results and reflect updated values', () => {
      // First call to get initial info
      const info1 = utils.getEnvironmentInfo();
      expect(info1.screen.width).toBe(1920);

      // Simulate a change in the environment
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        configurable: true
      });

      // Second call should reflect the change
      const info2 = utils.getEnvironmentInfo();
      expect(info2.screen.width).toBe(1024);
      expect(info1).not.toBe(info2);
    });
  });

  describe('isEnvironment', () => {
    it('should check single condition', () => {
      expect(utils.isEnvironment(['browser'])).toBe(true);
      expect(utils.isEnvironment(['node'])).toBe(false);
    });

    it('should check multiple conditions (AND logic)', () => {
      expect(utils.isEnvironment(['browser', 'chrome', 'windows'])).toBe(true);
      expect(utils.isEnvironment(['browser', 'firefox'])).toBe(false);
    });

    it('should handle device conditions', () => {
      expect(utils.isEnvironment(['desktop', 'large-screen'])).toBe(true);
      expect(utils.isEnvironment(['mobile'])).toBe(false);
    });

    it('should handle network conditions', () => {
      expect(utils.isEnvironment(['online'])).toBe(true);
      expect(utils.isEnvironment(['offline'])).toBe(false);
    });

    it('should handle feature conditions', () => {
      Object.defineProperty(window, 'location', {
        value: { protocol: 'https:' },
        configurable: true
      });
      
      expect(utils.isEnvironment(['https'])).toBe(true);
    });

    it('should return false for unknown conditions', () => {
      expect(utils.isEnvironment(['unknown-condition'])).toBe(false);
    });

    it('should handle case-insensitive conditions', () => {
      expect(utils.isEnvironment(['BROWSER', 'Chrome'])).toBe(true);
    });
  });
});