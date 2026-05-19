import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Windows / path-with-spaces 환경에서 dev 안정성
  reactStrictMode: true,
};

export default nextConfig;
