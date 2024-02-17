import GetProducts from "@/server-actions/get-products";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import ServicePage from "./components/services";
import ImageAccueil from "./components/image-accueil";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Reseau4GPage from "./components/reseau-4G";
import { TestForm } from "@/components/adress-form";

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
          <div className="relative space-y-10 bg-primary-foreground/95 pb-10 pt-6  ">
            {/* <Suspense fallback={<Loading />}>
              <FeaturedProducts />
            </Suspense> */}
            {/*
                            <VisibleElement
                                variant="fade"
                                className="w-auto break-after-column overflow-auto"
                            >{`L'utilisateur est ${JSON.stringify(
                                session,
                            )}`}</VisibleElement> */}

            <Reseau4GPage />
          </div>
        </>
      </Container>
    </>
  );
};

export default HomePage;

async function FeaturedProducts() {
  const products = await GetProducts({ isFeatured: true });

  return (
    <div className="mb-16 flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Produits mise en avant" items={products} />
    </div>
  );
}
