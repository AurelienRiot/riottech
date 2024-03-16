"use server";

import prismadb from "@/lib/prismadb";
import { currencyFormatter } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { SubscriptionHistoryColumn } from "./histories-column";
import { checkAdmin } from "@/components/auth/checkAuth";

type ReturnType =
  | {
      success: true;
      data: SubscriptionHistoryColumn[];
    }
  | {
      success: false;
      message: string;
    };

export const fetchUsersHistories = async (
  dateRange: DateRange | undefined,
): Promise<ReturnType> => {
  const isAuth = await checkAdmin();

  if (!isAuth) {
    return {
      success: false,
      message: "Vous devez être authentifier",
    };
  }

  if (!dateRange) {
    return {
      success: false,
      message: "Veuillez choisir une date",
    };
  }

  const usersHistories = await prismadb.subscriptionHistory.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      createdAt: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    },
    include: {
      subscriptionOrder: {
        include: {
          user: true,
          subscriptionItem: true,
        },
      },
    },
  });

  const histories: SubscriptionHistoryColumn[] = usersHistories.map(
    (history) => ({
      userId: history.subscriptionOrder.userId,
      type: history.idStripe.startsWith("cs") ? "Création" : "Renouvellement",

      status: history.mailSend ? "Paiement validé" : "En cours de validation",
      price: currencyFormatter.format(Number(history.price)),
      userName: `${history.subscriptionOrder.user.name} ${history.subscriptionOrder.user.surname}`,
      name: history.subscriptionOrder.subscriptionItem?.name || "",
      createdAt: new Date(history.createdAt),
    }),
  );

  return {
    success: true,
    data: histories,
  };
};
