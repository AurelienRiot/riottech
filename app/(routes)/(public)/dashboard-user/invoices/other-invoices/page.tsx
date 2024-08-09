import ButtonBackward from "@/components/ui/button-backward";
import { OtherInvoicesTable } from "./components/table";
import type { InvoicesColumn } from "./components/column";

export const dynamic = "force-dynamic";

const INVOICE_URL = process.env.INVOICE_URL;
const PDF_URL = process.env.PDF_URL;

async function OtherInvoicesPage() {
  const result = await fetch(`${INVOICE_URL}/get_other_invoices?customer_id=cus_Qd5TVtKBZm97Tr`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json());

  const otherInvoices: InvoicesColumn[] = result.map((item: { date: string; ref: string; total_ttc: string }) => ({
    date: new Date(item.date),
    pdfUrl: `${PDF_URL}/get_pdf?mode=inline&invoice_ref=${item.ref}`,
    total_ttc: Number(item.total_ttc),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OtherInvoicesTable data={otherInvoices.sort((a, b) => b.date.getTime() - a.date.getTime())} />
      </div>
      <ButtonBackward />
    </div>
  );
}

export default OtherInvoicesPage;
