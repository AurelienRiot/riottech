import { SubscriptionHistoryColumn } from "@/app/(routes)/admin/users/components/histories-column";
import { formatter } from "@/lib/utils";
import {
  Order,
  SubscriptionHistory,
  SubscriptionItem,
  SubscriptionOrder,
  User,
} from "@prisma/client";

export type SubscriptionOrderClient = {
  subscriptionHistory: SubscriptionHistory[];
  subscriptionItem: SubscriptionItem[];
} & SubscriptionOrder;

export type UsersHistories = {
  subscriptionOrder: SubscriptionOrderClient[];
  orders: Order[];
} & User;
export function GetUsersHistories(usersHistories: UsersHistories[]) {
  const histories: SubscriptionHistoryColumn[] = usersHistories
    .map((user) => {
      return user.subscriptionOrder
        .map((order: any) => {
          return order.subscriptionHistory.map((history: any) => {
            return {
              userId: user.id,
              createdAt: new Date(history.createdAt),
              price: formatter.format(Number(history.price)),
              status:
                history.status === "Paid"
                  ? "payé"
                  : history.status === "Error"
                  ? "erreur"
                  : "en cours",
              user: `${user.name} ${user.surname}`,
              name: order.subscriptionItem[0].subscription.name,
              type: history.idStripe.startsWith("cs")
                ? "Création"
                : "Renouvellement",
            };
          });
        })
        .flat();
    })
    .flat()
    .sort(
      (a: any, b: any) =>
        Date.parse(String(b.createdAt)) - Date.parse(String(a.createdAt))
    )
    .flat();

  return histories;
}
