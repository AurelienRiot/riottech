import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import type { OrderColumn } from "./components/columns";
import { currencyFormatter } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const OrdersPage = async (context: { searchParams: { from: string | undefined; to: string | undefined } }) => {
  let from: Date;
  let to: Date;
  if (context.searchParams.from && context.searchParams.to) {
    from = new Date(context.searchParams.from);
    to = new Date(context.searchParams.to);
  } else {
    from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    to = new Date();
  }

  const dateRange: DateRange = {
    from: from,
    to: to,
  };

  const orders = await prismadb.order.findMany({
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      createdAt: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    name: order.name,
    productsList: order.orderItems.map((item) => {
      const name = item.name;
      if (Number(item.quantity) > 1) {
        const quantity = ` x${item.quantity}`;
        return { name, quantity: quantity };
      }
      return { name, quantity: "" };
    }),
    products: order.orderItems
      .map((item) => {
        let name = item.name;
        if (Number(item.quantity) > 1) {
          name += ` x${item.quantity}`;
        }
        return name;
      })
      .join(", "),
    totalPrice: currencyFormatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid,
    createdAt: order.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient initialData={formattedOrders} initialDateRange={dateRange} />
      </div>
    </div>
  );
};

export default OrdersPage;
