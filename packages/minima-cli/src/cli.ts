#!/usr/bin/env node
import chalk from "chalk"
import { Command } from "commander"
import { readFileSync } from "fs"
import ora, { type Ora } from "ora"
import { configureDappConf } from "./scripts/dapp-conf.js"
import { install } from "./scripts/install.js"
import { uninstall } from "./scripts/uninstall.js"
import { update } from "./scripts/update.js"
import { zip } from "./scripts/zip.js"
import { isReactProject } from "./utils/is-react-project.js"
import { logger } from "./utils/logger.js"

const program = new Command()
const version = JSON.parse(readFileSync("./package.json", "utf-8")).version

program
  .name("minima")
  .description("CLI to manage Minima MiniDapps")
  .version(version)

program
  .command("zip")
  .description("Build and zip the MiniDapp")
  .option("-l, --logs", "Debug logs", false)
  .action(async (options) => {
    const spinner = ora("Building MiniDapp...").start()
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))

      await configureDappConf(options.logs)

      spinner.text = "Zipping MiniDapp..."
      const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const filePath = isReactProject() ? "build/" : "./"

      if (options.logs) {
        console.log("filePath", filePath)
        console.log("zipFileName", zipFileName)
      }

      await zip(zipFileName, filePath, options.logs)

      setTimeout(() => {
        spinner.succeed(
          chalk.green(`MiniDapp built and zipped successfully! ${zipFileName}`)
        )
      }, 5000)
    } catch (error) {
      if (options.logs) {
        console.log("error", error)
      }

      spinner.fail(chalk.red("Failed to build and zip MiniDapp"))
      process.exit(1)
    }
  })

program
  .command("install")
  .description("Install the MiniDapp")
  .option("-p, --port <port>", "rpcport number", "9005")
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
      })

      setTimeout(() => {
        installSpinner?.succeed("MiniDapp installed successfully!")
      }, 2000)
    } catch (error) {
      installSpinner?.fail("Failed to install MiniDapp")
      if (error instanceof Error) {
        logger.error(error.message)
        logger.info(`Port: ${options.port}`)
        logger.info(
          "Please check that you have RPC enabled on your Minima node and that the port is correct"
        )
        logger.info(
          "If you are using a custom port other than 9005, please use the -p option to specify the port"
        )
      } else {
        logger.error(String(error))
      }
      process.exit(1)
    }
  })

program
  .command("uninstall")
  .option("-p, --port <port>", "port number", "9005")
  .description("Uninstall the MiniDapp")
  .action(async (options) => {
    let uninstallSpinner: Ora | undefined
    try {
      uninstallSpinner = ora("Uninstalling MiniDapp...").start()
      await uninstall({
        port: parseInt(options.port),
      })
      setTimeout(() => {
        uninstallSpinner?.succeed("MiniDapp uninstalled successfully!")
      }, 2000)
    } catch (error) {
      uninstallSpinner?.fail("Failed to uninstall MiniDapp")
      if (error instanceof Error) {
        logger.error(error.message)
        logger.info(`Port: ${options.port}`)
        logger.info(
          "Please check that you have RPC enabled on your Minima node and that the port is correct"
        )
        logger.info(
          "If you are using a custom port other than 9005, please use the -p option to specify the port"
        )
      } else {
        logger.error(String(error))
      }
      process.exit(1)
    }
  })

program
  .command("update")
  .description("Update the MiniDapp")
  .option("-p, --port <port>", "rpcport number", "9005")
  .action(async (options) => {
    let updateSpinner: Ora | undefined
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
      updateSpinner = ora("Updating MiniDapp...").start()

      // Configure the MiniDapp Dapp.conf
      await configureDappConf()

      // Get the zip file name
      const zipFileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const filePath = packageJson.template === "react-ts" ? "build/" : "./"

      // Zip the MiniDapp
      await zip(zipFileName, filePath)

      // Update the MiniDapp
      await update({
        port: parseInt(options.port),
      })
      setTimeout(() => {
        updateSpinner?.succeed("MiniDapp updated successfully!")
      }, 2000)
    } catch (error) {
      updateSpinner?.fail("Failed to update MiniDapp")
      if (error instanceof Error) {
        logger.error(error.message)
        logger.info(`Port: ${options.port}`)
        logger.info(
          "Please check that you have RPC enabled on your Minima node and that the port is correct"
        )
        logger.info(
          "If you are using a custom port other than 9005, please use the -p option to specify the port"
        )
      } else {
        logger.error(String(error))
      }
      process.exit(1)
    }
  })

program.parse()
