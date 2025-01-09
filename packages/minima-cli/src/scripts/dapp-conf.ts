import { readFileSync, writeFileSync } from "fs"
import { isReactProject } from "../utils/is-react-project.js"

export async function configureDappConf(logs: boolean = false) {
  const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))

  // Try both build folder and root directory

  const isReact = isReactProject()

  let dAppConfPath = isReact ? "./build/dapp.conf" : "./dapp.conf"

  readFileSync(dAppConfPath, "utf-8")

  if (logs) {
    console.log("dAppConfPath", dAppConfPath)
  }

  let dAppConf = readFileSync(dAppConfPath, "utf-8")

  if (logs) {
    console.log("dAppConf", dAppConf)
  }

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  dAppConf = dAppConf.replace("{{name}}", capitalize(packageJson.name))
  dAppConf = dAppConf.replace("{{version}}", packageJson.version)
  dAppConf = dAppConf.replace("{{description}}", packageJson.description || "")
  dAppConf = dAppConf.replace("{{category}}", packageJson.category || "other")

  writeFileSync(dAppConfPath, dAppConf)
}
