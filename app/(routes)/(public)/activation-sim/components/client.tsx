"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SimForm } from "./sim-form";
import { SelectSubscription } from "./select-subscription";
import { FetchSim } from "./fetch-sim";

const Client = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    const searchParams = useSearchParams();
    const simParam = searchParams.get("sim");
    const router = useRouter();
    const sim = simParam && /^\d{19}$/.test(simParam) ? simParam : "";
    const [selectedSubscriptions, setSelectedSubscriptions] = useState<
        Subscription[] | null
    >(null);
    const [loading, setLoading] = useState(true);
    const [org, setOrg] = useState<null | {
        orgImageUrl: string;
        orgName: string;
    }>(null);

    useEffect(() => {
        if (searchParams.get("canceled")) {
            toast.error("Erreur de paiement.");
            router.replace(`/activation-sim?sim=${encodeURIComponent(sim)}`);
        }
        if (!searchParams.get("callbackUrl")) {
            router.replace(
                `/activation-sim?sim=${encodeURIComponent(
                    sim,
                )}&callbackUrl=${encodeURIComponent(
                    "/activation-sim?sim=" + sim,
                )}`,
            );
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (sim) {
                const res = await FetchSim(sim);
                console.log(res);
                if (!res.available) {
                    toast.error("Numéros de sim non disponible.");
                    setSelectedSubscriptions(null);
                    setLoading(() => false);

                    return;
                }
                setSelectedSubscriptions(
                    subscriptions.filter((subscription) =>
                        res.RTsubIDs.includes(subscription.id),
                    ),
                );
                if (res.is_third) {
                    console.log(res.org_image_url);
                    setOrg({
                        orgImageUrl: res.org_image_url ?? "",
                        orgName: res.org_name,
                    });
                } else {
                    setOrg(null);
                }
            }
            setLoading(() => false);
        };

        fetchData();
    }, [subscriptions, sim]);

    return (
        <>
            <SimForm sim={sim} loading={loading} />
            {selectedSubscriptions && (
                <SelectSubscription
                    subscriptions={selectedSubscriptions}
                    sim={sim}
                    org={org}
                />
            )}
        </>
    );
};

export default Client;
