import ButtonBackward from "@/components/ui/button-backward";
import GetUser from "@/server-actions/get-user";
import { redirect } from "next/navigation";
import { InvoicesTable } from "./components/table";
import { InvoicesColumn } from "./components/column";
import { formatter } from "@/lib/utils";

const InvoicesPage = async () => {
  const user = await GetUser();
  if (!user) redirect("/login");

  const formattedInvoicesOrders: InvoicesColumn[] = (user.orders || []).map(
    (order) => ({
      type: "Commande",
      products: order.orderItems
        .map((item) => {
          let name = item.product.name;
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
    })
  );

  const formattedInvoicesSubscriptions: InvoicesColumn[] = (
    user.subscriptionOrder || []
  ).flatMap((subscriptionOrder) =>
    subscriptionOrder.subscriptionHistory.map((history) => ({
      type: "Abonnement",
      products: subscriptionOrder.subscriptionItem[0].subscription.name,
      price: formatter.format(Number(history.price)),
      isPaid: true,
      mailSend: history.mailSend,
      pdfUrl: history.pdfUrl,
      createdAt: history.createdAt,
    }))
  );

  const formattedInvoices = [
    ...formattedInvoicesOrders,
    ...formattedInvoicesSubscriptions,
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <InvoicesTable data={formattedInvoices} />
        </div>
      </div>
      <ButtonBackward />
    </>
  );
};

export default InvoicesPage;
