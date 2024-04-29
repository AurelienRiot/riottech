import Container from "@/components/ui/container";
import ImageAccueil from "./_components/image-accueil";
import ServicePage from "./_components/services";
import QuiSommesNous from "./_components/qui-sommes-nous";

const HomePage = async () => {
  return (
    <>
      <ImageAccueil />
      <Container>
        <div className=" mt-12 flex h-full w-full flex-col items-center rounded-t-xl bg-transparent  pt-6  ">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-50 md:text-7xl">
            Bienvenue{" "}
          </h1>
          <p className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl md:text-5xl">
            sur RIOT TECH
          </p>

          <ServicePage />
          <QuiSommesNous />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
