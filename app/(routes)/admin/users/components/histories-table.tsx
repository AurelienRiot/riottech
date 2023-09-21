"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { SubscriptionHistoryColumn, columns } from "./histories-column";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import axios from "axios";
import {
  Order,
  SubscriptionHistory,
  SubscriptionItem,
  SubscriptionOrder,
  User,
} from "@prisma/client";
import { useEffect, useState } from "react";
import { formatter } from "@/lib/utils";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Loading from "../../loading";

type SubscriptionOrderClient = {
  subscriptionHistory: SubscriptionHistory[];
  subscriptionItem: SubscriptionItem[];
} & SubscriptionOrder;

type UserCLient = {
  order: Order[];
  subscriptionOrder: SubscriptionOrderClient[];
} & User;

export const HistoryTable = () => {
  const [fetch, setFetch] = useState(true);
  const [data, setData] = useState<SubscriptionHistoryColumn[] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  useEffect(() => {
    const handleChangeDate = async () => {
      const url = qs.stringifyUrl({
        url: "/api/users/histories",
        query: {
          gte: dateRange?.from ? dateRange?.from.toDateString() : "",
          lte: dateRange?.to ? dateRange?.to.toDateString() : "",
        },
      });
      if (dateRange && dateRange.from && dateRange.to) {
        const res = await axios.get(url);
        const users: UserCLient[] = res.data;

        const histories: SubscriptionHistoryColumn[] = users
          .map((user) => {
            return user.subscriptionOrder
              .map((order: any) => {
                return order.subscriptionHistory.map((history: any) => {
                  return {
                    userId: user.id,
                    createdAt: new Date(history.createdAt),
                    price: formatter.format(Number(history.price)),
                    status:
                      history.status === "Paid"
                        ? "payé"
                        : history.status === "Error"
                        ? "erreur"
                        : "en cours",
                    user: `${user.name} ${user.surname}`,
                    name: order.subscriptionItem[0].subscription.name,
                    type: history.idStripe.startsWith("cs")
                      ? "Création"
                      : "Renouvellement",
                  };
                });
              })
              .flat();
          })
          .flat()
          .sort(
            (a: any, b: any) =>
              Date.parse(String(b.createdAt)) - Date.parse(String(a.createdAt))
          )
          .flat();
        setData(histories);
      } else {
        toast.error("Veuillez choisir une date");
      }
    };

    if (fetch) {
      handleChangeDate();
    }
    setFetch(false);
  }, [fetch, dateRange]);

  return (
    <>
      <div className="m-4">
        <Heading
          title={`Historiques (${data?.length ? data.length : 0})`}
          description="Gérez les historiques"
        />
        <Separator className="mb-4" />
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <Button className="mt-4" onClick={() => setFetch(true)}>
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
