"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import {
  CreatedAtCell,
  NameCell,
  NameWithImageCell,
} from "@/components/table-custom-fuction/common-cell";
import { Billboard } from "@prisma/client";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";

export type CategoryColumn = {
  id: string;
  name: string;
  billboard: Billboard;
  billboardLabel: string;
  createdAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <NameCell
        name={row.original.name}
        id={row.original.id}
        type="categories"
      />
    ),
  },
  {
    accessorKey: "billboardLabel",
    header: "Panneau d'affichage",
    cell: ({ row }) => (
      <NameWithImageCell
        name={row.original.billboard.label}
        id={row.original.billboard.id}
        imageUrl={row.original.billboard.imageUrl}
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

export const searchableColumns: DataTableSearchableColumn<CategoryColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
  {
    id: "billboardLabel",
    title: "Panneau d'affichage",
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<CategoryColumn>[] =
  [
    {
      id: "name",
      title: "Nom",
    },
    {
      id: "billboardLabel",
      title: "Panneau d'affichage",
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
