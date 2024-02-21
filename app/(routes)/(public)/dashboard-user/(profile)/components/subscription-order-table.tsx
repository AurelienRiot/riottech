"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import {
  SubscriptionOrderColumnType,
  SubscriptionOrderColumn,
} from "./subscription-order-column";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface SubscriptionOrderTableProps {
  data: SubscriptionOrderColumnType[];
}

export const SubscriptionOrderTable: React.FC<SubscriptionOrderTableProps> = ({
  data,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (searchParams.get("success-subscription")) {
      toast.success("Paiement réussi.");
      router.replace("/dashboard-user");
    }
  }
  return (
    <>
      <Heading
        title={`Abonnements (${data.length})`}
        description="Résumé des abonnements"
      />
      <Separator />
      <DataTable
        searchKey="subscription"
        columns={SubscriptionOrderColumn}
        initialData={data}
      />
    </>
  );
};
