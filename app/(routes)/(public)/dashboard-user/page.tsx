import GetUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/order-column";
import { SubscriptionOrderColumn } from "./components/subscription-order-column";
import { OrderTable } from "./components/order-table";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { LogoutButton } from "@/components/auth/auth-button";

type FullAdress = {
  label: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};

const DashboardUser = async () => {
  const user = await GetUser();
  if (!user) redirect("/login");

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

  const fullAdress: FullAdress = JSON.parse(user.adresse ? user.adresse : "{}");

  return (
    <div className="gap-4 mt-4 mb-4">
      <>
        <div className="flex flex-col items-center justify-center w-40 h-32 mx-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white">
          <h1 className="text-3xl font-bold text-center">
            {user.name} <br /> {user.surname}
          </h1>

          {user.raisonSocial ? (
            <p className="text-xl ">Professionnel</p>
          ) : (
            <p className="text-xl ">Particulier</p>
          )}

          <Link href="/dashboard-user/settings" className="mt-2 ">
            <BsGear size={20} className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-800 text-md sm:text-xl dark:text-white">
          <div className="grid grid-cols-2 gap-4">
            <p className="font-bold ">Email:</p>
            <p>{user.email}</p>
            <p className="font-bold">Adresse:</p>
            {fullAdress.line1 && (
              <p>
                {fullAdress.line1} {fullAdress.postalCode} {fullAdress.city}{" "}
              </p>
            )}
            {!fullAdress.line1 && <p>{fullAdress.label} </p>}
            <p className="font-bold">Télephone:</p>
            <p>{user.phone}</p>
            {user.raisonSocial && (
              <>
                <p className="font-bold">TVA:</p>
                <p>{user.tva}</p>
                <p className="font-bold"> Raison Sociale: </p>
                <p> {user.raisonSocial} </p>
              </>
            )}
          </div>
        </div>
        <LogoutButton />
        <div className="p-4">
          <OrderTable data={formattedOrders} />
          {/* <ButtonSubscriptions stripeCustomerId={user.stripeCustomerId} /> */}
          <SubscriptionOrderTable data={formattedSubscriptionOrders} />
        </div>
      </>
    </div>
  );
};

export default DashboardUser;
