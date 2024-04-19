import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import GetProducts from "@/server-actions/get-products";
import ImageAccueil from "./components/image-accueil";
import Reseau4GPage from "../(autres)/solution-internet/_components/reseau-4G";
import ServicePage from "./components/services";

const HomePage = async () => {
  return (
    <>
      <ImageAccueil />
      <Container>
        <>
          <div className=" mt-12 flex h-full w-full flex-col items-center rounded-t-xl bg-transparent  pt-6 font-bold text-white">
            <h1 className="text-5xl md:text-7xl ">Bienvenue </h1>
            <p className="text-2xl sm:text-3xl md:text-5xl  ">sur RIOT TECH</p>

            <ServicePage />
          </div>
        </>
      </Container>
    </>
  );
};

export default HomePage;
