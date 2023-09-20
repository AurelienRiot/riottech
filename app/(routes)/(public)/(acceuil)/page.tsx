import GetProducts from "@/server-actions/get-products";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import ServicePage from "./components/services";
import VideoAccueil from "./components/video-accueil";
import { VisibleElement } from "@/components/animations/visible-element";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Reseau4GPage from "./components/reseau-4G";

const HomePage = async () => {
  const products = await GetProducts({ isFeatured: true });

  const session = await getServerSession(authOptions);
  const isPro = session?.user?.isPro ?? false;

  return (
    <>
      <VideoAccueil name={session?.user?.name} />
      <Container>
        <div className="relative pt-6 pb-10 space-y-10 bg-primary-foreground bg-clip-padding ">
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col px-4 mb-16 gap-y-8 sm:px-6 lg:px-8">
              <ProductList
                title="Produits mise en avant"
                items={products}
                isPro={isPro}
              />
            </div>
          </Suspense>

          <VisibleElement
            variant="fade"
            className="w-auto overflow-auto break-after-column"
          >{`L'utilisateur est ${JSON.stringify(session)}`}</VisibleElement>

          <ServicePage />
          <Reseau4GPage />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
