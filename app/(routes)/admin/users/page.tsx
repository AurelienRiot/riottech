import prismadb from "@/lib/prismadb";
import UserClient from "./components/client";
import { HistoryTable } from "./components/histories-table";

const UserPage = async () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionOrder: true,
      orders: true,
    },
  });

  const subscriptionOrderLengths = users.map((user) => {
    return user.subscriptionOrder.length;
  });

  const orderLengths = users.map((user) => {
    return user.orders.length;
  });

  const formatedUsers = users.map((user) => {
    return {
      ...user,
      subscriptionOrder: [],
      orders: [],
    };
  });

  return (
    <div>
      <HistoryTable />
      <UserClient
        users={formatedUsers}
        orderLengths={orderLengths}
        subscriptionOrderLengths={subscriptionOrderLengths}
      />
    </div>
  );
};

export default UserPage;
