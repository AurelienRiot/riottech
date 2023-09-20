import prismadb from "@/lib/prismadb";
import { ProductWithCategoryAndImages } from "@/types";

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
  categoryName?: string;
}

const GetProducts = async (
  query: Query
): Promise<ProductWithCategoryAndImages[]> => {
  const categoryId = query.categoryId || undefined;
  const categoryName = query.categoryName || undefined;
  const isFeatured = query.isFeatured || undefined;
  const products = await prismadb.product.findMany({
    where: {
      category: { name: categoryName },
      categoryId,
      isFeatured,
      isArchived: false,
    },
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export default GetProducts;
