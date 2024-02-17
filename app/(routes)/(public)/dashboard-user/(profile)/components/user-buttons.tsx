import { LogoutButtonText } from "@/components/auth/auth-button";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";

export const UserButtons = () => {
  return (
    <>
      <Link href="/dashboard-user/invoices" className=" text-3xl ">
        <span className="hover:underline cursor-pointer inline-flex items-center gap-2">
          <FaFileInvoice size={20} /> Factures
        </span>
      </Link>
      <Link href="/dashboard-user/settings" className=" text-3xl ">
        <span className="hover:underline cursor-pointer inline-flex items-center gap-2">
          <BsGear size={20} /> Paramètres
        </span>
      </Link>
      <LogoutButtonText />
    </>
  );
};
