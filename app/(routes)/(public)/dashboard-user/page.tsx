import GetUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { addDelay, formatter } from "@/lib/utils";
import { OrderColumnType, OrdersColumn } from "./components/order-column";
import {
  SubscriptionOrderColumn,
  SubscriptionOrderColumnType,
} from "./components/subscription-order-column";
import { OrderTable } from "./components/order-table";
import { SubscriptionOrderTable } from "./components/subscription-order-table";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { LogoutButtonText } from "@/components/auth/auth-button";
import { FaFileInvoice } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Suspense } from "react";

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
  return (
    <div className="gap-4 mt-4 mb-4">
      <Suspense fallback={<LoadingUserProfile />}>
        <UserProfile />
      </Suspense>
    </div>
  );
};

export default DashboardUser;

const UserProfile = async () => {
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
    <>
      <div className="flex flex-col items-center justify-center w-fit h-fit mx-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white p-6 gap-2">
        {user.raisonSocial ? (
          <>
            <h1 className="text-3xl font-bold text-center">
              <span className="capitalize">{user.raisonSocial}</span>
              <br />
              {"("}
              <span className="capitalize">{user.name}</span>
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
        <div className="grid grid-cols-2 gap-4">
          <p className="font-bold ">Email:</p>
          <p>{user.email}</p>
          <p className="font-bold">Adresse:</p>
          {fullAdress.line1 ? (
            <p>
              {fullAdress.line1} {fullAdress.postalCode} {fullAdress.city}{" "}
            </p>
          ) : (
            <p>{fullAdress.label} </p>
          )}

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

      <div className="p-4">
        <OrderTable data={formattedOrders} />
        {/* <ButtonSubscriptions stripeCustomerId={user.stripeCustomerId} /> */}
        <SubscriptionOrderTable data={formattedSubscriptionOrders} />
      </div>
    </>
  );
};

const LoadingUserProfile = () => {
  return (
    <div className="gap-4 mt-4 mb-4">
      <>
        <div className="flex flex-col items-center justify-center w-fit h-fit mx-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white p-6 gap-2">
          <>
            <h1 className="text-3xl font-bold text-center flex flex-col gap-1">
              <Skeleton className="w-40 h-6 rounded-full" />
              <Skeleton className="w-40 h-6 rounded-full" />
            </h1>
            <Skeleton className="w-24 h-4 rounded-full" />
          </>

          <UserButtons />
        </div>
        <div className="flex flex-col items-center justify-center text-gray-800 text-md sm:text-xl dark:text-white">
          <div className="grid grid-cols-2 gap-4 items-center">
            <p className="font-bold ">Email:</p>
            <Skeleton className="w-24 h-4 rounded-full" />
            <p className="font-bold">Adresse:</p>
            <Skeleton className="w-24 h-4 rounded-full" />
            <p className="font-bold">Télephone:</p>
            <Skeleton className="w-24 h-4 rounded-full" />
          </div>
        </div>

        <div className="p-4">
          <>
            <Heading title={`Commandes`} description="Résumé des commandes" />
            <Separator />
            <DataTableSkeleton columns={OrdersColumn} />
          </>
          <>
            <Heading
              title={`Abonnements `}
              description="Résumé des abonnements"
            />
            <Separator />
            <DataTableSkeleton columns={SubscriptionOrderColumn} />
          </>
        </div>
      </>
    </div>
  );
};

const UserButtons = () => {
  return (
    <>
      <Link href="/dashboard-user/invoices" className=" text-3xl ">
        <span className="hover:underline cursor-pointer inline-flex items-center gap-2">
          <FaFileInvoice size={20} /> Factures
        </span>
      </Link>
      <Link href="/dashboard-user/settings" className=" text-3xl ">
        <span className="hover:underline cursor-pointer inline-flex items-center gap-2">
          <BsGear size={20} /> Paramètres
        </span>
      </Link>
      <LogoutButtonText />
    </>
  );
};
