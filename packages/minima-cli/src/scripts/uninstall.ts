import { exec } from "child_process"
import { readFileSync } from "fs"
import { promisify } from "util"
import { z } from "zod"

const execAsync = promisify(exec)

const uninstallParams = z.object({
  port: z.number().default(9005),
})

type UninstallParams = z.infer<typeof uninstallParams>

export async function uninstall({ port = 9005 }: UninstallParams) {
  // Validate the port
  const params = uninstallParams.parse({
    port,
  })

  // Get the package name from the package.json file
  const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  // Get list of installed minidapps
  const { stdout: mdsResponse } = await execAsync(
    `curl -s "http://localhost:${params.port}/mds"`
  )
  const mdsData = JSON.parse(mdsResponse)

  const foundInstallations = mdsData.response.minidapps.filter(
    (i: any) => i.conf.name === capitalize(packageJson.name)
  )
  const foundInstallationUIDS = foundInstallations.map((i: any) => i.uid)

  // Uninstall the minidapps
  for (const uid of foundInstallationUIDS) {
    const uninstallUrl = `http://localhost:${params.port}/${encodeURIComponent(
      `mds action:uninstall uid:${uid}`
    )}`

    await execAsync(`curl -s "${uninstallUrl}"`)
  }
}
