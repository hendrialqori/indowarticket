import * as authRepository from "@/repositories/AuthRepository";
import { type UserInsert, createUserSchema } from "@/db/schemas/User";
import { ValidationError } from "@/utils/errors/ValidationError";

export async function transaction(id: string) {
    const result = await authRepository.transaction(id);
    return result;
}

export async function ticket(id: string) {
    const result = await authRepository.ticket(id);
    return result;
}

export async function create(payload: UserInsert) {
    const result = createUserSchema.safeParse(payload);

    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parsing create user payload");
    }

    await authRepository.create(result.data);
}
