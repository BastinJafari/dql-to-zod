//this generates the zod schema from the parsed dql schema
import { z } from "zod";
import { DQLSchema } from "./types";
import fs from 'fs';
import { dqlSchemaJsonToZodSchemaString } from "./utils";

//this writes typescript file into the src folder with the zod schema and infered types of the DQL types and directives

const generateZodSchema = (dqlSchema: DQLSchema) => {
    
    const zodSchemaString = dqlSchemaJsonToZodSchemaString(dqlSchema);

    fs.writeFileSync("src/generatedZodSchema.ts", zodSchemaString);
}

export { generateZodSchema };