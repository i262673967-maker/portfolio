import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* A stray package-lock.json in the user home directory makes Turbopack infer
     the wrong project root without this. */
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
