"use client";

import CardHover from "@/components/animations/card-hover";
import { VisibleElement } from "@/components/animations/visible-element";
import { Separator } from "@/components/ui/separator";
import { useCategories } from "@/hooks/use-categories";

const ServicePage = () => {
  return (
    <>
      <div className="z-10 flex flex-col items-center text-cente">
        <VisibleElement
          variant="bottom"
          as="h1"
          className="text-3xl font-bold text-primary"
        >
          Nos Services
        </VisibleElement>
        <VisibleElement variant="bottom">
          <Separator className="w-24 mt-2" />
        </VisibleElement>
        <VisibleElement as="p" variant="bottom" className="m-4 text-center ">
          RIOT TECH commercialise et installe des solutions de surveillance
          vidéo et de connectivité en milieu rurale et agricole
        </VisibleElement>

        <div className="flex flex-wrap justify-evenly w-full sm:gap-0  gap-20  px-6 py-10">
          <CardHover
            link="/solution-internet"
            image="/levels-of-connection.png"
            title="Solutions de connexion à internet"
            text={`Bénéficiez d'une connexion en toutes circonstances, partout et à moindre coût !
          Grâce aux Box 4G RIOT TECH, vous profitez d'une connexion fiable grâce à l'abonnement multi opérateurs, d'un équipement granit à vie et d'un SAV prioritaire et compétant en cas de problème.
          Visionnage par internet sur smartphone, ordinateur, tablette...
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
