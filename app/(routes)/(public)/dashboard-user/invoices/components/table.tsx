"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  InvoicesColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./column";
import { DataTable } from "@/components/ui/data-table/data-table";

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
      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        viewOptionsColumns={viewOptionsColumns}
        filterableColumns={filterableColumns}
      />
    </>
  );
};
