import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToastSearchParams } from "@/lib/toast-search-params";
import GetSubscriptions from "@/server-actions/get-subscriptions";
import { Suspense } from "react";
import { FetchSim } from "./components/fetch-sim";
import { SelectSubscription } from "./components/select-subscription";
import { SimForm } from "./components/sim-form";

export const metadata = {
  title: "RIOT TECH - Activation SIM",
  description: "J'Active ma SIM RIOT TECH",
};

const activationSIMPage = async (context: {
  searchParams: { sim: string; callbackUrl: string; subId: string };
}) => {
  return (
    <>
      <ToastSearchParams
        searchParam="canceled"
        message="Erreur de paiement."
        url={`/activation-sim?sim=${encodeURIComponent(
          context.searchParams.sim,
        )}&subId=${encodeURIComponent(context.searchParams.subId)}`}
        toastType="error"
      />
      <Container className="bg-background pt-10">
        <div className="flex flex-col items-center justify-center p-2 text-primary sm:p-10">
          <Suspense fallback={<SuspenceForm sim={context.searchParams.sim} />}>
            <ServerSim
              sim={context.searchParams.sim}
              subId={context.searchParams.subId}
            />
          </Suspense>
        </div>
      </Container>
    </>
  );
};

export default activationSIMPage;

const ServerSim = async ({ sim, subId }: { sim: string; subId: string }) => {
  const res = await FetchSim(sim);
  const subscriptions = await GetSubscriptions();

  const selectedSubscriptions = subscriptions.filter((subscription) =>
    res.RTsubIDs.includes(subscription.id),
  );
  const availableSim = sim ? res.available : true;
  const org = res.is_third
    ? {
        orgImageUrl: res.org_image_url ?? "",
        orgName: res.org_name,
      }
    : null;

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
                className="mx-auto mb-4 max-w-52"
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

      <SimForm sim={sim} availableSim={availableSim} />

      {selectedSubscriptions.length > 0 ? (
        <SelectSubscription
          subscriptions={selectedSubscriptions}
          sim={sim}
          initSubId={subId}
        />
      ) : null}
    </>
  );
};

const SuspenceForm = ({ sim }: { sim: string | undefined }) => {
  return (
    <>
      {" "}
      <h1 className="mb-4 text-center text-3xl font-bold text-secondary-foreground">
        Abonnement Carte SIM RIOT TECH
      </h1>
      <div className="mb-6 text-center text-secondary-foreground/80">
        <p>
          Utilisez cette page pour activer votre abonnement Carte SIM
          multi-opérateurs RIOT TECH, saisissez le code complet de la carte SIM
          et laissez-vous guider !
        </p>
        <p>
          Avec l’abonnement RIOT TECH, profitez d’une connexion internet en
          toutes circonstances !
        </p>
      </div>{" "}
      <Separator />
      <div className="mt-10">
        <div className=" flex flex-col items-center justify-center  ">
          <div className="mr-4">Numéro de SIM</div>
          <div>
            <Input
              type="number"
              placeholder={sim ?? "89882470000XXXXXXXX"}
              disabled={true}
            />
          </div>
        </div>

        <Button type="button" className="mt-4 w-full" disabled={true}>
          <Spinner size={20} />
        </Button>
      </div>
    </>
  );
};
