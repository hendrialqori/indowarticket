import { genuuid } from "@/utils/uuid";
import { mysqlTable, timestamp, varchar, mysqlEnum } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { STATUS } from "@/constants/enum";
import { transactions } from "./Transaction";

export const tickets = mysqlTable("tickets", {
    id: varchar("id", { length: 8 })
        .primaryKey()
        .$defaultFn(() => genuuid()),
    code: varchar("code", { length: 16 }).$defaultFn(() => genuuid(16)),
    transaction_id: varchar("transaction_id", { length: 8 }).references(() => transactions.id, {
        onDelete: "set null",
    }),
    status: mysqlEnum([STATUS.VALID, STATUS.USED]).default(STATUS.VALID),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
});

export const createTicketSchema = createInsertSchema(tickets);

export type TicketSelect = typeof tickets.$inferSelect;

export type TicketInsert = typeof tickets.$inferInsert;
