import prismadb from "@/lib/prismadb";

const GetBillboards = async () => {
  const billboards = await prismadb.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return billboards;
};

export default GetBillboards;
