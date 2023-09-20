import prismadb from "@/lib/prismadb";

const GetSubscriptions = async () => {
  const subscriptions = await prismadb.subscription.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return subscriptions;
};

export default GetSubscriptions;
