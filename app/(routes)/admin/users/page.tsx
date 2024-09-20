import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prismadb";
import { currencyFormatter } from "@/lib/utils";
import { CalendarIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { DateRange } from "react-day-picker";
import UserClient from "./components/client";
import { type SubscriptionHistoryColumn, columns } from "./components/histories-column";
import { HistoryTable } from "./components/histories-table";

const UserPage = async (context: {
  searchParams: { from: string | undefined; to: string | undefined };
}) => {
  let from: Date;
  let to: Date;
  if (context.searchParams.from && context.searchParams.to) {
    from = new Date(context.searchParams.from);
    to = new Date(context.searchParams.to);
  } else {
    from = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
    to = new Date();
  }

  const dateRange: DateRange = {
    from: from,
    to: to,
  };
  return (
    <div>
      <Suspense fallback={<ServerHistoryTableLoading />}>
        <ServerHistoryTable dateRange={dateRange} />
      </Suspense>
      <Suspense fallback={<SeverUserClientLoading />}>
        <SeverUserClient />
      </Suspense>
    </div>
  );
};

export default UserPage;

const ServerHistoryTableLoading = () => {
  return (
    <div className="m-4">
      <Heading title={`Historiques`} description="Gérez les historiques" />
      <Separator className="mb-4" />
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          variant={"outline"}
          disabled={true}
          className={"w-[300px] justify-start text-left font-normal text-muted-foreground"}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          <span>Choisir une date</span>
        </Button>
        <Button className="w-fit" disabled={true}>
          <Spinner size={20} />
        </Button>
      </div>

      <DataTableSkeleton columns={columns} />
    </div>
  );
};

const ServerHistoryTable = async ({ dateRange }: { dateRange: DateRange }) => {
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

  const histories: SubscriptionHistoryColumn[] = usersHistories.map((history) => ({
    userId: history.subscriptionOrder.userId,
    type: history.idStripe.startsWith("cs") ? "Création" : "Renouvellement",
raisonSocial: history.subscriptionOrder.user.raisonSocial,
    status: history.mailSend ? "Paiement validé" : "En cours de validation",
    price: currencyFormatter.format(Number(history.price)),
    userName: `${history.subscriptionOrder.user.name} ${history.subscriptionOrder.user.surname}`,
    name: history.subscriptionOrder.subscriptionItem?.name || "",
    createdAt: new Date(history.createdAt),
  }));

  return <HistoryTable initialData={histories} initialDateRange={dateRange} />;
};

const SeverUserClient = async () => {
  const allUsers = await prismadb.user.findMany({
    where: {
      role: {notIn: ["admin"]},
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      subscriptionOrder: true,
      orders: true,
    },
  });

  const subscriptionOrderLengths = allUsers.map((user) => {
    return user.subscriptionOrder.length;
  });

  const orderLengths = allUsers.map((user) => {
    return user.orders.length;
  });

  const formatedUsers = allUsers.map((user) => {
    return {
      ...user,
      password: null,
      subscriptionOrder: [],
      orders: [],
    };
  });

  return (
    <UserClient users={formatedUsers} orderLengths={orderLengths} subscriptionOrderLengths={subscriptionOrderLengths} />
  );
};

const SeverUserClientLoading = () => {
  return (
    <div className="m-4">
      <Heading title={`Clients `} description="Liste des clients" />
      <div className="justify-content-center mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Input placeholder="Recherche" disabled={true} />

        <div
          className={
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          <p>nom</p>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="m-4">
            <Card>
              <CardHeader>
                <CardTitle
                  className="justify-left flex
                 cursor-pointer items-center gap-3 hover:underline"
                >
                  <Skeleton className="h-4 w-20 rounded-full " />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </CardTitle>
                <CardDescription className="justify-left flex items-center">
                  <Skeleton className="h-4 w-24 rounded-full" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="flex justify-center p-2">
                  <Skeleton className="h-4 w-24 rounded-full" />
                </div>
                <div className="flex items-center justify-center p-2">
                  {`Nombre de commandes : `} <Skeleton className="ml-2 h-4 w-5 rounded-full" />
                </div>
                <div className="flex items-center justify-center p-2">
                  {`Nombre d'abonnements : `}
                  <Skeleton
                    className="ml-2 h-4 w-5
                  rounded-full"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col justify-between gap-y-3 lg:flex-row lg:gap-x-2">
                <Button variant="destructive" className="hover:underline">
                  Supprimer
                </Button>
                <Button className="hover:underline">
                  <Link href={`#`}>Modifier</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
