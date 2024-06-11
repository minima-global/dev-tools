import fs from "fs"
import capitalize from "lodash/fp/capitalize.js"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packageJsonAsString = fs.readFileSync(
  __dirname + "/../package.json",
  "utf-8"
)
const packageJson = JSON.parse(packageJsonAsString)

const name = packageJson.name.split("_").map(capitalize).join("")

let dAppConf = fs.readFileSync("./dist/dapp.conf", "utf-8")
dAppConf = dAppConf.replace("{{name}}", name)
dAppConf = dAppConf.replace("{{version}}", packageJson.version)
dAppConf = dAppConf.replace("{{description}}", packageJson.description)

fs.writeFileSync("./dist/dapp.conf", dAppConf)
