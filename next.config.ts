import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to fully static HTML/CSS/JS in `out/` so the site can be hosted
  // anywhere (Cloudflare Pages, Vercel, GitHub Pages, Netlify, S3, ...).
  // Remove `output: "export"` if you later add server-only features.
  output: "export",

  // Emit `/privacy/index.html` instead of `/privacy.html` so clean URLs work
  // on any static host without extra rewrite rules.
  trailingSlash: true,

  // Image Optimization requires a server; disable it for static export.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
