import prismadb from "@/lib/prismadb";

const GetSubscriptionHistory = async (id: string) => {
  const subscriptionHistory = await prismadb.subscriptionHistory.findMany({
    where: {
      subscriptionOrderId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return subscriptionHistory;
};

export default GetSubscriptionHistory;
