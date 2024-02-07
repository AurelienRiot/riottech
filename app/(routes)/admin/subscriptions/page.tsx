import prismadb from "@/lib/prismadb";
import { SubscriptionClient } from "./components/client";
import { SubscriptionColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

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
      isFeatured: item.isFeatured ? "oui" : "non",
      isArchived: item.isArchived ? "oui" : "non",
      priceHT: formatter.format(Number(item.priceHT)),
      dataCap: String(item.dataCap),
      recurrence:
        item.recurrence === "month"
          ? "Mois"
          : item.recurrence === "year"
          ? "An"
          : item.recurrence === "week"
          ? "semaine"
          : "jour",
      createdAt: item.createdAt,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SubscriptionClient data={formattedSubscriptions} />
      </div>
    </div>
  );
};

export default SubscriptionPage;
