"use client";

import { VisibleElement } from "@/components/animations/visible-element";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaSignal } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";

const ServicePage = () => {
  return (
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
      <VisibleElement
        as="p"
        variant="bottom"
        className="m-4 mb-10 text-center "
      >
        RIOT TECH commercialise et installe des solutions de surveillance vidéo
        et de connectivité en milieu rurale et agricole
      </VisibleElement>

      <div className="flex flex-wrap w-full gap-4 pb-10 pl-6 pr-6">
        <section className="flex flex-col flex-auto gap-4 w-60">
          <VisibleElement variant="left" className="self-center">
            {" "}
            <GiCctvCamera className="w-10 h-10 pb-2 mb-4 text-primary" />
          </VisibleElement>
          <VisibleElement>
            <h3 className="mb-4 text-2xl font-semibold text-center text-primary">
              Surveillance vidéo de vos bâtiments
            </h3>{" "}
          </VisibleElement>
          <VisibleElement>
            <p>
              {
                "Surveillance vidéo de vos bâtiments et stabulation tout types de caméras, pour tout types d'usages."
              }
            </p>
          </VisibleElement>
          <VisibleElement>
            <p>
              {
                "Surveillance vêlage, troupeau, sécurité, détection de mouvement enregistrement."
              }
            </p>
          </VisibleElement>
          <VisibleElement>
            {" "}
            <p>
              {
                "Visionnage par internet sur smartphone, ordinateur, tablette..."
              }
            </p>
          </VisibleElement>
          <VisibleElement className="pt-4 text-center">
            {" "}
            <Link href="/demo-cam" className="text-blue-500 cursor-pointer ">
              {" "}
              En savoir plus
            </Link>{" "}
          </VisibleElement>
        </section>

        <section className="flex flex-col flex-auto gap-4 w-60">
          <VisibleElement variant="right" className="self-center">
            <FaSignal className="self-center w-10 h-10 pb-2 mb-4 text-primary" />
          </VisibleElement>
          <VisibleElement>
            {" "}
            <h3 className="mb-4 text-2xl font-semibold text-center text-primary">
              Solutions de connexion à internet
            </h3>{" "}
          </VisibleElement>
          <VisibleElement>
            {" "}
            <p>
              {
                "Bénéficiez d'une connexion en toutes circonstances, partout et à moindre coût !"
              }
            </p>{" "}
          </VisibleElement>
          <VisibleElement>
            {" "}
            <p>
              {
                "Grâce aux Box 4G RIOT TECH, vous profitez d'une connexion fiable grâce à l'abonnement multi opérateurs, d'un équipement granit à vie et d'un SAV prioritaire et compétant en cas de problème."
              }
            </p>{" "}
          </VisibleElement>
          <VisibleElement>
            {" "}
            <p>
              {
                "Visionnage par internet sur smartphone, ordinateur, tablette..."
              }
            </p>{" "}
          </VisibleElement>
          <VisibleElement className="pt-4 text-center">
            {" "}
            <Link
              href="/solution-internet"
              className="text-blue-500 cursor-pointer "
            >
              {" "}
              En savoir plus
            </Link>{" "}
          </VisibleElement>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
