import archiver from "archiver"
import fs from "fs"

export async function zip(file: string, build: string) {
  return new Promise((resolve) => {
    const output = fs.createWriteStream(file)
    const archive = archiver("zip", {
      zlib: { level: 9 },
    })
    archive.directory(build, false)
    archive.pipe(output)
    archive.finalize()
    archive.on("end", function () {
      resolve(true)
    })
  })
}
