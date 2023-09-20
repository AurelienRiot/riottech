import GetCategories from "@/server-actions/get-categories";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import ModalProvider from "@/providers/modal-provider";
import { getServerSession } from "next-auth";
import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const categories = await GetCategories();

  return (
    <>
      <ModalProvider />
      <NavBar session={session} categories={categories} />
      <div className="pt-16 ">{children}</div>
      <Footer />
    </>
  );
}
