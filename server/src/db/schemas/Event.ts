import { genuuid } from "@/utils/uuid";
import { sql } from "drizzle-orm";
import { check, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";

const parseTime = (time: string) => new Date(time); // 2023-12-21 17:30:000

export const events = mysqlTable("events", {
    id: varchar("id", { length: 8 })
        .primaryKey()
        .$defaultFn(() => genuuid()),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    start_time: timestamp("start_time").notNull(),
    ticket_count: int("ticket_count").notNull(),
    ticket_available: int("ticket_available").notNull(),
    ticket_price: int("ticket_price").notNull(),
    status: mysqlEnum("status", ["SOON", "START", "END"]).default("SOON"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
},
    (table) => [
        check('ticket_available_check', sql`${table.ticket_available} >= 0`)
    ]
);

export const createEventSchema = createInsertSchema(events, {
    start_time: z.string().transform(parseTime),
});

export const updateEventSchema = createUpdateSchema(events, {
    start_time: z.string().transform(parseTime),
    updated_at: z.string().transform(parseTime),
});

export type EventSelect = typeof events.$inferSelect;

export type EventInsert = typeof events.$inferInsert;
