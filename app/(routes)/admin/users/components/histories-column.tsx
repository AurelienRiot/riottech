"use client";

import { CreatedAtCell, NameCell, type Status, StatusCell } from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import type { DataTableFilterableColumn, DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export type SubscriptionHistoryColumn = {
  userId: string;
  type: "Création" | "Renouvellement";
  status: Status;
  price: string;
  userName: string;
  name: string;
  raisonSocial?: string | null;
  createdAt: Date;
};
export const columns: ColumnDef<SubscriptionHistoryColumn>[] = [
  {
    accessorKey: "userName",
    header: "Client",
    cell: ({ row }) => (
      <NameCell
        name={row.original.userName}
        id={row.original.userId}
        type="users"
        raisonSocial={row.original.raisonSocial}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Abonnement",
  },

  {
    accessorKey: "type",
    header: "Type",
    filterFn: FilterFn,
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "status",
    header: "État du paiement",
    cell: StatusCell,
    filterFn: FilterFn,
  },
  {
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },
];

export const searchableColumns: DataTableSearchableColumn<SubscriptionHistoryColumn>[] = [
  {
    id: "name",
    title: "Abonnement",
  },
  { id: "userName", title: "Client" },
];

export const filterableColumns: DataTableFilterableColumn<SubscriptionHistoryColumn>[] = [
  {
    id: "type",
    title: "Type",
    options: [
      { label: "Création", value: "Création" },
      { label: "Renouvellement", value: "Renouvellement" },
    ],
  },
  {
    id: "status",
    title: "État du paiement",
    options: [
      { label: "Paiement validé", value: "Paiement validé" },
      { label: "En cours de validation", value: "En cours de validation" },
      { label: "Non payé", value: "Non payé" },
    ],
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<SubscriptionHistoryColumn>[] = [
  {
    id: "userName",
    title: "Client",
  },
  {
    id: "type",
    title: "Type",
  },

  {
    id: "price",
    title: "Prix",
  },
  {
    id: "status",
    title: "État du paiement",
  },

  {
    id: "createdAt",
    title: "Date de création",
  },
];
