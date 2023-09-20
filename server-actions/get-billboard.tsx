import prismadb from "@/lib/prismadb";

const GetBillboard = async (id: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id,
    },
  });

  return billboard;
};

export default GetBillboard;
