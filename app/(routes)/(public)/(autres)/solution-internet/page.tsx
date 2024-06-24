import { Metadata } from "next";
import ButtonRedirectionV2 from "./_components/button-redirection";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Connection à internet",
    description:
      "RIOT TECH propose des solutions sur-mesure afin d'intégrer la connexion internet directement dans vos produits. Pour vous débarrasser de la problématique 'Connexion à internet' pour vendre vos produits, RIOT TECH saura vous satisfaire.",
  };
}

const SolutionInternetPage = () => {
  return (
    <div className="my-10 flex flex-col items-center text-center">
      <div className="relative space-y-10 pb-10 pt-6">
        <h2 className="space-y-4 text-center text-3xl font-semibold text-primary">
          Le réseau RIOT TECH
        </h2>
        <ButtonRedirectionV2 />
      </div>
    </div>
  );
};

export default SolutionInternetPage;
