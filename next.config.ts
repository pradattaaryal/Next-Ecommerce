import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ecommercexx.s3.us-east-1.amazonaws.com'],
  },
    eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
};

export default nextConfig;
 
