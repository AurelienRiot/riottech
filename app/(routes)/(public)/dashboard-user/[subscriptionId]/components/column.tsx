"use client";

import {
  CreatedAtCell,
  StatusCell,
} from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { DataTableFilterableColumn, DataTableViewOptionsColumn } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DisplayPdf } from "../../(profile)/components/display-pdf";

export type SubscriptionHistoryColumn = {
  id: string;
  type: "Création" | "Renouvellement";
  status: "Paiement validé" | "En cours de validation" | "Non payé";
  pdfUrl: string;
  price: string;
  mailSend: boolean;
  createdAt: Date;
};
export const columns: ColumnDef<SubscriptionHistoryColumn>[] = [
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

export const filterableColumns: DataTableFilterableColumn<SubscriptionHistoryColumn>[] =
  [
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

export const viewOptionsColumns: DataTableViewOptionsColumn<SubscriptionHistoryColumn>[] =
  [
    {
      id: "type",
      title: "Type",
    },

    {
      id: "price",
      title: "Prix",
    },
    {
      id: "mailSend",
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
