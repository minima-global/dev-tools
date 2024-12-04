import chalk from "chalk"
import { Command } from "commander"
import figlet from "figlet"
import { z } from "zod"
import { logger } from "../utils/logger.js"

import { install, postBuild, zip } from "@minima-global/minima-cli"
import { exec } from "child_process"
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { getConfiguration } from "../utils/get-configuration.js"
import {
  getInstallCommand,
  getPackageManager,
  getRunCommand,
} from "../utils/get-package-manager.js"
import { setupDebugConfig } from "../utils/setup-debug-config.js"
import { spinner } from "../utils/spinner.js"

export const initOptionsSchema = z.object({
  appName: z.string().min(1),
  isNewProject: z.boolean(),
  port: z.number().optional(),
  rpc: z.boolean().optional(),
  configOnly: z.boolean().optional(),
  template: z.string().optional(),
})

export const init = new Command()
  .name("init")
  .description("Initialize a new Minima App or configure an existing one")
  .option("-n, --name <name>", "the name of the app", "minima-app")
  .option("-p, --port <port>", "the port of the Minima node", "9001")
  .option("-r, --rpc <rpc>", "the RPC URL of the Minima node", true)
  .option("-c, --config-only", "only configure RPC and debug settings", false)
  .option("-t, --template <template>", "the template to use")
  .action(async (opts) => {
    try {
      logger.log(
        chalk.white(figlet.textSync("MINIMA", { horizontalLayout: "full" }))
      )

      logger.info("Welcome to the Minima CLI\n")

      const config = await getConfiguration()

      const options = initOptionsSchema.parse({
        port: Number(opts.port) || 9001,
        appName: opts.name,
        rpc: opts.rpc,
        isNewProject: config ? false : true,
        configOnly: opts.configOnly,
        template: opts.template,
      })

      // Check if in existing project first
      if (config) {
        const { RE_CONFIGURE } = await prompts({
          type: "confirm",
          name: "RE_CONFIGURE",
          message:
            "Looks like you already have a Minima App configured! Would you like to reconfigure?",
          initial: true,
        })

        if (!RE_CONFIGURE) {
          process.exit(0)
        }

        await configureExistingProject(options)
        process.exit(0)
      }

      // Get app name first
      if (options.appName === "minima-app") {
        const { APP_NAME } = await prompts({
          type: "text",
          name: "APP_NAME",
          message: "What is the name of your project?",
        })

        if (!APP_NAME) {
          process.exit(0)
        }
        options.appName = APP_NAME
      }

      if (nameExists(options.appName)) {
        logger.error(`${options.appName} already exists`)
        process.exit(1)
      }

      // Check RPC status early
      const { RUNNING_RPC } = await prompts({
        type: "confirm",
        name: "RUNNING_RPC",
        message:
          "Are you running Minima RPC?\n  To learn more about RPC, visit https://docs.minima.global/rpc\n",
        initial: true,
        active: "no",
        inactive: "yes",
      })

      if (!RUNNING_RPC) {
        logger.warn("Cannot automatically install MiniDapp without RPC running")
        process.exit(0)
      }

      // Get RPC port
      const { MINIMA_PORT } = await prompts({
        type: "number",
        name: "MINIMA_PORT",
        message: "What port is your Minima node running on?",
        initial: 9001,
      })

      if (!MINIMA_PORT) {
        process.exit(0)
      }
      options.port = MINIMA_PORT

      // Get template choice
      if (!options.template) {
        const { TEMPLATE } = await prompts({
          type: "select",
          name: "TEMPLATE",
          message: "Which template would you like to use?",
          choices: [
            { title: "Vanilla JS", value: "vanilla-js" },
            { title: "React TS", value: "react-ts" },
          ],
          initial: 0,
        })

        if (!TEMPLATE) {
          process.exit(0)
        }
        options.template = TEMPLATE
      }

      // Create the project
      await createApp(options)

      // Setup debug config after project creation
      const { DEBUG_CONFIG } = await prompts({
        type: "confirm",
        name: "DEBUG_CONFIG",
        message: "Would you like to configure your debug settings?",
        initial: true,
        active: "no",
        inactive: "yes",
      })

      if (DEBUG_CONFIG) {
        const { MDS_PASSWORD } = await prompts({
          type: "password",
          name: "MDS_PASSWORD",
          message: "Enter your MDS password:",
        })

        const { MINIMA_HOST } = await prompts({
          type: "text",
          name: "MINIMA_HOST",
          message: "Enter the host where Minima is running:",
          initial: "127.0.0.1",
          instructions:
            "This is the host where Minima is running. Default is 127.0.0.1 (localhost)",
        })

        const packageManager = getPackageManager()

        if (!options.template) {
          logger.error("Template is required")
          process.exit(1)
        }

        await setupDebugConfig({
          port: MINIMA_PORT + 2,
          password: MDS_PASSWORD,
          packageManager,
          appName: options.appName,
          host: MINIMA_HOST,
          logs: true,
          template: options.template,
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Invalid options:")
        error.errors.forEach((err) => {
          logger.error(`- ${err.path.join(".")}: ${err.message}`)
        })
      } else {
        logger.error(error)
      }
      logger.break()
      process.exit(1)
    }
  })

async function configureExistingProject(
  options: z.infer<typeof initOptionsSchema>
) {
  const { RUNNING_RPC } = await prompts({
    type: "confirm",
    name: "RUNNING_RPC",
    message:
      "Are you running Minima RPC?\n  To learn more about RPC, visit https://docs.minima.global/rpc\n",
    initial: true,
    active: "no",
    inactive: "yes",
  })

  if (!RUNNING_RPC) {
    process.exit(0)
  }

  const { MINIMA_PORT } = await prompts({
    type: "number",
    name: "MINIMA_PORT",
    message: "What port is your Minima node running on?",
    initial: 9001,
  })

  if (!MINIMA_PORT) {
    process.exit(0)
  }

  const { DEBUG_CONFIG } = await prompts({
    type: "confirm",
    name: "DEBUG_CONFIG",
    message: "Would you like to configure your debug settings?",
    initial: true,
    active: "no",
    inactive: "yes",
  })

  if (DEBUG_CONFIG) {
    const { MDS_PASSWORD } = await prompts({
      type: "password",
      name: "MDS_PASSWORD",
      message: "Enter your MDS password:",
    })

    const { MINIMA_HOST } = await prompts({
      type: "text",
      name: "MINIMA_HOST",
      message: "Enter the host where Minima is running:",
      initial: "127.0.0.1",
    })

    const packageManager = getPackageManager()

    if (!options.template) {
      logger.error("Template is required")
      process.exit(1)
    }

    await setupDebugConfig({
      port: MINIMA_PORT + 2,
      password: MDS_PASSWORD,
      packageManager,
      appName: options.appName,
      host: MINIMA_HOST,
      logs: true,
      template: options.template,
    })
  }
}

async function createApp(options: z.infer<typeof initOptionsSchema>) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const projectSpinner = spinner(`Creating project directory...`).start()

  try {
    // Create the project directory
    mkdirSync(options.appName)
    projectSpinner.text = "Copying template files..."
    const templatePath = path.join(
      __dirname,
      `../templates/${options.template}`
    )

    // Check if the template directory exists
    if (!existsSync(templatePath)) {
      throw new Error(`Template directory not found: ${templatePath}`)
    }

    // Copy the template files to the project directory
    cpSync(templatePath, options.appName, { recursive: true })
    process.chdir(options.appName)

    // Setup the template
    if (options.template === "react-ts") {
      await setupReactTemplate(options, projectSpinner)
    } else {
      await setupVanillaTemplate(options, projectSpinner)
    }

    projectSpinner.succeed("Project created successfully!")
  } catch (error) {
    projectSpinner.fail(
      chalk.red(
        `Failed to create project: ${error instanceof Error ? error.message : String(error)}`
      )
    )
    process.exit(1)
  }
}

function nameExists(name: string) {
  return existsSync(path.join(process.cwd(), name))
}

async function setupReactTemplate(options: any, projectSpinner: any) {
  // Update package.json
  projectSpinner.text = "Configuring package.json..."
  const packageJsonPath = "./package.json"
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
  packageJson.name = options.appName
  packageJson.description = `${options.appName} MiniDapp`
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  // Install dependencies and build
  const packageManager = getPackageManager()
  projectSpinner.text = "Installing dependencies..."
  await new Promise((resolve, reject) => {
    exec(getInstallCommand(packageManager), (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })

  // Build steps for React template
  projectSpinner.text = "Building MiniDapp..."
  await new Promise((resolve, reject) => {
    exec(getRunCommand(packageManager, "build"), (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })

  await postBuild()

  // Zip and install
  const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
  await zip(zipFileName, "build/")

  await install({
    port: options.port ? options.port + 4 : 9005,
    pathToFile: process.cwd(),
    miniDappName: packageJson.name,
    miniDappVersion: packageJson.version,
    logs: false,
  })
}

async function setupVanillaTemplate(options: any, projectSpinner: any) {
  // Create a basic package.json for vanilla template
  const packageJson = {
    name: options.appName,
    version: "0.1.0",
    description: `${options.appName} MiniDapp`,
    scripts: {
      zip: "minima zip",
      "minima:install": "minima install",
      "minima:uninstall": "minima uninstall",
    },
    devDependencies: {
      "@minima-global/minima-cli": "^0.0.2",
    },
  }

  writeFileSync("package.json", JSON.stringify(packageJson, null, 2))

  // Install minima-cli for zip/install commands
  const packageManager = getPackageManager()
  projectSpinner.text = "Installing dependencies..."
  await new Promise((resolve, reject) => {
    exec(getInstallCommand(packageManager), (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })

  projectSpinner.text = "Building MiniDapp..."
  await postBuild()

  // Zip and install
  projectSpinner.text = "Zipping and installing MiniDapp..."
  const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
  await zip(zipFileName, "./")

  projectSpinner.text = "Installing MiniDapp..."

  // Install on the Minima node
  await install({
    port: options.port ? options.port + 4 : 9005,
    pathToFile: process.cwd(),
    miniDappName: packageJson.name,
    miniDappVersion: packageJson.version,
    logs: false,
  })
}
