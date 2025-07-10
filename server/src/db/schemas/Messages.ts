import { genuuid } from "@/utils/uuid";
import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./User";
import { conversations } from "./Conversation";

export const messages = mysqlTable("messages", {
    id: varchar("id", { length: 8 }).primaryKey().$defaultFn(() => genuuid()),
    message: text("message").notNull(),
    sender_id: varchar("sender_id", { length: 8 }).references(() => users.id, { onDelete: "set null" }),
    conversation_id: varchar("conversation_id", { length: 8 }).references(() => conversations.id, { onDelete: "set null" }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
})