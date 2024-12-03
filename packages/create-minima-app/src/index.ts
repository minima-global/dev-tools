#!/usr/bin/env node

import chalk from "chalk"
import { Command } from "commander"
import figlet from "figlet"
import { z } from "zod"
import packageJson from "../package.json"
import { createApp, initOptionsSchema } from "./utils/create-app.js"
import { logger } from "./utils/logger.js"
const args = process.argv.splice(2)

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
        logger.log(
          chalk.white(figlet.textSync("MINIMA", { horizontalLayout: "full" }))
        )

        logger.info("Welcome to the Minima CLI\n")
        logger.info("Follow the prompts to create your MiniDapp\n")
        logger.info("For more information, visit https://docs.minima.global\n")

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
