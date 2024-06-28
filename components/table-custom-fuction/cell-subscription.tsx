"use client";
import type { Subscription } from "@prisma/client";
import type { Row } from "@tanstack/react-table";

type RecurrenceCellProps = {
  recurrence: Subscription["recurrence"] | undefined;
};

function RecurrenceCell<T>({ row }: { row: Row<T & RecurrenceCellProps> }) {
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
