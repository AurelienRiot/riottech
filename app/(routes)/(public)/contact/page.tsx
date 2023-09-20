import { ContactForm } from "./components/contact-form";

export const metadata = {
  title: "Riot Tech - Contact",
  description: "Contact RIOT TECH",
};

const ContactPage = () => {
  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col gap-4 mb-6 text-center">
        <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
        <p>
          RIOT TECH est basé dans le Morbihan (56) et intervient pour les
          installations et SAV sur toute la Bretagne.
        </p>
        <p>Et sur toute la France métropolitaine pour les Box 4G.</p>
      </div>
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
