import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain to allowed list
  },
  /* config options here */
};

export default nextConfig;
