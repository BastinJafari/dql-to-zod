import { parseDqlSchema } from "../src/utils";
const testSchemas = require("./testSchemas.json");

describe("parseDqlSchema", () => {
  it("should return a correct DQLSchema object for every DQLSchema", () => {
    for (const testSchema of testSchemas) {
      console.log(JSON.stringify(parseDqlSchema(testSchema.dqlSchemaString), null, 2));

      expect(parseDqlSchema(testSchema.dqlSchemaString)).toEqual(
        testSchema.dqlSchemaParsed
      );
    }
  });
});
