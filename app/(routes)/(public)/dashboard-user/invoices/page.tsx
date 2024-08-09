import ButtonBackward from "@/components/ui/button-backward";
import getFullUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { InvoicesTable } from "./components/table";
import { type InvoicesColumn, columns } from "./components/column";
import { currencyFormatter } from "@/lib/utils";
import { Suspense } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="pl-6 space-y-4">
        <Button asChild className="block w-fit">
          <Link href="/dashboard-user/invoices/other-invoices">Autres factures</Link>
        </Button>
        <ButtonBackward />
      </div>
    </>
  );
};

export default InvoicesPage;

const Facture = async () => {
  const user = await getFullUser();
  if (!user) redirect("/login");

  const formattedInvoicesOrders: InvoicesColumn[] = (user.orders || []).map((order) => ({
    type: "Commande",
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
    price: currencyFormatter.format(Number(order.totalPrice)),
    status: order.isPaid ? (order.mailSend ? "Paiement validé" : "En cours de validation") : "Non payé",
    isPaid: order.isPaid,
    mailSend: order.mailSend,
    pdfUrl: order.pdfUrl,
    createdAt: order.createdAt,
  }));

  const formattedInvoicesSubscriptions: InvoicesColumn[] = (user.subscriptionOrder || []).flatMap((subscriptionOrder) =>
    subscriptionOrder.subscriptionHistory.map((history) => ({
      type: "Abonnement",
      products: subscriptionOrder.subscriptionItem?.name || "",
      productsList: [{ name: subscriptionOrder.subscriptionItem?.name || "", quantity: "" }],
      price: currencyFormatter.format(Number(history.price)),
      isPaid: true,
      status: history.mailSend ? "Paiement validé" : "En cours de validation",
      mailSend: history.mailSend,
      pdfUrl: history.pdfUrl,
      createdAt: history.createdAt,
    })),
  );

  const formattedInvoices = [...formattedInvoicesOrders, ...formattedInvoicesSubscriptions].sort(
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
