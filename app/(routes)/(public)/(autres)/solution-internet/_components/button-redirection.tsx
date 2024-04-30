"use client";
import { ContactForm } from "@/components/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FcHome } from "react-icons/fc";
import { TbBusinessplan } from "react-icons/tb";
import { ScrollToForm } from "../../surveillance-elevage/_components/scroll-to-target";
import Reseau4GPage from "./reseau-4G";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const ButtonRedirectionV2 = () => {
  const [btn, setBtn] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  useEffect(() => {
    setBtn(searchParams.get("btn") || undefined);
  }, [searchParams]);

  const button = useMemo(
    () => [
      {
        name: (
          <h2>
            Internet pour vos clients afin qu’ils puissent utiliser vos produits
            ?
          </h2>
        ),
        content: (
          <>
            <h3 className="mx-auto max-w-3xl space-y-2 text-center text-2xl font-bold">
              <span>
                Besoin d’une connexion internet fiable pour vos produits ?
              </span>
              <br />
              <span>
                Envie de proposer une solution de connexion à internet simple
                pour vos clients ?
              </span>
            </h3>
            <p>
              {
                "Nous sommes spécialisés dans le raccordement à internet tout terrains depuis plusieurs années, nous mettons en place tout système de connexion à internet pour le compte d'autres entreprises."
              }
            </p>
            <p>
              {" "}
              {
                "Nous fournissons au besoin, l'équipement, le service (Carte SIM + abonnement multi-opérateurs) et la plateforme de suivi et diagnostic à distance de vos connexions."
              }
            </p>
            <p>
              {
                "Nous pouvons également gérer les abonnements de vos clients, facturation mensuelle et SAV.  "
              }
            </p>
            <p>
              {
                "RIOT TECH propose des solutions sur-mesure afin d'intégrer la connexion internet directement dans vos produits. Pour vous débarrasser de la problématique 'Connexion à internet' pour vendre vos produits, RIOT TECH saura vous satisfaire."
              }
            </p>
            <p className=" text-center font-bold">
              Exemple de solutions possibles :
            </p>
            <p className=" mx-auto max-w-3xl text-center font-semibold">
              {" "}
              {
                "Fourniture de l'équipement (au tarif revendeur) et facturation des consommations globales de la flotte utilisée sur le mois :"
              }
            </p>
            <ul className="list-disc space-y-4 py-2 pl-6 text-base">
              <li>
                Vous avez la liberté de refacturer ou non l’abonnement au client
                final.
              </li>
              <li>
                Toute SIM non utilisée dans le mois ne vous est pas facturée.
              </li>
              <li>
                Vous avez la liberté d’utiliser une SIM 1 mois arrêter le mois
                suivant, l’activer à nouveau, etc, sans limite et sans frais.
              </li>
            </ul>
            <p className=" mx-auto max-w-3xl text-center font-semibold">
              {" "}
              {
                "Fourniture de l’équipement (au tarif revendeur) prêt à être activé et fourniture d'instructions pour que le client final active son abonnement en ligne en 5 minutes :"
              }
            </p>
            <ul className="list-disc space-y-4 py-2 pl-6 text-base">
              <li>
                Cette solution inclut également la gestion des abonnements et la
                facturation directe avec le client final par RIOT TECH.
              </li>
              <li>
                Vous n’avez aucune facturation à gérer, tout en gardant le
                suivit et diagnostic à distance des connexions de vos clients.
              </li>
            </ul>
            <p className=" mx-auto max-w-3xl text-center font-semibold">
              {" "}
              {
                "Vous avez aussi la possibilité de solliciter spontanément RIOT TECH pour une solution de connectivité sur le terrain (uniquement en Bretagne) :"
              }
            </p>
            <ul className="list-disc space-y-4 py-2 pl-6 text-base">
              <li>
                {
                  " RIOT TECH se déplace gratuitement pour établir un devis, évaluer la faisabilité ou directement installer l’équipement et souscrire l'abonnement avec le client."
                }
              </li>
            </ul>
            <p className=" text-center font-semibold">Rappel des Avantages :</p>
            <ul className="list-disc space-y-4 py-2 pl-6">
              <li className="text-base">
                Une connexion prête en 5 minutes en toutes les circonstances.
              </li>
              <li className="text-base">
                Une qualité d’accès garanti grâce à la connectivité multi
                opérateurs (5G, 4G, 3G).
              </li>
              <li className="text-base">
                {" Garantie à vie de l'équipement (Si fournit par RIOT TECH)."}
              </li>
              <li className="text-base">
                SAV et diagnostic à distance de toutes vos connexions via notre
                interface en ligne.
              </li>
              <li className="text-base"> Un contact SAV privilégié</li>
            </ul>{" "}
            <ScrollToForm text="Connaitre les prix" className="mx-auto" />
          </>
        ),
        subject: "Revendeur-Intégration",
        Icone: TbBusinessplan,
      },
      {
        name: <h2>Internet pour vous/votre entreprise ?</h2>,
        subject: "Connexion Internet personnel",
        content: (
          <>
            <h3 className="mx-auto max-w-3xl space-y-2 text-center text-2xl font-bold">
              <span>
                Besoin d’une connexion internet fiable et sans coupures ?
              </span>
              <br />
              <span>
                Envie d’un interlocuteur direct avec un vrai SAV en cas de
                problème ou question ?
              </span>
            </h3>
            <p>
              <strong>
                Nous sommes spécialisés dans le raccordement à internet
              </strong>{" "}
              tout terrains depuis plusieurs années, offrant une mise en place
              complète des systèmes de connexion.
            </p>
            <p>
              {" Profitez d'une "}
              <strong>haute éligibilité et qualité de service</strong>, grâce à
              notre forfait multi-opérateurs qui assure une couverture
              supérieure à tout autre opérateur en France.
            </p>
            <p>
              <em>Expliquez-nous vos besoins</em>, nous reviendrons vers vous
              avec une solution adaptée et à un prix abordable.
            </p>
            <ScrollToForm text="Connaitre les prix" className="mx-auto " />
          </>
        ),

        Icone: FcHome,
      },
    ],
    [],
  );
  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">
        Vous avez besoin d’internet pour :
      </h1>
      <Accordion
        type="single"
        className="my-6 w-full space-y-4 px-6"
        collapsible
        value={btn}
        onValueChange={setBtn}
      >
        {button.map(({ name, content, Icone, subject }) => (
          <AccordionItem key={subject} value={subject} className="border-0 ">
            <AccordionTrigger
              className="mx-auto max-w-4xl justify-center  gap-4 rounded-lg bg-primary px-2 text-3xl text-primary-foreground  data-[state=open]:rounded-b-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground"
              classNameIcon=" size-6"
            >
              <Icone className="mr-2  size-6 shrink-0 " />
              {name}
            </AccordionTrigger>
            <AccordionContent className="mx-auto space-y-4  text-left text-base data-[state=closed]:animate-[accordion-up_0.5s_ease] data-[state=open]:animate-[accordion-down_1s_ease]">
              <div className="grid-col-1 mx-auto grid max-w-5xl space-y-6 rounded-lg bg-secondary p-4 text-lg text-secondary-foreground">
                {content}
              </div>
              <Reseau4GPage />
              <ContactForm
                title="Parlez nous de vos besoins :"
                description="Obtenez un devis adapté, aucune obligation ni engagement."
                className="max-w-5xl"
                subject={subject}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default ButtonRedirectionV2;
