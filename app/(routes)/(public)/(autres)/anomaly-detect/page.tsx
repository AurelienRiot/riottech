import type { Metadata } from "next";
import Client from "./_components/client";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Anomaly detect",
    description:
      "Surveillance de votre consommation d'eau et soyez alerter en temps réel d'une consommation anormale. Profitez d'un retour visuel grâce à la camera intégrée pour surveiller le niveau de fourrages restant ou encore le comportement de vos animaux.",
  };
}

const AnomalyDetecPage: React.FC = async () => {
  return <Client imageUrl={"https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341216/iacju0kobt6wd2rodnrv.png"} />;
};

export default AnomalyDetecPage;
