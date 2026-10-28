// ===== GT6: a NEW file ================================================
// vite.config.ts names this file in test.setupFiles, so Vitest runs it
// before every test file. The app itself never imports it.
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds checks such as toBeInTheDocument() to expect(), and tells
// TypeScript they exist.
import "@testing-library/jest-dom/vitest";

// render() puts every component into the same pretend page. Without this,
// the second test would still see what the first one rendered.
afterEach(() => {
  cleanup();
});
