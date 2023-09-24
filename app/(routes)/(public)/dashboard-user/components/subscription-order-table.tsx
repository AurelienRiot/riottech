"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { SubscriptionOrderColumn, columns } from "./subscription-order-column";

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
        description="Résumé des abonnements"
      />
      <Separator />
      <DataTable
        searchKey="subscription"
        columns={columns}
        initialData={data}
      />
    </>
  );
};
