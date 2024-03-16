"use client";

import { RecurrenceCell } from "@/components/table-custom-fuction/cell-subscription";
import {
  CreatedAtCell,
  NameCell,
} from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableViewOptionsColumn,
} from "@/types";
import { Subscription } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SubscriptionColumn = {
  id: string;
  name: string;
  priceHT: string;
  recurrence: Subscription["recurrence"] | undefined;
  dataCap: number;
  createdAt: Date;
};

export const columns: ColumnDef<SubscriptionColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <NameCell
        name={row.getValue("name")}
        id={row.original.id}
        type="subscriptions"
      />
    ),
  },
  {
    accessorKey: "priceHT",
    header: "Prix",
  },
  {
    accessorKey: "dataCap",
    header: "Limite donnée (GB)",
  },
  {
    accessorKey: "recurrence",
    header: "Recurrence",
    cell: RecurrenceCell,
    filterFn: FilterFn,
  },
  {
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const searchableColumns: DataTableSearchableColumn<SubscriptionColumn>[] =
  [
    {
      id: "name",
      title: "Nom",
    },
  ];

export const filterableColumns: DataTableFilterableColumn<SubscriptionColumn>[] =
  [
    {
      id: "recurrence",
      title: "Recurrence",
      options: [
        { label: "Annuel", value: "year" },
        { label: "Mensuel", value: "month" },
        { label: "Hebdomadaire", value: "week" },
        { label: "Quotidien", value: "day" },
      ],
    },
  ];

export const viewOptionsColumns: DataTableViewOptionsColumn<SubscriptionColumn>[] =
  [
    {
      id: "name",
      title: "Nom",
    },

    {
      id: "priceHT",
      title: "Prix",
    },
    {
      id: "dataCap",
      title: "Limite donnée (GB)",
    },
    {
      id: "recurrence",
      title: "Renouvellement",
    },

    {
      id: "createdAt",
      title: "Date de création",
    },
    {
      id: "actions" as keyof SubscriptionColumn,
      title: "Actions",
    },
  ];
