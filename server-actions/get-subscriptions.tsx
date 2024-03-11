import prismadb from "@/lib/prismadb";

const GetSubscriptions = async () => {
  const subscriptions = await prismadb.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return subscriptions;
};

export default GetSubscriptions;
