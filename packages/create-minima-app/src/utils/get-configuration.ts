import { existsSync } from "fs"
import { join } from "path"

interface Configuration {
  exists: boolean
  template: "react-ts" | "vanilla-js" | null
}

export async function getConfiguration(): Promise<Configuration> {
  // Get current directory
  const currentDir = process.cwd()

  // Check for React TypeScript specific files
  const isReactTS =
    existsSync(join(currentDir, "src", "AppContext.tsx")) ||
    existsSync(join(currentDir, "src", "routes"))

  const dappConfLocation = isReactTS ? "public" : "."
  const dappConfPath = join(currentDir, dappConfLocation, "dapp.conf")

  // If dapp.conf doesn't exist, return early
  if (!existsSync(dappConfPath)) {
    return {
      exists: false,
      template: null,
    }
  }

  return {
    exists: true,
    template: isReactTS ? "react-ts" : "vanilla-js",
  }
}
