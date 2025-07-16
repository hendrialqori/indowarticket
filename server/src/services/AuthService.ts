import { ROLE } from "@/constants/enum";
import { createUserSchema, type UserInsert } from "@/db/schemas/User";
import { ValidationError } from "@/utils/errors/ValidationError";
import { AuthRepository } from "@/repositories/AuthRepository";

export class AuthService {
    private repository = new AuthRepository();

    public transaction = async (userId: string) => {
        return this.repository.transaction(userId);
    };

    ticket = async (userId: string) => {
        return this.repository.ticket(userId);
    };

    create = async (payload: UserInsert) => {
        const result = createUserSchema.safeParse(payload);

        if (!result.success) {
            throw new ValidationError(result.error, "Failed to parse user creation payload");
        }

        await this.repository.create(result.data);
    };

    conversation = async (userId: string, role: keyof typeof ROLE) => {
        return this.repository.conversation(userId, role);
    };

    message = async (userId: string, conversationId: string) => {
        return this.repository.message(userId, conversationId);
    };
}
