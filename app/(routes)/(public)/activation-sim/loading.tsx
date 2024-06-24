import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const LoadingSim = () => {
  return (
    <Container className="bg-background pt-10">
      <div className="flex flex-col items-center justify-center p-2 text-primary sm:p-10">
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
        <Separator />
        <div className="mt-10">
          <div className="flex flex-col items-center justify-center">
            <div className="mr-4">Numéro de SIM</div>
            <div>
              <Input
                type="number"
                placeholder={"89882470000XXXXXXXX"}
                disabled={true}
              />
            </div>
          </div>

          <Button type="button" className="mt-4 w-full" disabled={true}>
            <Spinner size={20} />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoadingSim;
