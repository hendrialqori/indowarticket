import { genuuid } from "@/utils/uuid";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./User";
import { events } from "./Event";

export const conversations = mysqlTable('conversations', {
    id: varchar('id', { length: 8 }).primaryKey().$defaultFn(() => genuuid()),
    admin_id: varchar('admin_id', { length: 8 }).references(() => users.id, { onDelete: "set null" }),
    buyer_id: varchar('buyer_id', { length: 8 }).references(() => users.id, { onDelete: "set null" }),
    event_id: varchar("event_id", { length: 8 }).references(() => events.id, { onDelete: "set null" }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
})