import prismadb from "@/lib/prismadb";
import { HistoryTable } from "./components/histories-table";
import { DateRange } from "react-day-picker";
import {
  GetUsersHistories,
  UsersHistories,
} from "@/actions/get-users-histories";
import UserClient from "./components/client";

const UserPage = async () => {
  const from = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const to = new Date();

  const dateRange: DateRange = {
    from: from,
    to: to,
  };
  const allUsers = await prismadb.user.findMany({
    where: {
      role: "user",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionOrder: true,
      orders: true,
    },
  });

  const usersHistories = await prismadb.user.findMany({
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

  // @ts-ignore
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
