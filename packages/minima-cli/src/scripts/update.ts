import { exec } from "child_process"
import { readFileSync } from "fs"
import { promisify } from "util"
import { z } from "zod"

const execAsync = promisify(exec)

const updateParams = z.object({
  port: z.number().default(9005),
})

type UpdateParams = z.infer<typeof updateParams>  

export async function update({ port = 9005 }: UpdateParams) {
  const params = updateParams.parse({
    port,
  })

  const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  // Get list of installed minidapps
  const { stdout: mdsResponse } = await execAsync(
    `curl -s "http://localhost:${params.port}/mds"`
  )

  const mdsData = JSON.parse(mdsResponse)

  const foundInstallations = mdsData.response.minidapps.filter(
    (i: any) => i.conf.name === capitalize(packageJson.name)
  )
  const foundInstallationUIDS = foundInstallations.map((i: any) => i.uid)

  for (const uid of foundInstallationUIDS) {
    const updateUrl = `http://localhost:${params.port}/${encodeURIComponent(
      `mds action:update uid:${uid}`
    )}`

    await execAsync(`curl -s "${updateUrl}"`)
  }
}
