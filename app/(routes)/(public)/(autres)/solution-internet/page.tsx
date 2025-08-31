import type { Metadata } from "next";
import ButtonRedirectionV2 from "./_components/button-redirection";

export const dynamic = "force-static";

const pageTitle = "Connexion à internet";
const pageDescription =
  "RIOT TECH propose des solutions sur-mesure afin d'intégrer la connexion internet directement dans vos produits. Pour vous débarrasser de la problématique 'Connexion à internet' pour vendre vos produits, RIOT TECH saura vous satisfaire.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageTitle,
    description: pageDescription,
  };
}

const SolutionInternetPage = () => {
  return (
    <main className="py-12">
      <section
        aria-labelledby="solution-internet-heading"
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h1 id="solution-internet-heading" className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Le réseau RIOT TECH
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{pageDescription}</p>

        <div className="mt-10">
          <ButtonRedirectionV2 />
        </div>
      </section>
    </main>
  );
};

export default SolutionInternetPage;
