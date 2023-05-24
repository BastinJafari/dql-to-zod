//Tests for parseDqlSchema.ts
// Path: tests/parseDqlSchema.test.ts
// Compare this snippet from src/parseDqlSchema.ts:
// // src/parseDqlSchema.ts
// type DQLSchema = Record<string, string>;
//

import parseDqlSchema from "../src/parseDqlSchema";

const testSchema = 
`# Define Types

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