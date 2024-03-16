"use client";

import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import {
  SubscriptionHistoryColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./histories-column";
import { fetchUsersHistories } from "./server-action";
import { DataTable } from "@/components/ui/data-table/data-table";

type HistoryTableProps = {
  initialDateRange: DateRange;
  initialData: SubscriptionHistoryColumn[];
};

export const HistoryTable = ({
  initialDateRange,
  initialData,
}: HistoryTableProps) => {
  const [data, setData] = useState<SubscriptionHistoryColumn[]>(initialData);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange,
  );
  const [loading, setLoading] = useState(false);

  const handleChangeDate = async () => {
    setLoading(true);
    const histories = await fetchUsersHistories(dateRange);
    if (!histories.success) {
      toast.error(histories.message);
      return;
    }

    setData(histories.data);
    setLoading(false);
  };

  return (
    <>
      <div className="m-4 flex flex-col gap-4">
        <Heading
          title={`Historiques (${data?.length ? data.length : 0})`}
          description="Gérez les historiques"
        />
        <Separator />
        <div className="flex flex-col gap-4 sm:flex-row">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button
            className="w-fit"
            disabled={loading}
            onClick={() => handleChangeDate()}
          >
            {loading ? <Spinner size={20} /> : "Valider"}
          </Button>
        </div>
        {!loading ? (
          <DataTable
            columns={columns}
            data={data}
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            viewOptionsColumns={viewOptionsColumns}
          />
        ) : (
          <DataTableSkeleton columns={columns} />
        )}
      </div>
    </>
  );
};
