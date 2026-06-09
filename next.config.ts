import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.crownmate.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "friztyretail.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 390, 414, 640, 768, 1024, 1280, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 360, 384],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
    ],
  },
};

export default nextConfig;
