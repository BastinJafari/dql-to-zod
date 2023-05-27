import { DQLSchema, Directive, Type } from "./types";

export const removeCommentsOutOfLine = (line: string): string => {
  if (line.startsWith("#")) {
    return "";
  } else if (line.includes("#")) {
    return line.split("#")[0];
  } else {
    return line;
  }
};

export const parseDqlSchema = (dqlSchemaString: string): DQLSchema => {
  const schema: DQLSchema = {
    types: [],
    directives: [],
  };

  // Split the schema into lines
  let lines = dqlSchemaString.split("\n");

  //delete comments
  lines = lines.map((line) => removeCommentsOutOfLine(line));
  //delete empty lines
  lines = lines.filter((line) => line !== "");
  //delete empty spaces
  lines = lines.map((line) => line.trim());

  console.log(lines);

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
      const directiveName = lines[n].split(" ")[0].slice(0, -1); //this is pretty consusing. TODO: make it clearer that you remove the : from the end of the directive name
      const directiveType = lines[n].split(" ")[1];

      const directive: Directive = {
        name: directiveName,
        type: directiveType,
      };
      if (lines[n].includes("@index")) {
        //extract index type
        const indexType = lines[n].split("@index(")[1].split(")")[0];
        directive.index = indexType.split(", ");
      }
      schema.directives.push(directive);
    }
  }

  return schema;
};

export const dqlSchemaJsonToZodSchemaString = (dqlSchema: DQLSchema) => {
  const dqlTypeToZodTypeMap = {
    string: "string()",
    int: "number().int()",
    "[uid]": "array(z.string().uuid())",
    bool: "boolean()",
    float: "number()",
    datetime: "date()",
  };

  let zodSchemaString = `import { z } from 'zod';\n\n`;

  for (const type of dqlSchema.types) {
    zodSchemaString += `const ${type.name} = z.object({\n`;

    for (const [index, field] of type.fields.entries()) {
      const dqlType = dqlSchema.directives.find(
        (directive) => directive.name === field
      )?.type as keyof typeof dqlTypeToZodTypeMap;

      if (dqlType === undefined)
        throw new Error(
          `Could not find type for field ${field} in type ${type.name}`
        );
      else {
        const indentation = "\t";
        const directive = dqlSchema.directives.find(
          (directive) => directive.name === field
        );
        const isOptional = directive?.index?.includes("term") ? false : true;
        if (isOptional) {
          zodSchemaString += `${indentation}${field}: z.${dqlTypeToZodTypeMap[dqlType]}.optional(),\n`;
        } else
          zodSchemaString += `${indentation}${field}: z.${dqlTypeToZodTypeMap[dqlType]},\n`;
      }
    }
    zodSchemaString += `})\n\n`;

    zodSchemaString += `type ${type.name} = z.infer<typeof ${type.name}>;\n\n`;
  }

  return zodSchemaString
};
