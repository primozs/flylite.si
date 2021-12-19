const withPreCompression = require('@moxy/next-pre-compression');
const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

// https://nextjs.org/docs/advanced-features/security-headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  withPreCompression({
    pwa: {
      disable: !isProd,
      dest: 'public',
    },
    compress: isProd,
    async headers() {
      return [
        {
          // Apply these headers to all routes in application
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
    reactStrictMode: false,
    poweredByHeader: false,
  })
);
