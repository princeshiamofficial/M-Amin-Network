/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  serverExternalPackages: ["mysql2"],
  experimental: {
    serverActions: {
      allowedOrigins: ["m-aminnetwork.com", "www.m-aminnetwork.com", "localhost:3000"],
    },
  },
};

module.exports = nextConfig;
