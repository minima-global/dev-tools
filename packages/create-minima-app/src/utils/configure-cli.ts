import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { getInstallCommand, getPackageManager } from "./get-package-manager.js"
import { logger } from "./logger.js"
import { spinner } from "./spinner.js"

export async function configureCli(projectPath: string, template: string) {
  const installSpinner = spinner("Configuring Minima CLI...").start()

  try {
    const packageJsonPath = path.join(projectPath, "package.json")
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

    // Check if required packages are already installed
    let hasMinimaCli =
      packageJson.devDependencies?.["@minima-global/minima-cli"] ||
      packageJson.dependencies?.["@minima-global/minima-cli"]

    let hasMds =
      packageJson.devDependencies?.["@minima-global/mds"] ||
      packageJson.dependencies?.["@minima-global/mds"]

    const isReactTemplate = template.toLowerCase().includes("react")

    const packageManager = getPackageManager()

    if (!hasMinimaCli || (isReactTemplate && !hasMds)) {
      installSpinner.stop()

      logger.secondary("Installing required packages...")

      // Install minima-cli as dev dependency if needed
      if (!hasMinimaCli) {
        execSync(
          `${getInstallCommand(packageManager)} -D @minima-global/minima-cli`,
          {
            cwd: projectPath,
            stdio: "inherit", // Show installation output
          }
        )
      }

      // Install MDS as regular dependency if needed for React template
      if (isReactTemplate && !hasMds) {
        execSync(`${getInstallCommand(packageManager)} @minima-global/mds`, {
          cwd: projectPath,
          stdio: "inherit", // Show installation output
        })
      }

      // Re-read package.json after installations
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

      installSpinner.start()
    }

    installSpinner.text = "Configuring Minima CLI scripts..."

    // Check if scripts already exist
    const hasExistingScripts = Object.keys(packageJson.scripts || {}).some(
      (script) => script.startsWith("minima:")
    )

    if (!hasExistingScripts) {
      packageJson.scripts = {
        ...packageJson.scripts,
        "minima:zip": "minima zip",
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
    installSpinner.fail("Failed to configure Minima CLI")
    logger.error(error instanceof Error ? error.message : String(error))
    throw error
  }
}
