"use client";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { useQueryString } from "@/hooks/query-string";

type NumOfBudgetsPerDate = { when: string; count: number }[];

function NumOfBudgetsDay(
  { numOfBudgetsPerDate = [], day, selected, ...props }: PickersDayProps & {
    numOfBudgetsPerDate?: NumOfBudgetsPerDate;
  },
) {
  const numOfBudgets = numOfBudgetsPerDate.filter((item) =>
    dayjs(item.when).startOf("day").isSame(day)
  ).reduce((sum, item) => sum + item.count, 0);

  return (
    <Badge
      key={day.toString()}
      badgeContent={numOfBudgets}
      max={9}
      invisible={selected}
      variant="dot"
      color="primary"
      overlap="circular"
    >
      <PickersDay day={day} selected={selected} {...props} />
    </Badge>
  );
}

export default function BudgetCalendar(
  { numOfBudgetsPerDate = [] }: { numOfBudgetsPerDate?: NumOfBudgetsPerDate },
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useQueryString(searchParams);

  const date = dayjs(searchParams.get("date"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date.isValid() ? date : null}
        onChange={(value) =>
          value &&
          router.replace(
            `/?${createQueryString("date", value.format("YYYY-MM-DD"))}`,
          )}
        views={["day"]}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        fixedWeekNumber={6}
        slots={{ day: NumOfBudgetsDay }}
        slotProps={{ day: { numOfBudgetsPerDate } as any }}
      />
    </LocalizationProvider>
  );
}
