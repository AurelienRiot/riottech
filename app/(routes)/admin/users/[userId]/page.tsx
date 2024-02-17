import prismadb from "@/lib/prismadb";
import { UserForm } from "./components/user-form";
import { OrderColumn } from "./components/order-column";
import { formatter } from "@/lib/utils";
import { OrderTable } from "./components/order-table";
import { SubscriptionOrderColumn } from "./components/subscription-order-column";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import ButtonBackward from "@/components/ui/button-backward";

export const dynamic = "force-dynamic";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      subscriptionOrder: {
        include: {
          subscriptionItem: {
            include: {
              subscription: true,
            },
          },
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
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return (
      <>
        <div>Utilisateur introuvable </div>
        <ButtonBackward />
      </>
    );
  }
  const isPro = user?.isPro ? user.isPro : false;
  const taxRate = isPro ? 1 : 1.2;

  const formatedUser = {
    ...user,
    subscriptionOrder: [],
    orders: [],
  };

  const formattedOrders: OrderColumn[] = (user?.orders || []).map((order) => ({
    id: order.id,
    products: order.orderItems
      .map((item) => {
        let name = item.product.name;
        if (Number(item.quantity) > 1) {
          name += ` x${item.quantity}`;
        }
        return name;
      })
      .join(", "),
    totalPrice: formatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid ? "oui" : "non",
    createdAt: order.createdAt,
  }));

  const formattedSubscriptionOrders: SubscriptionOrderColumn[] = (
    user?.subscriptionOrder || []
  ).map((order) => ({
    userId: user.id,
    id: order.id,
    subscription: order.subscriptionItem
      .map((orderItem) => orderItem.subscription.name)
      .join(","),
    totalPrice: formatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid ? "oui" : "non",
    isActive: order.isActive ? "oui" : "non",
    sim: order.sim,
    createdAt: order.createdAt,
  }));

  return (
    <div className="flex-col p-8 pt-6">
      <div className="flex-1 mb-8 space-y-4 ">
        <UserForm initialData={formatedUser} />
      </div>
      <div>
        <OrderTable data={formattedOrders} />
      </div>
      <div>
        <SubscriptionOrderTable data={formattedSubscriptionOrders} />
      </div>
    </div>
  );
};

export default UserPage;
