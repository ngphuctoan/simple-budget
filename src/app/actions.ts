"use server";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import dayjs from "dayjs";
import { db } from "@/db";
import { budgetsTable } from "@/db/schema";
import { between, count, eq } from "drizzle-orm";

export const addBudget = async (
  budgetData: typeof budgetsTable.$inferInsert,
) => {
  const [budget] = await db.insert(budgetsTable).values(budgetData).returning();
  updateTag("budgets");
  return budget;
};

export const getBudgets = async (customDate?: string | null) => {
  "use cache";
  cacheTag("budgets");
  cacheLife("hours");

  const parsedDate = dayjs(customDate);
  if (!parsedDate.isValid()) {
    return db.select().from(budgetsTable);
  }

  const begin = parsedDate.startOf("day").toISOString();
  const end = parsedDate.endOf("day").toISOString();

  return db.select().from(budgetsTable).where(
    between(budgetsTable.when, begin, end),
  );
};

export const getBudgetById = async (id?: number) => {
  "use cache";
  cacheTag("budgets", String(id ?? 0));
  cacheLife("minutes");

  if (!id) {
    return undefined;
  }

  const [budget] = await db.select().from(budgetsTable).where(
    eq(budgetsTable.id, id),
  );
  return budget;
};

export const updateBudget = async (
  id: number,
  budgetData: typeof budgetsTable.$inferInsert,
) => {
  const { id: _, ...safeBudgetData } = budgetData;
  const [budget] = await db.update(budgetsTable).set(safeBudgetData).where(
    eq(budgetsTable.id, id),
  ).returning();
  updateTag("budgets");
  return budget;
};

export const deleteBudget = async (id: number) => {
  const [budget] = await db.delete(budgetsTable).where(eq(budgetsTable.id, id))
    .returning();
  updateTag("budgets");
  return budget;
};

export const getNumOfBudgetsPerDate = async () => {
  "use cache";
  cacheTag("when_count");
  cacheLife("hours");

  return db.select({ when: budgetsTable.when, count: count() }).from(
    budgetsTable,
  ).groupBy(budgetsTable.when);
};
