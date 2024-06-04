import "@/components/animations/hover-text/style.css";
import HoverWord from "@/components/animations/hover-word";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Reseau4GPage = () => {
  return (
    <div className="relative space-y-10  pb-10 pt-6  ">
      <h2 className="space-y-4  text-center text-3xl font-semibold text-primary">
        Le réseau RIOT TECH
      </h2>
      <section className=" flex flex-wrap  justify-between gap-6 p-6 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex w-96 flex-auto flex-col gap-4  "
            id={feature.title}
          >
            <Image
              width={100}
              height={100}
              src={feature.image}
              alt={feature.altImage}
              className="mx-auto mb-2 h-20 w-20"
            />
            <h2 className="relative   text-center text-xl font-semibold text-primary">
              <HoverWord className="inline-flex items-center p-2">
                {feature.title}
              </HoverWord>
            </h2>
            <div className="mx-auto max-w-96  text-center ">
              {feature.description}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Reseau4GPage;

type Feature = {
  image: string;
  altImage: string;
  title: string;
  description: React.ReactNode;
};

const features: Feature[] = [
  {
    image: "signal2.svg",
    altImage: "signal",
    title: "4 Opérateurs en 1 !",
    description: (
      <p>
        {
          " RIOT TECH s'est allié avec les 4 opérateurs Français (Orange, Bouygues, SFR et Free) pour vous fournir un service inédit !"
        }
        <br />
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
          " Une fois activée dans votre routeur ou autre appareil compatible, la carte SIM RIOT TECH va scanner les réseaux 5G,4G et 3G des 4 opérateurs en France (Orange, Bouygues, SFR et Free) de manière à se connecter sur l’antenne relais la plus proche et avec la meilleure vitesse de connexion possible."
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
        <Button
          className={"inline px-0 hover:text-blue-500"}
          variant={"link"}
          asChild
        >
          <Link href={"#La garantie à vie, ça signifie quoi ?"}>
            Cf. Garantie
          </Link>
        </Button>
        )
      </p>
    ),
  },
  {
    image: "design-thinking.svg",
    altImage: "design thinking",
    title: "Robuste et Polyvalent pour Milieux Exigeants",
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
        TECH, l’envoi d’un équipement de remplacement sera effectué et le client
        sera tenu de renvoyer son équipement défectueux dans le même colis et en
        utilisant le bordereau de
        <HoverWord>retour gratuit.</HoverWord>
        <br />
        La garantie à vie est valable uniquement sur les équipements RIOT TECH
        avec cartes SIM préinstallées vendus par RIOT TECH ou ses partenaires et
        sous condition de maintien de la souscription à un abonnement RIOT TECH.
      </p>
    ),
  },
];
