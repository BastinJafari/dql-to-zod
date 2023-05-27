import { parseDqlSchema } from "../src/utils";

const testSchema = `# Define Types

type Person {
    name
    boss_of
    works_for
}

type Company {
    name
    industry
    work_here #this is an alias
}

# Define Directives and index

industry: string @index(term) .
boss_of: [uid] .
name: string @index(exact, term) .
works_for: [uid] .
work_here: [uid] .`;

console.log(JSON.stringify(parseDqlSchema(testSchema), null, 2));

describe("parseDqlSchema", () => {
  it("should return a DQLSchema object", () => {
    expect(parseDqlSchema(testSchema)).toEqual({
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
  });
});
