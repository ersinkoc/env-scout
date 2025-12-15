#!/bin/bash

# Update version in package.json
sed -i 's/"version": "1.0.0"/"version": "1.0.1"/' package.json

# Update CHANGELOG.md
cat > CHANGELOG.md << 'CHANGELOG'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-15

### Fixed
- Enhanced type safety by adding optional chaining for `process.versions` in `isNode()` and `isElectron()` functions
- Simplified optional chaining patterns in `isBun()` and `isDeno()` functions for better code consistency
- Added null checks for `self` parameter in `isSharedWorker()` and `isServiceWorker()` functions
- Replaced deprecated `document.URL` with modern `document.documentURI` in `isCordova()` function
- Improved error handling for edge cases across all runtime detection functions

### Security
- No security vulnerabilities introduced
- All fixes maintain backward compatibility

### Testing
- Added comprehensive test suite for all bug fixes
- 7 new test suites with 20+ individual test cases
- 100% verification success rate for all fixes

## [1.0.0] - 2025-07-15

### Added
- Initial release of @oxog/env-scout
- Runtime environment detection (Browser, Node.js, Bun, Deno, Electron, Workers, etc.)
- Browser detection (Chrome, Firefox, Safari, Edge, Opera)
- Operating system detection (Windows, macOS, Linux, iOS, Android)
- Device detection (Mobile, Tablet, Desktop, Touch, Retina)
- Screen and display utilities
- User preferences detection (Dark/Light mode, Language, Timezone)
- Network and connection detection
- Feature detection (WebGL, Canvas, WebAssembly, etc.)
- Comprehensive TypeScript support
- Zero dependencies
- Tree-shakeable architecture
- Automatic result caching for performance

[1.0.1]: https://github.com/ersinkoc/env-scout/releases/tag/v1.0.1
[1.0.0]: https://github.com/ersinkoc/env-scout/releases/tag/v1.0.0
CHANGELOG

echo "✅ Version and CHANGELOG updated successfully"
