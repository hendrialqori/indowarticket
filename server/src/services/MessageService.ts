import { MessageInsert, createMessageSchema } from "@/db/schemas/Messages";
import { ValidationError } from "@/utils/errors/ValidationError";
import * as messageRepository from "@/repositories/MessageRepository";

export async function send(payload: MessageInsert) {
    const result = createMessageSchema.safeParse(payload);
    if (!result.success) {
        throw new ValidationError(result.error, "Error occured when parse create message payload");
    }
    await messageRepository.send(result.data);
}
