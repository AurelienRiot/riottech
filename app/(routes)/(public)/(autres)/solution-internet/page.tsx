import { Button } from "@/components/ui/button";
import Image from "next/image";
import Reseau4GPage from "./_components/reseau-4G";
import CombienCoute from "./_components/combien-ca-coute";

const SolutionInternetPage = () => {
  return (
    <section className="mt-10 flex flex-col items-center text-center ">
      <h2 className="mb-8 text-3xl font-bold">
        Votre connexion internet, simplement en 3 étapes
      </h2>
      <div className="flex w-full flex-wrap gap-4 pb-10 pl-6 pr-6 ">
        <div className="flex w-60 flex-auto flex-col gap-4">
          <Image
            width={100}
            height={100}
            src="number-1.svg"
            alt="étape 1"
            className="mx-auto mb-2 "
          />
          <h3 className="mb-4 text-2xl font-semibold">
            Étape 1: Choisissez votre Box 4G et ses options
          </h3>
          <p>
            {
              "Ajoutez La Box 4G robuste à votre panier et sélectionnez les options souhaitées :"
            }
          </p>
          <ul className="list-inside list-disc pl-6 text-left">
            <li>Longueur de câble Ethernet</li>
            <li>Emetteur WIFI additionnel</li>
            <li>Switch Ethernet pour des prises Ethernet supplémentaires</li>
          </ul>
        </div>
        <div className="flex w-60 flex-auto flex-col gap-4">
          <Image
            width={100}
            height={100}
            src="number-2.svg"
            alt="étape 1"
            className="mx-auto mb-2"
          />
          <h3 className="mb-4 text-2xl font-semibold">
            Étape 2: Commandez votre Box 4G
          </h3>
          <p>
            {
              "La Box 4G sera préconfigurée, accompagnée d’un mode d’emploi simple et d’un support par téléphone gratuit."
            }
          </p>
          <Button className="mx-auto mt-4 h-12 w-40 rounded-md bg-blue-500 text-white hover:bg-blue-950 hover:underline">
            Commander
          </Button>
        </div>
        <div className="flex w-60 flex-auto flex-col gap-4">
          <Image
            width={100}
            height={100}
            src="number-3.svg"
            alt="étape 1"
            className="mx-auto mb-2 "
          />
          <h3 className="mb-4 text-2xl font-semibold">
            Étape 3: Branchez et profitez !
          </h3>
          <p>{"Recevez votre Box 4G et branchez-la à une prise de courant."}</p>
          <p>{"C'est tout !"}</p>
        </div>
      </div>
      <CombienCoute />
      <div className="relative space-y-10 bg-primary-foreground/95 pb-10 pt-6  ">
        <Reseau4GPage />
      </div>
    </section>
  );
};

export default SolutionInternetPage;
