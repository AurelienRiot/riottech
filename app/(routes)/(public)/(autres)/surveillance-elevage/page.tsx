import { ContactForm } from "@/components/contact/contact-form";
import ButtonSurveillance from "./_components/button-surveillance";
import ImageV2 from "./_components/image-v2";
import RiotTechFeatures from "./_components/riot-tech-features";
import type { Metadata } from "next";

export const dynamic = "force-static";

const pageTitle = "Surveillance Élevage";
const pageDescription =
  "Vous avez toujours rêvé de pouvoir surveiller vos animaux à tout moment et de n'importe où ? Vous souhaitez détecter rapidement toute activité suspecte autour de votre ferme ?";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
  };
}

const SurveillanceElevage = async () => {
  return (
    <main className="pb-12">
      <ImageV2 />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <ButtonSurveillance />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <RiotTechFeatures />
      </section>

      <section id="contact-form" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <ContactForm
          title="Parlez-nous de votre projet :"
          className="max-w-5xl"
          description=""
          subject={"Surveillance Elevage"}
          confirmPostalCode
        />
      </section>
    </main>
  );
};

export default SurveillanceElevage;
