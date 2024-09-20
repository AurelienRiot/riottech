"use client";

import { ProductCell } from "@/components/table-custom-fuction/cell-orders";
import { CreatedAtCell, NameCell } from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import type { DataTableFilterableColumn, DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";

export type OrderColumn = {
  id: string;
  userId: string;
  name: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  raisonSocial?: string | null;
  productsList: { name: string; quantity?: string }[];
  createdAt: Date;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produits",
    cell: ProductCell,
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => <NameCell type="users" name={row.getValue("name")} id={row.original.userId} raisonSocial={row.original.raisonSocial} />,
  },

  {
    accessorKey: "totalPrice",
    header: "Prix Total",
  },
  {
    accessorKey: "isPaid",
    header: "Payé",
    cell: ({ row }) => <Checkbox className="cursor-default self-center" checked={row.original.isPaid} />,
    filterFn: FilterFn,
  },
  {
    accessorKey: "createdAt",
    header: CreatedAtHeader,
    cell: CreatedAtCell,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const searchableColumns: DataTableSearchableColumn<OrderColumn>[] = [
  {
    id: "products",
    title: "Produits",
  },
  {
    id: "name",
    title: "Nom",
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
    id: "name",
    title: "Nom",
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
    id: "createdAt",
    title: "Date de création",
  },
  {
    id: "actions" as keyof OrderColumn,
    title: "Actions",
  },
];
