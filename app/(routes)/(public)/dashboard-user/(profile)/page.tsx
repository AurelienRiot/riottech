import { currencyFormatter } from "@/lib/utils";
import getFullUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import type { OrderColumnType } from "./components/order-column";
import { OrderTable } from "./components/order-table";
import type { SubscriptionOrderColumnType } from "./components/subscription-order-column";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import { UserButtons } from "./components/user-buttons";
import { ToastSearchParams } from "@/lib/toast-search-params";
import UserPhone from "./components/user-phone";

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
  const user = await getFullUser();
  if (!user) redirect("/login");
  if (!user.stripeCustomerId) {
    redirect(`/dashboard-user/settings?callbackUrl=${encodeURIComponent(`/dashboard-user`)}`);
  }

  const formattedOrders: OrderColumnType[] = (user.orders || []).map((order) => ({
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

  const formattedSubscriptionOrders: SubscriptionOrderColumnType[] = (user.subscriptionOrder || []).map((order) => ({
    id: order.id,
    subscription: order.subscriptionItem?.name,
    recurrence: order.subscriptionItem?.recurrence,
    totalPrice: currencyFormatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid,
    isActive: order.isActive,
    sim: order.sim,
    histories: order.subscriptionHistory.length,
    createdAt: order.createdAt,
  }));

  const fullAdress: FullAdress = JSON.parse(user.adresse ? user.adresse : "{}");

  return (
    <div className="mb-4 mt-4 gap-4">
      <ToastSearchParams
        searchParam="success-subscription"
        message="Paiement réussi."
        url="/dashboard-user"
        toastType="success"
      />
      <div className="mx-auto mb-4 flex h-fit w-fit flex-col items-center justify-center gap-2 rounded-md border-2 p-6 text-gray-800 shadow-xl dark:text-white">
        {user.raisonSocial ? (
          <>
            <h1 className="text-center text-3xl font-bold">
              <span className="capitalize">{user.raisonSocial}</span>
              <br />
              {"("}
              <span className="capitalize">{user.name}</span> <span className="capitalize">{user.surname}</span>
              {")"}
            </h1>
            <p className="text-xl ">Professionnel</p>
          </>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold">
              <span className="capitalize">{user.name}</span> <br />
              <span className="capitalize">{user.surname}</span>
            </h1>
            <p className="text-xl ">Particulier</p>
          </>
        )}
        <UserButtons />
      </div>
      <div className="text-md flex flex-col items-center justify-center text-gray-800 dark:text-white sm:text-xl">
        <div className="grid grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-start">
          <p className="font-bold ">Email :</p>
          <p>{user.email}</p>
          <p className="font-bold">Adresse :</p>
          {fullAdress.line1 ? (
            <p>
              {fullAdress.line1} {fullAdress.postalCode} {fullAdress.city}{" "}
            </p>
          ) : (
            <p>{fullAdress.label} </p>
          )}

          <p className="font-bold">Télephone :</p>
          <UserPhone phone={user.phone} />
          {user.raisonSocial && (
            <>
              <p className="font-bold">TVA :</p>
              <p>{user.tva}</p>
              <p className="font-bold"> Raison Sociale : </p>
              <p> {user.raisonSocial} </p>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        {formattedSubscriptionOrders.length > 0 ? <SubscriptionOrderTable data={formattedSubscriptionOrders} /> : null}
        {formattedOrders.length > 0 ? <OrderTable data={formattedOrders} /> : null}

        {/* <ButtonSubscriptions stripeCustomerId={user.stripeCustomerId} /> */}
      </div>
    </div>
  );
};

export default DashboardUser;
