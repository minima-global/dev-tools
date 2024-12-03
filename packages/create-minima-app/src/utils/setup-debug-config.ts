import type { DappLink, MDSObj } from "@minima-global/mds"
import chalk from "chalk"
import puppeteer from "puppeteer"
import { z } from "zod"
import { getRunCommand, type PackageManager } from "./get-package-manager.js"
import { logger } from "./logger.js"
import { spinner } from "./spinner.js"
import { writeEnvFile } from "./write-env.js"

declare global {
  var MDS: MDSObj
}

const DEBUGGING_SCHEMA = z.object({
  port: z.number(),
  password: z.string(),
  packageManager: z.custom<PackageManager>(),
  appName: z.string(),
})

export async function setupDebugConfig(
  options: z.infer<typeof DEBUGGING_SCHEMA>
) {
  const debuggingSpinner = spinner("Configuring debug settings...").start()

  const values = DEBUGGING_SCHEMA.parse(options)

  const browser = await puppeteer.launch({
    headless: true,
    acceptInsecureCerts: true,
    ignoreDefaultArgs: ["--disable-extensions", "--ignore-certificate-errors"],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1024 })
  await page.goto(`https://localhost:${values.port}`)
  await page.waitForNetworkIdle()
  await page.type("#password", values.password)
  await page.click("[type='submit']")
  await page.waitForFunction(
    () => document.body.innerText.includes("Click anywhere to continue"),
    { timeout: 30000 }
  )
  await page.click("body")

  const data = await page.evaluate(() => {
    return new Promise<DappLink>((resolve) => {
      window.MDS.dapplink("Health", function (data) {
        resolve(data)
      })
    })
  })

  const sessionID = data.sessionid
  debuggingSpinner.text = "Writing environment variables..."

  await writeEnvFile({
    VITE_DEBUG_MDS_PORT: values.port,
    VITE_DEBUG_SESSION_ID: sessionID,
    VITE_DEBUG: "true",
    VITE_DEBUG_HOST: "localhost",
  })

  await browser.close()

  debuggingSpinner.succeed(
    chalk.green(`Debug settings configured successfully!\n\n`) +
      chalk.cyan(`You can now run your MiniDapp with:\n\n`) +
      chalk.cyan(`cd ${values.appName}\n`) +
      chalk.cyan(`${getRunCommand(values.packageManager, "dev")}\n`)
  )

  logger.info(
    "If you need further help or guidance, visit https://docs.minima.global\n"
  )
}
