//tests for generateZodSchema

import { generateZodSchema } from "../src/generateZodSchema";
import fs from "fs";

describe("generateZodSchema", () => {
  //check if a generated zod schema is in file generatedZodSchema.ts
  it("should generate a file", async () => {
    const zodSchemaString = `import { z } from 'zod';

    const Person = z.object({
      name: z.string(),
      boss_of: z.array(z.string().uuid()).optional(),
      works_for: z.array(z.string().uuid()).optional(),
    });
    
    const Company = z.object({
      name: z.string(),
      industry: z.string().optional(),
      work_here: z.array(z.string().uuid()).optional(),
    });
    
    type PersonType = z.infer<typeof Person>;
    type CompanyType = z.infer<typeof Company>;
    `;

    const schema = generateZodSchema({
      types: [
        {
          name: "Person",
          fields: ["name", "boss_of", "works_for"],
        },
        {
          name: "Company",
          fields: ["name", "industry", "work_here"],
        },
      ],
      directives: [
        {
          name: "industry",
          type: "string",
          index: ["term"],
        },
        {
          name: "boss_of",
          type: "[uid]",
        },
        {
          name: "name",
          type: "string",
          index: ["exact", "term"],
        },
        {
          name: "works_for",
          type: "[uid]",
        },
        {
          name: "work_here",
          type: "[uid]",
        },
      ],
    });

    const data = await fs.promises.readFile(
      "src/generatedZodSchema.ts",
      "utf8",
    );

    expect(data).toMatch(zodSchemaString);

  });
});
