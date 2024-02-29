import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatter } from "@/lib/utils";
import { GetGraphRevenue } from "@/server-actions/get-graph-revenue";
import { GetSalesCount } from "@/server-actions/get-sales-count";
import { GetStockOrderCount } from "@/server-actions/get-stock-order-count";
import { GetStockSubscriptionCount } from "@/server-actions/get-stock-subscription-count";
import { GetTotalRevenue } from "@/server-actions/get-total-revenue";
import {
  CalendarSearch,
  CreditCardIcon,
  EuroIcon,
  Package,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const DynamicOverview = dynamic(() => import("@/components/overview"), {
  ssr: false,
});

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading
          title="Dashboard"
          description="Présentation de votre magasin"
        />
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Revenue Totaux
              </CardTitle>
              <EuroIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense
                  fallback={<Skeleton className="w-40 h-6 rounded-full" />}
                >
                  <TotalRevenue />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense
                  fallback={<Skeleton className="w-40 h-6 rounded-full" />}
                >
                  + <SalesCount />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Produits en stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {" "}
                <Suspense
                  fallback={<Skeleton className="w-40 h-6 rounded-full" />}
                >
                  <StockOrderCount />
                </Suspense>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Abonnements en stock
              </CardTitle>
              <CalendarSearch className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Suspense
                  fallback={<Skeleton className="w-40 h-6 rounded-full" />}
                >
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
  return formatter.format(totalRevenue);
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
  return <DynamicOverview data={graphRevenue} />;
};
