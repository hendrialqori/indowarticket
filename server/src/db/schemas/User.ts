import { genuuid } from "@/utils/uuid";
import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 8 })
    .primaryKey()
    .$defaultFn(() => genuuid()),
  email: varchar("email", { length: 50 }).notNull(),
  display_name: varchar("display_name", { length: 255 }).notNull(),
  picture: text("picture").notNull(),
  provider_id: text("provider_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
});

export type UserSelect = typeof users.$inferSelect;

export type UserInsert = typeof users.$inferInsert;
