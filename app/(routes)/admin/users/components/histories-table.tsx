"use client";

import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import {
  type SubscriptionHistoryColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./histories-column";

type HistoryTableProps = {
  initialDateRange: DateRange;
  initialData: SubscriptionHistoryColumn[];
};

export const HistoryTable = ({ initialDateRange, initialData }: HistoryTableProps) => {
  const [data, setData] = useState<SubscriptionHistoryColumn[]>(initialData);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleChangeDate = async () => {
    setLoading(true);
    if (!dateRange?.from || !dateRange?.to) {
      setLoading(false);
      toast.error("Veuillez choisir une date");
      return;
    }
    const queryParams = new URLSearchParams({
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    }).toString();
    router.push(`${pathName}?${queryParams}`);

    setLoading(false);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <div className="m-4 flex flex-col gap-4">
        <Heading title={`Historiques (${data?.length ? data.length : 0})`} description="Gérez les historiques" />
        <Separator />
        <div className="flex flex-col gap-4 sm:flex-row">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button className="w-fit" disabled={loading} onClick={() => handleChangeDate()}>
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
