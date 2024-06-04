import { Metadata } from "next";
import ButtonRedirectionV2 from "./_components/button-redirection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Connection à internet",
    description:
      "RIOT TECH propose des solutions sur-mesure afin d'intégrer la connexion internet directement dans vos produits. Pour vous débarrasser de la problématique 'Connexion à internet' pour vendre vos produits, RIOT TECH saura vous satisfaire.",
  };
}

const SolutionInternetPage = () => {
  return (
    <section className="my-10 flex flex-col items-center text-center ">
      <ButtonRedirectionV2 />
    </section>
  );
};

export default SolutionInternetPage;
