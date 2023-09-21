"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { SubscriptionHistoryColumn, columns } from "./histories-column";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import axios from "axios";
import { useState } from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Loading from "../../loading";
import { GetUsersHistories, UserClient } from "../page";
import { addDays } from "date-fns";

type HistoryTableProps = {
  initialDateRange: DateRange;
  initialData: SubscriptionHistoryColumn[] | null;
};

export const HistoryTable = ({
  initialDateRange,
  initialData,
}: HistoryTableProps) => {
  const [data, setData] = useState<SubscriptionHistoryColumn[] | null>(
    initialData
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );

  const handleChangeDate = async () => {
    if (dateRange && dateRange.from && dateRange.to) {
      const url = qs.stringifyUrl({
        url: "/api/users/histories",
        query: {
          gte: dateRange.from.toDateString(),
          lte: addDays(dateRange.to, 1).toDateString(),
        },
      });
      const res = await axios.get(url);
      const users: UserClient[] = res.data;

      const histories = GetUsersHistories(users);
      setData(histories);
    } else {
      toast.error("Veuillez choisir une date");
    }
  };

  return (
    <>
      <div className="m-4">
        <Heading
          title={`Historiques (${data?.length ? data.length : 0})`}
          description="Gérez les historiques"
        />
        <Separator className="mb-4" />
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <Button className="mt-4" onClick={() => handleChangeDate()}>
          Valider
        </Button>
        {data ? (
          <DataTable searchKey="user" columns={columns} initialData={data} />
        ) : (
          <Loading className="h-[580px]" />
        )}
      </div>
    </>
  );
};
