import CardHover from "./card-hover";
import { Separator } from "@/components/ui/separator";
import LevelsOfConnection from "@/public/levels-of-connection.webp";
import SurveillanceCamera from "@/public/surveillance-camera.webp";

const ServicePage = () => {
  return (
    <>
      <div className="z-10 flex flex-col items-center pt-10 font-bold text-neutral-50">
        <Separator className="mt-2 w-24 bg-white" />
        <p className="m-4 max-w-2xl text-center text-base tracking-wide md:text-lg lg:text-xl">
          Solutions clé en main pour la connectivité et la vidéosurveillance en milieu rural et agricole.
        </p>

        <div className="mx-6 my-10 flex w-full flex-wrap  justify-evenly  gap-20 font-bold transition-all duration-500  ease-out min-[880px]:has-[:hover]:mb-[320px]  ">
          <CardHover
            link="/solution-internet"
            image={LevelsOfConnection}
            title="Connexion Internet multi‑opérateurs"
            text={`Connexion 4G/5G fiable et économique, disponible partout grâce à la couverture multi‑opérateurs. Équipement garanti à vie et SAV prioritaire.
          `}
          />
          <CardHover
            link="/surveillance-elevage"
            title="Vidéosurveillance pour vos bâtiments"
            image={SurveillanceCamera}
            text={`Caméras adaptées à vos usages : vêlage, suivi de troupeau, sécurité, détection de mouvement et enregistrement. Accès à distance sur smartphone, ordinateur et tablette.
          `}
          />
        </div>
      </div>
    </>
  );
};

export default ServicePage;
