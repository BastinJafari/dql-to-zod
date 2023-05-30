import { parseDqlSchema, generateZodSchema } from "../src/utils"

// parses a DQL schema string and generates a zod schema string with types

const dqlToZod = (dqlSchemaString: string, filePath: string) => {
    const parsedSchema = parseDqlSchema(dqlSchemaString)
    const zodSchemaString = generateZodSchema(parsedSchema, filePath)
    return zodSchemaString
}

export default dqlToZod
