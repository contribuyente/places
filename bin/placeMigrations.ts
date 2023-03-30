import { readFileSync, readdirSync, writeFileSync } from "fs"
import { resolve } from "path"

Promise.resolve().then(async () => {
  const seedFolder = resolve(__dirname, "../src/seed")
  const filesInFolder = readdirSync(seedFolder)

  const placesJsonFiles = filesInFolder.filter((file) => file.endsWith(".json"))

  const placesFromExample = resolve(
    __dirname,
    "../src/seed/places.json.example"
  )
  const places = readFileSync(placesFromExample, {
    encoding: "utf8",
    flag: "r",
  })

  const placesStringWithoutComments = places.replace(
    /(\/\*[^*]*\*\/)|(\/\/[^*]*)/g,
    ""
  )

  const newPlacesFile = `${(placesJsonFiles.length + 1)
    .toString()
    .padStart(2, "0")}_places_new.json`

  const newPlacesTarget = resolve(__dirname, `../src/seed/${newPlacesFile}`)
  console.log(`creating ${newPlacesFile}`)
  writeFileSync(newPlacesTarget, placesStringWithoutComments)

  const placesNewJsonFiles = filesInFolder.filter((file) =>
    file.endsWith("places_new.json")
  )

  placesNewJsonFiles.push(newPlacesFile)

  const testFromExample = resolve(
    __dirname,
    "../src/seed/indexNew.test.example"
  )
  const testExample = readFileSync(testFromExample, {
    encoding: "utf8",
    flag: "r",
  })

  const testString = testExample.replace(
    "FILENAME",
    `"${placesNewJsonFiles.join('", "')}"`
  )

  const testTarget = resolve(__dirname, `../src/seed/indexNew.test.ts`)
  console.log(
    `updating test file with filenames ${placesNewJsonFiles.join(", ")}`
  )
  writeFileSync(testTarget, testString)

  const migrationFromExample = resolve(
    __dirname,
    "../src/seed/migration.ts.example"
  )
  const migrationExample = readFileSync(migrationFromExample, {
    encoding: "utf8",
    flag: "r",
  })

  const migrationString = migrationExample.replace(
    "FILENAME",
    `${newPlacesFile}`
  )
  const migrationFileName = `${new Date().getTime()}_automatic-update-static-places.ts`
  const migrationTarget = resolve(
    __dirname,
    `../src/migrations/${migrationFileName}`
  )
  console.log(`adding new migration file ${newPlacesFile}`)
  writeFileSync(migrationTarget, migrationString)

  console.log("--")
  console.log(
    `Job done. Pleace open this file and edit as needed: ${newPlacesTarget}`
  )
  console.log(
    `If you want to see an example please read this: ${placesFromExample}`
  )
})
