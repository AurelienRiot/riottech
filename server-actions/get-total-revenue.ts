import prismadb from "@/lib/prismadb";

export const GetTotalRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },
  });

  const paidSubscriptionHistory = await prismadb.subscriptionHistory.findMany({
    where: {
      status: "Paid",
    },
  });

  const totalRevenue =
    paidOrders.reduce((total, order) => {
      return total + Number(order.totalPrice);
    }, 0) +
    paidSubscriptionHistory.reduce((total, order) => {
      return total + Number(order.price);
    }, 0);

  return totalRevenue;
};
