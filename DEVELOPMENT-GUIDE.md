# 🔧 Development Guide - Merajut ASA

## 🚀 Quick Start

### Prerequisites
- Node.js v22.17.0+
- npm v9.8.1+
- Git

### Initial Setup
```bash
# Clone repository
git clone <your-repo-url>
cd merajut-asa

# Install dependencies
npm install

# Start development server
npx turbo dev
```

## 📁 Project Structure

### Monorepo Architecture
```
merajut-asa/
├── apps/
│   ├── web/                    # Next.js PWA Frontend
│   ├── api-gateway/           # Future: API Gateway
│   └── services/              # Future: Microservices
│       ├── auth-service/
│       ├── campaign-service/
│       ├── community-service/
│       ├── notification-service/
│       ├── payment-service/
│       └── user-service/
├── packages/
│   ├── ui/                    # Shared React components
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── logger/                # Logging utilities
│   ├── eslint-config/         # ESLint shared config
│   ├── tsconfig/              # TypeScript configurations
│   └── api-client/            # Future: API client library
├── infrastructure/
│   ├── kubernetes/            # K8s deployment configs
│   ├── terraform/             # Infrastructure as Code
│   └── ci-cd/                 # CI/CD pipeline configs
└── docs/                      # Documentation
```

### Key Configuration Files
- `turbo.json` - TurboRepo pipeline configuration
- `package.json` - Root package with workspace definitions
- `apps/web/next.config.js` - Next.js PWA configuration
- `vercel.json` - Vercel deployment configuration
- `.vscode/tasks.json` - VS Code task definitions

## 🛠️ Development Commands

### TurboRepo Commands
```bash
# Start all apps in development mode
npx turbo dev

# Build all apps
npx turbo build

# Run tests across all packages
npx turbo test

# Lint all packages
npx turbo lint

# Clean all build artifacts
npx turbo clean
```

### Web App Specific Commands
```bash
cd apps/web

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Package Development
```bash
# Work on shared UI components
cd packages/ui
npm run dev

# Build TypeScript packages
cd packages/types
npm run build
```

## 🎨 Styling Guidelines

### Tailwind CSS + Chakra UI
```tsx
// Use Tailwind for layout and spacing
<div className="flex flex-col gap-4 p-6">
  {/* Use Chakra UI for interactive components */}
  <Button colorScheme="blue" size="lg">
    Click me
  </Button>
</div>
```

### Component Structure
```tsx
// packages/ui/src/components/Button.tsx
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <ChakraButton
        ref={ref}
        className={`custom-button custom-button--${variant} ${className}`}
        {...props}
      />
    )
  }
)
```

## 🏗️ Adding New Features

### 1. Creating New Pages (Next.js App Router)
```bash
# Create new page
mkdir -p apps/web/src/app/campaigns
touch apps/web/src/app/campaigns/page.tsx
touch apps/web/src/app/campaigns/layout.tsx
```

```tsx
// apps/web/src/app/campaigns/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campaigns - Merajut ASA',
  description: 'Browse active campaigns'
}

export default function CampaignsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Active Campaigns</h1>
      {/* Campaign content */}
    </div>
  )
}
```

### 2. Adding Shared Components
```bash
# Create component in UI package
mkdir -p packages/ui/src/components/CampaignCard
touch packages/ui/src/components/CampaignCard/CampaignCard.tsx
touch packages/ui/src/components/CampaignCard/index.ts
```

```tsx
// packages/ui/src/components/CampaignCard/CampaignCard.tsx
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'

interface CampaignCardProps {
  title: string
  description: string
  targetAmount: number
  currentAmount: number
}

export function CampaignCard({
  title,
  description,
  targetAmount,
  currentAmount
}: CampaignCardProps) {
  const progress = (currentAmount / targetAmount) * 100

  return (
    <Card className="h-full">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text className="mb-4">{description}</Text>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Text className="mt-2 text-sm text-gray-600">
          Rp {currentAmount.toLocaleString()} / Rp {targetAmount.toLocaleString()}
        </Text>
      </CardBody>
    </Card>
  )
}
```

### 3. Adding Types
```typescript
// packages/types/src/campaign.ts
export interface Campaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  startDate: Date
  endDate: Date
  organizerId: string
  status: 'active' | 'completed' | 'paused'
  categories: string[]
}

export interface CampaignFilters {
  category?: string
  status?: Campaign['status']
  search?: string
}
```

### 4. Adding Utilities
```typescript
// packages/utils/src/format.ts
export function formatCurrency(amount: number, locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

export function formatDate(date: Date, locale = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
```

## 🧪 Testing Strategy

### Unit Tests
```bash
# Run tests for specific package
npx turbo test --filter=ui

# Run tests with coverage
npx turbo test -- --coverage
```

### Integration Tests
```typescript
// apps/web/__tests__/campaigns.test.tsx
import { render, screen } from '@testing-library/react'
import CampaignsPage from '../src/app/campaigns/page'

describe('Campaigns Page', () => {
  it('renders campaign list', () => {
    render(<CampaignsPage />)
    expect(screen.getByText('Active Campaigns')).toBeInTheDocument()
  })
})
```

## 🎯 Performance Best Practices

### 1. Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="/campaign-image.jpg"
  alt="Campaign banner"
  width={800}
  height={400}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Dynamic Imports
```tsx
import dynamic from 'next/dynamic'

const CampaignChart = dynamic(
  () => import('../components/CampaignChart'),
  { 
    ssr: false,
    loading: () => <div>Loading chart...</div>
  }
)
```

### 3. Bundle Analysis
```bash
# Analyze bundle size
ANALYZE=true npm run build
```

## 🔒 Security Guidelines

### Environment Variables
```bash
# .env.local (never commit)
NEXT_PUBLIC_API_URL=http://localhost:4000
DATABASE_URL=postgresql://localhost:5432/merajutasa
JWT_SECRET=your-super-secret-key
STRIPE_SECRET_KEY=sk_test_...
```

### API Security
```typescript
// apps/web/src/lib/api.ts
import { headers } from 'next/headers'

export async function getServerSideToken() {
  const headersList = headers()
  const authorization = headersList.get('authorization')
  
  if (!authorization?.startsWith('Bearer ')) {
    throw new Error('Unauthorized')
  }
  
  return authorization.substring(7)
}
```

## 📚 Code Style Guidelines

### TypeScript
- Use strict mode
- Prefer interfaces over types for object shapes
- Use proper return types for functions
- Leverage utility types (Partial, Pick, Omit)

### React
- Use function components with hooks
- Prefer composition over inheritance
- Use proper key props in lists
- Implement proper error boundaries

### CSS/Styling
- Mobile-first responsive design
- Use Tailwind utility classes
- Follow BEM methodology for custom CSS
- Prefer CSS-in-JS for component-specific styles

## 🚀 Deployment Workflow

### Development to Production
1. **Feature Branch**: Create feature branch from `main`
2. **Development**: Work locally with `npx turbo dev`
3. **Testing**: Run `npx turbo test` and `npx turbo lint`
4. **Build**: Verify with `npx turbo build`
5. **Pull Request**: Create PR to `main` branch
6. **Review**: Code review and approval
7. **Merge**: Auto-deploy to Vercel on merge

### Environment Management
- **Development**: Local development server
- **Preview**: Vercel preview deployments for PRs
- **Production**: Vercel production deployment from `main`

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TurboRepo Guide](https://turbo.build/repo/docs)
- [Chakra UI Components](https://chakra-ui.com/docs/components)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---
*Happy coding! 🎉*
