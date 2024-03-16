"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  SubscriptionHistoryColumn,
  columns,
  filterableColumns,
  viewOptionsColumns,
} from "./column";
import { DataTable } from "@/components/ui/data-table/data-table";

interface SubscriptionHistoryTableProps {
  data: SubscriptionHistoryColumn[];
}

export const SubscriptionHistoryTable: React.FC<
  SubscriptionHistoryTableProps
> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Historique (${data.length})`}
        description="Historique des paiements"
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        filterableColumns={filterableColumns}
        viewOptionsColumns={viewOptionsColumns}
      />
    </>
  );
};
