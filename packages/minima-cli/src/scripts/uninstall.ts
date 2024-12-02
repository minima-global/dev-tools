import axios from "axios"
import { readFileSync } from "fs"
import { logger } from "../utils/logger.js"

export async function uninstall() {
  try {
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1)

    const response = await axios.get("http://localhost:9005/mds")
    const foundInstallations = response.data.response.minidapps.filter(
      (i: any) => i.conf.name === capitalize(packageJson.name)
    )
    const foundInstallationUIDS = foundInstallations.map((i: any) => i.uid)

    for (const uid of foundInstallationUIDS) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await axios.get(
        `http://localhost:9005/mds ${encodeURIComponent("action:uninstall uid:")}${uid}`
      )
      logger.info(`Successfully uninstalled minidapp uid:${uid}`)
    }
  } catch (error) {
    throw new Error("Failed to uninstall MiniDapp")
  }
}
