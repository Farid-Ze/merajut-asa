/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

// Security headers configuration as per project documentation
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
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
    key: 'Content-Security-Policy',
    value: process.env.NODE_ENV === 'production' 
      ? `
        default-src 'self';
        script-src 'self' 'wasm-unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data:;
        connect-src 'self';
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
      `.replace(/\s+/g, ' ').trim()
      : `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data:;
        connect-src 'self' ws: wss:;
      `.replace(/\s+/g, ' ').trim()
  }
];

const nextConfig = {
  transpilePackages: ['@merajut-asa/ui'],
  output: 'standalone',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  
  // Performance optimizations
  optimizePackageImports: ['@chakra-ui/react', 'framer-motion'],
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Build optimizations for production
  swcMinify: true,
  poweredByHeader: false,
  
  // Development configuration
  eslint: { 
    ignoreDuringBuilds: process.env.NODE_ENV === 'development' 
  },
  typescript: { 
    ignoreBuildErrors: process.env.NODE_ENV === 'development' 
  },
  
  // Experimental features
  experimental: {
    esmExternals: true,
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion'],
  }
};

module.exports = withPWA(nextConfig);
