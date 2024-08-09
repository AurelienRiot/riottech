"use client";

import { dateFormatter } from "@/lib/utils";
import type { DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DisplayPdf } from "../../../(profile)/components/display-pdf";

export type InvoicesColumn = {
  date: Date;
  pdfUrl: string;
  total_ttc: number;
};
export const columns: ColumnDef<InvoicesColumn>[] = [
  {
    accessorKey: "pdfUrl",
    header: "Facture",
    cell: ({ row }) => <DisplayPdf avalaible={true} pdfUrl={row.original.pdfUrl} />,
  },
  {
    accessorKey: "total_ttc",
    header: "Prix total TTC",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => dateFormatter(row.original.date),
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<InvoicesColumn>[] = [
  {
    id: "pdfUrl",
    title: "Type",
  },

  {
    id: "total_ttc",
    title: "Prix total TTC",
  },
  {
    id: "date",
    title: "Date",
  },
];
