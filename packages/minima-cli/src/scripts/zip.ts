import archiver from "archiver"
import fs from "fs"

export async function zip(file: string, build: string, logs: boolean = false) {
  if (logs) {
    console.log("Starting zip process...")
    console.log("File:", file)
    console.log("Build directory:", build)
  }

  return new Promise((resolve, reject) => {
    try {
      if (logs) {
        console.log("Creating write stream...")
      }
      const output = fs.createWriteStream(file)

      output.on("error", (err) => {
        console.error("Write stream error:", err)
        reject(err)
      })

      if (logs) {
        console.log("Initializing archiver...")
      }
      const archive = archiver("zip", {
        zlib: { level: 9 },
      })

      archive.on("warning", (err) => {
        if (logs) {
          console.warn("Archive warning:", err)
        }
      })

      archive.on("error", (err) => {
        if (logs) {
          console.error("Archive error:", err)
        }
        reject(err)
      })

      if (logs) {
        console.log("Setting up file patterns to archive...")
      }

      archive.glob("**/*", {
        cwd: build,
        ignore: [
          "**/node_modules/**",
          "**/package-lock.json",
          "**/yarn.lock",
          "**/pnpm-lock.yaml",
          "**/package.json",
        ],
      })

      if (logs) {
        console.log("Piping archive to output stream...")
      }
      archive.pipe(output)

      if (logs) {
        console.log("Finalizing archive...")
      }
      archive.finalize()

      output.on("close", () => {
        const finalSize = archive.pointer()
        if (logs) {
          console.log(
            `Archive creation completed successfully. Total bytes: ${finalSize}`
          )
        }
        resolve(true)
      })
    } catch (error) {
      if (logs) {
        console.error("Unexpected error during zip process:", error)
      }
      reject(error)
    }
  })
}
