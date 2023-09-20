import NoResults from "./ui/no-results";
import ProductCart from "./ui/product-cart";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { VisibleElement } from "./animations/visible-element";
import { ProductWithCategoryAndImages } from "@/types";

interface ProductListProps {
  title: string;
  items: ProductWithCategoryAndImages[];
  isPro: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ title, items, isPro }) => {
  return (
    <div className="space-y-4 ">
      <VisibleElement as="h2" className="text-3xl font-bold text-primary ">
        {" "}
        {title}{" "}
      </VisibleElement>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Suspense fallback={<Loading />} key={item.id}>
            <ProductCart data={item} isPro={isPro} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
