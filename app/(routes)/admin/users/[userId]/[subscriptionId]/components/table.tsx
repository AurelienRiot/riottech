"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { SubscriptionHistoryColumn, columns } from "./column";

interface SubscriptionHistoryTableProps {
    data: SubscriptionHistoryColumn[]
}

export const SubscriptionHistoryTable: React.FC<SubscriptionHistoryTableProps> = ({
    data
}) => {

    return ( 
        <>
        <Heading 
            title={`Historique (${data.length})`}
            description="Historique des paiements" />
        <Separator />
        <DataTable searchKey="status" columns={columns} initialData={data} />
      </>
     );
};
 