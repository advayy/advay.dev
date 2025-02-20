import { defineConfig } from "vite";

export default defineConfig({
  base: "/advay.dev/",
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
    assetsInclude: ["**/*.glb", "**/*.png", "**/*.jpg", "**/*.gltf"],
});