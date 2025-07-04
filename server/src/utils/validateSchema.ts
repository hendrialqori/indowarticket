import { ZodType } from "zod";

export function validateSchema<T extends object>(schema: ZodType, data: T) {
  return schema.parse(data);
}
