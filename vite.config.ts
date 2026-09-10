import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Project site deploys under /<repo>/ — required so built asset URLs
  // resolve correctly on GitHub Pages (johntaylorjt8870-cell.github.io/English-Course/).
  base: "/English-Course/",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    // Allow the Arena live-preview proxy host (Vite 7 blocks unknown hosts)
    allowedHosts: true,
  },
});
