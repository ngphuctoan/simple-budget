import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import WalletIcon from "@mui/icons-material/Wallet";
import BudgetCard from "./card";
import { getBudgets } from "@/app/actions";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default async function Budgets(
  { date }: { date: Promise<string | null | undefined> },
) {
  const budgets = await getBudgets(await date);

  return (
    <>
      <Alert severity="success" icon={<WalletIcon fontSize="inherit" />}>
        <AlertTitle>Total Spenditure</AlertTitle>
        <Typography
          variant="h5"
          className="font-mono"
          component="pre"
        >
          {formatter.format(budgets.reduce(
            (sum, budget) => sum + budget.amount,
            0,
          ))}
        </Typography>
      </Alert>
      <ul className="grid @2xl:grid-cols-2 gap-4">
        {budgets.map((budget, i) => (
          <BudgetCard
            key={i}
            budget={budget}
          />
        ))}
      </ul>
    </>
  );
}
