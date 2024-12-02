import { readFileSync, writeFileSync } from "fs"

export async function postBuild() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
  let dAppConf = readFileSync("./build/dapp.conf", "utf-8")

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  dAppConf = dAppConf.replace("{{name}}", capitalize(packageJson.name))
  dAppConf = dAppConf.replace("{{version}}", packageJson.version)
  dAppConf = dAppConf.replace("{{description}}", packageJson.description || "")
  dAppConf = dAppConf.replace("{{category}}", packageJson.category || "other")

  writeFileSync("./build/dapp.conf", dAppConf)
}
