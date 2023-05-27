//tests for generateZodSchema

import { generateZodSchema } from "../src/generateZodSchema"
import fs from "fs"
const testSchemas = require("./testSchemas.json")
describe("generateZodSchema", () => {
  //check if a generated zod schema is in file generatedZodSchema.ts
  it("should save the correct zod schemas and types to the file system for all schemas", async () => {
    
    for (const testSchema of testSchemas) {

        generateZodSchema(testSchema.dqlSchemaParsed)
        const data = await fs.promises.readFile(
            "src/generatedZodSchema.ts",
            "utf8"
          )
          expect(data.replace(/\s/g, "")).toEqual(testSchema.zodSchemaString.replace(/\s/g, ""))
    }
    })
})
