"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import { DisplayPdf } from "../../(profile)/components/display-pdf";
import { ProductCell } from "@/components/table-custom-fuction/cell-orders";
import {
  CreatedAtCell,
  StatusCell,
} from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableViewOptionsColumn,
} from "@/types";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";

export type InvoicesColumn = {
  type: "Commande" | "Abonnement";
  products: string;
  productsList: { name: string; quantity?: string }[];
  pdfUrl: string;
  isPaid: boolean;
  status: "Paiement validé" | "En cours de validation" | "Non payé";
  price: string;
  mailSend: boolean;
  createdAt: Date;
};
export const columns: ColumnDef<InvoicesColumn>[] = [
  {
    accessorKey: "type",
    header: "Type",
    filterFn: FilterFn,
  },
  {
    accessorKey: "products",
    header: "Produits",
    cell: ProductCell,
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
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },
];

export const searchableColumns: DataTableSearchableColumn<InvoicesColumn>[] = [
  {
    id: "products",
    title: "Produits",
  },
];

export const filterableColumns: DataTableFilterableColumn<InvoicesColumn>[] = [
  {
    id: "type",
    title: "Type",
    options: [
      { label: "Commande", value: "Commande" },
      { label: "Abonnement", value: "Abonnement" },
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

export const viewOptionsColumns: DataTableViewOptionsColumn<InvoicesColumn>[] =
  [
    {
      id: "type",
      title: "Type",
    },

    {
      id: "products",
      title: "Produits",
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
      id: "pdfUrl",
      title: "Facture",
    },

    {
      id: "createdAt",
      title: "Date de création",
    },
  ];
