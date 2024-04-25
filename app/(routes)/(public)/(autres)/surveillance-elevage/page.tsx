import { ContactForm } from "@/components/contact-form";
import ButtonSurveillance from "./components/button-surveillance";
import ImageV2 from "./components/image-v2";
import RiotTechFeatures from "./components/riot-tech-features";

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
