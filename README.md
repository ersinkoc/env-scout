# @oxog/env-scout

A comprehensive, lightweight, and zero-dependency environment detection library for JavaScript/TypeScript applications. Detect runtime environments, browsers, operating systems, devices, and features with ease.

[![npm version](https://img.shields.io/npm/v/@oxog/env-scout.svg)](https://www.npmjs.com/package/@oxog/env-scout)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- **Zero Dependencies** - No external dependencies, keeping your bundle size minimal
- **TypeScript Support** - Full TypeScript support with comprehensive type definitions
- **Tree-Shakeable** - Import only what you need
- **Cached Results** - Automatic caching for performance optimization
- **Comprehensive Detection** - Detect runtime, browser, OS, device, network, and features
- **Cross-Platform** - Works in browsers, Node.js, Bun, Deno, and more

## Installation

```bash
# npm
npm install @oxog/env-scout

# yarn
yarn add @oxog/env-scout

# pnpm
pnpm add @oxog/env-scout

# bun
bun add @oxog/env-scout
```

## Quick Start

```typescript
import { isBrowser, getEnvironmentInfo, isEnvironment } from '@oxog/env-scout';

// Simple checks
if (isBrowser() && isDarkMode()) {
  // Apply dark theme
}

// Multiple conditions
if (isEnvironment(['browser', 'mobile', 'online'])) {
  // Mobile browser with connection
}

// Get complete info
const env = getEnvironmentInfo();
console.log(env);
// {
//   runtime: 'browser',
//   browser: { name: 'chrome', version: '120' },
//   os: 'macos',
//   device: { type: 'desktop', touch: true, retina: true },
//   ...
// }
```

## API Documentation

### Runtime Environment Detection

| Function | Description |
|----------|-------------|
| `isBrowser()` | Running in web browser |
| `isNode()` | Running in Node.js |
| `isBun()` | Running in Bun runtime |
| `isDeno()` | Running in Deno runtime |
| `isElectron()` | Running in Electron |
| `isJsDom()` | Running in jsdom |
| `isReactNative()` | Running in React Native |
| `isCapacitor()` | Running in Capacitor |
| `isCordova()` | Running in Cordova |
| `isTauri()` | Running in Tauri |
| `isWebWorker()` | Any web worker |
| `isDedicatedWorker()` | Dedicated worker |
| `isSharedWorker()` | Shared worker |
| `isServiceWorker()` | Service worker |

### Browser Detection

| Function | Description |
|----------|-------------|
| `isChrome()` | Google Chrome browser |
| `isFirefox()` | Mozilla Firefox browser |
| `isSafari()` | Apple Safari browser |
| `isEdge()` | Microsoft Edge browser |
| `isOpera()` | Opera browser |
| `getBrowser()` | Returns `{ name: string, version: string }` |
| `isHeadlessBrowser()` | Detect headless browsers |

### Operating System Detection

| Function | Description |
|----------|-------------|
| `isMacOs()` | macOS operating system |
| `isWindows()` | Windows operating system |
| `isLinux()` | Linux operating system |
| `isIos()` | iOS operating system |
| `isAndroid()` | Android operating system |
| `getOS()` | Returns OS name as string |

### Device Detection

| Function | Description |
|----------|-------------|
| `isMobile()` | Mobile device |
| `isTablet()` | Tablet device |
| `isDesktop()` | Desktop device |
| `isTouchDevice()` | Has touch support |
| `isRetina()` | High DPI display |
| `getDeviceType()` | Returns device type string |

### Screen & Display

| Function | Description |
|----------|-------------|
| `getScreenSize()` | Returns `{ width: number, height: number }` |
| `getOrientation()` | Returns `'portrait' \| 'landscape'` |
| `isSmallScreen()` | Screen width < 576px |
| `isMediumScreen()` | Screen width 576px - 1200px |
| `isLargeScreen()` | Screen width >= 1200px |

### User Preferences

| Function | Description |
|----------|-------------|
| `isDarkMode()` | Prefers dark color scheme |
| `isLightMode()` | Prefers light color scheme |
| `prefersReducedMotion()` | Prefers reduced motion |
| `getColorScheme()` | Returns `'dark' \| 'light' \| 'no-preference'` |
| `getSystemLanguage()` | Returns language code |
| `getTimezone()` | Returns user timezone |

### Network & Connection

| Function | Description |
|----------|-------------|
| `isOnline()` | Has network connection |
| `isOffline()` | No network connection |
| `getConnectionType()` | Returns connection type (wifi, cellular, etc.) |
| `isSlowConnection()` | Slow network connection |
| `getConnectionInfo()` | Complete connection details |

### Feature Detection

| Function | Description |
|----------|-------------|
| `isHTTPS()` | Secure HTTPS connection |
| `hasWebGL()` | WebGL support |
| `hasWebGL2()` | WebGL2 support |
| `hasCanvas()` | Canvas support |
| `hasWebAssembly()` | WebAssembly support |
| `hasServiceWorkerSupport()` | Service Worker support |
| `hasNotificationSupport()` | Notification API support |
| `hasGeolocationSupport()` | Geolocation API support |

### Special Detection

| Function | Description |
|----------|-------------|
| `isBot()` | Search engine bot |
| `isPWA()` | Progressive Web App |
| `isStandalone()` | PWA standalone mode |
| `isIframe()` | Running in iframe |
| `isLocalhost()` | Local development |
| `isDevelopment()` | Development environment |
| `isProduction()` | Production environment |

### Utility Functions

#### `getEnvironmentInfo()`

Returns complete environment information:

```typescript
const info = getEnvironmentInfo();
// {
//   runtime: 'browser',
//   browser: { name: 'chrome', version: '120' },
//   os: 'windows',
//   device: { type: 'desktop', touch: false, retina: true },
//   screen: { width: 1920, height: 1080, orientation: 'landscape' },
//   network: { online: true, type: '4g', slow: false },
//   features: { webgl: true, canvas: true, ... },
//   preferences: { colorScheme: 'dark', reducedMotion: false, ... }
// }
```

#### `isEnvironment(conditions: string[])`

Check multiple conditions at once (AND logic):

```typescript
// Check if mobile Safari on iOS
isEnvironment(['browser', 'mobile', 'safari', 'ios']); // true/false

// Check if desktop Chrome on Windows
isEnvironment(['desktop', 'chrome', 'windows']); // true/false

// Check if online PWA
isEnvironment(['pwa', 'online']); // true/false
```

#### `checkFeatureSupport(features: string[])`

Batch check multiple features:

```typescript
const support = checkFeatureSupport(['webgl', 'canvas', 'webassembly']);
// { webgl: true, canvas: true, webassembly: true }
```

## Usage Examples

### Theme Detection and Application

```typescript
import { isDarkMode, isLightMode, getColorScheme } from '@oxog/env-scout';

function applyTheme() {
  if (isDarkMode()) {
    document.body.classList.add('dark-theme');
  } else if (isLightMode()) {
    document.body.classList.add('light-theme');
  } else {
    // System has no preference
    document.body.classList.add('default-theme');
  }
}
```

### Responsive Feature Loading

```typescript
import { isMobile, isSlowConnection, checkFeatureSupport } from '@oxog/env-scout';

async function loadFeatures() {
  const features = checkFeatureSupport(['webgl', 'webassembly']);
  
  if (isMobile() || isSlowConnection()) {
    // Load lightweight version
    await import('./mobile-app');
  } else if (features.webgl && features.webassembly) {
    // Load full-featured version
    await import('./desktop-app');
  } else {
    // Load fallback version
    await import('./basic-app');
  }
}
```

### Platform-Specific Code

```typescript
import { isEnvironment, getOS } from '@oxog/env-scout';

function getPlatformSpecificPath() {
  if (isEnvironment(['electron', 'windows'])) {
    return 'C:\\Program Files\\MyApp';
  } else if (isEnvironment(['electron', 'macos'])) {
    return '/Applications/MyApp.app';
  } else if (isEnvironment(['node', 'linux'])) {
    return '/opt/myapp';
  }
  return './';
}
```

### Analytics and Monitoring

```typescript
import { getEnvironmentInfo, isBot } from '@oxog/env-scout';

function trackUser() {
  if (isBot()) {
    // Don't track bots
    return;
  }
  
  const env = getEnvironmentInfo();
  analytics.track('page_view', {
    runtime: env.runtime,
    browser: env.browser?.name,
    os: env.os,
    device: env.device.type,
    screen_size: `${env.screen.width}x${env.screen.height}`,
    connection: env.network.type
  });
}
```

## Browser Usage via CDN

You can also use env-scout directly in the browser:

```html
<script src="https://unpkg.com/@oxog/env-scout/dist/index.js"></script>
<script>
  const { isBrowser, getEnvironmentInfo } = window.EnvScout;
  
  if (isBrowser()) {
    console.log(getEnvironmentInfo());
  }
</script>
```

## Tree-Shaking

The library is designed to be tree-shakeable. When you import specific functions, only the code for those functions will be included in your bundle:

```typescript
// Only imports the isMobile function
import { isMobile } from '@oxog/env-scout';

// Only imports device-related functions
import { isMobile, isTablet, isDesktop } from '@oxog/env-scout/device';
```

## Performance Considerations

- Detection results are cached automatically for 60 seconds to improve performance
- Functions use lazy evaluation where possible
- Feature detection is preferred over user agent parsing
- No external dependencies means faster load times

## TypeScript Support

The library is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { EnvironmentInfo, BrowserInfo } from '@oxog/env-scout';

function processEnvironment(env: EnvironmentInfo) {
  // Full type safety
  console.log(env.browser?.name); // Type: string | undefined
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Ersin Koç**

## Links

- [GitHub Repository](https://github.com/ersinkoc/env-scout)
- [NPM Package](https://www.npmjs.com/package/@oxog/env-scout)
- [Bug Reports](https://github.com/ersinkoc/env-scout/issues)