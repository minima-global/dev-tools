import { configureDappConf, install, zip } from "@minima-global/minima-cli"
import chalk from "chalk"
import { exec } from "child_process"
import { Command } from "commander"
import figlet from "figlet"
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import type { Ora } from "ora"
import path from "path"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { z } from "zod"
import { configureCli } from "../utils/configure-cli.js"
import { getConfiguration } from "../utils/get-configuration.js"
import {
  getInstallCommand,
  getPackageManager,
  getRunCommand,
} from "../utils/get-package-manager.js"
import { logger } from "../utils/logger.js"
import { setupDebugConfig } from "../utils/setup-debug-config.js"
import { spinner } from "../utils/spinner.js"

export const initOptionsSchema = z.object({
  appName: z.string().min(1),
  isNewProject: z.boolean(),
  port: z.number(),
  rpc: z.boolean(),
  template: z.enum(["react-ts", "vanilla-js"], {
    required_error: "Template is required",
    message: "Template must be either react-ts or vanilla-js",
  }),
  service: z.boolean(),
})

export const init = new Command()
  .name("init")
  .description("Initialize a new Minima App or configure an existing one")
  .option("-n, --name <name>", "the name of the app", "minima-app")
  .option("-p, --port <port>", "the port of the Minima node", "9001")
  .option("-r, --rpc", "the RPC URL of the Minima node", true)
  .option("-s, --service", "create a service.js file", false)
  .option("-t, --template <template>", "the template to use", "react-ts")
  .action(async (opts) => {
    try {
      logger.break()
      logger.log(
        figlet.textSync("Create Minidapp", {
          font: "ANSI Shadow",
        })
      )

      logger.secondary(
        "Welcome to the Minima CLI. This tool will help you create a new Minima MiniDapp.\nDocumentation: https://docs.minima.global/docs/development/cli"
      )

      logger.break()
      const config = await getConfiguration()

      const options = initOptionsSchema.parse({
        port: Number(opts.port) || 9001,
        appName: opts.name,
        rpc: opts.rpc,
        isNewProject: config ? false : true,
        configOnly: opts.configOnly,
        template: config.template ? config.template : opts.template,
        service: opts.service,
      })

      // Check if in existing project first
      if (config.exists) {
        const { RE_CONFIGURE } = await prompts({
          type: "confirm",
          name: "RE_CONFIGURE",
          message:
            "Looks like you already have a Minima App! Would you like to reconfigure?",
          initial: true,
        })

        if (!RE_CONFIGURE) {
          process.exit(0)
        }

        await configureExistingProject(options)
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

      // Check RPC status
      const { RUNNING_RPC } = await prompts({
        type: "confirm",
        name: "RUNNING_RPC",
        message:
          "Are you running Minima RPC?\nTo learn more about RPC, visit https://docs.minima.global/rpc\n",
        initial: options.rpc,
        active: "no",
        inactive: "yes",
      })

      options.rpc = RUNNING_RPC

      // Get RPC port if rpc is running
      if (options.rpc) {
        const { MINIMA_PORT } = await prompts({
          type: "number",
          name: "MINIMA_PORT",
          message: "What port is your Minima node running on?",
          initial: options.port,
        })

        if (!MINIMA_PORT) {
          process.exit(0)
        }
        options.port = MINIMA_PORT
      }

      // Get template choice

      const { TEMPLATE } = await prompts({
        type: "select",
        name: "TEMPLATE",
        message: "Which template would you like to use?",
        choices: [
          { title: "React TS", value: "react-ts" },
          { title: "Vanilla JS", value: "vanilla-js" },
        ],
        initial: 0,
      })

      if (!TEMPLATE) {
        process.exit(0)
      }

      options.template = TEMPLATE

      const { SERVICE } = await prompts({
        type: "confirm",
        name: "SERVICE",
        message:
          "Would you like to create a service.js file?\n  To learn more about services, visit https://docs.minima.global/docs/development/minidapp-servicejs\n",
        initial: false,
      })

      options.service = SERVICE

      // Create the project
      await createApp(options)

      const packageManager = getPackageManager()

      if (options.rpc) {
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

          if (!options.template) {
            logger.error("Template is required")
            process.exit(1)
          }

          await setupDebugConfig({
            port: options.port ? options.port + 2 : 9003,
            password: MDS_PASSWORD,
            packageManager,
            appName: options.appName,
            host: MINIMA_HOST,
            logs: true,
            template: options.template,
          })
        }

        logger.info(`Project created successfully!\n`)
        logger.info(
          `To be able to run your minidapp in debug mode, you need to configure your debug settings.`
        )

        logger.info(
          `You can re-run the init command inside your project directory to configure your debug settings at any time.\n`
        )

        logger.info(`You can navigate to your project directory with:\n`)
        logger.info(`cd ${options.appName}\n`)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Invalid options:")
        error.errors.forEach((err) => {
          logger.error(`- ${err.path.join(".")}: ${err.message}`)
        })
      }
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
    initial: options.port,
  })

  if (!MINIMA_PORT) {
    process.exit(0)
  }

  options.port = MINIMA_PORT

  // Get package.json
  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"))

  // Configure Minima CLI
  await configureCli(process.cwd(), options.template)

  const installSpinner = spinner("Installing MiniDapp...").start()

  // Post build steps
  await configureDappConf()

  // Zip and install
  const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`

  const zipPath = options.template === "react-ts" ? "build/" : "./"

  await zip(zipFileName, zipPath)

  await install({
    port: options.port ? options.port + 4 : 9005,
    pathToFile: process.cwd(),
    miniDappName: packageJson.name,
    miniDappVersion: packageJson.version,
  })

  installSpinner.succeed("MiniDapp installed successfully!")

  const { DEBUG_CONFIG } = await prompts({
    type: "confirm",
    name: "DEBUG_CONFIG",
    message:
      "Would you like to configure your debug settings and install the Minima CLI?",
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
      appName: packageJson.name,
      host: MINIMA_HOST,
      logs: true,
      template: options.template,
    })
  } else {
    const packageManager = getPackageManager()

    logger.info(`You can now run your MiniDapp with:\n`)
    logger.info(`cd ${packageJson.name}\n`)
    logger.info(`${getRunCommand(packageManager, "dev")}\n`)

    process.exit(0)
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

    projectSpinner.succeed(chalk.green("Project created successfully!"))
  } catch (error) {
    if (error instanceof Error) {
      projectSpinner.fail(chalk.red(`${error.message}`))
      logger.break()
      logger.info("Your project has been created but the installation failed")
      logger.info(
        "You can install the MiniDapp manually or re-run the `init` command inside your project directory to try again"
      )
      logger.break()
      logger.info(
        "For more information, visit https://docs.minima.global/docs/development/cli"
      )
    } else {
      projectSpinner.fail(chalk.red(`Something went wrong:\n ${error}`))
    }
    process.exit(1)
  }
}

function nameExists(name: string) {
  return existsSync(path.join(process.cwd(), name))
}

async function setupReactTemplate(
  options: z.infer<typeof initOptionsSchema>,
  projectSpinner: Ora
) {
  // if service is true, create a service.js file in the public folder
  if (options.service) {
    const servicePath = path.join(process.cwd(), "public", "service.js")
    writeFileSync(servicePath, "")
  }

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

  // Configure Minima CLI
  projectSpinner.text = "Configuring Minima CLI..."
  await configureCli(process.cwd(), options.template)

  // Build steps for React template
  projectSpinner.text = "Building MiniDapp..."
  await new Promise((resolve, reject) => {
    exec(getRunCommand(packageManager, "build"), (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })

  // Post build steps
  await configureDappConf()

  // Zip and install
  const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
  await zip(zipFileName, "build/")

  // Only install if rpc is running
  if (options.rpc) {
    await install({
      port: options.port ? options.port + 4 : 9005,
      pathToFile: process.cwd(),
      miniDappName: packageJson.name,
      miniDappVersion: packageJson.version,
    })
  }
}

async function setupVanillaTemplate(
  options: z.infer<typeof initOptionsSchema>,
  projectSpinner: Ora
) {
  // if service is true, create a service.js file in the root of the project
  if (options.service) {
    const servicePath = path.join(process.cwd(), "service.js")
    writeFileSync(servicePath, "")
  }

  // Update package.json
  projectSpinner.text = "Configuring package.json..."
  const packageJsonPath = "./package.json"
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
  packageJson.name = options.appName
  packageJson.description = `${options.appName} MiniDapp`
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  // Install dependencies
  const packageManager = getPackageManager()
  projectSpinner.text = "Installing dependencies..."
  await new Promise((resolve, reject) => {
    exec(getInstallCommand(packageManager), (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })

  // Configure Minima CLI
  projectSpinner.text = "Configuring Minima CLI..."
  await configureCli(process.cwd(), options.template)

  projectSpinner.text = "Building MiniDapp..."
  await configureDappConf()

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
  })
}
