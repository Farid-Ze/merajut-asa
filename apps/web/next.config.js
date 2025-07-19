const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations aligned with <1.5s LCP target
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion'],
    turbotrace: {
      logLevel: 'error'
    }
  },

  // Image optimization for performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Future: Add your CDN domain here
    // domains: ['cdn.merajutasa.org'],
  },

  // Compression and bundle optimization
  compress: true,
  poweredByHeader: false,
  
  // Security headers aligned with "Security by Design"
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval and unsafe-inline
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.merajutasa.org", // Future: Your API domain
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  },

  // Bundle analyzer for performance monitoring
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Performance budget enforcement
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Split vendor chunks for better caching
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
          priority: 20,
          maxSize: 400000, // 400KB max vendor chunk size
        },
        // Split common chunks
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          maxSize: 300000, // 300KB max common chunk size
        }
      };

      // Performance budget warnings
      config.performance = {
        hints: 'warning',
        maxAssetSize: 400000, // 400KB
        maxEntrypointSize: 300000, // 300KB
        assetFilter: function(assetFilename) {
          return !assetFilename.endsWith('.map');
        }
      };
    }

    // Bundle analysis in CI
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer 
            ? '../analyze/server.html' 
            : './analyze/client.html'
        })
      );
    }

    return config;
  },

  // Environment variables for feature flags
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration for static export if needed
  // output: 'standalone', // Disabled for now to fix prerender errors
  
  // Internationalization support for Indonesian locale
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    localeDetection: true,
  },

  // Redirects for SEO and UX
  async redirects() {
    return [
      {
        source: '/kampanye',
        destination: '/campaigns',
        permanent: true,
      },
      {
        source: '/donasi',
        destination: '/donate',
        permanent: true,
      }
    ];
  },

  // Rewrites for API proxy in development
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/graphql',
          destination: 'http://localhost:4000/graphql', // Local GraphQL server
        }
      ];
    }
    return [];
  },

  // Fix SSR issues with Chakra UI and styled-jsx
  experimental: {
    esmExternals: false
  },
  
  // Disable static generation for error pages to avoid context issues
  generateStaticParams: false,
  
  // Skip static optimization for pages with context issues
  unstable_includeFiles: ['**/*.{js,jsx,ts,tsx}']
};

module.exports = withPWA(nextConfig);
