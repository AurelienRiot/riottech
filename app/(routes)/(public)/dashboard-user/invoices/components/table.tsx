"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "../../(profile)/components/data-table";
import { InvoicesColumn, columns } from "./column";

interface InvoicesTableProps {
  data: InvoicesColumn[];
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Factures (${data.length})`}
        description="Historique des factures"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} initialData={data} />
    </>
  );
};
