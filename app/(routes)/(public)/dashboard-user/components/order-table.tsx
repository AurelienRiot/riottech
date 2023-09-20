"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { OrderColumn, columns } from "./order-column";

interface OrderTableProps {
  data: OrderColumn[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Commandes (${data.length})`}
        description="Résumé des commandes"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} initialData={data} />
    </>
  );
};
