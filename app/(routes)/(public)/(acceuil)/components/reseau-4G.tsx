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
  function scrollToTarget(id: string) {
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

  const features: Feature[] = [
    {
      image: "signal.svg",
      altImage: "signal",
      title: "3 Opérateurs en 1 !",
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
            "Une fois activée dans votre routeur 4G ou autre appareil compatible, la carte SIM RIOT TECH vas scanner les réseaux 4G,3G et 2G de 3 opérateurs en France (Orange, SFR et Free) de manière à se connecter sur l’antenne relais la plus proche et avec la meilleure vitesse de connexion possible. En suivant cet ordre de préférence de connexion 4G>3G>2G."
          }
          <br />
          Ce scan est effectué automatiquement, à intervalle réguliers ou en cas
          de baisse de qualité de la connexion.{" "}
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
            className="text-blue-500 cursor-pointer"
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
            " La Box 4G fournit par RIOT TECH est spécialement conçue pour répondre à des problématiques de milieu auquel peut être confronté une exploitation agricole par exemple, tel que l'humidité ou les températures extrêmes."
          }
          <br />
          La Box 4G est faite pour être placée en extérieur, positionnée de
          manière à recevoir le meilleur signal possible, sur une charpente ou
          un mât par exemple, mais elle peut malgré tout être positionnée en
          intérieur si le signal y est suffisant.
          <br />
          {
            "De par ses particularités robustes et de conception industrielle, cette Box 4G ne possède pas d'émetteur WIFI de ce fait, veillez bien à sélectionner l'option dans votre processus d'achat si vous souhaitez bénéficier d'une connexion WIFI sans fils via cette Box 4G."
          }
          <br />
          {
            "Un Switch 5 ports est également disponible afin d'étendre les capacités de votre Box 4G et de passer d'une seule prise Ethernet à quatre prises Ethernet pour y connecter plus de périphériques."
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
          Box garantie à vie, SAV simplifié
          <br />
          En cas de problème sur une box 4G et après diagnostique par le SAV
          RIOT TECH , si il avéré que le problème vient bien de la box 4G,
          l’envoi d’une nouvelle Box 4G (déjà activée) sera effectué et le
          client sera tenu de renvoyer la Box 4G défectueuse dans le colis qui
          contenait la nouvelle Box et en utilisant le bordereau de{" "}
          <HoverWord
            word="retour
          gratuit."
          />{" "}
          <br />
          La garantie à vie est valable uniquement sur les routeurs avec cartes
          SIM préinstallées vendus par RIOT TECH ou ses partenaires et sous
          condition de maintien de la souscription à un abonnement RIOT TECH 4G.
        </p>
      ),
    },
  ];

  return (
    <>
      <VisibleElement
        as="h2"
        className="mb-4 text-2xl text-center text-primary"
      >
        Le réseau 4G RIOT TECH
      </VisibleElement>
      <section className="flex flex-wrap justify-between gap-4 m-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col flex-auto p-4 group w-80 "
            id={String(feature.title)}
          >
            <VisibleElement>
              {" "}
              <Image
                width={100}
                height={100}
                src={feature.image}
                alt={feature.altImage}
                className="w-1/4 mx-auto mb-2"
              />
            </VisibleElement>
            <VisibleElement
              as="h2"
              className="relative justify-center mb-4 text-xl text-center text-primary"
            >
              <HoverWord word={feature.title} />
            </VisibleElement>
            <VisibleElement>{feature.description}</VisibleElement>
          </div>
        ))}
      </section>

      <VisibleElement className="text-center ">
        <h2 id="cout 2" className="mb-4 text-2xl text-primary">
          Combien ça coûte
        </h2>
        <p className="mb-4">
          Prix de la Box 4G : à partir de 195€ HTC -
          <a
            className="text-blue-500 cursor-pointer"
            onClick={() =>
              scrollToTarget("La garantie à vie, ça signifie quoi ?")
            }
          >
            Garantie à vie
          </a>
          <br />
          {
            "Prix de l'abonnement 4G : à partir de 24,99€HT/mois en usage spécifique et 39,99€HT en usage générale"
          }
          <br />
          Service réservé aux professionnels
        </p>
      </VisibleElement>
    </>
  );
};

export default Reseau4GPage;
