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
    <div className="bg-primary-foreground p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">
        Votre Meilleur Allié Pour Détecter Automatiquement Les Problèmes Dans Votre Élevage
      </h1>
      <p className="mb-8 text-xl text-secondary-foreground">
        {"Une Fuite D'eau, Un Abreuvoir En Panne, Trop D'humidité, Pas Assez De Luminosité…"}
      </p>
      <div className="flex flex-wrap gap-4">
        {boutonFeatures.map((bouton, index) => (
          <div
            className="mb-8 inline-block w-96 flex-auto xl:w-1/4"
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button className="mb-5 flex w-full flex-col overflow-hidden rounded-3xl border-2 border-border bg-primary-foreground pb-24 pt-24 text-primary shadow-xl hover:text-primary-foreground">
              <div className="transition-all hover:scale-105">
                <div className="mb-1 flex items-center text-xl sm:text-2xl md:text-3xl">
                  <p>{bouton.text}</p>
                  {
                    <span className="ml-2 flex items-center justify-center rounded-full bg-primary dark:bg-primary-foreground">
                      <bouton.icon className="m-2 shrink-0 text-white" size={20} />
                    </span>
                  }
                </div>
                <p className="text-lg sm:text-xl md:text-2xl">et accéder à votre ressource gratuite !</p>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BoutonRedirection;
