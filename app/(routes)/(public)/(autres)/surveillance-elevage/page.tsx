import { ContactForm } from "@/components/contact/contact-form";
import ButtonSurveillance from "./_components/button-surveillance";
import ImageV2 from "./_components/image-v2";
import RiotTechFeatures from "./_components/riot-tech-features";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Surveillance Elevage",
    description:
      "Vous avez toujours rêvé de pouvoir surveiller vos animaux à tout moment et de n'importe où ? Vous souhaitez détecter rapidement toute activité suspecte autour de votre ferme ?",
  };
}

const SurveillanceElevage = async () => {
  return (
    <>
      <ImageV2 />
      <ButtonSurveillance />
      <RiotTechFeatures />
      <ContactForm
        title="Parlez nous de votre projet :"
        className="max-w-5xl"
        description=""
        subject={"Surveillance Elevage"}
        confirmPostalCode
      />
    </>
  );
};

export default SurveillanceElevage;
