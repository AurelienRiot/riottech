"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns, searchableColumns, type InvoicesColumn } from "./column";

interface OtherInvoicesTableProps {
  data: InvoicesColumn[];
}

export const OtherInvoicesTable: React.FC<OtherInvoicesTableProps> = ({ data }) => {
  return (
    <>
      <Heading title={`Factures (${data.length})`} description="Historique des factures" />
      <Separator />
      <DataTable columns={columns} data={data} searchableColumns={searchableColumns} />
    </>
  );
};
