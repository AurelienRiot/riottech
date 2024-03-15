"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CellAction } from "./cell-action";
import {
  CheckboxCell,
  CreatedAtCell,
  NameCell,
  NameWithImageCell,
} from "@/components/table-custom-fuction/common-cell";
import { changeArchived, changeFeatured } from "./server-actions";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableViewOptionsColumn,
} from "@/types";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";

export type ProductColumn = {
  id: string;
  name: string;
  image: string;
  priceHT: string;
  categoryId: string;
  categoryLabel: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <NameWithImageCell
        name={row.original.name}
        id={row.original.id}
        imageUrl={row.original.image}
        type="products"
      />
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
    cell: ({ row }) => (
      <CheckboxCell
        isCheckbox={row.original.isArchived}
        onChange={(e: boolean | "indeterminate") =>
          changeArchived({ id: row.original.id, isArchived: e })
        }
      />
    ),
    filterFn: FilterFn,
  },
  {
    accessorKey: "isFeatured",
    header: "Mise en avant",
    cell: ({ row }) => (
      <CheckboxCell
        isCheckbox={row.original.isFeatured}
        onChange={(e: boolean | "indeterminate") =>
          changeFeatured({ id: row.original.id, isFeatured: e })
        }
      />
    ),
    filterFn: FilterFn,
  },
  {
    accessorKey: "priceHT",
    header: "Prix",
  },
  {
    accessorKey: "categoryLabel",
    header: "Categorie",
    cell: ({ row }) => (
      <NameCell
        name={row.original.categoryLabel}
        id={row.original.categoryId}
        type="categories"
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

export const searchableColumns: DataTableSearchableColumn<ProductColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
];

export const filterableColumns: DataTableFilterableColumn<ProductColumn>[] = [
  {
    id: "isArchived",
    title: "Archivé",
    options: [
      { label: "Archivé", value: "true" },
      { label: "Non archivé", value: "false" },
    ],
  },
  {
    id: "isFeatured",
    title: "Mise en avant",
    options: [
      { label: "Mise en avant", value: "true" },
      { label: "Non mise en avant", value: "false" },
    ],
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<ProductColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },

  {
    id: "createdAt",
    title: "Date de création",
  },
  {
    id: "actions" as keyof ProductColumn,
    title: "Actions",
  },
];
