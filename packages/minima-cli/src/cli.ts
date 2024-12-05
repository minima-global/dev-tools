#!/usr/bin/env node
import chalk from "chalk"
import { exec } from "child_process"
import { Command } from "commander"
import { readFileSync } from "fs"
import ora, { type Ora } from "ora"
import { configureDappConf } from "./scripts/dapp-conf.js"
import { install } from "./scripts/install.js"
import { uninstall } from "./scripts/uninstall.js"
import { update } from "./scripts/update.js"
import { zip } from "./scripts/zip.js"
import { logger } from "./utils/logger.js"

const program = new Command()

program
  .name("minima")
  .description("CLI to manage Minima MiniDapps")
  .version("0.1.0")

program
  .command("zip")
  .description("Build and zip the MiniDapp")
  .action(async () => {
    const spinner = ora("Building MiniDapp...").start()
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))

      await configureDappConf()

      // Run build command asynchronously
      await new Promise((resolve, reject) => {
        exec(
          "./node_modules/.bin/tsc && ./node_modules/.bin/vite build",
          (error, stdout) => {
            if (error) reject(error)
            resolve(stdout)
          }
        )
      })

      spinner.text = "Zipping MiniDapp..."
      const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const filePath = packageJson.template === "react-ts" ? "build/" : "./"

      await zip(zipFileName, filePath)

      setTimeout(() => {
        spinner.succeed(
          chalk.green(`MiniDapp built and zipped successfully! ${zipFileName}`)
        )
      }, 5000)
    } catch (error) {
      spinner.fail(chalk.red("Failed to build and zip MiniDapp"))
      process.exit(1)
    }
  })

program
  .command("install")
  .description("Install the MiniDapp")
  .option("-p, --port <port>", "port number", "9005")
  .option("-l, --logs", "show logs", false)
  .action(async (options) => {
    let installSpinner: Ora | undefined
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))

      installSpinner = ora("Installing MiniDapp...").start()

      await configureDappConf()

      const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const filePath = packageJson.template === "react-ts" ? "build/" : "./"

      await zip(zipFileName, filePath)

      await install({
        port: parseInt(options.port),
        pathToFile: process.cwd(),
        miniDappName: packageJson.name,
        miniDappVersion: packageJson.version,
        logs: options.logs,
      })

      setTimeout(() => {
        installSpinner?.succeed("MiniDapp installed successfully!")
      }, 5000)
    } catch (error) {
      installSpinner?.fail("Failed to install MiniDapp")
      if (error instanceof Error) {
        logger.error(error.message)
      } else {
        logger.error(String(error))
      }
      process.exit(1)
    }
  })

program
  .command("uninstall")
  .description("Uninstall the MiniDapp")
  .action(async () => {
    let uninstallSpinner: Ora | undefined
    try {
      uninstallSpinner = ora("Uninstalling MiniDapp...").start()
      await uninstall()
      setTimeout(() => {
        uninstallSpinner?.succeed("MiniDapp uninstalled successfully!")
      }, 5000)
    } catch (error) {
      uninstallSpinner?.fail("Failed to uninstall MiniDapp")
      if (error instanceof Error) {
        logger.error(error.message)
      } else {
        logger.error(String(error))
      }
      process.exit(1)
    }
  })

program
  .command("update")
  .description("Update the MiniDapp")
  .action(async () => {
    let updateSpinner: Ora | undefined
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
      updateSpinner = ora("Updating MiniDapp...").start()

      await configureDappConf()

      const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const filePath = packageJson.template === "react-ts" ? "build/" : "./"

      await zip(zipFileName, filePath)
      await update()
      setTimeout(() => {
        updateSpinner?.succeed("MiniDapp updated successfully!")
      }, 5000)
    } catch (error) {
      if (error instanceof Error) {
        updateSpinner?.fail(error.message)
      } else {
        updateSpinner?.fail("Failed to update MiniDapp")
      }
      process.exit(1)
    }
  })

program.parse()
