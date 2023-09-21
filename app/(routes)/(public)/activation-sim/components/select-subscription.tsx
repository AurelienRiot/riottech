"use client";

import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RegisterForm } from "../../(auth)/register/components/register-form";
import { Button } from "@/components/ui/button";
import { Subscription } from "@prisma/client";
import Currency from "@/components/ui/currency";

interface SelectSubscriptionProps {
  subscription: Subscription | null;
  isSession: boolean;
  sim: string;
}
export const SelectSubscription: React.FC<SelectSubscriptionProps> = ({
  subscription,
  isSession,
  sim,
}) => {
  const [loading, setLoading] = useState(false);

  if (!subscription) {
    return <div>Subscription not found.</div>;
  }

  const subscriptionPrice = Number(subscription.priceHT);
  const fraisActivation = Number(subscription.fraisActivation);
  const totalPrice = subscriptionPrice + fraisActivation;
  const recurrence = subscription.recurrence;
  const taxText = "HT";

  const nextRecurrence =
    subscription.recurrence === "mois"
      ? moment().add(1, "month").locale("fr").format("D MMMM YYYY")
      : moment().add(1, "year").locale("fr").format("D MMMM YYYY");

  const onClick = async () => {
    setLoading(true);
    if (sim === "") {
      toast.error("Veuillez renseigner le numéro de la SIM.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`/api/checkout-subscription`, {
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

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Votre commande
      </h1>
      <p className="text-center">Sim: {sim}</p>
      <div className="flex items-center justify-center text-left">
        <table className="w-full text-center border-2 sm:w-full">
          <thead className="text-white border-b-2 bg-primary ">
            <tr>
              <th className="pr-5 mr-10 text-primary-foreground">
                <h2 className="mt-4 mb-4 text-2xl font-semibold">Produits</h2>
              </th>
              <th className="pl-5 ml-4 text-primary-foreground">
                <h2 className="mt-4 mb-4 text-2xl font-semibold">Prix</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 odd:bg-secondary even:bg-primary/50 ">
              <td className="py-2 pr-5 mr-10">
                {" "}
                Carte SIM RIOT TECH {subscription.name} × 1
              </td>
              <td className="py-2 ml-4 flex gap-1">
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
              <td className="py-2 mr-10">Total:</td>
              <td className="py-2 ml-4 flex">
                <Currency
                  value={subscription.priceHT + subscription.fraisActivation}
                />
              </td>
            </tr>
            <tr className="odd:bg-secondary even:bg-primary/50">
              <td className="py-2 mr-10">Total récurrent:</td>
              <td className="py-2 ml-4 flex">
                {" "}
                <Currency
                  value={subscription.priceHT}
                  displayLogo={false}
                  displayText={false}
                  className="mr-1"
                />
                {`  /  ${recurrence}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="pt-4 text-center">
        Premier renouvellement : {nextRecurrence}
      </p>
      <div className="mt-8 mb-6 -center ">
        {!isSession && (
          <div className="flex justify-center ">
            <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white sm:dark:bg-black rounded-xl">
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
            disabled={loading || !isSession}
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
