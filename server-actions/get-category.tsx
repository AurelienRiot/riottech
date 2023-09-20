import prismadb from "@/lib/prismadb";

const GetCategory = async (id: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id,
    },
    include: {
      billboard: true,
    },
  });

  return category;
};

export default GetCategory;
