import GetProduct from "@/server-actions/get-product";
import GetProducts from "@/server-actions/get-products";
import NotFound from "@/app/not-found";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await GetProduct(params.productId);

  return {
    title: `Riot Tech - ${product?.name}`,
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await GetProduct(params.productId);

  if (!product) {
    return <NotFound />;
  }

  const suggestedProducts = await GetProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="gb-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Produits Similaires" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
