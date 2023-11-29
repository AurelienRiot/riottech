"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SimForm } from "./sim-form";
import { SelectSubscription } from "./select-subscription";
import { addDelay } from "@/lib/utils";

const Client = ({
  groupedSubscriptions,
}: {
  groupedSubscriptions: Subscription[][];
}) => {
  const searchParams = useSearchParams();
  const simParam = searchParams.get("sim");
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const sim = simParam && /^\d{19}$/.test(simParam) ? simParam : "";
  const [selectedGroupedSubscription, setSelectedGroupedSubscription] =
    useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Erreur de paiement.");
      router.replace(`/activation-sim?sim=${encodeURIComponent(sim)}`);
    }
    if (!searchParams.get("callbackUrl")) {
      router.replace(
        `/activation-sim?sim=${encodeURIComponent(
          sim
        )}&callbackUrl=${encodeURIComponent("/activation-sim?sim=" + sim)}`
      );
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (sim) {
        setLoading(() => true);
        setSelectedGroupedSubscription(() => null);
        await addDelay(2000);
        const index = parseInt(sim[0]);
        setSelectedGroupedSubscription(
          () => groupedSubscriptions[index % groupedSubscriptions.length]
        );
      }
      setLoading(() => false);
    };

    fetchData();
  }, [groupedSubscriptions, sim]);

  return (
    <>
      <SimForm sim={sim} loading={loading} />
      {selectedGroupedSubscription && (
        <SelectSubscription
          subscriptions={selectedGroupedSubscription}
          sim={sim}
        />
      )}
    </>
  );
};

export default Client;
