import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const budgetsTable = sqliteTable("budgets", {
  id: integer().primaryKey({ autoIncrement: true }),
  desc: text().notNull(),
  amount: integer().notNull(),
  when: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
