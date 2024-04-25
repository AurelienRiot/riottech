"use client";
import { Subscription } from "@prisma/client";
import { Row } from "@tanstack/react-table";

type RecurrenceCellProps<T = {}> = T & {
  recurrence: Subscription["recurrence"] | undefined;
};

function RecurrenceCell<T>({ row }: { row: Row<RecurrenceCellProps<T>> }) {
  switch (row.original.recurrence) {
    case "month":
      return "Mensuel";
    case "year":
      return "Annuel";
    case "day":
      return "Journalier";
    case "week":
      return "Hebdomadaire";
  }
}

export { RecurrenceCell };
