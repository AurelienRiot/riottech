"use client";
import { dateFormatter } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "../ui/button";

// type FactureCellProps<T = {}> = T & {
//   id: string;
//   dataInvoice: DataInvoiceType;
// };

// function FactureCell<T>({ row }: { row: Row<FactureCellProps<T>> }) {
//   const { orderStatus } = useOrderStatusContext();
//   return (
//     <>
//       {!orderStatus[row.original.id] ||
//       orderStatus[row.original.id] === "indeterminate" ? (
//         "Non disponible"
//       ) : (
//         <DisplayPDF data={row.original.dataInvoice} />
//       )}
//     </>
//   );
// }

type DatePickUpCellProps<T = {}> = T & {
  datePickUp: Date;
};

function DatePickUpCell<T>({ row }: { row: Row<DatePickUpCellProps<T>> }) {
  return (
    <div className="flex md:pl-10">
      {" "}
      {dateFormatter(row.getValue("datePickUp"))}
    </div>
  );
}

type ShopNameCellProps<T = {}> = T & {
  id: string;
  shopId: string;
  shopName: string;
};

function ShopNameCell<T>({ row }: { row: Row<ShopNameCellProps<T>> }) {
  return (
    <Button asChild variant={"link"} className="px-0">
      <Link href={`/admin/shops/${row.original.shopId}`}>
        {row.getValue("shopName")}
      </Link>
    </Button>
  );
}

type ProductCellProps<T = {}> = T & {
  products: string;
  productsList: { name: string; quantity?: string }[];
};

function ProductCell<T>({ row }: { row: Row<ProductCellProps<T>> }) {
  return (
    <div className="flex flex-col gap-[1px]">
      {row.original.productsList.map((product) => (
        <span key={product.name}>
          <strong>{product.name}</strong>
          {product.quantity}
        </span>
      ))}
    </div>
  );
}

export { DatePickUpCell, ProductCell, ShopNameCell };
