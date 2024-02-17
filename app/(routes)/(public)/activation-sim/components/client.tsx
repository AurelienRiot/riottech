"use client";
import { Separator } from "@/components/ui/separator";
import { Subscription } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FetchSim } from "./fetch-sim";

const Client = ({
  subscriptions,
  sim,
  subId,
}: {
  subscriptions: Subscription[];
  sim: string;
  subId: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSimInvalid, setIsSimInvalid] = useState(false);
  const simParam = sim && /^\d{19}$/.test(sim) ? sim : "";
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
        router.replace(`/activation-sim?sim=${encodeURIComponent(sim)}`);
      }
      // if (!searchParams.get("callbackUrl") && sim) {
      //   router.replace(
      //     `/activation-sim?sim=${encodeURIComponent(
      //       sim
      //     )}&callbackUrl=${encodeURIComponent("/activation-sim?sim=" + sim)}`
      //   );
      // }
      if (sim) {
        const res = await FetchSim(sim);
        console.log(res);
        if (!res.available) {
          toast.error("Numéro de SIM Incorrect");
          setSelectedSubscriptions(null);
          setLoading(() => false);
          setIsSimInvalid(true);

          return;
        }
        setSelectedSubscriptions(
          subscriptions.filter((subscription) =>
            res.RTsubIDs.includes(subscription.id)
          )
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
      {org ? (
        <>
          <h1 className="mb-4 text-center text-3xl font-bold text-secondary-foreground">
            Abonnement Carte SIM {org.orgName}, Via RIOT TECH
          </h1>
          <div className="mb-6 text-center text-secondary-foreground/80">
            {org.orgImageUrl ? (
              //  eslint-disable-next-line @next/next/no-img-element
              <img
                src={org.orgImageUrl}
                alt="Logo"
                className="max-w-52 mx-auto mb-4"
              />
            ) : null}
            <p>
              Utilisez cette page pour activer votre abonnement Carte SIM
              multi-opérateurs {org.orgName}, Via RIOT TECH. Avec l’abonnement
              RIOT TECH, profitez d’une connexion internet en toutes
              circonstances !
            </p>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className="mb-4 text-center text-3xl font-bold text-secondary-foreground">
            Abonnement Carte SIM RIOT TECH
          </h1>
          <div className="mb-6 text-center text-secondary-foreground/80">
            <p>
              Utilisez cette page pour activer votre abonnement Carte SIM
              multi-opérateurs RIOT TECH, saisissez le code complet de la carte
              SIM et laissez-vous guider !
            </p>
            <p>
              Avec l’abonnement RIOT TECH, profitez d’une connexion internet en
              toutes circonstances !
            </p>
          </div>{" "}
        </>
      )}

      <Separator />

      {/* <SimForm
        sim={sim}
        loading={loading}
        isSimInvalid={isSimInvalid}
        setIsSimInvalid={setIsSimInvalid}
      />
      {selectedSubscriptions && (
        <SelectSubscription subscriptions={selectedSubscriptions} sim={sim} />
      )} */}
    </>
  );
};

export default Client;
