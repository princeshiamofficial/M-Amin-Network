/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["mysql2"],
  allowedDevOrigins: ["*.trycloudflare.com", "trycloudflare.com", "localhost:3000"],
  experimental: {
    serverActions: {
      allowedOrigins: ["m-aminnetwork.com", "www.m-aminnetwork.com", "localhost:3000", "*.trycloudflare.com", "trycloudflare.com"],
    },
  },
};

module.exports = nextConfig;
