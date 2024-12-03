import axios from "axios"
import { z } from "zod"
import { logger } from "../utils/logger.js"

const installParams = z.object({
  port: z.number().default(9005),
  pathToFile: z.string(),
  miniDappName: z.string(),
  miniDappVersion: z.string(),
  logs: z.boolean().default(false),
})

type InstallParams = z.infer<typeof installParams>

export async function install({
  port,
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

  try {
    const response = await axios.get(
      `http://localhost:${params.port}/${encodeURIComponent(
        `mds action:install file:${params.pathToFile}/${params.miniDappName}-${params.miniDappVersion}.mds.zip`
      )}`,
      {
        timeout: 5000,
      }
    )

    if (logs) {
      logger.info(JSON.stringify(response.data, null, 2))
    }

    return response
  } catch (error) {
    throw new Error(
      "Failed to install, please ensure you specified the correct port that Minima is running on"
    )
  }
}
