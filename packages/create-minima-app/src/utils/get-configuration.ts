import { existsSync } from "fs"
import { join } from "path"

export async function getConfiguration() {
  const currentDir = process.cwd()
  const dappConfPath = join(currentDir, "public", "dapp.conf")
  if (existsSync(dappConfPath)) {
    return true
  }
  return false
}
