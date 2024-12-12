import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { getInstallCommand, getPackageManager } from "./get-package-manager.js"
import { logger } from "./logger.js"
import { spinner } from "./spinner.js"

export async function configureCli(projectPath: string) {
  try {
    const packageJsonPath = path.join(projectPath, "package.json")
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

    // Check if @minima-global/minima-cli is already installed
    const hasMinimaCli =
      packageJson.devDependencies?.["@minima-global/minima-cli"] ||
      packageJson.dependencies?.["@minima-global/minima-cli"]

    const packageManager = getPackageManager()
    const installSpinner = spinner("Configuring Minima CLI...").start()

    if (!hasMinimaCli) {
      installSpinner.text = "Installing Minima CLI..."
      execSync(
        `${getInstallCommand(packageManager)} --save-dev @minima-global/minima-cli`,
        {
          stdio: "inherit",
          cwd: projectPath,
        }
      )
    }

    installSpinner.text = "Configuring Minima CLI scripts..."

    // Check if scripts already exist
    const hasExistingScripts = Object.keys(packageJson.scripts || {}).some(
      (script) => script.startsWith("minima:")
    )

    if (!hasExistingScripts) {
      packageJson.scripts = {
        ...packageJson.scripts,
        "minima:install": "minima install",
        "minima:update": "minima update",
        "minima:uninstall": "minima uninstall",
        "minima:refresh": "minima zip && minima uninstall && minima install",
      }

      // Write updated package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + "\n"
      )
    }

    installSpinner.succeed(
      hasMinimaCli && hasExistingScripts
        ? "Minima CLI already configured"
        : "Successfully configured Minima CLI scripts"
    )
  } catch (error) {
    logger.error("Failed to configure Minima CLI:", error)
    throw error
  }
}
