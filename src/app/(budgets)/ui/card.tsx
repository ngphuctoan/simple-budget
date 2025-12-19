"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Budget } from "@/types/budgets";
import { useQueryString } from "@/hooks/query-string";
import { deleteBudget } from "@/app/actions";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function BudgetCard(
  { budget }: { budget: Budget },
) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useQueryString(searchParams);

  return (
    <>
      <Card variant="outlined" component="li">
        <CardContent className="pb-0">
          <Typography variant="body2" className="text-text-secondary/60">
            {dayjs(budget.when).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography>{budget.desc}</Typography>
          <Typography
            variant="h6"
            className="font-mono text-primary"
            component="pre"
          >
            {formatter.format(budget.amount)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<EditIcon />}
            onClick={() =>
              router.replace(
                `/?${createQueryString("edit", String(budget.id))}`,
              )}
          >
            Edit
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <DialogTitle id="delete-dialog-title">Delete this budget?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-desc">
            Do you want to delete this budget? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() =>
              deleteBudget(budget.id).then(() => setOpenDeleteDialog(false))}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
