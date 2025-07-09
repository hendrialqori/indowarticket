import { z } from 'zod/v4'
import { ValidationError } from './errors/ValidationError';

export function validateId(id: string) {
    const idSchema = z.string().length(8);

    const result = idSchema.safeParse(id);
    if (!result.success) {
        throw new ValidationError(result.error, "Invalid transaction ID");
    }
    return result.data;
}

