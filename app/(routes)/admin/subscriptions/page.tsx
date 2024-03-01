import prismadb from "@/lib/prismadb";
import { SubscriptionClient } from "./components/client";
import { Recurrences, SubscriptionColumn } from "./components/columns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
      priceHT: String(item.priceHT),
      dataCap: String(item.dataCap),
      recurrence: (item.recurrence === "month"
        ? "Mensuel"
        : item.recurrence === "year"
        ? "Annuel"
        : item.recurrence === "week"
        ? "Hebdomadaire"
        : "journaliaire") as keyof typeof Recurrences,
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
