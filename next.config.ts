import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  logging: false,
  images: {
    domains: ['localhost'],
  },
};
export default nextConfig;
