import prismadb from "@/lib/prismadb";
import type { Category } from "@prisma/client";

const GetCategories = async (): Promise<Category[]> => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

export default GetCategories;
