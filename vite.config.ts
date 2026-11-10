import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// BASE_PATH is "/<repo-name>/" for the GitHub Pages demo and "/" for clarity2027.org (one.com).
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // The site code in src/frame is the Dust prototype, unchanged. These two small files replace Dust-only helpers.
      "@dust/frame": fileURLToPath(new URL("./src/shims/frame.tsx", import.meta.url)),
      "@dust/react-hooks": fileURLToPath(new URL("./src/shims/react-hooks.ts", import.meta.url)),
    },
  },
});
