import Budgets from "./ui/budgets";
import Sidebar from "./ui/sidebar";

export default async function BudgetsPage(
  { searchParams }: { searchParams: Promise<{ date: string; edit: string }> },
) {
  const date = searchParams.then((params) => params.date);
  const editId = searchParams.then((params) => {
    const editId = Number(params.edit);
    return Number.isFinite(editId) ? editId : undefined;
  });

  return (
    <main className="grid md:grid-cols-[1fr_320px] gap-8 max-w-[1200px] p-4 sm:p-8 mx-auto">
      <section className="@container max-md:order-2 space-y-4">
        <Budgets date={date} />
      </section>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        <Sidebar editId={editId} />
      </section>
    </main>
  );
}

// import BudgetAddForm from "./form";
// import BudgetCalendar from "./calendar";
// import BudgetCard from "./card";
// import { getBudgets } from "../actions";
// import { Alert, AlertTitle, Typography } from "@mui/material";
// import WalletIcon from "@mui/icons-material/Wallet";
// import { redirect } from "next/navigation";

// export default async function Budgets({
//   searchParams,
// }: {
//   searchParams: Promise<{ date?: string | null }>;
// }) {
//   const { date } = await searchParams;
//   const budgets = await getBudgets(date);

//   const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);

//   const formatter = new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   });

//   const calendarAction = async (date?: string) => {
//     "use server";
//     if (date) {
//       redirect(`/?date=${date}`);
//     }
//   };

//   return (
//     <main className="grid md:grid-cols-[1fr_320px] gap-8 max-w-[1200px] p-4 sm:p-8 mx-auto">
//       <section className="@container max-md:order-2 space-y-4">
//         <Alert severity="success" icon={<WalletIcon fontSize="inherit" />}>
//           <AlertTitle>Total Spenditure</AlertTitle>
//           <Typography
//             variant="h5"
//             className="font-mono"
//             component="pre"
//           >
//             {formatter.format(totalAmount)}
//           </Typography>
//         </Alert>
//         <ul className="grid @2xl:grid-cols-2 gap-4">
//           {budgets.map((budget, i) => <BudgetCard key={i} budget={budget} />)}
//         </ul>
//       </section>
//       <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
//         <BudgetCalendar
//           defaultDate={date}
//           action={calendarAction}
//         />
//         <BudgetAddForm />
//       </section>
//     </main>
//   );
// }
