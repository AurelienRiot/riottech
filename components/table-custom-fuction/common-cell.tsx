"use client";
import { dateFormatter } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

type CreatedAtCellProps<T = {}> = T & {
  createdAt: Date;
};

function CreatedAtCell<T>({ row }: { row: Row<CreatedAtCellProps<T>> }) {
  return (
    <div className="flex md:pl-10">
      {dateFormatter(row.getValue("createdAt"))}
    </div>
  );
}

type NameCellProp = {
  name: string;
  type: "products" | "billboards" | "users" | "categories";
  id: string | null;
};

function NameCell({ name, id, type }: NameCellProp) {
  return (
    <Button asChild variant={"link"} className="px-0">
      {id ? (
        <Link href={`/admin/${type}/${id}`}>{name}</Link>
      ) : (
        <span>{name}</span>
      )}
    </Button>
  );
}

type PhoneCellProps<T = {}> = T & {
  phone: string;
};

function PhoneCell<T>({ row }: { row: Row<PhoneCellProps<T>> }) {
  return (
    <>
      {row.getValue("phone") ? (
        <span>{formatPhoneNumber(row.getValue("phone"))}</span>
      ) : (
        <span>Non renseigné</span>
      )}
    </>
  );
}

type TextCellProps<T = {}> = T & {
  text: string;
};

function TextCell<T>({ row }: { row: Row<TextCellProps<T>> }) {
  return (
    <AutosizeTextarea
      className="flex resize-none items-center justify-center border-none bg-transparent pt-4 text-sm outline-none focus-visible:ring-0 disabled:cursor-default disabled:opacity-100"
      placeholder="..."
      value={row.original.text}
      disabled
    />
  );
}

type CheckboxCellProps = {
  isCheckbox: boolean;
  onChange: (e: boolean | "indeterminate") => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: string;
      }
  >;
};

function CheckboxCell({ isCheckbox, onChange }: CheckboxCellProps) {
  const [status, setStatus] = useState<boolean | "indeterminate">(isCheckbox);
  const router = useRouter();
  return (
    <Checkbox
      className="self-center"
      checked={status}
      onCheckedChange={async (e) => {
        setStatus("indeterminate");
        const result = await onChange(e);
        if (!result.success) {
          toast.error(result.message);
          setStatus(!e);
        } else {
          setStatus(e);
          router.refresh();
          toast.success("Statut mis à jouer");
        }
      }}
    />
  );
}

type NameWithImageCellProps = {
  imageUrl: string | null;
  id: string;
  name: string;
  type: "products" | "billboards";
};

function NameWithImageCell({
  imageUrl,
  id,
  name,
  type,
}: NameWithImageCellProps) {
  return (
    <Button asChild variant={"link"}>
      <Link
        href={`/admin/${type}/${id}`}
        className="flex  cursor-pointer items-center justify-start gap-2"
      >
        {imageUrl ? (
          <span className=" relative aspect-square h-[30px] rounded-sm bg-transparent">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 30px, (max-width: 1200px) 30px, 30px"
              className="rounded-sm object-cover"
            />
          </span>
        ) : null}
        <span>{name}</span>
      </Link>
    </Button>
  );
}

export {
  CheckboxCell,
  CreatedAtCell,
  NameCell,
  NameWithImageCell,
  PhoneCell,
  TextCell,
};
