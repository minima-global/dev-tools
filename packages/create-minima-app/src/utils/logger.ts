import chalk from "chalk"

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(args.join(" ")))
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(args.join(" ")))
  },
  info(...args: unknown[]) {
    console.log(chalk.blue(args.join(" ")))
  },
  success(...args: unknown[]) {
    console.log(chalk.green(args.join(" ")))
  },
  log(...args: unknown[]) {
    console.log(args.join(" "))
  },
  break() {
    console.log("")
  },
}
