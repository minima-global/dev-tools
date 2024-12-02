#!/usr/bin/env node
import archiver from "archiver"
import chalk from "chalk"
import { exec } from "child_process"
import { Command } from "commander"
import fs, { readFileSync } from "fs"
import ora from "ora"
import { install } from "./scripts/install.js"
import { postBuild } from "./scripts/postbuild.js"
import { uninstall } from "./scripts/uninstall.js"
import { update } from "./scripts/update.js"
import { logger } from "./utils/logger.js"

const program = new Command()

program
  .name("minima")
  .description("CLI to manage Minima MiniDapps")
  .version("0.1.0")

async function zip() {
  return new Promise((resolve, reject) => {
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
      const fileName = `${packageJson.name}-${packageJson.version}.mds.zip`
      const output = fs.createWriteStream(fileName)
      const archive = archiver("zip", {
        zlib: { level: 9 },
      })

      output.on("close", () => {
        resolve(fileName)
      })

      archive.on("error", (err) => {
        reject(err)
      })

      archive.pipe(output)
      archive.directory("build/", false)
      archive.finalize()
    } catch (error) {
      reject(error)
    }
  })
}

program
  .command("zip")
  .description("Build and zip the MiniDapp")
  .action(async () => {
    const spinner = ora("Building MiniDapp...").start()
    try {
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

      await postBuild()

      spinner.text = "Zipping MiniDapp..."
      const fileName = await zip()

      spinner.succeed(
        chalk.green(`MiniDapp built and zipped successfully! ${fileName}`)
      )
    } catch (error) {
      spinner.fail(chalk.red("Failed to build and zip MiniDapp"))
      process.exit(1)
    }
  })

program
  .command("install")
  .description("Install the MiniDapp")
  .option("-p, --port <port>", "port number", "9005")
  .action(async (options) => {
    try {
      const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
      await install({
        port: parseInt(options.port),
        pathToFile: process.cwd(),
        miniDappName: packageJson.name,
        miniDappVersion: packageJson.version,
      })
      logger.info("MiniDapp installed successfully!")
    } catch (error) {
      logger.error("Failed to install MiniDapp")
      process.exit(1)
    }
  })

program
  .command("uninstall")
  .description("Uninstall the MiniDapp")
  .action(async () => {
    try {
      await uninstall()
      logger.info("MiniDapp uninstalled successfully!")
    } catch (error) {
      logger.error("Failed to uninstall MiniDapp")
      process.exit(1)
    }
  })

program
  .command("update")
  .description("Update the MiniDapp")
  .action(async () => {
    try {
      await zip()
      await update()
      logger.info("MiniDapp updated successfully!")
    } catch (error) {
      logger.error("Failed to update MiniDapp")
      process.exit(1)
    }
  })

program.parse()
