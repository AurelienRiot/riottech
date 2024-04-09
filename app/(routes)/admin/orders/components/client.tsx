"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  OrderColumn,
  columns,
  filterableColumns,
  searchableColumns,
  viewOptionsColumns,
} from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LoadingButton } from "@/components/ui/button";

interface OrderClientProps {
  initialData: OrderColumn[];
  initialDateRange: DateRange;
}

export const OrderClient: React.FC<OrderClientProps> = ({
  initialData,
  initialDateRange,
}) => {
  const [data, setData] = useState<OrderColumn[]>(initialData);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange,
  );
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleChangeDate = async () => {
    setLoading(true);
    if (!dateRange?.from || !dateRange?.to) {
      setLoading(false);
      toast.error("Veuillez choisir une date");
      return;
    }
    const queryParams = new URLSearchParams({
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    }).toString();
    router.push(`${pathName}?${queryParams}`);

    setLoading(false);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <>
      <Heading
        title={`Commandes (${data.length})`}
        description="Gérer les commandes"
      />
      <Separator className="mb-4" />
      <div className="flex flex-col gap-4 sm:flex-row">
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <LoadingButton
          className="w-fit"
          disabled={loading}
          onClick={() => handleChangeDate()}
        >
          Valider
        </LoadingButton>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchableColumns={searchableColumns}
        viewOptionsColumns={viewOptionsColumns}
        filterableColumns={filterableColumns}
      />
    </>
  );
};
