"use client";

import { RecurrenceCell } from "@/components/table-custom-fuction/cell-subscription";
import { CreatedAtCell } from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableViewOptionsColumn,
} from "@/types";
import { Subscription } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_URL as string;

export type SubscriptionOrderColumnType = {
  id: string;
  isPaid: boolean;
  recurrence: Subscription["recurrence"] | undefined;
  totalPrice: string;
  subscription: string | undefined;
  histories: number;
  createdAt: Date;
  isActive: boolean;
  sim: string;
};
export const SubscriptionOrderColumn: ColumnDef<SubscriptionOrderColumnType>[] =
  [
    {
      accessorKey: "subscription",
      header: "Abonnement",
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
    },
    {
      accessorKey: "isPaid",
      header: "Payé",
      cell: ({ row }) => (
        <Checkbox
          className="cursor-default self-center"
          checked={row.original.isPaid}
        />
      ),
      filterFn: FilterFn,
    },
    {
      accessorKey: "isActive",
      header: "Actif",
      cell: ({ row }) => (
        <Checkbox
          className="cursor-default self-center"
          checked={row.original.isPaid}
        />
      ),
      filterFn: FilterFn,
    },
    {
      accessorKey: "createdAt",
      header: CreatedAtHeader,
      cell: CreatedAtCell,
    },
    {
      id: "histories",
      header: "Historique",
      cell: ({ row }) =>
        row.original.histories > 0 ? (
          <Button asChild variant={"link"} className="p-0">
            <Link href={`${baseUrl}/dashboard-user/${row.original.id}`}>
              Voir mes paiements
            </Link>
          </Button>
        ) : null,
    },
  ];

export const searchableColumns: DataTableSearchableColumn<SubscriptionOrderColumnType>[] =
  [
    {
      id: "subscription",
      title: "Abonnement",
    },
    {
      id: "sim",
      title: "Sim",
    },
  ];

export const filterableColumns: DataTableFilterableColumn<SubscriptionOrderColumnType>[] =
  [
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
  ];

export const viewOptionsColumns: DataTableViewOptionsColumn<SubscriptionOrderColumnType>[] =
  [
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
      id: "histories",
      title: "Historique",
    },
  ];
