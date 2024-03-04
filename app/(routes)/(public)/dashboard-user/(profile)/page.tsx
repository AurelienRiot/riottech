import { formatter } from "@/lib/utils";
import GetUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { OrderColumnType } from "./components/order-column";
import { OrderTable } from "./components/order-table";
import { SubscriptionOrderColumnType } from "./components/subscription-order-column";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import { UserButtons } from "./components/user-buttons";
import { ToastSearchParams } from "@/lib/toast-search-params";

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

  const formattedOrders: OrderColumnType[] = (user.orders || []).map(
    (order) => ({
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
      mailSend: order.mailSend,
      pdfUrl: order.pdfUrl,
      createdAt: order.createdAt,
    })
  );

  const formattedSubscriptionOrders: SubscriptionOrderColumnType[] = (
    user.subscriptionOrder || []
  ).map((order) => ({
    id: order.id,
    subscription: order.subscriptionItem
      .map((orderItem) => orderItem.subscription.name)
      .join(","),
    totalPrice: formatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid ? "oui" : "non",
    isActive: order.isActive ? "oui" : "non",
    sim: order.sim,
    histories: order.subscriptionHistory.length,
    createdAt: order.createdAt,
  }));

  const fullAdress: FullAdress = JSON.parse(user.adresse ? user.adresse : "{}");

  return (
    <div className="gap-4 mt-4 mb-4">
      <ToastSearchParams
        searchParam="success-subscription"
        message="Paiement réussi."
        url="/dashboard-user"
        toastType="success"
      />
      <div className="flex flex-col items-center justify-center w-fit h-fit mx-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white p-6 gap-2">
        {user.raisonSocial ? (
          <>
            <h1 className="text-3xl font-bold text-center">
              <span className="capitalize">{user.raisonSocial}</span>
              <br />
              {"("}
              <span className="capitalize">{user.name}</span>{" "}
              <span className="capitalize">{user.surname}</span>
              {")"}
            </h1>
            <p className="text-xl ">Professionnel</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center">
              <span className="capitalize">{user.name}</span> <br />
              <span className="capitalize">{user.surname}</span>
            </h1>
            <p className="text-xl ">Particulier</p>
          </>
        )}
        <UserButtons />
      </div>
      <div className="flex flex-col items-center justify-center text-gray-800 text-md sm:text-xl dark:text-white">
        <div className="grid grid-cols-1 items-center justify-items-center sm:justify-items-start sm:grid-cols-2 gap-4">
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
          <p>{user.phone}</p>
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
        {formattedSubscriptionOrders.length > 0 ? (
          <SubscriptionOrderTable data={formattedSubscriptionOrders} />
        ) : null}
        {formattedOrders.length > 0 ? (
          <OrderTable data={formattedOrders} />
        ) : null}

        {/* <ButtonSubscriptions stripeCustomerId={user.stripeCustomerId} /> */}
      </div>
    </div>
  );
};

export default DashboardUser;
