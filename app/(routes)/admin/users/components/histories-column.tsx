"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

export type SubscriptionHistoryColumn = {
  userId: string;
  type: string;
  status: string;
  price: string;
  user: string;
  name: string;
  createdAt: Date;
};
export const columns: ColumnDef<SubscriptionHistoryColumn>[] = [
  {
    accessorKey: "user",
    header: "Client",
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        <Link href={`/admin/users/${row.original.userId}`}>
          {row.getValue("user")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Abonnement",
  },

  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        <span
          style={{
            color:
              row.getValue("status") === "payé"
                ? "green"
                : row.getValue("status") === "erreur"
                ? "red"
                : "orange",
          }}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        {format(row.getValue("createdAt"), "d MMMM yyyy", { locale: fr })}
      </div>
    ),
  },
];
