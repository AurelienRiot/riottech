"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  SubscriptionOrderColumn,
  SubscriptionOrderColumnType,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./subscription-order-column";
import { DataTable } from "@/components/ui/data-table/data-table";

interface SubscriptionOrderTableProps {
  data: SubscriptionOrderColumnType[];
}

export const SubscriptionOrderTable: React.FC<SubscriptionOrderTableProps> = ({
  data,
}) => {
  return (
    <>
      <Heading
        title={`Abonnements (${data.length})`}
        description="Résumé des abonnements"
      />
      <Separator className="my-4" />
      <DataTable
        columns={SubscriptionOrderColumn}
        data={data}
        searchableColumns={searchableColumns}
        viewOptionsColumns={viewOptionsColumns}
        filterableColumns={filterableColumns}
      />
    </>
  );
};
