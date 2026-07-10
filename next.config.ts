import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ["mysql2"],
  serverActions: {
    allowedOrigins: ["m-aminnetwork.com", "www.m-aminnetwork.com", "localhost:3000"],
  },
};

export default nextConfig;
