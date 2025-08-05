export type FieldSchema = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "file"
    | "textarea"
    | "switch"
    | "date";
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  pattern?: string;
};

export function parseSchema(rawSchema: any[]): FieldSchema[] {
  return rawSchema.map((field) => {
    return {
      name: field.name,
      label: field.label,
      type: field.type,
      required: field.required ?? false,
      options: field.options ?? [],
      min: field.min,
      max: field.max,
      pattern: field.pattern,
    };
  });
}
