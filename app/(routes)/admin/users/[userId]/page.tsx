import prismadb from "@/lib/prismadb";
import { UserForm } from "./components/user-form";
import type { OrderColumn } from "./components/order-column";
import { currencyFormatter } from "@/lib/utils";
import { OrderTable } from "./components/order-table";
import type { SubscriptionOrderColumn } from "./components/subscription-order-column";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import ButtonBackward from "@/components/ui/button-backward";
import ButtonSubscriptions from "@/app/(routes)/(public)/dashboard-user/(profile)/components/button-subscriptions";

export const dynamic = "force-dynamic";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      subscriptionOrder: {
        include: {
          subscriptionItem: true,
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

  if (!user) {
    return (
      <>
        <div>Utilisateur introuvable </div>
        <ButtonBackward />
      </>
    );
  }

  const formatedUser = {
    ...user,
    password: null,
    subscriptionOrder: [],
    orders: [],
  };

  const formattedOrders: OrderColumn[] = (user?.orders || []).map((order) => ({
    id: order.id,
    productsList: order.orderItems.map((item) => {
      const name = item.name;
      if (Number(item.quantity) > 1) {
        const quantity = ` x${item.quantity}`;
        return { name, quantity: quantity };
      }
      return { name, quantity: "" };
    }),
    products: order.orderItems
      .map((item) => {
        let name = item.name;
        if (Number(item.quantity) > 1) {
          name += ` x${item.quantity}`;
        }
        return name;
      })
      .join(", "),
    totalPrice: currencyFormatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid,
    mailSend: order.mailSend,
    pdfUrl: order.pdfUrl,
    createdAt: order.createdAt,
  }));

  const formattedSubscriptionOrders: SubscriptionOrderColumn[] = (user.subscriptionOrder || []).map((order) => ({
    userId: user.id,
    id: order.id,
    subscription: order.subscriptionItem?.name,
    recurrence: order.subscriptionItem?.recurrence,
    totalPrice: currencyFormatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid,
    isActive: order.isActive,
    sim: order.sim,
    changedDate:order.subscriptionItem?.description ? new Date(order.subscriptionItem.description)  : undefined,
    createdAt: order.createdAt,
  }));


  return (
    <div className="flex-col p-8 pt-6">
      <div className="mb-8 flex-1 space-y-4 ">
        <UserForm initialData={formatedUser} />
      </div>
      <ButtonSubscriptions
        stripeCustomerId={user.stripeCustomerId}
        returnUrl={`${process.env.NEXT_PUBLIC_URL}/admin/users/${user.id}`}
      />
      <div>
        <SubscriptionOrderTable data={formattedSubscriptionOrders} />
      </div>
      <div>
        <OrderTable data={formattedOrders} />
      </div>
    </div>
  );
};

export default UserPage;
