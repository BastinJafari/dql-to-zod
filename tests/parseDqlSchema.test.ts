import { parseDqlSchema } from "../src/utils"
const testSchemas = require("./testSchemas.json")

describe("parseDqlSchema", () => {
  it("should return a correct DQLSchema object for every DQLSchema", () => {
    for (const testSchema of testSchemas) {

      const parsedSchema = parseDqlSchema(testSchema.dqlSchemaString)
      expect(parsedSchema).toEqual(
        testSchema.dqlSchemaParsed
      )
    }
  })
})
