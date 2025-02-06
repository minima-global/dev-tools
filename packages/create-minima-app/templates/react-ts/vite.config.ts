import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react-swc"
import { copyFileSync } from "fs"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  base: "",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    TanStackRouterVite(),
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "Android >= 9"],
    }),
    {
      name: "copy-changelog",
      closeBundle() {
        try {
          copyFileSync("CHANGELOG.md", "build/CHANGELOG.md")
        } catch (error) {
          console.warn(
            "Could not copy CHANGELOG.md, please check that it exists in the root directory"
          )
        }
      },
    },
  ],
})
