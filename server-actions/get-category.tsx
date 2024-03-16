import prismadb from "@/lib/prismadb";

const GetCategory = async (id: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id,
    },
  });

  return category;
};

export default GetCategory;
