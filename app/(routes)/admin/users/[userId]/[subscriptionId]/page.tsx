import ButtonBackward from "@/components/ui/button-backward";
import prismadb from "@/lib/prismadb";
import { SubscriptionHistoryColumn } from "./components/column";
import { currencyFormatter } from "@/lib/utils";
import { SubscriptionHistoryTable } from "./components/table";

const UserSubscriptionPage = async ({
  params,
}: {
  params: { subscriptionId: string };
}) => {
  const subscriptionHistory = await prismadb.subscriptionHistory.findMany({
    where: {
      subscriptionOrderId: params.subscriptionId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSubscriptionHistory: SubscriptionHistoryColumn[] =
    subscriptionHistory.map((history) => ({
      id: history.id,
      type: history.idStripe.startsWith("cs") ? "Création" : "Renouvellement",
      price: currencyFormatter.format(Number(history.price)),
      pdfUrl: history.pdfUrl,
      isPaid: true,
      status: history.mailSend ? "Paiement validé" : "En cours de validation",
      mailSend: history.mailSend,
      createdAt: history.createdAt,
    }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SubscriptionHistoryTable data={formattedSubscriptionHistory} />
        </div>
      </div>

      <ButtonBackward />
    </>
  );
};

export default UserSubscriptionPage;
