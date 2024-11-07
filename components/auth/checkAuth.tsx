import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

const checkAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    return false;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || user.role !== "admin") {
    return false;
  }

  return true;
};

const checkUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return undefined;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return undefined;
  }

  return user;
};

export { checkAdmin, checkUser };
