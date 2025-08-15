"use client";

import { RecurrenceCell } from "@/components/table-custom-fuction/cell-subscription";
import { CreatedAtCell } from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { dateFormatter } from "@/lib/utils";
import type { DataTableFilterableColumn, DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import type { Subscription } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { SubscriptionOrderCellAction } from "./subscription-order-cell-action";

export type SubscriptionOrderColumn = {
  id: string;
  userId: string;
  isPaid: boolean;
  recurrence: Subscription["recurrence"] | undefined;
  totalPrice: string;
  subscription: string | undefined;
  createdAt: Date;
  isActive: boolean;
  sim: string;
  changedDate?: Date;
};

export const columns: ColumnDef<SubscriptionOrderColumn>[] = [
  {
    accessorKey: "subscription",
    header: "Abonnement",
    cell: ({ row }) => (
      <div>
        {row.getValue("subscription") ? (
          <Button asChild variant={"link"} className="px-0">
            <Link href={`/admin/users/${row.original.userId}/${row.original.id}`}>{row.getValue("subscription")}</Link>
          </Button>
        ) : (
          <span>{row.getValue("subscription")}</span>
        )}
        {row.original.changedDate && row.original.changedDate > new Date() && (
          <>
            <br />
            changement en cours, effectif le {dateFormatter(row.original.changedDate)}{" "}
          </>
        )}{" "}
      </div>
    ),
  },
  {
    accessorKey: "sim",
    header: "Numéro de SIM",
  },
  {
    accessorKey: "totalPrice",
    header: "Prix total",
  },
  {
    accessorKey: "recurrence",
    header: "Renouvellement",
    cell: RecurrenceCell,
    filterFn: FilterFn,
  },
  {
    accessorKey: "isPaid",
    header: "Payé",
    cell: ({ row }) => <Checkbox className="cursor-default self-center" checked={row.original.isPaid} />,
    filterFn: FilterFn,
  },
  {
    accessorKey: "isActive",
    header: "Actif",
    cell: ({ row }) => <Checkbox className="cursor-default self-center" checked={row.original.isActive} />,
    filterFn: FilterFn,
  },
  {
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },
  {
    id: "actions",
    cell: ({ row }) => <SubscriptionOrderCellAction data={row.original} />,
  },
];

export const searchableColumns: DataTableSearchableColumn<SubscriptionOrderColumn>[] = [
  {
    id: "subscription",
    title: "Abonnement",
  },
  {
    id: "sim",
    title: "Sim",
  },
];

export const filterableColumns: DataTableFilterableColumn<SubscriptionOrderColumn>[] = [
  {
    id: "isPaid",
    title: "Payé",
    options: [
      { label: "Payé", value: "true" },
      { label: "Non Payé", value: "false" },
    ],
  },
  {
    id: "isActive",
    title: "Actif",
    options: [
      { label: "Actif", value: "true" },
      { label: "Non Actif", value: "false" },
    ],
  },
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

export const viewOptionsColumns: DataTableViewOptionsColumn<SubscriptionOrderColumn>[] = [
  {
    id: "subscription",
    title: "Abonnement",
  },

  {
    id: "sim",
    title: "Sim",
  },
  {
    id: "totalPrice",
    title: "Prix total",
  },
  {
    id: "recurrence",
    title: "Renouvellement",
  },
  {
    id: "isPaid",
    title: "Payé",
  },
  {
    id: "isActive",
    title: "Actif",
  },

  {
    id: "createdAt",
    title: "Date de création",
  },
  {
    id: "actions" as keyof SubscriptionOrderColumn,
    title: "Actions",
  },
];
