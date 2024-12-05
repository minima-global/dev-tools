import { exec } from "child_process"
import { readFileSync } from "fs"
import { promisify } from "util"

const execAsync = promisify(exec)
export async function update() {
  try {
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1)

    // Get list of installed minidapps
    const { stdout: mdsResponse } = await execAsync(
      'curl -s "http://localhost:9005/mds"'
    )
    const mdsData = JSON.parse(mdsResponse)

    const foundInstallations = mdsData.response.minidapps.filter(
      (i: any) => i.conf.name === capitalize(packageJson.name)
    )
    const foundInstallationUIDS = foundInstallations.map((i: any) => i.uid)

    for (const uid of foundInstallationUIDS) {
      const updateUrl = `http://localhost:9005/${encodeURIComponent(
        `mds action:update uid:${uid}`
      )}`

      await execAsync(`curl -s "${updateUrl}"`)
    }
  } catch (error) {
    console.error("Error details:", error)
    throw new Error("Failed to update MiniDapp")
  }
}
