import { genuuid } from "@/utils/uuid";
import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

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
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
});

export type EventSelect = typeof events.$inferSelect;

export type EventInsert = typeof events.$inferInsert;
