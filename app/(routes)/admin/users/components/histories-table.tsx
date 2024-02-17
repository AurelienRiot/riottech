"use client";

import {
  FetchUsersHistories,
  GetUsersHistories,
} from "@/actions/get-users-histories";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import Loading from "../../loading";
import { DataTable } from "./data-table";
import { SubscriptionHistoryColumn, columns } from "./histories-column";
import Spinner from "@/components/animations/spinner";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";

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
    initialDateRange
  );
  const [loading, setLoading] = useState(false);

  const handleChangeDate = async () => {
    setLoading(true);
    const users = await FetchUsersHistories(dateRange);
    if (!users) {
      toast.error("Veuillez choisir une date");
      return;
    }
    const histories = GetUsersHistories(users);
    setData(histories);
    setLoading(false);
  };

  return (
    <>
      <div className="m-4">
        <Heading
          title={`Historiques (${data?.length ? data.length : 0})`}
          description="Gérez les historiques"
        />
        <Separator className="mb-4" />
        <div className="flex flex-col sm:flex-row gap-4">
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
          <DataTable searchKey="user" columns={columns} initialData={data} />
        ) : (
          <DataTableSkeleton columns={columns} />
        )}
      </div>
    </>
  );
};
