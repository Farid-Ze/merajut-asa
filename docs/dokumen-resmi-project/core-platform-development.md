# Merajut ASA Core Platform Development Guide

## Overview

Based on your technical architecture and requirements documents, I've prepared this guide to help implement the core platform for Phase 2 development. This guide provides concrete implementation examples and best practices aligned with your accessibility, security, and performance requirements.

## Project Structure

Let's start with a recommended project structure for your monorepo that follows the microservices architecture outlined in your technical blueprint:

```typescript name=project-structure.txt
merajut-asa/
├── apps/
│   ├── web/                  # Next.js frontend application
│   ├── api-gateway/          # GraphQL API gateway
│   └── services/             # Microservices
│       ├── auth-service/     # Authentication service
│       ├── campaign-service/ # Campaign management service
│       ├── payment-service/  # Payment processing service
│       ├── user-service/     # User management service
│       ├── community-service/# Community features service
│       └── notification-service/ # Notifications service
├── packages/
│   ├── ui/                   # Shared UI component library
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── tsconfig/             # Shared TypeScript configuration
│   ├── types/                # Shared TypeScript types
│   ├── utils/                # Shared utility functions
│   ├── api-client/           # GraphQL client utilities
│   └── logger/               # Logging utilities
├── infrastructure/           # Terraform and Kubernetes configurations
│   ├── terraform/
│   ├── kubernetes/
│   └── ci-cd/
└── docs/                     # Documentation
    ├── architecture/
    ├── api/
    └── development/
```

## Frontend Implementation

### Next.js Setup with TypeScript

```typescript name=apps/web/package.json
{
  "name": "@merajut-asa/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:a11y": "jest --testPathPattern=a11y"
  },
  "dependencies": {
    "@apollo/client": "^3.8.0",
    "@chakra-ui/react": "^2.8.0",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@merajut-asa/ui": "workspace:*",
    "@merajut-asa/utils": "workspace:*",
    "framer-motion": "^10.16.0",
    "graphql": "^16.8.0",
    "next": "13.4.19",
    "next-pwa": "^5.6.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.45.4",
    "react-i18next": "^13.2.0"
  },
  "devDependencies": {
    "@merajut-asa/eslint-config": "workspace:*",
    "@merajut-asa/tsconfig": "workspace:*",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "@types/node": "20.5.6",
    "@types/react": "18.2.21",
    "@types/react-dom": "18.2.7",
    "eslint": "8.48.0",
    "jest": "^29.6.3",
    "jest-axe": "^8.0.0",
    "typescript": "5.2.2"
  }
}
```

### Next.js Configuration

```typescript name=apps/web/next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.merajutasa.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverComponents: true,
    serverActions: true,
  },
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' https://trusted-cdn.com; img-src 'self' https://trusted-cdn.com data:; connect-src 'self' https://api.merajutasa.com; font-src 'self'; frame-src 'none'; object-src 'none'",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
```

### Theme Implementation

```typescript name=packages/ui/src/theme/tokens.ts
export const tokens = {
  colors: {
    brand: {
      blue: {
        50: "#E6F0FC",
        100: "#C6DBFA",
        200: "#94BEED",
        300: "#62A1E0",
        400: "#3D89D6",
        500: "#1A6BCC", // Primary ASA Blue
        600: "#1555A3",
        700: "#10407A",
        800: "#0B2B52",
        900: "#051529",
      },
      teal: {
        50: "#E0F5F5",
        100: "#B3E8E7",
        200: "#80D8D6",
        300: "#4DC7C5",
        400: "#26BBB8",
        500: "#00A9A5", // ASA Teal
        600: "#008784",
        700: "#006563",
        800: "#004342",
        900: "#002221",
      },
      coral: {
        50: "#FFEEEC",
        100: "#FFD6D0",
        200: "#FFBAB1",
        300: "#FF9D91",
        400: "#FF8476",
        500: "#FF6B5B", // ASA Coral
        600: "#CC5649",
        700: "#994037",
        800: "#662B24",
        900: "#331512",
      },
      gold: {
        50: "#FFF6E6",
        100: "#FFEAC0",
        200: "#FFDB99",
        300: "#FFCC73",
        400: "#FFC159",
        500: "#FFB549", // ASA Gold
        600: "#CC913A",
        700: "#996D2C",
        800: "#66481D",
        900: "#33240F",
      },
    },
    neutral: {
      deepSpace: "#121826", // Deep Space
      midnight: "#242D40", // Midnight
      stormCloud: "#6C7693", // Storm Cloud
      misty: "#DDE1EB", // Misty
      cloud: "#F5F7FC", // Cloud
      white: "#FFFFFF", // White
    },
    semantic: {
      success: "#0CAF60", // Success
      warning: "#FFB549", // Warning
      error: "#E53935", // Error
      info: "#2196F3", // Info
    },
  },
  typography: {
    fonts: {
      body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      heading: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    fontSizes: {
      display: "3rem",
      h1: "2rem",
      h2: "1.5rem",
      h3: "1.25rem",
      h4: "1.125rem",
      bodyLarge: "1.125rem",
      body: "1rem",
      bodySmall: "0.875rem",
      caption: "0.75rem",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      display: 1.2,
      h1: 1.25,
      h2: 1.3,
      h3: 1.4,
      h4: 1.4,
      body: 1.5,
    },
  },
  spacing: {
    "2xs": "0.25rem", // 4px
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "6rem", // 96px
  },
  radii: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(18, 24, 38, 0.05)",
    base: "0 1px 3px 0 rgba(18, 24, 38, 0.1), 0 1px 2px 0 rgba(18, 24, 38, 0.06)",
    md: "0 4px 6px -1px rgba(18, 24, 38, 0.1), 0 2px 4px -1px rgba(18, 24, 38, 0.06)",
    lg: "0 10px 15px -3px rgba(18, 24, 38, 0.1), 0 4px 6px -2px rgba(18, 24, 38, 0.05)",
    xl: "0 20px 25px -5px rgba(18, 24, 38, 0.1), 0 10px 10px -5px rgba(18, 24, 38, 0.04)",
    "2xl": "0 25px 50px -12px rgba(18, 24, 38, 0.25)",
  },
  transitions: {
    instant: "all 100ms ease-out",
    quick: "all 200ms ease-out",
    standard: "all 300ms ease-in-out",
    expressive: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
  zIndices: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default tokens;
```

```typescript name=packages/ui/src/theme/index.ts
import { extendTheme } from '@chakra-ui/react';
import tokens from './tokens';
import { components } from './components';
import { foundations } from './foundations';
import { semanticTokens } from './semanticTokens';
import { styles } from './styles';

// Create the theme
const theme = extendTheme({
  ...foundations,
  components,
  semanticTokens,
  styles,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    cssVarPrefix: 'merajut-asa',
  },
});

export { tokens };
export default theme;
```

### Accessibility-Focused Component Example

```typescript name=packages/ui/src/components/Button/Button.tsx
import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';
import { useReducedMotion } from '../../hooks';

export interface ButtonProps extends Omit<ChakraButtonProps, 'size'> {
  /**
   * The visual style of the button
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Icon to display before button text
   */
  iconLeft?: React.ReactElement;
  /**
   * Icon to display after button text
   */
  iconRight?: React.ReactElement;
  /**
   * Makes the button take the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Shows a loading spinner and disables the button
   */
  isLoading?: boolean;
  /**
   * Disables the button
   */
  isDisabled?: boolean;
}

/**
 * Primary UI component for user interaction.
 * Implements WCAG AA contrast requirements and proper ARIA attributes.
 */
export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth = false,
    isLoading = false,
    isDisabled = false,
    children,
    ...rest
  } = props;

  const prefersReducedMotion = useReducedMotion();
  
  // Get styles from the theme
  const styles = useStyleConfig('Button', { variant, size });

  return (
    <ChakraButton
      ref={ref}
      variant={variant}
      size={size}
      leftIcon={iconLeft}
      rightIcon={iconRight}
      width={fullWidth ? '100%' : 'auto'}
      isLoading={isLoading}
      isDisabled={isDisabled}
      sx={{
        ...styles,
        minWidth: '44px', // Ensure minimum touch target size
        minHeight: '44px', // Ensure minimum touch target size
        transition: prefersReducedMotion ? 'none' : undefined,
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
});

Button.displayName = 'Button';

export default Button;
```

```typescript name=packages/ui/src/components/Button/Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<Button isDisabled>Disabled Button</Button>);
    expect(screen.getByRole('button', { name: /disabled button/i })).toBeDisabled();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when disabled', async () => {
    const { container } = render(<Button isDisabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with icons', async () => {
    const { container } = render(
      <Button 
        iconLeft={<span aria-hidden="true">→</span>}
        iconRight={<span aria-hidden="true">←</span>}
      >
        Button with Icons
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Form Field Component with Accessibility

```typescript name=packages/ui/src/components/FormField/FormField.tsx
import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  VisuallyHidden,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface FormFieldProps extends Omit<ChakraInputProps, 'size'> {
  /**
   * Field ID used for associating label with input
   */
  id: string;
  /**
   * Label text for the form field
   */
  label: string;
  /**
   * Whether to visually hide the label (still available to screen readers)
   */
  hideLabel?: boolean;
  /**
   * Input type (text, email, password, etc.)
   */
  type?: string;
  /**
   * Whether the field is required
   */
  isRequired?: boolean;
  /**
   * Whether the field is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the field is read only
   */
  isReadOnly?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Size of the input
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Form field component with accessibility support.
 * Implements proper label association, error handling, and helper text.
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (props, ref) => {
    const {
      id,
      label,
      hideLabel = false,
      type = 'text',
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      error,
      helperText,
      size = 'md',
      ...rest
    } = props;

    // Generate IDs for associating helper text and error message with input
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    
    // Combine helper text and error IDs for aria-describedby
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <FormControl
        id={id}
        isRequired={isRequired}
        isInvalid={!!error}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      >
        {hideLabel ? (
          <VisuallyHidden>
            <FormLabel htmlFor={id}>{label}</FormLabel>
          </VisuallyHidden>
        ) : (
          <FormLabel htmlFor={id}>{label}</FormLabel>
        )}
        
        <Input
          ref={ref}
          id={id}
          type={type}
          aria-describedby={describedBy}
          size={size}
          {...rest}
        />
        
        {helperText && !error && (
          <FormHelperText id={helperId}>{helperText}</FormHelperText>
        )}
        
        {error && (
          <FormErrorMessage id={errorId}>{error}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
```

## API Gateway Implementation

### GraphQL API Gateway Setup

```typescript name=apps/api-gateway/src/index.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { json } from 'body-parser';
import { schema } from './schema';
import { createContext } from './context';
import { logger } from '@merajut-asa/logger';

// Create Express app
const app = express();

// Create HTTP server
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (error) => {
    // Log errors but don't expose internal details to clients
    logger.error('GraphQL Error:', error);
    
    // Return sanitized error
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      },
    };
  },
});

// Start server
async function startServer() {
  await server.start();
  
  // Security middleware
  app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
  
  // Rate limiting
  app.use(
    '/graphql',
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  
  // GraphQL endpoint
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || 'https://merajutasa.com',
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: createContext,
    })
  );
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
  // Start the HTTP server
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  
  logger.info('🚀 API Gateway ready at http://localhost:4000/graphql');
}

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
```

### GraphQL Schema Definition

```typescript name=apps/api-gateway/src/schema/index.ts
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { authTypeDefs, authResolvers } from './auth';
import { campaignTypeDefs, campaignResolvers } from './campaign';
import { userTypeDefs, userResolvers } from './user';
import { paymentTypeDefs, paymentResolvers } from './payment';
import { communityTypeDefs, communityResolvers } from './community';
import { notificationTypeDefs, notificationResolvers } from './notification';
import { directiveTransformers } from './directives';

// Base schema
const baseTypeDefs = `#graphql
  directive @auth on FIELD_DEFINITION
  directive @role(roles: [String!]!) on FIELD_DEFINITION
  directive @deprecated(reason: String) on FIELD_DEFINITION
  directive @rateLimit(limit: Int!, duration: Int!) on FIELD_DEFINITION

  type Query {
    _: Boolean
  }
  
  type Mutation {
    _: Boolean
  }
  
  type Subscription {
    _: Boolean
  }
`;

// Merge all type definitions
const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  authTypeDefs,
  campaignTypeDefs,
  userTypeDefs,
  paymentTypeDefs,
  communityTypeDefs,
  notificationTypeDefs,
]);

// Merge all resolvers
const resolvers = mergeResolvers([
  authResolvers,
  campaignResolvers,
  userResolvers,
  paymentResolvers,
  communityResolvers,
  notificationResolvers,
]);

// Create executable schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Apply directive transformers
schema = directiveTransformers.reduce((currentSchema, transformer) => {
  return transformer(currentSchema);
}, schema);

export { schema };
```

### Campaign Service Schema Example

```typescript name=apps/api-gateway/src/schema/campaign.ts
export const campaignTypeDefs = `#graphql
  enum CampaignStatus {
    DRAFT
    ACTIVE
    FUNDED
    COMPLETED
    EXPIRED
    CANCELED
  }
  
  enum CampaignCategory {
    EDUCATION
    MEDICAL
    DISASTER
    COMMUNITY
    CREATIVE
    BUSINESS
    ENVIRONMENT
    OTHER
  }
  
  type Campaign {
    id: ID!
    title: String!
    slug: String!
    description: String!
    story: String!
    goalAmount: Float!
    currentAmount: Float!
    contributorCount: Int!
    startDate: String!
    endDate: String!
    status: CampaignStatus!
    category: CampaignCategory!
    thumbnailUrl: String
    bannerUrl: String
    creatorId: ID!
    creator: User!
    updates: [CampaignUpdate!]!
    donations: [Donation!]!
    tags: [String!]!
    createdAt: String!
    updatedAt: String!
  }
  
  type CampaignUpdate {
    id: ID!
    campaignId: ID!
    title: String!
    content: String!
    publishedAt: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CampaignFilter {
    status: CampaignStatus
    category: CampaignCategory
    search: String
    tags: [String!]
    creatorId: ID
    minGoalAmount: Float
    maxGoalAmount: Float
    endDateBefore: String
    endDateAfter: String
  }
  
  input CampaignInput {
    title: String!
    description: String!
    story: String!
    goalAmount: Float!
    startDate: String!
    endDate: String!
    category: CampaignCategory!
    thumbnailUrl: String
    bannerUrl: String
    tags: [String!]
  }
  
  input CampaignUpdateInput {
    title: String!
    content: String!
  }
  
  extend type Query {
    campaign(id: ID!): Campaign @auth
    campaignBySlug(slug: String!): Campaign
    campaigns(filter: CampaignFilter, limit: Int, offset: Int): [Campaign!]!
    featuredCampaigns(limit: Int): [Campaign!]!
    myCampaigns: [Campaign!]! @auth
  }
  
  extend type Mutation {
    createCampaign(input: CampaignInput!): Campaign! @auth
    updateCampaign(id: ID!, input: CampaignInput!): Campaign! @auth
    publishCampaign(id: ID!): Campaign! @auth
    cancelCampaign(id: ID!): Campaign! @auth @role(roles: ["CREATOR", "ADMIN"])
    createCampaignUpdate(campaignId: ID!, input: CampaignUpdateInput!): CampaignUpdate! @auth @role(roles: ["CREATOR", "ADMIN"])
  }
  
  extend type Subscription {
    campaignUpdated(id: ID!): Campaign! @auth
  }
`;

export const campaignResolvers = {
  Query: {
    campaign: async (_, { id }, { dataSources, user }) => {
      return dataSources.campaignService.getCampaignById(id);
    },
    campaignBySlug: async (_, { slug }, { dataSources }) => {
      return dataSources.campaignService.getCampaignBySlug(slug);
    },
    campaigns: async (_, { filter, limit, offset }, { dataSources }) => {
      return dataSources.campaignService.getCampaigns(filter, limit, offset);
    },
    featuredCampaigns: async (_, { limit }, { dataSources }) => {
      return dataSources.campaignService.getFeaturedCampaigns(limit);
    },
    myCampaigns: async (_, __, { dataSources, user }) => {
      if (!user) throw new Error('Authentication required');
      return dataSources.campaignService.getCampaignsByUserId(user.id);
    },
  },
  Mutation: {
    createCampaign: async (_, { input }, { dataSources, user }) => {
      if (!user) throw new Error('Authentication required');
      return dataSources.campaignService.createCampaign({ ...input, creatorId: user.id });
    },
    updateCampaign: async (_, { id, input }, { dataSources, user }) => {
      if (!user) throw new Error('Authentication required');
      
      // Check if user is the creator or admin
      const campaign = await dataSources.campaignService.getCampaignById(id);
      if (campaign.creatorId !== user.id && !user.roles.includes('ADMIN')) {
        throw new Error('Not authorized to update this campaign');
      }
      
      return dataSources.campaignService.updateCampaign(id, input);
    },
    // Additional mutations...
  },
  Campaign: {
    creator: async (campaign, _, { dataSources }) => {
      return dataSources.userService.getUserById(campaign.creatorId);
    },
    updates: async (campaign, _, { dataSources }) => {
      return dataSources.campaignService.getCampaignUpdates(campaign.id);
    },
    donations: async (campaign, _, { dataSources }) => {
      return dataSources.paymentService.getDonationsByCampaignId(campaign.id);
    },
  },
};
```

## Microservice Implementation Example

### Campaign Service

```typescript name=apps/services/campaign-service/src/index.ts
import express from 'express';
import { connectDb } from './db';
import campaignRoutes from './routes/campaign';
import updateRoutes from './routes/update';
import { errorHandler } from './middlewares/error';
import { authMiddleware } from './middlewares/auth';
import { requestLogger } from './middlewares/logging';
import { rateLimiter } from './middlewares/rateLimiter';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '@merajut-asa/logger';

const app = express();
const port = process.env.PORT || 3001;

// Connect to database
connectDb().catch(err => {
  logger.error('Failed to connect to database:', err);
  process.exit(1);
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'https://merajutasa.com',
  credentials: true,
}));
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

// Auth middleware for protected routes
app.use(authMiddleware);

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/updates', updateRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Campaign service listening at http://localhost:${port}`);
});
```

### Database Model Example

```typescript name=apps/services/campaign-service/src/models/campaign.ts
import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  FUNDED = 'FUNDED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
}

export enum CampaignCategory {
  EDUCATION = 'EDUCATION',
  MEDICAL = 'MEDICAL',
  DISASTER = 'DISASTER',
  COMMUNITY = 'COMMUNITY',
  CREATIVE = 'CREATIVE',
  BUSINESS = 'BUSINESS',
  ENVIRONMENT = 'ENVIRONMENT',
  OTHER = 'OTHER',
}

export interface ICampaign extends Document {
  title: string;
  slug: string;
  description: string;
  story: string;
  goalAmount: number;
  currentAmount: number;
  contributorCount: number;
  startDate: Date;
  endDate: Date;
  status: CampaignStatus;
  category: CampaignCategory;
  thumbnailUrl?: string;
  bannerUrl?: string;
  creatorId: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    story: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
      min: 100000, // Minimum 100,000 IDR
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    contributorCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.DRAFT,
    },
    category: {
      type: String,
      enum: Object.values(CampaignCategory),
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    bannerUrl: {
      type: String,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title
campaignSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('title')) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    
    // Check if slug already exists
    const Campaign = mongoose.model('Campaign');
    let slug = baseSlug;
    let counter = 1;
    
    while (await Campaign.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  
  next();
});

// Validate that endDate is after startDate
campaignSchema.pre('validate', function (next) {
  if (this.endDate && this.startDate && this.endDate <= this.startDate) {
    this.invalidate('endDate', 'End date must be after start date');
  }
  next();
});

// Add indexes for common queries
campaignSchema.index({ status: 1, category: 1 });
campaignSchema.index({ tags: 1 });
campaignSchema.index({ endDate: 1 });
campaignSchema.index({ createdAt: -1 });

const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
```

### Campaign Service Repository

```typescript name=apps/services/campaign-service/src/repositories/campaign.ts
import Campaign, { CampaignStatus, ICampaign, CampaignCategory } from '../models/campaign';
import mongoose from 'mongoose';
import { NotFoundError, ValidationError } from '../errors';

export interface CampaignFilter {
  status?: CampaignStatus;
  category?: CampaignCategory;
  search?: string;
  tags?: string[];
  creatorId?: string;
  minGoalAmount?: number;
  maxGoalAmount?: number;
  endDateBefore?: Date;
  endDateAfter?: Date;
}

export class CampaignRepository {
  async findById(id: string): Promise<ICampaign> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError('Invalid campaign ID');
    }
    
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      throw new NotFoundError(`Campaign with ID ${id} not found`);
    }
    
    return campaign;
  }
  
  async findBySlug(slug: string): Promise<ICampaign> {
    const campaign = await Campaign.findOne({ slug });
    if (!campaign) {
      throw new NotFoundError(`Campaign with slug ${slug} not found`);
    }
    
    return campaign;
  }
  
  async findAll(filter: CampaignFilter = {}, limit = 20, offset = 0): Promise<ICampaign[]> {
    const query: any = {};
    
    // Apply filters
    if (filter.status) query.status = filter.status;
    if (filter.category) query.category = filter.category;
    if (filter.tags?.length) query.tags = { $in: filter.tags };
    if (filter.creatorId) query.creatorId = new mongoose.Types.ObjectId(filter.creatorId);
    
    if (filter.minGoalAmount || filter.maxGoalAmount) {
      query.goalAmount = {};
      if (filter.minGoalAmount) query.goalAmount.$gte = filter.minGoalAmount;
      if (filter.maxGoalAmount) query.goalAmount.$lte = filter.maxGoalAmount;
    }
    
    if (filter.endDateBefore || filter.endDateAfter) {
      query.endDate = {};
      if (filter.endDateBefore) query.endDate.$lte = filter.endDateBefore;
      if (filter.endDateAfter) query.endDate.$gte = filter.endDateAfter;
    }
    
    // Text search
    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } },
      ];
    }
    
    return Campaign.find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
  }
  
  async findFeatured(limit = 5): Promise<ICampaign[]> {
    // Find active campaigns with highest percentage of goal reached
    return Campaign.find({ status: CampaignStatus.ACTIVE })
      .sort({ currentAmount: -1, contributorCount: -1 })
      .limit(limit);
  }
  
  async findByCreatorId(creatorId: string): Promise<ICampaign[]> {
    return Campaign.find({ creatorId: new mongoose.Types.ObjectId(creatorId) })
      .sort({ createdAt: -1 });
  }
  
  async create(campaignData: Partial<ICampaign>): Promise<ICampaign> {
    const campaign = new Campaign(campaignData);
    return campaign.save();
  }
  
  async update(id: string, campaignData: Partial<ICampaign>): Promise<ICampaign> {
    const campaign = await this.findById(id);
    
    // Update allowed fields
    Object.keys(campaignData).forEach(key => {
      if (key !== '_id' && key !== 'creatorId' && key !== 'createdAt' && key !== 'updatedAt') {
        (campaign as any)[key] = (campaignData as any)[key];
      }
    });
    
    return campaign.save();
  }
  
  async updateStatus(id: string, status: CampaignStatus): Promise<ICampaign> {
    const campaign = await this.findById(id);
    campaign.status = status;
    return campaign.save();
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await Campaign.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
  
  async updateDonationStats(id: string, amount: number, isNewContributor: boolean): Promise<ICampaign> {
    const campaign = await this.findById(id);
    
    campaign.currentAmount += amount;
    if (isNewContributor) {
      campaign.contributorCount += 1;
    }
    
    // Check if goal has been reached
    if (campaign.currentAmount >= campaign.goalAmount && campaign.status === CampaignStatus.ACTIVE) {
      campaign.status = CampaignStatus.FUNDED;
    }
    
    return campaign.save();
  }
}

export default new CampaignRepository();
```

## Security Implementation

### Authentication Middleware

```typescript name=apps/services/auth-service/src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@merajut-asa/logger';
import { UnauthorizedError } from '../errors';

// Extended Request type with user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roles: string[];
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as {
      id: string;
      email: string;
      roles: string[];
    };
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Auth middleware error:', error);
    next();
  }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new UnauthorizedError('Authentication required');
  }
  next();
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }
    
    const hasRequiredRole = req.user.roles.some(role => roles.includes(role));
    if (!hasRequiredRole) {
      throw new UnauthorizedError('Insufficient permissions');
    }
    
    next();
  };
};
```

### CSRF Protection Middleware

```typescript name=packages/utils/src/middleware/csrf.ts
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors';

// Function to generate a CSRF token
export const generateCsrfToken = (sessionId: string): string => {
  const hmac = crypto.createHmac('sha256', process.env.CSRF_SECRET || 'csrf-secret');
  hmac.update(sessionId);
  return hmac.digest('hex');
};

// Middleware to check CSRF token
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip for non-mutating methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Get the session ID
  const sessionId = req.cookies['session-id'];
  if (!sessionId) {
    throw new ForbiddenError('Invalid session');
  }
  
  // Get the CSRF token from request
  const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;
  if (!csrfToken) {
    throw new ForbiddenError('CSRF token missing');
  }
  
  // Generate expected token
  const expectedToken = generateCsrfToken(sessionId);
  
  // Compare tokens using constant-time comparison to prevent timing attacks
  if (!crypto.timingSafeEqual(Buffer.from(csrfToken as string), Buffer.from(expectedToken))) {
    throw new ForbiddenError('Invalid CSRF token');
  }
  
  next();
};

// Middleware to include CSRF token in response
export const includeCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies['session-id'];
  if (sessionId) {
    res.locals.csrfToken = generateCsrfToken(sessionId);
  }
  next();
};
```

### Rate Limiting Middleware

```typescript name=packages/utils/src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { logger } from '@merajut-asa/logger';

// Create Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  logger.error('Redis error:', err);
});

// General rate limiter
export const standardRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
  keyGenerator: (req) => {
    // Use IP address and if available, user ID for more accurate rate limiting
    return req.ip + (req.user?.id ? `:${req.user.id}` : '');
  },
});

// Stricter rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many authentication attempts, please try again later.',
});

// Rate limiter for sensitive operations
export const sensitiveOpRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests for this operation, please try again later.',
});
```

## Infrastructure Setup

### Docker Compose for Local Development

```yaml name=docker-compose.yml
version: '3.8'

services:
  # Frontend
  web:
    build:
      context: .
      dockerfile: ./apps/web/Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./apps/web:/app/apps/web
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
    depends_on:
      - api-gateway

  # API Gateway
  api-gateway:
    build:
      context: .
      dockerfile: ./apps/api-gateway/Dockerfile.dev
    ports:
      - "4000:4000"
    volumes:
      - ./apps/api-gateway:/app/apps/api-gateway
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=4000
      - AUTH_SERVICE_URL=http://auth-service:3001
      - CAMPAIGN_SERVICE_URL=http://campaign-service:3002
      - PAYMENT_SERVICE_URL=http://payment-service:3003
      - USER_SERVICE_URL=http://user-service:3004
      - COMMUNITY_SERVICE_URL=http://community-service:3005
      - NOTIFICATION_SERVICE_URL=http://notification-service:3006
      - ALLOWED_ORIGINS=http://localhost:3000
      - REDIS_HOST=redis
    depends_on:
      - auth-service
      - campaign-service
      - payment-service
      - user-service
      - community-service
      - notification-service
      - redis

  # Auth Service
  auth-service:
    build:
      context: .
      dockerfile: ./apps/services/auth-service/Dockerfile.dev
    ports:
      - "3001:3001"
    volumes:
      - ./apps/services/auth-service:/app/apps/services/auth-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3001
      - MONGODB_URI=mongodb://mongodb:27017/merajut-auth
      - JWT_SECRET=dev-jwt-secret
      - JWT_EXPIRES_IN=1d
      - REFRESH_TOKEN_SECRET=dev-refresh-secret
      - REFRESH_TOKEN_EXPIRES_IN=7d
      - REDIS_HOST=redis
    depends_on:
      - mongodb
      - redis

  # Campaign Service
  campaign-service:
    build:
      context: .
      dockerfile: ./apps/services/campaign-service/Dockerfile.dev
    ports:
      - "3002:3002"
    volumes:
      - ./apps/services/campaign-service:/app/apps/services/campaign-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3002
      - MONGODB_URI=mongodb://mongodb:27017/merajut-campaigns
      - JWT_SECRET=dev-jwt-secret
    depends_on:
      - mongodb

  # Payment Service
  payment-service:
    build:
      context: .
      dockerfile: ./apps/services/payment-service/Dockerfile.dev
    ports:
      - "3003:3003"
    volumes:
      - ./apps/services/payment-service:/app/apps/services/payment-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3003
      - POSTGRES_URI=postgres://postgres:postgres@postgres:5432/merajut-payments
      - JWT_SECRET=dev-jwt-secret
      - MIDTRANS_SERVER_KEY=dev-midtrans-server-key
      - MIDTRANS_CLIENT_KEY=dev-midtrans-client-key
      - MIDTRANS_ENV=sandbox
    depends_on:
      - postgres

  # User Service
  user-service:
    build:
      context: .
      dockerfile: ./apps/services/user-service/Dockerfile.dev
    ports:
      - "3004:3004"
    volumes:
      - ./apps/services/user-service:/app/apps/services/user-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3004
      - MONGODB_URI=mongodb://mongodb:27017/merajut-users
      - JWT_SECRET=dev-jwt-secret
    depends_on:
      - mongodb

  # Community Service
  community-service:
    build:
      context: .
      dockerfile: ./apps/services/community-service/Dockerfile.dev
    ports:
      - "3005:3005"
    volumes:
      - ./apps/services/community-service:/app/apps/services/community-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3005
      - MONGODB_URI=mongodb://mongodb:27017/merajut-community
      - JWT_SECRET=dev-jwt-secret
    depends_on:
      - mongodb

  # Notification Service
  notification-service:
    build:
      context: .
      dockerfile: ./apps/services/notification-service/Dockerfile.dev
    ports:
      - "3006:3006"
    volumes:
      - ./apps/services/notification-service:/app/apps/services/notification-service
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
      - PORT=3006
      - MONGODB_URI=mongodb://mongodb:27017/merajut-notifications
      - JWT_SECRET=dev-jwt-secret
      - REDIS_HOST=redis
      - SMTP_HOST=mailhog
      - SMTP_PORT=1025
      - SMTP_USER=
      - SMTP_PASS=
      - SMTP_FROM=noreply@merajutasa.com
    depends_on:
      - mongodb
      - redis
      - mailhog

  # MongoDB (for document-based services)
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=
      - MONGO_INITDB_ROOT_PASSWORD=

  # PostgreSQL (for transactional services)
  postgres:
    image: postgres:14
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=merajut-payments

  # Redis (for caching and session)
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  # Elasticsearch (for search)
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data

  # MailHog (for email testing)
  mailhog:
    image: mailhog/mailhog
    ports:
      - "8025:8025"
      - "1025:1025"

volumes:
  mongodb-data:
  postgres-data:
  redis-data:
  elasticsearch-data:
```

### Kubernetes Deployment for Campaign Service

```yaml name=infrastructure/kubernetes/campaign-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: campaign-service
  namespace: merajut-asa
  labels:
    app: campaign-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: campaign-service
  template:
    metadata:
      labels:
        app: campaign-service
    spec:
      containers:
      - name: campaign-service
        image: ${ECR_REPOSITORY}/campaign-service:${IMAGE_TAG}
        ports:
        - containerPort: 3002
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3002"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: secret
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3002
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3002
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 1000
          capabilities:
            drop:
            - ALL
      securityContext:
        fsGroup: 1000
---
apiVersion: v1
kind: Service
metadata:
  name: campaign-service
  namespace: merajut-asa
spec:
  selector:
    app: campaign-service
  ports:
  - port: 3002
    targetPort: 3002
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: campaign-service
  namespace: merajut-asa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: campaign-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: campaign-service-network-policy
  namespace: merajut-asa
spec:
  podSelector:
    matchLabels:
      app: campaign-service
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-gateway
    ports:
    - protocol: TCP
      port: 3002
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
  - to:
    - podSelector:
        matchLabels:
          app: mongodb
    ports:
    - protocol: TCP
      port: 27017
```

## Accessibility Implementation

### Accessibility Wrapper Component

```typescript name=packages/ui/src/providers/AccessibilityProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

interface AccessibilityContextType {
  // Preference states
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersFontSize: 'normal' | 'large' | 'x-large';
  
  // User-configurable settings (overrides browser preferences)
  userReducedMotion: boolean | null;
  userHighContrast: boolean | null;
  userFontSize: 'normal' | 'large' | 'x-large' | null;
  
  // Effective values (combines browser preferences and user settings)
  effectiveReducedMotion: boolean;
  effectiveHighContrast: boolean;
  effectiveFontSize: 'normal' | 'large' | 'x-large';
  
  // Setters for user preferences
  setUserReducedMotion: (value: boolean | null) => void;
  setUserHighContrast: (value: boolean | null) => void;
  setUserFontSize: (value: 'normal' | 'large' | 'x-large' | null) => void;
  
  // Reset all user preferences to browser defaults
  resetUserPreferences: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }>
```