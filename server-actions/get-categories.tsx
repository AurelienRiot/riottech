import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";

const GetCategories = async (): Promise<Category[]> => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

export default GetCategories;
