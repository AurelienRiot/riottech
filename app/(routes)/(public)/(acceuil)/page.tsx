import Container from "@/components/ui/container";
import ImageAccueil from "./_components/image-accueil";
import QuiSommesNous from "./_components/qui-sommes-nous";
import ServicePage from "./_components/services";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  return (
    <>
      <ImageAccueil />
      <Container>
        <div className="mt-16 flex h-full w-full flex-col items-center gap-6 rounded-t-xl bg-transparent pt-6 text-center">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-black/30 px-6 py-6 backdrop-blur-sm ring-1 ring-white/10">
            <h1 className="text-pretty text-3xl font-extrabold tracking-tight text-neutral-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl lg:text-6xl">
              Internet multi‑opérateurs et vidéosurveillance pour le monde agricole
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-balance text-lg font-medium text-neutral-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl">
              Connexion stable partout en Bretagne. Matériel garanti à vie. Support direct et réactif.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/solution-internet">Découvrir la connexion Internet</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="font-semibold">
                <Link href="/surveillance-elevage">Découvrir la vidéosurveillance</Link>
              </Button>
              <Button asChild variant="link" size="lg" className="font-semibold text-neutral-50 underline-offset-4">
                <Link href="#contact-form">Nous contacter</Link>
              </Button>
            </div>
          </div>

          <ServicePage />
          <QuiSommesNous />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
