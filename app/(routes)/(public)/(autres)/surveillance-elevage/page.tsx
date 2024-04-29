import { ContactForm } from "@/components/contact-form";
import ButtonSurveillance from "./_components/button-surveillance";
import ImageV2 from "./_components/image-v2";
import RiotTechFeatures from "./_components/riot-tech-features";

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
