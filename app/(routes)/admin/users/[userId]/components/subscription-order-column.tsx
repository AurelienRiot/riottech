"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubscriptionOrderCellAction } from "./subscription-order-cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

export type SubscriptionOrderColumn = {
  id: string;
  userId: string;
  isPaid: string;
  totalPrice: string;
  subscription: string;
  createdAt: Date;
  isActive: string;
  sim: string;
};
export const columns: ColumnDef<SubscriptionOrderColumn>[] = [
  {
    accessorKey: "subscription",
    header: "Abonnement",
    cell: ({ row }) => (
      <div className="flex">
        {" "}
        <Link href={`/admin/users/${row.original.userId}/${row.original.id}`}>
          {row.getValue("subscription")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "sim",
    header: "Numeros de SIM",
  },
  {
    accessorKey: "totalPrice",
    header: "Prix total",
  },
  {
    accessorKey: "isPaid",
    header: "Payé",
  },
  {
    accessorKey: "isActive",
    header: "Actif",
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
  {
    id: "actions",
    cell: ({ row }) => <SubscriptionOrderCellAction data={row.original} />,
  },
];
