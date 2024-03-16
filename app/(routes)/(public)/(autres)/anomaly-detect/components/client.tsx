"use client";
import { VisibleElement } from "@/components/animations/visible-element";
import Container from "@/components/ui/container";
import { FaCheck } from "react-icons/fa";
import PreOrderBox from "./pre-commande";
import { BsDropletHalf, BsMoisture } from "react-icons/bs";
import { BiSolidThermometer, BiTargetLock } from "react-icons/bi";
import { MdCo2 } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import { LucideWrench } from "lucide-react";

const Client = ({ imageUrl }: { imageUrl: string }) => {
  const keyPoints = [
    "Un outil fiable et efficace",
    "Des économies à la clé",
    "Moins de prise de tête sur des indicateurs farfelus",
    "Une conformité avec les exigences réglementaires et environnementales actuelles et à venir",
    "Un SAV à l'écoute et performant",
  ];

  const features = [
    {
      Icon: BsDropletHalf,
      title: "Consommation d'eau",
      features: [
        "Alerte SMS en cas de fuite",
        "Alerte SMS en cas de consommation anormale",
        "Historique de la consommation",
      ],
      description:
        "Surveillance de votre consommation d'eau et soyez alerter en temps réel d'une consommation anormale.",
    },
    {
      Icon: BiSolidThermometer,
      title: "Température",
      features: [
        "Alerte SMS en cas de temperature anormale",
        "Historique des relevés",
      ],
      description:
        "Surveillez la température de vos bâtiments, anticipez le stress thermique et profitez de données concrètes pour agir sur l'ambiance de votre bâtiment.",
    },
    {
      Icon: BsMoisture,
      title: "Humidité",
      features: [
        "Alerte SMS en cas d'humidité annormale",
        "Historique des relevés",
      ],
      description:
        "Soyez alerté d'une humidité trop faible ou trop élevée dans votre bâtiment, l'humidité est une composante très importante et responsable de nombreux problèmes en élevage.",
    },
    {
      Icon: MdCo2,
      title: "Dioxyde de carbone",
      features: [
        "Alerte SMS en cas de niveaux dangereux",
        "Historique des relevés",
      ],
      description:
        "Soyez alerté et agissez avant que les niveaux de dioxyde de carbone (CO₂) atteignent des seuils dangereux ou préjudiciables pour vos animaux.",
    },
    {
      Icon: BiTargetLock,
      title: "Fréquentations",
      features: [
        "Alerte SMS en cas de fréquentations anormales par zones",
        "Alerte SMS en cas de consommation anormale",
        "L'activité de vos animaux est surveillée et analysée afin de déceler un problème de comportement du troupeau.",
      ],
      description:
        "Surveillance de votre consommation d'eau et soyez alerter en temps réel d'une consommation anormale.",
    },
    {
      Icon: AiOutlinePicture,
      title: "Retour visuel",
      features: [
        "Apercu de la stabulation directement sur votre smartphone",
        "Historique des prises de vues jusquà plusieurs mois en arrière",
      ],
      description:
        "Profitez d'un retour visuel grâce à la camera intégrée pour surveiller le niveau de fourrages restant ou encore le comportement de vos animaux.",
    },
    {
      Icon: LucideWrench,
      title: "SAV & suivit",
      features: [
        "Paramétrage facilité et adapté aux exigences et compétences de chaque éleveurs",
        "Un SAV de pointe à l'écoute",
        "Ouvert à toutes demandes spécifiques",
      ],
      description: "",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col overflow-hidden rounded-xl p-4 text-lg sm:p-6 sm:text-xl md:text-2xl lg:p-8 ">
        <div
          className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[3.3/1]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="pb-3 text-center font-bold md:hidden">
          <h1 className="text-4xl sm:text-5xl">
            <span className="text-blue-900">Anomaly</span>
            <span className="text-red-500">Detect</span>
          </h1>
          <p className="text-3xl">
            <span>Par </span>
            <span className="text-red-500">RIOT </span>
            <span className="text-green-500">TECH</span>
          </p>
        </div>
        <div className="mb-8 mt-8 text-center text-3xl">
          <h2>Revolutionnez votre ferme avec AnomalyDetect :</h2>
          <h2 className="font-bold">
            {"La technologie au servide de l'élevage !"}
          </h2>
        </div>
        {keyPoints.map((key) => (
          <div className="flex items-center pb-2" key={key}>
            <FaCheck className="mr-3 h-6 w-6 flex-shrink-0 text-green-500" />
            <p>{key}</p>
          </div>
        ))}

        <h2 className="pb-10 pt-2 text-center text-3xl font-bold text-blue-900">
          {"La technologie au service de l'élevage !"}
        </h2>

        <div className="flex flex-wrap gap-4 pb-10 ">
          {features.map((feature, index) => (
            <div
              className="flex w-80 flex-auto flex-col items-start xl:w-1/5"
              key={index}
            >
              <VisibleElement variant="fade" className="self-center">
                {<feature.Icon className="mb-4 h-28 w-28 pb-2" />}
              </VisibleElement>
              <VisibleElement
                variant="fade"
                as="h3"
                className="w-full pb-2 text-center font-bold"
              >
                {feature.title}
              </VisibleElement>

              <ul className="flex flex-col ">
                {feature.features.map((feature, index) => (
                  <VisibleElement
                    variant="fade"
                    as="li"
                    className="mb-2 flex items-center space-x-2 font-semibold"
                    key={index}
                  >
                    <FaCheck className="mb-2 mr-2 h-6 w-6 flex-shrink-0 text-green-500" />
                    <p>{feature}</p>
                  </VisibleElement>
                ))}
              </ul>
              <VisibleElement
                variant="fade"
                as="p"
                className="w-full text-center"
              >
                {feature.description}
              </VisibleElement>
            </div>
          ))}
        </div>

        <PreOrderBox />
      </div>
    </Container>
  );
};

export default Client;
