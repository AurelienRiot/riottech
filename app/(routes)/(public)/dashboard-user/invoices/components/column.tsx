"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import { DisplayPdf } from "../../components/display-pdf";

export type InvoicesColumn = {
  type: string;
  products: string;
  pdfUrl: string;
  isPaid: boolean;
  price: string;
  mailSend: boolean;
  createdAt: Date;
};
export const columns: ColumnDef<InvoicesColumn>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "products",
    header: "Produits",
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
        <span
          className={`${
            row.original.isPaid
              ? row.original.mailSend
                ? "text-green-500"
                : "text-orange-500"
              : "text-red-500"
          }`}
        >
          {row.original.isPaid
            ? row.original.mailSend
              ? "Paiement validé"
              : "En cours de validation"
            : "Non payé"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pdfUrl",
    header: "Facture",
    cell: ({ row }) => (
      <DisplayPdf
        avalaible={row.original.mailSend}
        pdfUrl={row.original.pdfUrl}
      />
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
