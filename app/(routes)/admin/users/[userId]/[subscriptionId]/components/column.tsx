"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

export type SubscriptionHistoryColumn = {
  id: string;
  type: string;
  status: string;
  pdfUrl: string;
  price: string;
  createdAt: Date;
};
export const columns: ColumnDef<SubscriptionHistoryColumn>[] = [
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
    accessorKey: "pdfUrl",
    header: "Facture",
    cell: ({ row }) => (
      <div className="flex ">
        {" "}
        <Link href={row.original.pdfUrl} target="_blank">
          <ExternalLink className="h-6 w-6 shrink-0" />
        </Link>
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
