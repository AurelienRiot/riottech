import { authOptions } from "@/components/auth/authOptions";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";

export const getDbUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return user;
};

export const getDbUserCache = unstable_cache(
  async (id: string | undefined) => {
    if (!id) return null;
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  },
  ["getDbUserCache"],
  {
    revalidate: 60 * 10,
  },
);

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  return session.user;
};

const getFullUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      subscriptionOrder: {
        include: {
          subscriptionItem: true,
          subscriptionHistory: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          orderItems: true,
        },
      },
    },
  });
  return user;
};

export default getFullUser;
