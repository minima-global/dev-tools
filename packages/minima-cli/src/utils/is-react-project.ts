import { existsSync, readFileSync } from "fs"
import { join } from "path"

export function isReactProject(projectPath: string = process.cwd()): boolean {
  try {
    // Check package.json
    const packageJsonPath = join(projectPath, "package.json")
    if (!existsSync(packageJsonPath)) {
      return false
    }

    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

    // Check if template is react-ts
    if (packageJson.template === "react-ts") {
      return true
    }

    // Check dependencies and devDependencies for React
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }
    if (dependencies.react || dependencies["@types/react"]) {
      return true
    }

    // Check for common React file extensions
    const srcPath = join(projectPath, "src")
    if (existsSync(srcPath)) {
      const appFile = join(srcPath, "App.tsx")
      const appJsxFile = join(srcPath, "App.jsx")
      if (existsSync(appFile) || existsSync(appJsxFile)) {
        return true
      }
    }

    return false
  } catch (error) {
    return false
  }
}
