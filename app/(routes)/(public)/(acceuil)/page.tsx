import GetProducts from "@/server-actions/get-products";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import ServicePage from "./components/services";
import ImageAccueil from "./components/image-accueil";
import { VisibleElement } from "@/components/animations/visible-element";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Reseau4GPage from "./components/reseau-4G";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ImageAccueil />
      <Container>
        <>
          <div className=" flex flex-col items-center mt-12 pt-6 w-full h-full font-bold text-white bg-gradient-to-b from-transparent to-primary-foreground/95 from-70% to-100% rounded-t-xl">
            <h1 className="text-5xl md:text-7xl ">Bienvenue </h1>
            <p className="text-2xl sm:text-3xl md:text-5xl  ">sur Riot Tech</p>
            <p className="text-2xl sm:text-3xl md:text-5xl  ">
              {session?.user?.name}
            </p>
            <ServicePage />
          </div>
          <div className="relative pt-6 pb-10 space-y-10 bg-primary-foreground/95  ">
            <Suspense fallback={<Loading />}>
              <FeaturedProducts />
            </Suspense>

            <VisibleElement
              variant="fade"
              className="w-auto overflow-auto break-after-column"
            >{`L'utilisateur est ${JSON.stringify(session)}`}</VisibleElement>

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
    <div className="flex flex-col px-4 mb-16 gap-y-8 sm:px-6 lg:px-8">
      <ProductList title="Produits mise en avant" items={products} />
    </div>
  );
}
