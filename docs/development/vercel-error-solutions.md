# === COMMON VERCEL DEPLOYMENT ERRORS & SOLUTIONS ===

## ERROR 1: "husky: command not found"
**Cause**: Git hooks dalam environment deployment
**Solution**: Remove "prepare": "husky install" from package.json
```bash
# Fix
git add package.json
git commit -m "fix: remove husky for deployment"
```

## ERROR 2: "Function Runtimes must have a valid version"
**Cause**: Invalid runtime specification in vercel.json
**Solution**: Remove functions config or use correct format
```json
// ❌ Wrong
"functions": {
  "apps/web/src/app/api/**/*.ts": {
    "runtime": "nodejs18.x"  // Invalid
  }
}

// ✅ Right - Let Next.js handle it
// Remove functions section entirely
```

## ERROR 3: "Cannot find module '@ducanh2912/next-pwa'"
**Cause**: PWA dependency not in correct package.json
**Solution**: Add to apps/web/package.json, not root
```bash
cd apps/web
npm install @ducanh2912/next-pwa
```

## ERROR 4: "apps/web: No such file or directory"
**Cause**: Wrong build command or root directory
**Solution**: Use monorepo-aware commands
```json
// ❌ Wrong
"buildCommand": "cd apps/web && npm run build"

// ✅ Right  
"buildCommand": "turbo run build --filter=web"
```

## ERROR 5: "Cannot read properties of null (reading 'useContext')"
**Cause**: SSR issues with React Context
**Solution**: Add 'use client' or fix config
```tsx
// For error pages
'use client';
import Component from './component';
```

## ERROR 6: "ESLint: Failed to load config"
**Cause**: Missing ESLint dependencies in monorepo
**Solution**: Proper workspace dependency management
```json
// In packages/eslint-config/package.json
"peerDependencies": {
  "@typescript-eslint/eslint-plugin": "*"
}
```

## ERROR 7: Build cache issues
**Cause**: Stale cache or conflicting builds
**Solution**: Clear build cache
```bash
# Local
rm -rf .next node_modules/.cache
npm run clean

# Vercel: Redeploy without cache
```

## ERROR 8: Memory or timeout issues
**Cause**: Large dependencies or complex builds
**Solution**: Optimize build process
```javascript
// next.config.js
module.exports = {
  experimental: {
    esmExternals: false
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all'
    };
    return config;
  }
};
```

## DEBUGGING STRATEGY:
1. Read error message carefully
2. Identify which phase failed (install/build/deploy)
3. Test locally with same commands
4. Fix one error at a time
5. Commit and test each fix
6. Monitor build logs for new issues
