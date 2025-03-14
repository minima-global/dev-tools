import type { DappLink, MDSObj } from "@minima-global/mds"
import chalk from "chalk"
import fs from "fs/promises"
import path from "path"
import puppeteer, { Browser, Page } from "puppeteer"
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

type DebugOptions = z.infer<typeof DEBUGGING_SCHEMA>

/**
 * Sets up debug configuration for a Minima app
 */
export async function setupDebugConfig(options: DebugOptions) {
  const debuggingSpinner = spinner("Configuring debug settings...").start()

  try {
    const values = DEBUGGING_SCHEMA.parse(options)

    // Launch browser and navigate to Minima node
    const browser = await launchBrowser()
    const page = await setupBrowserPage(browser, values.host, values.port)

    // Login to Minima node
    await loginToMinimaNode(page, values.password, debuggingSpinner)

    // Handle fresh node if needed
    await handleFreshNodeIfNeeded(page, debuggingSpinner)

    // Get session ID from MDS
    const sessionID = await getSessionIDFromMDS(page)

    // Close browser
    await browser.close()

    // Update configuration files
    await updateConfigFiles(values, sessionID)

    // Display success message
    displaySuccessMessage(values, debuggingSpinner)

    process.exit(0)
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    debuggingSpinner.fail("Debug configuration failed")
    logger.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

/**
 * Launches a headless browser
 */
async function launchBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    headless: true,
    acceptInsecureCerts: true,
    ignoreDefaultArgs: ["--disable-extensions", "--ignore-certificate-errors"],
  })
}

/**
 * Sets up the browser page and navigates to the Minima node
 */
async function setupBrowserPage(
  browser: Browser,
  host: string,
  port: number
): Promise<Page> {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1024 })
  await page.goto(`https://${host}:${port}`)
  await page.waitForNetworkIdle()
  return page
}

/**
 * Logs in to the Minima node
 */
async function loginToMinimaNode(
  page: Page,
  password: string,
  debuggingSpinner: any
): Promise<void> {
  try {
    // Enter password
    await page.type("#password", password)

    // Click submit and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("[type='submit']"),
    ])

    // Wait for page to stabilize
    await new Promise((resolve) => setTimeout(resolve, 2000))
  } catch (err) {
    debuggingSpinner.fail("Login failed")
    if (err instanceof Error) {
      logger.error(`Failed to login: ${err.message}`)
    }
    logger.info("Please check your password, host, port and try again.")
    process.exit(1)
  }
}

/**
 * Handles the case of a fresh node that requires clicking to continue
 */
async function handleFreshNodeIfNeeded(
  page: Page,
  debuggingSpinner: any
): Promise<void> {
  try {
    // Check if this is a fresh node by looking for the text
    const isFreshNode = await page
      .evaluate(() =>
        document.body.innerText.includes("Click anywhere to continue")
      )
      .catch(() => false)

    if (isFreshNode) {
      // Click to continue for fresh nodes
      await page.click("body").catch((err) => {
        debuggingSpinner.fail("Something went wrong!")
        logger.error(`Failed to click body: ${err.message}`)
        logger.info("Please check your password, host, port and try again.")
        process.exit(1)
      })

      // Wait for the click to take effect
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  } catch (err) {
    // If there's an error in the detection process, log it but continue
    logger.info(`Error checking for fresh node: ${err}. Proceeding anyway.`)
  }
}

/**
 * Gets the session ID from MDS
 */
async function getSessionIDFromMDS(page: Page): Promise<string> {
  // First check if MDS is available on the page
  const hasMDS = await page
    .evaluate(() => typeof window.MDS !== "undefined" && window.MDS !== null)
    .catch(() => false)

  if (!hasMDS) {
    throw new Error(
      "MDS object not found on the page. This may indicate that you're not properly logged in or the Minima node is not running correctly."
    )
  }

  // Get session ID using MDS.dapplink
  const data = await page.evaluate(() => {
    return new Promise<DappLink>((resolve, reject) => {
      if (!window.MDS) {
        reject(new Error("MDS is not defined in the window object"))
        return
      }

      try {
        window.MDS.dapplink("Health", function (data) {
          if (!data || data.status === false) {
            reject(new Error(`MDS.dapplink failed: ${JSON.stringify(data)}`))
            return
          }
          resolve(data)
        })
      } catch (e) {
        reject(new Error(`Exception in MDS.dapplink: ${e}`))
      }
    })
  })

  if (!data || !data.sessionid) {
    throw new Error(
      `Invalid data returned from MDS.dapplink: ${JSON.stringify(data)}`
    )
  }

  return data.sessionid
}

/**
 * Updates configuration files based on the template
 */
async function updateConfigFiles(
  values: DebugOptions,
  sessionID: string
): Promise<void> {
  if (values.template === "vanilla-js") {
    await updateVanillaJsConfig(values, sessionID)
  } else {
    await updateOtherTemplatesConfig(values, sessionID)
  }
}

/**
 * Updates configuration for vanilla-js template
 */
async function updateVanillaJsConfig(
  values: DebugOptions,
  sessionID: string
): Promise<void> {
  // Update the mds.js file for vanilla-js template
  const mdsPath = path.join(process.cwd(), "mds.js")
  const mdsContent = await fs.readFile(mdsPath, "utf-8")

  const updatedContent = mdsContent
    .replace(/DEBUG_HOST: null,/, `DEBUG_HOST: "${values.host}",`)
    .replace(/DEBUG_PORT: -1,/, `DEBUG_PORT: ${values.port},`)
    .replace(/DEBUG_MINIDAPPID: "0x00",/, `DEBUG_MINIDAPPID: "${sessionID}",`)

  await fs.writeFile(mdsPath, updatedContent, "utf-8")
}

/**
 * Updates configuration for other templates
 */
async function updateOtherTemplatesConfig(
  values: DebugOptions,
  sessionID: string
): Promise<void> {
  // Write .env file for other templates
  await writeEnvFile({
    VITE_DEBUG_MDS_PORT: values.port,
    VITE_DEBUG_SESSION_ID: sessionID,
    VITE_DEBUG: "true",
    VITE_DEBUG_HOST: values.host,
  })
}

/**
 * Displays success message
 */
function displaySuccessMessage(
  values: DebugOptions,
  debuggingSpinner: any
): void {
  debuggingSpinner.succeed(
    chalk.green("Debug settings configured successfully!\n")
  )

  if (values.logs) {
    logger.secondary("You can navigate to your project directory with:\n")
    logger.secondary(`cd ${values.appName}`)

    if (values.template === "react-ts") {
      logger.secondary(`${getRunCommand(values.packageManager, "dev")}`)
    }
  }

  logger.secondary(
    "If you need further help or guidance, visit https://docs.minima.global\n"
  )
}
