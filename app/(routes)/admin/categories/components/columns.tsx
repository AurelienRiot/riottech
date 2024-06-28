"use client";

import { CreatedAtCell, NameWithImageCell } from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import type { DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
  id: string;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <NameWithImageCell
        name={row.original.name}
        id={row.original.id}
        type="categories"
        imageUrl={row.original.imageUrl}
      />
    ),
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

export const searchableColumns: DataTableSearchableColumn<CategoryColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<CategoryColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },

  {
    id: "createdAt",
    title: "Date de création",
  },
  {
    id: "actions" as keyof CategoryColumn,
    title: "Actions",
  },
];
