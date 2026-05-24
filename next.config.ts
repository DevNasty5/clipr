import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["gsap", "mixpanel-browser"],
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  // Optimize bundle
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
