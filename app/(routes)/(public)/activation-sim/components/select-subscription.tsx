import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Subscription } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RegisterForm } from "../../(auth)/register/components/register-form";
import { dateFormatter, formatter } from "@/lib/utils";
import { addMonths, addYears } from "date-fns";

interface SelectSubscriptionProps {
    subscriptions: Subscription[];
    sim: string;
    org: null | { orgImageUrl: string; orgName: string };
}
export const SelectSubscription: React.FC<SelectSubscriptionProps> = ({
    subscriptions,
    sim,
    org,
}) => {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [subscription, setSubscription] = useState(subscriptions[0]);

    const displayRecurrence =
        subscription.recurrence === "month" ? "mois" : "année";
    const nextRecurrence =
        subscription.recurrence === "month"
            ? dateFormatter(addMonths(new Date(), 1))
            : dateFormatter(addYears(new Date(), 1));

    console.log(nextRecurrence);
    const onClick = async () => {
        setLoading(true);
        if (sim === "") {
            toast.error("Veuillez renseigner le numéro de la SIM.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("/api/checkout-subscription", {
                subscriptionId: subscription.id,
                sim,
            });
            window.location = response.data.url;
        } catch (error) {
            toast.error("Erreur.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setSubscription(subscriptions[0]);
    }, [subscriptions]);
    const map = new Map<string, Subscription[]>();
    subscriptions.forEach((subscription) => {
        const groupName = subscription.name;
        if (!map.has(groupName)) {
            map.set(groupName, []);
        }
        map.get(groupName)?.push(subscription);
    });

    // Step 2: Convert the map to a list of lists
    const groupedSubscriptions = Array.from(map.values());

    return (
        <>
            {org ? (
                <div>
                    <h1 className="p-4 text-center text-2xl font-semibold">
                        Abonnement Carte SIM {org.orgName}, Via RIOT TECH
                    </h1>
                    <p className="p-2 text-center">
                        Utilisez cette page pour activer votre abonnement Carte
                        SIM multi-opérateurs {org.orgName}, Via RIOT TECH. Avec
                        l’abonnement RIOT TECH, profitez d’une connexion
                        internet en toutes circonstances !
                    </p>
                    {org.orgImageUrl ? (
                        <img
                            src={org.orgImageUrl}
                            alt="Logo"
                            className="max-w-52 mx-auto mb-4"
                        />
                    ) : null}
                </div>
            ) : null}
            <div className="mt-4 flex flex-col justify-center gap-2">
                {groupedSubscriptions.map((obj, index) => (
                    <>
                        <Button
                            key={index}
                            onClick={() => setSubscription(obj[0])}
                            data-active={obj.some(
                                (sub) => sub.id === subscription.id,
                            )}
                            className="border-2 border-transparent data-[active=false]:bg-primary-foreground data-[active=false]:text-primary hover:data-[active=false]:border-border"
                        >
                            {obj[0].name}
                        </Button>
                        {obj.some((sub) => sub.id === subscription.id) ? (
                            <div className="flex flex-row justify-center gap-2 text-center">
                                <p className="my-auto text-center">
                                    Renouvellement:{" "}
                                </p>
                                {obj.map((sub) => (
                                    <Button
                                        key={sub.id}
                                        onClick={() => setSubscription(sub)}
                                        data-active={sub.id === subscription.id}
                                        className="border-2 border-transparent data-[active=false]:bg-primary-foreground data-[active=false]:text-primary hover:data-[active=false]:border-border"
                                    >
                                        {sub.recurrence === "month"
                                            ? "Mensuel"
                                            : "Annuel"}
                                    </Button>
                                ))}
                            </div>
                        ) : null}
                    </>
                ))}
            </div>
            <h1 className="mb-4 text-center text-2xl font-semibold">
                Votre commande
            </h1>
            <p className="text-center">Sim: {sim}</p>
            <div className="flex items-center justify-center text-left">
                <table className="w-full border-2 text-center sm:w-full">
                    <thead className="border-b-2 bg-primary text-white ">
                        <tr>
                            <th className="mr-10 pr-5 text-primary-foreground">
                                <h2 className="mb-4 mt-4 text-2xl font-semibold">
                                    Produits
                                </h2>
                            </th>
                            <th className="ml-4 pl-5 text-primary-foreground">
                                <h2 className="mb-4 mt-4 text-2xl font-semibold">
                                    Prix
                                </h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b-2 odd:bg-secondary even:bg-primary/50 ">
                            <td className="mr-10 py-2 pr-5">
                                {" "}
                                Carte SIM RIOT TECH {subscription.name} × 1
                            </td>
                            <td className="ml-4 flex gap-1 py-2">
                                {" "}
                                <Currency
                                    value={subscription.priceHT}
                                    displayLogo={false}
                                    displayText={false}
                                />
                                {" et un coût d'achat de l'équipement de "}{" "}
                                <Currency
                                    value={subscription.fraisActivation}
                                    displayLogo={false}
                                />{" "}
                            </td>
                        </tr>
                        <tr className="border-b-2 odd:bg-secondary even:bg-primary/50">
                            <td className="mr-10 py-2">Total:</td>
                            <td className="ml-4 flex py-2">
                                <Currency
                                    value={
                                        subscription.priceHT +
                                        subscription.fraisActivation
                                    }
                                />
                            </td>
                        </tr>
                        <tr className="odd:bg-secondary even:bg-primary/50">
                            <td className="mr-10 py-2">Total récurrent:</td>
                            <td className="ml-4 flex py-2">
                                {" "}
                                <Currency
                                    value={subscription.priceHT}
                                    displayLogo={false}
                                    displayText={false}
                                    className="mr-1"
                                />
                                {`  /  ${displayRecurrence}`}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="pt-4 text-center">
                Premier renouvellement : {nextRecurrence}
            </p>
            <div className="-center mb-6 mt-8 ">
                {!session && (
                    <div className="flex justify-center ">
                        <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
                            <h1 className="text-2xl font-semibold">
                                Créer votre compte <br />
                                <span className="text-xs text-red-500">
                                    *Obligatoire
                                </span>
                            </h1>

                            <RegisterForm />
                        </div>
                    </div>
                )}
                <div className="flex justify-center">
                    <Button
                        disabled={loading || !session}
                        onClick={onClick}
                        className="mt-4"
                    >
                        Souscrire
                    </Button>
                </div>
            </div>
        </>
    );
};
