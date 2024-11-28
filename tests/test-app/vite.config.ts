import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "",
  build: {
    outDir: "dist",
  },

  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "Android >= 9"],
    }),
  ],
})
