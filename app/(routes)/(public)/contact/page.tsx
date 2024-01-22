import { ContactForm } from "./components/contact-form";

export const metadata = {
    title: "RIOT TECH - Contact",
    description: "Contact RIOT TECH",
};

const ContactPage = () => {
    return (
        <div className="mt-10 flex-col">
            <div className="mb-6 flex flex-col gap-4 text-center">
                <h1 className="text-3xl font-bold">
                    {"Secteur d'intervention"}
                </h1>
                <p>
                    RIOT TECH est basé dans le Morbihan (56) et intervient pour
                    les installations et SAV sur toute la Bretagne.
                </p>
                <p>Et sur toute la France métropolitaine pour les Box 4G.</p>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactPage;
