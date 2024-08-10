import { Logout } from "@/components/auth/auth";
import ButtonBackward from "@/components/ui/button-backward";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getDbUser } from "@/server-actions/get-user";
import { Suspense } from "react";
import * as z from "zod";
import { columns, type InvoicesColumn } from "./components/column";
import { OtherInvoicesTable } from "./components/table";

export const dynamic = "force-dynamic";

const INVOICE_URL = process.env.INVOICE_URL;

async function OtherInvoicesPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<LoadingFacture />}>
          <Facture />
        </Suspense>
      </div>
      <ButtonBackward url="/dashboard-user/invoices" />
    </div>
  );
}

export default OtherInvoicesPage;

const otherInvoicesSchema = z
  .object({
    date: z.number(),
    ref: z.string(),
    total_ttc: z.string(),
  })
  .array();

const Facture = async () => {
  const user = await getDbUser();
  if (!user) return <Logout callbackUrl="/dashboard-user/invoices/other-invoices" />;
  const result = await fetch(`${INVOICE_URL}/get_other_invoices?customer_id=${user.stripeCustomerId}`, {
    method: "GET",
    cache: "no-store",
  })
    .then((res) => res.json().catch(() => []))
    .catch(() => []);

  const { success, data } = otherInvoicesSchema.safeParse(result);

  if (!success) return <OtherInvoicesTable data={[]} />;

  const otherInvoices: InvoicesColumn[] = data.map((item) => ({
    createdAt: new Date(item.date * 1000),
    pdfUrl: `${INVOICE_URL}/get_pdf?mode=inline&invoice_ref=${item.ref}`,
    total_ttc: Number(item.total_ttc),
  }));

  return <OtherInvoicesTable data={otherInvoices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())} />;
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
