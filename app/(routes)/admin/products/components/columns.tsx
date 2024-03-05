"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  image: string;
  priceHT: string;
  category: string;
  isFeatured: string;
  isArchived: string;
  createdAt: Date;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <Button asChild variant={"link"}>
        <Link
          href={`/admin/products/${row.original.id}`}
          className="flex  justify-start items-center gap-2 cursor-pointer"
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
      </Button>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
  },
  {
    accessorKey: "isFeatured",
    header: "Mise en avant",
  },
  {
    accessorKey: "priceHT",
    header: "Prix",
  },
  {
    accessorKey: "category",
    header: "Categorie",
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
