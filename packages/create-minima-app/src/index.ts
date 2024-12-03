#!/usr/bin/env node
import { Command } from "commander"
import packageJson from "../package.json"
import { init } from "./commands/init.js"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("create-minima-app")
    .description("Create a Minima App")
    .version(
      packageJson.version || "0.0.1",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init)

  program.parse()
}

main()
