import { db } from "@/db";
import { MessageInsert, messages } from "@/db/schemas/Messages";

export async function send(payload: MessageInsert) {
    await db.insert(messages).values(payload);
}
