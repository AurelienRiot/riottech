"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <Heading
          title={`Produits (${data.length})`}
          description="Gérez les produits"
        />
        <Button
          onClick={() => router.push(`/admin/products/new`)}
          className="pt-6 pb-6 sm:ml-2 sm:pt-0 sm:pb-0 m-2"
        >
          <Plus className="h-8 w-8 mr-2 sm:h-4 sm:w-4" />
          Ajouter un nouveau
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} initialData={data} />
      <Heading title="API" description="Requete API pour les produits" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
