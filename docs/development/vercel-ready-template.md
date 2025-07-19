# === VERCEL-READY PROJECT TEMPLATE ===
# Copy paste ini untuk project baru yang deployment-ready

## MINIMAL FILES STRUCTURE:
```
my-project/
├── .gitignore              ← CRITICAL
├── package.json            ← Root config
├── vercel.json             ← Deployment config  
├── turbo.json              ← If monorepo
├── apps/
│   └── web/
│       ├── package.json    ← App dependencies
│       ├── next.config.js  ← Next.js config
│       └── src/
└── packages/               ← Optional shared packages
```

## 1. ROOT PACKAGE.JSON TEMPLATE:
```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 2. VERCEL.JSON TEMPLATE:
```json
{
  "version": 2,
  "buildCommand": "turbo run build --filter=web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-Content-Type-Options", "value": "nosniff"}
      ]
    }
  ]
}
```

## 3. NEXT.CONFIG.JS TEMPLATE:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // For SSR compatibility
  experimental: {
    esmExternals: false
  },
  
  // For production optimization
  compress: true,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
};

module.exports = nextConfig;
```

## 4. GITIGNORE TEMPLATE:
```gitignore
# Dependencies
node_modules/
**/node_modules/
.npm/
.yarn/

# Build outputs
.next/
out/
dist/
build/

# Environment files
.env*
!.env.example

# Package manager
package-lock.json
yarn.lock

# Vercel
.vercel/

# Editor
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Cache
.cache/
.turbo/
```

## 5. TURBO.JSON TEMPLATE:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

## 6. APP PACKAGE.JSON TEMPLATE:
```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 7. DEPLOYMENT CHECKLIST:
- [ ] All dependencies declared in correct package.json
- [ ] No "prepare" scripts with git hooks
- [ ] .gitignore includes all build artifacts
- [ ] No node_modules in git
- [ ] Build command works locally
- [ ] Environment variables configured
- [ ] Error pages have 'use client' if needed
- [ ] PWA config (if applicable) is correct
- [ ] Vercel settings match project structure

## 8. QUICK START COMMANDS:
```bash
# Setup new project
mkdir my-project && cd my-project
git init
# Copy templates above
npm install
npm run build  # Test locally
git add . && git commit -m "initial commit"
git push origin main
# Deploy to Vercel via GitHub
```

✅ FOLLOW THIS TEMPLATE FOR 90% SUCCESS RATE!
