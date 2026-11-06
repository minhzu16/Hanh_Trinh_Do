/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias:
      mode === "test"
        ? undefined
        : [
          {
            find: "./screens/eagerScreens",
            replacement: resolve(import.meta.dirname, "src/screens/eagerScreens.empty.ts")
          }
        ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/art/backgrounds/")) {
            return "art-backgrounds";
          }
          if (id.includes("src/art/cgIllustrations")) {
            return "art-cg";
          }
          if (id.includes("src/art/characterSprites")) {
            return "art-sprites";
          }
          if (id.includes("src/engine/voiceManifest")) {
            return "voice-manifest";
          }
          if (id.includes("src/audio")) {
            return "audio";
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"]
  }
}));
