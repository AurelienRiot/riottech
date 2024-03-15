"use client";

import {
  CreatedAtCell,
  NameWithImageCell,
} from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";

export type BillboardColumn = {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: Date;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <NameWithImageCell
        name={row.original.name}
        id={row.original.id}
        imageUrl={row.original.imageUrl}
        type="billboards"
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

export const searchableColumns: DataTableSearchableColumn<BillboardColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<BillboardColumn>[] =
  [
    {
      id: "name",
      title: "Nom",
    },

    {
      id: "createdAt",
      title: "Date de création",
    },
    {
      id: "actions" as keyof BillboardColumn,
      title: "Actions",
    },
  ];
