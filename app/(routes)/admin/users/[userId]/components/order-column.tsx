"use client";

import { DisplayPdf } from "@/app/(routes)/(public)/dashboard-user/(profile)/components/display-pdf";
import { ProductCell } from "@/components/table-custom-fuction/cell-orders";
import { CreatedAtCell } from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { OrderCellAction } from "./order-cell-action";
import type { DataTableFilterableColumn, DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";

export type OrderColumn = {
  id: string;
  isPaid: boolean;
  totalPrice: string;
  productsList: { name: string; quantity?: string }[];
  products: string;
  mailSend: boolean;
  pdfUrl: string;
  createdAt: Date;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produits",
    cell: ProductCell,
  },
  {
    accessorKey: "totalPrice",
    header: "Prix total",
  },
  {
    accessorKey: "isPaid",
    header: "Payé",
    cell: ({ row }) => <Checkbox className="cursor-default self-center" checked={row.original.isPaid} />,
    filterFn: FilterFn,
  },
  {
    accessorKey: "pdfUrl",
    header: "Facture",
    cell: ({ row }) => <DisplayPdf avalaible={row.original.mailSend} pdfUrl={row.original.pdfUrl} />,
  },
  {
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },

  {
    id: "actions",
    cell: ({ row }) => <OrderCellAction data={row.original} />,
  },
];

export const searchableColumns: DataTableSearchableColumn<OrderColumn>[] = [
  {
    id: "products",
    title: "Produits",
  },
];

export const filterableColumns: DataTableFilterableColumn<OrderColumn>[] = [
  {
    id: "isPaid",
    title: "Payé",
    options: [
      { label: "Payé", value: "true" },
      { label: "Non Payé", value: "false" },
    ],
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<OrderColumn>[] = [
  {
    id: "products",
    title: "Produits",
  },

  {
    id: "totalPrice",
    title: "Prix total",
  },
  {
    id: "isPaid",
    title: "Payé",
  },
  {
    id: "pdfUrl",
    title: "Facture",
  },

  {
    id: "createdAt",
    title: "Date de création",
  },
  {
    id: "actions" as keyof OrderColumn,
    title: "Actions",
  },
];
