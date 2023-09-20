import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import GetBillboards from "@/server-actions/get-billboards";

const BillboardsPage = async () => {
  const billboards = await GetBillboards();

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.label,
    createdAt: item.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
