import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { genuuid } from "@/utils/uuid";
import { PAYMENT } from "@/constants/enum";
import { createInsertSchema } from "drizzle-zod";
import { users } from "./User";
import { events } from "./Event";

export const transactions = mysqlTable("transactions", {
    id: varchar("id", { length: 8 })
        .primaryKey()
        .$defaultFn(() => genuuid()),
    description: text("description"),
    user_id: varchar("user_id", { length: 8 }).references(() => users.id, {
        onDelete: "set null",
    }),
    event_id: varchar("event_id", { length: 8 }).references(() => events.id, {
        onDelete: "set null",
    }),
    status: mysqlEnum("status", [PAYMENT.PENDING, PAYMENT.PAID, PAYMENT.FAILED]).default(
        PAYMENT.PENDING,
    ),
    invoice_url: text("invoice_url"),
    purchase_time: timestamp("purchase_time"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
});

export const createTransactionSchema = createInsertSchema(transactions);

export type TransactionSelect = typeof transactions.$inferSelect;

export type TransactionInsert = typeof transactions.$inferInsert;
