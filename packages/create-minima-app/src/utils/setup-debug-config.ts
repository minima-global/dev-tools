import type { DappLink, MDSObj } from "@minima-global/mds"
import chalk from "chalk"
import fs from "fs/promises"
import path from "path"
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
  host: z.string(),
  logs: z.boolean(),
  template: z.string(),
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
    { timeout: 5000 }
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

  await browser.close()

  if (values.template === "vanilla-js") {
    // Update the mds.js file for vanilla-js template
    const mdsPath = path.join(process.cwd(), "mds.js")
    const mdsContent = await fs.readFile(mdsPath, "utf-8")

    const updatedContent = mdsContent
      .replace(/DEBUG_HOST: null,/, `DEBUG_HOST: "${values.host}",`)
      .replace(/DEBUG_PORT: -1,/, `DEBUG_PORT: ${values.port},`)
      .replace(/DEBUG_MINIDAPPID: "0x00",/, `DEBUG_MINIDAPPID: "${sessionID}",`)

    await fs.writeFile(mdsPath, updatedContent, "utf-8")
  } else {
    // Write .env file for other templates

    await writeEnvFile({
      VITE_DEBUG_MDS_PORT: values.port,
      VITE_DEBUG_SESSION_ID: sessionID,
      VITE_DEBUG: "true",
      VITE_DEBUG_HOST: values.host,
    })
  }

  if (values.logs) {
    debuggingSpinner.succeed(
      chalk.green(`Debug settings configured successfully!\n\n`) 
    )

    logger.info("You can navigate to your project directory with:\n") 
    logger.info(`cd ${values.appName}\n`) 
    if (values.template === "react-ts") {
      logger.info(`${getRunCommand(values.packageManager, "dev")}\n`)
    } 

    logger.info(
      "If you need further help or guidance, visit https://docs.minima.global\n"
    )
  } else {
    debuggingSpinner.succeed(
      chalk.green("Debug settings configured successfully!\n\n") +
        chalk.cyan(
          "If you need further help or guidance, visit https://docs.minima.global\n"
        )
    )
  }

  process.exit(0)
}
