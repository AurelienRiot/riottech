"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { type InvoicesColumn, columns, viewOptionsColumns, searchableColumns } from "./column";
import { DataTable } from "@/components/ui/data-table/data-table";

interface OtherInvoicesTableProps {
  data: InvoicesColumn[];
}

export const OtherInvoicesTable: React.FC<OtherInvoicesTableProps> = ({ data }) => {
  return (
    <>
      <Heading title={`Factures (${data.length})`} description="Historique des factures" />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        viewOptionsColumns={viewOptionsColumns}
        searchableColumns={searchableColumns}
      />
    </>
  );
};
