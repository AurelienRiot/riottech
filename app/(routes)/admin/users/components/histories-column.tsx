"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
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
      <div className="flex capitalize md:pl-10 ">
        {" "}
        <Button asChild variant={"linkHover2"}>
          <Link href={`/admin/users/${row.original.userId}`}>
            {row.getValue("user")}
          </Link>
        </Button>
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
    header: "État du paiement",
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
          <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
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
