"use client";

import {
  CreatedAtCell,
  PhoneCell,
  TextCell,
} from "@/components/table-custom-fuction/common-cell";
import { CreatedAtHeader } from "@/components/table-custom-fuction/common-header";
import { DataTableSearchableColumn, DataTableViewOptionsColumn } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ContactColumn = {
  id: string;
  name: string;
  phone: string;
  mail: string;
  subject: string;
  text: string;
  createdAt: Date;
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: PhoneCell,
  },
  {
    accessorKey: "mail",
    header: "Email",
  },
  {
    accessorKey: "subject",
    header: "Sujet",
  },
  {
    accessorKey: "text",
    header: "Message",
    cell: TextCell,
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

export const searchableColumns: DataTableSearchableColumn<ContactColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
  {
    id: "phone",
    title: "Téléphone",
  },
  {
    id: "mail",
    title: "Email",
  },
  {
    id: "subject",
    title: "Sujet",
  },
  {
    id: "text",
    title: "Message",
  },
];

export const viewOptionsColumns: DataTableViewOptionsColumn<ContactColumn>[] = [
  {
    id: "name",
    title: "Nom",
  },
  {
    id: "phone",
    title: "Téléphone",
  },
  {
    id: "mail",
    title: "Email",
  },
  {
    id: "subject",
    title: "Sujet",
  },
  {
    id: "text",
    title: "Message",
  },
  {
    id: "createdAt",
    title: "Date de création",
  },
];
