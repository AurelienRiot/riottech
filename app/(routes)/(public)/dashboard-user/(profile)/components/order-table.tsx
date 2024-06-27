"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  type OrderColumnType,
  OrdersColumn,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./order-column";
import { useRouter, useSearchParams } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { toast } from "sonner";
import { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";

interface OrderTableProps {
  data: OrderColumnType[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success-order")) {
      toast.success("Paiement réussi.");
      router.replace("/dashboard-user");
      removeAll();
    }
  }, [searchParams, router, removeAll]);

  return (
    <>
      <Heading title={`Commandes (${data.length})`} description="Résumé des commandes" />
      <Separator className="my-4" />
      <DataTable
        columns={OrdersColumn}
        data={data}
        searchableColumns={searchableColumns}
        viewOptionsColumns={viewOptionsColumns}
        filterableColumns={filterableColumns}
      />
    </>
  );
};
