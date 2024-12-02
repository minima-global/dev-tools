#!/usr/bin/env node

import { install, postBuild, zip } from "@minima-global/minima-cli"
import chalk from "chalk"
import { exec } from "child_process"
import { Command } from "commander"
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { z } from "zod"
import packageJson from "../package.json"
import {
  getInstallCommand,
  getPackageManager,
  getRunCommand,
} from "./utils/get-package-manager.js"
import { logger } from "./utils/logger.js"
import { spinner } from "./utils/spinner.js"

const args = process.argv.splice(2)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const initOptionsSchema = z.object({
  appName: z.string().min(1),
  isNewProject: z.boolean().optional(),
  port: z.number().optional(),
})

async function main() {
  const program = new Command()
    .name("create-minima-app")
    .description("Create a Minima App")
    .version(
      packageJson.version || "0.0.1",
      "-v, --version",
      "display the version number"
    )
    .option("-n, --name <name>", "the name of the app", args[0] || "minima-app")
    .option("-p, --port <port>", "the port of the Minima node", "9001")
    .action(async (opts) => {
      try {
        const options = initOptionsSchema.parse({
          port: Number(opts.port) || 9001,
          appName: opts.name,
          rpc: opts.rpc,
          isNewProject: true,
        })

        await createApp(options)
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

  program.parse()
}

main()

async function createApp(options: z.infer<typeof initOptionsSchema>) {
  if (nameExists(options.appName)) {
    logger.error(`${options.appName} already exists`)
    process.exit(1)
  }

  if (options.appName === "minima-app") {
    const { APP_NAME } = await prompts({
      type: "text",
      name: "APP_NAME",
      message: "What is the name of your project?",
    })
    options.appName = APP_NAME
  }

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

  const { template } = await prompts({
    type: "select",
    name: "template",
    message: "Select a template for your project:",
    choices: [
      {
        title: "React + TypeScript",
        description: "Recommended",
        value: "react-typescript",
      },
      {
        title: "React",
        description: "Coming soon",
        value: "react",
        disabled: true,
      },
      {
        title: "Vanilla JS",
        description: "Coming soon",
        value: "vanilla",
        disabled: true,
      },
    ],
  })

  if (!template) {
    process.exit(0)
  }

  const projectSpinner = spinner(`Creating project directory...`).start()

  try {
    // Create directories and copy files
    mkdirSync(options.appName)
    projectSpinner.text = "Copying template files..."
    const templatePath = path.join(__dirname, "../templates/react-ts")
    if (!existsSync(templatePath)) {
      throw new Error(`Template directory not found: ${templatePath}`)
    }
    cpSync(templatePath, options.appName, {
      recursive: true,
    })

    process.chdir(options.appName)

    // Update package.json
    projectSpinner.text = "Configuring package.json..."
    const packageJsonPath = "./package.json"
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

    packageJson.name = options.appName
    packageJson.description = `${options.appName} MiniDapp`

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    // Verify package.json update
    const verifyPackageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
    if (verifyPackageJson.name !== options.appName) {
      throw new Error("Failed to set project name correctly in package.json")
    }

    // Get the package manager before installing dependencies
    const packageManager = getPackageManager()

    // Install dependencies
    projectSpinner.text = "Installing dependencies..."
    await new Promise((resolve, reject) => {
      exec(getInstallCommand(packageManager), (error, stdout) => {
        if (error) reject(error)
        resolve(stdout)
      })
    })

    // Build the MiniDapp
    projectSpinner.text = "Building MiniDapp..."
    await new Promise((resolve, reject) => {
      exec(
        "./node_modules/.bin/tsc && ./node_modules/.bin/vite build",
        (error, stdout) => {
          if (error) reject(error)
          resolve(stdout)
        }
      )
    })

    projectSpinner.text = "Post-processing build..."
    await postBuild()

    // Zip the MiniDapp
    projectSpinner.text = "Creating MiniDapp package..."
    const zipFileName = `${verifyPackageJson.name}-${verifyPackageJson.version}.mds.zip`
    await zip(zipFileName, "build/")

    // Install the MiniDapp
    projectSpinner.text = "Installing MiniDapp..."
    await install({
      port: options.port ? options.port + 4 : 9005,
      pathToFile: process.cwd(),
      miniDappName: verifyPackageJson.name,
      miniDappVersion: verifyPackageJson.version,
    })

    projectSpinner.succeed(
      chalk.green(`✨ Project created successfully!\n\n`) +
        chalk.cyan(`You can now run your MiniDapp with:\n\n`) +
        chalk.cyan(`cd ${options.appName}\n`) +
        chalk.cyan(`${getRunCommand(packageManager, "dev")}\n`)
    )
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
