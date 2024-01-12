"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SimForm } from "./sim-form";
import { SelectSubscription } from "./select-subscription";
import { FetchSim } from "./fetch-sim";
import { Separator } from "@/components/ui/separator";

const Client = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    const searchParams = useSearchParams();
    const simParam = searchParams.get("sim");
    const router = useRouter();
    const [isSimInvalid, setIsSimInvalid] = useState(false);
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
        const fetchData = async () => {
            setLoading(() => true);
            if (searchParams.get("canceled")) {
                toast.error("Erreur de paiement.");
                router.replace(
                    `/activation-sim?sim=${encodeURIComponent(sim)}`,
                );
            }
            if (!searchParams.get("callbackUrl") && sim) {
                router.replace(
                    `/activation-sim?sim=${encodeURIComponent(
                        sim,
                    )}&callbackUrl=${encodeURIComponent(
                        "/activation-sim?sim=" + sim,
                    )}`,
                );
            }
            if (sim) {
                const res = await FetchSim(sim);
                if (!res.available) {
                    toast.error("Numéro de SIM Incorrect");
                    setSelectedSubscriptions(null);
                    setLoading(() => false);
                    setIsSimInvalid(true);

                    return;
                }
                setSelectedSubscriptions(
                    subscriptions.filter((subscription) =>
                        res.RTsubIDs.includes(subscription.id),
                    ),
                );
                setIsSimInvalid(false);
                if (res.is_third) {
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
    }, [subscriptions, sim, searchParams, router]);

    return (
        <>
            <Separator />

            <SimForm
                sim={sim}
                loading={loading}
                isSimInvalid={isSimInvalid}
                setIsSimInvalid={setIsSimInvalid}
            />
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
