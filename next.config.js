/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "frontend-take-home.fetch.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
