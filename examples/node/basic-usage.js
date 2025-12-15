/**
 * Basic Node.js Example for @oxog/env-scout
 * 
 * Installation:
 * npm install @oxog/env-scout
 * 
 * Run:
 * node basic-usage.js
 */

const envScout = require('@oxog/env-scout');

console.log('=== @oxog/env-scout Node.js Example ===\n');

// 1. Runtime Detection
console.log('1. Runtime Detection:');
console.log('   Is Node.js:', envScout.isNode());
console.log('   Is Browser:', envScout.isBrowser());
console.log('   Is Bun:', envScout.isBun());
console.log('   Is Deno:', envScout.isDeno());
console.log('   Current Runtime:', envScout.getRuntimeEnvironment());

// 2. OS Detection
console.log('\n2. Operating System:');
console.log('   OS:', envScout.getOS());
console.log('   Is Windows:', envScout.isWindows());
console.log('   Is macOS:', envScout.isMacOs());
console.log('   Is Linux:', envScout.isLinux());

// 3. Environment Info
console.log('\n3. Environment Check:');
console.log('   Is Development:', envScout.isDevelopment());
console.log('   Is Production:', envScout.isProduction());
console.log('   Is Localhost:', envScout.isLocalhost());

// 4. Feature Support
console.log('\n4. Feature Support:');
const features = envScout.checkFeatureSupport([
  'webgl', 
  'canvas', 
  'webassembly',
  'serviceworker'
]);
console.log('   Features:', features);

// 5. Complete Environment Info
console.log('\n5. Complete Environment Info:');
const fullInfo = envScout.getEnvironmentInfo();
console.log(JSON.stringify(fullInfo, null, 2));

// 6. Conditional Logic
console.log('\n6. Conditional Logic Example:');
if (envScout.isEnvironment(['node', 'development'])) {
  console.log('   ✓ Running in Node.js development environment');
}

if (envScout.isEnvironment(['node', 'production'])) {
  console.log('   ✓ Running in Node.js production environment');
}