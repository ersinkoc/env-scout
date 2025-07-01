import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as network from '../src/network';

describe('Network Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Online/Offline detection', () => {
    it('should detect online status', () => {
      Object.defineProperty(navigator, 'onLine', {
        value: true,
        configurable: true
      });
      
      expect(network.isOnline()).toBe(true);
      expect(network.isOffline()).toBe(false);
    });

    it('should detect offline status', () => {
      Object.defineProperty(navigator, 'onLine', {
        value: false,
        configurable: true
      });
      
      expect(network.isOnline()).toBe(false);
      expect(network.isOffline()).toBe(true);
    });
  });

  describe('Connection type detection', () => {
    it('should return connection type when available', () => {
      (navigator as any).connection = {
        type: 'wifi',
        effectiveType: '4g'
      };
      
      expect(network.getConnectionType()).toBe('wifi');
    });

    it('should return effectiveType when type is not available', () => {
      (navigator as any).connection = {
        effectiveType: '4g'
      };
      
      expect(network.getConnectionType()).toBe('4g');
    });

    it('should return null when connection API is not available', () => {
      (navigator as any).connection = undefined;
      
      expect(network.getConnectionType()).toBeNull();
    });
  });

  describe('Slow connection detection', () => {
    it('should detect slow connection based on effectiveType', () => {
      (navigator as any).connection = {
        effectiveType: '2g'
      };
      
      expect(network.isSlowConnection()).toBe(true);
    });

    it('should detect slow connection based on downlink speed', () => {
      (navigator as any).connection = {
        downlink: 0.5
      };
      
      expect(network.isSlowConnection()).toBe(true);
    });

    it('should detect slow connection based on RTT', () => {
      (navigator as any).connection = {
        rtt: 600
      };
      
      expect(network.isSlowConnection()).toBe(true);
    });

    it('should not detect slow connection for fast networks', () => {
      (navigator as any).connection = {
        effectiveType: '4g',
        downlink: 10,
        rtt: 50
      };
      
      expect(network.isSlowConnection()).toBe(false);
    });
  });

  describe('Connection info', () => {
    it('should return complete connection information', () => {
      (navigator as any).connection = {
        effectiveType: '4g',
        downlink: 10,
        rtt: 50,
        saveData: false
      };
      
      const info = network.getConnectionInfo();
      expect(info).toEqual({
        effectiveType: '4g',
        downlink: 10,
        rtt: 50,
        saveData: false
      });
    });

    it('should return null when connection API is not available', () => {
      (navigator as any).connection = undefined;
      
      expect(network.getConnectionInfo()).toBeNull();
    });
  });
});