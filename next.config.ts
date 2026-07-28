import type { NextConfig } from "next";

/**
 * GitHub Pages serves from https://<user>.github.io/<repo>, so every asset needs
 * a basePath prefix. The deploy workflow sets NEXT_PUBLIC_BASE_PATH; local dev
 * leaves it empty and serves from the root.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
// A user/org Pages site reports "/" as its base path, but Next rejects "/" —
// normalise it (and any trailing slash) to an empty string.
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // Static export has no image optimisation server.
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
