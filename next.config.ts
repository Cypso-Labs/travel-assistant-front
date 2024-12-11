import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Add the domain of the image source
  },
  logging: false,
};

export default nextConfig;
