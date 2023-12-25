import { Button } from "@/components/ui/button";
import Image from "next/image";

const SolutionInternetPage = () => {
  return ( 
    <section className="flex flex-col items-center mt-10 text-center ">
      <h2 className="mb-8 text-3xl font-bold">Votre connexion internet, simplement en 3 étapes</h2>
      <div className="flex flex-wrap w-full gap-4 pb-10 pl-6 pr-6 ">
          <div className="flex flex-col flex-auto gap-4 w-60">
          <Image width={100} height={100} src="number-1.svg" alt="étape 1" className="mx-auto mb-2 "/> 
            <h3 className="mb-4 text-2xl font-semibold">Étape 1: Choisissez votre Box 4G et ses options</h3>
            <p>{"Ajoutez La Box 4G robuste à votre panier et sélectionnez les options souhaitées :"}</p>
              <ul className="pl-6 text-left list-disc list-inside">
                <li >Longueur de câble Ethernet</li>
                <li>Emetteur WIFI additionnel</li>
                <li>Switch Ethernet pour des prises Ethernet supplémentaires</li>
              </ul>
          </div>
          <div className="flex flex-col flex-auto gap-4 w-60">
          <Image width={100} height={100} src="number-2.svg" alt="étape 1" className="mx-auto mb-2"/> 
            <h3 className="mb-4 text-2xl font-semibold">Étape 2: Commandez votre Box 4G</h3>
            <p>{"La Box 4G sera préconfigurée, accompagnée d’un mode d’emploi simple et d’un support par téléphone gratuit."}</p>
            <Button className="w-40 h-12 mx-auto mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-950 hover:underline">
              Commander
            </Button>
          </div>
          <div className="flex flex-col flex-auto gap-4 w-60">
          <Image width={100} height={100} src="number-3.svg" alt="étape 1" className="mx-auto mb-2 "/> 
            <h3 className="mb-4 text-2xl font-semibold">Étape 3: Branchez et profitez !</h3>
            <p>{"Recevez votre Box 4G et branchez-la à une prise de courant."}</p>
            <p>{"C'est tout !"}</p>
          </div>
      </div>
    </section>
   );
}
 
export default SolutionInternetPage;
