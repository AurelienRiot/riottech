import prismadb from "@/lib/prismadb";


export const getStockOrderCount = async () => {
  const stockCount = await prismadb.product.count({
    where: {
      isArchived: false,
    }
  });


  return stockCount;
};