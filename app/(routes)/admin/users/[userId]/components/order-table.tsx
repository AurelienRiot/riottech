"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  OrderColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./order-column";
import { DataTable } from "@/components/ui/data-table/data-table";

interface OrderTableProps {
  data: OrderColumn[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Commandes (${data.length})`}
        description="Gérez les commandes"
      />
      <Separator className="my-4" />
      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        viewOptionsColumns={viewOptionsColumns}
        filterableColumns={filterableColumns}
      />
    </>
  );
};
