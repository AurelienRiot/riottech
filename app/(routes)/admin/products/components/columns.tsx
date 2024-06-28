"use client";

import {
  CheckboxCell,
  CreatedAtCell,
  NameCell,
  NameWithImageCell,
} from "@/components/table-custom-fuction/common-cell";
import { FilterFn } from "@/components/table-custom-fuction/common-filter";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import type { DataTableFilterableColumn, DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { changeArchived, changeFeatured } from "./server-actions";

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
      <NameWithImageCell name={row.original.name} id={row.original.id} imageUrl={row.original.image} type="products" />
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
    cell: ({ row }) => (
      <CheckboxCell
        isCheckbox={row.original.isArchived}
        onChange={(e: boolean | "indeterminate") => changeArchived({ id: row.original.id, isArchived: e })}
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
        onChange={(e: boolean | "indeterminate") => changeFeatured({ id: row.original.id, isFeatured: e })}
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
    cell: ({ row }) => <NameCell name={row.original.categoryLabel} id={row.original.categoryId} type="categories" />,
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

export const searchableColumns: DataTableSearchableColumn<ProductColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
];

export const filterableColumns = (categories: string[]): DataTableFilterableColumn<ProductColumn>[] => {
  const catArray = categories.map((item) => ({
    label: item,
    value: item,
  }));

  return [
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

    {
      id: "categoryLabel",
      title: "Catégorie",
      options: catArray,
    },
  ];
};

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
