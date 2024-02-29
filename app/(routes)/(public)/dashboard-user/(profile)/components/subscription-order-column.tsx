"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubscriptionOrderCellAction } from "./subscription-order-cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export type SubscriptionOrderColumnType = {
  id: string;
  isPaid: string;
  totalPrice: string;
  subscription: string;
  histories: number;
  createdAt: Date;
  isActive: string;
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
          {format(new Date(row.getValue("createdAt")), "d MMMM yyyy", {
            locale: fr,
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Historique",
      cell: ({ row }) => <SubscriptionOrderCellAction data={row.original} />,
    },
  ];
