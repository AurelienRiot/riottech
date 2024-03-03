"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  image: string;
  name: string;
  createdAt: Date;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom du panneau d'affichage",
    cell: ({ row }) => (
      <Link
        href={`/admin/billboards/${row.original.id}`}
        className="flex hover:underline justify-start items-center gap-2"
      >
        {row.original.image ? (
          <span className=" rounded-sm relative aspect-square h-[30px] bg-transparent">
            <Image
              src={row.original.image}
              alt=""
              fill
              sizes="(max-width: 768px) 30px, (max-width: 1200px) 30px, 30px"
              className="object-cover rounded-sm"
            />
          </span>
        ) : null}
        <span>{row.getValue("name")}</span>
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        {format(row.getValue("createdAt"), "d MMMM yyyy", { locale: fr })}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
