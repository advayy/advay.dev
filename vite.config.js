import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
        input: [
            "index.html",
            "about.html",
            "developer-projects.html",
            "3d-portfolio.html",
            "pixel-art.html",
        ]
        },
    },
});