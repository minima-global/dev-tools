import { writeFile } from "fs"
import { z } from "zod"

const ENV_SCHEMA = z.object({
  VITE_DEBUG: z.literal("true"),
  VITE_DEBUG_HOST: z.literal("localhost"),
  VITE_DEBUG_MDS_PORT: z.number(),
  VITE_DEBUG_SESSION_ID: z.string(),
})

export async function writeEnvFile(options: z.infer<typeof ENV_SCHEMA>) {
  const values = ENV_SCHEMA.parse(options)

  var settings = ""
  settings += "VITE_DEBUG=true\n"
  settings += "VITE_DEBUG_HOST=localhost\n"
  settings += `VITE_DEBUG_MDS_PORT=${values.VITE_DEBUG_MDS_PORT}\n`
  settings += `VITE_DEBUG_SESSION_ID=${values.VITE_DEBUG_SESSION_ID}\n`

  await new Promise((resolve, reject) => {
    writeFile(".env", settings, (err: any) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}
