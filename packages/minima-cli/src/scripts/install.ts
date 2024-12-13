import { exec } from "child_process"
import { promisify } from "util"
import { z } from "zod"

const execAsync = promisify(exec)

const installParams = z.object({
  port: z.number().default(9005),
  pathToFile: z.string(),
  miniDappName: z.string(),
  miniDappVersion: z.string(),
})

type InstallParams = z.infer<typeof installParams>

export async function install({
  port = 9005,
  pathToFile,
  miniDappName,
  miniDappVersion,
}: InstallParams) {
  const params = installParams.parse({
    port,
    pathToFile,
    miniDappName,
    miniDappVersion,
  })

  const url = `http://localhost:${params.port}/${encodeURIComponent(
    `mds action:install file:${params.pathToFile}/${params.miniDappName}-${params.miniDappVersion}.mds.zip`
  )}`

  const { stdout, stderr } = await execAsync(`curl -s "${url}"`)

  if (stderr) {
    throw new Error(stderr)
  }

  return JSON.parse(stdout)
}
