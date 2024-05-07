import CardHover from "./card-hover";
import { Separator } from "@/components/ui/separator";
import LevelsOfConnection from "@/public/levels-of-connection.png";
import SurveillanceCamera from "@/public/surveillance-camera.png";

const ServicePage = () => {
  return (
    <>
      <div className="z-10 flex flex-col items-center pt-10  font-bold text-neutral-50">
        <Separator className="mt-2 w-24 bg-white" />
        <p className="m-4 max-w-xl text-center text-base tracking-wide md:text-lg lg:text-xl">
          RIOT TECH commercialise et installe des solutions de surveillance
          vidéo et de connectivité en milieu rurale et agricole.
        </p>

        <div className="mx-6 my-10 flex w-full flex-wrap  justify-evenly  gap-20 font-bold transition-all duration-500  ease-out min-[880px]:has-[:hover]:mb-[320px]  ">
          <CardHover
            link="/solution-internet"
            image={LevelsOfConnection}
            title="Solutions de connexion à internet"
            text={`Profitez d'une connexion Internet continue, économique et disponible partout avec la connexion internet RIOT TECH. Vous assurant une connexion stable grâce à la couverture multi-opérateurs. Incluent un équipement garanti à vie ainsi qu'un service après-vente prioritaire et compétent en cas de besoin.
          `}
          />
          <CardHover
            link="/surveillance-elevage"
            title="Surveillance vidéo de vos bâtiments"
            image={SurveillanceCamera}
            text={`Surveillance vidéo de vos bâtiments et stabulation tout types de caméras, pour tout types d'usages.
          Surveillance vêlage, troupeau, sécurité, détection de mouvement enregistrement.
          Visionnage par internet sur smartphone, ordinateur, tablette...
          `}
          />
        </div>
      </div>
    </>
  );
};

export default ServicePage;
