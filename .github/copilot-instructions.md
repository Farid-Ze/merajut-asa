# GitHub Copilot Instructions for Merajut ASA

## Project Overview
Merajut ASA is a Progressive Web App (PWA) for digital collaboration in West Java, built with Next.js 14 and TurboRepo monorepo architecture. The platform emphasizes performance (<1.5s LCP), accessibility (WCAG 2.1 AA), and security by design.

## Core Architecture Patterns

### Monorepo Structure
```
apps/web/           # Next.js PWA frontend
packages/           # Shared libraries
├── types/          # TypeScript definitions with @merajut-asa/types
├── logger/         # Winston-based logging with security/performance contexts
├── utils/          # Shared utilities
├── ui/             # Chakra UI components
├── eslint-config/  # Shared ESLint rules
└── tsconfig/       # TypeScript configurations
```

### Build System
- **TurboRepo**: Use `npx turbo dev` for development, `npx turbo build` for production
- **Dependencies**: Tasks have `^build` dependencies - packages build before apps
- **Workspace imports**: Use `@merajut-asa/` scope for internal packages (e.g., `@merajut-asa/logger`)

## Development Workflows

### Essential Commands
```bash
# Development (preferred)
npx turbo dev                    # All packages in watch mode
npm run dev --workspace=apps/web # Web app only

# Build & Quality
npx turbo build                  # Build all with dependency order
npx turbo lint                   # ESLint across workspace
npx turbo type-check            # TypeScript validation
npm run performance:budget      # Performance audits
npm run accessibility:audit     # A11y compliance checks
```

### VS Code Tasks
Use Run Task (Ctrl+Shift+P) for background processes:
- "Dev Web App" - Runs Next.js dev server in background
- "Build All Apps" - Full production build
- "Test All Apps" - Jest test suite

## Code Patterns & Conventions

### Next.js App Router Structure
- Use App Router (`src/app/`) - no Pages Router
- Server Components by default, add `'use client'` only when needed
- Metadata API for SEO (see `apps/web/src/app/layout.tsx`)

### UI Components
- **Chakra UI v2**: Primary component library with Emotion styling
- **Responsive Design**: Mobile-first with Chakra's responsive props
- **Accessibility**: Built-in ARIA support, use semantic HTML
- **PWA**: Configured with `@ducanh2912/next-pwa` for offline functionality

### Logging & Monitoring
```typescript
import { logger } from '@merajut-asa/logger';

// Performance-aware logging with structured context
logger.info('User action', {
  userId: 'user123',
  performance: { loadTime: 850 },
  accessibility: { screenReader: true }
});
```

### TypeScript Standards
- Strict mode enabled (`strict: true`)
- Use `@merajut-asa/types` for shared interfaces
- Prefer explicit types over `any` (ESLint warns on `any`)
- File-scoped packages build to `dist/` with declaration files

## Security & Performance Requirements

### Security Headers (Implement at next.config.js)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff  
- Referrer-Policy: strict-origin-when-cross-origin
- CSP headers configured for production
- The production CSP MUST be strict. It must not use 'unsafe-eval' or 'unsafe-inline'.

### Performance Targets
- **LCP**: <1.5 seconds (critical requirement)
- **Bundle Optimization**: Use `optimizePackageImports` for Chakra UI/Framer Motion
- **PWA Caching**: Static assets, Google Fonts, and API responses cached
- **Image Optimization**: Use Next.js `<Image>` component

### Accessibility Standards
- **WCAG 2.1 AA compliance** (>95% target)
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Color Contrast**: Meets AA standards
- Test with `npm run test:a11y` (Jest + jest-axe)

## Critical Dependencies & Integration

### Core Stack
- **Next.js 14**: App Router, Server Components, Image optimization
- **Chakra UI v2**: Component library with accessibility built-in
- **Apollo Client**: GraphQL state management (future API integration)
- **Winston Logger**: Structured logging with security/performance contexts
- **i18next**: Internationalization (Indonesian/English)

### Build Tools
- **TurboRepo**: Monorepo orchestration with intelligent caching
- **TypeScript 5.2+**: Strict type checking across workspace
- **ESLint**: Custom config in `packages/eslint-config/`
- **Prettier**: Code formatting (use `npm run format`)

## Documentation Compliance

### Official Guidelines
All development MUST follow the official project documentation in `docs/dokumen-resmi-project/`:
- **INSTRUKSI-KHUSUS-PENGEMBANGAN.instructions.md**: Core development principles (mandatory reading)
- **security-architecture.md**: Security by design requirements
- **accessibility-requirements.md**: WCAG 2.1 AA implementation
- **core-platform-development.md**: Technical architecture decisions

### Key Principles
1. **Evolution, Not Revolution**: Incremental improvements over breaking changes
2. **Gotong Royong Digital**: Collaborative, community-focused development
3. **Security by Design**: Security is foundational, not an add-on
4. **Performance First**: <1.5s LCP is non-negotiable
5. **Accessibility Foundation**: WCAG compliance from day one, not retrofitted

## Common Gotchas

### Monorepo Imports
```typescript
// ✅ Correct - use workspace scope
import { logger } from '@merajut-asa/logger';
import type { User } from '@merajut-asa/types';

// ❌ Avoid - relative imports across packages
import { logger } from '../../packages/logger';
```

### Build Dependencies
- Always run `npx turbo build` before production deployment
- Packages must build before apps can consume them
- Use `npm run dev --workspace=apps/web` for web-only development

### Performance Considerations
- Use dynamic imports for heavy components: `const Component = dynamic(() => import('./Heavy'))`
- Optimize images with Next.js Image component
- Test performance budget with `npm run performance:budget`

When in doubt, refer to the official documentation in `docs/dokumen-resmi-project/` as the single source of truth.
