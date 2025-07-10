import { ConversationInsert, createConversationSchema } from "@/db/schemas/Conversation";
import * as conversationRepository from "@/repositories/ConversationRepository";
import * as userRepository from "@/repositories/UserRepository";
import { ApiError } from "@/utils/errors/ApiError";
import { ValidationError } from "@/utils/errors/ValidationError";
import status from "http-status";

export async function create(payload: ConversationInsert) {
    // prevent duplicate event conversation wity buyer id
    // buyer only have one event each conversation
    const conversations = await conversationRepository.index();
    const buyerConversation = conversations.find((conv) => conv.buyer_id == payload.buyer_id);
    if (buyerConversation) {
        throw new ApiError(
            status.CONFLICT,
            `conversation already created with id ${buyerConversation.id}`,
        );
    }

    const result = createConversationSchema.safeParse(payload);
    if (!result.success) {
        throw new ValidationError(
            result.error,
            "Error occured when parse create conversation payload",
        );
    }

    const users = await userRepository.index();

    const userAdmin = users.find((u) => u.role === "ADMIN");
    if (!userAdmin) {
        throw new ApiError(status.NOT_FOUND, "user admin not found");
    }

    result.data.admin_id = userAdmin.id;
    const response = await conversationRepository.create(result.data);
    return response;
}

export async function remove(id: string) {
    await conversationRepository.remove(id);
}
