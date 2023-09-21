import prismadb from "@/lib/prismadb";
import UserClient from "./components/client";
import { HistoryTable } from "./components/histories-table";
import { DateRange } from "react-day-picker";
import {
  Order,
  SubscriptionHistory,
  SubscriptionItem,
  SubscriptionOrder,
  User,
} from "@prisma/client";
import { SubscriptionHistoryColumn } from "./components/histories-column";
import { formatter } from "@/lib/utils";

export type SubscriptionOrderClient = {
  subscriptionHistory: SubscriptionHistory[];
  subscriptionItem: SubscriptionItem[];
} & SubscriptionOrder;

export type UserClient = {
  subscriptionOrder: SubscriptionOrderClient[];
  orders: Order[];
} & User;

const UserPage = async () => {
  const from = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const to = new Date();

  const dateRange: DateRange = {
    from: from,
    to: to,
  };
  const allUsers = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionOrder: true,
      orders: true,
    },
  });

  const usersHistories: UserClient[] = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionOrder: {
        include: {
          subscriptionHistory: {
            where: {
              createdAt: {
                gte: dateRange.from,
                lte: dateRange.to,
              },
            },
          },
          subscriptionItem: {
            include: { subscription: true },
          },
        },
      },
      orders: true,
    },
  });

  const histories = GetUsersHistories(usersHistories);

  const subscriptionOrderLengths = allUsers.map((user) => {
    return user.subscriptionOrder.length;
  });

  const orderLengths = allUsers.map((user) => {
    return user.orders.length;
  });

  const formatedUsers = allUsers.map((user) => {
    return {
      ...user,
      subscriptionOrder: [],
      orders: [],
    };
  });

  return (
    <div>
      <HistoryTable initialData={histories} initialDateRange={dateRange} />
      <UserClient
        users={formatedUsers}
        orderLengths={orderLengths}
        subscriptionOrderLengths={subscriptionOrderLengths}
      />
    </div>
  );
};

export default UserPage;

export function GetUsersHistories(usersHistories: UserClient[]) {
  const histories: SubscriptionHistoryColumn[] = usersHistories
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

  return histories;
}
