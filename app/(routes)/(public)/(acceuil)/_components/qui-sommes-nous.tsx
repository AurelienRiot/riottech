import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuiSommesNous = () => {
  const features = [
    "Réseau multi‑opérateurs (4 opérateurs combinés) pour une disponibilité maximale",
    "Des prix compétitifs, ajustés selon vos volumes",
    "Un SAV direct — pas de plateforme — qui connaît votre contexte",
    "Suivi et diagnostic à distance simplifiés de vos connexions",
    "Moyens de paiement souples et facturation adaptée",
  ];
  return (
    <div id="contact" className="flex flex-col items-center justify-center space-y-6 bg-background p-6 text-foreground">
      <h2 className="text-3xl font-bold">Qui sommes-nous ?</h2>
      <div className="max-w-xl space-y-6 text-left  ">
        <p>
          RIOT TECH accompagne depuis plusieurs années le monde agricole et rural dans l’installation de systèmes de
          vidéosurveillance et de connexion Internet.
        </p>
        <p>Basés en Bretagne, nous intervenons pour l’installation et la maintenance de vos systèmes.</p>
        <p>
          Nous sommes également fournisseur d’accès multi‑opérateurs sur toute la France. En choisissant RIOT TECH pour
          votre connexion Internet (ou pour la revente sous marque blanche), vous optez pour :
        </p>
      </div>

      <ul className="space-y-3 list-image-check-green-500">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start before:self-center">
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          {
            text: "En savoir plus sur la connexion internet RIOT TECH",
            link: "/solution-internet",
          },
          {
            text: "En savoir plus sur la vidéosurveillance RIOT TECH",
            link: "/surveillance-elevage",
          },
        ].map((feature, index) => (
          <Button asChild key={index} className="h-fit text-center text-lg font-semibold">
            <Link href={feature.link}>{feature.text}</Link>
          </Button>
        ))}
      </div>
      <ContactForm title="Formulaire de contact" description="" className="text-left" />
    </div>
  );
};

export default QuiSommesNous;
