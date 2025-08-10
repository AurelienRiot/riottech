import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuiSommesNous = () => {
  const features = [
    "Un service garanti, couvrant le réseau des 4 opérateurs combinés",
    "Des prix compétitifs et négociables selon le volume",
    "Un SAV direct, sans plateforme, qui connaîs vraiment votre situation",
    "Un suivi et diagnostic à distance, direct et simplifié, de vos connexions",
    "Des moyens de paiements et une facturation adaptée",
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-background p-6 text-foreground">
      <h2 className="text-3xl font-bold">Qui sommes-nous ?</h2>
      <div className="max-w-xl space-y-6 ">
        <p className="text-center">
          RIOT TECH opère depuis plusieurs années en milieu agricole et rural dans l’installation de systèmes de
          surveillance vidéo et de connexion internet.
        </p>
        <p className="text-center">
          Basé en Bretagne, nous installons et maintenons tous systèmes de videosurveillance et connexion internet.
        </p>
        <p className="text-center">
          Nous sommes également fournisseur de service internet multi-opérateurs sur toute la France, c’est-à-dire qu’en
          passant par RIOT TECH pour votre connexion internet (ou celle de vos clients dans le cas d’une revente sous
          marque blanche), vous optez pour:
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
            text: "En savoir plus sur la video surveillance RIOT TECH",
            link: "/surveillance-elevage",
          },
        ].map((feature, index) => (
          <Button asChild key={index} className="h-fit text-center text-lg font-semibold">
            <Link href={feature.link}>{feature.text}</Link>
          </Button>
        ))}
      </div>
      <ContactForm title="Formulaire de contact" description="" />
    </div>
  );
};

export default QuiSommesNous;
