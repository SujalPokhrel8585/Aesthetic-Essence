import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The three.js hero chunk (~1MB, loaded async after first paint) is a
    // known, intentional outlier — raise the warning bar rather than split
    // it further. Revisit if other chunks grow past this too.
    chunkSizeWarningLimit: 1100,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    watch: {
      // On Windows, fs.watch can crash the dev server with a fatal EBUSY
      // error when a file is locked by another process (e.g. an image open
      // in a viewer, cloud sync, or antivirus scan). Polling-based watching
      // avoids this, and public/ assets don't need HMR watching anyway
      // (they are served statically and picked up on refresh).
      usePolling: true,
      interval: 500,
      // dist/ and *.tsbuildinfo are written by npm run build / tsc -b: watching
      // them made every build while the dev server ran trigger HMR churn
      // (reload storms, degraded fast-refresh state, blank pages) - ignore them.
      ignored: ["**/public/**", "**/dist/**", "**/node_modules/**", "**/*.tsbuildinfo"],
    },
  },
  // ✅ ADDED: Allows Cloudflare Tunnel URLs to access your preview server
  preview: {
    allowedHosts: true,
  },
});
