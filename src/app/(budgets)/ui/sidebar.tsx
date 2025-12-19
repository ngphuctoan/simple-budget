import { getBudgetById, getNumOfBudgetsPerDate } from "@/app/actions";
import BudgetCalendar from "./calendar";
import BudgetForm from "./form";

export default async function Sidebar(
  { editId }: { editId: Promise<number | undefined> },
) {
  const numOfBudgetsPerDate = await getNumOfBudgetsPerDate();
  const budget = await getBudgetById(await editId);

  return (
    <>
      <BudgetCalendar numOfBudgetsPerDate={numOfBudgetsPerDate} />
      <BudgetForm key={budget?.id ?? "new"} budget={budget} />
    </>
  );
}
