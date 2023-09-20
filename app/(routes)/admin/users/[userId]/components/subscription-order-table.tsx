"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
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
        description="Gérez les abonnements"
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
