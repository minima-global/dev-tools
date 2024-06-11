import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import capitalize from "lodash/capitalize"
import { defineConfig, loadEnv } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import packageJson from "./package.json"

export default ({ mode }) => {
  let devEnv = ""
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd())

  console.log("env", env)
  console.log("running with MODE", mode)

  if (mode === "development" || mode === "dev") {
    devEnv = `
      <script>
        var DEBUG = "${env.VITE_DEBUG}" === 'true';
        var DEBUG_HOST = "${env.VITE_DEBUG_HOST}";
        var DEBUG_PORT = "${env.VITE_DEBUG_MDS_PORT}";
        var DEBUG_UID = "${env.VITE_DEBUG_UID}";
      </script>
    `

    console.log("devEnv", devEnv)
  }

  return defineConfig({
    base: "",
    build: {
      outDir: "dist",
    },

    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11", "Android >= 9"],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: packageJson.name.split("_").map(capitalize).join(""),
            devEnv,
          },
        },
      }),
    ],
  })
}
