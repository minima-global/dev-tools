import { execSync } from "child_process"

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

export function getPackageManager(): PackageManager {
  try {
    // Check if running with npm
    if (process.env.npm_config_user_agent) {
      if (process.env.npm_config_user_agent.startsWith("yarn")) {
        return "yarn"
      }
      if (process.env.npm_config_user_agent.startsWith("pnpm")) {
        return "pnpm"
      }
      if (process.env.npm_config_user_agent.startsWith("bun")) {
        return "bun"
      }
      return "npm"
    }

    // Fallback to checking which package managers are installed
    try {
      execSync("bun -v", { stdio: "ignore" })
      return "bun"
    } catch {
      try {
        execSync("pnpm -v", { stdio: "ignore" })
        return "pnpm"
      } catch {
        try {
          execSync("yarn -v", { stdio: "ignore" })
          return "yarn"
        } catch {
          return "npm"
        }
      }
    }
  } catch {
    return "npm" // Default to npm if all else fails
  }
}

export function getInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case "npm":
      return "npm install"
    case "yarn":
      return "yarn"
    case "pnpm":
      return "pnpm install"
    case "bun":
      return "bun install"
  }
}

export function getRunCommand(
  packageManager: PackageManager,
  script: string
): string {
  switch (packageManager) {
    case "npm":
      return `npm run ${script}`
    case "yarn":
      return `yarn run ${script}`
    case "pnpm":
      return `pnpm run ${script}`
    case "bun":
      return `bun run ${script}`
  }
}
