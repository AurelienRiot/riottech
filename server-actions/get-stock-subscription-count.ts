import prismadb from "@/lib/prismadb";

export const GetStockSubscriptionCount = async () => {
  const stockCount = await prismadb.subscription.count({
    where: {
      isArchived: false,
    },
  });

  return stockCount;
};
