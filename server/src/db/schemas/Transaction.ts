import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { tickets as tickes_table } from "./Ticket";
import { genuuid } from "@/utils/uuid";
import { PAYMENT } from "@/constants/enum";
import { createInsertSchema } from "drizzle-zod";
import { users as users_table } from "./User";

export const transactions = mysqlTable('transactions', {
    id: varchar("id", { length: 8 })
        .primaryKey()
        .$defaultFn(() => genuuid()),
    description: text('description'),
    ticket_id: varchar("ticket_id", { length: 8 }).references(() => tickes_table.id, {
        onDelete: "set null"
    }),
    user_id: varchar('user_id', { length: 8 }).references(() => users_table.id, {
        onDelete: 'set null'
    }),
    status: mysqlEnum("status", [PAYMENT.PENDING, PAYMENT.PAID, PAYMENT.FAILED]).default(PAYMENT.PENDING),
    purchase_time: timestamp("purchase_time"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at")
})


export const createTransactionSchema = createInsertSchema(transactions)

export type TransactionSelect = typeof transactions.$inferSelect;

export type TransactionInsert = typeof transactions.$inferInsert;
