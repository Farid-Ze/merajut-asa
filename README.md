# Merajut ASA - Platform Kolaborasi Digital Jawa Barat

Platform digital untuk membangun kolaborasi yang inklusif, berkelanjutan, dan berdampak di Jawa Barat.

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Chakra UI + Emotion
- **PWA:** @ducanh2912/next-pwa
- **State Management:** Apollo Client + GraphQL
- **Build System:** TurboRepo
- **Deployment:** Vercel

## 📁 Project Structure

```
merajut-asa/
├── apps/
│   └── web/                 # Next.js frontend application
├── packages/
│   ├── types/              # Shared TypeScript types
│   ├── logger/             # Custom logging utilities
│   ├── utils/              # Shared utility functions
│   ├── eslint-config/      # Shared ESLint configuration
│   └── tsconfig/           # Shared TypeScript configurations
├── infrastructure/         # Infrastructure as Code
└── docs/                   # Project documentation
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Farid-Ze/merajut-asa.git
cd merajut-asa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build all packages and apps
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
npm run test         # Run tests

# Individual package development
npm run dev --workspace=apps/web
npm run build --workspace=packages/types
```

## 🌟 Features

- **Progressive Web App (PWA)** - Offline functionality and app-like experience
- **Accessibility First** - WCAG 2.1 AA compliant
- **Performance Optimized** - Target <1.5s LCP
- **Security by Design** - Built-in security headers and best practices
- **Internationalization** - Indonesian and English support
- **Responsive Design** - Mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js app
3. Deploy with zero configuration

### Manual Deployment

```bash
# Build the application
npm run build

# The output will be in apps/web/.next/
```

## 📖 Documentation

- [Technical Architecture](./docs/dokumen-resmi-project/tech-architecture.md)
- [Design System](./docs/dokumen-resmi-project/ui-ux-design-system.md)
- [Security Guidelines](./docs/dokumen-resmi-project/security-architecture.md)
- [Accessibility Guidelines](./docs/dokumen-resmi-project/accessibility-requirements.md)

## 🤝 Contributing

Please read our contributing guidelines and ensure all tests pass before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live Demo](https://merajut-asa.vercel.app)
- [Design System](https://merajut-asa-storybook.vercel.app)
- [API Documentation](https://api.merajut-asa.com/docs)

---

**Merajut ASA** - Membangun kolaborasi digital yang inklusif dan berkelanjutan di Jawa Barat.
