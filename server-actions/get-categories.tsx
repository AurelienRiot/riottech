import prismadb from "@/lib/prismadb";
import { CategoryWithBillboard } from "@/types";

const GetCategories = async (): Promise<CategoryWithBillboard[]> => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: true,
    },
  });

  return categories;
};

export default GetCategories;
