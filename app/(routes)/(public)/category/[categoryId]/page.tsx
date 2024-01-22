import GetCategory from "@/server-actions/get-category";
import GetProducts from "@/server-actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCart from "@/components/ui/product-cart";
import NotFound from "@/app/not-found";
import { Metadata } from "next";

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const category = await GetCategory(params.categoryId);

    return {
        title: `RIOT TECH - ${category?.name}`,
    };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
    const products = await GetProducts({
        categoryId: params.categoryId,
    });

    if (products.length === 0) {
        return <NotFound />;
    }

    return (
        <div>
            <Container>
                <Billboard categoryId={params.categoryId} />
                <div className="px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="lg-gap-x-8 lg:grid lg:grid-cols-5">
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            <div className="md:grid-clos-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {products.map((item) => (
                                    <ProductCart key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;
