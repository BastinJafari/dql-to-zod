// src/parseDqlSchema.ts

type Directive = {
  name: string;
  type: string; //must be clearer
  index?: string;
};

type Type = {
    name: string;
    fields: string[];
};

type DQLSchema = {
  types: Type[]
  directives: Directive[];
};

const parseDqlSchema = (dqlSchemaString: string): DQLSchema => {
  const schema: DQLSchema = {
    types: [],
    directives: [],
  };

  // Split the schema into lines
  let lines = dqlSchemaString.split("\n");

  //delete empty lines
  lines = lines.filter((line) => line !== "");
  //delete comments
  lines = lines.filter((line) => !line.startsWith("#"));
  //delete empty spaces
  lines = lines.map((line) => line.trim());


  
    for (let n = 0; n < lines.length; n++) {
        if (lines[n].startsWith("type")) {
            const type: Type = {
                name: lines[n].split(" ")[1],
                fields: [],
            };
            for (let i = n + 1; i < lines.length; i++) {
                if (lines[i].startsWith("}")) {
                    n = i;
                    break;
                } else {
                    type.fields.push(lines[i].trim());
                }
            }
            schema.types.push(type);
        } else {
            const directive: Directive = {
                name: lines[n].split(" ")[0],
                type: lines[n].split(" ")[1],
            };
            if (lines[n].includes("@index")) {
                directive.index = lines[n].split(" ")[2];
            }
            schema.directives.push(directive);
        }
        }
    

  return schema;

};
export default parseDqlSchema;
