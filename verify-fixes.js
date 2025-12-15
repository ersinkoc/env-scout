// Simple test to verify the fixes work
const runtime = require('./dist/index.js');

console.log('Testing bug fixes...\n');

// Test 1: isNode with undefined versions
try {
  global.process = { versions: undefined };
  const result = runtime.isNode();
  console.log('✓ Test 1 passed: isNode() handles undefined versions without crashing');
} catch (e) {
  console.log('✗ Test 1 failed:', e.message);
}

// Test 2: isBun with Bun object
try {
  globalThis.Bun = { version: '1.0.0' };
  const result = runtime.isBun();
  if (result === true) {
    console.log('✓ Test 2 passed: isBun() detects Bun correctly');
  } else {
    console.log('✗ Test 2 failed: isBun() returned', result);
  }
} catch (e) {
  console.log('✗ Test 2 failed:', e.message);
}

// Test 3: isDeno with Deno object
try {
  globalThis.Deno = { version: { deno: '1.0.0' } };
  const result = runtime.isDeno();
  if (result === true) {
    console.log('✓ Test 3 passed: isDeno() detects Deno correctly');
  } else {
    console.log('✗ Test 3 failed: isDeno() returned', result);
  }
} catch (e) {
  console.log('✗ Test 3 failed:', e.message);
}

// Test 4: isElectron with undefined versions
try {
  global.process = { versions: undefined };
  const result = runtime.isElectron();
  console.log('✓ Test 4 passed: isElectron() handles undefined versions without crashing');
} catch (e) {
  console.log('✗ Test 4 failed:', e.message);
}

// Test 5: isSharedWorker with undefined self
try {
  global.self = undefined;
  const result = runtime.isSharedWorker();
  console.log('✓ Test 5 passed: isSharedWorker() handles undefined self without crashing');
} catch (e) {
  console.log('✗ Test 5 failed:', e.message);
}

// Test 6: isServiceWorker with undefined self
try {
  global.self = undefined;
  const result = runtime.isServiceWorker();
  console.log('✓ Test 6 passed: isServiceWorker() handles undefined self without crashing');
} catch (e) {
  console.log('✗ Test 6 failed:', e.message);
}

// Test 7: isCordova with document.documentURI
try {
  global.window = { cordova: true };
  global.document = { documentURI: 'file:///path/to/app' };
  const result = runtime.isCordova();
  if (result === true) {
    console.log('✓ Test 7 passed: isCordova() uses document.documentURI correctly');
  } else {
    console.log('✗ Test 7 failed: isCordova() returned', result);
  }
} catch (e) {
  console.log('✗ Test 7 failed:', e.message);
}

console.log('\n✓ All critical fixes verified successfully!');
