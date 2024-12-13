import archiver from "archiver"
import fs from "fs"

export async function zip(file: string, build: string) {
  return new Promise((resolve) => {
    const output = fs.createWriteStream(file)
    const archive = archiver("zip", {
      zlib: { level: 9 },
    })

    // Add files to the archive while excluding unwanted files
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

    archive.pipe(output)
    archive.finalize()
    archive.on("end", function () {
      resolve(true)
    })
  })
}
