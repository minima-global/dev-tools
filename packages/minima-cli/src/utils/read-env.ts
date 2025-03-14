import { existsSync, readFileSync } from "fs"
import { resolve } from "path"
import { logger } from "./logger.js"

interface DebugEnvVars {
  debug: boolean
  host: string
  mdsPort: number
  sessionId: string
}

/**
 * Reads environment variables from the .env file in the project root
 * @returns Object containing the environment variables
 */
export function readEnvVars(): DebugEnvVars {
  try {
    // Default values
    const defaultEnvVars: DebugEnvVars = {
      debug: false,
      host: "127.0.0.1",
      mdsPort: 9003,
      sessionId: "",
    }

    // Find the .env file
    const envPath = resolve(process.cwd(), ".env")

    if (!existsSync(envPath)) {
      logger.error("No .env file found, using default values")
      return defaultEnvVars
    }

    // Read the .env file
    const envContent = readFileSync(envPath, "utf-8")
    const envLines = envContent.split("\n")

    // Parse the environment variables
    const envVars: Record<string, string> = {}

    for (const line of envLines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith("#")) continue

      const [key, ...valueParts] = trimmedLine.split("=")
      if (key && valueParts.length > 0) {
        envVars[key] = valueParts.join("=")
      }
    }

    // Extract the relevant environment variables
    return {
      debug: envVars.VITE_DEBUG === "true",
      host: envVars.VITE_DEBUG_HOST || defaultEnvVars.host,
      mdsPort: parseInt(
        envVars.VITE_DEBUG_MDS_PORT || String(defaultEnvVars.mdsPort),
        10
      ),
      sessionId: envVars.VITE_DEBUG_SESSION_ID || defaultEnvVars.sessionId,
    }
  } catch (error) {
    logger.error(`Error reading environment variables: ${error}`)
    return {
      debug: false,
      host: "127.0.0.1",
      mdsPort: 9003,
      sessionId: "",
    }
  }
}
