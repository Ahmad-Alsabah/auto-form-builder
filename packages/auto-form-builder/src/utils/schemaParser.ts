export type FieldSchema = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
};

export function parseSchema(rawSchema: any[]): FieldSchema[] {
  return rawSchema.map((field) => {
    return {
      name: field.name,
      label: field.label,
      type: field.type,
      required: field.required ?? false,
      options: field.options ?? [],
    };
  });
}
