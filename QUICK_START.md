# EnvScout Quick Start Guide

## 🚀 Instant Setup

### 1. Install
```bash
npm install @oxog/env-scout
```

### 2. Use
```typescript
import { isBrowser, getEnvironmentInfo } from '@oxog/env-scout';

if (isBrowser()) {
  console.log('Running in browser!');
}

const env = getEnvironmentInfo();
console.log(env.runtime); // 'browser'
```

### 3. Deploy Website

Push to main branch:
```bash
git add .
git commit -m "Deploy v1.0.1"
git push origin main
```

Your website will be live at: **https://env-scout.oxog.dev**

---

## 📚 Documentation

- **API Reference**: [GitHub README](https://github.com/ersinkoc/env-scout#api-documentation)
- **Examples**: See `examples/` folder
- **Website**: https://env-scout.oxog.dev
- **Bug Fixes**: [BUG_FIX_REPORT.md](BUG_FIX_REPORT.md)

---

## 🎯 Features

- ✅ Zero dependencies
- ✅ TypeScript support
- ✅ Tree-shakeable
- ✅ Cross-platform
- ✅ Comprehensive detection
- ✅ Performance optimized

---

## 🔗 Links

- **Website**: https://env-scout.oxog.dev
- **GitHub**: https://github.com/ersinkoc/env-scout
- **NPM**: https://www.npmjs.com/package/@oxog/env-scout

---

**Start building today! ✨**
