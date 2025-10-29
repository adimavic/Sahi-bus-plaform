import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // Static export build
  images: {
    unoptimized: true, // required for static hosting
  },
  // ✅ Critical: ensure correct asset and base paths for GitHub Pages
  basePath: isProd ? "/Sahi-bus-plaform" : "",
  assetPrefix: isProd ? "/Sahi-bus-plaform" : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
