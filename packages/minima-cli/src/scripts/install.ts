import { exec } from "child_process"
import { promisify } from "util"
import { z } from "zod"

const execAsync = promisify(exec)

const installParams = z.object({
  port: z.number().default(9005),
  pathToFile: z.string(),
  miniDappName: z.string(),
  miniDappVersion: z.string(),
  logs: z.boolean().default(false),
})

type InstallParams = z.infer<typeof installParams>

export async function install({
  port = 9005,
  pathToFile,
  miniDappName,
  miniDappVersion,
  logs = false,
}: InstallParams) {
  const params = installParams.parse({
    port,
    pathToFile,
    miniDappName,
    miniDappVersion,
    logs,
  })

  const url = `http://localhost:${params.port}/${encodeURIComponent(
    `mds action:install file:${params.pathToFile}/${params.miniDappName}-${params.miniDappVersion}.mds.zip`
  )}`

  try {
    const { stdout, stderr } = await execAsync(`curl -s "${url}"`)

    if (stderr) {
      throw new Error(stderr)
    }

    if (logs) {
      console.log("Installation response:", stdout)
    }

    return JSON.parse(stdout)
  } catch (error) {
    throw new Error(
      "Check that you have RPC enabled and that you have specified the correct port that Minima is running on"
    )
  }
}
