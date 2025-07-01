import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as browser from '../src/browser';

describe('Browser Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Browser detection functions', () => {
    it('should detect Chrome browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        configurable: true
      });
      Object.defineProperty(navigator, 'vendor', {
        value: 'Google Inc.',
        configurable: true
      });
      
      expect(browser.isChrome()).toBe(true);
      expect(browser.isFirefox()).toBe(false);
      expect(browser.isSafari()).toBe(false);
    });

    it('should detect Firefox browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        configurable: true
      });
      
      expect(browser.isFirefox()).toBe(true);
      expect(browser.isChrome()).toBe(false);
    });

    it('should detect Safari browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        configurable: true
      });
      Object.defineProperty(navigator, 'vendor', {
        value: 'Apple Computer, Inc.',
        configurable: true
      });
      
      expect(browser.isSafari()).toBe(true);
      expect(browser.isChrome()).toBe(false);
    });

    it('should detect Edge browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
        configurable: true
      });
      
      expect(browser.isEdge()).toBe(true);
    });

    it('should detect Opera browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.172',
        configurable: true
      });
      
      expect(browser.isOpera()).toBe(true);
    });
  });

  describe('getBrowser', () => {
    it('should return browser info with name and version', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        configurable: true
      });
      Object.defineProperty(navigator, 'vendor', {
        value: 'Google Inc.',
        configurable: true
      });
      
      const info = browser.getBrowser();
      expect(info).toEqual({
        name: 'chrome',
        version: '91.0'
      });
    });
  });

  describe('isHeadlessBrowser', () => {
    it('should detect headless Chrome', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.124 Safari/537.36',
        configurable: true
      });
      
      expect(browser.isHeadlessBrowser()).toBe(true);
    });

    it('should detect webdriver', () => {
      Object.defineProperty(navigator, 'webdriver', {
        value: true,
        configurable: true
      });
      
      expect(browser.isHeadlessBrowser()).toBe(true);
    });
  });

  describe('OS detection functions', () => {
    it('should detect Windows OS', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'Win32',
        configurable: true
      });
      
      expect(browser.isWindows()).toBe(true);
      expect(browser.isMacOs()).toBe(false);
      expect(browser.isLinux()).toBe(false);
    });

    it('should detect macOS', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'MacIntel',
        configurable: true
      });
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        configurable: true
      });
      
      expect(browser.isMacOs()).toBe(true);
      expect(browser.isWindows()).toBe(false);
    });

    it('should detect Linux OS', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'Linux x86_64',
        configurable: true
      });
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (X11; Linux x86_64)',
        configurable: true
      });
      
      expect(browser.isLinux()).toBe(true);
      expect(browser.isWindows()).toBe(false);
    });

    it('should detect iOS', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
        configurable: true
      });
      
      expect(browser.isIos()).toBe(true);
      expect(browser.isAndroid()).toBe(false);
    });

    it('should detect Android', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 11; Pixel 5)',
        configurable: true
      });
      
      expect(browser.isAndroid()).toBe(true);
      expect(browser.isIos()).toBe(false);
    });
  });

  describe('getOS', () => {
    it('should return correct OS string', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'Win32',
        configurable: true
      });
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Windows',
        configurable: true
      });
      
      expect(browser.getOS()).toBe('windows');
    });

    it('should return unknown for unrecognized OS', () => {
      Object.defineProperty(navigator, 'platform', {
        value: 'Unknown',
        configurable: true
      });
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Unknown',
        configurable: true
      });
      
      expect(browser.getOS()).toBe('unknown');
    });
  });
});