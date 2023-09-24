"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { OrderColumn, columns } from "./order-column";
import { useRouter, useSearchParams } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface OrderTableProps {
  data: OrderColumn[];
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
    if (searchParams.get("success-subscription")) {
      toast.success("Paiement réussi.");
      router.replace("/dashboard-user");
      sessionStorage.setItem("activatedSim", "");
    }
  }, [removeAll, searchParams, router]);

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
