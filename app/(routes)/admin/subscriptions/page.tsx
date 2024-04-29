import prismadb from "@/lib/prismadb";
import { SubscriptionClient } from "./components/client";
import { SubscriptionColumn } from "./components/columns";
import { currencyFormatter } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SubscriptionPage = async () => {
  const subscriptions = await prismadb.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSubscriptions: SubscriptionColumn[] = subscriptions.map(
    (item) => ({
      id: item.id,
      name: item.name,
      priceHT: currencyFormatter.format(item.priceHT),
      dataCap: item.dataCap,
      recurrence: item.recurrence,
      createdAt: item.createdAt,
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubscriptionClient data={formattedSubscriptions} />
      </div>
    </div>
  );
};

export default SubscriptionPage;
