"use client";

import CardHover from "@/components/animations/card-hover";
import { Separator } from "@/components/ui/separator";

const ServicePage = () => {
  return (
    <>
      <div className="z-10 flex flex-col items-center pt-10 text-center">
        <h1 className="text-3xl font-bold ">Nos Services</h1>
        <Separator className="mt-2 w-24 bg-white" />
        <p className="m-4 text-center ">
          RIOT TECH commercialise et installe des solutions de surveillance
          vidéo et de connectivité en milieu rurale et agricole
        </p>

        <div className="mx-6 my-10 flex w-full flex-wrap  justify-evenly  gap-20 lg:gap-0">
          <CardHover
            link="/solution-internet"
            image="/levels-of-connection.png"
            title="Solutions de connexion à internet"
            text={`Profitez d'une connexion Internet continue, économique et disponible partout avec la connexion internet RIOT TECH. Vous assurant une connexion stable grâce à la couverture multi-opérateurs. Incluent un équipement garanti à vie ainsi qu'un service après-vente prioritaire et compétent en cas de besoin.
          `}
          />
          <CardHover
            link="/demo-cam"
            title="Surveillance vidéo de vos bâtiments"
            image="/surveillance-camera.png"
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
