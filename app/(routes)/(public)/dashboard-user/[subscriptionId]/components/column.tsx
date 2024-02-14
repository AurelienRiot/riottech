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
  pdfUrl: string;
  price: string;
  mailSend: boolean;
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
    header: "Statut",
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        <span
          style={{
            color: row.original.mailSend ? "green" : "orange",
          }}
        >
          {row.original.mailSend ? "Paiement validé" : "En cours de validation"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pdfUrl",
    header: "Facture",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        {" "}
        {row.original.mailSend ? (
          <>
            <Link
              href={row.original.pdfUrl}
              target="_blank"
              className="hover:underline"
            >
              Ouvrir
            </Link>
            <Link
              href={row.original.pdfUrl.replace(/mode=inline&/, "")}
              target="_blank"
              className="hover:underline"
            >
              Télécharger
            </Link>
          </>
        ) : (
          "Non disponible"
        )}
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
        {format(new Date(row.getValue("createdAt")), "d MMMM yyyy", {
          locale: fr,
        })}
      </div>
    ),
  },
];
