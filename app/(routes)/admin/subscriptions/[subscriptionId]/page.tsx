import prismadb from "@/lib/prismadb";
import { SubscriptionForm } from "./components/product-form";
import type { Subscription } from "@prisma/client";

const SubscriptionPage = async (
  props: {
    params: Promise<{ subscriptionId: string }>;
  }
) => {
  const params = await props.params;
  const subscription = await prismadb.subscription.findUnique({
    where: {
      id: params.subscriptionId,
    },
  });

  const formattedSubscription: Subscription | null = subscription
    ? {
        ...subscription,
        priceHT: Number.parseFloat(String(subscription.priceHT)),
        priceTTC: Number.parseFloat(String(subscription.priceHT)),
        fraisActivation: Number.parseFloat(String(subscription.fraisActivation)),
        dataCap: Number.parseFloat(String(subscription.dataCap)),
      }
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubscriptionForm initialData={formattedSubscription} />
      </div>
    </div>
  );
};

export default SubscriptionPage;
