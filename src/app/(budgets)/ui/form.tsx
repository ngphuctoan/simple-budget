"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldElement } from "react-hook-form-mui";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePickerElement } from "react-hook-form-mui/date-pickers";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Budget } from "@/types/budgets";
import { useQueryString } from "@/hooks/query-string";
import { addBudget, updateBudget } from "@/app/actions";

const budgetSchema = z.object({
  id: z.coerce.number().optional(),
  desc: z.string().nonempty(),
  amount: z.coerce.number().int().min(1_000).max(1_000_000_000),
  when: z.transform((val) =>
    (dayjs.isDayjs(val) ? val : dayjs()).toISOString()
  ),
});

export default function BudgetForm({ budget }: { budget?: Budget }) {
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      ...budget,
      when: budget ? dayjs(budget.when) : undefined,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useQueryString(searchParams);

  const resetEdit = () =>
    router.replace(`/?${createQueryString("edit", null)}`);

  return (
    <form
      onSubmit={handleSubmit((values) =>
        (values.id ? updateBudget(values.id, values) : addBudget(values)).then(
          () => values.id ? resetEdit() : reset(),
        )
      )}
      className="flex flex-wrap h-max gap-4"
    >
      <TextFieldElement
        control={control}
        name="desc"
        label="Item(s)"
        multiline
        size="small"
        fullWidth
      />
      <TextFieldElement
        control={control}
        name="amount"
        label="Amount"
        size="small"
        fullWidth
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="start">₫</InputAdornment>,
          },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePickerElement
          control={control}
          name="when"
          label="When"
          inputProps={{ size: "small", fullWidth: true }}
        />
      </LocalizationProvider>
      <Button
        type="submit"
        variant="contained"
        startIcon={watch("id") ? <EditIcon /> : <AddIcon />}
      >
        {watch("id") ? "Update" : "Add"}
      </Button>
      <Button
        type="reset"
        startIcon={<ClearAllIcon />}
        onClick={() => watch("id") ? resetEdit() : reset()}
      >
        Clear
      </Button>
    </form>
  );
}
