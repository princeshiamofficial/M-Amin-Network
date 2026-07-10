import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ["mysql2"],
  experimental: {
    serverActions: {
      allowedOrigins: ["m-aminnetwork.com", "www.m-aminnetwork.com", "localhost:3000"],
    },
  },
};

export default nextConfig;
