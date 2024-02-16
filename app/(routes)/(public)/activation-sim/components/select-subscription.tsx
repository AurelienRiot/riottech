"use client";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Subscription } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RegisterForm } from "../../(auth)/register/components/register-form";
import { dateFormatter } from "@/lib/utils";
import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Spinner from "@/components/animations/spinner";

interface SelectSubscriptionProps {
  subscriptions: Subscription[];
  sim: string;
  subId: string;
}
export const SelectSubscription: React.FC<SelectSubscriptionProps> = ({
  subscriptions,
  sim,
  subId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const map = new Map<string, Subscription[]>();
  subscriptions.forEach((subscription) => {
    const groupName = subscription.name;
    if (!map.has(groupName)) {
      map.set(groupName, []);
    }
    map.get(groupName)?.push(subscription);
  });

  const groupedSubscriptions = Array.from(map.values());

  const subscription =
    subscriptions.find((subscription) => subscription.id === subId) ??
    groupedSubscriptions.length === 1
      ? groupedSubscriptions[0][0]
      : null;

  const displayRecurrence =
    subscription?.recurrence === "month"
      ? "mois"
      : subscription?.recurrence === "year"
      ? "an"
      : subscription?.recurrence === "week"
      ? "semaine"
      : "jour";
  const nextRecurrence =
    subscription?.recurrence === "month"
      ? dateFormatter(addMonths(new Date(), 1))
      : subscription?.recurrence === "year"
      ? dateFormatter(addYears(new Date(), 1))
      : subscription?.recurrence === "week"
      ? dateFormatter(addWeeks(new Date(), 1))
      : dateFormatter(addDays(new Date(), 1));

  const onClick = async () => {
    setLoading(true);
    if (sim === "" || !subscription) {
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

  const redirectSub = (subId: string) => {
    router.push(
      `/activation-sim?sim=${encodeURIComponent(
        sim
      )}&subId=${encodeURIComponent(subId)}&callbackUrl=${encodeURIComponent(
        `/activation-sim?sim=${sim}&subId=${subId}
        
      `
      )}`,
      { scroll: false }
    );
  };

  return (
    <>
      <div className="mt-4 flex flex-col justify-center gap-2 text-center">
        <h2 className="text-center text-lg">Choisissez votre abonnement : </h2>
        <Select
          defaultValue={
            subscription
              ? groupedSubscriptions.find((group) =>
                  group.some((sub) => sub.id === subscription.id)
                )?.[0].id
              : undefined
          }
          onValueChange={(value) => {
            redirectSub(value);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Abonnement" />
          </SelectTrigger>
          <SelectContent position="popper">
            {groupedSubscriptions.map((obj) => (
              <SelectItem key={obj[0].id} value={obj[0].id}>
                {obj[0].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {groupedSubscriptions.map((obj, index) =>
          obj.some((sub) => sub.id === subscription?.id) ? (
            <div
              key={index}
              className="flex flex-row justify-center gap-2 text-center"
            >
              <p className="my-auto text-center">Renouvellement: </p>
              {obj.map((sub) => (
                <Button
                  key={sub.id}
                  onClick={() => redirectSub(sub.id)}
                  data-active={sub.id === subscription?.id}
                  className="border-2 border-transparent data-[active=false]:bg-primary-foreground data-[active=false]:text-primary hover:data-[active=false]:border-border"
                >
                  {sub.recurrence === "month"
                    ? "Mensuel"
                    : sub.recurrence === "year"
                    ? "Annuel"
                    : sub.recurrence === "week"
                    ? "Hebdomadaire"
                    : "Journalier"}
                </Button>
              ))}
            </div>
          ) : null
        )}
      </div>
      {subscription ? (
        <>
          <div className="mt-4 flex flex-col rounded-lg bg-gray-200 p-4 dark:bg-gray-900">
            <div className="mb-2  flex w-fit flex-col justify-center self-center rounded-lg bg-gray-100 p-2 text-center dark:bg-gray-800">
              <h2 className="mb-3 text-2xl font-semibold text-secondary-foreground">
                Votre commande
              </h2>
              <p className="mb-2 text-secondary-foreground/80">Sim: {sim}</p>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-medium text-secondary-foreground">
                  Produit
                </h3>
                <Separator className="mb-1 bg-secondary-foreground" />
                <p className="text-secondary-foreground/80">
                  Carte SIM RIOT TECH {subscription?.name} x 1
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-secondary-foreground">
                  Prix
                </h3>
                <Separator className="mb-1 bg-secondary-foreground" />
                <p className="inline gap-1 text-secondary-foreground/80">
                  <Currency value={subscription.priceHT} displayLogo={false} />
                  {" et un coût d'achat de l'équipement de "}{" "}
                  <Currency
                    value={subscription.fraisActivation}
                    displayLogo={false}
                  />{" "}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="font-medium text-secondary-foreground">
                Total:
              </div>
              <div className=" font-medium text-secondary-foreground">
                <Currency
                  value={subscription.priceHT + subscription.fraisActivation}
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="font-bold text-secondary-foreground">
                Total récurrent:
              </div>
              <div className="inline gap-1 font-bold text-secondary-foreground">
                <Currency
                  value={subscription.priceHT}
                  displayLogo={false}
                  className="mr-1"
                />
                {`  /  ${displayRecurrence}`}
              </div>
            </div>
            <p className="mb-4 text-secondary-foreground/80">
              Premier renouvellement : {nextRecurrence}
            </p>
          </div>
          <div className="mb-6 mt-8  ">
            {!session && (
              <div className="flex justify-center ">
                <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
                  <h1 className="text-2xl font-semibold">
                    Créer votre compte <br />
                    <span className="text-xs text-red-500">*Obligatoire</span>
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
                {loading ? <Spinner size={20} /> : "Souscrire"}
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
