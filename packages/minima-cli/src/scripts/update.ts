import axios from "axios"
import { readFileSync } from "fs"
import { logger } from "../utils/logger.js"

export async function update() {
  try {
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
    const fileName = `${packageJson.name}-${packageJson.version}.mds.zip`
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1)

    const response = await axios.get("http://localhost:9005/mds")
    const foundInstallations = response.data.response.minidapps.filter(
      (i: any) => i.conf.name === capitalize(packageJson.name)
    )
    const foundInstallationUIDS = foundInstallations.map((i: any) => i.uid)

    for (const uid of foundInstallationUIDS) {
      const filePath = encodeURIComponent(`file: ${process.cwd()}/${fileName}`)
      await axios.get(
        `http://localhost:9005/mds%20action:update%20uid:${uid}%20${filePath}`
      )
      logger.info(`Updated ${uid} - ${packageJson.name}`)
    }
  } catch (error) {
    throw new Error("Failed to update MiniDapp")
  }
}
