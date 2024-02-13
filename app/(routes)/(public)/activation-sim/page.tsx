import Container from "@/components/ui/container";
import GetSubscriptions from "@/server-actions/get-subscriptions";
import Client from "./components/client";
import { redirect } from "next/navigation";
import { FetchSim } from "./components/fetch-sim";
import { Subscription } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/animations/spinner";
import { Input } from "@/components/ui/input";
import { SimForm } from "./components/sim-form";
import { SelectSubscription } from "./components/select-subscription";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";

export const metadata = {
  title: "Riot Tech - Activation SIM",
  description: "Activation d'une carte SIM RIOT TECH",
};

const activationSIMPage = async (context: {
  searchParams: { sim: string; callbackUrl: string; subId: string };
}) => {
  const subscriptions = await GetSubscriptions();
  const session = await getServerSession(authOptions);

  if (
    !context.searchParams.callbackUrl &&
    context.searchParams.sim &&
    context.searchParams.subId &&
    !session
  ) {
    redirect(
      `/activation-sim?sim=${encodeURIComponent(
        context.searchParams.sim
      )}&subId=${encodeURIComponent(
        context.searchParams.subId
      )}&callbackUrl=${encodeURIComponent(
        `/activation-sim?sim=${context.searchParams.sim}&subId=${context.searchParams.subId}
          
        `
      )}`
    );
  }
  // const groupedSubscriptionsObj = subscriptions.reduce<
  //     Record<string, Subscription[]>
  // >((acc, product) => {
  //     if (!acc[product.name]) {
  //         acc[product.name] = [];
  //     }
  //     acc[product.name].push(product);
  //     return acc;
  // }, {});
  //
  // const groupedSubscriptions = Object.values(groupedSubscriptionsObj);

  return (
    <Container className="bg-background pt-10">
      <div className="flex flex-col items-center justify-center p-2 text-primary sm:p-10">
        <Suspense fallback={SuspenceForm()}>
          <Test
            subscriptions={subscriptions}
            sim={context.searchParams.sim}
            subId={context.searchParams.subId}
          />
        </Suspense>

        {/* <Client subscriptions={subscriptions} sim={context.searchParams.sim} subId={context.searchParams.subId} /> */}
      </div>
    </Container>
  );
};

export default activationSIMPage;

const Test = async ({
  subscriptions,
  sim,
  subId,
}: {
  subscriptions: Subscription[];
  sim: string;
  subId: string;
}) => {
  const res = await FetchSim(sim);
  console.log(subId);
  // if (!res.available) {
  //   toast.error("Numéro de SIM Incorrect");
  //   setSelectedSubscriptions(null);
  //   setLoading(() => false);
  //   setIsSimInvalid(true);

  //   return;
  // }
  // setSelectedSubscriptions(
  //   subscriptions.filter((subscription) =>
  //     res.RTsubIDs.includes(subscription.id)
  //   )
  // );
  // setIsSimInvalid(false);

  const selectedSubscriptions = subscriptions.filter((subscription) =>
    res.RTsubIDs.includes(subscription.id)
  );
  console.log(selectedSubscriptions);
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

      <SimForm sim={sim} availableSim={availableSim} />

      {selectedSubscriptions.length > 0 ? (
        <SelectSubscription
          subscriptions={selectedSubscriptions}
          subId={subId}
          sim={sim}
        />
      ) : null}
    </>
  );
};

const SuspenceForm = () => {
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
              placeholder="89882470000XXXXXXXX"
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
