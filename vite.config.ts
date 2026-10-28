// ===== GT6: defineConfig now comes from vitest/config =====
// Vitest reads this same file, so the React plugin and the "@" alias work
// in tests with no second config file. Importing defineConfig from
// vitest/config (not from vite) is what lets TypeScript accept the
// `test` block below. npm run dev and npm run build ignore that block.
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    // A pretend browser page inside Node, so render() has a document to
    // put the component in. Tests run in a terminal, not a browser tab.
    environment: "jsdom",
    // Runs before every test file: adds toBeInTheDocument() and friends,
    // and empties the page between tests.
    setupFiles: ["./src/test/setup.ts"],
    // client.ts throws at import if VITE_API_URL is missing, and the pages
    // import client.ts. The tests never call this address -- they check
    // that forms stop BEFORE any request -- so a fixed value here means the
    // tests need no .env, on your laptop or on GitHub.
    env: { VITE_API_URL: "http://localhost:4000" },
  },
});
