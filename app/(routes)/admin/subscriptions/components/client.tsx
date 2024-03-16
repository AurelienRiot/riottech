"use client";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubscriptionColumn, columns } from "./columns";

interface SubscriptionClientProps {
  data: SubscriptionColumn[];
}

export const SubscriptionClient: React.FC<SubscriptionClientProps> = ({
  data,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Heading
          title={`Abonnements (${data.length})`}
          description="Gérez les abonnements"
        />
        <Button
          onClick={() => router.push(`/admin/subscriptions/new`)}
          className="m-2 pb-6 pt-6 sm:ml-2 sm:pb-0 sm:pt-0"
        >
          <Plus className="mr-2 h-8 w-8 sm:h-4 sm:w-4" />
          Ajouter un nouveau
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} initialData={data} />
      <Heading title="API" description="Requete API pour les abonnements" />
      <Separator />

      <ApiList entityName="subscriptions" entityIdName="subscriptionId" />
    </>
  );
};
