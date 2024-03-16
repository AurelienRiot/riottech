"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  SubscriptionOrderColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./subscription-order-column";
import { DataTable } from "@/components/ui/data-table/data-table";

interface SubscriptionOrderTableProps {
  data: SubscriptionOrderColumn[];
}

export const SubscriptionOrderTable: React.FC<SubscriptionOrderTableProps> = ({
  data,
}) => {
  return (
    <>
      <Heading
        title={`Abonnements (${data.length})`}
        description="Gérez les abonnements"
      />
      <Separator className="my-4" />
      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        viewOptionsColumns={viewOptionsColumns}
      />
    </>
  );
};
