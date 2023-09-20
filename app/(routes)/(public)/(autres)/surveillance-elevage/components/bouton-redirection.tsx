"use client";
import { Button } from "@/components/ui/button";
import { SiHappycow } from "react-icons/si";
import { GiChicken, GiPig, GiRobotGrab } from "react-icons/gi";

const boutonFeatures = [
  { text: "Cliquez Pour Découvrir AnomalyDetect Bovin", icon: SiHappycow },
  { text: "Cliquez Pour Découvrir AnomalyDetect Porc", icon: GiPig },
  { text: "Cliquez Pour Découvrir AnomalyDetect Avicole", icon: GiChicken },
  {
    text: "Cliquez Pour Découvrir AnomalyDetect Autres Domaines",
    icon: GiRobotGrab,
  },
];

const BoutonRedirection = () => {
  return (
    <div className="p-6 text-center bg-primary-foreground ">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl text-primary">
        Votre Meilleur Allié Pour Détecter Automatiquement Les Problèmes Dans
        Votre Élevage
      </h1>
      <p className="mb-8 text-xl text-secondary-foreground">
        {
          "Une Fuite D'eau, Un Abreuvoir En Panne, Trop D'humidité, Pas Assez De Luminosité…"
        }
      </p>
      <div className="flex flex-wrap gap-4">
        {boutonFeatures.map((bouton, index) => (
          <div
            className="flex-auto inline-block mb-8 w-96 xl:w-1/4"
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button className="flex flex-col w-full pt-24 pb-24 mb-5 overflow-hidden border-2 shadow-xl text-primary bg-primary-foreground rounded-3xl hover:text-primary-foreground border-border">
              <div className="transition-all hover:scale-105">
                <div className="flex items-center mb-1 text-xl sm:text-2xl md:text-3xl">
                  <p>{bouton.text}</p>
                  {
                    <span className="flex items-center justify-center ml-2 rounded-full bg-primary dark:bg-primary-foreground">
                      <bouton.icon
                        className="flex-shrink-0 m-2 text-white"
                        size={20}
                      />
                    </span>
                  }
                </div>
                <p className="text-lg sm:text-xl md:text-2xl">
                  et accéder à votre ressource gratuite !
                </p>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BoutonRedirection;
