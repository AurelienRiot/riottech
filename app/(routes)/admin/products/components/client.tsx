"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ProductColumn, columns, filterableColumns, searchableColumns, viewOptionsColumns } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table/data-table";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();

  const categories = data.map((product) => product.categoryLabel);
  const categoriesWithoutDuplicates = [...new Set(categories.map((category) => category))];

  return (
    <>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Heading title={`Produits (${data.length})`} description="Gérez les produits" />
        <Button onClick={() => router.push(`/admin/products/new`)} className="m-2 pb-6 pt-6 sm:ml-2 sm:pb-0 sm:pt-0">
          <Plus className="mr-2 h-8 w-8 sm:h-4 sm:w-4" />
          Ajouter un nouveau
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        viewOptionsColumns={viewOptionsColumns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns(categoriesWithoutDuplicates)}
      />
      <Heading title="API" description="Requete API pour les produits" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
