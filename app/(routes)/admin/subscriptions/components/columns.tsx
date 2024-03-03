"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatter } from "@/lib/utils";
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
  isFeatured: string;
  isArchived: string;
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
        <Link
          href={`/admin/subscriptions/${row.original.id}`}
          className="hover:underline"
        >
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
  },
  {
    accessorKey: "isFeatured",
    header: "Mise en avant",
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
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4">{formatter.format(row.getValue("priceHT"))}</div>
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
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2" />
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
              {"Récurrence"}
              <ChevronRight
                className="flex-shrink-0 w-4 h-4 ml-2
              group-data-[state=open]:rotate-90 transition-all"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={4}
            className="w-[180px] h-auto p-1 flex flex-col gap-3"
          >
            {Recurrences.map((recurrence) => {
              return (
                <Label
                  key={recurrence}
                  className="cursor-pointer flex items-center justify-left p-2 gap-2 hover:text-accent-foreground hover:bg-accent rounded-md"
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
                        filterValues.length ? filterValues : undefined
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
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2 group-active:rotate-180 transition-all duration-100" />
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
