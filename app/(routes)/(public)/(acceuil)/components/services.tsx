"use client";

import CardHover from "@/components/animations/card-hover";
import { VisibleElement } from "@/components/animations/visible-element";
import { Separator } from "@/components/ui/separator";
import { scrollToTarget } from "./reseau-4G";
import Currency from "@/components/ui/currency";

const ServicePage = () => {
    return (
        <>
            <div className="z-10 flex flex-col items-center pt-10 text-center">
                <h1 className="text-3xl font-bold ">Nos Services</h1>
                <Separator className="mt-2 w-24 bg-white" />
                <p className="m-4 text-center ">
                    RIOT TECH commercialise et installe des solutions de
                    surveillance vidéo et de connectivité en milieu rurale et
                    agricole
                </p>

                <div className="mx-6 my-10 flex w-full flex-wrap  justify-evenly  gap-20 lg:gap-0">
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
            <VisibleElement className="rounded-t-lg bg-primary-foreground/95 p-4 text-center  text-primary">
                <h2 id="cout 2" className="mb-4 text-2xl text-primary">
                    Combien ça coûte
                </h2>
                <p className="mb-4">
                    Prix de la Box 4G : à partir de
                    <Currency
                        displayLogo={false}
                        value={195}
                        className="inline"
                    />
                    <a
                        className="cursor-pointer text-blue-500"
                        onClick={() =>
                            scrollToTarget(
                                "La garantie à vie, ça signifie quoi ?",
                            )
                        }
                    >
                        - Garantie à vie
                    </a>
                    <br />
                    {"Prix de l'abonnement 4G : à partir de "}
                    <Currency
                        displayLogo={false}
                        value={24.99}
                        className="inline"
                    />
                    {"/mois en usage spécifique et "}
                    <Currency
                        displayLogo={false}
                        value={39.99}
                        className="inline"
                    />
                    {" en usage générale"}
                    <br />
                    Service réservé aux professionnels
                </p>
            </VisibleElement>
        </>
    );
};

export default ServicePage;
