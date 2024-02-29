import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersColumn } from "./components/order-column";
import { SubscriptionOrderColumn } from "./components/subscription-order-column";
import { UserButtons } from "./components/user-buttons";

const Loading = () => {
  return (
    <div className="gap-4 mt-4 mb-4">
      <>
        <div className="flex flex-col items-center justify-center w-fit h-fit mx-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white p-6 gap-2">
          <>
            <div className="text-3xl font-bold text-center flex flex-col gap-1">
              <Skeleton className="w-40 h-6 rounded-full" />
              <Skeleton className="w-40 h-6 rounded-full" />
            </div>
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

export default Loading;
