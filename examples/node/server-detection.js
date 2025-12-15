/**
 * Server-side Detection Example
 * Demonstrates environment-specific server configuration
 */

const { 
  isNode, 
  isDevelopment, 
  isProduction,
  getOS,
  isEnvironment,
  getEnvironmentInfo 
} = require('@oxog/env-scout');

// Server configuration based on environment
class ServerConfig {
  constructor() {
    this.env = getEnvironmentInfo();
    this.config = this.getConfig();
  }

  getConfig() {
    const baseConfig = {
      port: 3000,
      host: 'localhost',
      cors: true
    };

    // Development configuration
    if (isDevelopment()) {
      return {
        ...baseConfig,
        debug: true,
        logging: 'verbose',
        hotReload: true,
        errorDetails: true
      };
    }

    // Production configuration
    if (isProduction()) {
      return {
        ...baseConfig,
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
        debug: false,
        logging: 'error',
        compression: true,
        clustering: true
      };
    }

    return baseConfig;
  }

  getOptimizations() {
    const opts = [];

    // OS-specific optimizations
    if (isEnvironment(['linux', 'production'])) {
      opts.push('epoll', 'sendfile');
    }

    if (isEnvironment(['windows'])) {
      opts.push('iocp');
    }

    // Node.js specific
    if (isNode()) {
      opts.push('cluster', 'worker_threads');
    }

    return opts;
  }

  display() {
    console.log('=== Server Configuration ===\n');
    console.log('Environment:', this.env.runtime);
    console.log('OS:', this.env.os);
    console.log('Development:', isDevelopment());
    console.log('\nConfiguration:', JSON.stringify(this.config, null, 2));
    console.log('\nOptimizations:', this.getOptimizations());
  }
}

// Example usage
const serverConfig = new ServerConfig();
serverConfig.display();

// Conditional middleware loading
function loadMiddleware() {
  const middleware = [];

  if (isDevelopment()) {
    middleware.push('morgan', 'errorHandler', 'cors');
  }

  if (isProduction()) {
    middleware.push('helmet', 'compression', 'rateLimit');
  }

  if (isEnvironment(['node', 'development'])) {
    middleware.push('hotReload', 'inspector');
  }

  return middleware;
}

console.log('\nMiddleware to load:', loadMiddleware());