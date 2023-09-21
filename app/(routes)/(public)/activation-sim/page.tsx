import GetSubscription from "@/server-actions/get-subscriptions";
import { ActivationSimForm } from "./components/activation-sim-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Container from "@/components/ui/container";

export const metadata = {
  title: "Riot Tech - Activation SIM",
  description: "Activation d'une carte SIM RIOT TECH",
};

const ActivationSimPage = async () => {
  const session = await getServerSession(authOptions);

  const subscriptions = await GetSubscription();

  return (
    <Container className="pt-10 bg-background">
      <div className="flex flex-col items-center justify-center p-2 sm:p-10 text-primary">
        <h1 className="mb-4 text-3xl font-bold text-center">
          Abonnement Carte SIM RIOT TECH
        </h1>
        <div className="pt-10 pb-4 text-center">
          <p>
            Utilisez cette page pour activer votre abonnement Carte SIM
            multi-opérateurs RIOT TECH, saisissez le code complet de la carte
            SIM et laissez-vous guider !
          </p>
          <p>
            Avec l’abonnement RIOT TECH, profitez d’une connexion internet en
            toutes circonstances !
          </p>
        </div>
        <Suspense fallback={<Loading />}>
          {" "}
          <ActivationSimForm
            subscriptions={subscriptions}
            isSession={Boolean(session)}
          />
        </Suspense>
      </div>
    </Container>
  );
};

export default ActivationSimPage;
