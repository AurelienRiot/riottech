import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { currencyFormatter } from "@/lib/utils";
import { GetGraphRevenue } from "@/server-actions/get-graph-revenue";
import { GetSalesCount } from "@/server-actions/get-sales-count";
import { GetStockOrderCount } from "@/server-actions/get-stock-order-count";
import { GetStockSubscriptionCount } from "@/server-actions/get-stock-subscription-count";
import { GetTotalRevenue } from "@/server-actions/get-total-revenue";
import { CalendarSearch, CreditCardIcon, EuroIcon, Package } from "lucide-react";
// import dynamic from "next/dynamic";
import { Suspense } from "react";
// const DynamicOverview = dynamic(() => import("@/components/overview"), {
//   ssr: false,
// });

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Présentation de votre magasin" />

        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Totaux</CardTitle>
              <EuroIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense fallback={<Skeleton className="h-6 w-40 rounded-full" />}>
                  <TotalRevenue />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense fallback={<Skeleton className="h-6 w-40 rounded-full" />}>
                  + <SalesCount />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits en stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {" "}
                <Suspense fallback={<Skeleton className="h-6 w-40 rounded-full" />}>
                  <StockOrderCount />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnements en stock</CardTitle>
              <CalendarSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense fallback={<Skeleton className="h-6 w-40 rounded-full" />}>
                  <StockSubscriptionCount />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4 p-4">
          <CardTitle>{"Vue d'ensemble"}</CardTitle>
          <CardContent className="p-0 sm:pl-2">
            <Suspense fallback={null}>
              <GraphRevenue />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

const TotalRevenue = async () => {
  const totalRevenue = await GetTotalRevenue();
  return currencyFormatter.format(totalRevenue);
};

const SalesCount = async () => {
  const salesCount = await GetSalesCount();
  return String(salesCount);
};

const StockOrderCount = async () => {
  const stockOrderCount = await GetStockOrderCount();
  return String(stockOrderCount);
};

const StockSubscriptionCount = async () => {
  const stockSubscriptionCount = await GetStockSubscriptionCount();
  return String(stockSubscriptionCount);
};

const GraphRevenue = async () => {
  const graphRevenue = await GetGraphRevenue();
  return <Overview data={graphRevenue} />;
};
