import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? "/remont-calculator" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/remont-calculator" : "",
};

export default nextConfig;
