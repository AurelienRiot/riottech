import { Button } from "@/components/ui/button";
import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type CreatedAtHeaderProps = {
  createdAt: Date;
};

function CreatedAtHeader<T>({ column }: { column: Column<T & CreatedAtHeaderProps> }) {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      Date de création
      <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
    </Button>
  );
}

type DateHeaderProps<T> = {
  text?: string;
  column: Column<T>;
};

function DateHeader<T>({ text = "Date de création", column }: DateHeaderProps<T>) {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {text}
      <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
    </Button>
  );
}

export { CreatedAtHeader, DateHeader };
