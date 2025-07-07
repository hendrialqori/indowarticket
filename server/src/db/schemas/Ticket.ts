import { genuuid } from "@/utils/uuid";
import { mysqlTable, timestamp, varchar, mysqlEnum } from "drizzle-orm/mysql-core";
import { users as users_table } from "./User";
import { events as events_table } from "./Event";
import { createInsertSchema } from 'drizzle-zod'

export const tickets = mysqlTable("tickets", {
    id: varchar("id", { length: 8 })
        .primaryKey()
        .$defaultFn(() => genuuid()),
    code: varchar("code", { length: 16 }).$defaultFn(() => genuuid(16)),
    user_id: varchar("user_id", { length: 8 }).references(() => users_table.id, {
        onDelete: "set null",
    }),
    event_id: varchar("event_id", { length: 8 }).references(() => events_table.id, {
        onDelete: "set null",
    }),
    purchase_time: timestamp("purchase_time").defaultNow(),
    status: mysqlEnum(["VALID", "USED"]).default('VALID'),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
});

export const createTicketSchema = createInsertSchema(tickets)

export type TicketSelect = typeof tickets.$inferSelect;

export type TicketInsert = typeof tickets.$inferInsert;
