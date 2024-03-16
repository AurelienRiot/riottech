import ButtonBackward from "@/components/ui/button-backward";
import GetUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { InvoicesTable } from "./components/table";
import { InvoicesColumn, columns } from "./components/column";
import { formatter } from "@/lib/utils";
import { Suspense } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";

const InvoicesPage = async () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Suspense fallback={<LoadingFacture />}>
            <Facture />
          </Suspense>
        </div>
      </div>
      <ButtonBackward />
    </>
  );
};

export default InvoicesPage;

const Facture = async () => {
  const user = await GetUser();
  if (!user) redirect("/login");

  const formattedInvoicesOrders: InvoicesColumn[] = (user.orders || []).map(
    (order) => ({
      type: "Commande",
      products: order.orderItems
        .map((item) => {
          let name = item.name;
          if (Number(item.quantity) > 1) {
            name += ` x${item.quantity}`;
          }
          return name;
        })
        .join(", "),
      price: formatter.format(Number(order.totalPrice)),
      isPaid: order.isPaid,
      mailSend: order.mailSend,
      pdfUrl: order.pdfUrl,
      createdAt: order.createdAt,
    }),
  );

  const formattedInvoicesSubscriptions: InvoicesColumn[] = (
    user.subscriptionOrder || []
  ).flatMap((subscriptionOrder) =>
    subscriptionOrder.subscriptionHistory.map((history) => ({
      type: "Abonnement",
      products: subscriptionOrder.subscriptionItem?.name || "",
      price: formatter.format(Number(history.price)),
      isPaid: true,
      mailSend: history.mailSend,
      pdfUrl: history.pdfUrl,
      createdAt: history.createdAt,
    })),
  );

  const formattedInvoices = [
    ...formattedInvoicesOrders,
    ...formattedInvoicesSubscriptions,
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return <InvoicesTable data={formattedInvoices} />;
};

const LoadingFacture = () => {
  return (
    <>
      <Heading title={`Factures `} description="Historique des factures" />
      <Separator />
      <DataTableSkeleton columns={columns} />
    </>
  );
};
