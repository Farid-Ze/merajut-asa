# === VERCEL DEPLOYMENT CHECKLIST ===
# Berdasarkan experience deployment Merajut ASA

## 1. VERCEL.JSON CONFIGURATION
```json
{
  "version": 2,
  "buildCommand": "turbo run build --filter=web",  // For monorepo
  "outputDirectory": "apps/web/.next",             // Next.js output
  "installCommand": "npm install",                 // Or yarn install
  "framework": "nextjs"
  // ❌ JANGAN tambahkan functions dengan runtime invalid
  // ❌ JANGAN gunakan nodejs18.x - gunakan default Next.js
}
```

## 2. PACKAGE.JSON (ROOT) CRITICAL RULES
```json
{
  "workspaces": ["apps/*", "packages/*"],  // Monorepo setup
  "scripts": {
    "build": "turbo run build",            // TurboRepo build
    "dev": "turbo run dev"
  },
  // ❌ JANGAN ada "prepare": "husky install" - breaks Vercel
  // ❌ JANGAN ada dependencies yang conflict dengan Vercel
  "devDependencies": {
    "turbo": "latest"                      // Essential for monorepo
  }
}
```

## 3. NEXT.CONFIG.JS BEST PRACTICES
```javascript
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  // ✅ ESSENTIAL: Fix SSR issues
  experimental: {
    esmExternals: false
  },
  
  // ✅ ESSENTIAL: Proper output for Vercel
  // output: 'standalone', // Only if needed
  
  // ✅ PWA configuration
  // ... PWA settings
};

module.exports = withPWA(nextConfig);
```

## 4. GITIGNORE MUST-HAVES
```gitignore
# Build outputs
.next/
dist/
build/
out/

# Dependencies  
node_modules/
**/node_modules/

# Environment files
.env*

# Package manager locks (optional but recommended)
package-lock.json

# PWA files
**/public/sw.js
**/public/sw.js.map

# Vercel
.vercel/
```

## 5. VERCEL DASHBOARD SETTINGS
- Root Directory: EMPTY (for monorepo)
- Build Command: turbo run build --filter=web
- Output Directory: Next.js default
- Install Command: npm install (or yarn install)
- Node.js Version: 18.x or later

## 6. COMMON PITFALLS TO AVOID

### ❌ DEPLOYMENT KILLERS:
1. "prepare": "husky install" in package.json
2. Invalid function runtimes in vercel.json
3. Wrong root directory setting in Vercel
4. Missing dependencies in apps/*/package.json
5. SSR context errors without 'use client'
6. Build artifacts in git repository

### ✅ SUCCESS FACTORS:
1. Clean .gitignore with all build artifacts ignored
2. Proper monorepo workspace configuration
3. TurboRepo for dependency management
4. PWA dependencies in correct package.json
5. SSR-compatible React components
6. No Git hooks in deployment environment

## 7. DEBUGGING WORKFLOW
1. Check Vercel build logs for specific errors
2. Test build locally with: npm run build
3. Verify all dependencies are in correct package.json
4. Ensure no conflicting configurations
5. Use incremental fixes and test each change

## 8. DEVELOPMENT VS DEPLOYMENT
- Development: Can have loose configurations
- Deployment: Must be strict and production-ready
- Always test production build locally before deploying
- Keep deployment configs separate from dev tools

## 9. PWA SPECIFIC CONSIDERATIONS
- PWA dependencies must be in app package.json
- Service worker generation needs proper config
- Manifest.json must be accessible
- Cache strategies should be production-ready

## 10. MONOREPO SPECIFIC RULES
- Dependencies must be in correct workspace
- Build order matters (shared packages first)
- Use proper filtering in build commands
- Workspace references must be accurate

✅ FINAL SUCCESS CRITERIA:
- Clean git repository (no build artifacts)
- All dependencies properly declared
- No development-only scripts in production
- SSR-compatible components
- Proper TurboRepo configuration
- Valid Vercel settings
