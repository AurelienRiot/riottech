import prismadb from "@/lib/prismadb";

const GetProduct = async (id: string) => {
  const product = await prismadb.product.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          createdAt: "asc",
        },
      },
      category: true,
    },
  });

  return product;
};

export default GetProduct;
