type Directive = {
  name: string;
  type: string; //must be clearer
  index?: string[];
};

type Type = {
  name: string;
  fields: string[];
};

type DQLSchema = {
  types: Type[];
  directives: Directive[];
};

export type { DQLSchema, Type, Directive };
