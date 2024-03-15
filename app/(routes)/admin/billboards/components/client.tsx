"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  BillboardColumn,
  columns,
  searchableColumns,
  viewOptionsColumns,
} from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table/data-table";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Heading
          title={`Panneaux d'affichage (${data.length})`}
          description="Gérer les panneaux d'affichage"
        />
        <Button
          onClick={() => router.push(`/admin/billboards/new`)}
          className="m-2 pb-6 pt-6 sm:ml-2 sm:pb-0 sm:pt-0"
        >
          <Plus className="mr-2 h-8 w-8 sm:h-4 sm:w-4" />
          Ajouter un nouveau
        </Button>
      </div>
      <Separator />
      <DataTable
        searchableColumns={searchableColumns}
        columns={columns}
        data={data}
        viewOptionsColumns={viewOptionsColumns}
      />
      <Heading
        title="API"
        description="Requete API pour les panneaux d'affichage"
      />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
