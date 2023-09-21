import prismadb from "@/lib/prismadb";

export const GetSalesCount = async () => {
  const orderCount = await prismadb.order.count({
    where: {
      isPaid: true,
    },
  });

  const SubscriptionOrderCount = await prismadb.subscriptionOrder.count({
    where: {
      isPaid: true,
    },
  });

  const salesCount = orderCount + SubscriptionOrderCount;

  return salesCount;
};
