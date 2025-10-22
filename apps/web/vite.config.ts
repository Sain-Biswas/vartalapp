import { resolve } from "path";
import tailwindcssVite from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]]
      }
    }),
    tailwindcssVite(),
    tanstackRouter({ autoCodeSplitting: true, target: "react" })
  ],
  resolve: {
    alias: {
      "@web": resolve(import.meta.dirname, "./src"),
      "@server": resolve(import.meta.dirname, "../server/src")
    }
  },
  build: {
    outDir: "../server/public",
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080"
    }
  }
});
