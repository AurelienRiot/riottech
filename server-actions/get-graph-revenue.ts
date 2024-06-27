import prismadb from "@/lib/prismadb";

interface GraphDataProps {
  month: string;
  totalOrder: number;
  totalSubscription: number;
}

export const GetGraphRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },
  });
  const paidSubscriptionOrders = await prismadb.subscriptionOrder.findMany({
    where: {
      isPaid: true,
    },
    include: {
      subscriptionHistory: {
        where: {
          status: "Paid",
        },
      },
    },
  });

  const monthlyRevenue: {
    [key: number]: { totalOrder: number; totalSubscription: number };
  } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    const revenueForOrder = Number(order.totalPrice);
    monthlyRevenue[month] = {
      totalOrder: Number.parseFloat(((monthlyRevenue[month]?.totalOrder || 0) + revenueForOrder).toFixed(2)),
      totalSubscription: monthlyRevenue[month]?.totalSubscription || 0,
    };
  }

  for (const order of paidSubscriptionOrders) {
    for (const history of order.subscriptionHistory) {
      const month = history.createdAt.getMonth();

      const revenueForHistory = Number(history.price);

      monthlyRevenue[month] = {
        totalOrder: monthlyRevenue[month]?.totalOrder || 0,
        totalSubscription: Number.parseFloat(
          ((monthlyRevenue[month]?.totalSubscription || 0) + revenueForHistory).toFixed(2),
        ),
      };
    }
  }

  const graphData: GraphDataProps[] = [
    { month: "Janvier", totalOrder: 0, totalSubscription: 0 },
    { month: "Fevrier", totalOrder: 0, totalSubscription: 0 },
    { month: "Mars", totalOrder: 0, totalSubscription: 0 },
    { month: "Avril", totalOrder: 0, totalSubscription: 0 },
    { month: "Mai", totalOrder: 0, totalSubscription: 0 },
    { month: "Juin", totalOrder: 0, totalSubscription: 0 },
    { month: "Juillet", totalOrder: 0, totalSubscription: 0 },
    { month: "Août", totalOrder: 0, totalSubscription: 0 },
    { month: "Septembre", totalOrder: 0, totalSubscription: 0 },
    { month: "Octobre", totalOrder: 0, totalSubscription: 0 },
    { month: "Novembre", totalOrder: 0, totalSubscription: 0 },
    { month: "Decembre", totalOrder: 0, totalSubscription: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[Number.parseFloat(month)].totalOrder = monthlyRevenue[Number.parseFloat(month)].totalOrder;
    graphData[Number.parseFloat(month)].totalSubscription = monthlyRevenue[Number.parseFloat(month)].totalSubscription;
  }
  return graphData;
};
