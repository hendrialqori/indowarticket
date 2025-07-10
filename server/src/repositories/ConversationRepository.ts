import { db } from "@/db";
import { conversations, type ConversationInsert } from "@/db/schemas/Conversation";
import { transactions } from "@/db/schemas/Transaction";
import { eq } from "drizzle-orm";

export async function index() {
    const result = await db.select().from(conversations);
    return result;
}

export async function create(payload: ConversationInsert) {
    const [result] = await db.insert(conversations).values(payload).$returningId();
    return result;
}

export async function remove(id: string) {
    await db.delete(transactions).where(eq(transactions.id, id));
}
