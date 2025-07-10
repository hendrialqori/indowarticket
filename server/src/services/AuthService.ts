import * as authRepository from "@/repositories/AuthRepository";
import { type UserInsert, createUserSchema } from "@/db/schemas/User";
import { ValidationError } from "@/utils/errors/ValidationError";
import { ROLE } from "@/constants/enum";

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

export async function conversation(id: string, role: keyof typeof ROLE) {
    const result = await authRepository.conversation(id, role);
    return result;
}

export async function message(user_id: string, conversation_id: string) {
    const result = await authRepository.message(user_id, conversation_id);
    return result;
}
