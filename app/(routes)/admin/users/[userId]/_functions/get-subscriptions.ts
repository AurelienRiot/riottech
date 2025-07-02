"use server";

import prismadb from "@/lib/prismadb";
import safeServerAction from "@/lib/server-action";
import { z } from "zod";

const emptySchema = z.object({});

export const getSubscriptions = async () =>
  await safeServerAction({
    roles: ["admin"],
    data: {},
    schema: emptySchema,
    serverAction: async () => {
      const subscriptions = await prismadb.subscription.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return { success: true, message: "", data: subscriptions };
    },
  });
