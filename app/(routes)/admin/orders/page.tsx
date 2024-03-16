import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { currencyFormatter } from "@/lib/utils";

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    name: order.name,
    phone: order.phone,
    address: order.address,
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
    isPaid: order.isPaid ? "oui" : "non",
    createdAt: order.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
