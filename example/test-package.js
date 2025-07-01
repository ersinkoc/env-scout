// Test script for @oxog/env-scout
// Run: npm install @oxog/env-scout && node test-package.js

const { 
  isBrowser, 
  isNode, 
  getEnvironmentInfo, 
  isEnvironment,
  getOS,
  getBrowser 
} = require('@oxog/env-scout');

console.log('=== @oxog/env-scout Test ===\n');

// Basic runtime checks
console.log('Runtime Checks:');
console.log('Is Browser:', isBrowser());
console.log('Is Node.js:', isNode());
console.log('Operating System:', getOS());

// Browser info (will be null in Node.js)
console.log('\nBrowser Info:', getBrowser());

// Environment check
console.log('\nEnvironment Checks:');
console.log('Is Node + Linux:', isEnvironment(['node', 'linux']));
console.log('Is Browser + Chrome:', isEnvironment(['browser', 'chrome']));

// Full environment info
console.log('\nFull Environment Info:');
console.log(JSON.stringify(getEnvironmentInfo(), null, 2));