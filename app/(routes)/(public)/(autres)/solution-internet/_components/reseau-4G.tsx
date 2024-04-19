"use client";

import { VisibleElement } from "@/components/animations/visible-element";
import Image from "next/image";
import "@/components/animations/hover-text/style.css";
import HoverWord from "@/components/animations/hover-word";

type Feature = {
  image: string;
  altImage: string;
  title: string;
  description: React.ReactNode;
};

const Reseau4GPage = () => {
  const features: Feature[] = [
    {
      image: "signal2.svg",
      altImage: "signal",
      title: "4 Opérateurs en 1 !",
      description: (
        <p>
          Grâce à cette collaboration, nous pouvons vous proposer des cartes SIM
          intelligentes, multi opérateurs, qui choisira pour vous le meilleur
          opérateur à capter selon votre emplacement.
        </p>
      ),
    },
    {
      image: "antenna.svg",
      altImage: "antenna",
      title: "Fonctionnement",

      description: (
        <p>
          {
            " Une fois activée dans votre routeur ou autre appareil compatible, la carte SIM RIOT TECH vas scanner les réseaux 5G,4G et 3G des 4 opérateurs en France (Orange, Bouygues, SFR et Free) de manière à se connecter sur l’antenne relais la plus proche et avec la meilleure vitesse de connexion possible."
          }
        </p>
      ),
    },
    {
      image: "internet-connection.svg",
      altImage: "internet connection",
      title: "Les avantages",
      description: (
        <p>
          Une connexion plus fiable et avec une couverture du territoire plus
          importante que les offres des autres opérateurs mobiles.
          <br />
          Un SAV professionnel, sans plateforme téléphonique
          <br />
          Une garantie à vie sur le matériel (
          <a
            className="cursor-pointer text-blue-500"
            onClick={() =>
              scrollToTarget("La garantie à vie, ça signifie quoi ?")
            }
          >
            En savoir plus
          </a>
          )
        </p>
      ),
    },
    {
      image: "design-thinking.svg",
      altImage: "design thinking",
      title: "Robuste et Polyvalente pour Milieux Exigeants",
      description: (
        <p>
          {
            "  Les équipements RIOT TECH sont spécialement conçus pour répondre aux problématiques de milieu auquel peut être confronté une exploitation agricole par exemple, tel que l'humidité ou les températures extrêmes."
          }
          <br />

          {
            "L’équipement est fait pour être placée en extérieur, positionnée de manière à recevoir le meilleur signal possible, sur une charpente ou un mât par exemple, mais peut malgré tout être positionnée en intérieur si le signal y est suffisant."
          }
        </p>
      ),
    },
    {
      image: "guarantee-certificate.svg",
      altImage: "certifica de garantie",
      title: "La garantie à vie, ça signifie quoi ?",
      description: (
        <p className="relative p-4 ">
          Routeur garanti à vie, SAV simplifié
          <br />
          En cas de problème sur routeur et après diagnostique par le SAV RIOT
          TECH, l’envoi d’un équipement de remplacement sera effectué et le
          client sera tenu de renvoyer son équipement défectueux dans le même
          colis et en utilisant le bordereau de
          <HoverWord
            word="retour
          gratuit."
          />{" "}
          <br />
          La garantie à vie est valable uniquement sur les équipements RIOT TECH
          avec cartes SIM préinstallées vendus par RIOT TECH ou ses partenaires
          et sous condition de maintien de la souscription à un abonnement RIOT
          TECH 4G.
        </p>
      ),
    },
  ];

  return (
    <>
      <VisibleElement
        as="h2"
        className="space-y-4  text-center text-3xl font-semibold text-primary"
      >
        Le réseau RIOT TECH
      </VisibleElement>
      <section className=" flex flex-wrap justify-between gap-6 p-6 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex w-80 flex-auto flex-col gap-4  "
            id={String(feature.title)}
          >
            <Image
              width={100}
              height={100}
              src={feature.image}
              alt={feature.altImage}
              className="mx-auto mb-2 w-1/4"
            />
            <VisibleElement
              as="h2"
              className="relative mx-auto  max-w-96 justify-center text-center text-xl font-semibold text-primary"
            >
              <HoverWord word={feature.title} />
            </VisibleElement>
            <VisibleElement className="mx-auto  max-w-96 ">
              {feature.description}
            </VisibleElement>
          </div>
        ))}
      </section>
    </>
  );
};

export default Reseau4GPage;

export function scrollToTarget(id: string) {
  const target = document.getElementById(id);
  const navbarHeight = 74;

  if (target) {
    const offset = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: offset - navbarHeight, behavior: "smooth" });

    setTimeout(() => {
      target.classList.add("ring-2");
      target.classList.add("dark:bg-slate-900");
      target.classList.add("bg-slate-200");

      setTimeout(() => {
        target.classList.remove("ring-2");
        target.classList.remove("dark:bg-slate-900");
        target.classList.remove("bg-slate-200");
      }, 500);
    }, 1000);
  }
}
