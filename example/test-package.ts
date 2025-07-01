// TypeScript test script for @oxog/env-scout
// Run: npm install @oxog/env-scout typescript @types/node && npx ts-node test-package.ts

import { 
  isBrowser, 
  isNode, 
  getEnvironmentInfo, 
  isEnvironment,
  isDarkMode,
  checkFeatureSupport,
  type EnvironmentInfo 
} from '@oxog/env-scout';

console.log('=== @oxog/env-scout TypeScript Test ===\n');

// Type-safe environment info
const envInfo: EnvironmentInfo = getEnvironmentInfo();

console.log('Runtime:', envInfo.runtime);
console.log('OS:', envInfo.os);
console.log('Device Type:', envInfo.device.type);

// Feature support check
const features = checkFeatureSupport(['webgl', 'canvas', 'webassembly']);
console.log('\nFeature Support:', features);

// Conditional logic based on environment
if (isEnvironment(['node'])) {
  console.log('\nRunning in Node.js environment');
} else if (isEnvironment(['browser', 'mobile'])) {
  console.log('\nRunning in mobile browser');
} else if (isEnvironment(['browser', 'desktop'])) {
  console.log('\nRunning in desktop browser');
}

// User preferences
console.log('\nUser Preferences:');
console.log('Dark Mode:', isDarkMode());
console.log('Language:', envInfo.preferences.language);
console.log('Timezone:', envInfo.preferences.timezone);