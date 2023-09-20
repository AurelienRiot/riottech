import prismadb from "@/lib/prismadb";


export const getStockSubscriptionCount = async () => {
  const stockCount = await prismadb.subscription.count({
    where: {
      isArchived: false,
    }
  });


  return stockCount;
};