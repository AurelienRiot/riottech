"use client";

import { CreatedAtCell } from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import type { DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DisplayPdf } from "../../../(profile)/components/display-pdf";

export type InvoicesColumn = {
  createdAt: Date;
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
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
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
    id: "createdAt",
    title: "Date de création",
  },
];
