import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/heli-weather",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
