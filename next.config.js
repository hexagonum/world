/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
});

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: isProd ? '/weather' : undefined,
  assetPrefix: isProd ? '/weather/' : undefined,
};

module.exports = withPWA(nextConfig);
