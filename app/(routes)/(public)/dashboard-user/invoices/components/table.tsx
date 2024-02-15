"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "../../components/data-table";
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
      <DataTable searchKey="status" columns={columns} initialData={data} />
    </>
  );
};
