"use client";

import { DateCell } from "@/components/table-custom-fuction/common-cell";
import { DateHeader } from "@/components/table-custom-fuction/common-header";
import type { DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DisplayPdf } from "../../../(profile)/components/display-pdf";

export type InvoicesColumn = {
  createdAt: Date;
  pdfUrl: string;
  total_ttc: number;
  id: string;
};
export const columns: ColumnDef<InvoicesColumn>[] = [
  { accessorKey: "id", header: "N° de facture" },
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
    header: ({ column }) => <DateHeader column={column} text={"Date"} />,
    cell: ({ row }) => <DateCell date={row.original.createdAt} className="md:pl-0" />,
  },
];

export const searchableColumns: DataTableSearchableColumn<InvoicesColumn>[] = [
  {
    id: "id",
    title: "N° de facture",
  },
];
