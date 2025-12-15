# @oxog/env-scout Examples

This directory contains comprehensive examples demonstrating how to use @oxog/env-scout in various environments and frameworks.

## Quick Start

First, install the package:

```bash
npm install @oxog/env-scout
```

## Examples Overview

### 📁 Node.js Examples
- **[basic-usage.js](./node/basic-usage.js)** - Basic environment detection in Node.js
- **[server-detection.js](./node/server-detection.js)** - Server configuration based on environment

### 📁 Browser Examples
- **[index.html](./browser/index.html)** - Interactive browser environment dashboard
- **[adaptive-ui.html](./browser/adaptive-ui.html)** - Adaptive UI based on device capabilities

### 📁 TypeScript Examples
- **[advanced-usage.ts](./typescript/advanced-usage.ts)** - Type-safe advanced usage patterns

### 📁 React Examples
- **[EnvAwareComponent.tsx](./react/EnvAwareComponent.tsx)** - React hooks and components

### 📁 Vue Examples
- **[EnvAwareComponent.vue](./vue/EnvAwareComponent.vue)** - Vue 3 composition API example

### 📁 Simple Examples
- **[test-package.js](./test-package.js)** - Quick test script
- **[browser-example.html](./browser-example.html)** - Simple browser demo

## Running the Examples

### Node.js Examples

```bash
# Basic usage
node examples/node/basic-usage.js

# Server detection
node examples/node/server-detection.js
```

### Browser Examples

Open the HTML files directly in your browser:
- `examples/browser/index.html`
- `examples/browser/adaptive-ui.html`

Or serve them with a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve examples/browser
```

### TypeScript Examples

```bash
# Install TypeScript if needed
npm install -D typescript @types/node

# Run with ts-node
npx ts-node examples/typescript/advanced-usage.ts

# Or compile and run
npx tsc examples/typescript/advanced-usage.ts
node examples/typescript/advanced-usage.js
```

### React Example

```bash
# Create a new React app
npx create-react-app my-app --template typescript
cd my-app

# Install env-scout
npm install @oxog/env-scout

# Copy the component
cp path/to/examples/react/EnvAwareComponent.tsx src/

# Use in your App.tsx
```

### Vue Example

```bash
# Create a new Vue app
npm create vue@latest my-app
cd my-app

# Install env-scout
npm install @oxog/env-scout

# Copy the component
cp path/to/examples/vue/EnvAwareComponent.vue src/components/

# Import and use in your app
```

## Common Use Cases

### 1. Device-Specific Layouts

```javascript
import { isMobile, isTablet, isDesktop } from '@oxog/env-scout';

if (isMobile()) {
  // Load mobile layout
} else if (isTablet()) {
  // Load tablet layout
} else if (isDesktop()) {
  // Load desktop layout
}
```

### 2. Feature Detection

```javascript
import { checkFeatureSupport } from '@oxog/env-scout';

const features = checkFeatureSupport(['webgl2', 'webassembly']);
if (features.webgl2) {
  // Initialize 3D graphics
}
```

### 3. Performance Optimization

```javascript
import { isSlowConnection, isMobile } from '@oxog/env-scout';

if (isSlowConnection() || isMobile()) {
  // Load optimized assets
  // Disable animations
  // Use lazy loading
}
```

### 4. Dark Mode Support

```javascript
import { isDarkMode } from '@oxog/env-scout';

if (isDarkMode()) {
  document.body.classList.add('dark-theme');
}
```

### 5. Conditional Module Loading

```javascript
import { isEnvironment } from '@oxog/env-scout';

if (isEnvironment(['browser', 'desktop', 'chrome'])) {
  // Load Chrome-specific features
}

if (isEnvironment(['node', 'production'])) {
  // Load production monitoring
}
```

## Best Practices

1. **Cache Results**: Environment detection results are automatically cached for 60 seconds
2. **Tree Shaking**: Import only the functions you need
3. **Type Safety**: Use TypeScript for better IDE support
4. **Progressive Enhancement**: Always provide fallbacks
5. **Performance**: Check expensive features only when needed

## API Quick Reference

```javascript
// Runtime Detection
isBrowser(), isNode(), isBun(), isDeno(), isElectron()

// Browser Detection  
isChrome(), isFirefox(), isSafari(), isEdge(), getBrowser()

// OS Detection
isWindows(), isMacOs(), isLinux(), isIos(), isAndroid(), getOS()

// Device Detection
isMobile(), isTablet(), isDesktop(), isTouchDevice(), isRetina()

// Network Detection
isOnline(), isOffline(), getConnectionType(), isSlowConnection()

// Feature Detection
hasWebGL(), hasWebAssembly(), checkFeatureSupport(['webgl', 'canvas'])

// User Preferences
isDarkMode(), prefersReducedMotion(), getSystemLanguage()

// Utility Functions
getEnvironmentInfo(), isEnvironment(['browser', 'mobile'])
```

## Need Help?

- 📖 [Full Documentation](https://github.com/ersinkoc/env-scout)
- 🐛 [Report Issues](https://github.com/ersinkoc/env-scout/issues)
- 📦 [NPM Package](https://www.npmjs.com/package/@oxog/env-scout)