import prismadb from "@/lib/prismadb";
import { SubscriptionForm } from "./components/product-form";
import { Subscription } from "@prisma/client";

const SubscriptionPage = async ({
  params,
}: {
  params: { subscriptionId: string };
}) => {
  const subscription = await prismadb.subscription.findUnique({
    where: {
      id: params.subscriptionId,
    },
  });

  const formattedSubscription: Subscription | null = subscription
    ? {
        ...subscription,
        priceHT: parseFloat(String(subscription.priceHT)),
        priceTTC: parseFloat(String(subscription.priceHT)),
        fraisActivation: parseFloat(String(subscription.fraisActivation)),
        dataCap: parseFloat(String(subscription.dataCap)),
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
