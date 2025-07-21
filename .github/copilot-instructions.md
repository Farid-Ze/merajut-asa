# GitHub Copilot Instructions for Merajut ASA

> Last updated: 2025-07-21 17:10:42 (UTC) by Farid-Ze

## YOUR ROLE AND FOCUS

- **Technical Strategy Advisor**: Guide the complete project development lifecycle
- **Architecture Consultant**: Recommend optimal technical approaches for each feature
- **Development Mentor**: Provide advanced code patterns for a Computer Science graduate
- **Project Success Facilitator**: Help achieve project goals that will impress the West Java Governor

## Project Overview

Merajut ASA is a Progressive Web App (PWA) for digital collaboration in West Java, built with Next.js 14 and TurboRepo monorepo architecture. The platform emphasizes performance (<1.5s LCP), accessibility (WCAG 2.1 AA compliance), and security. This project follows Vercel deployment best practices.

### Project Vision and Goals

This platform aims to:
1. Facilitate digital collaboration across West Java communities
2. Showcase technical excellence in PWA development
3. Demonstrate scalable architecture for government digital initiatives
4. Meet high standards for performance, accessibility, and security
5. Impress the Governor of West Java with innovation and execution quality

## Architecture Design

### Monorepo Structure (TurboRepo)
```
merajut-asa/
├── apps/
│   └── web/             # Next.js PWA frontend (App Router)
├── packages/            # Shared libraries
│   ├── types/           # TypeScript definitions
│   ├── logger/          # Winston-based logging
│   ├── utils/           # Shared utilities
│   ├── ui/              # Chakra UI components
│   ├── eslint-config/   # Shared ESLint rules
│   └── tsconfig/        # TypeScript configurations
└── turbo.json           # TurboRepo configuration
```

### Technology Stack Rationale

1. **Next.js 14 App Router**
   - Server Components for improved performance
   - Streaming architecture for faster time-to-interactive
   - Built-in image and font optimization

2. **TurboRepo**
   - Optimized builds for monorepo structure
   - Shared code across multiple applications
   - Intelligent caching for faster development cycles

3. **Chakra UI**
   - Accessible by default
   - Responsive design system
   - Customizable to match West Java branding

4. **TypeScript**
   - Type safety for complex applications
   - Improved developer experience
   - Better code maintenance for government projects

## Strategic Development Approach

### Phase 1: Foundation
- Core architecture setup
- Design system implementation
- Authentication framework
- Performance baseline

### Phase 2: Feature Development
- Collaboration tools
- Community engagement features
- Integration with government services
- Analytics implementation

### Phase 3: Optimization and Polish
- Performance tuning
- Accessibility compliance
- Security hardening
- User experience refinement

## Technical Implementation Details

### Next.js App Router Structure

```
apps/web/src/
├── app/                    # App Router
│   ├── layout.tsx          # Root layout (includes metadata)
│   ├── page.tsx            # Home page
│   └── [route]/            # Route segments
│       ├── page.tsx        # Route page
│       └── layout.tsx      # Route layout
├── components/             # Shared components
├── lib/                    # Utility functions
└── middleware.ts           # Next.js middleware (security headers)
```

### Server vs Client Components

```typescript
// Server Component (default)
export default function ServerComponent() {
  return <div>Rendered on server</div>;
}

// Client Component
'use client'
import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Data Fetching Patterns

```typescript
// In Server Components
async function getData() {
  const res = await fetch('https://api.example.com/data');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* Use data */}</main>;
}
```

### UI Component Design

```typescript
'use client'
import { Box, Button, Text } from '@chakra-ui/react';

export default function Component() {
  return (
    <Box p={4}>
      <Text fontSize="xl">Hello World</Text>
      <Button colorScheme="blue">Click me</Button>
    </Box>
  );
}
```

## Advanced Technical Concepts

For a Computer Science graduate, these advanced patterns may be of interest:

### State Management Architecture
- Server state with React Query
- Client state with Context API or Zustand
- Persistent state with localStorage/IndexedDB

### Performance Optimization Techniques
- React Suspense for data fetching
- Streaming SSR for improved TTFB
- Web Workers for CPU-intensive operations
- Intersection Observer for optimized rendering

### Advanced TypeScript Patterns
- Discriminated unions for state management
- Generic components for reusable UI
- Advanced type inference for API responses
- Module augmentation for third-party libraries

## Development Workflow

### Essential Commands

```bash
# Install dependencies
npm install

# Development
npx turbo dev                    # All packages in watch mode
npm run dev --workspace=apps/web # Web app only

# Build
npx turbo build                  # Build all with dependency order

# Quality checks
npx turbo lint                   # ESLint across workspace
npx turbo type-check            # TypeScript validation
npm run performance:budget      # Performance audits
npm run accessibility:audit     # A11y compliance checks
```

## Vercel Deployment Strategy

Our project follows [Vercel deployment best practices](https://vercel.com/docs/deployments/overview):

### Environment Configuration

```json
// vercel.json
{
  "buildCommand": "npx turbo build",
  "ignoreCommand": "git diff --quiet HEAD^ HEAD ./apps/web",
  "outputDirectory": "apps/web/.next"
}
```

### Preview and Production Deployment

- GitHub integration for automatic preview deployments
- Manual promotion to production after quality checks
- Environment variable segregation across environments

## Performance Optimization Strategies

### Core Web Vitals Optimization

1. **LCP (Largest Contentful Paint)**
   - Optimize critical rendering path
   - Preload key resources
   - Implement priority hints

2. **FID (First Input Delay)**
   - Minimize main thread work
   - Break up long tasks
   - Optimize JavaScript execution

3. **CLS (Cumulative Layout Shift)**
   - Set explicit dimensions for media
   - Avoid dynamic content insertion above existing content
   - Use CSS contain property

### PWA Implementation

```typescript
// next.config.js
const withPWA = require('@ducanh2912/next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // other Next.js config
});
```

## Error Handling and Problem Solving

While not the primary focus, here are solutions to common issues:

### React Context in Server Components
```typescript
// ✅ CORRECT: Separate client components for context usage
'use client'
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme';

export default function ErrorClient({ children }) {
  const theme = useContext(ThemeContext);
  return <div className={theme.errorContainer}>{children}</div>;
}
```

### TurboRepo Build Configuration
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    }
  }
}
```

## Critical Requirements

1. **Performance Target**: Lighthouse LCP < 1.5 seconds
2. **Accessibility**: WCAG 2.1 AA compliance (>95% target)
3. **Security**: No unsafe-eval or unsafe-inline in production CSP
4. **PWA**: Full offline functionality with service worker caching

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

## Project Success Metrics

To impress the Governor of West Java, focus on:

1. **Technical Excellence**: Demonstrate cutting-edge web technologies
2. **User Experience**: Create an intuitive, responsive interface
3. **Performance**: Ensure fast loading even on limited connections
4. **Accessibility**: Make the platform usable by all citizens
5. **Innovation**: Implement features that showcase forward thinking
6. **Social Impact**: Highlight how the platform benefits communities

## Documentation Resources

Always refer to these official resources:

1. **Next.js Documentation**: https://nextjs.org/docs
2. **Vercel Deployment Documentation**: https://vercel.com/docs
3. **TurboRepo Documentation**: https://turbo.build/repo/docs
4. **Chakra UI Documentation**: https://chakra-ui.com/docs/getting-started
5. **Project-specific documentation**: `docs/dokumen-resmi-project/`

## GUIDANCE APPROACH

As your development partner, I will:

1. **Suggest architectural improvements** based on your MS in Computer Science background
2. **Provide complete implementation patterns** rather than just snippets
3. **Explain the rationale** behind technical decisions
4. **Anticipate challenges** before they arise
5. **Balance theoretical correctness** with practical implementation
6. **Focus on features** that will impress stakeholders
7. **Guide the entire development journey** from foundation to launch

When in doubt, refer to project documentation in `docs/dokumen-resmi-project/` as the source of truth.