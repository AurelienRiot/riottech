"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencyFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CellAction } from "./cell-action";

export const Recurrences = [
  "Annuel",
  "Mensuel",
  "Hebdomadaire",
  "journaliaire",
] as const;

export type SubscriptionColumn = {
  id: string;
  name: string;
  priceHT: string;
  recurrence: keyof typeof Recurrences;
  dataCap: string;
  createdAt: Date;
};

export const columns: ColumnDef<SubscriptionColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <div className="flex">
        {" "}
        <Button asChild variant={"link"}>
          <Link href={`/admin/subscriptions/${row.original.id}`}>
            {row.getValue("name")}
          </Link>
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "priceHT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Prix"}
          <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4">
        {currencyFormatter.format(row.getValue("priceHT"))}
      </div>
    ),
  },
  {
    accessorKey: "dataCap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Limite donnée (GB)"}
          <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("dataCap")}</div>,
  },
  {
    accessorKey: "recurrence",
    header: ({ column }) => {
      const selectedValues = new Set(column.getFilterValue() as string[]);
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="group">
              Renouvellement
              <ChevronRight
                className="ml-2 h-4 w-4 flex-shrink-0
              transition-all group-data-[state=open]:rotate-90"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={4}
            className="flex h-auto w-[180px] flex-col gap-3 p-1"
          >
            {Recurrences.map((recurrence) => {
              return (
                <Label
                  key={recurrence}
                  className="justify-left flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Checkbox
                    value={recurrence}
                    checked={selectedValues.has(recurrence)}
                    onCheckedChange={(value) => {
                      if (!value) {
                        selectedValues.delete(recurrence);
                      } else {
                        selectedValues.add(recurrence);
                      }
                      const filterValues = Array.from(selectedValues);

                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  />
                  {recurrence}
                </Label>
              );
            })}
          </PopoverContent>
        </Popover>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("recurrence")}</div>,
    filterFn: (row, id, value) => {
      return value instanceof Array && value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group"
        >
          Date de création
          <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0 transition-all duration-100 group-active:rotate-180" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4">
        {" "}
        {format(row.getValue("createdAt"), "d MMMM yyyy", { locale: fr })}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
