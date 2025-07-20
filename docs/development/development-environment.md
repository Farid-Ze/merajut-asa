# Development Environment Setup

## Prerequisites

- Node.js 18+ (recommended: use nvm for version management)
- npm 9+
- VS Code (recommended editor)

## Required VS Code Extensions

Install these extensions for optimal development experience:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one",
    "streetsidesoftware.code-spell-checker",
    "deque-systems.vscode-axe-linter",
    "silvenon.mdx",
    "bradlc.vscode-tailwindcss"
  ]
}
```

## Environment Configuration

### 1. Install Dependencies
```bash
# Install all workspace dependencies
npm install

# Verify monorepo setup
npx turbo --version
```

### 2. Environment Variables
Create `.env.local` in `apps/web/`:

```env
# Development settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Performance monitoring
NEXT_PUBLIC_PERFORMANCE_MONITORING=true

# Accessibility testing
NEXT_PUBLIC_A11Y_TESTING=true
```

### 3. Git Hooks Setup
```bash
# Install pre-commit hooks
chmod +x ./pre-commit-hook.sh
npm run prepare
```

## Development Workflow

### Daily Development Commands
```bash
# Start all packages in development mode
npx turbo dev

# Or start only web app
npm run dev --workspace=apps/web

# Run type checking across all packages
npx turbo type-check

# Run linting with auto-fix
npx turbo lint:fix

# Format code
npm run format
```

### Quality Assurance
```bash
# Performance audit (run after build)
npm run performance:budget

# Accessibility audit
npm run accessibility:audit

# Security audit
npm run security:audit

# Full test suite
npx turbo test
```

### VS Code Tasks Integration
Use `Ctrl+Shift+P > Tasks: Run Task` for:
- **Dev Web App**: Background development server
- **Build All Apps**: Production build
- **Test All Apps**: Full test suite
- **Lint All Apps**: Code quality check

## Performance Standards

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 1.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring
- Lighthouse CI integration
- Bundle analyzer reports
- Performance budgets enforced

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Target: >95% compliance
- Automated testing with jest-axe
- Manual testing checklist
- Screen reader testing protocols

### Testing Tools
- axe-core for automated accessibility testing
- jest-axe for unit test integration
- eslint-plugin-jsx-a11y for code-time checks

## Security Environment

### Security Headers
Configured in `vercel.json`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Content Security Policy
Production CSP configured with strict policies (no unsafe-eval, no unsafe-inline).

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Ensure all packages are built (`npx turbo build`)
2. **Type errors**: Run `npx turbo type-check` to identify issues
3. **Lint errors**: Use `npx turbo lint:fix` for auto-fixes
4. **Performance budget failures**: Check bundle size and optimization

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev --workspace=apps/web

# TypeScript compiler debug
npx tsc --listFiles --workspace=apps/web
```
