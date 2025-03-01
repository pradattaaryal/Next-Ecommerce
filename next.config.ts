import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ecommercex.s3.us-east-1.amazonaws.com'],
  },
<<<<<<< HEAD
  eslint: {
=======
    eslint: {
>>>>>>> 5e49714d4a9548b76517914cf37c91a60ec181cf
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
};

export default nextConfig;
 