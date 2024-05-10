import prismadb from "@/lib/prismadb";
import { unstable_cache } from "next/cache";

export const GetSubscriptions = async () => {
  const subscriptions = await prismadb.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return subscriptions;
};

export const GetSubscriptionsCache = unstable_cache(
  async () => GetSubscriptions(),
  ["subscriptions"],
  {
    revalidate: 60 * 10,
  },
);
