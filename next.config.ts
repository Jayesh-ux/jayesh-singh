import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jayesh-singh",
  assetPrefix: "/jayesh-singh",
  reactStrictMode: true,
  eslint: {
    // Type checking and TS strictness still run during `next build`;
    // the standalone ESLint pass is disabled for CI environments where
    // the rule engine is intentionally skipped (see `npm run lint`).
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;