import { GetUsersHistories } from "@/actions/get-users-histories";
import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prismadb";
import { CalendarIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DateRange } from "react-day-picker";
import UserClient from "./components/client";
import { columns } from "./components/histories-column";
import { HistoryTable } from "./components/histories-table";
import { addDelay } from "@/lib/utils";

const UserPage = async () => {
  const from = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const to = new Date();

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
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant={"outline"}
          disabled={true}
          className={
            "w-[300px] justify-start text-left font-normal text-muted-foreground"
          }
        >
          <CalendarIcon className="w-4 h-4 mr-2" />

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
  const usersHistories = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionOrder: {
        include: {
          subscriptionHistory: {
            where: {
              createdAt: {
                gte: dateRange.from,
                lte: dateRange.to,
              },
            },
          },
          subscriptionItem: {
            include: { subscription: true },
          },
        },
      },
      orders: true,
    },
  });

  const histories = GetUsersHistories(usersHistories);

  return <HistoryTable initialData={histories} initialDateRange={dateRange} />;
};

const SeverUserClient = async () => {
  const allUsers = await prismadb.user.findMany({
    where: {
      role: "user",
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
      subscriptionOrder: [],
      orders: [],
    };
  });

  return (
    <UserClient
      users={formatedUsers}
      orderLengths={orderLengths}
      subscriptionOrderLengths={subscriptionOrderLengths}
    />
  );
};

const SeverUserClientLoading = () => {
  return (
    <div className="m-4">
      <Heading title={`Clients `} description="Liste des clients" />
      <div className="grid grid-cols-1 gap-4 mt-4 justify-content-center md:grid-cols-6">
        <Input placeholder="Recherche" disabled={true} />

        <div
          className={
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          <p>nom</p>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-1 p-6 space-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="m-4">
            <Card>
              <CardHeader>
                <CardTitle
                  className="cursor-pointer hover:underline
                 flex items-center justify-left gap-3"
                >
                  <Skeleton className="w-20 h-4 rounded-full " />
                  <Skeleton className="w-16 h-4 rounded-full" />
                </CardTitle>
                <CardDescription className="flex items-center justify-left">
                  <Skeleton className="w-24 h-4 rounded-full" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center flex-col items-center">
                <p className="p-2 flex justify-center">
                  <Skeleton className="w-24 h-4 rounded-full" />
                </p>
                <p className="p-2 flex justify-center items-center">
                  {`Nombre de commandes : `}{" "}
                  <Skeleton
                    className="w-5 h-4 rounded-full
                  ml-2"
                  />
                </p>
                <p className="p-2 flex justify-center items-center">
                  {`Nombre d'abonnements : `}
                  <Skeleton
                    className="w-5 h-4 rounded-full
                  ml-2"
                  />
                </p>
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
